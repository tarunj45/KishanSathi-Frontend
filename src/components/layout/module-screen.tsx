"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Camera,
  CloudSun,
  Droplets,
  GripVertical,
  Mic,
  Minus,
  Plus,
  ScanSearch,
  ThermometerSun,
  Upload,
  Waves,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ModuleSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

export type ModuleVariant =
  | "dashboard"
  | "crop-advisory"
  | "weather"
  | "irrigation"
  | "disease"
  | "market"
  | "voice"
  | "expense"
  | "profit"
  | "calendar"
  | "pests"
  | "notifications"
  | "profile"
  | "settings"
  | "help";

interface ModuleScreenProps {
  summary: ModuleSummary;
  variant: ModuleVariant;
  ctaHref?: string;
  ctaLabel?: string;
}

const weatherHourly = [8, 10, 12, 14, 16, 18, 20].map((hour, index) => ({
  hour: `${hour}:00`,
  temp: [23, 25, 28, 30, 29, 27, 25][index],
  rain: [5, 10, 15, 24, 32, 40, 28][index],
}));

const weatherWeekly = [
  { day: "Mon", high: 31, low: 23, rain: 12 },
  { day: "Tue", high: 33, low: 24, rain: 18 },
  { day: "Wed", high: 34, low: 25, rain: 8 },
  { day: "Thu", high: 32, low: 24, rain: 42 },
  { day: "Fri", high: 30, low: 23, rain: 55 },
  { day: "Sat", high: 29, low: 22, rain: 26 },
  { day: "Sun", high: 31, low: 23, rain: 14 },
];

const marketHistory = [
  { week: "W1", price: 2280, forecast: 2335 },
  { week: "W2", price: 2310, forecast: 2360 },
  { week: "W3", price: 2265, forecast: 2380 },
  { week: "W4", price: 2340, forecast: 2415 },
  { week: "W5", price: 2395, forecast: 2450 },
];

const expenseBreakdown = [
  { name: "Seed", value: 6200 },
  { name: "Fertilizer", value: 8900 },
  { name: "Labor", value: 15200 },
  { name: "Irrigation", value: 5400 },
  { name: "Pesticide", value: 3800 },
];

const profitData = [
  { label: "Revenue", value: 84000 },
  { label: "Cost", value: 46200 },
  { label: "Profit", value: 37800 },
];

const cropCalendarDays = Array.from({ length: 30 }, (_, index) => index + 1);

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h2>
      <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function Pill({ children }: { children: string }) {
  return <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">{children}</span>;
}

function ToggleRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <span className="inline-flex h-6 w-11 items-center rounded-full bg-emerald-600 px-1">
        <span className="ml-auto h-4 w-4 rounded-full bg-white" />
      </span>
      <span className="sr-only">{value}</span>
    </div>
  );
}

