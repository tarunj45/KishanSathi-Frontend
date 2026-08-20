import { NextResponse } from "next/server";

import {
  createOtpToken,
  generateOtp,
  isEmailConfigured,
  sendOtpEmail,
} from "@/lib/server/otp";

const MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { mobile?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ detail: "Invalid request." }, { status: 400 });
  }

  const mobile = (body.mobile ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();

  if (!MOBILE_REGEX.test(mobile)) {
    return NextResponse.json(
      { detail: "Enter a valid 10-digit Indian mobile number." },
      { status: 400 },
    );
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { detail: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const otp = generateOtp();
  const token = createOtpToken(email, mobile, otp);

  let delivered = false;
  try {
    delivered = await sendOtpEmail(email, otp);
  } catch (err) {
    console.error("[otp] email send failed:", err);
    return NextResponse.json(
      { detail: "Could not send the email. Please try again." },
      { status: 502 },
    );
  }

  // In dev (no SMTP configured) surface the code so the flow is testable.
  const devOtp = delivered ? undefined : otp;
  if (!delivered) {
    console.info(`[otp] (dev) code for ${email}: ${otp}`);
  }

  return NextResponse.json({
    token,
    delivered,
    emailConfigured: isEmailConfigured(),
    ...(devOtp ? { devOtp } : {}),
  });
}
