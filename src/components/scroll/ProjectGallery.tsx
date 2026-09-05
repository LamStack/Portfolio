"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "@/data/projects";

const gallery = projects.filter((p) => p.name !== "Auctor");
const ACCENTS = ["cyan", "violet", "pink", "amber", "lime", "orange"] as const;

export function ProjectGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const scrollDistance = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="projects" ref={sectionRef} className="relative h-screen overflow-hidden bg-bg-soft">
      <div className="absolute inset-0 grid-fade opacity-40" />
      <div className="relative h-full flex flex-col justify-center">
        <div className="px-5 sm:px-8 mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-violet uppercase">
            <span className="h-px w-6 bg-violet" /> More builds
          </span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold">
            Keep scrolling, there&apos;s more.
          </h2>
        </div>

        <div ref={trackRef} className="flex gap-6 px-5 sm:px-8 will-change-transform">
          {gallery.map((p, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <div
                key={p.name}
                className="shrink-0 w-[85vw] sm:w-[440px] rounded-3xl border border-border bg-white/[0.03] p-8 flex flex-col"
                style={{ boxShadow: `0 0 0 1px transparent` }}
              >
                {p.highlight && (
                  <span
                    className={`self-start mb-3 rounded-full border px-3 py-1 text-[11px] font-medium`}
                    style={{
                      color: `var(--${accent})`,
                      borderColor: `color-mix(in srgb, var(--${accent}) 40%, transparent)`,
                      background: `color-mix(in srgb, var(--${accent}) 12%, transparent)`,
                    }}
                  >
                    {p.highlight}
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                <p className="mt-1 text-sm" style={{ color: `var(--${accent})` }}>
                  {p.tagline}
                </p>
                <p className="mt-4 text-sm text-text-dim leading-relaxed flex-1">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/5 border border-border px-2.5 py-1 text-[11px] text-text-dim"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-4 text-sm">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-text-dim hover:text-text transition"
                  >
                    <FaGithub size={15} /> Code
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-text-dim hover:text-text transition"
                    >
                      <ExternalLink size={15} /> Live
                    </a>
                  )}
                </div>
              </div>
            );
          })}
          <div className="shrink-0 w-[40vw]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
