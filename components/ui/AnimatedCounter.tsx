"use client";

import * as React from "react";
import {
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Animation duration in seconds. */
  duration?: number;
  decimals?: number;
  className?: string;
}

/**
 * AnimatedCounter — counts from 0 to `value` when scrolled into view.
 * Falls back to the final value for reduced-motion users.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.8,
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  React.useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;

    if (reduce) {
      node.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, duration, decimals, reduce]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}0{suffix}
    </span>
  );
}
