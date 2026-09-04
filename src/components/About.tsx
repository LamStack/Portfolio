"use client";

import { Reveal, SectionHeading } from "./Reveal";
import { education, skills } from "@/data/content";
import { GraduationCap } from "lucide-react";

const STATS = [
  { label: "Live products shipped", value: "7+" },
  { label: "Hackathons & challenges", value: "5+" },
  { label: "Certifications earned", value: "6" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="About me"
          title="Engineer by training, builder by habit."
          subtitle="I like taking ideas that sound like they need a big team and shipping a working version of them alone, over a weekend, in a way people actually want to use."
        />

        <div className="grid md:grid-cols-3 gap-8">
          <Reveal className="md:col-span-2 glass rounded-3xl p-8">
            <p className="text-text-dim leading-relaxed">
              I&apos;m a Computer Engineering student at the University of Bahrain
              (2022–2026) with a natural pull toward AI, embedded systems, and
              interfaces that don&apos;t feel like software. I&apos;ve led teams
              through hackathons and startup competitions, built a gamified hiring
              platform that replaces the CV, an AI travel companion for GSMA&apos;s
              MENA Ignite Hackathon, and a blink-to-speech device that won first
              place at my university&apos;s senior projects exhibition.
            </p>
            <p className="text-text-dim leading-relaxed mt-4">
              I&apos;m a Microsoft Certified Azure AI Engineer Associate, comfortable
              across the AI stack — content moderation, computer vision, NLP,
              document intelligence, and generative AI — and I care as much about
              how a product feels to use as whether it technically works.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-text-dim">
              <GraduationCap size={18} className="text-cyan" />
              <span>
                {education.degree} · {education.school} · {education.period}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-gradient">
                    {s.value}
                  </div>
                  <div className="text-xs text-text-dim mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="glass rounded-3xl p-8">
            <h3 className="font-display font-semibold mb-4">Skills</h3>
            <div className="space-y-5">
              {Object.entries(skills).map(([group, list]) => (
                <div key={group}>
                  <p className="text-xs uppercase tracking-wider text-text-dim mb-2">
                    {group}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {list.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-text"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
