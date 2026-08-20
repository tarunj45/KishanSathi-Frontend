import Link from "next/link";
import { ArrowRight, Languages, ShieldCheck, MessageSquareText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <section className="grid w-full gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Card className="p-6 sm:p-8">
        <div className="max-w-xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Forgot password
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Recover access to your farmer account
          </h1>
          <p className="text-base leading-7 text-slate-600">
            Use this recovery screen to restore account access through a future SMS, OTP, or support-assisted reset flow.
          </p>

          <label className="block space-y-2 text-sm font-medium text-slate-700">
            <span>Mobile number or email</span>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400"
              type="text"
              placeholder="98765 43210"
            />
          </label>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button>
              Send reset link
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Link href="/?auth=login">
              <Button variant="secondary">Back to login</Button>
            </Link>
          </div>
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            Future reset flows can connect to SMS or OTP verification.
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <MessageSquareText className="h-5 w-5 text-emerald-600" />
            Support-assisted recovery can be added without changing this UI.
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Languages className="h-5 w-5 text-emerald-600" />
            Hindi-ready copy can be swapped in alongside English labels later.
          </div>
        </div>
      </Card>
    </section>
  );
}