"use client";

import { useEffect, useState } from "react";
import { BootScreen } from "./BootScreen";
import { WindowManagerProvider, useWindowManager } from "./WindowManager";
import { Desktop } from "./Desktop";
import { Taskbar } from "./Taskbar";
import { APP_SIZES } from "./apps/registry";

function AutoOpenAbout() {
  const { openApp, windows } = useWindowManager();
  useEffect(() => {
    if (windows.length === 0) openApp("about");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

function KeyboardShortcuts() {
  const { activeId, closeWindow, windows, focusWindow } = useWindowManager();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if (e.key === "Escape" && activeId && !typing) {
        closeWindow(activeId);
      }
      if (e.ctrlKey && e.key === "Tab") {
        e.preventDefault();
        if (windows.length < 2) return;
        const sorted = [...windows].sort((a, b) => a.zIndex - b.zIndex);
        const next = sorted[sorted.length - 2];
        if (next) focusWindow(next.id);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, closeWindow, windows, focusWindow]);

  return null;
}

export function OS() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="fixed inset-0 overflow-hidden select-none">
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      {booted && (
        <WindowManagerProvider appSizes={APP_SIZES}>
          <AutoOpenAbout />
          <KeyboardShortcuts />
          <div className="absolute inset-0 bottom-14">
            <Desktop />
          </div>
          <Taskbar />
        </WindowManagerProvider>
      )}
    </div>
  );
}
