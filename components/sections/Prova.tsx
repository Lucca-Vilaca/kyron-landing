import { content } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/cn";

export function Prova() {
  const { section, eyebrow, headingBefore, headingEmphasis, headingAfter, sub, cards } =
    content.prova;

  return (
    <section
      id="prova"
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

      <Stagger className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3 md:items-stretch" stagger={0.08}>
        {cards.map((card) => (
          <StaggerItem
            key={card.ordinal}
            as="article"
            className={cn(
              "group relative flex flex-col overflow-hidden border bg-obsidian-2/60 p-6 transition-all duration-300 md:p-7",
              card.featured
                ? "border-steel/30 md:scale-[1.015]"
                : "border-line hover:border-steel/40",
            )}
          >
            {/* Top meta row — ordinal + label */}
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                {card.ordinal} · {card.label}
              </span>
              {card.featured && (
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-steel">
                  · Destaque
                </span>
              )}
            </div>

            {/* Ghost ordinal watermark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-10 font-display text-[96px] leading-none tracking-[-0.04em] text-steel/[0.06]"
            >
              {card.ordinal}
            </span>

            <div className="relative mx-auto mt-10 mb-2 w-[64%] max-w-[200px] sm:w-[56%] md:w-[68%]">
              <PhoneMockup
                src={card.image.webp}
                srcAvif={card.image.avif}
                alt={card.image.alt}
                radius={26}
              />
            </div>

            <h3 className="mt-8 font-display text-[22px] leading-[1] tracking-[-0.02em] text-ink text-balance">
              {card.title}
            </h3>

            <ul className="mt-5 flex flex-col gap-2.5 text-[13px] leading-relaxed text-ink-dim">
              {card.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[6px] h-px w-3 flex-shrink-0 bg-steel" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
