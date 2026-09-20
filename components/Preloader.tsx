"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { profile } from "@/data/resume";

/**
 * Preloader — a brief, premium intro that counts to 100 then curtains up to
 * reveal the site. Shows once per browser session (sessionStorage) so
 * internal navigation isn't interrupted. Locks scroll while visible.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = React.useState(true);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // Skip if already shown this session, or reduced motion.
    if (
      typeof window !== "undefined" &&
      (sessionStorage.getItem("preloaded") === "1" || reduce)
    ) {
      setLoading(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("preloaded", "1");
        setTimeout(() => setLoading(false), 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  React.useEffect(() => {
    if (!loading) document.body.style.overflow = "";
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Curtain wipe */}
          <motion.div
            className="absolute inset-0 origin-bottom bg-background"
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
          />

          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="gradient-border grid h-16 w-16 place-items-center rounded-2xl bg-card"
            >
              <span className="font-display text-2xl font-semibold text-gradient-brand">
                {profile.initials}
              </span>
            </motion.div>

            <div className="flex items-baseline gap-2 font-mono text-sm text-muted-foreground">
              <span className="tabular-nums text-foreground">
                {String(count).padStart(3, "0")}
              </span>
              <span>/ 100</span>
            </div>

            <div className="h-px w-40 overflow-hidden bg-border">
              <motion.div
                className="h-full bg-brand-gradient"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
