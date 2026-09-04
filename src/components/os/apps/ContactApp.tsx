"use client";

import { useState } from "react";
import { Check, Copy, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { socials } from "@/data/content";

export function ContactApp() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable, ignore
    }
  }

  return (
    <div className="p-6 sm:p-8 max-w-md">
      <h2 className="font-display text-xl font-bold">Let&apos;s build something worth playing with.</h2>
      <p className="text-sm text-text-dim mt-3 leading-relaxed">
        Open to internships, collaborations, and interesting problems. Reach out,
        I usually reply fast.
      </p>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-border bg-white/[0.03] px-4 py-3">
          <span className="inline-flex items-center gap-2 text-sm">
            <Mail size={15} className="text-cyan" /> {socials.email}
          </span>
          <button
            onClick={copyEmail}
            className="text-xs text-text-dim hover:text-cyan transition inline-flex items-center gap-1"
          >
            {copied ? <Check size={13} className="text-cyan" /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <a
          href={socials.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-xl border border-border bg-white/[0.03] px-4 py-3 hover:border-cyan/40 transition"
        >
          <span className="inline-flex items-center gap-2 text-sm">
            <FaGithub size={15} className="text-cyan" /> github.com/LamStack
          </span>
        </a>

        <a
          href={socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-xl border border-border bg-white/[0.03] px-4 py-3 hover:border-cyan/40 transition"
        >
          <span className="inline-flex items-center gap-2 text-sm">
            <FaLinkedin size={15} className="text-cyan" /> linkedin.com/in/lamees-adel
          </span>
        </a>

        <a
          href={socials.cv}
          download
          className="flex items-center justify-between rounded-xl border border-border bg-white/[0.03] px-4 py-3 hover:border-cyan/40 transition"
        >
          <span className="inline-flex items-center gap-2 text-sm">
            <Download size={15} className="text-cyan" /> Download resume
          </span>
        </a>
      </div>
    </div>
  );
}
