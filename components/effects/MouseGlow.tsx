"use client";

import * as React from "react";
import { useHasFinePointer } from "@/hooks/useMediaQuery";

/**
 * MouseGlow — a large, soft radial light that trails the cursor across the
 * whole page. Uses a CSS var + rAF so it never thrashes React state.
 * Fixed, behind content, pointer-fine only.
 */
export function MouseGlow() {
  const ref = React.useRef<HTMLDivElement>(null);
  const fine = useHasFinePointer();

  React.useEffect(() => {
    if (!fine) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const loop = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[100px] will-change-transform"
      style={{
        marginLeft: "-300px",
        marginTop: "-300px",
        background:
          "radial-gradient(circle, hsl(var(--electric) / 0.10), transparent 60%)",
      }}
    />
  );
}
