"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Languages,
  Leaf,
  LayoutDashboard,
  LogIn,
  Lock,
  PlayCircle,
  Smartphone,
  Sparkles,
  Sprout,
  Star,
} from "lucide-react";

import { AuthModal } from "@/components/auth/auth-modal";
import { Tubewell } from "@/components/landing/tubewell";
import { UserMenu } from "@/components/layout/user-menu";
import { buttonStyles } from "@/components/ui/button";
import { services, strings } from "@/lib/landing-content";
import { useAuth } from "@/lib/use-auth";
import { useLanguage } from "@/lib/use-language";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "signup";

const accentStyles: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-sky-50 text-sky-700",
  rose: "bg-rose-50 text-rose-700",
  violet: "bg-violet-50 text-violet-700",
};

export function LandingPage() {
  const { lang, setLang } = useLanguage();
  const { isAuthenticated } = useAuth();
  const t = strings[lang];

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authNext, setAuthNext] = useState("/dashboard");

  const openAuth = (mode: AuthMode, next = "/dashboard") => {
    setAuthMode(mode);
    setAuthNext(next);
    setAuthOpen(true);
  };

  // Auto-open the modal when redirected here with ?auth=login|signup (&next=...).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get("auth");
    if (auth === "login" || auth === "signup") {
      setAuthMode(auth);
      setAuthNext(params.get("next") || "/dashboard");
      setAuthOpen(true);
    }
  }, []);

  const stats = [
    { value: "12+", label: t.stat_tools },
    { value: "2", label: t.stat_langs },
    { value: "100%", label: t.stat_mobile },
    { value: "24/7", label: t.stat_guidance },
  ];

  return (
    <div id="top" className="min-h-screen bg-app-gradient">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-emerald-900/5 glass-card">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 rounded-xl outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-emerald-300"
            aria-label={lang === "en" ? "Back to top" : "ऊपर जाएँ"}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-glow">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-bold text-slate-900">
                Kisan Sathi
              </span>
              <span className="block text-[11px] font-medium text-emerald-700">
                {t.tagline}
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#about" className="transition hover:text-emerald-700">
              {t.nav_about}
            </a>
            <a href="#help" className="transition hover:text-emerald-700">
              {t.nav_help}
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className="flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={cn(
                  "rounded-full px-2.5 py-1 transition",
                  lang === "en"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-500 hover:text-slate-900",
                )}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                className={cn(
                  "rounded-full px-2.5 py-1 transition",
                  lang === "hi"
                    ? "bg-emerald-600 text-white"
                    : "text-slate-500 hover:text-slate-900",
                )}
                aria-pressed={lang === "hi"}
              >
                हिं
              </button>
            </div>

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={buttonStyles("primary", "px-4 py-2.5")}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {lang === "en" ? "Dashboard" : "डैशबोर्ड"}
                  </span>
                </Link>
                <UserMenu />
              </>
            ) : (
              <button
                type="button"
                onClick={() => openAuth("login")}
                className={buttonStyles("primary", "px-4 py-2.5")}
              >
                <LogIn className="h-4 w-4" />
                {t.nav_login}
              </button>
            )}
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20 lg:px-8">
          <div className="animate-fade-up space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800">
              <Sparkles className="h-3.5 w-3.5" />
              {t.hero_badge}
            </span>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t.hero_title}{" "}
              <span className="text-emerald-600">{t.hero_title_accent}</span>.
            </h1>

            <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              {t.hero_desc}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className={buttonStyles("primary", "w-full justify-center sm:w-auto")}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {lang === "en" ? "Go to dashboard" : "डैशबोर्ड पर जाएं"}
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openAuth("login")}
                    className={buttonStyles("primary", "w-full justify-center sm:w-auto")}
                  >
                    <LogIn className="h-4 w-4" />
                    {t.hero_login}
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuth("signup")}
                    className={buttonStyles("secondary", "w-full justify-center sm:w-auto")}
                  >
                    {t.hero_signup}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-emerald-600" />
                {t.feat_lowend}
              </span>
              <span className="inline-flex items-center gap-2">
                <Languages className="h-4 w-4 text-emerald-600" />
                {t.feat_lang}
              </span>
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" />
                {t.feat_free}
              </span>
            </div>
          </div>

          {/* Farmer photo */}
          <div className="animate-fade-up lg:justify-self-end">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/60 shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80"
                alt={
                  lang === "en"
                    ? "Farmer inspecting healthy crops in the field"
                    : "खेत में अपनी फसल देखता हुआ किसान"
                }
                width={900}
                height={1000}
                priority
                className="h-[380px] w-full object-cover sm:h-[460px] lg:h-[500px]"
              />

              {/* Soft gradient + floating caption */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <div className="absolute inset-x-4 bottom-4">
                <div className="flex items-center gap-3 rounded-2xl bg-white/90 p-3 shadow-soft backdrop-blur">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
                    <Sprout className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {lang === "en"
                        ? "Healthy crop, smart advice"
                        : "स्वस्थ फसल, स्मार्ट सलाह"}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {lang === "en"
                        ? "Guidance for every stage of farming"
                        : "खेती के हर चरण के लिए मार्गदर्शन"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 rounded-3xl border border-slate-200 bg-white/70 p-4 shadow-soft sm:gap-4 md:grid-cols-4 md:p-6">
            {stats.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-2xl font-bold text-emerald-600 sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <section id="services" className="scroll-mt-20 py-12 lg:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {t.services_eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {t.services_title}
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {t.services_desc}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.map((service) => {
                const Icon = service.icon;
                const content = service[lang];

                const cardClass =
                  "group relative rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-soft transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-glow";

                const inner = (
                  <>
                    {!isAuthenticated ? (
                      <span
                        className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500"
                        title="Login required"
                      >
                        <Lock className="h-3 w-3" />
                      </span>
                    ) : null}
                    <div
                      className={cn(
                        "inline-flex rounded-2xl p-3",
                        accentStyles[service.accent],
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      {content.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {content.desc}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                      {t.service_cta}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </>
                );

                // Logged in -> open the module. Logged out -> prompt login first.
                return isAuthenticated ? (
                  <Link key={service.href} href={service.href} className={cardClass}>
                    {inner}
                  </Link>
                ) : (
                  <button
                    key={service.href}
                    type="button"
                    onClick={() => openAuth("login", service.href)}
                    className={cn(cardClass, "w-full")}
                  >
                    {inner}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-20 py-12 lg:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl bg-hero-gradient p-6 text-white shadow-soft sm:p-10 lg:p-14">
              <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div className="space-y-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-100">
                    <Leaf className="h-3.5 w-3.5" />
                    {t.about_badge}
                  </span>
                  <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                    {t.about_title}
                  </h2>
                  <p className="text-base leading-7 text-emerald-50/90">
                    {t.about_desc}
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[t.about_p1, t.about_p2, t.about_p3, t.about_p4].map(
                      (point) => (
                        <div
                          key={point}
                          className="flex items-start gap-2.5 rounded-2xl bg-white/10 p-3.5 text-sm leading-6 text-emerald-50"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                          {point}
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <PlayCircle className="h-8 w-8 text-emerald-200" />
                    <p className="text-lg font-semibold">{t.about_how}</p>
                  </div>
                  <ul className="mt-5 space-y-4">
                    {[
                      [t.how_decide, t.how_decide_t],
                      [t.how_protect, t.how_protect_t],
                      [t.how_earn, t.how_earn_t],
                    ].map(([title, text]) => (
                      <li key={title} className="flex gap-3">
                        <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/90 text-xs font-bold text-emerald-950">
                          {title.charAt(0)}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {title}
                          </p>
                          <p className="text-sm text-emerald-50/80">{text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tubewell / water */}
        <section id="water" className="scroll-mt-20 py-12 lg:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 rounded-3xl border border-emerald-100 bg-white/70 p-6 shadow-soft sm:p-10 lg:grid-cols-2 lg:p-14">
              <div className="flex justify-center lg:justify-start">
                <Tubewell className="h-64 w-64 drop-shadow-sm sm:h-80 sm:w-80" />
              </div>

              <div className="space-y-4 text-center lg:text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {lang === "en" ? "Water that works" : "पानी जो काम आए"}
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {lang === "en"
                    ? "Every drop, at the right time"
                    : "हर बूँद, सही समय पर"}
                </h2>
                <p className="mx-auto max-w-xl text-base leading-7 text-slate-600 lg:mx-0">
                  {lang === "en"
                    ? "From tubewell to field, Kisan Sathi helps you plan irrigation so your crops get just enough water without waste."
                    : "ट्यूबवेल से खेत तक, किसान साथी सिंचाई की योजना बनाने में मदद करता है ताकि आपकी फसल को बिना बर्बादी के पर्याप्त पानी मिले।"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center sm:p-12">
              {isAuthenticated ? (
                <>
                  <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    {t.login_title}
                  </h2>
                  <Link
                    href="/dashboard"
                    className={buttonStyles("primary", "w-full justify-center sm:w-auto")}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    {lang === "en" ? "Go to dashboard" : "डैशबोर्ड पर जाएं"}
                  </Link>
                </>
              ) : (
                <>
                  <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    {t.cta_title}
                  </h2>
                  <p className="max-w-xl text-base leading-7 text-slate-600">
                    {t.cta_desc}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => openAuth("signup")}
                      className={buttonStyles("primary", "w-full justify-center sm:w-auto")}
                    >
                      {t.cta_start}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => openAuth("login")}
                      className={buttonStyles("secondary", "w-full justify-center sm:w-auto")}
                    >
                      <LogIn className="h-4 w-4" />
                      {t.cta_have}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="help" className="scroll-mt-20 border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <Leaf className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold text-slate-900">
                  Kisan Sathi
                </span>
              </div>
              <p className="max-w-xs text-sm leading-6 text-slate-500">
                {t.footer_desc}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">{t.footer_help}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                <li>
                  <Link href="/help" className="hover:text-emerald-700">
                    {t.help_center}
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-emerald-700">
                    {t.contact}
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-emerald-700">
                    {t.faqs}
                  </Link>
                </li>
                <li>
                  <a href="#about" className="hover:text-emerald-700">
                    {t.how_it_works}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">{t.footer_quick}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                <li>
                  <a href="#services" className="hover:text-emerald-700">
                    {t.services_eyebrow}
                  </a>
                </li>
                <li>
                  <a href="#water" className="hover:text-emerald-700">
                    {lang === "en" ? "Water & irrigation" : "पानी और सिंचाई"}
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openAuth("login")}
                    className="hover:text-emerald-700"
                  >
                    {t.nav_login}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openAuth("signup")}
                    className="hover:text-emerald-700"
                  >
                    {t.nav_signup}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">{t.footer_legal}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                <li>
                  <Link href="/help" className="hover:text-emerald-700">
                    {t.privacy}
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-emerald-700">
                    {t.terms}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Kisan Sathi. {t.rights}
            </p>
            <p className="text-xs text-slate-400">
              Made for Bharat&apos;s farmers 🌱
            </p>
          </div>
        </div>
      </footer>

      <AuthModal
        open={authOpen}
        mode={authMode}
        next={authNext}
        lang={lang}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
}
