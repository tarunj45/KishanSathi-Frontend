import {
  BellRing,
  BookOpen,
  Calculator,
  CalendarDays,
  CloudSun,
  Droplets,
  FlaskConical,
  IndianRupee,
  LayoutDashboard,
  Mic,
  ReceiptText,
  Settings,
  ShieldAlert,
  Sprout,
  UserRoundCog,
} from "lucide-react";

import type { NavigationItem } from "@/lib/types";

export const primaryNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    description: "Overview, alerts, and quick actions",
    icon: LayoutDashboard,
  },
  {
    label: "Crop Advisory",
    href: "/crop-recommendation",
    description: "Suggested crops by soil and season",
    icon: Sprout,
  },
  {
    label: "Weather Intelligence",
    href: "/weather-intelligence",
    description: "Forecasts, rainfall, and advisories",
    icon: CloudSun,
  },
  {
    label: "Irrigation Planning",
    href: "/irrigation-planning",
    description: "Watering schedule and soil status",
    icon: Droplets,
  },
  {
    label: "Crop Disease",
    href: "/disease-detection",
    description: "Upload symptoms or images later",
    icon: FlaskConical,
  },
  {
    label: "Market Prices",
    href: "/market-prices",
    description: "Current rates and price trend",
    icon: IndianRupee,
  },
  {
    label: "Voice Assistant",
    href: "/voice-assistant",
    description: "Hindi-friendly voice prompts",
    icon: Mic,
  },
  {
    label: "Expense Tracker",
    href: "/expense-tracker",
    description: "Input costs and category totals",
    icon: ReceiptText,
  },
  {
    label: "Profit Calculator",
    href: "/profit-calculator",
    description: "Yield, cost, and expected margin",
    icon: Calculator,
  },
  {
    label: "Crop Calendar",
    href: "/crop-calendar",
    description: "Sowing and harvest reminders",
    icon: CalendarDays,
  },
  {
    label: "Pest Alerts",
    href: "/pest-alerts",
    description: "Community warnings and outbreaks",
    icon: ShieldAlert,
  },
  {
    label: "Notifications",
    href: "/notifications",
    description: "Actionable reminders and updates",
    icon: BellRing,
  },
  {
    label: "Profile",
    href: "/profile",
    description: "Farmer information and farm profile",
    icon: UserRoundCog,
  },
  {
    label: "Settings",
    href: "/settings",
    description: "Language, reminders, and privacy",
    icon: Settings,
  },
  {
    label: "Help & About",
    href: "/help",
    description: "How the advisory system works",
    icon: BookOpen,
  },
];

export const utilityNavigation: NavigationItem[] = [
  {
    label: "Notifications",
    href: "/notifications",
    description: "Recent alerts",
    icon: BellRing,
  },
  {
    label: "Profile",
    href: "/profile",
    description: "Farmer account",
    icon: UserRoundCog,
  },
  {
    label: "Settings",
    href: "/settings",
    description: "Preferences",
    icon: Settings,
  },
];

export const authNavigation = [
  {
    label: "Login",
    href: "/auth/login",
  },
  {
    label: "Sign up",
    href: "/auth/signup",
  },
];