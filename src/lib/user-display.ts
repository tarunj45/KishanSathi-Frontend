import type { AuthUser } from "@/lib/auth-client";
import type { Lang } from "@/lib/use-language";

/** Derives a friendly display name until a real name field is collected. */
export function getDisplayName(user: AuthUser | null): string {
  if (!user) return "Kisan";
  if (user.fullName && user.fullName.trim()) {
    return user.fullName.trim().split(/\s+/)[0];
  }
  const base = user.email ? user.email.split("@")[0] : user.mobile;
  if (!base) return "Kisan";
  return base.charAt(0).toUpperCase() + base.slice(1);
}

const GREETINGS = {
  en: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
  },
  hi: {
    morning: "सुप्रभात",
    afternoon: "शुभ दोपहर",
    evening: "शुभ संध्या",
  },
} as const;

/** Time-of-day greeting. Call on the client to avoid SSR/clock mismatch. */
export function getGreeting(lang: Lang): string {
  const hour = new Date().getHours();
  const key = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
  return GREETINGS[lang][key];
}
