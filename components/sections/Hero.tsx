import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Monogram } from "@/components/ui/Monogram";

export function Hero() {
  const {
    section,
    eyebrow,
    headingBefore,
    headingEmphasis,
    headingAfter,
    sub,
    ctaPrimary,
    ctaSecondary,
    meta,
  } = content.hero;

  return (
    <section
      id="top"
      className="relative z-10 mx-auto flex w-[min(100%-32px,1360px)] flex-col gap-10 overflow-hidden px-1 pt-12 pb-20 sm:px-2 md:gap-12 md:pt-24 md:pb-28"
    >
      {/* ── Meta bar — document/region/build ─────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-line py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-steel">{section}</span>
          <span className="h-px w-6 bg-line-2 sm:w-8" />
          <span>{meta.doc}</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <span className="text-steel">●</span>
          <span>{meta.region}</span>
        </div>
      </div>

      {/* ── Eyebrow ────────────────────────────────────────── */}
      <div className="rise-line">
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>

      {/* ── Main layout ────────────────────────────────────── */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div className="relative z-10 flex flex-col items-start gap-10">
          {/* Title */}
          <h1 className="font-display text-[clamp(44px,11vw,168px)] leading-[0.88] tracking-[-0.04em] text-ink text-balance max-w-full">
            <span className="rise-line rise-line-1 block">{headingBefore}</span>
            <span
              className="rise-line rise-line-2 block font-editorial not-italic text-steel"
              style={{ fontStyle: "italic", fontWeight: 500, letterSpacing: "-0.03em" }}
            >
              {headingEmphasis}
            </span>
            <span className="rise-line rise-line-3 block">{headingAfter}</span>
          </h1>

          <p className="rise-line rise-line-4 max-w-[52ch] text-[15px] leading-[1.6] text-ink-dim md:text-[16px]">
            {sub}
          </p>

          <div className="rise-line rise-line-5 flex flex-wrap items-center gap-3">
            <Button href={ctaPrimary.href}>{ctaPrimary.label}</Button>
            <Button href={ctaSecondary.href} variant="secondary">
              {ctaSecondary.label}
            </Button>
          </div>

          {/* ── Bottom meta row — three columns like the brand book ─── */}
          <div className="rise-line mt-6 grid w-full grid-cols-1 gap-8 border-t border-line pt-8 md:grid-cols-3" style={{ animationDelay: "1.05s" }}>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                —— 01 · Contexto
              </span>
              <p className="max-w-[32ch] text-[13px] leading-relaxed text-ink-dim">
                Sessão montada pelo seu ambiente, nível e tempo. Nada genérico.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                —— 02 · Execução
              </span>
              <p className="max-w-[32ch] text-[13px] leading-relaxed text-ink-dim">
                Rounds, descanso, progressão. Sem fricção. Sem decorativo.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                —— 03 · Progressão
              </span>
              <p className="max-w-[32ch] text-[13px] leading-relaxed text-ink-dim">
                Score, streak e ranking convertidos em evolução percebida.
              </p>
            </div>
          </div>
        </div>

        {/* ── Phone frame with corner brackets ───────────────── */}
        <div className="rise-line relative mx-auto w-full max-w-[360px] lg:max-w-none" style={{ animationDelay: "0.45s" }}>
          <div className="weave relative border border-line-2 bg-obsidian-2 p-8 md:p-10">
            {/* Corner brackets */}
            <div className="brackets">
              <span /><span /><span /><span />
            </div>

            {/* Top-left identifier — nested inside the bracket L */}
            <span className="absolute left-[28px] top-[28px] font-mono text-[9px] uppercase tracking-[0.24em] text-steel">
              APP · iOS
            </span>
            {/* Top-right monogram — clear of the bracket lines */}
            <span className="absolute right-[28px] top-[28px] leading-none">
              <Monogram size={14} />
            </span>

            {/* Bottom-left tag */}
            <span className="absolute bottom-[28px] left-[28px] font-mono text-[9px] uppercase tracking-[0.24em] text-ink-muted">
              Home
            </span>
            <span className="absolute bottom-[28px] right-[28px] font-mono text-[9px] uppercase tracking-[0.24em] text-ink-muted">
              01 / 04
            </span>

            <div className="relative mx-auto w-[78%] pt-6">
              <PhoneMockup
                src="/assets/mockups/02-home.webp"
                srcAvif="/assets/mockups/02-home.avif"
                alt="Tela inicial do Kyron saudando Lucca com a sugestão Kyron Legacy de treino de musculação"
                priority
              />
            </div>
          </div>

          {/* Stat caption under the frame */}
          <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
            <span>—— Kyron · Interface</span>
            <span className="text-steel">Treino é combate.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
