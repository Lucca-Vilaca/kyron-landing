"use client";

import { m, useReducedMotion } from "framer-motion";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const prefersReduced = useReducedMotion();
  const { eyebrow, headingBefore, headingEmphasis, headingAfter, sub, ctaPrimary, ctaSecondary } =
    content.hero;

  const lineAnim = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <section
      id="top"
      className="relative z-10 mx-auto grid w-[min(calc(100%-32px),1240px)] min-h-[85vh] grid-cols-1 items-center gap-12 px-2 pt-24 pb-20 md:pt-36 md:pb-28 lg:grid-cols-[1.15fr_1fr] lg:gap-0"
    >
      <div className="relative z-10 flex flex-col items-start gap-8">
        <Eyebrow>{eyebrow}</Eyebrow>

        <h1 className="font-display text-[clamp(52px,9vw,132px)] font-medium leading-[0.88] tracking-[-0.035em] text-ink text-balance max-w-[14ch]">
          <m.span className="block" {...lineAnim(0)}>
            {headingBefore}
          </m.span>
          <m.span className="block italic text-gold" {...lineAnim(0.15)}>
            {headingEmphasis}
          </m.span>
          <m.span className="block" {...lineAnim(0.3)}>
            {headingAfter}
          </m.span>
        </h1>

        <m.p
          className="max-w-[52ch] text-[15px] leading-relaxed text-ink-muted md:text-[17px]"
          {...(prefersReduced
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.5, ease },
              })}
        >
          {sub}
        </m.p>

        <m.div
          className="flex flex-wrap items-center gap-3"
          {...(prefersReduced
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.6, ease },
              })}
        >
          <Button href={ctaPrimary.href}>{ctaPrimary.label}</Button>
          <Button href={ctaSecondary.href} variant="secondary">
            {ctaSecondary.label}
          </Button>
        </m.div>
      </div>

      <m.div
        className="relative mx-auto w-full max-w-[340px] lg:absolute lg:right-[-4%] lg:top-1/2 lg:w-[42%] lg:max-w-none lg:-translate-y-1/2"
        style={{ rotate: prefersReduced ? 0 : 6 }}
        {...(prefersReduced
          ? {}
          : {
              initial: { opacity: 0, x: 40, rotate: 12 },
              animate: { opacity: 1, x: 0, rotate: 6 },
              transition: { duration: 0.9, delay: 0.4, ease },
            })}
      >
        <PhoneMockup
          src="/assets/iphone16-home.webp"
          srcAvif="/assets/iphone16-home.avif"
          alt="Tela inicial do Kyron com o treino de muay thai do dia pronto para começar"
          priority
        />
      </m.div>
    </section>
  );
}
