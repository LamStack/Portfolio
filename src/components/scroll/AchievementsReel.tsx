"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { achievements } from "@/data/content";

const ACCENTS = ["cyan", "violet", "pink", "amber"] as const;

export function AchievementsReel() {
  const root = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? achievements[openIndex] : null;

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".achievement-card").forEach((card) => {
        const wash = card.querySelector(".achievement-wash");
        const photo = card.querySelector(".achievement-photo");
        gsap.fromTo(
          wash,
          { scaleX: 1 },
          {
            scaleX: 0,
            transformOrigin: "right",
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
        gsap.fromTo(
          photo,
          { scale: 1.25 },
          {
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: root }
  );

  return (
    <section id="achievements" ref={root} className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-amber uppercase">
          <span className="h-px w-6 bg-amber" /> Achievements
        </span>
        <h2 className="font-display mt-4 text-3xl sm:text-4xl font-bold leading-tight max-w-xl">
          Moments worth a trophy shelf.
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {achievements.map((a, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <button
                key={a.title}
                onClick={() => setOpenIndex(i)}
                className="achievement-card group relative aspect-[4/3] rounded-3xl overflow-hidden border border-border text-left"
              >
                <div className="achievement-photo absolute inset-0">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className="achievement-wash absolute inset-0"
                  style={{ background: `var(--${accent})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <p className="text-[11px] uppercase tracking-wide" style={{ color: `var(--${accent})` }}>
                    {a.org}
                  </p>
                  <p className="font-display font-semibold text-base mt-1 leading-snug">
                    {a.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm p-6"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.22 }}
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
                <p className="text-sm text-text-dim mt-3 leading-relaxed">{active.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
