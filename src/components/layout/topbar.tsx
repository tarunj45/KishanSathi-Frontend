"use client";

import Link from "next/link";
import { Bell, Menu, MapPin, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 sm:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-500">
            Search crops, advisories, or reminders...
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Badge className="hidden sm:inline-flex">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            Bareilly
          </Badge>

          <Link
            href="/notifications"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700"
            aria-label="Open notifications"
          >
            <Bell className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}