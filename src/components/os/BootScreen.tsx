"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_LINES = [
  "Loading skills.exe",
  "Mounting /projects",
  "Initializing AI core",
  "Brewing coffee.sh",
  "Almost there",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 1900;
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      setStatusIndex(Math.min(STATUS_LINES.length - 1, Math.floor((pct / 100) * STATUS_LINES.length)));
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 250);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[500] bg-bg flex flex-col items-center justify-center gap-6 cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-bold text-gradient"
          >
            Lamees.dev
          </motion.div>

          <div className="w-56 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan to-violet"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-text-dim">{STATUS_LINES[statusIndex]}…</p>
          <p className="absolute bottom-8 text-[11px] text-text-dim/60">Click anywhere to skip</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
