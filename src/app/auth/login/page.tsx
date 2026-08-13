import Link from "next/link";
import { ArrowRight, Tractor, UserRound, LockKeyhole, Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <section className="grid w-full gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Card className="p-6 sm:p-8">
        <div className="max-w-xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Farmer login
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Sign in to your crop advisory workspace
          </h1>
          <p className="text-base leading-7 text-slate-600">
            This is only the frontend UI for now. Later, these fields can wire
            into FastAPI authentication without changing the page structure.
          </p>

          <label className="block space-y-2 text-sm font-medium text-slate-700">
            <span className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-emerald-600" />
              Interface language
            </span>
            <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 focus:border-emerald-400">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-emerald-600" />
                Mobile number / Email
              </span>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400"
                type="text"
                placeholder="98765 43210"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2">
                <LockKeyhole className="h-4 w-4 text-emerald-600" />
                Password
              </span>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400"
                type="password"
                placeholder="••••••••"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button>
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Link href="/auth/signup">
              <Button variant="secondary">Create farmer account</Button>
            </Link>
            <Link href="/auth/forgot-password" className="text-sm font-semibold text-emerald-700 underline underline-offset-4">
              Forgot password?
            </Link>
          </div>
        </div>
      </Card>

      <Card className="flex flex-col justify-between gap-6 p-6 sm:p-8">
        <div className="rounded-3xl bg-emerald-50 p-6 text-emerald-900">
          <Tractor className="h-10 w-10" />
          <h2 className="mt-4 text-2xl font-semibold">Designed for field use</h2>
          <p className="mt-2 text-sm leading-6">
            Large touch targets, soft contrast, and a clear structure make the UI
            practical for mobile-first farm workflows.
          </p>
        </div>

        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Languages className="h-5 w-5 text-emerald-600" />
            English labels now, Hindi-ready copy later.
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Tractor className="h-5 w-5 text-emerald-600" />
            Includes a simple path to the dashboard and advisory modules.
          </div>
        </div>
      </Card>
    </section>
  );
}