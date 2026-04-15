"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
};

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const prefersReduced = useReducedMotion();
  const Tag = m[as];

  if (prefersReduced) {
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  return (
    <Tag
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