export function ModuleScreen({ summary, variant, ctaHref = "/dashboard", ctaLabel = "Back to dashboard" }: ModuleScreenProps) {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <Badge>Farmer advisory screen</Badge>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">{summary.title}</h1>
            <p className="max-w-3xl text-base leading-7 text-slate-600">{summary.description}</p>
          </div>
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
            {summary.nextStep}
          </div>
        </div>
      </Card>

      {variant === "crop-advisory" ? (
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="p-6">
            <SectionTitle
              eyebrow="Farm profile"
              title="Recommendation factors and crop fit"
              description="The advisory engine combines soil, temperature, season, market, and water signals to surface the best crop options for a smallholder farmer."
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Soil type", "Loamy"],
                ["Season", "Kharif transition"],
                ["Temperature", "27-32°C"],
                ["Water availability", "Moderate"],
                ["Farmer goal", "Higher profit"],
                ["Farm size", "2.5 acres"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {[
                ["Soil compatibility", 25],
                ["Temperature fit", 30],
                ["Season compatibility", 20],
                ["Market demand", 15],
                ["Water availability", 10],
              ].map(([label, percent]) => (
                <div key={label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{label}</span>
                    <span className="font-semibold text-slate-900">{percent}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle
              eyebrow="Recommended crops"
              title="Wheat leads the suitability ranking"
              description="The combined scoring model favors crops with strong temperature fit, stable market demand, and manageable water use."
            />

            <div className="mt-6 grid gap-4">
              {[
                ["Wheat", 92, "Best fit for current soil, season, and price outlook."],
                ["Mustard", 84, "Good water efficiency with decent market demand."],
                ["Gram", 76, "Lower irrigation need but weaker current price strength."],
              ].map(([name, score, note]) => (
                <div key={name} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-slate-900">{name}</p>
                      <p className="text-sm text-slate-600">{note}</p>
                    </div>
                    <Badge>{score}%</Badge>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
              Wheat is recommended because it balances the strongest temperature fit with stable market demand and moderate water use.
            </div>
          </Card>
        </div>
      ) : null}

      {variant === "weather" ? (
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="p-6">
            <SectionTitle
              eyebrow="Current weather"
              title="Sunny intervals with rising rain probability"
              description="The forecast supports irrigation planning and spraying decisions by combining current conditions with hourly and weekly outlooks."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["30°C", "Temperature", <ThermometerSun key="t" className="h-5 w-5 text-emerald-600" />],
                ["68%", "Humidity", <Droplets key="d" className="h-5 w-5 text-sky-600" />],
                ["42%", "Rain chance", <CloudSun key="c" className="h-5 w-5 text-amber-600" />],
                ["11 km/h", "Wind", <Waves key="w" className="h-5 w-5 text-slate-600" />],
              ].map(([value, label, icon]) => (
                <div key={label as string} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2">{icon}</div>
                  <p className="text-2xl font-semibold text-slate-900">{value as string}</p>
                  <p className="text-sm text-slate-600">{label as string}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 h-72 rounded-3xl border border-slate-200 bg-white p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weatherHourly}>
                  <defs>
                    <linearGradient id="weatherFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                  <XAxis dataKey="hour" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                  <Area type="monotone" dataKey="temp" stroke="#16a34a" fill="url(#weatherFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle
              eyebrow="Farming impact"
              title="Use the next six hours for field planning"
              description="The advisory layer turns weather into practical actions for irrigation, spray timing, and harvest preparation."
            />

            <div className="mt-6 space-y-3">
              {[
                "Avoid fertilizer application between 2 PM and 5 PM due to heat stress.",
                "Irrigate before the evening rain band if soil moisture is below threshold.",
                "Good window for harvesting vegetables before midnight drizzle.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Weather alert: heavy showers are likely late Thursday and Friday morning, so irrigation should be adjusted accordingly.
            </div>

            <div className="mt-6 grid gap-2 sm:grid-cols-7">
              {weatherWeekly.map((item) => (
                <div key={item.day} className="rounded-2xl border border-slate-200 bg-white p-3 text-center text-xs">
                  <p className="font-semibold text-slate-900">{item.day}</p>
                  <p className="mt-1 text-slate-600">{item.high}°/{item.low}°</p>
                  <p className="mt-1 text-emerald-700">{item.rain}%</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : null}

      {variant === "irrigation" ? (
        <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <Card className="p-6">
            <SectionTitle eyebrow="Irrigation planning" title="Watering schedule for wheat" description="The mock planner estimates irrigation need using crop stage, rainfall forecast, and soil condition. It is designed to plug into future weather and sensor APIs." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Selected crop", "Wheat"],
                ["Growth stage", "Tillering"],
                ["Soil condition", "Moderately moist"],
                ["Water requirement", "28 mm/week"],
                ["Rainfall forecast", "16 mm"],
                ["Irrigation requirement", "12 mm"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
              Next irrigation date: Friday morning. Rainfall will cover part of the crop water need, so the irrigation volume is reduced by the forecast amount.
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle eyebrow="Weekly schedule" title="Suggested irrigation slots" description="The schedule is intentionally simple so it can be read quickly on a phone in the field." />
            <div className="mt-6 space-y-3">
              {["Mon - Soil check only", "Wed - Light irrigation", "Fri - Full irrigation", "Sun - Moisture review"].map((item, index) => (
                <div key={item} className={cn("flex items-center justify-between rounded-2xl border px-4 py-3", index === 2 ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white")}>
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                  {index === 2 ? <Badge>Recommended</Badge> : <span className="text-xs text-slate-500">Estimated</span>}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              Rainfall adjustment explanation: the forecast lowers the irrigation requirement by about 16 mm, which reduces both pump time and electricity cost.
            </div>
          </Card>
        </div>
      ) : null}

      {variant === "disease" ? (
        <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <Card className="p-6">
            <SectionTitle eyebrow="Disease detection" title="Upload crop image for AI-assisted analysis" description="This frontend only prepares the flow for a future disease model. No inference is performed yet." />
            <div className="mt-6 rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50/60 p-8 text-center">
              <Upload className="mx-auto h-10 w-10 text-emerald-600" />
              <p className="mt-4 text-base font-semibold text-slate-900">Drag and drop an image here</p>
              <p className="mt-2 text-sm text-slate-600">Or use the camera UI on a phone to capture a leaf symptom photo.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Button><Camera className="h-4 w-4" />Open camera</Button>
                <Button variant="secondary"><Upload className="h-4 w-4" />Choose file</Button>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_1.1fr]">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Image preview</p>
                <div className="mt-3 flex h-40 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">No image selected</div>
                <Button variant="secondary" className="mt-3 w-full"><Minus className="h-4 w-4" />Remove image</Button>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">What to upload</p>
                <ul className="mt-3 space-y-2">
                  <li>• Clear leaf or stem photo</li>
                  <li>• Daylight, close focus, no blur</li>
                  <li>• Include infected and healthy areas</li>
                </ul>
                <Button className="mt-4 w-full"><ScanSearch className="h-4 w-4" />Analyze image</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle eyebrow="Prediction result" title="Likely leaf rust with medium confidence" description="The result panel shows how a future model response could appear, including symptoms and recommended treatment." />
            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Scanning in progress... loading state will help communicate that the model is working.
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">Confidence</p>
                <p className="mt-2 text-3xl font-semibold text-emerald-700">78%</p>
                <div className="mt-3 h-2 rounded-full bg-slate-100"><div className="h-2 w-[78%] rounded-full bg-emerald-600" /></div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">Symptoms</p>
                <p className="mt-2 text-sm text-slate-600">Orange-brown pustules, leaf yellowing, and reduced leaf area.</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">Recommended action: remove badly affected leaves, apply the suggested fungicide, and rescan after 5-7 days.</div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">Disclaimer: this is an AI-assisted estimate and not a substitute for a local agronomist or lab diagnosis.</div>
            </div>
          </Card>
        </div>
      ) : null}

      {variant === "market" ? (
        <div className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
          <Card className="p-6">
            <SectionTitle eyebrow="Market intelligence" title="Wheat price tracking and prediction" description="Use the mock market board to compare current mandi rates, price bands, and a short-term trend outlook." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[["Current price", "₹2,340/q"], ["Minimum", "₹2,210/q"], ["Maximum", "₹2,480/q"], ["Modal", "₹2,330/q"]].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 h-72 rounded-3xl border border-slate-200 bg-white p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketHistory}>
                  <defs>
                    <linearGradient id="marketFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #e2e8f0" }} />
                  <Area type="monotone" dataKey="price" stroke="#16a34a" fill="url(#marketFill)" />
                  <Area type="monotone" dataKey="forecast" stroke="#0ea5e9" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle eyebrow="Recommendation" title="Hold wheat for now" description="The trend line is positive but not yet sharp enough to justify an immediate sell decision based on this mock dataset." />
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Buy", "Hold", "Sell"].map((label, index) => (
                <div key={label} className={cn("rounded-2xl border p-4 text-center", index === 1 ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white")}>
                  <p className="text-sm font-semibold text-slate-900">{label}</p>
                  <p className={cn("mt-2 text-2xl font-semibold", index === 1 ? "text-emerald-700" : "text-slate-500")}>{[22, 56, 22][index]}%</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
              Explanation: the price is rising steadily and the predicted range remains above the current modal price. That supports a hold recommendation rather than a rushed sale.
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Crop selector</Pill>
              <Pill>Mandi selector</Pill>
              <Pill>Historical price</Pill>
              <Pill>Predicted price</Pill>
            </div>
          </Card>
        </div>
      ) : null}

      {variant === "voice" ? (
        <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <Card className="p-6">
            <SectionTitle eyebrow="Hindi voice assistant" title="Tap to ask in Hindi or English" description="The assistant is structured for speech input, transcript display, and a chat-style response pane." />
            <div className="mt-6 flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
              <button className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
                <Mic className="h-10 w-10" />
              </button>
              <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">Recording state: ready</div>
              <p className="text-sm text-slate-600">Speak a question such as “मेरी गेहूं की फसल में पानी कब देना चाहिए?”</p>
            </div>
            <div className="mt-6 space-y-3">
              <p className="text-sm font-semibold text-slate-900">Suggested questions</p>
              <div className="flex flex-wrap gap-2">{[
                "मेरी गेहूं की फसल में पानी कब देना चाहिए?",
                "आज मंडी में गेहूं का भाव क्या है?",
                "मेरी फसल में यह बीमारी क्यों हो रही है?",
              ].map((q) => <Pill key={q}>{q}</Pill>)}</div>
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle eyebrow="Conversation" title="Transcript and response history" description="A small conversation history helps farmers revisit earlier advice without losing context." />
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Farmer transcript</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">मेरी गेहूं की फसल में पानी कब देना चाहिए?</p>
              </div>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">AI response</p>
                <p className="mt-2 text-sm leading-6 text-emerald-900">Soil moisture looks moderate. Irrigate tomorrow morning before temperature peaks, and reduce the amount if rain probability increases tonight.</p>
              </div>
              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                {[
                  "Rain expected after sunset - delay spraying",
                  "Mandi price query answered 15 minutes ago",
                  "Disease advice saved for tomato plot",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 text-sm text-slate-700"><GripVertical className="h-4 w-4 text-slate-400" />{item}</div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      ) : null}

      {variant === "expense" ? (
        <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <Card className="p-6">
            <SectionTitle eyebrow="Expense tracker" title="Add farm expenses" description="Track cost by crop and month so profit calculations and dashboard summaries stay useful later." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[["Category", "Fertilizer"], ["Amount", "₹2,400"], ["Crop", "Wheat"], ["Month", "August"]].map(([label, value]) => (
                <label key={label} className="space-y-2 text-sm text-slate-700">
                  <span className="font-medium">{label}</span>
                  <input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" defaultValue={value} />
                </label>
              ))}
            </div>
            <Button className="mt-4 w-full"><Plus className="h-4 w-4" />Add expense</Button>
          </Card>

          <Card className="p-6">
            <SectionTitle eyebrow="Expense history" title="Category-wise spending" description="The history table and chart make seasonal spending easier to understand." />
            <div className="mt-6 h-60 rounded-3xl border border-slate-200 bg-white p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseBreakdown}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#16a34a" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
              {expenseBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"><span>{item.name}</span><span className="font-semibold text-slate-900">₹{item.value.toLocaleString("en-IN")}</span></div>
              ))}
            </div>
          </Card>
        </div>
      ) : null}

      {variant === "profit" ? (
        <div className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
          <Card className="p-6">
            <SectionTitle eyebrow="Profit calculator" title="Estimate farm profitability" description="The calculator combines yield, selling price, and total expenses to estimate profit margin." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[["Crop", "Wheat"], ["Farm size", "2.5 acres"], ["Expected yield", "46 quintals"], ["Selling price", "₹2,340/q"], ["Total expenses", "₹46,200"]].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-1 text-base font-semibold text-slate-900">{value}</p></div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle eyebrow="Output" title="Expected revenue and profit" description="Visualized outputs help farmers compare crops and understand margin before sale." />
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {profitData.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 text-center"><p className="text-sm text-slate-500">{item.label}</p><p className="mt-2 text-2xl font-semibold text-slate-900">₹{item.value.toLocaleString("en-IN")}</p></div>
              ))}
            </div>
            <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">Estimated profit margin: 45.1%. This mock result assumes stable market price and average crop yield.</div>
          </Card>
        </div>
      ) : null}

      {variant === "calendar" ? (
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Card className="p-6">
            <SectionTitle eyebrow="Crop calendar" title="August activity plan" description="Sowing, irrigation, fertilization, and harvest reminders are arranged in a simple month view." />
            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => <div key={day} className="py-2 font-semibold text-slate-500">{day}</div>)}
              {cropCalendarDays.map((day) => (
                <div key={day} className={cn("rounded-2xl border p-3", [5, 9, 14, 21, 27].includes(day) ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white")}>
                  <p className="font-semibold text-slate-900">{day}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle eyebrow="Upcoming tasks" title="This week's reminders" description="Task cards are short and actionable so farmers can glance at them quickly." />
            <div className="mt-6 space-y-3">
              {[
                ["Sowing", "Prepare seed bed for wheat", "Upcoming"],
                ["Irrigation", "Light irrigation on Friday", "Recommended"],
                ["Fertilizer", "Apply top dressing after soil check", "Pending"],
                ["Pest monitoring", "Inspect lower leaves for spots", "Monitor"],
                ["Harvest", "Not due this week", "Later"],
              ].map(([type, detail, status]) => (
                <div key={type} className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{type}</p>
                    <p className="mt-1 text-sm text-slate-600">{detail}</p>
                  </div>
                  <Badge>{status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : null}

      {variant === "pests" ? (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="p-6">
            <SectionTitle eyebrow="Community pest alerts" title="Nearby outbreak warnings" description="Mock community data helps farmers see which crop is affected, how severe it is, and when it was reported." />
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "All alerts",
                "Wheat",
                "Tomato",
                "Low severity",
                "High severity",
              ].map((item) => <Pill key={item}>{item}</Pill>)}
            </div>
            <div className="mt-6 space-y-3">
              {[
                ["Rust spotting near village road", "Wheat", "High", "2 hours ago"],
                ["Aphids on tomato leaves", "Tomato", "Medium", "6 hours ago"],
                ["Armyworm sighting", "Maize", "High", "Yesterday"],
              ].map(([title, crop, severity, time]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-slate-900">{title}</p><Badge>{severity}</Badge></div>
                  <p className="mt-2 text-sm text-slate-600">Affected crop: {crop} · Reported {time}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle eyebrow="Report issue" title="Share a new pest or disease observation" description="A lightweight reporting UI lets farmers submit a new alert for community awareness." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[["Crop", "Wheat"], ["Severity", "Medium"], ["Area affected", "0.5 acre"], ["Time reported", "Today, 4:40 PM"]].map(([label, value]) => (
                <label key={label} className="space-y-2 text-sm text-slate-700"><span className="font-medium">{label}</span><input className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" defaultValue={value} /></label>
              ))}
            </div>
            <label className="mt-3 block space-y-2 text-sm text-slate-700"><span className="font-medium">Alert details</span><textarea className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none" defaultValue="Spots appeared after irrigation. Leaves are curling on the lower rows." /></label>
            <Button className="mt-4 w-full"><Bell className="h-4 w-4" />Submit alert</Button>
          </Card>
        </div>
      ) : null}

      {variant === "notifications" ? (
        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <Card className="p-6">
            <SectionTitle eyebrow="Notifications" title="Alert filters and actions" description="The inbox is designed for weather, irrigation, market, and pest notifications with quick read state management." />
            <div className="mt-6 flex flex-wrap gap-2">{["All", "Unread", "Weather", "Market", "Pest"].map((item) => <Pill key={item}>{item}</Pill>)}</div>
            <Button variant="secondary" className="mt-4 w-full">Mark all read</Button>
          </Card>

          <Card className="p-6">
            <div className="space-y-3">
              {[
                ["Unread", "Weather alert: rain expected in 6 hours", "bg-emerald-50 border-emerald-200"],
                ["Unread", "Irrigation reminder for wheat plot", "bg-emerald-50 border-emerald-200"],
                ["Read", "Mandi price update for wheat", "bg-white border-slate-200"],
                ["Read", "Pest watch: aphids reported nearby", "bg-white border-slate-200"],
              ].map(([state, text, styles]) => (
                <div key={text as string} className={cn("rounded-2xl border p-4", styles as string)}>
                  <div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-slate-900">{text as string}</p><Badge>{state as string}</Badge></div>
                  <p className="mt-2 text-sm text-slate-600">Actionable notification with a clear next step.</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : null}

      {variant === "profile" ? (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-6">
            <SectionTitle eyebrow="Farmer profile" title="Profile completion: 82%" description="The profile stores the farmer's information, farm size, crop preferences, and language settings so advisories can be personalized later." />
            <div className="mt-6 h-2 rounded-full bg-slate-100"><div className="h-2 w-[82%] rounded-full bg-emerald-600" /></div>
            <div className="mt-6 space-y-3">
              {["Name: Ramesh Kumar", "Village: Jaitpur", "Farm size: 2.5 acres", "Soil type: Loamy", "Crops grown: Wheat, mustard"].map((item) => <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">{item}</div>)}
            </div>
          </Card>
          <Card className="p-6">
            <SectionTitle eyebrow="Personalization" title="Farm location, water availability, and language" description="These fields prepare the frontend for future preference saving without introducing backend logic now." />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Farm location", "Water availability", "Preferred language", "Notification style"].map((item) => <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-sm font-medium text-slate-700">{item}</p><p className="mt-1 text-sm text-slate-500">Editable later</p></div>)}
            </div>
          </Card>
        </div>
      ) : null}

      {variant === "settings" ? (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-6">
            <SectionTitle eyebrow="Settings" title="Language and notification preferences" description="These controls are ready for future persistence and can later connect to saved user preferences." />
            <div className="mt-6 space-y-3">
              {[
                "Language",
                "Weather notifications",
                "Irrigation reminders",
                "Market alerts",
                "Pest alerts",
                "Accessibility",
                "Privacy",
                "Theme preference",
              ].map((label) => <ToggleRow key={label} label={label} value="On" />)}
            </div>
          </Card>
          <Card className="p-6">
            <SectionTitle eyebrow="Accessibility" title="Designed for simple smartphone use" description="Large touch areas, clear contrast, and concise labels make the settings screen practical for low-end Android phones." />
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">English now, Hindi-ready later.</div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Push notifications can be wired later through the PWA shell.</div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Theme preference is stored in the UI layer only for now.</div>
            </div>
          </Card>
        </div>
      ) : null}

      {variant === "help" ? (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Card className="p-6">
            <SectionTitle eyebrow="Help" title="Frequently asked questions" description="The help surface explains how the modules work and where future backend integrations will connect." />
            <div className="mt-6 space-y-3">
              {[
                ["How crop recommendations work", "The frontend displays a weighted score from soil, temperature, season, market demand, and water availability."],
                ["How disease detection works", "The UI prepares an upload and review flow for a future AI model, but does not run inference here."],
                ["How market intelligence works", "The page shows mock mandi prices and trend charts that can later map to a live data service."],
                ["How irrigation planning works", "The planner combines rainfall forecasts with crop need and soil moisture to suggest a watering schedule."],
              ].map(([q, a]) => (
                <div key={q} className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-sm font-semibold text-slate-900">{q}</p><p className="mt-2 text-sm leading-6 text-slate-600">{a}</p></div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <SectionTitle eyebrow="Support" title="Contact and project overview" description="A small support panel makes the demo clearer and gives the project a finished product feel." />
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Email: support@kisansathi.local</div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Helpline: +91 90000 12345</div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Working hours: 8:00 AM to 7:00 PM</div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Supported languages: English, Hindi</div>
            </div>
          </Card>
        </div>
      ) : null}

      {variant === "dashboard" ? (
        <Card className="p-6">
          <SectionTitle eyebrow="Dashboard" title="Use the crop advisory, weather, and market signals together" description="The dashboard can stay simple but still centralize the most important next actions for a farmer." />
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">Use the dedicated dashboard route for the farmer overview. This screen is kept as a fallback shell for the module router.</div>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-3">
        {summary.bullets.map((bullet) => (
          <Card key={bullet} className="p-5">
            <p className="text-sm leading-6 text-slate-700">{bullet}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href={ctaHref}>
          <Button>
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/help">
          <Button variant="secondary">How the frontend is structured</Button>
        </Link>
      </div>
    </section>
  );
}