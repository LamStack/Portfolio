"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY }}
      className="card-tilt group relative glass rounded-3xl p-7 flex flex-col h-full"
    >
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-cyan/10 via-transparent to-pink/10 pointer-events-none" />

      {project.highlight && (
        <span className="self-start mb-3 rounded-full bg-amber/10 border border-amber/30 text-amber text-[11px] font-medium px-3 py-1">
          {project.highlight}
        </span>
      )}

      <h3 className="font-display text-xl font-bold">{project.name}</h3>
      <p className="text-sm text-cyan mt-1">{project.tagline}</p>
      <p className="text-sm text-text-dim mt-4 leading-relaxed flex-1">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
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
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-text-dim hover:text-cyan transition"
        >
          <FaGithub size={16} /> Code
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-text-dim hover:text-cyan transition"
          >
            <ExternalLink size={16} /> Live
          </a>
        )}
      </div>
    </motion.div>
  );
}
