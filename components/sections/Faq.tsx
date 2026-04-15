"use client";

import { useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { content } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function Faq() {
  const { eyebrow, headingBefore, headingEmphasis, headingAfter, items } = content.faq;
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="faq"
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

      <Reveal className="mt-12">
        <ul className="flex flex-col divide-y divide-line border-y border-line">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;
            return (
              <li key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    <span
                      className={cn(
                        "font-display text-[22px] font-medium leading-snug text-ink md:text-[26px]",
                        isOpen && "text-gold"
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-2xl text-gold transition-transform duration-300",
                        isOpen && "rotate-45"
                      )}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[64ch] pb-6 text-[15px] leading-relaxed text-ink-muted md:text-[16px]">
                        {item.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
