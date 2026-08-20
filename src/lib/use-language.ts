"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Lang = "en" | "hi";

const STORAGE_KEY = "ks-lang";

/**
 * A tiny module-level store so every component that calls `useLanguage()`
 * shares the SAME reactive language value. Previously each component kept
 * its own `useState`, so picking Hindi on the landing page never reached the
 * dashboard. With a shared store + `useSyncExternalStore`, any change is
 * broadcast to every subscriber (landing, topbar, dashboard, ...).
 */
let currentLang: Lang = "en";
const listeners = new Set<() => void>();

function readInitial(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "hi" ? "hi" : "en";
}

// Seed from localStorage as soon as this module loads in the browser.
if (typeof window !== "undefined") {
  currentLang = readInitial();
  document.documentElement.lang = currentLang;

  // Keep multiple tabs / windows in sync.
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      const next = event.newValue === "hi" ? "hi" : "en";
      if (next !== currentLang) {
        currentLang = next;
        listeners.forEach((listener) => listener());
      }
    }
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Lang {
  return currentLang;
}

function getServerSnapshot(): Lang {
  return "en";
}

function setLangGlobal(next: Lang) {
  if (next === currentLang) return;
  currentLang = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }
  listeners.forEach((listener) => listener());
}

/**
 * Shared language state persisted in localStorage. The choice carries across
 * every page and updates all mounted components reactively.
 */
export function useLanguage() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((next: Lang) => {
    setLangGlobal(next);
  }, []);

  const toggle = useCallback(() => {
    setLangGlobal(currentLang === "en" ? "hi" : "en");
  }, []);

  return { lang, setLang, toggle };
}
