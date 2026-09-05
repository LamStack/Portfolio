"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { socials } from "@/data/content";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#flagship", label: "Flagship" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#arcade", label: "Arcade" },
  { href: "#contact", label: "Contact" },
];

export function FloatingNav() {
  const barRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (scrolled / max) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-[100] h-[3px] bg-white/5">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-cyan via-violet to-pink"
          style={{ width: "0%" }}
        />
      </div>

      <div className="fixed top-5 inset-x-0 z-[90] px-5 sm:px-8 flex items-center justify-between pointer-events-none">
        <a href="#top" className="pointer-events-auto font-display font-bold text-lg tracking-tight">
          Lamees<span className="text-gradient">.dev</span>
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto glass h-10 w-10 rounded-full flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="fixed top-20 right-5 sm:right-8 z-[95] glass rounded-2xl p-3 w-56">
          <ul className="space-y-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm text-text-dim hover:text-text hover:bg-white/5 transition"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={socials.cv}
                download
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-cyan hover:bg-white/5 transition"
              >
                <Download size={14} /> Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
