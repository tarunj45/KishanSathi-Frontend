"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, UserCog } from "lucide-react";

import { FarmerAvatar } from "@/components/ui/farmer-avatar";
import { useAuth } from "@/lib/use-auth";
import { useLanguage } from "@/lib/use-language";
import { getDisplayName, getGreeting } from "@/lib/user-display";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  /** Show the greeting + name text next to the avatar (hidden on small screens). */
  showName?: boolean;
  className?: string;
}

/**
 * Avatar + name chip that opens a dropdown with "Update profile" and "Logout".
 * Used in both the welcome hub header and the in-app topbar.
 */
export function UserMenu({ showName = true, className }: UserMenuProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleUpdateProfile = () => {
    setOpen(false);
    router.push("/onboarding?edit=1&next=/dashboard");
  };

  const handleLogout = () => {
    setOpen(false);
    logout();
    router.push("/");
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1 pl-3 pr-2 transition hover:border-emerald-200 hover:bg-emerald-50/40"
      >
        {showName ? (
          <span className="hidden text-right leading-tight sm:block">
            <span className="block text-[11px] text-slate-500">
              {getGreeting(lang)}
            </span>
            <span className="block text-sm font-bold text-slate-900">
              {getDisplayName(user)}
            </span>
          </span>
        ) : null}
        <FarmerAvatar className="h-9 w-9" />
        <ChevronDown
          className={cn(
            "h-4 w-4 text-slate-400 transition",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1.5 shadow-xl"
        >
          <div className="border-b border-slate-100 px-4 py-2.5">
            <p className="text-sm font-bold text-slate-900">
              {getDisplayName(user)}
            </p>
            {user?.email ? (
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            ) : null}
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={handleUpdateProfile}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
          >
            <UserCog className="h-4 w-4 text-emerald-600" />
            {lang === "en" ? "Update profile" : "प्रोफ़ाइल अपडेट करें"}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
          >
            <LogOut className="h-4 w-4" />
            {lang === "en" ? "Log out" : "लॉग आउट"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
