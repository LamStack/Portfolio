"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { RefreshCcw } from "lucide-react";

type Cell = "X" | "O" | null;
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winner(board: Cell[]): Cell | "draw" | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every((c) => c) ? "draw" : null;
}

function minimax(board: Cell[], isMax: boolean): number {
  const w = winner(board);
  if (w === "O") return 1;
  if (w === "X") return -1;
  if (w === "draw") return 0;

  const scores: number[] = [];
  board.forEach((cell, i) => {
    if (!cell) {
      const next = [...board];
      next[i] = isMax ? "O" : "X";
      scores.push(minimax(next, !isMax));
    }
  });
  return isMax ? Math.max(...scores) : Math.min(...scores);
}

function bestMove(board: Cell[]): number {
  let best = -Infinity;
  let move = -1;
  board.forEach((cell, i) => {
    if (!cell) {
      const next = [...board];
      next[i] = "O";
      const score = minimax(next, false);
      if (score > best) {
        best = score;
        move = i;
      }
    }
  });
  return move;
}

export function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [record, setRecord] = useState({ wins: 0, losses: 0, draws: 0 });

  const result = winner(board);

  useEffect(() => {
    if (!result) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- tallying a round's outcome once `result` changes, not derivable during render
    setRecord((r) =>
      result === "X"
        ? { ...r, wins: r.wins + 1 }
        : result === "draw"
        ? { ...r, draws: r.draws + 1 }
        : { ...r, losses: r.losses + 1 }
    );
    if (result === "X") {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: ["#4ff0ff", "#ffcf6b"] });
    }
  }, [result]);

  useEffect(() => {
    if (turn === "O" && !result) {
      const t = setTimeout(() => {
        const move = bestMove(board);
        if (move !== -1) {
          const next = [...board];
          next[move] = "O";
          setBoard(next);
          setTurn("X");
        }
      }, 450);
      return () => clearTimeout(t);
    }
  }, [turn, board, result]);

  function play(i: number) {
    if (board[i] || result || turn !== "X") return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    setTurn("O");
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setTurn("X");
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-xs text-text-dim">
        You&apos;re <span className="text-cyan">X</span>. The AI plays perfectly — a
        draw is a win.
      </p>
      <div className="grid grid-cols-3 gap-2 w-full max-w-[260px]">
        {board.map((cell, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.94 }}
            onClick={() => play(i)}
            className="aspect-square rounded-xl bg-white/5 border border-border flex items-center justify-center text-2xl font-display font-bold"
          >
            {cell === "X" && <span className="text-cyan">X</span>}
            {cell === "O" && <span className="text-pink">O</span>}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-5 text-sm text-text-dim">
        <span>
          {result === "draw"
            ? "It's a draw 🤝"
            : result === "X"
            ? "You win! 🎉"
            : result === "O"
            ? "AI wins 🤖"
            : turn === "X"
            ? "Your move"
            : "AI thinking…"}
        </span>
        <button onClick={reset} className="inline-flex items-center gap-1.5 hover:text-cyan transition">
          <RefreshCcw size={14} /> Reset
        </button>
      </div>
      <div className="flex gap-4 text-xs text-text-dim">
        <span>Wins: {record.wins}</span>
        <span>Draws: {record.draws}</span>
        <span>Losses: {record.losses}</span>
      </div>
    </div>
  );
}
