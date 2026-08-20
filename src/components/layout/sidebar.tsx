"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Leaf, X } from "lucide-react";

import {
  navGroupTitlesHi,
  navigationGroups,
  navLabel,
} from "@/lib/navigation";
import { useLanguage } from "@/lib/use-language";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { lang } = useLanguage();

  return (
    <aside className="flex h-full w-full flex-col border-r border-slate-200 bg-white">
      {/* Brand */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 px-3 py-4 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          {/* Back arrow -> home, at the leftmost, to the LEFT of the leaf */}
          <Link
            href="/"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-emerald-600 transition hover:border-emerald-200 hover:bg-emerald-50/40"
            aria-label={lang === "en" ? "Back to home" : "होम पर वापस"}
            title={lang === "en" ? "Back to home" : "होम पर वापस"}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <Link href="/dashboard" onClick={onClose} className="flex min-w-0 items-center gap-2.5">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-glow">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-bold text-slate-900">
                Kisan Sathi
              </span>
              <span className="block truncate text-[11px] text-emerald-700">
                {lang === "en" ? "Farmer workspace" : "किसान कार्यक्षेत्र"}
              </span>
            </span>
          </Link>
        </div>

        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {/* Navigation */}
      <nav className="scroll-slim flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-6">
          {navigationGroups.map((group) => (
            <div key={group.title}>
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {lang === "en" ? group.title : navGroupTitlesHi[group.title] ?? group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  const label = navLabel(item.href, item.label, lang);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition",
                        isActive
                          ? "bg-emerald-50 text-emerald-900"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition",
                          isActive
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-semibold">{label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

    </aside>
  );
}
