import { content } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function ComoFunciona() {
  const { eyebrow, headingBefore, headingEmphasis, headingAfter, steps } = content.comoFunciona;

  return (
    <section
      id="como-funciona"
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

      <Stagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.1}>
        {steps.map((step) => (
          <StaggerItem
            key={step.number}
            as="article"
            className="relative overflow-hidden rounded-[16px] border border-line bg-white/[0.03] p-8 transition-colors duration-200 hover:border-gold/25"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none block font-display text-[96px] font-semibold leading-none text-gold/20"
            >
              {step.number}
            </span>
            <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{step.description}</p>
            <p className="mt-5 font-display text-[14px] italic text-gold/80">{step.example}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
