"use client";

import { Reveal, SectionHeading } from "./Reveal";
import { certifications } from "@/data/content";
import { BadgeCheck } from "lucide-react";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker="Certifications"
          title="Credentials I've earned along the way."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <div className="glass rounded-2xl p-6 h-full flex flex-col">
                <BadgeCheck className="text-cyan mb-3" size={22} />
                <h3 className="font-display font-semibold text-sm leading-snug">
                  {c.name}
                </h3>
                <p className="text-xs text-text-dim mt-2">
                  {c.issuer}
                  {c.date ? ` · ${c.date}` : ""}
                </p>
                {c.credentialId && (
                  <p className="text-[11px] text-text-dim/70 mt-2 font-mono">
                    ID: {c.credentialId}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
