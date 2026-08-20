import "server-only";

import crypto from "node:crypto";
import nodemailer from "nodemailer";

/**
 * Stateless OTP: we never store the code. Instead we return a signed token
 * that binds { email, mobile, expiry } together with an HMAC of the code.
 * Verification recomputes the HMAC from the user-supplied code, so a valid
 * signature proves the code is correct and unexpired - no DB required.
 */

const OTP_SECRET =
  process.env.OTP_SECRET ?? process.env.SECRET_KEY ?? "dev-otp-secret-change-me";
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface OtpPayload {
  email: string;
  mobile: string;
  exp: number;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sign(payloadB64: string, otp: string): string {
  return crypto
    .createHmac("sha256", OTP_SECRET)
    .update(`${payloadB64}.${otp}`)
    .digest("hex");
}

export function generateOtp(): string {
  return String(crypto.randomInt(100000, 1000000)); // always 6 digits
}

/** Builds a signed, self-contained token for the given code. */
export function createOtpToken(email: string, mobile: string, otp: string): string {
  const payload: OtpPayload = {
    email: email.trim().toLowerCase(),
    mobile: mobile.trim(),
    exp: Date.now() + OTP_TTL_MS,
  };
  const payloadB64 = b64url(JSON.stringify(payload));
  const signature = sign(payloadB64, otp);
  return `${payloadB64}.${signature}`;
}

export type OtpVerifyResult =
  | { ok: true; email: string; mobile: string }
  | { ok: false; reason: "expired" | "invalid" };

/** Verifies a user-supplied code against a previously issued token. */
export function verifyOtpToken(token: string, otp: string): OtpVerifyResult {
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "invalid" };
  const [payloadB64, signature] = parts;

  let payload: OtpPayload;
  try {
    const json = Buffer.from(payloadB64, "base64").toString("utf8");
    payload = JSON.parse(json) as OtpPayload;
  } catch {
    return { ok: false, reason: "invalid" };
  }

  const expected = sign(payloadB64, otp.trim());
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: "invalid" };
  }
  if (Date.now() > payload.exp) {
    return { ok: false, reason: "expired" };
  }
  return { ok: true, email: payload.email, mobile: payload.mobile };
}

let cachedTransport: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  if (!cachedTransport) {
    cachedTransport = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth: { user, pass },
    });
  }
  return cachedTransport;
}

/**
 * Sends the OTP email. When SMTP env vars are not configured we skip the
 * network call and let the caller fall back to dev mode (returning the code).
 * Returns true when a real email was dispatched.
 */
export async function sendOtpEmail(email: string, otp: string): Promise<boolean> {
  const transport = getTransport();
  if (!transport) return false;

  const from =
    process.env.SMTP_FROM ?? `Kisan Sathi <${process.env.SMTP_USER}>`;

  await transport.sendMail({
    from,
    to: email,
    subject: `${otp} is your Kisan Sathi verification code`,
    text: `Your Kisan Sathi verification code is ${otp}. It expires in 5 minutes. If you did not request this, please ignore this email.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#059669">Kisan Sathi</h2>
        <p>Use the code below to verify your email address.</p>
        <p style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#0f172a">${otp}</p>
        <p style="color:#64748b">This code expires in 5 minutes. If you did not request it, you can safely ignore this email.</p>
      </div>
    `,
  });
  return true;
}

/** True when SMTP is configured (real emails will be sent). */
export function isEmailConfigured(): boolean {
  return getTransport() !== null;
}

/** Returns the sender address currently configured (for diagnostics). */
export function getConfiguredSender(): string | null {
  if (!isEmailConfigured()) return null;
  return process.env.SMTP_FROM ?? process.env.SMTP_USER ?? null;
}

/**
 * Checks the SMTP connection/credentials without sending an email.
 * Returns { ok: true } on success, or an error message on failure.
 */
export async function verifyTransport(): Promise<
  { ok: true } | { ok: false; error: string }
> {
  const transport = getTransport();
  if (!transport) {
    return { ok: false, error: "SMTP is not configured (missing host/user/pass)." };
  }
  try {
    await transport.verify();
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "SMTP verification failed.",
    };
  }
}
