import {
  BellRing,
  CloudSun,
  Droplets,
  IndianRupee,
  Mic,
  ShieldCheck,
  Sprout,
  Tractor,
} from "lucide-react";

import type {
  DashboardSummary,
  FeatureCard,
  LandingHighlight,
  ModuleSummary,
  ModuleTeaser,
} from "@/lib/types";

export const landingHighlights: LandingHighlight[] = [
  {
    label: "Simple for low-end phones",
    description:
      "Large touch targets, clear spacing, and quick-glance cards make the interface easy to use in the field.",
    icon: Tractor,
  },
  {
    label: "Ready for real APIs later",
    description:
      "Pages consume typed mock data through service helpers so backend endpoints can replace them module by module.",
    icon: ShieldCheck,
  },
  {
    label: "Hindi-friendly voice flow",
    description:
      "The UI includes voice assistant entry points and bilingual-ready labels for conversational advisories.",
    icon: Mic,
  },
  {
    label: "Market and weather aware",
    description:
      "Price, rainfall, and irrigation screens are designed to help farmers act on timely signals.",
    icon: CloudSun,
  },
];

export const featureCards: FeatureCard[] = [
  {
    label: "Crop advisory",
    description: "Recommend suitable crops by land, season, and local conditions.",
    icon: Sprout,
  },
  {
    label: "Water planning",
    description: "Track rainfall, soil moisture, and irrigation timing in one view.",
    icon: Droplets,
  },
  {
    label: "Financial tracking",
    description: "Estimate profits, log costs, and watch market prices in context.",
    icon: IndianRupee,
  },
  {
    label: "Alerts and reminders",
    description: "Surface disease warnings, pest reports, and seasonal reminders.",
    icon: BellRing,
  },
];

export const moduleTeasers: ModuleTeaser[] = [
  {
    label: "Farmer dashboard",
    description: "A quick overview of farm signals, advisories, and next actions.",
    href: "/dashboard",
  },
  {
    label: "Crop recommendation",
    description: "A guided card flow for deciding which crop to plant next.",
    href: "/crop-recommendation",
  },
  {
    label: "Weather intelligence",
    description: "Forecasts and field-ready summaries for irrigation planning.",
    href: "/weather-intelligence",
  },
  {
    label: "Market prices",
    description: "A lightweight pricing board with space for future predictions.",
    href: "/market-prices",
  },
];

export const dashboardSummary: DashboardSummary = {
  greeting: "Good morning, Ramesh",
  farmName: "Ramesh Khet, Bareilly",
  location: "Bareilly, Uttar Pradesh",
  stats: [
    {
      label: "Active crop plan",
      value: "Wheat",
      delta: "+2 advisory updates",
      tone: "green",
    },
    {
      label: "Next irrigation",
      value: "Tomorrow 6:00 AM",
      delta: "Soil moisture is dropping",
      tone: "blue",
    },
    {
      label: "Estimated margin",
      value: "₹38,400",
      delta: "+8.4% from last week",
      tone: "amber",
    },
    {
      label: "Open alerts",
      value: "2",
      delta: "1 pest, 1 weather",
      tone: "rose",
    },
  ],
  alerts: [
    "Rain expected in 36 hours. Delay fertilizer application.",
    "Leaf spot risk is rising in the eastern plots.",
    "Mandi rate for wheat has moved upward by ₹18 per quintal.",
  ],
  weeklyTrends: [
    { day: "Mon", rainfall: 12, soilMoisture: 68, marketIndex: 71 },
    { day: "Tue", rainfall: 8, soilMoisture: 66, marketIndex: 73 },
    { day: "Wed", rainfall: 18, soilMoisture: 69, marketIndex: 72 },
    { day: "Thu", rainfall: 5, soilMoisture: 63, marketIndex: 74 },
    { day: "Fri", rainfall: 0, soilMoisture: 57, marketIndex: 76 },
    { day: "Sat", rainfall: 2, soilMoisture: 54, marketIndex: 75 },
    { day: "Sun", rainfall: 4, soilMoisture: 52, marketIndex: 77 },
  ],
};

