import {
  Calculator,
  CalendarDays,
  CloudSun,
  Droplets,
  FlaskConical,
  IndianRupee,
  LayoutDashboard,
  type LucideIcon,
  Mic,
  ReceiptText,
  Settings,
  ShieldAlert,
  Sprout,
  UserRoundCog,
} from "lucide-react";

import type { Lang } from "@/lib/use-language";

type Accent = "green" | "amber" | "blue" | "rose" | "violet";

export interface ServiceContent {
  icon: LucideIcon;
  href: string;
  accent: Accent;
  en: { label: string; desc: string };
  hi: { label: string; desc: string };
}

export const services: ServiceContent[] = [
  {
    icon: Sprout,
    href: "/crop-recommendation",
    accent: "green",
    en: {
      label: "Crop Advisory",
      desc: "Best crop suggestions for your soil, season, and local climate with clear reasoning.",
    },
    hi: {
      label: "फसल सलाह",
      desc: "आपकी मिट्टी, मौसम और जलवायु के अनुसार सबसे अच्छी फसल के सुझाव।",
    },
  },
  {
    icon: CloudSun,
    href: "/weather-intelligence",
    accent: "blue",
    en: {
      label: "Weather Intelligence",
      desc: "Hyper-local forecasts and rainfall alerts to plan spraying, sowing, and harvest.",
    },
    hi: {
      label: "मौसम जानकारी",
      desc: "छिड़काव, बुवाई और कटाई की योजना के लिए स्थानीय मौसम और बारिश की चेतावनी।",
    },
  },
  {
    icon: Droplets,
    href: "/irrigation-planning",
    accent: "blue",
    en: {
      label: "Irrigation Planning",
      desc: "Smart watering schedules that save water, power, and effort.",
    },
    hi: {
      label: "सिंचाई योजना",
      desc: "पानी, बिजली और मेहनत बचाने वाला स्मार्ट सिंचाई शेड्यूल।",
    },
  },
  {
    icon: FlaskConical,
    href: "/disease-detection",
    accent: "rose",
    en: {
      label: "Disease Detection",
      desc: "Snap a leaf photo for AI-assisted diagnosis and treatment steps.",
    },
    hi: {
      label: "रोग पहचान",
      desc: "पत्ती की फोटो से AI द्वारा बीमारी की पहचान और उपचार के सुझाव।",
    },
  },
  {
    icon: IndianRupee,
    href: "/market-prices",
    accent: "amber",
    en: {
      label: "Market Prices",
      desc: "Live mandi rates and price trends so you sell at the right time.",
    },
    hi: {
      label: "बाज़ार भाव",
      desc: "मंडी के ताज़ा भाव और रुझान ताकि आप सही समय पर बेचें।",
    },
  },
  {
    icon: Mic,
    href: "/voice-assistant",
    accent: "violet",
    en: {
      label: "Hindi Voice Assistant",
      desc: "Ask questions by voice in Hindi or English and get simple spoken guidance.",
    },
    hi: {
      label: "हिंदी वॉइस असिस्टेंट",
      desc: "हिंदी या अंग्रेज़ी में बोलकर सवाल पूछें और आसान जवाब पाएं।",
    },
  },
  {
    icon: Calculator,
    href: "/profit-calculator",
    accent: "green",
    en: {
      label: "Profit Calculator",
      desc: "Estimate yield, cost, and expected margin before harvest.",
    },
    hi: {
      label: "मुनाफ़ा कैलकुलेटर",
      desc: "कटाई से पहले उपज, लागत और संभावित मुनाफ़े का अनुमान लगाएं।",
    },
  },
  {
    icon: ReceiptText,
    href: "/expense-tracker",
    accent: "amber",
    en: {
      label: "Expense Tracker",
      desc: "Log seed, fertilizer, and labor costs to understand spending.",
    },
    hi: {
      label: "खर्च ट्रैकर",
      desc: "बीज, खाद और मज़दूरी का खर्च दर्ज करें और समझें।",
    },
  },
  {
    icon: CalendarDays,
    href: "/crop-calendar",
    accent: "green",
    en: {
      label: "Crop Calendar",
      desc: "Season-wise reminders for sowing, irrigation, and harvest.",
    },
    hi: {
      label: "फसल कैलेंडर",
      desc: "बुवाई, सिंचाई और कटाई के मौसमी रिमाइंडर।",
    },
  },
  {
    icon: ShieldAlert,
    href: "/pest-alerts",
    accent: "rose",
    en: {
      label: "Pest Alerts",
      desc: "Community warnings about nearby pest outbreaks and prevention.",
    },
    hi: {
      label: "कीट चेतावनी",
      desc: "आस-पास के कीट प्रकोप की चेतावनी और बचाव के सुझाव।",
    },
  },
];

export interface SiteMapLink {
  href: string;
  en: string;
  hi: string;
}

