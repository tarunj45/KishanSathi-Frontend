import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function cardStyles(extraClassName = "") {
  return cn(
    "rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]",
    extraClassName,
  );
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cardStyles(className)} {...props}>
      {children}
    </div>
  );
}