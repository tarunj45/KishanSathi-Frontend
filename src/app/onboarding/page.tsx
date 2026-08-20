"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  Leaf,
  MapPin,
  Sprout,
  User as UserIcon,
} from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiCompleteProfile, apiGetProfile } from "@/lib/auth-client";
import { validateEmail, validateMobile } from "@/lib/auth-validation";
import { useAuth, getToken } from "@/lib/use-auth";
import { useLanguage } from "@/lib/use-language";
import { cn } from "@/lib/utils";

interface FarmerProfile {
  fullName: string;
  mobile: string;
  email: string;
  village: string;
  district: string;
  state: string;
  pincode: string;
  farmSizeAcres: string;
  primaryCrop: string;
  soilType: string;
  irrigationSource: string;
  language: string;
}

const SOIL_TYPES = [
  "Alluvial",
  "Black",
  "Red",
  "Laterite",
  "Sandy",
  "Clay",
  "Loamy",
];
const IRRIGATION_SOURCES = [
  "Canal",
  "Borewell / Tubewell",
  "Open well",
  "River / Pond",
  "Rainfed",
  "Drip / Sprinkler",
];

const empty: FarmerProfile = {
  fullName: "",
  mobile: "",
  email: "",
  village: "",
  district: "",
  state: "",
  pincode: "",
  farmSizeAcres: "",
  primaryCrop: "",
  soilType: "",
  irrigationSource: "",
  language: "en",
};

function OnboardingForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { isAuthenticated, ready, user, updateUser } = useAuth();
  const { lang } = useLanguage();

  const next = params.get("next") || "/dashboard";
  const isEdit = params.get("edit") === "1";
  const [form, setForm] = useState<FarmerProfile>({ ...empty, language: lang });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Guard: must be signed in. In edit mode we allow onboarded users in and
  // prefill their saved details; otherwise a completed profile skips ahead.
  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated) {
      router.replace("/?auth=login&next=/onboarding");
    } else if (user?.onboarded && !isEdit) {
      router.replace(next);
    }
  }, [ready, isAuthenticated, user, next, router, isEdit]);

  // Prefill contact details from the signed-in user (both new + edit flows).
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      mobile: f.mobile || user.mobile || "",
      email: f.email || user.email || "",
      fullName: f.fullName || user.fullName || "",
      language: f.language || user.language_pref || lang,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Prefill the farm details from the saved profile when editing.
  useEffect(() => {
    if (!isEdit || !ready || !isAuthenticated) return;
    const token = getToken();
    if (!token) return;
    let active = true;
    (async () => {
      try {
        const profile = await apiGetProfile(token);
        if (!active) return;
        setForm((f) => ({
          ...f,
          fullName: user?.fullName ?? f.fullName,
          language: user?.language_pref ?? f.language,
          village: profile?.village ?? "",
          district: profile?.district ?? "",
          state: profile?.state ?? "",
          pincode: profile?.pincode ?? "",
          farmSizeAcres:
            profile?.land_size_acres != null
              ? String(profile.land_size_acres)
              : "",
          primaryCrop: profile?.primary_crops?.[0] ?? "",
          soilType: profile?.soil_type ?? "",
          irrigationSource: profile?.irrigation_source ?? "",
        }));
      } catch {
        // Non-fatal: fall back to an empty form.
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, ready, isAuthenticated]);

  const set = (key: keyof FarmerProfile, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const required = useMemo<Array<keyof FarmerProfile>>(
    () => [
      "fullName",
      "mobile",
      "email",
      "village",
      "district",
      "state",
      "farmSizeAcres",
      "primaryCrop",
    ],
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    for (const key of required) {
      if (!form[key].trim()) {
        setError("Please fill in all required fields.");
        return;
      }
    }
    const mobileErr = validateMobile(form.mobile);
    if (mobileErr) {
      setError(mobileErr);
      return;
    }
    const emailErr = validateEmail(form.email);
    if (emailErr) {
      setError(emailErr);
      return;
    }
    if (form.pincode && !/^\d{6}$/.test(form.pincode.trim())) {
      setError("PIN code must be 6 digits.");
      return;
    }
    const token = getToken();
    if (!user || !token) return;
    setError(null);
    setSaving(true);
    try {
      const updated = await apiCompleteProfile(token, {
        full_name: form.fullName.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim(),
        village: form.village.trim() || undefined,
        district: form.district.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim() || undefined,
        land_size_acres: form.farmSizeAcres
          ? Number(form.farmSizeAcres)
          : null,
        primary_crop: form.primaryCrop.trim() || undefined,
        soil_type: form.soilType || undefined,
        irrigation_source: form.irrigationSource || undefined,
        language: form.language || lang,
      });
      updateUser(updated);
      router.replace(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save profile.");
      setSaving(false);
    }
  };

  if (!ready || !isAuthenticated || (user?.onboarded && !isEdit)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-app-gradient">
        <div className="flex items-center gap-3 text-slate-500">
          <Leaf className="h-5 w-5 animate-pulse text-emerald-600" />
          <span className="text-sm font-medium">Loading...</span>
        </div>
      </main>
    );
  }

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100";
  const fieldWrap = "space-y-1.5 text-sm font-medium text-slate-700";
  const req = <span className="text-rose-500">*</span>;

  return (
    <main className="min-h-screen bg-app-gradient px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          {/* Back to home, at the leftmost, to the LEFT of the leaf logo */}
          <Link
            href="/"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-emerald-600 transition hover:border-emerald-200 hover:bg-emerald-50/40"
            aria-label={lang === "en" ? "Back to home" : "होम पर वापस"}
            title={lang === "en" ? "Back to home" : "होम पर वापस"}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <Leaf className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isEdit ? "Update your profile" : "Tell us about your farm"}
            </h1>
            <p className="text-sm text-slate-500">
              {isEdit
                ? "Change any of your farm details below and save."
                : "We collect this once to personalize your advisories."}
            </p>
          </div>
        </div>

        {error ? (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal */}
            <section className="space-y-4">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-700">
                <UserIcon className="h-4 w-4" /> Personal details
              </p>
              <label className={fieldWrap}>
                <span>Full name {req}</span>
                <input
                  autoFocus
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  className={inputClass}
                  placeholder="Ramesh Kumar"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={fieldWrap}>
                  <span>Mobile number {req}</span>
                  <input
                    inputMode="numeric"
                    maxLength={10}
                    value={form.mobile}
                    onChange={(e) =>
                      set("mobile", e.target.value.replace(/[^\d]/g, ""))
                    }
                    className={inputClass}
                    placeholder="9876543210"
                  />
                </label>
                <label className={fieldWrap}>
                  <span>Email {req}</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={inputClass}
                    placeholder="ramesh@example.com"
                  />
                </label>
              </div>
              <label className={fieldWrap}>
                <span>Preferred language</span>
                <select
                  value={form.language}
                  onChange={(e) => set("language", e.target.value)}
                  className={inputClass}
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                </select>
              </label>
            </section>

            {/* Location */}
            <section className="space-y-4">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-700">
                <MapPin className="h-4 w-4" /> Location
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={fieldWrap}>
                  <span>Village / Town {req}</span>
                  <input
                    value={form.village}
                    onChange={(e) => set("village", e.target.value)}
                    className={inputClass}
                    placeholder="Rampur"
                  />
                </label>
                <label className={fieldWrap}>
                  <span>District {req}</span>
                  <input
                    value={form.district}
                    onChange={(e) => set("district", e.target.value)}
                    className={inputClass}
                    placeholder="Jaipur"
                  />
                </label>
                <label className={fieldWrap}>
                  <span>State {req}</span>
                  <input
                    value={form.state}
                    onChange={(e) => set("state", e.target.value)}
                    className={inputClass}
                    placeholder="Rajasthan"
                  />
                </label>
                <label className={fieldWrap}>
                  <span>PIN code</span>
                  <input
                    inputMode="numeric"
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) =>
                      set("pincode", e.target.value.replace(/[^\d]/g, ""))
                    }
                    className={inputClass}
                    placeholder="302001"
                  />
                </label>
              </div>
            </section>

            {/* Farm */}
            <section className="space-y-4">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-700">
                <Sprout className="h-4 w-4" /> Farm details
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={fieldWrap}>
                  <span>Farm size (acres) {req}</span>
                  <input
                    inputMode="decimal"
                    value={form.farmSizeAcres}
                    onChange={(e) =>
                      set(
                        "farmSizeAcres",
                        e.target.value.replace(/[^\d.]/g, ""),
                      )
                    }
                    className={inputClass}
                    placeholder="2.5"
                  />
                </label>
                <label className={fieldWrap}>
                  <span>Primary crop {req}</span>
                  <input
                    value={form.primaryCrop}
                    onChange={(e) => set("primaryCrop", e.target.value)}
                    className={inputClass}
                    placeholder="Wheat"
                  />
                </label>
                <label className={fieldWrap}>
                  <span>Soil type</span>
                  <select
                    value={form.soilType}
                    onChange={(e) => set("soilType", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select soil type</option>
                    {SOIL_TYPES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={fieldWrap}>
                  <span className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-emerald-600" /> Irrigation
                    source
                  </span>
                  <select
                    value={form.irrigationSource}
                    onChange={(e) => set("irrigationSource", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select source</option>
                    {IRRIGATION_SOURCES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <button
              type="submit"
              disabled={saving}
              className={buttonStyles(
                "primary",
                cn("w-full justify-center", saving && "opacity-70"),
              )}
            >
              {saving
                ? "Saving..."
                : isEdit
                  ? "Save changes"
                  : "Save and continue"}
              {!saving ? <ArrowRight className="h-4 w-4" /> : null}
            </button>
          </form>
        </Card>
      </div>
    </main>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-app-gradient">
          <div className="flex items-center gap-3 text-slate-500">
            <Leaf className="h-5 w-5 animate-pulse text-emerald-600" />
            <span className="text-sm font-medium">Loading...</span>
          </div>
        </main>
      }
    >
      <OnboardingForm />
    </Suspense>
  );
}
