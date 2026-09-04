"use client";

import { useState } from "react";
import { useWindowManager } from "./WindowManager";
import { WindowLayer } from "./Window";
import { APPS } from "./apps/registry";
import { socials } from "@/data/content";

export function Desktop() {
  const { openApp } = useWindowManager();
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  function onContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onContextMenu={onContextMenu}
      onClick={() => setMenu(null)}
    >
      <div className="absolute inset-0 grid-fade" />
      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-violet/25 blur-[100px] animate-blob" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-cyan/15 blur-[100px] animate-blob animation-delay-2000" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-pink/15 blur-[100px] animate-blob animation-delay-4000" />

      <div className="relative grid grid-cols-[repeat(auto-fill,88px)] gap-1 p-5 content-start">
        {APPS.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => openApp(app.id)}
              className="flex flex-col items-center gap-2 rounded-lg p-2 text-center hover:bg-white/10 focus:bg-white/10 outline-none transition"
            >
              <span className="h-11 w-11 rounded-2xl bg-white/5 border border-border flex items-center justify-center text-cyan shadow-lg">
                <Icon size={20} />
              </span>
              <span className="text-[11px] text-text drop-shadow leading-tight">{app.title}</span>
            </button>
          );
        })}
      </div>

      <WindowLayer />

      {menu && (
        <div
          style={{ left: menu.x, top: menu.y }}
          className="fixed z-[300] glass rounded-xl p-1.5 text-sm w-48"
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
