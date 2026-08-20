"use client";

import { normalizeMobile } from "@/lib/auth-validation";

/**
 * OTP plumbing for the sign-up flow. Account creation, login and the farmer
 * profile now live in the FastAPI backend (see auth-client.ts). This module
 * only coordinates the two OTP API routes and remembers the signed token +
 * the mobile/email being verified between steps.
 */

const PENDING_KEY = "ks-pending-signup";

interface PendingSignup {
  mobile: string;
  email: string;
  /** Signed token issued by the OTP API; the code itself is never stored. */
  token: string;
  verified: boolean;
}

function readPending(): PendingSignup | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PENDING_KEY);
    return raw ? (JSON.parse(raw) as PendingSignup) : null;
  } catch {
    return null;
  }
}

function writePending(pending: PendingSignup | null) {
  if (pending) {
    window.localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  } else {
    window.localStorage.removeItem(PENDING_KEY);
  }
}

export function getPendingSignup(): { mobile: string; email: string } | null {
  const pending = readPending();
  return pending ? { mobile: pending.mobile, email: pending.email } : null;
}

export function clearPendingSignup() {
  writePending(null);
}

interface OtpSendResponse {
  token: string;
  delivered: boolean;
  emailConfigured: boolean;
  devOtp?: string;
}

async function requestOtp(
  mobile: string,
  email: string,
): Promise<OtpSendResponse> {
  const res = await fetch("/api/auth/otp/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile, email }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (data as { detail?: string }).detail ?? "Could not send the code.",
    );
  }
  return data as OtpSendResponse;
}

/** Step 1: request an OTP email for the given mobile + email. */
export async function localSignupInit(
  mobile: string,
  email: string,
): Promise<{ devOtp?: string; delivered: boolean }> {
  const cleanMobile = normalizeMobile(mobile.trim());
  const cleanEmail = email.trim().toLowerCase();

  const { token, delivered, devOtp } = await requestOtp(cleanMobile, cleanEmail);
  writePending({
    mobile: cleanMobile,
    email: cleanEmail,
    token,
    verified: false,
  });
  return { devOtp, delivered };
}

/** Re-issues a fresh OTP (new email) for the pending signup. */
export async function localResendOtp(): Promise<{
  devOtp?: string;
  delivered: boolean;
}> {
  const pending = readPending();
  if (!pending) throw new Error("Your session expired. Please start again.");
  const { token, delivered, devOtp } = await requestOtp(
    pending.mobile,
    pending.email,
  );
  writePending({ ...pending, token, verified: false });
  return { devOtp, delivered };
}

/** Step 2: verify the emailed OTP against the signed token. */
export async function localVerifyOtp(code: string): Promise<void> {
  const pending = readPending();
  if (!pending) throw new Error("Your session expired. Please start again.");

  const res = await fetch("/api/auth/otp/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: pending.token, otp: code.trim() }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (data as { detail?: string }).detail ?? "Verification failed.",
    );
  }
  writePending({ ...pending, verified: true });
}