export interface SiteMapSection {
  icon: LucideIcon;
  en: string;
  hi: string;
  links: SiteMapLink[];
}

export const siteMap: SiteMapSection[] = [
  {
    icon: LayoutDashboard,
    en: "Getting started",
    hi: "शुरुआत",
    links: [
      { href: "/", en: "Home", hi: "होम" },
      { href: "/?auth=login", en: "Login", hi: "लॉगिन" },
      { href: "/?auth=signup", en: "Sign up", hi: "साइन अप" },
      { href: "/auth/forgot-password", en: "Forgot password", hi: "पासवर्ड भूल गए" },
      { href: "/dashboard", en: "Dashboard", hi: "डैशबोर्ड" },
    ],
  },
  {
    icon: Sprout,
    en: "Advisory",
    hi: "सलाह",
    links: [
      { href: "/crop-recommendation", en: "Crop Advisory", hi: "फसल सलाह" },
      { href: "/weather-intelligence", en: "Weather Intelligence", hi: "मौसम जानकारी" },
      { href: "/irrigation-planning", en: "Irrigation Planning", hi: "सिंचाई योजना" },
      { href: "/disease-detection", en: "Disease Detection", hi: "रोग पहचान" },
      { href: "/crop-calendar", en: "Crop Calendar", hi: "फसल कैलेंडर" },
      { href: "/pest-alerts", en: "Pest Alerts", hi: "कीट चेतावनी" },
    ],
  },
  {
    icon: IndianRupee,
    en: "Finance & market",
    hi: "वित्त और बाज़ार",
    links: [
      { href: "/market-prices", en: "Market Prices", hi: "बाज़ार भाव" },
      { href: "/expense-tracker", en: "Expense Tracker", hi: "खर्च ट्रैकर" },
      { href: "/profit-calculator", en: "Profit Calculator", hi: "मुनाफ़ा कैलकुलेटर" },
    ],
  },
  {
    icon: UserRoundCog,
    en: "Assistant & account",
    hi: "असिस्टेंट और खाता",
    links: [
      { href: "/voice-assistant", en: "Voice Assistant", hi: "वॉइस असिस्टेंट" },
      { href: "/notifications", en: "Notifications", hi: "सूचनाएं" },
      { href: "/profile", en: "Profile", hi: "प्रोफ़ाइल" },
      { href: "/settings", en: "Settings", hi: "सेटिंग्स" },
      { href: "/help", en: "Help & About", hi: "सहायता और परिचय" },
    ],
  },
];

type Dict = Record<string, string>;

