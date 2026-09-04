"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { achievements } from "@/data/content";

export function Achievements() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? achievements[openIndex] : null;

  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="Achievements"
          title="Moments worth a trophy shelf."
          subtitle="Click a photo for the story behind it."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <button
                onClick={() => setOpenIndex(i)}
                className="group relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-border text-left"
              >
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <p className="text-[11px] text-cyan uppercase tracking-wide">{a.org}</p>
                  <p className="font-display font-semibold text-sm mt-1 leading-snug">
                    {a.title}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-5"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-w-lg w-full rounded-3xl overflow-hidden"
            >
              <div className="relative aspect-[4/3]">
                <Image src={active.image} alt={active.title} fill className="object-cover" />
                <button
                  onClick={() => setOpenIndex(null)}
                  className="absolute top-3 right-3 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-xs text-cyan uppercase tracking-wide">
                  {active.org} · {active.date}
                </p>
                <h3 className="font-display text-xl font-bold mt-2">{active.title}</h3>
                <p className="text-sm text-text-dim mt-3 leading-relaxed">
                  {active.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
