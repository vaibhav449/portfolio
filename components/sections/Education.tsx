"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { education } from "@/data/resume";
import {
  AnimatedCounter,
  Badge,
  Reveal,
  Section,
  SectionHeading,
  SpotlightCard,
  StaggerGroup,
  TiltCard,
  staggerItem,
} from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * Education — a single, considered timeline card: a gradient-bordered
 * "IIIT" monogram tile, the degree + field, school & location, period,
 * a GPA presented as an animated progress ring, and coursework chips.
 */
export function Education() {
  const entry = education[0];
  if (!entry) return null;

  // Derive a short monogram from the school name (e.g. "IIIT Raichur" → "IIIT").
  const monogram =
    entry.school.match(/[A-Z]{2,}/)?.[0] ??
    entry.school
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 4)
      .toUpperCase();

  // Parse the GPA string "7.3 / 10.0" into value + scale for the ring.
  const [gpaRaw, scaleRaw] = entry.gpa.split("/").map((s) => s.trim());
  const gpaValue = Number.parseFloat(gpaRaw ?? "0") || 0;
  const gpaScale = Number.parseFloat(scaleRaw ?? "10") || 10;
  const pct = Math.max(0, Math.min(1, gpaValue / gpaScale));

  return (
    <Section id="education">
      <SectionHeading
        kicker="Education"
        index="07"
        title={
          <>
            Foundations in <span className="text-gradient-brand">computer science</span>.
          </>
        }
        description="Where the systems thinking started — a rigorous CS degree paired with the fundamentals that hold real software together."
      />

      <Reveal className="mt-14" y={36}>
        <TiltCard intensity={5} className="[transform-style:preserve-3d]">
          <SpotlightCard
            accent="violet"
            radius={480}
            className="shadow-card"
          >
            {/* Decorative accents behind the content */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-grid-pattern [background-size:36px_36px] opacity-40 mask-fade-b" />
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet/10 blur-3xl" />
              <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-electric/10 blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col gap-8 p-6 sm:p-8 lg:p-10">
              {/* Header: monogram + titles + GPA ring */}
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  {/* Monogram tile */}
                  <div className="shrink-0">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="gradient-border relative grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-card sm:h-24 sm:w-24"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-brand-gradient opacity-10"
                      />
                      <span className="relative font-display text-xl font-bold tracking-tight text-gradient-brand sm:text-2xl">
                        {monogram}
                      </span>
                    </motion.div>
                  </div>

                  {/* Degree, field, school, location, period */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="violet" className="font-mono">
                        <GraduationCap className="h-3.5 w-3.5" />
                        {entry.degree}
                      </Badge>
                      <Badge variant="outline" className="font-mono">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {entry.period}
                      </Badge>
                    </div>

                    <h3 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                      {entry.field}
                    </h3>

                    <div className="flex flex-col gap-1.5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-4">
                      <span className="inline-flex items-center gap-1.5 font-medium text-foreground/90">
                        <Sparkles className="h-4 w-4 text-electric" />
                        {entry.school}
                      </span>
                      <span
                        aria-hidden
                        className="hidden h-1 w-1 rounded-full bg-muted-foreground/40 sm:inline-block"
                      />
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {entry.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* GPA ring */}
                <GpaRing value={gpaValue} scale={gpaScale} pct={pct} />
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-border via-border to-transparent" />

              {/* Coursework */}
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5 text-violet" />
                  Relevant Coursework
                </div>
                <StaggerGroup stagger={0.06} className="flex flex-wrap gap-2.5">
                  {entry.coursework.map((course) => (
                    <motion.div key={course} variants={staggerItem}>
                      <motion.span
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="inline-block"
                      >
                        <Badge
                          variant="default"
                          className="cursor-default border-border/80 bg-muted/40 py-1.5 backdrop-blur transition-colors hover:border-electric/40 hover:text-foreground"
                        >
                          {course}
                        </Badge>
                      </motion.span>
                    </motion.div>
                  ))}
                </StaggerGroup>
              </div>
            </div>
          </SpotlightCard>
        </TiltCard>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* GPA progress ring                                                   */
/* ------------------------------------------------------------------ */

function GpaRing({
  value,
  scale,
  pct,
}: {
  value: number;
  scale: number;
  pct: number;
}) {
  const reduce = useReducedMotion();
  const size = 148;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto shrink-0 sm:mx-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        role="img"
        aria-label={`GPA ${value} out of ${scale}`}
      >
        <defs>
          <linearGradient id="gpaRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--electric))" />
            <stop offset="100%" stopColor="hsl(var(--violet-accent))" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#gpaRingGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: reduce ? offset : c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <AnimatedCounter
          value={value}
          decimals={1}
          duration={1.6}
          className="font-display text-3xl font-bold tracking-tight text-gradient-brand"
        />
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
          / {scale.toFixed(1)} GPA
        </span>
      </div>
    </motion.div>
  );
}
