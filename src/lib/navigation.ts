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

import type { NavigationGroup, NavigationItem } from "@/lib/types";

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

export const navigationGroups: NavigationGroup[] = [
  {
    title: "Overview",
    items: [primaryNavigation[0]],
  },
  {
    title: "Advisory",
    items: [
      primaryNavigation[1], // Crop Advisory
      primaryNavigation[2], // Weather Intelligence
      primaryNavigation[3], // Irrigation Planning
      primaryNavigation[4], // Crop Disease
      primaryNavigation[9], // Crop Calendar
      primaryNavigation[10], // Pest Alerts
    ],
  },
  {
    title: "Finance & Market",
    items: [
      primaryNavigation[5], // Market Prices
      primaryNavigation[7], // Expense Tracker
      primaryNavigation[8], // Profit Calculator
    ],
  },
  {
    title: "Assistant & Account",
    items: [
      primaryNavigation[6], // Voice Assistant
      primaryNavigation[11], // Notifications
      primaryNavigation[12], // Profile
      primaryNavigation[13], // Settings
    ],
  },
];

// Quick-access modules for the mobile bottom navigation bar.
export const mobileNavigation: NavigationItem[] = [
  primaryNavigation[0], // Dashboard
  primaryNavigation[2], // Weather
  primaryNavigation[5], // Market Prices
  primaryNavigation[6], // Voice Assistant
  primaryNavigation[11], // Notifications
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
    href: "/?auth=login",
  },
  {
    label: "Sign up",
    href: "/?auth=signup",
  },
];

// Hindi labels for the navigation chrome, keyed by route / group title.
// Used by the sidebar and mobile bottom navigation to translate menu items.
export const navGroupTitlesHi: Record<string, string> = {
  Overview: "अवलोकन",
  Advisory: "सलाह",
  "Finance & Market": "वित्त और बाज़ार",
  "Assistant & Account": "सहायक और खाता",
};

export const navItemLabelsHi: Record<string, string> = {
  "/dashboard": "डैशबोर्ड",
  "/crop-recommendation": "फसल सलाह",
  "/weather-intelligence": "मौसम जानकारी",
  "/irrigation-planning": "सिंचाई योजना",
  "/disease-detection": "फसल रोग",
  "/market-prices": "बाज़ार भाव",
  "/voice-assistant": "वॉइस असिस्टेंट",
  "/expense-tracker": "खर्च ट्रैकर",
  "/profit-calculator": "लाभ कैलकुलेटर",
  "/crop-calendar": "फसल कैलेंडर",
  "/pest-alerts": "कीट चेतावनी",
  "/notifications": "सूचनाएँ",
  "/profile": "प्रोफ़ाइल",
  "/settings": "सेटिंग्स",
  "/help": "मदद और जानकारी",
};

/** Returns the localized navigation label for a route. */
export function navLabel(href: string, fallback: string, lang: "en" | "hi") {
  return lang === "en" ? fallback : navItemLabelsHi[href] ?? fallback;
}
