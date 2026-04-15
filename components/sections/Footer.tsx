import { content } from "@/lib/content";

export function Footer() {
  const { brand, tagline, copyright } = content.footer;
  return (
    <footer className="relative z-10 mx-auto mt-20 flex w-[min(calc(100%-32px),1240px)] flex-col items-start justify-between gap-4 border-t border-line py-8 md:flex-row md:items-center">
      <span className="font-display text-[15px] font-semibold tracking-wide text-ink">{brand}</span>
      <div className="flex flex-col gap-1 text-[12px] text-ink-muted md:flex-row md:gap-6">
        <span>{tagline}</span>
        <span>{copyright}</span>
      </div>
    </footer>
  );
}
