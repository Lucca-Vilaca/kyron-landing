import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeaderProps = {
  eyebrow: string;
  heading: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  heading,
  sub,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-[clamp(36px,5vw,64px)] font-medium leading-[0.95] tracking-[-0.025em] text-ink text-balance max-w-[22ch]">
        {heading}
      </h2>
      {sub && (
        <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-muted md:text-[17px]">
          {sub}
        </p>
      )}
    </header>
  );
}
