"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Grid3x3, Timer } from "lucide-react";
import { ReactionGame } from "../../games/ReactionGame";
import { MemoryGame } from "../../games/MemoryGame";
import { TicTacToe } from "../../games/TicTacToe";

const GAMES = [
  { id: "reaction", label: "Reaction", icon: Timer, Component: ReactionGame },
  { id: "memory", label: "Memory", icon: Brain, Component: MemoryGame },
  { id: "ttt", label: "Tic-Tac-Toe", icon: Grid3x3, Component: TicTacToe },
] as const;

export function ArcadeApp() {
  const [active, setActive] = useState<(typeof GAMES)[number]["id"]>("reaction");
  const current = GAMES.find((g) => g.id === active)!;

  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {GAMES.map((g) => (
          <button
            key={g.id}
            onClick={() => setActive(g.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs transition ${
              active === g.id
                ? "bg-gradient-to-r from-cyan to-violet text-bg font-semibold"
                : "text-text-dim hover:text-text border border-border"
            }`}
          >
            <g.icon size={13} />
            {g.label}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <current.Component />
      </motion.div>
    </div>
  );
}
