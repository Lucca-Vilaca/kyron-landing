import { content } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/cn";

export function Prova() {
  const { eyebrow, headingBefore, headingEmphasis, headingAfter, sub, cards } = content.prova;

  return (
    <section
      id="prova"
      className="relative z-10 mx-auto w-[min(calc(100%-32px),1240px)] px-2 py-[clamp(80px,12vw,160px)]"
    >
      <Reveal>
        <SectionHeader
          eyebrow={eyebrow}
          heading={
            <>
              {headingBefore}
              <em className="not-italic font-display italic text-gold">{headingEmphasis}</em>
              {headingAfter}
            </>
          }
          sub={sub}
        />
      </Reveal>

      <Stagger className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3 md:items-stretch" stagger={0.08}>
        {cards.map((card) => (
          <StaggerItem
            key={card.ordinal}
            as="article"
            className={cn(
              "relative flex flex-col overflow-hidden rounded-[16px] border border-line bg-white/[0.04] p-7 transition-colors duration-200 hover:border-gold/30",
              card.featured && "md:scale-[1.02] border-gold/25"
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-6 font-mono text-[76px] font-medium leading-none tracking-tight text-gold/[0.08]"
            >
              {card.ordinal}
            </span>

            <div className="relative mx-auto mb-6 w-[68%] max-w-[220px]">
              <PhoneMockup
                src={card.image.webp}
                srcAvif={card.image.avif}
                alt={card.image.alt}
                className="rounded-[22px]"
              />
            </div>

            <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{card.label}</p>
            <h3 className="mt-3 font-display text-[20px] leading-tight tracking-[-0.01em] text-ink">
              {card.title}
            </h3>
            <ul className="mt-5 flex flex-col gap-2 text-[13px] text-ink-muted">
              {card.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-gold">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
