"use client";

import { useEffect, useState } from "react";

import { apiGetProfile, type FarmProfileData } from "@/lib/auth-client";
import { getToken } from "@/lib/use-auth";

/**
 * Loads the signed-in farmer's saved farm profile (village/district/state,
 * crops, etc.) on the client. Used to show the real location the user entered
 * during onboarding instead of placeholder data.
 */
export function useFarmProfile() {
  const [profile, setProfile] = useState<FarmProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    let active = true;
    (async () => {
      try {
        const data = await apiGetProfile(token);
        if (active) setProfile(data);
      } catch {
        // Non-fatal: fall back to defaults.
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return { profile, loading };
}

/** Joins the available location parts into a single readable string. */
export function formatFarmLocation(profile: FarmProfileData | null): string {
  if (!profile) return "";
  return [profile.village, profile.district, profile.state]
    .map((p) => p?.trim())
    .filter(Boolean)
    .join(", ");
}
