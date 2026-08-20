"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mobileNavigation, navLabel } from "@/lib/navigation";
import { useLanguage } from "@/lib/use-language";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
        {mobileNavigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 px-1 py-2.5 text-[10px] font-semibold transition",
                isActive ? "text-emerald-700" : "text-slate-500",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-xl transition",
                  isActive ? "bg-emerald-100 text-emerald-700" : "text-slate-500",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="max-w-[64px] truncate">
                {navLabel(item.href, item.label, lang)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
