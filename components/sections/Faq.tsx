"use client";

import { useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { content } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function Faq() {
  const { section, eyebrow, headingBefore, headingEmphasis, headingAfter, items } = content.faq;
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="faq"
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
        />
      </Reveal>

      <Reveal className="mt-16">
        <ul className="flex flex-col border-t border-line">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;
            return (
              <li key={item.question} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className={cn(
                      "group grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 py-7 text-left transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel",
                    )}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-steel">
                      Q · {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[22px] uppercase leading-[1.05] tracking-[-0.02em] transition-colors md:text-[28px]",
                        isOpen ? "text-steel" : "text-ink group-hover:text-steel-soft",
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex h-8 w-8 items-center justify-center border border-line-2 text-steel transition-all",
                        isOpen && "rotate-45 border-steel bg-steel/10",
                      )}
                    >
                      <span className="text-base leading-none">+</span>
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
                      <div className="grid grid-cols-[auto_1fr_auto] gap-6 pb-8">
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                          —— R
                        </span>
                        <p className="max-w-[64ch] font-editorial text-[17px] italic leading-[1.45] text-ink md:text-[19px]">
                          {item.answer}
                        </p>
                        <span />
                      </div>
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
