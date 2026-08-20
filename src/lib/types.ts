import type { LucideIcon } from "lucide-react";

export type ModuleSlug =
  | "dashboard"
  | "crop-recommendation"
  | "weather-intelligence"
  | "irrigation-planning"
  | "disease-detection"
  | "market-prices"
  | "voice-assistant"
  | "expense-tracker"
  | "profit-calculator"
  | "crop-calendar"
  | "pest-alerts"
  | "profile"
  | "settings"
  | "notifications"
  | "help";

export interface NavigationItem {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export interface LandingHighlight {
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface FeatureCard {
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface ModuleTeaser {
  label: string;
  description: string;
  href: string;
}

export interface ServiceItem {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: "green" | "amber" | "blue" | "rose" | "violet";
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  timeframe: string;
  status: "done" | "active" | "planned";
  points: string[];
}

export interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

export interface StatCard {
  label: string;
  value: string;
  delta: string;
  tone: "green" | "amber" | "blue" | "rose";
}

export interface DashboardSummary {
  greeting: string;
  farmName: string;
  location: string;
  stats: StatCard[];
  alerts: string[];
  weeklyTrends: Array<{
    day: string;
    rainfall: number;
    soilMoisture: number;
    marketIndex: number;
  }>;
}

export interface ModuleSummary {
  title: string;
  description: string;
  nextStep: string;
  bullets: string[];
  hint?: string;
}

export interface AuthField {
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "password";
  placeholder: string;
}