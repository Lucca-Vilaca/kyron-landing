"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol";
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Stagger({ children, className, stagger = 0.08, as = "div" }: StaggerProps) {
  const prefersReduced = useReducedMotion();
  const Tag = m[as];

  if (prefersReduced) {
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: 0.1 },
        },
      }}
    >
      {children}
    </Tag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
};

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const prefersReduced = useReducedMotion();
  const Tag = m[as];

  if (prefersReduced) {
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  return (
    <Tag className={cn(className)} variants={staggerItemVariants}>
      {children}
    </Tag>
  );
}
