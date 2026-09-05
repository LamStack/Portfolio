"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { socials } from "@/data/content";

export function Contact() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.to(".contact-blob", {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: root }
  );

  return (
    <section id="contact" ref={root} className="relative py-32 sm:py-44 overflow-hidden">
      <div className="contact-blob pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[42rem] w-[42rem] rounded-full bg-[conic-gradient(from_0deg,var(--cyan),var(--violet),var(--pink),var(--orange),var(--cyan))] opacity-[0.12] blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <span className="contact-reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-cyan uppercase">
          <span className="h-px w-6 bg-cyan" /> Get in touch
        </span>
        <h2 className="contact-reveal font-display mt-5 text-4xl sm:text-6xl font-bold leading-tight">
          Let&apos;s build something{" "}
          <span className="text-gradient">worth playing with.</span>
        </h2>
        <p className="contact-reveal mt-6 text-text-dim max-w-xl mx-auto">
          Open to internships, collaborations, and interesting problems. Reach
          out, I usually reply fast.
        </p>

        <div className="contact-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${socials.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan via-violet to-pink px-7 py-3.5 text-sm font-semibold text-bg hover:brightness-110 transition"
          >
            <Mail size={16} /> {socials.email}
          </a>
          <a
            href={socials.cv}
            download
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm hover:border-cyan/60 transition"
          >
            <Download size={16} /> Download CV
          </a>
        </div>

        <div className="contact-reveal mt-10 flex items-center justify-center gap-6 text-text-dim">
          <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-cyan transition flex items-center gap-2 text-sm">
            <FaGithub size={18} /> LamStack
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan transition flex items-center gap-2 text-sm">
            <FaLinkedin size={18} /> Lamees Adel
          </a>
        </div>
      </div>

      <footer className="relative mt-24 pt-8 border-t border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-dim">
          <p>© {new Date().getFullYear()} Lamees Adel. Built with Next.js, GSAP, and a lot of coffee.</p>
        </div>
      </footer>
    </section>
  );
}
