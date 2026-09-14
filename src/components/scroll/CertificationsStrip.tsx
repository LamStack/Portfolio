import { BadgeCheck } from "lucide-react";
import { certifications } from "@/data/content";

export function CertificationsStrip() {
  const loop = [...certifications, ...certifications];

  return (
    <section id="certifications" className="relative py-24 sm:py-28 border-y border-border overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 mb-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-lime uppercase">
          <span className="h-px w-6 bg-lime" /> Certifications
        </span>
        <h2 className="font-display mt-4 text-3xl sm:text-4xl font-bold">Credentials, on repeat.</h2>
      </div>

      <div className="flex animate-marquee w-max">
        {loop.map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            className="flex items-center gap-3 shrink-0 mx-3 rounded-2xl border border-border bg-white/[0.03] px-6 py-5 w-80"
          >
            <BadgeCheck className="text-lime shrink-0" size={22} />
            <div>
              <p className="font-display font-semibold text-sm leading-snug">{c.name}</p>
              <p className="text-xs text-text-dim mt-1">
                {c.issuer}
                {c.date ? ` · ${c.date}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
