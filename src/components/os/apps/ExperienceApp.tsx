import { Briefcase, HandHeart } from "lucide-react";
import { experience, volunteering } from "@/data/content";

function Timeline({
  items,
}: {
  items: { role: string; org: string; period: string; description: string }[];
}) {
  return (
    <ol className="relative border-l border-border pl-6 space-y-8">
      {items.map((item) => (
        <li key={item.role + item.org} className="relative">
          <span className="absolute -left-[25px] mt-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-cyan to-violet" />
          <p className="text-xs text-text-dim">{item.period}</p>
          <h3 className="font-display font-semibold text-base mt-1">{item.role}</h3>
          <p className="text-sm text-cyan mt-0.5">{item.org}</p>
          <p className="text-sm text-text-dim mt-2 leading-relaxed">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function ExperienceApp() {
  return (
    <div className="p-6 sm:p-8 max-w-2xl space-y-10">
      <div>
        <div className="flex items-center gap-2 mb-6 text-text">
          <Briefcase size={16} className="text-cyan" />
          <h3 className="font-display font-semibold">Work</h3>
        </div>
        <Timeline items={experience} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-6 text-text">
          <HandHeart size={16} className="text-pink" />
          <h3 className="font-display font-semibold">Volunteering</h3>
        </div>
        <Timeline items={volunteering} />
      </div>
    </div>
  );
}
