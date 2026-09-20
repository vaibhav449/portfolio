"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — a thin reading-progress bar pinned to the top of the
 * viewport, driven by a springed scroll value for a fluid feel.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brand-gradient"
      style={{ scaleX }}
    />
  );
}
