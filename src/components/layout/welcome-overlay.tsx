"use client";

import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

import { useLanguage } from "@/lib/use-language";
import { cn } from "@/lib/utils";

const FLAG_KEY = "ks-welcome-name";

/**
 * One-time full-screen greeting shown right after login. The name is dropped
 * into sessionStorage at login; this overlay picks it up, animates in, and
 * clears the flag so it never repeats on refresh.
 */
export function WelcomeOverlay() {
  const { lang } = useLanguage();
  const [name, setName] = useState<string | null>(null);
  const [phase, setPhase] = useState<"in" | "out">("in");

  // Read the flag on every mount, but DON'T clear it here. Right after login
  // the auth-gated shell remounts (ready flips false->true, plus StrictMode),
  // so clearing on first read would strand a later remount with no greeting.
  // We keep the flag until the fade fully completes so any remount can resume.
  useEffect(() => {
    const stored = window.sessionStorage.getItem(FLAG_KEY);
    if (stored) setName(stored);
  }, []);

  // Drive the animation off `name`: hold 1s, fade out over 2s, then unmount and
  // finally clear the flag so it never repeats on the next refresh.
  useEffect(() => {
    if (!name) return;
    setPhase("in");
    const outTimer = setTimeout(() => setPhase("out"), 1000);
    const doneTimer = setTimeout(() => {
      window.sessionStorage.removeItem(FLAG_KEY);
      setName(null);
    }, 3000);
    return () => {
      clearTimeout(outTimer);
      clearTimeout(doneTimer);
    };
  }, [name]);

  if (!name) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-hero-gradient transition-opacity duration-[2000ms] ease-out",
        phase === "out" ? "opacity-0" : "opacity-100",
      )}
      aria-live="polite"
    >
      <div
        className={cn(
          "flex flex-col items-center gap-4 text-center text-white transition-all duration-[2000ms] ease-out",
          phase === "out"
            ? "scale-110 opacity-0"
            : "scale-100 opacity-100",
        )}
        style={{
          animation:
            phase === "in" ? "welcome-pop 0.7s cubic-bezier(0.22,1,0.36,1)" : undefined,
        }}
      >
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 backdrop-blur">
          <Leaf className="h-8 w-8" />
        </span>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100">
          {lang === "en" ? "Welcome" : "स्वागत है"}
        </p>
        <h1 className="text-4xl font-bold sm:text-6xl">
          {lang === "en" ? "Welcome" : "स्वागत है"}, {name} 👋
        </h1>
      </div>
    </div>
  );
}
