import { content } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/cn";

export function Diferenciais() {
  const { eyebrow, headingBefore, headingEmphasis, headingAfter, items } = content.diferenciais;

  return (
    <section
      id="diferenciais"
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
        />
      </Reveal>

      <Stagger className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.08}>
        {items.map((item) => (
          <StaggerItem
            key={item.title}
            as="article"
            className={cn(
              "rounded-[16px] border border-line bg-white/[0.03] p-8 transition-colors duration-200 hover:border-gold/30",
              item.featured && "md:col-span-2 border-gold/25 bg-white/[0.05]"
            )}
          >
            <h3
              className={cn(
                "font-display font-semibold leading-tight text-ink",
                item.featured ? "text-[32px] md:text-[40px]" : "text-[22px]"
              )}
            >
              {item.title}
            </h3>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-muted">
              {item.description}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
