"use client";

import { useCallback, useEffect, useState } from "react";

import type { AuthSession, AuthUser } from "@/lib/auth-client";

const AUTH_KEY = "ks-auth";
const TOKEN_KEY = "ks-token";
const USER_KEY = "ks-user";
// Fired within the same tab so every useAuth() instance re-syncs immediately.
// (The native "storage" event only fires in OTHER tabs, which is why logout
// used to need several clicks to take effect on the current page.)
const AUTH_EVENT = "ks-auth-change";

function readAuth(): { isAuthenticated: boolean; user: AuthUser | null } {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, user: null };
  }
  const isAuthenticated = window.localStorage.getItem(AUTH_KEY) === "true";
  let user: AuthUser | null = null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (raw) {
    try {
      user = JSON.parse(raw) as AuthUser;
    } catch {
      user = null;
    }
  }
  return { isAuthenticated, user };
}

function broadcastAuthChange() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

/**
 * Client-side auth state backed by the FastAPI backend.
 * Stores the access token + user returned by the API.
 * Later this can move to httpOnly cookies for stronger security.
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      const next = readAuth();
      setIsAuthenticated(next.isAuthenticated);
      setUser(next.user);
    };

    sync();
    setReady(true);

    // Same-tab updates (login/logout/profile edits) and cross-tab updates.
    window.addEventListener(AUTH_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(AUTH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const signIn = useCallback((session: AuthSession) => {
    window.localStorage.setItem(AUTH_KEY, "true");
    window.localStorage.setItem(TOKEN_KEY, session.token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    setIsAuthenticated(true);
    setUser(session.user);
    broadcastAuthChange();
  }, []);

  const updateUser = useCallback((next: AuthUser) => {
    window.localStorage.setItem(USER_KEY, JSON.stringify(next));
    setUser(next);
    broadcastAuthChange();
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    setIsAuthenticated(false);
    setUser(null);
    broadcastAuthChange();
  }, []);

  return { isAuthenticated, user, ready, signIn, updateUser, logout };
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

/**
 * Builds a link that opens the login modal on the home page and
 * returns the user to `next` after signing in.
 */
export function loginHref(next: string) {
  return `/?auth=login&next=${encodeURIComponent(next)}`;
}
