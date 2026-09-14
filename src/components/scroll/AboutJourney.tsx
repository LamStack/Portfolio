"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GraduationCap } from "lucide-react";
import { education, experience, skills, volunteering } from "@/data/content";

// Ordered chronologically by hand: period strings aren't sortable as text
// ("Feb 2025" and "Aug 2 to Sep 2, 2026" would sort after every "20xx" entry).
const timeline = [
  volunteering[1], // Ambassador, ThinkSmart, Feb 2025
  volunteering[3], // Exhibitor Volunteer, BITEX, 2025
  experience[0], // Project Coordinator, GITEX, 2025
  volunteering[2], // Student Volunteer, UoB, 2025/2026
  experience[1], // Automation Intern, DOO, Aug 2026
  volunteering[0], // Volunteer Guide & Organizer, UoB, 2026 to 2027
];

export function AboutJourney() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((el) => {
        gsap.from(el, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">
          <div className="about-reveal">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-pink uppercase">
              <span className="h-px w-6 bg-pink" /> About
            </span>
            <h2 className="font-display mt-4 text-3xl sm:text-4xl font-bold leading-tight">
              Engineer by training, builder by habit.
            </h2>
            <p className="mt-6 text-text-dim leading-relaxed">
              Computer Engineering student at the University of Bahrain with a
              strong interest in AI, intelligent systems, and front-end
              development. I&apos;ve led teams through hackathons and startup
              competitions, and I&apos;m known for reliability, consistency,
              and taking initiative in both individual and team environments.
            </p>
            <p className="mt-4 text-text-dim leading-relaxed">
              Microsoft Certified Azure AI Engineer Associate, comfortable
              across the AI stack: content moderation, computer vision, NLP,
              document intelligence, and generative AI.
            </p>

            <div className="mt-6 flex items-center gap-3 text-sm text-text-dim">
              <GraduationCap size={18} className="text-cyan" />
              <span>
                {education.degree}, {education.school}, {education.period}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {Object.values(skills)
                .flat()
                .slice(0, 12)
                .map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-text-dim"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.role + item.org} className="timeline-item relative pl-8">
                  <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-cyan to-violet" />
                  <p className="text-xs text-text-dim">{item.period}</p>
                  <h3 className="font-display font-semibold mt-1">{item.role}</h3>
                  <p className="text-sm text-cyan mt-0.5">{item.org}</p>
                  <p className="text-sm text-text-dim mt-2 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
