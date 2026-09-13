"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { useWindowManager } from "./WindowManager";
import { APPS } from "./apps/registry";
import { StartMenu } from "./StartMenu";

function useDockMagnify(isMobile: boolean) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;
    const row = rowRef.current;
    if (!row) return;

    function onMove(e: PointerEvent) {
      const items = row!.querySelectorAll<HTMLElement>("[data-dock-item]");
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const dist = Math.abs(e.clientX - center);
        const scale = dist < 140 ? 1 + (1 - dist / 140) * 0.28 : 1;
        item.style.transform = `scale(${scale}) translateY(${scale > 1 ? -(scale - 1) * 18 : 0}px)`;
      });
    }
    function onLeave() {
      row!.querySelectorAll<HTMLElement>("[data-dock-item]").forEach((item) => {
        item.style.transform = "scale(1) translateY(0px)";
      });
    }
    row.addEventListener("pointermove", onMove);
    row.addEventListener("pointerleave", onLeave);
    return () => {
      row.removeEventListener("pointermove", onMove);
      row.removeEventListener("pointerleave", onLeave);
    };
  }, [isMobile]);

  return rowRef;
}

export function Taskbar() {
  const { windows, focusWindow, minimizeWindow, activeId, isMobile } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const dockRef = useDockMagnify(isMobile);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- clock must read the real time client-side only, to avoid an SSR/client hydration mismatch
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <AnimatePresence>{startOpen && <StartMenu onClose={() => setStartOpen(false)} />}</AnimatePresence>

      <div
        ref={dockRef}
        className="fixed bottom-0 inset-x-0 z-[100] h-14 border-t border-border bg-bg-soft/90 backdrop-blur-xl flex items-center px-3 gap-2"
      >
        <motion.button
          data-dock-item
          style={{ transition: "transform 0.15s ease-out" }}
          onClick={() => setStartOpen((v) => !v)}
          className={`flex items-center gap-2 rounded-lg px-3 h-9 text-sm font-semibold transition-colors origin-bottom ${
            startOpen ? "bg-gradient-to-r from-cyan to-violet text-bg" : "text-text hover:bg-white/5"
          }`}
        >
          <LayoutGrid size={16} />
          <span className="hidden sm:inline">Start</span>
        </motion.button>

        <div className="h-6 w-px bg-border mx-1" />

        <div className="flex items-center gap-1.5 flex-1 overflow-x-auto">
          {windows.map((w) => {
            const app = APPS.find((a) => a.id === w.appId)!;
            const Icon = app.icon;
            const isActive = activeId === w.id && !w.minimized;
            return (
              <button
                key={w.id}
                data-dock-item
                style={{ transition: "transform 0.15s ease-out" }}
                onClick={() => (w.minimized ? focusWindow(w.id) : minimizeWindow(w.id))}
                className={`origin-bottom flex items-center gap-2 rounded-lg px-3 h-9 text-xs shrink-0 transition-colors ${
                  isActive
                    ? "bg-white/10 text-text border border-cyan/30"
                    : "text-text-dim hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon size={14} />
                <span className="hidden md:inline">{app.title}</span>
                {!isActive && !w.minimized && (
                  <span className="h-1 w-1 rounded-full bg-cyan" />
                )}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-text-dim tabular-nums pr-1 shrink-0">
          {now
            ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : " "}
        </div>
      </div>
    </>
  );
}
