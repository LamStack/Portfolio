import { Download } from "lucide-react";
import { socials } from "@/data/content";

export function ResumeApp() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border shrink-0">
        <p className="text-sm text-text-dim">Lamees-Adel-CV.pdf</p>
        <a
          href={socials.cv}
          download
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-4 py-1.5 text-xs font-semibold text-bg hover:brightness-110 transition"
        >
          <Download size={13} /> Download
        </a>
      </div>
      <iframe src={socials.cv} title="Resume" className="flex-1 w-full bg-white" />
    </div>
  );
}
