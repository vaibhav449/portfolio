"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * GridBackground — a faint technical grid, radially masked so it fades
 * toward the edges. Purely decorative.
 */
export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-grid-pattern [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]",
        className,
      )}
    />
  );
}

/**
 * DotBackground — a subtle dotted field, an alternative to the grid.
 */
export function DotBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-dot-pattern [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]",
        className,
      )}
    />
  );
}

/**
 * Aurora — slow, blurred gradient blobs drifting behind content. The
 * primary "premium" atmosphere. GPU-friendly (transform/opacity only).
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <motion.div
        className="absolute -left-[10%] top-[-15%] h-[45vw] w-[45vw] rounded-full bg-electric/20 blur-[120px]"
        animate={{ x: [0, 60, -30, 0], y: [0, 40, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[10%] h-[40vw] w-[40vw] rounded-full bg-violet/20 blur-[130px]"
        animate={{ x: [0, -50, 30, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[30%] h-[38vw] w-[38vw] rounded-full bg-electric/10 blur-[120px]"
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/**
 * NoiseOverlay — a tiled SVG grain that sits above backgrounds to kill
 * gradient banding and add a filmic, premium texture.
 */
export function NoiseOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[1] opacity-[0.035] mix-blend-overlay",
        className,
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}
