"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { useWindowManager } from "./WindowManager";
import { APPS } from "./apps/registry";
import type { WindowState } from "./types";

export const TASKBAR_HEIGHT = 56;
const MIN_WIDTH = 320;
const MIN_HEIGHT = 260;
const EDGE = 28;
const PULL_CLOSE_THRESHOLD = 110;

export function Window({ win }: { win: WindowState }) {
  const {
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
    resizeWindow,
    activeId,
    isMobile,
    setEdgeHint,
  } = useWindowManager();
  const app = APPS.find((a) => a.id === win.appId)!;
  const dragStart = useRef<{ px: number; py: number; wx: number; wy: number } | null>(null);
  const resizeStart = useRef<{ px: number; py: number; w: number; h: number } | null>(null);
  const pullStart = useRef<number | null>(null);
  const [pullY, setPullY] = useState(0);
  const [pulling, setPulling] = useState(false);
  const [smooth, setSmooth] = useState(false);
  const isActive = activeId === win.id;

  function onTitlePointerDown(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    focusWindow(win.id);

    if (win.maximized) {
      if (isMobile) {
        pullStart.current = e.clientY;
        setPulling(true);
        setSmooth(false);
      }
      return;
    }
    setSmooth(false);
    dragStart.current = { px: e.clientX, py: e.clientY, wx: win.x, wy: win.y };
  }

  function onTitlePointerMove(e: React.PointerEvent) {
    if (pullStart.current !== null) {
      const dy = Math.max(0, e.clientY - pullStart.current);
      setPullY(dy);
      return;
    }
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.px;
    const dy = e.clientY - dragStart.current.py;
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - TASKBAR_HEIGHT - 40;
    const nx = Math.min(Math.max(dragStart.current.wx + dx, -80), maxX);
    const ny = Math.min(Math.max(dragStart.current.wy + dy, 0), maxY);
    moveWindow(win.id, nx, ny);

    if (ny <= EDGE) setEdgeHint("top");
    else if (nx <= EDGE) setEdgeHint("left");
    else if (nx + win.width >= window.innerWidth - EDGE) setEdgeHint("right");
    else setEdgeHint(null);
  }

  function onTitlePointerUp() {
    if (pullStart.current !== null) {
      pullStart.current = null;
      setPulling(false);
      setSmooth(true);
      if (pullY > PULL_CLOSE_THRESHOLD) {
        closeWindow(win.id);
      } else {
        setPullY(0);
      }
      return;
    }
    if (!dragStart.current) return;
    dragStart.current = null;
    setEdgeHint(null);
    setSmooth(true);

    if (isMobile || win.maximized) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight - TASKBAR_HEIGHT;
    if (win.y <= EDGE) {
      toggleMaximize(win.id);
    } else if (win.x <= EDGE) {
      moveWindow(win.id, 8, 8);
      resizeWindow(win.id, vw / 2 - 16, vh - 16);
    } else if (win.x + win.width >= vw - EDGE) {
      moveWindow(win.id, vw / 2 + 8, 8);
      resizeWindow(win.id, vw / 2 - 16, vh - 16);
    }
  }

  function onResizePointerDown(e: React.PointerEvent) {
    e.stopPropagation();
    focusWindow(win.id);
    setSmooth(false);
    resizeStart.current = { px: e.clientX, py: e.clientY, w: win.width, h: win.height };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onResizePointerMove(e: React.PointerEvent) {
    if (!resizeStart.current) return;
    const dx = e.clientX - resizeStart.current.px;
    const dy = e.clientY - resizeStart.current.py;
    const nw = Math.max(MIN_WIDTH, resizeStart.current.w + dx);
    const nh = Math.max(MIN_HEIGHT, resizeStart.current.h + dy);
    resizeWindow(win.id, nw, nh);
  }

  function onResizePointerUp() {
    resizeStart.current = null;
    setSmooth(true);
  }

  const isMax = win.maximized;
  const rect = isMax
    ? { x: 8, y: 8, width: "calc(100vw - 16px)" as unknown as number, height: `calc(100vh - ${TASKBAR_HEIGHT + 16}px)` as unknown as number }
    : { x: win.x, y: win.y, width: win.width, height: win.height };

  const Icon = app.icon;
  const AppComponent = app.component;

  const initialAnim = isMax
    ? { opacity: 0, scale: 0.96, x: 0, y: 32 }
    : win.originRect
    ? {
        opacity: 0,
        scale: 0.06,
        x: win.originRect.x + win.originRect.width / 2 - (win.x + win.width / 2),
        y: win.originRect.y + win.originRect.height / 2 - (win.y + win.height / 2),
      }
    : { opacity: 0, scale: 0.9, y: 16 };

  const minimizedAnim = isMax
    ? { opacity: 0, scale: 0.5, x: 0, y: window.innerHeight * 0.4, pointerEvents: "none" as const }
    : {
        opacity: 0,
        scale: 0.15,
        x: window.innerWidth / 2 - (win.x + win.width / 2),
        y: window.innerHeight - win.y,
        pointerEvents: "none" as const,
      };

  return (
    <motion.div
      initial={initialAnim}
      animate={win.minimized ? minimizedAnim : { opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: win.minimized || !win.originRect ? 0.32 : 0.38, ease: [0.22, 1, 0.36, 1] }}
      onPointerDown={() => focusWindow(win.id)}
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        zIndex: win.zIndex,
        transition: smooth
          ? "left 0.22s ease-out, top 0.22s ease-out, width 0.22s ease-out, height 0.22s ease-out"
          : undefined,
      }}
      className={`flex flex-col rounded-xl overflow-hidden border shadow-2xl ${
        isActive ? "border-cyan/40" : "border-border"
      }`}
    >
      <div
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        onDoubleClick={() => !isMobile && toggleMaximize(win.id)}
        className="relative flex items-center justify-between gap-3 px-3 h-10 shrink-0 bg-bg-soft border-b border-border cursor-grab active:cursor-grabbing select-none touch-none"
      >
        {isMobile && win.maximized && (
          <span className="absolute top-1.5 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-white/25" />
        )}
        <div className="flex items-center gap-2 text-sm text-text-dim min-w-0">
          <Icon size={14} className="text-cyan shrink-0" />
          <span className="truncate">{app.title}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => minimizeWindow(win.id)}
            aria-label="Minimize"
            className="h-5 w-5 rounded-full bg-amber/80 hover:bg-amber flex items-center justify-center text-bg"
          >
            <Minus size={11} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => toggleMaximize(win.id)}
            aria-label="Maximize"
            className="h-5 w-5 rounded-full bg-cyan/80 hover:bg-cyan flex items-center justify-center text-bg"
          >
            <Square size={9} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => closeWindow(win.id)}
            aria-label="Close"
            className="h-5 w-5 rounded-full bg-pink/80 hover:bg-pink flex items-center justify-center text-bg"
          >
            <X size={11} />
          </motion.button>
        </div>
      </div>

      <div
        style={{
          transform: pullY ? `translateY(${pullY}px) scale(${1 - Math.min(pullY / 900, 0.12)})` : undefined,
          opacity: pullY ? Math.max(1 - pullY / 260, 0.35) : 1,
          transition: !pulling ? "transform 0.2s ease-out, opacity 0.2s ease-out" : undefined,
        }}
        className="flex-1 min-h-0 overflow-y-auto bg-bg/95 backdrop-blur-xl"
      >
        <AppComponent />
      </div>

      {!isMax && (
        <div
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize touch-none"
        >
          <svg viewBox="0 0 16 16" className="h-full w-full text-text-dim/40">
            <path d="M15 15L15 9M15 15L9 15M15 15L4 15L15 4" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}

export function WindowLayer() {
  const { windows } = useWindowManager();
  return (
    <AnimatePresence>
      {windows.map((w) => (
        <Window key={w.id} win={w} />
      ))}
    </AnimatePresence>
  );
}
