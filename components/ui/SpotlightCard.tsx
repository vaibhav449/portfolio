"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Spotlight radius in px. */
  radius?: number;
  /** Accent used for the glow: electric | violet. */
  accent?: "electric" | "violet";
}

/**
 * SpotlightCard — a bordered surface with a soft radial glow that tracks
 * the cursor. The workhorse card for skills, achievements, etc.
 */
export function SpotlightCard({
  children,
  className,
  radius = 350,
  accent = "electric",
  ...props
}: SpotlightCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: -1000, y: -1000 });
  const [active, setActive] = React.useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const color =
    accent === "violet"
      ? "hsl(var(--violet-accent) / 0.14)"
      : "hsl(var(--electric) / 0.14)";

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card/50 transition-colors duration-300 hover:border-foreground/15",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
