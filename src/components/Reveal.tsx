"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const TAGS = {
  div: motion.div,
  li: motion.li,
} as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof typeof TAGS;
}) {
  const Comp = TAGS[as];
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan uppercase">
        <span className="h-px w-6 bg-cyan" />
        {kicker}
      </span>
      <h2 className="font-display mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-dim text-base sm:text-lg">{subtitle}</p>
      )}
    </Reveal>
  );
}
