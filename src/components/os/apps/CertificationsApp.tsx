import { BadgeCheck } from "lucide-react";
import { certifications } from "@/data/content";

export function CertificationsApp() {
  return (
    <div className="p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 gap-4">
        {certifications.map((c) => (
          <div key={c.name} className="rounded-xl border border-border bg-white/[0.03] p-5">
            <BadgeCheck className="text-cyan mb-2.5" size={20} />
            <h3 className="font-display font-semibold text-sm leading-snug">{c.name}</h3>
            <p className="text-xs text-text-dim mt-2">
              {c.issuer}
              {c.date ? ` · ${c.date}` : ""}
            </p>
            {c.credentialId && (
              <p className="text-[10px] text-text-dim/70 mt-2 font-mono">ID: {c.credentialId}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
