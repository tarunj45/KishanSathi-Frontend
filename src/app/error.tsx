"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-app-gradient px-4 py-10 text-slate-900">
        <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-start justify-center gap-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Something went wrong</p>
          <h1 className="text-3xl font-semibold">We could not load this page.</h1>
          <p className="text-sm leading-6 text-slate-600">
            The frontend shell hit an unexpected issue. You can retry or return to the dashboard.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={reset}>Try again</Button>
            <Link href="/dashboard">
              <Button variant="secondary">Go to dashboard</Button>
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}