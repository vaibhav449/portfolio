"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code,
  Cpu,
  Rocket,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { achievements, interests, socials, stats } from "@/data/resume";
import {
  AnimatedCounter,
  Badge,
  Reveal,
  Section,
  SectionHeading,
  SpotlightCard,
  StaggerGroup,
  staggerItem,
} from "@/components/ui";
import { SocialIcon } from "@/components/icons/BrandIcons";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

/* Map the string icon names on each achievement to real lucide glyphs. */
const iconMap: Record<string, LucideIcon> = {
  Trophy,
  Code,
  Cpu,
  Rocket,
  Target,
  Sparkles,
};

/* Alternate the accent glow across the card grid for rhythm. */
const accents = ["electric", "violet"] as const;

/**
 * Splits a display metric like "200+", "~55%", "3 svc" or "80K" into the
 * pieces AnimatedCounter needs. Falls back to a plain string when there is
 * no leading number to animate.
 */
function parseMetric(metric: string): {
  numeric: boolean;
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
} {
  const match = metric.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { numeric: false, prefix: "", value: 0, suffix: metric, decimals: 0 };
  }
  const [, prefix, digits, suffix] = match;
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  return {
    numeric: true,
    prefix,
    value: Number(digits),
    suffix,
    decimals,
  };
}

function Metric({ metric }: { metric: string }) {
  const { numeric, prefix, value, suffix, decimals } = parseMetric(metric);

  const className =
    "font-display text-5xl font-bold leading-none tracking-tight text-gradient-brand sm:text-6xl";

  if (!numeric) {
    return <span className={className}>{metric}</span>;
  }

  return (
    <AnimatedCounter
      value={value}
      prefix={prefix}
      suffix={suffix}
      decimals={decimals}
      className={className}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Coding profile card                                                 */
/* ------------------------------------------------------------------ */

function ProfileCard({
  icon,
  label,
  handle,
  meta,
  href,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  handle: string;
  meta: string;
  href: string;
  accent: "electric" | "violet";
}) {
  return (
    <Magnetic strength={0.25} className="w-full">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} — ${handle}`}
        className={cn(
          "group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-card",
        )}
      >
        <span
          className={cn(
            "grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-background transition-colors duration-300",
            accent === "violet"
              ? "text-violet group-hover:border-violet/40"
              : "text-electric group-hover:border-electric/40",
          )}
        >
          {icon}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-sm font-semibold text-foreground">
            {label}
          </span>
          <span className="block truncate font-mono text-xs text-muted-foreground">
            {meta}
          </span>
        </span>

        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          aria-hidden
        />
      </a>
    </Magnetic>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Achievements() {
  const github = socials.find((s) => s.icon === "github");
  const leetcode = socials.find((s) => s.icon === "leetcode");

  return (
    <Section id="achievements">
      <SectionHeading
        kicker="Milestones"
        index="06"
        title={
          <>
            Numbers that survived{" "}
            <span className="text-gradient-brand">production.</span>
          </>
        }
        description="Not vanity metrics — outcomes shipped in live systems, measured to the microdollar and the millisecond."
      />

      {/* Achievement cards — the hero numbers */}
      <StaggerGroup
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2"
        stagger={0.1}
      >
        {achievements.map((a, i) => {
          const Icon = iconMap[a.icon] ?? Sparkles;
          const accent = accents[i % accents.length];
          return (
            <motion.div key={a.title} variants={staggerItem}>
              <SpotlightCard
                accent={accent}
                className="h-full p-6 sm:p-8"
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <motion.span
                      whileHover={{ rotate: -6, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 320, damping: 18 }}
                      className={cn(
                        "grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-background",
                        accent === "violet" ? "text-violet" : "text-electric",
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </motion.span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-8">
                    <Metric metric={a.metric} />
                  </div>

                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {a.detail}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </StaggerGroup>

      {/* Coding profiles */}
      <Reveal className="mt-16" delay={0.05}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Coding Profiles
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {github && (
            <ProfileCard
              icon={<SocialIcon icon={github.icon} className="h-5 w-5" />}
              label="GitHub"
              handle={github.handle}
              meta={`@${github.handle}`}
              href={github.href}
              accent="electric"
            />
          )}
          {leetcode && (
            <ProfileCard
              icon={<SocialIcon icon={leetcode.icon} className="h-5 w-5" />}
              label="LeetCode"
              handle={leetcode.handle}
              meta={`@${leetcode.handle}`}
              href={leetcode.href}
              accent="violet"
            />
          )}

          {/* DSA highlight */}
          <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-electric/25 bg-electric/[0.06] p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-electric/30 bg-background text-electric">
              <Code className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-2xl font-bold leading-none text-gradient-brand">
                <AnimatedCounter value={200} suffix="+" />
              </span>
              <span className="mt-1 block font-mono text-xs uppercase tracking-wider text-muted-foreground">
                DSA problems solved
              </span>
            </span>
          </div>
        </div>
      </Reveal>

      {/* Stat recap band + focus areas */}
      <Reveal className="mt-14" delay={0.05}>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-1 bg-card/60 p-6 text-center"
            >
              <span className="font-display text-3xl font-bold tracking-tight text-electric">
                <AnimatedCounter
                  value={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                />
              </span>
              <span className="text-xs font-medium text-foreground">
                {s.label}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {s.hint}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Focus
          </span>
          {interests.map((interest) => (
            <Badge key={interest} variant="outline">
              {interest}
            </Badge>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
