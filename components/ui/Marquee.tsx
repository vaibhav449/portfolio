"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  /** Seconds for one full loop. */
  duration?: number;
  pauseOnHover?: boolean;
}

/**
 * Marquee — an infinite horizontal ticker. Duplicates its children so the
 * loop is seamless, and fades the edges via a CSS mask.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  duration = 40,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn("group relative flex overflow-hidden mask-fade-x", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center gap-4 pr-4",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
