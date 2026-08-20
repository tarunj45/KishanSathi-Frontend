export interface AuthUser {
  id: string;
  mobile: string;
  email: string;
  language_pref?: string;
  /** Whether the one-time farmer onboarding has been completed. */
  onboarded?: boolean;
  /** Collected during onboarding; used for greetings and personalization. */
  fullName?: string;
}

export interface AuthSession {
  token: string;
  refreshToken: string;
  user: AuthUser;
}

// The FastAPI backend base URL. Configure via NEXT_PUBLIC_API_BASE_URL.
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

interface BackendUser {
  id: string;
  mobile: string;
  email: string;
  full_name?: string | null;
  language_pref: string;
  onboarded: boolean;
}

interface BackendAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: BackendUser;
}

function mapUser(u: BackendUser): AuthUser {
  return {
    id: String(u.id),
    mobile: u.mobile,
    email: u.email,
    language_pref: u.language_pref,
    onboarded: u.onboarded,
    fullName: u.full_name ?? undefined,
  };
}

function parseError(data: unknown): string {
  const detail = (data as { detail?: unknown }).detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg as string;
  return "Something went wrong. Please try again.";
}

async function request<T>(
  path: string,
  init: RequestInit,
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
  } catch {
    throw new Error(
      "Cannot reach the server. Please check your connection and try again.",
    );
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(parseError(data));
  return data as T;
}

async function postAuth(path: string, payload: unknown): Promise<AuthSession> {
  const body = await request<BackendAuthResponse>(path, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return {
    token: body.access_token,
    refreshToken: body.refresh_token,
    user: mapUser(body.user),
  };
}

export function apiLogin(identifier: string, password: string) {
  return postAuth("/auth/login", { identifier, password });
}

export function apiSignup(input: {
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  return postAuth("/auth/signup", {
    mobile: input.mobile,
    email: input.email,
    password: input.password,
    confirm_password: input.confirmPassword,
  });
}

export interface OnboardingPayload {
  full_name: string;
  mobile?: string;
  email?: string;
  village?: string;
  district: string;
  state: string;
  pincode?: string;
  land_size_acres?: number | null;
  primary_crop?: string;
  soil_type?: string;
  irrigation_source?: string;
  language: string;
}

export interface FarmProfileData {
  farm_name?: string | null;
  village?: string | null;
  district?: string | null;
  state?: string | null;
  pincode?: string | null;
  land_size_acres?: number | null;
  soil_type?: string | null;
  primary_crops?: string[] | null;
  irrigation_source?: string | null;
}

/** Fetches the saved farm profile, or null if none exists yet. */
export async function apiGetProfile(
  token: string,
): Promise<FarmProfileData | null> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/farm-profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    throw new Error(
      "Cannot reach the server. Please check your connection and try again.",
    );
  }
  if (res.status === 404) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(parseError(data));
  return data as FarmProfileData;
}

/** Saves the one-time farmer profile; returns the updated user. */
export async function apiCompleteProfile(
  token: string,
  payload: OnboardingPayload,
): Promise<AuthUser> {
  const user = await request<BackendUser>("/auth/complete-profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return mapUser(user);
}
