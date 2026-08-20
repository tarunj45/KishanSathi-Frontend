import { NextResponse } from "next/server";

import { verifyOtpToken } from "@/lib/server/otp";

export async function POST(request: Request) {
  let body: { token?: string; otp?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ detail: "Invalid request." }, { status: 400 });
  }

  const token = (body.token ?? "").trim();
  const otp = (body.otp ?? "").trim();

  if (!token) {
    return NextResponse.json(
      { detail: "Your session expired. Please request a new code." },
      { status: 400 },
    );
  }
  if (!/^\d{6}$/.test(otp)) {
    return NextResponse.json(
      { detail: "OTP must be a 6-digit code." },
      { status: 400 },
    );
  }

  const result = verifyOtpToken(token, otp);
  if (!result.ok) {
    const detail =
      result.reason === "expired"
        ? "The code has expired. Please request a new one."
        : "The code you entered is incorrect.";
    return NextResponse.json({ detail }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    email: result.email,
    mobile: result.mobile,
  });
}
