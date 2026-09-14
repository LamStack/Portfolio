"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    function onMove(e: PointerEvent) {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button']");
      ringRef.current?.classList.toggle("scale-150", !!interactive);
      ringRef.current?.classList.toggle("opacity-100", true);
    }
    function onLeave() {
      ringRef.current?.classList.remove("opacity-100");
    }

    let raf: number;
    function tick() {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("custom-cursor");

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[300] h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-cyan hidden md:block"
      />
      <div
        ref={ringRef}
        style={{ transition: "opacity 0.15s ease-out, transform 0.03s linear" }}
        className="pointer-events-none fixed left-0 top-0 z-[300] h-8 w-8 -ml-4 -mt-4 rounded-full border border-cyan/50 opacity-0 hidden md:block"
      />
    </>
  );
}
