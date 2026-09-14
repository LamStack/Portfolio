"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Gamepad2, Grid3x3, Timer } from "lucide-react";
import { ReactionGame } from "@/components/games/ReactionGame";
import { MemoryGame } from "@/components/games/MemoryGame";
import { TicTacToe } from "@/components/games/TicTacToe";

const GAMES = [
  { id: "reaction", label: "Reaction Test", icon: Timer, Component: ReactionGame },
  { id: "memory", label: "Memory Match", icon: Brain, Component: MemoryGame },
  { id: "ttt", label: "Tic-Tac-Toe vs AI", icon: Grid3x3, Component: TicTacToe },
] as const;

export function ArcadeSection() {
  const [active, setActive] = useState<(typeof GAMES)[number]["id"]>("reaction");
  const current = GAMES.find((g) => g.id === active)!;

  return (
    <section id="arcade" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-orange/20 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan/20 blur-[110px]" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-orange uppercase">
          <span className="h-px w-6 bg-orange" /> Just for fun
        </span>
        <h2 className="font-display mt-4 text-3xl sm:text-4xl font-bold max-w-lg">
          Take a break, the arcade is open.
        </h2>

        <div className="mt-12 rounded-[2rem] border border-border bg-white/[0.03] p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Gamepad2 size={18} className="text-orange mr-1" />
            {GAMES.map((g) => (
              <button
                key={g.id}
                onClick={() => setActive(g.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                  active === g.id
                    ? "bg-gradient-to-r from-orange to-pink text-bg font-semibold"
                    : "text-text-dim hover:text-text border border-border"
                }`}
              >
                <g.icon size={15} />
                {g.label}
              </button>
            ))}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <current.Component />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
