"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useWindowManager } from "./WindowManager";
import { WindowLayer } from "./Window";
import { TASKBAR_HEIGHT } from "./Window";
import { APPS } from "./apps/registry";
import { socials } from "@/data/content";

const THEMES = [
  { from: "violet", via: "cyan", to: "pink" },
  { from: "cyan", via: "amber", to: "pink" },
  { from: "pink", via: "violet", to: "cyan" },
] as const;

export function Desktop() {
  const { openApp, isMobile, edgeHint } = useWindowManager();
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const blob1 = useRef<HTMLDivElement>(null);
  const blob2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;
    function onMove(e: PointerEvent) {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 65%)`;
      }
      const px = (x / rect.width - 0.5) * 2;
      const py = (y / rect.height - 0.5) * 2;
      if (blob1.current) blob1.current.style.transform = `translate(${px * -22}px, ${py * -22}px)`;
      if (blob2.current) blob2.current.style.transform = `translate(${px * 18}px, ${py * 18}px)`;
    }
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [isMobile]);

  function onContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  }

  function openFromRect(appId: (typeof APPS)[number]["id"], el: HTMLElement) {
    const r = el.getBoundingClientRect();
    openApp(appId, { x: r.x, y: r.y, width: r.width, height: r.height });
  }

  const theme = THEMES[themeIndex];

  return (
    <div
      ref={rootRef}
      className="relative h-full w-full overflow-hidden"
      onContextMenu={onContextMenu}
      onClick={() => setMenu(null)}
    >
      <div className="absolute inset-0 grid-fade" />
      <div
        ref={blob1}
        style={{ background: `var(--${theme.from})`, opacity: 0.25, transition: "transform 0.3s ease-out, background 0.5s ease-out" }}
        className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full blur-[100px] animate-blob"
      />
      <div
        ref={blob2}
        style={{ background: `var(--${theme.via})`, opacity: 0.15, transition: "transform 0.3s ease-out, background 0.5s ease-out" }}
        className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full blur-[100px] animate-blob animation-delay-2000"
      />
      <div
        style={{ background: `var(--${theme.to})`, opacity: 0.15, transition: "background 0.5s ease-out" }}
        className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full blur-[100px] animate-blob animation-delay-4000"
      />
      {!isMobile && <div ref={spotlightRef} className="pointer-events-none absolute inset-0" />}

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
        className="relative grid grid-cols-[repeat(auto-fill,88px)] gap-1 p-5 content-start"
      >
        {APPS.map((app) => {
          const Icon = app.icon;
          return (
            <motion.button
              key={app.id}
              variants={{
                hidden: { opacity: 0, y: 14, scale: 0.85 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={(e) => openFromRect(app.id, e.currentTarget)}
              className="flex flex-col items-center gap-2 rounded-lg p-2 text-center hover:bg-white/10 focus:bg-white/10 outline-none transition-colors"
            >
              <span className="h-11 w-11 rounded-2xl bg-white/5 border border-border flex items-center justify-center text-cyan shadow-lg">
                <Icon size={20} />
              </span>
              <span className="text-[11px] text-text drop-shadow leading-tight">{app.title}</span>
            </motion.button>
          );
        })}
      </motion.div>

      <WindowLayer />

      {!isMobile && edgeHint && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed z-[80] bg-cyan/20 border border-cyan/50"
          style={
            edgeHint === "left"
              ? { left: 8, top: 8, width: "calc(50vw - 16px)", height: `calc(100vh - ${TASKBAR_HEIGHT + 16}px)` }
              : edgeHint === "right"
              ? { left: "calc(50vw + 8px)", top: 8, width: "calc(50vw - 16px)", height: `calc(100vh - ${TASKBAR_HEIGHT + 16}px)` }
              : { left: 8, top: 8, width: "calc(100vw - 16px)", height: `calc(100vh - ${TASKBAR_HEIGHT + 16}px)` }
          }
        />
      )}

      {menu && (
        <div
          style={{ left: menu.x, top: menu.y }}
          className="fixed z-[300] glass rounded-xl p-1.5 text-sm w-52"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              openApp("terminal");
              setMenu(null);
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Open Terminal
          </button>
          <button
            onClick={() => {
              setThemeIndex((i) => (i + 1) % THEMES.length);
              setMenu(null);
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Shuffle wallpaper colors
          </button>
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="block px-3 py-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => setMenu(null)}
          >
            View source on GitHub
          </a>
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Refresh desktop
          </button>
        </div>
      )}
    </div>
  );
}
