"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useWindowManager } from "./WindowManager";
import { APPS } from "./apps/registry";

export function StartMenu({ onClose }: { onClose: () => void }) {
  const { openApp } = useWindowManager();

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
          <div className="relative h-9 w-9 rounded-full overflow-hidden border border-border">
            <Image src="/images/profile.jpg" alt="Lamees Adel" fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold">Lamees Adel</p>
            <p className="text-xs text-text-dim">Computer Engineering Student</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {APPS.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => {
                  openApp(app.id);
                  onClose();
                }}
                className="flex flex-col items-center gap-2 rounded-xl p-3 hover:bg-white/5 transition text-center"
              >
                <span className="h-10 w-10 rounded-xl bg-white/5 border border-border flex items-center justify-center text-cyan">
                  <Icon size={18} />
                </span>
                <span className="text-[11px] text-text-dim leading-tight">{app.title}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
