"use client";

import { Reveal, SectionHeading } from "./Reveal";
import { experience, volunteering } from "@/data/content";
import { Briefcase, HandHeart } from "lucide-react";

function Timeline({
  items,
}: {
  items: { role: string; org: string; period: string; description: string }[];
}) {
  return (
    <ol className="relative border-l border-border pl-8 space-y-10">
      {items.map((item, i) => (
        <Reveal as="li" key={item.role + item.org} delay={i * 0.08}>
          <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-cyan to-violet" />
          <p className="text-xs text-text-dim">{item.period}</p>
          <h3 className="font-display font-semibold text-lg mt-1">{item.role}</h3>
          <p className="text-sm text-cyan mt-0.5">{item.org}</p>
          <p className="text-sm text-text-dim mt-2 leading-relaxed">
            {item.description}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="Experience"
          title="Where I've put in the work."
          subtitle="Coordinating a product on the GITEX floor, interning inside an automation-focused Builders League, and volunteering back into the university community."
        />

        <div className="grid md:grid-cols-2 gap-14">
          <div>
            <div className="flex items-center gap-2 mb-8 text-text">
              <Briefcase size={18} className="text-cyan" />
              <h3 className="font-display font-semibold">Work</h3>
            </div>
            <Timeline items={experience} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-8 text-text">
              <HandHeart size={18} className="text-pink" />
              <h3 className="font-display font-semibold">Volunteering</h3>
            </div>
            <Timeline items={volunteering} />
          </div>
        </div>
      </div>
    </section>
  );
}
