import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CloudSun,
  IndianRupee,
  Mic,
  ShieldCheck,
  Sprout,
  Wheat,
} from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { cardStyles } from "@/components/ui/card";
import { featureCards, landingHighlights, moduleTeasers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="bg-app-gradient min-h-screen">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-3xl border border-emerald-900/10 bg-white/90 p-5 shadow-sm backdrop-blur sm:p-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-emerald-800">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1">
              <Sprout className="h-3.5 w-3.5" />
              PWA-ready frontend
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-900">
              <Wheat className="h-3.5 w-3.5" />
              English + Hindi UI-ready
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Kisan Sathi helps smallholder farmers make faster crop decisions.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                An AI-powered crop advisory frontend for weather, irrigation,
                disease checks, market intelligence, and profit planning. The
                UI is built to plug into real FastAPI and ML services later.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard" className={buttonStyles()}>
                  Open dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/auth/login" className={buttonStyles("secondary")}>
                  Farmer login
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                  <BarChart3 className="h-4 w-4 text-emerald-600" />
                  Advisory dashboards
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                  <CloudSun className="h-4 w-4 text-sky-600" />
                  Weather intelligence
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                  <Mic className="h-4 w-4 text-amber-600" />
                  Hindi voice assistant
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {landingHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.label} className={cn(cardStyles(), "p-4")}>
                    <div className="mb-3 inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      {item.label}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.label} className={cn(cardStyles(), "p-5")}>
                <div className="mb-4 inline-flex rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className={cn(cardStyles(), "overflow-hidden p-6")}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-emerald-700">Platform flow</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                  Designed around the farmer journey
                </h2>
              </div>
              <ShieldCheck className="h-10 w-10 text-emerald-600" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {moduleTeasers.map((module) => (
                <Link
                  key={module.href}
                  href={module.href}
                  className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {module.label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {module.description}
                      </p>
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 text-emerald-600 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </article>

          <article className={cn(cardStyles(), "p-6")}>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                <IndianRupee className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-700">Example use cases</p>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Simple, readable, mobile-first
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Hindi-ready example
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  “Aaj irrigation karni chahiye kya?” can later map to the
                  weather and irrigation modules without changing the UI flow.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Future API integration
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Current screens use mock data and abstract service helpers so
                  FastAPI endpoints can be connected later with minimal refactor.
                </p>
              </div>
            </div>

            <Link href="/help" className={buttonStyles("secondary", "mt-6 w-full")}>
              Read about the system
              <BookOpen className="h-4 w-4" />
            </Link>
          </article>
        </section>
      </section>
    </main>
  );
}
