"use client";

import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import {
  ArrowRight,
  CalendarDays,
  CloudSun,
  Droplets,
  IndianRupee,
  Sprout,
  TriangleAlert,
} from "lucide-react";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { DashboardSummary } from "@/lib/types";
import { useAuth } from "@/lib/use-auth";
import { useFarmProfile, formatFarmLocation } from "@/lib/use-farm-profile";
import { useLanguage } from "@/lib/use-language";
import { getDisplayName, getGreeting } from "@/lib/user-display";
import { cn } from "@/lib/utils";

interface DashboardOverviewProps {
  summary: DashboardSummary;
}

const dashboardStrings = {
  en: {
    overview: "Farm overview",
    clearSkies: "🌤️ Clear skies today · good for field work",
    weather: "Weather",
    irrigation: "Irrigation",
    market: "Market",
    calendar: "Calendar",
    weeklyTrend: "Weekly trend",
    trendTitle: "Rainfall, moisture, and price index",
    rainfall: "Rainfall",
    moisture: "Moisture",
    topAlerts: "Top alerts",
    needsAttention: "Needs attention now",
    newSuffix: "new",
    viewAll: "View all notifications",
  },
  hi: {
    overview: "खेत का अवलोकन",
    clearSkies: "🌤️ आज आसमान साफ है · खेत के काम के लिए अच्छा",
    weather: "मौसम",
    irrigation: "सिंचाई",
    market: "बाज़ार",
    calendar: "कैलेंडर",
    weeklyTrend: "साप्ताहिक रुझान",
    trendTitle: "वर्षा, नमी और मूल्य सूचकांक",
    rainfall: "वर्षा",
    moisture: "नमी",
    topAlerts: "मुख्य चेतावनियाँ",
    needsAttention: "अभी ध्यान देने की ज़रूरत",
    newSuffix: "नई",
    viewAll: "सभी सूचनाएँ देखें",
  },
} as const;

const toneStyles = {
  green: "bg-emerald-50 text-emerald-700",
  blue: "bg-sky-50 text-sky-700",
  amber: "bg-amber-50 text-amber-700",
  rose: "bg-rose-50 text-rose-700",
} as const;

const statIcons = [Sprout, Droplets, IndianRupee, TriangleAlert];

const quickActions = [
  { labelKey: "weather", href: "/weather-intelligence", icon: CloudSun, tone: "blue" },
  { labelKey: "irrigation", href: "/irrigation-planning", icon: Droplets, tone: "blue" },
  { labelKey: "market", href: "/market-prices", icon: IndianRupee, tone: "amber" },
  { labelKey: "calendar", href: "/crop-calendar", icon: CalendarDays, tone: "green" },
] as const;

export function DashboardOverview({ summary }: DashboardOverviewProps) {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const { profile } = useFarmProfile();
  const t = dashboardStrings[lang];

  // Compute time-based greeting only after mount to avoid SSR/clock mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const greeting = mounted
    ? `${getGreeting(lang)}, ${getDisplayName(user)}`
    : summary.greeting;

  const profileLocation = formatFarmLocation(profile);
  const location = profileLocation || summary.location;
  // Prefer the farm name the user saved; otherwise show a clean location line.
  const farmName = profile?.farm_name?.trim() || (profileLocation ? "" : summary.farmName);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6">
      {/* Greeting */}
      <Card className="overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge>{t.overview}</Badge>
            <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              {greeting}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {farmName ? `${farmName} · ` : ""}
              {location}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
            {t.clearSkies}
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.labelKey}
                href={action.href}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-emerald-200 hover:bg-emerald-50/40"
              >
                <span
                  className={cn(
                    "inline-flex h-10 w-10 items-center justify-center rounded-xl",
                    toneStyles[action.tone],
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {t[action.labelKey]}
                </span>
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.stats.map((stat, index) => {
          const Icon = statIcons[index % statIcons.length];
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <span
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-xl",
                    toneStyles[stat.tone],
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
              <p
                className={cn(
                  "mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                  toneStyles[stat.tone],
                )}
              >
                {stat.delta}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Chart + alerts */}
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                {t.weeklyTrend}
              </p>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                {t.trendTitle}
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                {t.rainfall}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                {t.moisture}
              </span>
            </div>
          </div>

          <div className="mt-5 h-[260px] w-full sm:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={summary.weeklyTrends}>
                <defs>
                  <linearGradient id="rainfallFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                <XAxis
                  dataKey="day"
                  stroke="#64748b"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="rainfall"
                  stroke="#16a34a"
                  fill="url(#rainfallFill)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="soilMoisture"
                  stroke="#0ea5e9"
                  fillOpacity={0}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">{t.topAlerts}</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                {t.needsAttention}
              </h2>
            </div>
            <Badge className="border-rose-200 bg-rose-50 text-rose-700">
              {summary.alerts.length} {t.newSuffix}
            </Badge>
          </div>

          <div className="mt-5 space-y-3">
            {summary.alerts.map((alert) => (
              <div
                key={alert}
                className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <p className="text-sm leading-6 text-slate-700">{alert}</p>
              </div>
            ))}
          </div>

          <Link
            href="/notifications"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline"
          >
            {t.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>
    </section>
  );
}
