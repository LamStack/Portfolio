"use client";

import { Reveal } from "./Reveal";
import { socials } from "@/data/content";
import { Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan uppercase">
            <span className="h-px w-6 bg-cyan" /> Get in touch
          </span>
          <h2 className="font-display mt-4 text-3xl sm:text-5xl font-bold leading-tight">
            Let&apos;s build something{" "}
            <span className="text-gradient">worth playing with.</span>
          </h2>
          <p className="mt-5 text-text-dim max-w-xl mx-auto">
            Open to internships, collaborations, and interesting problems.
            Reach out — I usually reply fast.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${socials.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-6 py-3 text-sm font-semibold text-bg hover:brightness-110 transition"
            >
              <Mail size={16} /> {socials.email}
            </a>
            <a
              href={socials.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm hover:border-cyan/60 transition"
            >
              <Download size={16} /> Download CV
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 text-text-dim">
            <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-cyan transition flex items-center gap-2 text-sm">
              <FaGithub size={18} /> LamStack
            </a>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan transition flex items-center gap-2 text-sm">
              <FaLinkedin size={18} /> Lamees Adel
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
