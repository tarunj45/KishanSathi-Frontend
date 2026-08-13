"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, Leaf } from "lucide-react";

import { primaryNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-600 p-2 text-white">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Kisan Sathi</p>
            <p className="text-xs text-slate-500">Farmer advisory workspace</p>
          </div>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 p-2 text-slate-600 lg:hidden"
            aria-label="Close navigation"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {primaryNavigation.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-start gap-3 rounded-2xl px-4 py-3 transition",
                  isActive
                    ? "bg-emerald-50 text-emerald-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 rounded-xl p-2",
                    isActive ? "bg-emerald-100" : "bg-slate-100",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    {item.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}