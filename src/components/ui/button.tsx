import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function buttonStyles(
  variant: ButtonVariant = "primary",
  extraClassName = "",
) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700",
    secondary:
      "border border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50",
    ghost: "text-slate-700 hover:bg-slate-100",
  };

  return cn(base, variants[variant], extraClassName);
}

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button className={buttonStyles(variant, className)} {...props}>
      {children}
    </button>
  );
}