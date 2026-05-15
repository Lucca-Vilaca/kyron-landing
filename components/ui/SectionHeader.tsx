import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeaderProps = {
  eyebrow: string;
  heading: ReactNode;
  sub?: ReactNode;
  section?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Section header with optional section number (01, 02…) in the left rail
 * and a large Archivo Black uppercase display title.
 */
export function SectionHeader({
  eyebrow,
  heading,
  sub,
  section,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6 md:grid md:gap-10",
        section ? "md:grid-cols-[auto_1fr]" : "md:grid-cols-1",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {section && (
        <div className="md:pt-4">
          <span className="block font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
            {section} /
          </span>
        </div>
      )}
      <div className={cn("flex flex-col gap-6", align === "center" && "items-center text-center")}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display text-[clamp(26px,5.5vw,80px)] leading-[1.02] tracking-[-0.02em] text-ink text-balance break-words max-w-[20ch]">
          {heading}
        </h2>
        {sub && (
          <p className="max-w-[52ch] text-[14px] leading-relaxed text-ink-dim md:text-[15px]">
            {sub}
          </p>
        )}
      </div>
    </header>
  );
}
