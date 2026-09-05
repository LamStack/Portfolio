"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "@/data/projects";

const auctor = projects.find((p) => p.name === "Auctor")!;

const STATS = [
  { label: "Role", value: "Founder & Builder" },
  { label: "Result", value: "Semi-Finalist, Startup Bahrain" },
  { label: "Stack", value: "Next.js, Claude API, Postgres" },
];

export function FlagshipProject() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=2200",
          scrub: 1,
          pin: pinRef.current,
        },
      });

      tl.fromTo(
        ".flagship-wash",
        { opacity: 0 },
        { opacity: 1, duration: 1.2 }
      )
        .fromTo(
          ".flagship-card",
          { scale: 0.55, opacity: 0, rotate: -4 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.4, ease: "power3.out" },
          "-=0.9"
        )
        .fromTo(
          ".flagship-eyebrow",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.6"
        )
        .fromTo(
          ".flagship-title",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.5"
        )
        .fromTo(
          ".flagship-copy",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".flagship-stat",
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
          "-=0.5"
        )
        .fromTo(
          ".flagship-tag",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          "-=0.4"
        )
        .fromTo(
          ".flagship-cta",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: wrapperRef }
  );

  return (
    <section id="flagship" ref={wrapperRef} className="relative">
      <div ref={pinRef} className="relative h-screen overflow-hidden flex items-center">
        <div className="flagship-wash absolute inset-0 bg-gradient-to-br from-[#0b1030] via-[#0e1440] to-[#04070f]" />
        <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-cyan/25 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet/25 blur-[110px]" />
        <div className="absolute inset-0 grid-fade opacity-60" />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center w-full">
          <div className="flagship-card relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-cyan via-violet to-pink opacity-60 blur-2xl" />
            <div className="relative rounded-[2.5rem] bg-white p-10 shadow-2xl">
              <div className="relative aspect-square">
                <Image src="/images/auctor-logo.png" alt="Auctor logo" fill className="object-contain" />
              </div>
            </div>
          </div>

          <div>
            <span className="flagship-eyebrow inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-cyan uppercase">
              Flagship project
            </span>
            <h2 className="flagship-title font-display mt-4 text-4xl sm:text-5xl font-bold leading-[1.02]">
              {auctor.name}: {auctor.tagline}
            </h2>
            <p className="flagship-copy mt-5 max-w-lg text-text-dim text-base sm:text-lg leading-relaxed">
              {auctor.description}
            </p>

            <div className="mt-8 space-y-3">
              {STATS.map((s) => (
                <div key={s.label} className="flagship-stat flex items-center gap-3 text-sm">
                  <span className="w-28 shrink-0 text-text-dim/70 uppercase tracking-wide text-[11px]">
                    {s.label}
                  </span>
                  <span className="font-medium">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {auctor.tags.map((t) => (
                <span
                  key={t}
                  className="flagship-tag rounded-full bg-white/5 border border-border px-3 py-1 text-xs text-text-dim"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={auctor.live}
                target="_blank"
                rel="noreferrer"
                className="flagship-cta inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-6 py-3 text-sm font-semibold text-bg hover:brightness-110 transition"
              >
                <ExternalLink size={15} /> View live
              </a>
              <a
                href={auctor.repo}
                target="_blank"
                rel="noreferrer"
                className="flagship-cta inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-cyan/60 transition"
              >
                <FaGithub size={15} /> View code
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
