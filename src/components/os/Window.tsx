"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { useWindowManager } from "./WindowManager";
import { APPS } from "./apps/registry";
import type { WindowState } from "./types";

const TASKBAR_HEIGHT = 56;
const MIN_WIDTH = 320;
const MIN_HEIGHT = 260;

export function Window({ win }: { win: WindowState }) {
  const { closeWindow, focusWindow, minimizeWindow, toggleMaximize, moveWindow, resizeWindow, activeId } =
    useWindowManager();
  const app = APPS.find((a) => a.id === win.appId)!;
  const dragStart = useRef<{ px: number; py: number; wx: number; wy: number } | null>(null);
  const resizeStart = useRef<{ px: number; py: number; w: number; h: number } | null>(null);
  const isActive = activeId === win.id;

  function onTitlePointerDown(e: React.PointerEvent) {
    if (win.maximized) return;
    focusWindow(win.id);
    dragStart.current = { px: e.clientX, py: e.clientY, wx: win.x, wy: win.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onTitlePointerMove(e: React.PointerEvent) {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.px;
    const dy = e.clientY - dragStart.current.py;
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - TASKBAR_HEIGHT - 40;
    const nx = Math.min(Math.max(dragStart.current.wx + dx, -80), maxX);
    const ny = Math.min(Math.max(dragStart.current.wy + dy, 0), maxY);
    moveWindow(win.id, nx, ny);
  }

  function onTitlePointerUp() {
    dragStart.current = null;
  }

  function onResizePointerDown(e: React.PointerEvent) {
    e.stopPropagation();
    focusWindow(win.id);
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
  }

  if (win.minimized) return null;

  const rect = win.maximized
    ? { x: 8, y: 8, width: "calc(100vw - 16px)" as unknown as number, height: `calc(100vh - ${TASKBAR_HEIGHT + 16}px)` as unknown as number }
    : { x: win.x, y: win.y, width: win.width, height: win.height };

  const Icon = app.icon;
  const AppComponent = app.component;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.18 }}
      onPointerDown={() => focusWindow(win.id)}
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        zIndex: win.zIndex,
      }}
      className={`flex flex-col rounded-xl overflow-hidden border shadow-2xl ${
        isActive ? "border-cyan/40" : "border-border"
      }`}
    >
      <div
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        onDoubleClick={() => toggleMaximize(win.id)}
        className="flex items-center justify-between gap-3 px-3 h-10 shrink-0 bg-bg-soft border-b border-border cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-center gap-2 text-sm text-text-dim min-w-0">
          <Icon size={14} className="text-cyan shrink-0" />
          <span className="truncate">{app.title}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => minimizeWindow(win.id)}
            aria-label="Minimize"
            className="h-5 w-5 rounded-full bg-amber/80 hover:bg-amber flex items-center justify-center text-bg"
          >
            <Minus size={11} />
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => toggleMaximize(win.id)}
            aria-label="Maximize"
            className="h-5 w-5 rounded-full bg-cyan/80 hover:bg-cyan flex items-center justify-center text-bg"
          >
            <Square size={9} />
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => closeWindow(win.id)}
            aria-label="Close"
            className="h-5 w-5 rounded-full bg-pink/80 hover:bg-pink flex items-center justify-center text-bg"
          >
            <X size={11} />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto bg-bg/95 backdrop-blur-xl">
        <AppComponent />
      </div>

      {!win.maximized && (
        <div
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
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
