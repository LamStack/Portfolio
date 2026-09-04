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

export function OS() {
  const [booted, setBooted] = useState(false);

  return (
    <div className="fixed inset-0 overflow-hidden select-none">
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      {booted && (
        <WindowManagerProvider appSizes={APP_SIZES}>
          <AutoOpenAbout />
          <div className="absolute inset-0 bottom-14">
            <Desktop />
          </div>
          <Taskbar />
        </WindowManagerProvider>
      )}
    </div>
  );
}
