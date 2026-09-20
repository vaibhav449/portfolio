"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { skillGroups } from "@/data/resume";
import {
  Section,
  SectionHeading,
  StaggerGroup,
  staggerItem,
  SpotlightCard,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type Accent = "electric" | "violet";

/** Narrow the loosely-typed data accent to the primitive's union. */
function toAccent(value: string): Accent {
  return value === "violet" ? "violet" : "electric";
}

/* ------------------------------------------------------------------ */
/* Skill chip                                                          */
/* ------------------------------------------------------------------ */

function SkillChip({ name, accent }: { name: string; accent: Accent }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-sm text-foreground/90 transition-colors duration-300",
        accent === "violet"
          ? "hover:border-violet/40 hover:text-foreground"
          : "hover:border-electric/40 hover:text-foreground",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          accent === "violet" ? "bg-violet" : "bg-electric",
        )}
      />
      {name}
    </span>
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
        <div className="flex h-full flex-col gap-5 p-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <span
              className={cn(
                "grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-muted/40 transition-colors duration-300",
                accent === "violet"
                  ? "text-violet group-hover:border-violet/40"
                  : "text-electric group-hover:border-electric/40",
              )}
            >
              <Icon className="h-5 w-5" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-base font-semibold tracking-tight">
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
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <SkillChip key={skill.name} name={skill.name} accent={accent} />
            ))}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                            */
/* ------------------------------------------------------------------ */

export function Skills() {
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
        description="From provider-agnostic LLM gateways to real-time WebSocket systems — the stack I reach for every day."
      />

      {/* Grid of capability cards */}
      <StaggerGroup
        stagger={0.07}
        className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {skillGroups.map((group) => (
          <GroupCard key={group.category} group={group} />
        ))}
      </StaggerGroup>
    </Section>
  );
}
