import { content } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/cn";

export function Diferenciais() {
  const { section, eyebrow, headingBefore, headingEmphasis, headingAfter, sub, items } =
    content.diferenciais;

  return (
    <section
      id="diferenciais"
      className="relative z-10 mx-auto w-[min(100%-32px,1360px)] border-t border-line px-2 py-[clamp(96px,14vw,180px)]"
    >
      <Reveal>
        <SectionHeader
          section={section}
          eyebrow={eyebrow}
          heading={
            <>
              {headingBefore}
              <em className="not-italic font-editorial italic text-steel">{headingEmphasis}</em>
              {headingAfter}
            </>
          }
          sub={sub}
        />
      </Reveal>

      <Stagger className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2" stagger={0.08}>
        {items.map((item, i) => (
          <StaggerItem
            key={item.title}
            as="article"
            className={cn(
              "relative overflow-hidden border p-7 transition-colors duration-200 md:p-10",
              item.featured
                ? "border-steel/35 bg-steel/[0.03] md:col-span-2"
                : "border-line bg-obsidian-2/50 hover:border-steel/40",
            )}
          >
            {/* Tag row */}
            <div className="flex items-center justify-between border-b border-line pb-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                <span className="text-steel">{String(i + 1).padStart(2, "0")}</span>
                <span className="mx-2">/</span>
                {item.tag}
              </span>
              {item.featured && (
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-steel">
                  Núcleo do produto
                </span>
              )}
            </div>

            <h3
              className={cn(
                "mt-6 font-display leading-[1] tracking-[-0.025em] text-ink text-balance md:mt-8",
                item.featured
                  ? "text-[28px] sm:text-[36px] md:text-[52px]"
                  : "text-[22px] md:text-[26px]",
              )}
            >
              {item.title}
            </h3>
            <p className="mt-6 max-w-[56ch] text-[14px] leading-relaxed text-ink-dim md:text-[15px]">
              {item.description}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
