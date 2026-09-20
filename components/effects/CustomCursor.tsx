"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasFinePointer } from "@/hooks/useMediaQuery";

/**
 * CustomCursor — a dual-layer cursor: a crisp dot that tracks 1:1 and a
 * springy ring that lags behind and expands over interactive elements.
 * Hides the native cursor (via a body class) only on fine pointers.
 */
export function CustomCursor() {
  const fine = useHasFinePointer();
  const [hovering, setHovering] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 320, damping: 28, mass: 0.5 });

  React.useEffect(() => {
    if (!fine) return;
    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setHidden(false);

      const el = e.target as HTMLElement;
      const interactive = el.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]',
      );
      setHovering(!!interactive);
    };

    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [fine, dotX, dotY]);

  if (!fine) return null;

  return (
    <>
      {/* Center dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-electric mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: hidden ? 0 : 1, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-electric/70"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: hidden ? 0 : 1,
          width: hovering ? 48 : 28,
          height: hovering ? 48 : 28,
          backgroundColor: hovering
            ? "hsl(var(--electric) / 0.10)"
            : "hsl(var(--electric) / 0)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
