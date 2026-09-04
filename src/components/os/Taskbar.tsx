"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { useWindowManager } from "./WindowManager";
import { APPS } from "./apps/registry";
import { StartMenu } from "./StartMenu";

export function Taskbar() {
  const { windows, focusWindow, minimizeWindow, activeId } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- clock must read the real time client-side only, to avoid an SSR/client hydration mismatch
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <AnimatePresence>{startOpen && <StartMenu onClose={() => setStartOpen(false)} />}</AnimatePresence>

      <div className="fixed bottom-0 inset-x-0 z-[100] h-14 border-t border-border bg-bg-soft/90 backdrop-blur-xl flex items-center px-3 gap-2">
        <button
          onClick={() => setStartOpen((v) => !v)}
          className={`flex items-center gap-2 rounded-lg px-3 h-9 text-sm font-semibold transition ${
            startOpen ? "bg-gradient-to-r from-cyan to-violet text-bg" : "text-text hover:bg-white/5"
          }`}
        >
          <LayoutGrid size={16} />
          <span className="hidden sm:inline">Start</span>
        </button>

        <div className="h-6 w-px bg-border mx-1" />

        <div className="flex items-center gap-1.5 flex-1 overflow-x-auto">
          {windows.map((w) => {
            const app = APPS.find((a) => a.id === w.appId)!;
            const Icon = app.icon;
            const isActive = activeId === w.id && !w.minimized;
            return (
              <button
                key={w.id}
                onClick={() => (w.minimized ? focusWindow(w.id) : minimizeWindow(w.id))}
                className={`flex items-center gap-2 rounded-lg px-3 h-9 text-xs shrink-0 transition ${
                  isActive
                    ? "bg-white/10 text-text border border-cyan/30"
                    : "text-text-dim hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon size={14} />
                <span className="hidden md:inline">{app.title}</span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-text-dim tabular-nums pr-1 shrink-0">
          {now
            ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : " "}
        </div>
      </div>
    </>
  );
}
