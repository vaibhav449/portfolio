"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useHasFinePointer } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  intensity?: number;
  /** Show a moving glare highlight. Default true. */
  glare?: boolean;
}

/**
 * TiltCard — 3D perspective tilt that follows the cursor, with an optional
 * glare sweep and a spotlight that tracks the pointer. Pointer-fine only.
 */
export function TiltCard({
  children,
  className,
  intensity = 8,
  glare = true,
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const fine = useHasFinePointer();

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !fine) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * intensity * 2);
    rotateX.set((0.5 - py) * intensity * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, hsl(var(--electric) / 0.18), transparent 45%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("perspective relative", className)}
    >
      {children}
      {glare && fine && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
