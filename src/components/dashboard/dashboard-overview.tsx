"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { DashboardSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DashboardOverviewProps {
  summary: DashboardSummary;
}

const toneStyles = {
  green: "bg-emerald-50 text-emerald-800",
  blue: "bg-sky-50 text-sky-800",
  amber: "bg-amber-50 text-amber-900",
  rose: "bg-rose-50 text-rose-800",
} as const;

export function DashboardOverview({ summary }: DashboardOverviewProps) {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge>Connected mock view</Badge>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
              {summary.greeting}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {summary.farmName} · {summary.location}
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            Ready for live backend integration
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary.stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">
              {stat.value}
            </p>
            <p className={cn("mt-2 text-sm font-medium", toneStyles[stat.tone])}>
              {stat.delta}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Weekly trend</p>
              <h2 className="text-xl font-semibold text-slate-900">
                Rainfall, moisture, and price index
              </h2>
            </div>
            <Badge>Mock data</Badge>
          </div>

          <div className="mt-5 h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={summary.weeklyTrends}>
                <defs>
                  <linearGradient id="rainfallFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" tickLine={false} axisLine={false} />
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
          <p className="text-sm font-semibold text-emerald-700">Top alerts</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            What needs attention now
          </h2>

          <div className="mt-5 space-y-3">
            {summary.alerts.map((alert) => (
              <div key={alert} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-6 text-slate-700">{alert}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}