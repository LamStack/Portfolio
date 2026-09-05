"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { socials } from "@/data/content";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-word", {
        yPercent: 120,
        rotate: 6,
        opacity: 0,
        duration: 1.1,
        stagger: 0.07,
      })
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.4")
        .from(".hero-photo", { scale: 0.8, opacity: 0, rotate: -6, duration: 1 }, "-=1")
        .from(".hero-badge", { scale: 0, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.5");

      gsap.to(".hero-blob-1", { y: 60, x: 30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-blob-2", { y: -50, x: -40, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      <div className="hero-blob-1 pointer-events-none absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-violet/35 blur-[110px]" />
      <div className="hero-blob-2 pointer-events-none absolute bottom-0 -right-24 h-[26rem] w-[26rem] rounded-full bg-orange/30 blur-[110px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-cyan/15 blur-[120px]" />
      <div className="absolute inset-0 grid-fade" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-center w-full">
        <div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight overflow-hidden">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">Lamees</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-gradient">Adel</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">builds AI</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">people play with.</span>
            </span>
          </h1>

          <p className="hero-sub mt-8 max-w-lg text-text-dim text-base sm:text-lg">
            Computer Engineering student, Microsoft Certified Azure AI Engineer
            Associate, and builder of gamified AI products, from a hiring
            platform that replaces the CV to a blink-to-speech device for
            people with severe disabilities.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#flagship"
              className="hero-cta rounded-full bg-gradient-to-r from-cyan via-violet to-pink px-7 py-3.5 text-sm font-semibold text-bg hover:brightness-110 transition"
            >
              See the work
            </a>
            <a
              href="#arcade"
              className="hero-cta rounded-full border border-border px-7 py-3.5 text-sm font-semibold hover:border-cyan/60 transition"
            >
              Play a game
            </a>
            <div className="hero-cta flex items-center gap-4 pl-2 text-text-dim">
              <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-cyan transition" aria-label="GitHub">
                <FaGithub size={19} />
              </a>
              <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan transition" aria-label="LinkedIn">
                <FaLinkedin size={19} />
              </a>
            </div>
          </div>
        </div>

        <div className="relative mx-auto">
          <div className="hero-photo relative h-64 w-64 sm:h-80 sm:w-80">
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-cyan via-violet to-orange opacity-80 blur-2xl" />
            <div className="relative h-full w-full rounded-[3rem] overflow-hidden border-2 border-white/10 rotate-2">
              <Image src="/images/profile.jpg" alt="Lamees Adel" fill priority sizes="320px" className="object-cover" />
            </div>
            <div className="hero-badge absolute -bottom-5 -left-8 rounded-2xl bg-lime text-bg px-4 py-2.5 text-xs font-bold shadow-xl -rotate-6">
              Semi-Finalist, Startup Bahrain
            </div>
            <div className="hero-badge absolute -top-4 -right-6 rounded-2xl bg-pink text-bg px-4 py-2.5 text-xs font-bold shadow-xl rotate-6">
              1st Place, Senior Projects
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim">
        <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
