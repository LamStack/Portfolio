"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

type Phase = "idle" | "waiting" | "ready" | "clicked-early" | "result";

export function ReactionGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [reaction, setReaction] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const startTime = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("reaction-best");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading a browser-only API, not derivable during render
    if (saved) setBest(Number(saved));
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const start = useCallback(() => {
    setReaction(null);
    setPhase("waiting");
    const delay = 1200 + Math.random() * 2200;
    timeoutRef.current = setTimeout(() => {
      startTime.current = performance.now();
      setPhase("ready");
    }, delay);
  }, []);

  function handleClick() {
    if (phase === "idle" || phase === "result" || phase === "clicked-early") {
      start();
      return;
    }
    if (phase === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase("clicked-early");
      return;
    }
    if (phase === "ready") {
      const t = Math.round(performance.now() - startTime.current);
      setReaction(t);
      setPhase("result");
      if (!best || t < best) {
        setBest(t);
        localStorage.setItem("reaction-best", String(t));
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#4ff0ff", "#a78bfa", "#ff6fb0"],
        });
      }
    }
  }

  const bg =
    phase === "ready"
      ? "bg-gradient-to-br from-cyan to-violet"
      : phase === "clicked-early"
      ? "bg-gradient-to-br from-pink to-amber"
      : "bg-white/5";

  const label =
    phase === "idle"
      ? "Tap to start"
      : phase === "waiting"
      ? "Wait for green…"
      : phase === "ready"
      ? "Click now!"
      : phase === "clicked-early"
      ? "Too soon! Tap to retry"
      : `${reaction} ms, tap to try again`;

  return (
    <div className="flex flex-col items-center gap-5">
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.97 }}
        className={`h-56 w-full max-w-sm rounded-3xl border border-border ${bg} flex items-center justify-center text-center px-6 transition-colors duration-200`}
      >
        <span className="font-display text-lg font-semibold text-text">
          {label}
        </span>
      </motion.button>
      <div className="flex gap-8 text-sm text-text-dim">
        <span>
          Last: <span className="text-text font-medium">{reaction ?? "n/a"} ms</span>
        </span>
        <span>
          Best: <span className="text-cyan font-medium">{best ?? "n/a"} ms</span>
        </span>
      </div>
    </div>
  );
}