export const moduleSummaries: Record<string, ModuleSummary> = {
  dashboard: {
    title: "Farmer dashboard",
    description:
      "A fast overview of your field status, advisories, and the next recommended action.",
    nextStep: "Connect live farm data from FastAPI later.",
    bullets: [
      "Quick cards for weather, crops, expenses, and alerts.",
      "Designed to work smoothly on a low-end Android phone.",
      "Can surface multilingual prompts as the content layer evolves.",
    ],
  },
  "crop-recommendation": {
    title: "Crop recommendation",
    description:
      "A guided advisory screen for suggesting crops based on soil, season, and farmer goals.",
    nextStep: "Replace the mock crop scoring model with real advisory logic later.",
    bullets: [
      "Supports simple yes/no recommendations and crop-fit explanations.",
      "Built to accept soil, weather, and district inputs from API calls.",
      "The UI can later show Hindi explanations beside English labels.",
    ],
  },
  "weather-intelligence": {
    title: "Weather intelligence",
    description:
      "Forecast cards and field advisories that help farmers decide when to spray, irrigate, or delay work.",
    nextStep: "Swap the mock forecast arrays with a weather API service later.",
    bullets: [
      "Daily and hourly summaries can be expanded when APIs are ready.",
      "Advisory banners are intentionally short and easy to scan.",
      "Useful for irrigation timing, fertilizer planning, and risk alerts.",
    ],
  },
  "irrigation-planning": {
    title: "Irrigation planning",
    description:
      "A practical water-use view that can later combine rainfall, moisture sensors, and crop stage data.",
    nextStep: "Connect soil moisture telemetry and farm schedules later.",
    bullets: [
      "Prioritizes clear next-watering guidance.",
      "Can be extended with pump timing and acreage controls.",
      "Good fit for rule-based advisories and ML-driven recommendations.",
    ],
  },
  "disease-detection": {
    title: "Crop disease detection",
    description:
      "A future image and symptom analysis workspace for crop health triage.",
    nextStep: "Hook in the disease model endpoint after the frontend is finalized.",
    bullets: [
      "Prepared for image upload, symptom entry, and severity notes.",
      "Results can later show confidence, likely disease, and treatments.",
      "The current frontend keeps the interaction structure lightweight.",
    ],
  },
  "market-prices": {
    title: "Market prices and prediction",
    description:
      "Track mandi prices, short-term price movement, and the room for later prediction charts.",
    nextStep: "Replace mock pricing lines with live mandi and prediction services later.",
    bullets: [
      "Shows price ranges and trend context at a glance.",
      "Can later include crop-specific comparison cards.",
      "Built to support charts and tables without changing the layout.",
    ],
  },
  "voice-assistant": {
    title: "Hindi AI voice assistant",
    description:
      "A voice-first entry point for simple Hindi and English farmer queries.",
    nextStep: "Connect speech-to-text and response generation when backend services exist.",
    bullets: [
      "Supports conversational guidance for weather, irrigation, and prices.",
      "Keeps the interaction model simple for first-time smartphone users.",
      "Can later show transcript, suggestion chips, and spoken replies.",
    ],
  },
  "expense-tracker": {
    title: "Expense tracker",
    description:
      "Record seed, fertilizer, labor, and equipment costs in a structured way.",
    nextStep: "Persist entries in the backend once the data service is connected.",
    bullets: [
      "Useful for separating crop-wise and season-wise costs.",
      "Helps feed the profit calculator and dashboard summary.",
      "Designed for quick numeric entry on mobile devices.",
    ],
  },
  "profit-calculator": {
    title: "Profit calculator",
    description:
      "Estimate gross yield, input cost, and expected margin before harvest.",
    nextStep: "Tie it to live market data and cost records later.",
    bullets: [
      "Can compare best-case and conservative scenarios.",
      "Useful for crop planning and sale timing decisions.",
      "The future API can provide real-time assumptions.",
    ],
  },
  "crop-calendar": {
    title: "Crop calendar",
    description:
      "A seasonal schedule for sowing, irrigation, spraying, and harvest milestones.",
    nextStep: "Connect recurring reminders and crop-stage events later.",
    bullets: [
      "Good for upcoming tasks and reminder workflows.",
      "Supports per-crop milestones and local season dates.",
      "Can later feed notification cards and calendar sync.",
    ],
  },
  "pest-alerts": {
    title: "Community pest alerts",
    description:
      "A shared warning wall for pest outbreaks, local observations, and preventive action.",
    nextStep: "Link village-level reports and moderation later.",
    bullets: [
      "Useful for nearby outbreak awareness.",
      "Can surface severity, affected crops, and response tips.",
      "Keeps the social module lightweight and readable.",
    ],
  },
  profile: {
    title: "Farmer profile and settings",
    description:
      "Manage language, farm profile, preferred crops, and notification settings.",
    nextStep: "Persist profile preferences in backend storage later.",
    bullets: [
      "Supports English and Hindi-ready labels.",
      "Can hold district, land size, and crop preferences.",
      "Useful for tailoring advisories to a farmer's context.",
    ],
  },
  settings: {
    title: "Settings",
    description:
      "Configure language, alerts, accessibility, privacy, and theme preferences.",
    nextStep: "These controls are ready for future preference persistence.",
    bullets: [
      "Language preferences can drive English and Hindi-ready UI strings.",
      "Notification switches can later map to push and in-app channels.",
      "Accessibility settings are positioned for large-touch low-end devices.",
    ],
  },
  notifications: {
    title: "Notifications",
    description:
      "A central inbox for weather warnings, advisory updates, and reminders.",
    nextStep: "Connect push and in-app notifications later.",
    bullets: [
      "Prioritizes short, actionable notifications.",
      "Designed for a clean unread/archived pattern later.",
      "Can later power push notifications in a PWA flow.",
    ],
  },
  help: {
    title: "Help and about",
    description:
      "Explain what the system does, how it helps farmers, and where data will come from later.",
    nextStep: "Expand this into a full support and FAQ surface when needed.",
    bullets: [
      "Good place for product explanation and onboarding guidance.",
      "Can later include support contact and FAQ sections.",
      "Useful for demo walkthroughs during project evaluation.",
    ],
  },
};
