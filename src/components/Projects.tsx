"use client";

import { SectionHeading } from "./Reveal";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";
import { socials } from "@/data/content";
import { FaGithub } from "react-icons/fa6";

export function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Projects"
            title="Things I've shipped."
            subtitle="A mix of hackathon builds, a startup, and a senior project — most of them live, all of them open source."
          />
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="mb-12 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:border-cyan/60 transition"
          >
            <FaGithub size={16} /> All repos on GitHub
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
