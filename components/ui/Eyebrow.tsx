import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-medium uppercase leading-none tracking-[0.22em] text-gold",
        className,
      )}
    >
      <span className="inline-block h-3 w-[3px] bg-crimson" aria-hidden="true" />
      {children}
    </p>
  );
}
