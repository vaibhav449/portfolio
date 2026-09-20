"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, MapPin, Sparkles } from "lucide-react";

import { profile, socials, stats } from "@/data/resume";
import { AnimatedCounter, Button, Magnetic, Section } from "@/components/ui";
import { SocialIcon } from "@/components/icons/BrandIcons";
import { GridBackground } from "@/components/effects/Backgrounds";

const github = socials.find((s) => s.icon === "github");

/* ------------------------------------------------------------------ */
/* Inline typewriter — cycles through profile.roles.                   */
/* ------------------------------------------------------------------ */

function useTypewriter(words: readonly string[]) {
  const reduce = useReducedMotion();
  const [text, setText] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (reduce) return;

    const current = words[index % words.length];
    const done = text === current;
    const empty = text === "";

    let delay = deleting ? 45 : 85;
    if (done && !deleting) delay = 1600; // pause on a completed word
    if (empty && deleting) delay = 350; // pause before the next word

    const t = setTimeout(() => {
      if (!deleting && done) {
        setDeleting(true);
        return;
      }
      if (deleting && empty) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
        return;
      }
      setText(
        deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1),
      );
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, words, reduce]);

  return reduce ? words[0] : text;
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <Section
      id="hero"
      container={false}
      className="isolate flex min-h-screen flex-col justify-center overflow-hidden py-28 sm:py-32 lg:py-32"
    >
      {/* ── Ambient background — quiet, intentional ─────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GridBackground className="opacity-50" />
        {/* Soft neutral top light (no color). */}
        <div className="absolute inset-0 bg-brand-radial" />
        {/* Bottom fade so the section melts into the next block. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* ── Left: copy ───────────────────────────────────────── */}
          <div className="flex flex-col items-start">
            {/* Availability pill */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="glass group inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono">{profile.availability}</span>
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </motion.a>

            {/* Headline */}
            <h1 className="mt-6 text-balance font-display text-fluid-2xl font-semibold leading-[0.95] tracking-tight md:text-fluid-3xl">
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="block text-muted-foreground/90"
              >
                Hi, I&apos;m
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                className="block text-gradient-brand"
              >
                {profile.name}
              </motion.span>
            </h1>

            {/* Typing role */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
              className="mt-5 flex flex-wrap items-baseline gap-x-2 font-mono text-fluid-lg text-foreground"
              aria-label={`I'm a ${profile.roles.join(", ")}`}
            >
              <span className="text-muted-foreground">I&apos;m a</span>
              <span className="inline-flex items-baseline">
                <span className="text-electric" aria-live="polite">
                  {typed}
                </span>
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] animate-blink bg-electric"
                />
              </span>
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
              className="mt-6 max-w-xl text-pretty text-fluid-base leading-relaxed text-muted-foreground"
            >
              {profile.tagline}
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button
                  href={profile.resumeUrl}
                  download={profile.resumeFileName}
                  size="lg"
                  className="group"
                >
                  <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  Download Résumé
                </Button>
              </Magnetic>

              {github && (
                <Magnetic>
                  <Button
                    href={github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="lg"
                  >
                    <SocialIcon icon={github.icon} className="h-4 w-4" />
                    GitHub
                  </Button>
                </Magnetic>
              )}

              <Magnetic>
                <Button href="#contact" variant="ghost" size="lg" className="group">
                  Get in touch
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Magnetic>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
              className="mt-8 flex items-center gap-2"
            >
              {socials.map((s) => (
                <Magnetic key={s.label} strength={0.5}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground transition-colors hover:border-electric/40 hover:text-electric"
                  >
                    <SocialIcon icon={s.icon} className="h-4 w-4" />
                  </a>
                </Magnetic>
              ))}
            </motion.div>
          </div>

          {/* ── Right: abstract portrait card ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          >
            <div className="gradient-border rounded-3xl bg-card/40 p-1.5 shadow-card backdrop-blur">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-background/60">
                {/* Radial glow behind the monogram */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-brand-radial opacity-80"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-3xl"
                />
                <GridBackground className="opacity-40" />

                <div className="relative flex aspect-[4/5] flex-col justify-between p-6">
                  {/* Top chip */}
                  <div className="flex items-center justify-between">
                    <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono text-muted-foreground">
                      <MapPin className="h-3 w-3 text-electric" />
                      {profile.location}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      <Sparkles className="h-3 w-3 text-violet" />
                      {profile.initials}
                    </span>
                  </div>

                  {/* Giant monogram */}
                  <div className="grid flex-1 place-items-center">
                    <span className="select-none font-display text-[40vw] font-bold leading-none text-gradient-brand sm:text-[16rem] lg:text-[13rem]">
                      {profile.initials}
                    </span>
                  </div>

                  {/* Bottom note */}
                  <div className="glass flex items-center justify-between rounded-2xl px-4 py-3">
                    <div>
                      <p className="font-display text-sm font-semibold text-foreground">
                        {profile.title}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        Currently @ Setubridge Technolabs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Stats strip ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
          className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-20 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5 backdrop-blur transition-colors duration-300 hover:border-electric/30"
            >
              <div className="font-display text-fluid-lg font-semibold tracking-tight text-foreground">
                <AnimatedStat stat={stat} />
              </div>
              <div className="mt-1 text-sm font-medium text-foreground/90">
                {stat.label}
              </div>
              <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                {stat.hint}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────── */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="group absolute inset-x-0 bottom-6 mx-auto flex w-fit flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-border pt-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-electric"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* AnimatedCounter wrapper — starts counting on mount (above the fold) */
/* ------------------------------------------------------------------ */

function AnimatedStat({ stat }: { stat: (typeof stats)[number] }) {
  return (
    <span className="inline-flex items-baseline">
      <AnimatedCounter
        value={stat.value}
        prefix={stat.prefix}
        suffix={stat.suffix}
        className="text-gradient-brand"
      />
    </span>
  );
}
