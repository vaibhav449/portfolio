"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  Check,
  MapPin,
} from "lucide-react";
import { experiences } from "@/data/resume";
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

/** Build a 2-letter monogram from a company name ("Setubridge Technolabs" → "ST"). */
function monogram(company: string): string {
  const words = company.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "•";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Experience — an interactive vertical timeline.
 * A gradient rail runs down the left edge; its fill grows as the section
 * scrolls into view, with a glowing node per role. Each entry is a rich
 * spotlight card: monogram tile, role/company/period, summary, an animated
 * checked impact list, and the stack as chips.
 */
export function Experience() {
  const reduce = useReducedMotion();
  const railRef = React.useRef<HTMLDivElement>(null);

  // Progress of the rail fill, keyed to the timeline's scroll position.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.7", "end 0.4"],
  });
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="experience">
      <SectionHeading
        kicker="Experience"
        index="03"
        title={
          <>
            Shipping production systems,{" "}
            <span className="text-gradient-brand">not prototypes</span>.
          </>
        }
        description="Where the résumé bullets became real traffic. A hands-on record of building, owning, and running software that merchants actually depend on."
      />

      <div ref={railRef} className="relative mt-14 sm:mt-20">
        {/* Rail track */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-4 left-[19px] top-3 w-px bg-border sm:left-[27px]"
        />
        {/* Rail fill — grows with scroll */}
        <motion.div
          aria-hidden
          style={{ scaleY: reduce ? 1 : fillScale }}
          className="pointer-events-none absolute bottom-4 left-[19px] top-3 w-px origin-top bg-gradient-to-b from-electric via-violet to-transparent sm:left-[27px]"
        />

        <ol className="space-y-14 sm:space-y-16">
          {experiences.map((exp, i) => (
            <li key={`${exp.company}-${exp.role}`} className="relative pl-12 sm:pl-20">
              {/* Timeline node */}
              <motion.span
                aria-hidden
                initial={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={
                  reduce
                    ? { duration: 0.3 }
                    : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                }
                className="absolute left-[13px] top-2 grid h-3.5 w-3.5 place-items-center rounded-full sm:left-[21px]"
              >
                <span className="absolute inset-0 rounded-full bg-brand-gradient shadow-glow" />
                {exp.current && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-electric/60" />
                )}
                <span className="relative h-1.5 w-1.5 rounded-full bg-background" />
              </motion.span>

              <Reveal delay={i * 0.05}>
                <SpotlightCard
                  accent={exp.current ? "violet" : "electric"}
                  className="shadow-card"
                >
                  <div className="flex flex-col gap-6 p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-4">
                        {/* Monogram tile */}
                        <span
                          aria-hidden
                          className="gradient-border grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-card font-display text-base font-bold text-gradient-brand sm:h-14 sm:w-14 sm:text-lg"
                        >
                          {monogram(exp.company)}
                        </span>

                        <div className="min-w-0">
                          <h3 className="text-balance font-display text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                            {exp.role}
                          </h3>
                          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5 font-medium text-foreground/90">
                              <Briefcase className="h-3.5 w-3.5 text-electric" />
                              {exp.company}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Period + status */}
                      <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {exp.period}
                        </span>
                        {exp.current && (
                          <Badge
                            variant="success"
                            className="gap-1.5 font-mono uppercase tracking-wider"
                          >
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            </span>
                            Now
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {exp.summary}
                    </p>

                    {/* Highlights */}
                    <div className="border-t border-border pt-6">
                      <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-electric">
                        Key impact
                      </h4>
                      <StaggerGroup stagger={0.09} className="grid gap-3.5">
                        {exp.highlights.map((h, hi) => (
                          <motion.div
                            key={hi}
                            variants={staggerItem}
                            className="group/hl flex items-start gap-3"
                          >
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-electric/25 bg-electric/10 text-electric transition-colors group-hover/hl:border-electric/50">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            <p className="text-pretty text-sm leading-relaxed text-foreground/85">
                              {h}
                            </p>
                          </motion.div>
                        ))}
                      </StaggerGroup>
                    </div>

                    {/* Stack */}
                    <div className="flex flex-wrap items-center gap-2 border-t border-border pt-6">
                      <span className="mr-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Stack
                      </span>
                      {exp.stack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className={cn(
                            "bg-muted/40 transition-colors hover:border-electric/40 hover:text-electric",
                          )}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Rail terminus — a soft "you are here / journey continues" cap */}
        <Reveal
          delay={0.1}
          className="relative mt-2 pl-12 text-sm text-muted-foreground sm:pl-20"
        >
          <span
            aria-hidden
            className="absolute left-[15px] top-1.5 h-2 w-2 rounded-full bg-border sm:left-[23px]"
          />
          <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
            The next chapter is being written
            <ArrowUpRight className="h-3.5 w-3.5 text-electric" />
          </span>
        </Reveal>
      </div>
    </Section>
  );
}
