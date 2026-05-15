import { content } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function ComoFunciona() {
  const { section, eyebrow, headingBefore, headingEmphasis, headingAfter, sub, steps } =
    content.comoFunciona;

  return (
    <section
      id="como-funciona"
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

      <Stagger className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3 md:gap-0" stagger={0.1}>
        {steps.map((step, i) => (
          <StaggerItem
            key={step.number}
            as="article"
            className="relative border border-line bg-obsidian-2/40 p-8 md:border-r-0 md:p-10 md:last:border-r"
          >
            {/* Top rule with number */}
            <div className="absolute left-0 top-0 flex h-[3px] w-full items-center">
              <span className="h-full w-12 bg-steel" />
              <span className="h-px flex-1 bg-line" />
            </div>

            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-steel">
                Etapa {step.number}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                0{i + 1} / 03
              </span>
            </div>

            <div className="mt-10">
              <span className="block font-display text-[64px] leading-none tracking-[-0.04em] text-ink/[0.14]">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-[26px] leading-[1] tracking-[-0.025em] text-ink text-balance">
                {step.title}
              </h3>
              <p className="mt-5 max-w-[40ch] text-[14px] leading-relaxed text-ink-dim">
                {step.description}
              </p>
            </div>

            <p className="mt-10 border-t border-line pt-5 font-editorial text-[14px] italic text-steel-soft">
              {step.example}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
