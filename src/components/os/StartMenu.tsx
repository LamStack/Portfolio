"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";
import { useWindowManager } from "./WindowManager";
import { APPS } from "./apps/registry";

export function StartMenu({ onClose }: { onClose: () => void }) {
  const { openApp } = useWindowManager();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return APPS;
    return APPS.filter((a) => a.title.toLowerCase().includes(q));
  }, [query]);

  function launch(appId: (typeof APPS)[number]["id"], el: HTMLElement) {
    const r = el.getBoundingClientRect();
    openApp(appId, { x: r.x, y: r.y, width: r.width, height: r.height });
    onClose();
  }

  return (
    <>
      <div className="fixed inset-0 z-[90]" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.16 }}
        className="fixed bottom-16 left-3 z-[95] w-80 max-w-[calc(100vw-24px)] glass rounded-2xl p-4 shadow-2xl"
      >
        <div className="flex items-center gap-3 px-2 pb-3 mb-3 border-b border-border">
          <div className="relative h-9 w-9 rounded-full overflow-hidden border border-border shrink-0">
            <Image src="/images/profile.jpg" alt="Lamees Adel" fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold">Lamees Adel</p>
            <p className="text-xs text-text-dim">Computer Engineering Student</p>
          </div>
        </div>

        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps"
            className="w-full rounded-lg bg-white/5 border border-border pl-9 pr-3 py-2 text-sm outline-none focus:border-cyan/50 transition-colors"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-xs text-text-dim py-6">No apps match &ldquo;{query}&rdquo;.</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {filtered.map((app) => {
              const Icon = app.icon;
              return (
                <motion.button
                  key={app.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => launch(app.id, e.currentTarget)}
                  className="flex flex-col items-center gap-2 rounded-xl p-3 hover:bg-white/5 transition-colors text-center"
                >
                  <span className="h-10 w-10 rounded-xl bg-white/5 border border-border flex items-center justify-center text-cyan">
                    <Icon size={18} />
                  </span>
                  <span className="text-[11px] text-text-dim leading-tight">{app.title}</span>
                </motion.button>
              );
            })}
          </div>
        )}
      </motion.div>
    </>
  );
}
