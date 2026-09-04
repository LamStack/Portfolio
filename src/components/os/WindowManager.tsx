"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AppId, WindowState } from "./types";

type Ctx = {
  windows: WindowState[];
  openApp: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
  activeId: string | null;
};

const WindowManagerContext = createContext<Ctx | null>(null);

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error("useWindowManager must be used inside WindowManagerProvider");
  return ctx;
}

let nextZ = 10;
let nextId = 1;

function spawnPosition(index: number) {
  const offset = (index % 6) * 28;
  return { x: 140 + offset, y: 110 + offset };
}

function isMobileViewport() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

export function WindowManagerProvider({
  children,
  appSizes,
}: {
  children: ReactNode;
  appSizes: Record<AppId, { width: number; height: number }>;
}) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const openOrder = useRef(0);

  const focusWindow = useCallback((id: string) => {
    setActiveId(id);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: ++nextZ, minimized: false } : w))
    );
  }, []);

  const openApp = useCallback(
    (appId: AppId) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.appId === appId);
        if (existing) {
          setActiveId(existing.id);
          return prev.map((w) =>
            w.id === existing.id ? { ...w, minimized: false, zIndex: ++nextZ } : w
          );
        }
        const size = appSizes[appId];
        const pos = spawnPosition(openOrder.current++);
        const id = `win-${nextId++}`;
        const mobile = isMobileViewport();
        const win: WindowState = {
          id,
          appId,
          x: pos.x,
          y: pos.y,
          width: size.width,
          height: size.height,
          minimized: false,
          maximized: mobile,
          zIndex: ++nextZ,
          prevRect: null,
        };
        setActiveId(id);
        return [...prev, win];
      });
    },
    [appSizes]
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveId((cur) => (cur === id ? null : cur));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized) {
          const rect = w.prevRect ?? { x: 100, y: 80, width: w.width, height: w.height };
          return { ...w, maximized: false, ...rect, prevRect: null };
        }
        return {
          ...w,
          maximized: true,
          prevRect: { x: w.x, y: w.y, width: w.width, height: w.height },
        };
      })
    );
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const resizeWindow = useCallback((id: string, width: number, height: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, width, height } : w)));
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openApp,
        closeWindow,
        focusWindow,
        minimizeWindow,
        toggleMaximize,
        moveWindow,
        resizeWindow,
        activeId,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}
