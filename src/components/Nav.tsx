"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { socials } from "@/data/content";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#arcade", label: "Arcade" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 backdrop-blur-xl ${
        scrolled
          ? "bg-bg/90 border-border shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-bold text-lg tracking-tight">
          Lamees<span className="text-gradient">.dev</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-text-dim">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-text transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={socials.cv}
            download
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text-dim hover:text-text hover:border-cyan/60 transition-colors"
          >
            <Download size={15} /> Resume
          </a>
        </div>

        <button
          className="md:hidden p-2 text-text"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden glass border-t border-border"
        >
          <ul className="flex flex-col px-5 py-4 gap-4 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={socials.cv} download className="text-cyan">
                Download Resume
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
