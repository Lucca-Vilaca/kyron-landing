"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { content } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Monogram, Wordmark } from "@/components/ui/Monogram";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-3 sm:px-5 sm:py-4 md:px-8 md:py-5",
        "border-b border-transparent transition-all duration-300",
        scrolled
          ? "border-line bg-obsidian/80 backdrop-blur-xl"
          : "bg-transparent backdrop-blur-0",
      )}
    >
      {/* Left — monogram + wordmark */}
      <a href="#top" className="flex items-center gap-3" aria-label="Kyron — ir ao topo">
        <span className="flex h-8 w-8 items-center justify-center border border-line-2 p-1">
          <Monogram size={22} />
        </span>
        <Wordmark size={18} />
      </a>

      {/* Right — nav */}
      <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
        {content.nav.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className="group relative font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim transition-colors hover:text-ink"
          >
            <span className="mr-2 text-steel/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            {item.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="md:hidden flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={cn(
            "block h-[1.5px] w-5 bg-ink transition-transform",
            open && "translate-y-[7px] rotate-45",
          )}
        />
        <span className={cn("block h-[1.5px] w-5 bg-ink transition-opacity", open && "opacity-0")} />
        <span
          className={cn(
            "block h-[1.5px] w-5 bg-ink transition-transform",
            open && "-translate-y-[7px] -rotate-45",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-10 bg-obsidian/98 px-8 backdrop-blur-xl md:hidden"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted">
              Navegação
            </span>
            {content.nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-steel">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[40px] uppercase tracking-[-0.03em] text-ink group-hover:text-steel transition-colors">
                  {item.label}
                </span>
              </a>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
