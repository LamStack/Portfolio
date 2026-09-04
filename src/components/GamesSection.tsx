"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Grid3x3, Timer, Brain } from "lucide-react";
import { SectionHeading } from "./Reveal";
import { ReactionGame } from "./games/ReactionGame";
import { MemoryGame } from "./games/MemoryGame";
import { TicTacToe } from "./games/TicTacToe";

const GAMES = [
  { id: "reaction", label: "Reaction Test", icon: Timer, Component: ReactionGame },
  { id: "memory", label: "Memory Match", icon: Brain, Component: MemoryGame },
  { id: "ttt", label: "Tic-Tac-Toe vs AI", icon: Grid3x3, Component: TicTacToe },
] as const;

export function GamesSection() {
  const [active, setActive] = useState<(typeof GAMES)[number]["id"]>("reaction");
  const current = GAMES.find((g) => g.id === active)!;

  return (
    <section id="arcade" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          kicker="Just for fun"
          title="Take a break — the arcade is open."
          subtitle="You made it this far, might as well beat my reaction time."
        />

        <div className="glass rounded-[2rem] p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Gamepad2 size={18} className="text-cyan mr-1" />
            {GAMES.map((g) => (
              <button
                key={g.id}
                onClick={() => setActive(g.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                  active === g.id
                    ? "bg-gradient-to-r from-cyan to-violet text-bg font-semibold"
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
