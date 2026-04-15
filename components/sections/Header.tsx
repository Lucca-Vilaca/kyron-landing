"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { content } from "@/lib/content";
import { cn } from "@/lib/cn";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
        "sticky top-4 z-50 mx-auto mt-4 flex w-[min(calc(100%-32px),1240px)] items-center justify-between rounded-full border border-line px-5 py-3 backdrop-blur-xl transition-colors",
        scrolled ? "bg-black/70" : "bg-black/40"
      )}
    >
      <a href="#top" className="flex items-center gap-2" aria-label="Kyron">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/assets/kyron-logo.webp`}
          alt=""
          className="h-7 w-7 object-contain"
        />
        <span className="font-display text-[15px] font-semibold tracking-wide">KYRON</span>
      </a>

      <nav className="hidden md:flex items-center gap-7" aria-label="Navegação principal">
        {content.nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-[13px] text-ink-muted transition-colors hover:text-ink"
          >
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
            "block h-[2px] w-5 bg-ink transition-transform",
            open && "translate-y-[7px] rotate-45"
          )}
        />
        <span className={cn("block h-[2px] w-5 bg-ink transition-opacity", open && "opacity-0")} />
        <span
          className={cn(
            "block h-[2px] w-5 bg-ink transition-transform",
            open && "-translate-y-[7px] -rotate-45"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg/95 backdrop-blur-xl md:hidden"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {content.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-ink"
              >
                {item.label}
              </a>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
