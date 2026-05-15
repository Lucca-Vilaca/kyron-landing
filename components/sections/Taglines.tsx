import { content } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function Taglines() {
  const { section, eyebrow, lines } = content.taglines;

  return (
    <section
      id="voz"
      className="relative z-10 mx-auto w-[min(100%-32px,1360px)] border-t border-line px-2 py-[clamp(80px,12vw,160px)]"
    >
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <div className="flex items-baseline gap-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-muted">
              {section} /
            </span>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
            6 frases · voz da marca
          </span>
        </div>
      </Reveal>

      <Stagger className="mt-12 border-t border-line md:mt-16" stagger={0.06}>
        {lines.map((line) => (
          <StaggerItem
            key={line.idx}
            className="group flex flex-col gap-2 border-b border-line py-6 transition-colors hover:bg-obsidian-2/40 md:grid md:grid-cols-[90px_1fr_auto] md:items-center md:gap-10 md:py-8"
          >
            <div className="flex items-center justify-between gap-4 md:block">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                {line.idx}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel md:hidden">
                · {line.use}
              </span>
            </div>
            <p className="font-display text-[clamp(22px,4.5vw,52px)] leading-[1.02] tracking-[-0.02em] text-ink text-balance">
              {line.text}{" "}
              <em className="not-italic font-editorial italic text-steel">{line.em}</em>
              {line.rest && <> {line.rest}</>}
            </p>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-steel md:inline md:text-right">
              · {line.use}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
