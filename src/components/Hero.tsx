"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { socials } from "@/data/content";

const ROLE_WORDS = ["AI Products", "Playful Interfaces", "Assistive Tech", "Hiring Games"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
    >
      <div className="absolute inset-0 grid-fade" />
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-violet/30 blur-[100px] animate-blob" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-cyan/20 blur-[100px] animate-blob animation-delay-2000" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-pink/20 blur-[100px] animate-blob animation-delay-4000" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-cyan mb-6"
          >
            <Sparkles size={14} /> Open to opportunities in AI & software engineering
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold leading-[1.05]"
          >
            Hi, I&apos;m Lamees —
            <br />
            I build <span className="text-gradient">{ROLE_WORDS[0]}</span> that
            people actually enjoy using.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-text-dim text-base sm:text-lg"
          >
            Computer Engineering student at the University of Bahrain and Microsoft
            Certified Azure AI Engineer Associate. I design and ship gamified,
            AI-powered products — from a hiring platform that replaces the CV, to a
            blink-to-speech device for people with severe disabilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-cyan to-violet px-6 py-3 text-sm font-semibold text-bg hover:brightness-110 transition"
            >
              See my work
            </a>
            <a
              href="#arcade"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text hover:border-cyan/60 transition"
            >
              Play a mini game 🎮
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex items-center gap-5 text-text-dim"
          >
            <a href={socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-cyan transition">
              <FaGithub size={20} />
            </a>
            <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-cyan transition">
              <FaLinkedin size={20} />
            </a>
            <a href={`mailto:${socials.email}`} aria-label="Email" className="hover:text-cyan transition">
              <Mail size={20} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto"
        >
          <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-cyan via-violet to-pink opacity-70 blur-2xl" />
            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/10 glass">
              <Image
                src="/images/profile.jpg"
                alt="Lamees Adel"
                fill
                priority
                sizes="(min-width: 768px) 384px, 288px"
                className="object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-5 -left-6 glass rounded-2xl px-4 py-3 text-xs animate-float"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              🏆 Semi-Finalist, Startup Bahrain
            </motion.div>
            <motion.div
              className="absolute -top-5 -right-4 glass rounded-2xl px-4 py-3 text-xs animate-float"
              style={{ animationDelay: "1.2s" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              🥇 1st Place, Senior Projects
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-dim hover:text-cyan"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
