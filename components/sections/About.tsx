"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Gauge, Layers, Quote, Rocket, ShieldCheck, type LucideIcon } from "lucide-react";

import { interests, profile, values } from "@/data/resume";
import {
  Badge,
  Reveal,
  Section,
  SectionHeading,
  SpotlightCard,
  StaggerGroup,
  staggerItem,
} from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * Maps the string icon names stored in `values` (data/resume.ts) onto their
 * concrete lucide-react components. Kept local so the data layer stays
 * serializable and framework-agnostic.
 */
const VALUE_ICONS: Record<string, LucideIcon> = {
  Layers,
  Gauge,
  ShieldCheck,
  Rocket,
};

/** About — the story, the values, and the strengths. */
export function About() {
  return (
    <Section id="about">
      <SectionHeading
        kicker="About"
        index="01"
        title={
          <>
            Engineering that <span className="text-gradient-brand">survives production.</span>
          </>
        }
        description="I care about the unglamorous parts that make software actually work under real traffic — cost, correctness, and reliability at the edges."
      />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
        {/* ── Story column ─────────────────────────────────────────── */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative pl-6">
              {/* Subtle vertical accent line */}
              <span
                aria-hidden
                className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-electric/60 via-violet/40 to-transparent"
              />

              <div className="space-y-5">
                {profile.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className={cn(
                      "max-w-2xl text-pretty leading-relaxed text-muted-foreground",
                      i === 0 && "text-fluid-base text-foreground/90",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Pull-quote — what I care about */}
          <Reveal delay={0.1}>
            <figure className="glass relative mt-8 overflow-hidden rounded-2xl p-6 shadow-card">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-8 opacity-[0.08]"
              >
                <Quote className="h-28 w-28 text-electric" />
              </div>
              <blockquote className="relative max-w-md font-display text-lg font-medium leading-snug tracking-tight text-balance">
                {profile.bioShort}
              </blockquote>
              <figcaption className="relative mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <span className="gradient-border grid h-7 w-7 place-items-center rounded-md bg-card text-[0.6rem] font-bold text-gradient-brand">
                  {profile.initials}
                </span>
                {profile.firstName} · {profile.location.split("·")[0]?.trim()}
              </figcaption>
            </figure>
          </Reveal>

          {/* Strengths / focus chips */}
          <Reveal delay={0.16}>
            <div className="mt-8">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                What I care about
              </h3>
              <StaggerGroup className="mt-4 flex flex-wrap gap-2.5" stagger={0.06}>
                {interests.map((interest, i) => (
                  <motion.span key={interest} variants={staggerItem}>
                    <Badge
                      variant={i % 2 === 0 ? "electric" : "violet"}
                      className="cursor-default transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          i % 2 === 0 ? "bg-electric" : "bg-violet",
                        )}
                      />
                      {interest}
                    </Badge>
                  </motion.span>
                ))}
              </StaggerGroup>
            </div>
          </Reveal>
        </div>

        {/* ── Values column ────────────────────────────────────────── */}
        <div className="lg:col-span-7">
          <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.09}>
            {values.map((value, i) => {
              const Icon = VALUE_ICONS[value.icon] ?? Layers;
              const accent = i % 2 === 0 ? "electric" : "violet";

              return (
                <motion.div key={value.title} variants={staggerItem} className="h-full">
                  <SpotlightCard
                    accent={accent}
                    className="flex h-full flex-col p-6 shadow-card"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "grid h-11 w-11 place-items-center rounded-xl border bg-card/60 transition-colors duration-300",
                          accent === "electric"
                            ? "border-electric/25 text-electric group-hover:border-electric/50"
                            : "border-violet/25 text-violet group-hover:border-violet/50",
                        )}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground/60">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </Section>
  );
}
