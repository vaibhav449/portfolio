"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { skillGroups, techMarquee } from "@/data/resume";
import {
  Section,
  SectionHeading,
  StaggerGroup,
  staggerItem,
  SpotlightCard,
  Marquee,
} from "@/components/ui";
import { cn } from "@/lib/utils";

/* Premium expo/spring easing shared by every fill bar. */
const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Accent = "electric" | "violet";

/** Narrow the loosely-typed data accent to the primitive's union. */
function toAccent(value: string): Accent {
  return value === "violet" ? "violet" : "electric";
}

/* ------------------------------------------------------------------ */
/* Animated proficiency bar                                            */
/* ------------------------------------------------------------------ */

function SkillBar({
  name,
  level,
  index,
  accent,
}: {
  name: string;
  level: number;
  index: number;
  accent: Accent;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="group/skill">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-foreground/90">{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.35 + index * 0.05 }}
          className="font-mono text-xs tabular-nums text-muted-foreground"
        >
          {level}
          <span className="text-foreground/30">%</span>
        </motion.span>
      </div>

      {/* Track */}
      <div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
        {/* Fill — scaleX keeps the animation on the GPU (transform only). */}
        <motion.div
          className="h-full origin-left rounded-full bg-brand-gradient"
          style={{ transformOrigin: "left center" }}
          initial={{ scaleX: reduce ? level / 100 : 0 }}
          whileInView={{ scaleX: level / 100 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 1.15,
            delay: 0.15 + index * 0.07,
            ease: EXPO,
          }}
        >
          {/* Leading edge glow that travels with the fill. */}
          <span
            aria-hidden
            className={cn(
              "absolute inset-y-0 right-0 w-6 rounded-full blur-[6px]",
              accent === "violet" ? "bg-violet/70" : "bg-electric/70",
            )}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Group card                                                         */
/* ------------------------------------------------------------------ */

function GroupCard({ group }: { group: (typeof skillGroups)[number] }) {
  const accent = toAccent(group.accent);
  const Icon = group.icon;

  return (
    <motion.div variants={staggerItem} className="h-full">
      <SpotlightCard
        accent={accent}
        radius={420}
        className="h-full transition-transform duration-300 will-change-transform hover:-translate-y-1 hover:shadow-card-hover"
      >
        <div className="flex h-full flex-col gap-6 p-6 sm:p-7">
          {/* Header */}
          <div className="flex items-start gap-4">
            <span
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-muted/40 transition-colors duration-300",
                accent === "violet"
                  ? "text-violet group-hover:border-violet/40"
                  : "text-electric group-hover:border-electric/40",
              )}
            >
              <Icon className="h-5 w-5" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {group.category}
                </h3>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                  {group.skills.length.toString().padStart(2, "0")}
                </span>
              </div>
              <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                {group.blurb}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-auto flex flex-col gap-4">
            {group.skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                index={i}
                accent={accent}
              />
            ))}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Tech pill                                                          */
/* ------------------------------------------------------------------ */

function TechPill({ label }: { label: string }) {
  return (
    <span className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card/50 px-4 py-2 font-mono text-sm text-muted-foreground transition-colors duration-300 hover:border-foreground/20 hover:text-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                            */
/* ------------------------------------------------------------------ */

export function Skills() {
  // Split the marquee reel into two interleaved rows for a layered ticker.
  const rowA = techMarquee.filter((_, i) => i % 2 === 0);
  const rowB = techMarquee.filter((_, i) => i % 2 === 1);

  return (
    <Section id="skills">
      <SectionHeading
        kicker="Capabilities"
        index="02"
        title={
          <>
            A full-stack toolkit,{" "}
            <span className="text-gradient-brand">tuned for production</span>.
          </>
        }
        description="From provider-agnostic LLM gateways to real-time WebSocket systems — the stack I reach for, and how deep it runs."
      />

      {/* Grid of capability cards */}
      <StaggerGroup
        stagger={0.09}
        className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {skillGroups.map((group) => (
          <GroupCard key={group.category} group={group} />
        ))}
      </StaggerGroup>

      {/* Tech ticker — two rows, one reversed */}
      <div className="mt-16 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            The daily stack
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <Marquee duration={42} className="py-1">
          {rowA.map((label) => (
            <TechPill key={label} label={label} />
          ))}
        </Marquee>

        <Marquee reverse duration={52} className="py-1">
          {rowB.map((label) => (
            <TechPill key={label} label={label} />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
