"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Leaf, MapPin, Menu } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { UserMenu } from "@/components/layout/user-menu";
import { useFarmProfile } from "@/lib/use-farm-profile";
import { useLanguage } from "@/lib/use-language";
import { cn } from "@/lib/utils";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { lang, setLang } = useLanguage();
  const { profile } = useFarmProfile();

  const locationLabel =
    profile?.district?.trim() || profile?.village?.trim() || "";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 glass-card">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Mobile: hamburger */}
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile: back arrow to home, placed to the LEFT of the leaf brand */}
        <Link
          href="/"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50/40 lg:hidden"
          aria-label={lang === "en" ? "Back to home" : "होम पर वापस"}
          title={lang === "en" ? "Back to home" : "होम पर वापस"}
        >
          <ArrowLeft className="h-5 w-5 text-emerald-600" />
        </Link>

        {/* Mobile: compact brand */}
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="text-sm font-bold text-slate-900">Kisan Sathi</span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          {/* Language toggle (same as the landing page) */}
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

          {locationLabel ? (
            <Badge className="hidden sm:inline-flex">
              <MapPin className="mr-1 h-3.5 w-3.5" />
              {locationLabel}
            </Badge>
          ) : null}

          <Link
            href="/notifications"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
            aria-label="Open notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </Link>

          {/* Greeting + dropdown (Update profile / Log out) */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
