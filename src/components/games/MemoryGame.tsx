"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { RefreshCcw } from "lucide-react";

const ICONS = ["🤖", "🚀", "🎮", "💡", "🧠", "🏆", "🔬", "✨"];

type Card = { id: number; icon: string; flipped: boolean; matched: boolean };

function shuffle(): Card[] {
  const deck = [...ICONS, ...ICONS]
    .map((icon, i) => ({ id: i, icon, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
  return deck;
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deck must be shuffled client-side only, to avoid an SSR/client hydration mismatch
    setCards(shuffle());
  }, []);

  const won = cards.length > 0 && cards.every((c) => c.matched);

  useEffect(() => {
    if (won) {
      confetti({
        particleCount: 140,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#4ff0ff", "#a78bfa", "#ff6fb0", "#ffcf6b"],
      });
    }
  }, [won]);

  function reset() {
    setCards(shuffle());
    setSelected([]);
    setMoves(0);
    setLocked(false);
  }

  function flip(id: number) {
    if (locked) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const nextCards = cards.map((c) => (c.id === id ? { ...c, flipped: true } : c));
    const nextSelected = [...selected, id];
    setCards(nextCards);
    setSelected(nextSelected);

    if (nextSelected.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [a, b] = nextSelected;
      const cardA = nextCards.find((c) => c.id === a)!;
      const cardB = nextCards.find((c) => c.id === b)!;

      if (cardA.icon === cardB.icon) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c))
          );
          setSelected([]);
          setLocked(false);
        }, 400);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c))
          );
          setSelected([]);
          setLocked(false);
        }, 800);
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => flip(card.id)}
            className="relative aspect-square [perspective:600px]"
          >
            <motion.div
              className="relative h-full w-full rounded-xl [transform-style:preserve-3d]"
              animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 rounded-xl bg-white/5 border border-border [backface-visibility:hidden] flex items-center justify-center text-cyan/60 text-lg font-display">
                ?
              </div>
              <div
                className={`absolute inset-0 rounded-xl border flex items-center justify-center text-2xl [backface-visibility:hidden] ${
                  card.matched
                    ? "bg-cyan/10 border-cyan/40"
                    : "bg-violet/10 border-violet/30"
                }`}
                style={{ transform: "rotateY(180deg)" }}
              >
                {card.icon}
              </div>
            </motion.div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-6 text-sm text-text-dim">
        <span>
          Moves: <span className="text-text font-medium">{moves}</span>
        </span>
        {won && <span className="text-cyan font-medium">Solved! 🎉</span>}
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 hover:text-cyan transition"
        >
          <RefreshCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
}