export const strings: Record<Lang, Dict> = {
  en: {
    tagline: "Smart Crop Advisory",
    nav_about: "About",
    nav_sitemap: "Sitemap",
    nav_help: "Help",
    nav_login: "Login",
    nav_signup: "Sign up",

    hero_badge: "AI-powered advisory for smallholder farmers",
    hero_title: "Smarter farming decisions,",
    hero_title_accent: "right in your pocket",
    hero_desc:
      "Kisan Sathi brings weather, irrigation, crop advisory, disease detection, market prices, and a Hindi voice assistant together in one simple app.",
    hero_login: "Login to your farm",
    hero_signup: "Create free account",
    feat_lowend: "Works on low-end phones",
    feat_lang: "English + Hindi",
    feat_free: "Free to start",

    login_title: "Welcome back, Kisan",
    login_sub: "Sign in to open your dashboard",
    label_mobile: "Mobile number",
    label_password: "Password",
    continue: "Continue",
    forgot: "Forgot password?",
    new_here: "New here? Sign up",

    stat_tools: "Advisory tools",
    stat_langs: "Languages ready",
    stat_mobile: "Mobile friendly",
    stat_guidance: "Field guidance",

    services_eyebrow: "What we provide",
    services_title: "Everything a farmer needs, in one place",
    services_desc:
      "From sowing to selling, every tool opens directly inside your dashboard.",
    service_cta: "Open in dashboard",

    about_badge: "About the app",
    about_title: "Built for the real challenges of Indian farming",
    about_desc:
      "Smallholder farmers make dozens of critical decisions every season, often without timely information. Kisan Sathi turns weather, market, and crop science into simple advice anyone can act on.",
    about_p1: "Mobile-first for entry-level smartphones",
    about_p2: "Bilingual, farmer-friendly language",
    about_p3: "Ready for live weather and market APIs",
    about_p4: "Voice-first help for new smartphone users",
    about_how: "How it helps",
    how_decide: "Decide",
    how_decide_t: "Which crop to plant and when to irrigate.",
    how_protect: "Protect",
    how_protect_t: "Catch disease and pest risks early.",
    how_earn: "Earn",
    how_earn_t: "Sell at the right mandi price for better margins.",

    sitemap_eyebrow: "Full sitemap",
    sitemap_title: "Explore the entire app",
    sitemap_desc:
      "Every page in Kisan Sathi, grouped so you can jump straight to what you need.",

    cta_title: "Ready to farm smarter this season?",
    cta_desc:
      "Create your free account and open a dashboard built around your farm, your crops, and your language.",
    cta_start: "Get started free",
    cta_have: "I already have an account",

    footer_desc:
      "An AI-powered crop advisory companion for smallholder farmers.",
    footer_help: "Help & support",
    footer_quick: "Quick links",
    footer_legal: "Legal",
    help_center: "Help center",
    contact: "Contact us",
    faqs: "FAQs",
    how_it_works: "How it works",
    privacy: "Privacy policy",
    terms: "Terms of use",
    rights: "All rights reserved.",
  },
  hi: {
    tagline: "स्मार्ट फसल सलाह",
    nav_about: "परिचय",
    nav_sitemap: "साइटमैप",
    nav_help: "सहायता",
    nav_login: "लॉगिन",
    nav_signup: "साइन अप",

    hero_badge: "छोटे किसानों के लिए AI-आधारित सलाह",
    hero_title: "बेहतर खेती के फैसले,",
    hero_title_accent: "अब आपकी जेब में",
    hero_desc:
      "किसान साथी मौसम, सिंचाई, फसल सलाह, रोग पहचान, बाज़ार भाव और हिंदी वॉइस असिस्टेंट को एक आसान ऐप में लाता है।",
    hero_login: "अपने खेत में लॉगिन करें",
    hero_signup: "मुफ़्त खाता बनाएं",
    feat_lowend: "साधारण फ़ोन पर भी चले",
    feat_lang: "अंग्रेज़ी + हिंदी",
    feat_free: "शुरू करना मुफ़्त",

    login_title: "वापसी पर स्वागत है, किसान",
    login_sub: "डैशबोर्ड खोलने के लिए साइन इन करें",
    label_mobile: "मोबाइल नंबर",
    label_password: "पासवर्ड",
    continue: "आगे बढ़ें",
    forgot: "पासवर्ड भूल गए?",
    new_here: "नए हैं? साइन अप करें",

    stat_tools: "सलाह उपकरण",
    stat_langs: "भाषाएँ",
    stat_mobile: "मोबाइल फ्रेंडली",
    stat_guidance: "मैदानी मार्गदर्शन",

    services_eyebrow: "हम क्या देते हैं",
    services_title: "किसान की हर ज़रूरत, एक ही जगह",
    services_desc:
      "बुवाई से बिक्री तक, हर सुविधा सीधे आपके डैशबोर्ड में खुलती है।",
    service_cta: "डैशबोर्ड में खोलें",

    about_badge: "ऐप के बारे में",
    about_title: "भारतीय खेती की असली चुनौतियों के लिए बना",
    about_desc:
      "छोटे किसान हर मौसम में कई अहम फैसले लेते हैं, अक्सर सही जानकारी के बिना। किसान साथी मौसम, बाज़ार और फसल विज्ञान को आसान सलाह में बदल देता है।",
    about_p1: "साधारण स्मार्टफ़ोन के लिए मोबाइल-फर्स्ट",
    about_p2: "किसान के अनुकूल दो-भाषी शब्द",
    about_p3: "लाइव मौसम और बाज़ार API के लिए तैयार",
    about_p4: "नए उपयोगकर्ताओं के लिए वॉइस सहायता",
    about_how: "यह कैसे मदद करता है",
    how_decide: "तय करें",
    how_decide_t: "कौन-सी फसल लगाएं और कब सिंचाई करें।",
    how_protect: "बचाएं",
    how_protect_t: "बीमारी और कीट के खतरे जल्दी पकड़ें।",
    how_earn: "कमाएं",
    how_earn_t: "बेहतर मुनाफ़े के लिए सही मंडी भाव पर बेचें।",

    sitemap_eyebrow: "पूरा साइटमैप",
    sitemap_title: "पूरा ऐप देखें",
    sitemap_desc:
      "किसान साथी के सभी पेज, समूह में ताकि आप सीधे ज़रूरत की जगह पहुंचें।",

    cta_title: "इस मौसम बेहतर खेती के लिए तैयार?",
    cta_desc:
      "मुफ़्त खाता बनाएं और अपने खेत, फसल और भाषा के अनुसार डैशबोर्ड खोलें।",
    cta_start: "मुफ़्त शुरू करें",
    cta_have: "मेरा खाता पहले से है",

    footer_desc: "छोटे किसानों के लिए AI-आधारित फसल सलाह साथी।",
    footer_help: "सहायता",
    footer_quick: "त्वरित लिंक",
    footer_legal: "कानूनी",
    help_center: "सहायता केंद्र",
    contact: "संपर्क करें",
    faqs: "सामान्य प्रश्न",
    how_it_works: "यह कैसे काम करता है",
    privacy: "गोपनीयता नीति",
    terms: "उपयोग की शर्तें",
    rights: "सर्वाधिकार सुरक्षित।",
  },
};
