import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { education, skills } from "@/data/content";

const STATS = [
  { label: "Live products shipped", value: "7+" },
  { label: "Hackathons & challenges", value: "5+" },
  { label: "Certifications earned", value: "6" },
];

export function AboutApp() {
  return (
    <div className="p-6 sm:p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative h-16 w-16 rounded-2xl overflow-hidden border border-border shrink-0">
          <Image src="/images/profile.jpg" alt="Lamees Adel" fill className="object-cover" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Lamees Adel</h2>
          <p className="text-sm text-cyan">Computer Engineering Student & AI Builder</p>
        </div>
      </div>

      <p className="text-text-dim leading-relaxed">
        Computer Engineering student at the University of Bahrain with a strong
        interest in AI, intelligent systems, and front-end development, passionate
        about building practical, user-centered solutions. I&apos;ve developed
        projects including an AI-powered communication system and a
        purchase-assistant chatbot, and I&apos;m known for reliability,
        consistency, and taking initiative in both individual and team
        environments.
      </p>
      <p className="text-text-dim leading-relaxed mt-4">
        I&apos;m a Microsoft Certified Azure AI Engineer Associate, comfortable
        across the AI stack: content moderation, computer vision, NLP, document
        intelligence, and generative AI.
      </p>

      <div className="mt-6 flex items-center gap-3 text-sm text-text-dim">
        <GraduationCap size={18} className="text-cyan" />
        <span>
          {education.degree}, {education.school}, {education.period}
        </span>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="font-display text-2xl font-bold text-gradient">{s.value}</div>
            <div className="text-xs text-text-dim mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-5">
        {Object.entries(skills).map(([group, list]) => (
          <div key={group}>
            <p className="text-xs uppercase tracking-wider text-text-dim mb-2">{group}</p>
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
    </div>
  );
}
