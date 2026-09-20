"use client";

import { useEffect, useState } from "react";

export type MousePosition = { x: number; y: number };

/**
 * Tracks the global mouse position. Optionally scoped to a ref element,
 * returning coordinates relative to that element's top-left.
 */
export function useMousePosition(ref?: React.RefObject<HTMLElement>) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      } else {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [ref]);

  return position;
}
