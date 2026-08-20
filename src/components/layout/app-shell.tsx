"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Leaf } from "lucide-react";

import { BottomNav } from "@/components/layout/bottom-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { WelcomeOverlay } from "@/components/layout/welcome-overlay";
import { useAuth } from "@/lib/use-auth";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, ready, user } = useAuth();

  // Guard: the dashboard cannot open without logging in, and first-time
  // farmers must complete onboarding once before reaching the workspace.
  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated) {
      router.replace(`/?auth=login&next=${encodeURIComponent(pathname)}`);
    } else if (user && !user.onboarded) {
      router.replace(`/onboarding?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, isAuthenticated, user, pathname, router]);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  // While auth is resolving or a redirect is in flight, avoid flashing the dashboard.
  if (!ready || !isAuthenticated || (user && !user.onboarded)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-app-gradient">
        <div className="flex items-center gap-3 text-slate-500">
          <Leaf className="h-5 w-5 animate-pulse text-emerald-600" />
          <span className="text-sm font-medium">Checking your session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-gradient lg:grid lg:grid-cols-[288px_1fr] xl:grid-cols-[320px_1fr]">
      {/* One-time welcome greeting right after login */}
      <WelcomeOverlay />

      {/* Desktop sidebar */}
      <div className="hidden lg:sticky lg:top-0 lg:block lg:h-screen">
        <Sidebar />
      </div>

      {/* Mobile / tablet drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isSidebarOpen}
      >
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute inset-0 bg-slate-950/50 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute left-0 top-0 h-full w-[86%] max-w-[320px] shadow-2xl transition-transform duration-300 ease-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-col">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 px-4 py-5 pb-24 sm:px-6 lg:px-8 lg:py-8 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <BottomNav />
    </div>
  );
}
