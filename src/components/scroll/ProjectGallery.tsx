"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "@/data/projects";

const gallery = projects.filter((p) => p.name !== "Auctor");
const ACCENTS = ["cyan", "violet", "pink", "amber", "lime", "orange"] as const;

function ProjectCard({ p, accent }: { p: (typeof gallery)[number]; accent: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`;
  }
  function onLeave() {
    if (cardRef.current) cardRef.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateY(0)";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 0.25s ease-out" }}
      className="shrink-0 snap-start w-[85vw] sm:w-[440px] rounded-3xl border border-border bg-white/[0.03] p-8 flex flex-col"
    >
      {p.highlight && (
        <span
          className="self-start mb-3 rounded-full border px-3 py-1 text-[11px] font-medium"
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
      <p className="mt-4 text-sm text-text-dim leading-relaxed flex-1">{p.description}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span key={t} className="rounded-full bg-white/5 border border-border px-2.5 py-1 text-[11px] text-text-dim">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4 text-sm">
        <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-text-dim hover:text-text transition">
          <FaGithub size={15} /> Code
        </a>
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-text-dim hover:text-text transition">
            <ExternalLink size={15} /> Live
          </a>
        )}
      </div>
    </div>
  );
}

export function ProjectGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (isMobile) return;

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
    <section
      id="projects"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-bg-soft md:h-screen"
    >
      <div className="absolute inset-0 grid-fade opacity-40" />
      <div className="relative h-full flex flex-col justify-center">
        <div className="px-5 sm:px-8 mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-violet uppercase">
            <span className="h-px w-6 bg-violet" /> More builds
          </span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold">
            Keep scrolling, there&apos;s more.
          </h2>
          <p className="mt-2 text-xs text-text-dim md:hidden">Swipe to browse &rarr;</p>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 px-5 sm:px-8 will-change-transform overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0"
        >
          {gallery.map((p, i) => (
            <ProjectCard key={p.name} p={p} accent={ACCENTS[i % ACCENTS.length]} />
          ))}
          <div className="shrink-0 w-[8vw] md:w-[40vw]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
