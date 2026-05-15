import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Mono kicker with the 28px steel bar prefix — Kyron brand signature.
 * Uses JetBrains Mono, uppercase, steel color, 0.24em tracking.
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[11px] uppercase leading-none text-steel",
        "tracking-[0.24em]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="inline-block h-px w-7 bg-steel"
      />
      {children}
    </p>
  );
}
