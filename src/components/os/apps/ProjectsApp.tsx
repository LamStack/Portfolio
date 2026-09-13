import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "@/data/projects";

export function ProjectsApp() {
  return (
    <div className="p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl border border-border bg-white/[0.03] p-5 flex flex-col hover:border-cyan/40 transition-colors"
          >
            {p.highlight && (
              <span className="self-start mb-2.5 rounded-full bg-amber/10 border border-amber/30 text-amber text-[10px] font-medium px-2.5 py-0.5">
                {p.highlight}
              </span>
            )}
            <h3 className="font-display font-bold">{p.name}</h3>
            <p className="text-xs text-cyan mt-1">{p.tagline}</p>
            <p className="text-xs text-text-dim mt-3 leading-relaxed flex-1">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/5 border border-border px-2 py-0.5 text-[10px] text-text-dim"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs">
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-text-dim hover:text-cyan transition"
              >
                <FaGithub size={13} /> Code
              </a>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-text-dim hover:text-cyan transition"
                >
                  <ExternalLink size={13} /> Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
