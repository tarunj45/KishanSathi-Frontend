import { NextResponse } from "next/server";

import {
  getConfiguredSender,
  isEmailConfigured,
  verifyTransport,
} from "@/lib/server/otp";

/**
 * Diagnostics endpoint: confirms whether the OTP mailer is configured and can
 * connect, WITHOUT sending an email. Open http://localhost:3000/api/auth/otp/health
 */
export async function GET() {
  const configured = isEmailConfigured();
  if (!configured) {
    return NextResponse.json({
      configured: false,
      connection: "skipped",
      sender: null,
      hint: "Set SMTP_HOST, SMTP_USER and SMTP_PASS in .env.local, then restart the dev server.",
    });
  }

  const result = await verifyTransport();
  return NextResponse.json({
    configured: true,
    connection: result.ok ? "ok" : "failed",
    sender: getConfiguredSender(),
    ...(result.ok ? {} : { error: result.error }),
  });
}
