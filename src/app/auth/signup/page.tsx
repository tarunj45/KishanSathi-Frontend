import Link from "next/link";
import { ArrowRight, Phone, UserRound, MapPin, Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <section className="grid w-full gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Card className="p-6 sm:p-8">
        <div className="max-w-xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Farmer signup
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Create a simple account for your farm profile
          </h1>
          <p className="text-base leading-7 text-slate-600">
            This page is UI-only for now. It is structured so backend auth,
            profile storage, and language preferences can be connected later.
          </p>

          <label className="block space-y-2 text-sm font-medium text-slate-700">
            <span className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-emerald-600" />
              Preferred language
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
                Full name
              </span>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400"
                type="text"
                placeholder="Ramesh Kumar"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600" />
                Mobile number
              </span>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400"
                type="tel"
                placeholder="98765 43210"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                District
              </span>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-400"
                type="text"
                placeholder="Bareilly"
              />
            </label>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-emerald-600" />
                Preferred language
              </span>
              <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-0 focus:border-emerald-400">
                <option>English</option>
                <option>Hindi</option>
              </select>
            </label>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button>
              Create account
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Link href="/auth/login">
              <Button variant="secondary">Already have an account</Button>
            </Link>
          </div>
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-slate-900">What the profile can support</h2>
        <div className="mt-5 space-y-3 text-sm text-slate-600">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            Farm size, crops, and seasonal preferences for personalizing advisory cards.
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            Notification and language settings for English and Hindi experiences.
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            Future links to crop recommendation, reminders, weather, and market tools.
          </div>
        </div>
      </Card>
    </section>
  );
}