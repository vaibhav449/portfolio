"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Lock,
  Search,
  SearchX,
  Sparkles,
  X,
} from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/resume";
import {
  Badge,
  Button,
  Reveal,
  SectionHeading,
  Section,
  SpotlightCard,
  TiltCard,
} from "@/components/ui";
import { SocialIcon } from "@/components/icons/BrandIcons";
import { useLockBody } from "@/hooks/useLockBody";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Accent presets — derive every visual from the project's accent.     */
/* ------------------------------------------------------------------ */

type Accent = Project["accent"];

const accentMap: Record<
  Accent,
  {
    text: string;
    badge: "electric" | "violet";
    cover: string; // gradient wash on the generated cover
    blob: string; // soft glow blob color
    ring: string; // focus / hover ring tint
  }
> = {
  electric: {
    text: "text-electric",
    badge: "electric",
    cover:
      "from-electric/30 via-electric/[0.06] to-transparent",
    blob: "bg-electric/25",
    ring: "group-hover:border-electric/40",
  },
  violet: {
    text: "text-violet",
    badge: "violet",
    cover:
      "from-violet/30 via-violet/[0.06] to-transparent",
    blob: "bg-violet/25",
    ring: "group-hover:border-violet/40",
  },
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Compact monogram from a project name, e.g. "AI Shopping Assistant" → "AS". */
function initialsOf(name: string): string {
  const parts = name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "·";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

/* ------------------------------------------------------------------ */
/* Generated cover — no image files, pure gradient + pattern.          */
/* ------------------------------------------------------------------ */

function ProjectCover({ project, index }: { project: Project; index: number }) {
  const a = accentMap[project.accent];
  const pattern = index % 2 === 0 ? "bg-grid-pattern" : "bg-dot-pattern";
  const patternSize =
    index % 2 === 0 ? "[background-size:28px_28px]" : "[background-size:20px_20px]";

  return (
    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl border border-border bg-card">
      {/* accent wash */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          a.cover,
        )}
      />
      {/* pattern overlay, faded toward the bottom */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 opacity-60 mask-fade-b",
          pattern,
          patternSize,
        )}
      />
      {/* soft glow blob, offset per card for distinctness */}
      <div
        aria-hidden
        className={cn(
          "absolute -right-10 -top-12 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-90",
          a.blob,
          index % 2 === 0 ? "opacity-70" : "opacity-50",
        )}
      />
      {/* giant mono monogram watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 right-3 select-none font-display text-[6rem] font-bold leading-none tracking-tighter text-foreground/[0.06] sm:text-[7rem]"
      >
        {initialsOf(project.name)}
      </span>

      {/* top row: category + year */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <Badge variant={a.badge}>
          <Sparkles className="h-3 w-3" />
          {project.category}
        </Badge>
        <span className="font-mono text-xs tracking-widest text-muted-foreground">
          {project.year}
        </span>
      </div>

      {/* foreground monogram chip */}
      <div className="absolute bottom-4 left-4 flex items-center gap-3">
        <span
          className={cn(
            "gradient-border grid h-11 w-11 place-items-center rounded-xl bg-card/70 font-display text-sm font-bold backdrop-blur",
            "text-gradient-brand",
          )}
        >
          {initialsOf(project.name)}
        </span>
        {project.featured && (
          <Badge variant="outline" className="backdrop-blur">
            Featured
          </Badge>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Metric tile                                                         */
/* ------------------------------------------------------------------ */

function MetricTile({
  metric,
  accent,
}: {
  metric: Project["metrics"][number];
  accent: Accent;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 px-3 py-2.5">
      <div
        className={cn(
          "font-display text-lg font-semibold leading-tight",
          accentMap[accent].text,
        )}
      >
        {metric.value}
      </div>
      <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
        {metric.label}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stack chips                                                         */
/* ------------------------------------------------------------------ */

function StackChips({ stack, max = 5 }: { stack: string[]; max?: number }) {
  const shown = stack.slice(0, max);
  const extra = stack.length - shown.length;
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((s) => (
        <Badge key={s} variant="default">
          {s}
        </Badge>
      ))}
      {extra > 0 && (
        <Badge variant="outline" className="text-muted-foreground">
          +{extra}
        </Badge>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card links row                                                      */
/* ------------------------------------------------------------------ */

function LinksRow({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  if (project.isPrivate) {
    return (
      <Badge variant="success" className={cn("gap-1.5", className)}>
        <Lock className="h-3 w-3" />
        Production · Private
      </Badge>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {project.links.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          aria-label={`${project.name} source on GitHub`}
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground transition-colors hover:border-electric/40 hover:text-electric"
        >
          <SocialIcon icon="github" className="h-4 w-4" />
        </a>
      )}
      {project.links.demo && (
        <a
          href={project.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          aria-label={`${project.name} live demo`}
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground transition-colors hover:border-electric/40 hover:text-electric"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Project card                                                        */
/* ------------------------------------------------------------------ */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.25, ease: EASE },
  },
};

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-full"
    >
      <TiltCard intensity={6} className="h-full">
        <SpotlightCard
          accent={project.accent}
          role="button"
          tabIndex={0}
          aria-label={`View details for ${project.name}`}
          onClick={() => onOpen(project)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpen(project);
            }
          }}
          className={cn(
            "flex h-full cursor-pointer flex-col gap-5 p-4 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-5",
            accentMap[project.accent].ring,
          )}
        >
          <ProjectCover project={project} index={index} />

          {/* title + tagline */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {project.name}
              </h3>
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{project.tagline}</p>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
              {project.role}
            </p>
          </div>

          {/* metrics 2x2 */}
          <div className="grid grid-cols-2 gap-2">
            {project.metrics.slice(0, 4).map((m) => (
              <MetricTile key={m.label} metric={m} accent={project.accent} />
            ))}
          </div>

          {/* stack */}
          <StackChips stack={project.stack} />

          {/* footer */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onOpen(project);
              }}
            >
              View details
              <ArrowUpRight className="h-4 w-4" />
            </Button>
            <LinksRow project={project} />
          </div>
        </SpotlightCard>
      </TiltCard>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Detail modal                                                        */
/* ------------------------------------------------------------------ */

function DetailBlock({
  label,
  children,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  accent: Accent;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <div
        className={cn(
          "mb-1.5 font-mono text-[11px] uppercase tracking-widest",
          accentMap[accent].text,
        )}
      >
        {label}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = React.useRef<HTMLButtonElement>(null);
  useLockBody(true);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Move focus into the dialog for keyboard users.
    const t = window.setTimeout(() => closeRef.current?.focus(), 40);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [onClose]);

  const a = accentMap[project.accent];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* scrim */}
      <motion.div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={{ duration: 0.25 }}
      />

      {/* panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} details`}
        data-lenis-prevent
        className="glass-strong relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border-border shadow-card-hover sm:rounded-3xl"
        variants={{
          hidden: { opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.98 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.35, ease: EASE },
          },
        }}
      >
        {/* header cover */}
        <div className="relative shrink-0 border-b border-border">
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              a.cover,
            )}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-grid-pattern opacity-40 [background-size:26px_26px] mask-fade-b"
          />
          <div className="relative flex items-start justify-between gap-4 p-5 sm:p-6">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={a.badge}>{project.category}</Badge>
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  {project.year}
                </span>
                <span className="font-mono text-xs tracking-widest text-muted-foreground/70">
                  · {project.role}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {project.name}
              </h3>
              <p className="max-w-lg text-sm text-muted-foreground">
                {project.tagline}
              </p>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close details"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-card/60 text-muted-foreground backdrop-blur transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* scrollable body */}
        <div className="no-scrollbar flex-1 space-y-6 overflow-y-auto p-5 sm:p-6">
          <p className="text-pretty text-sm leading-relaxed text-foreground/90">
            {project.description}
          </p>

          {/* problem / challenge / lesson */}
          <div className="grid gap-3 sm:grid-cols-3">
            <DetailBlock label="Problem" accent={project.accent}>
              {project.problem}
            </DetailBlock>
            <DetailBlock label="Challenge" accent={project.accent}>
              {project.challenge}
            </DetailBlock>
            <DetailBlock label="Lesson" accent={project.accent}>
              {project.lesson}
            </DetailBlock>
          </div>

          {/* metrics */}
          <div>
            <h4 className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              By the numbers
            </h4>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {project.metrics.map((m) => (
                <MetricTile key={m.label} metric={m} accent={project.accent} />
              ))}
            </div>
          </div>

          {/* highlights */}
          <div>
            <h4 className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Highlights
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed">
                  <span
                    aria-hidden
                    className={cn(
                      "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                      project.accent === "violet"
                        ? "bg-violet"
                        : "bg-electric",
                    )}
                  />
                  <span className="text-muted-foreground">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* stack */}
          <div>
            <h4 className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Stack
            </h4>
            <StackChips stack={project.stack} max={project.stack.length} />
          </div>
        </div>

        {/* footer actions */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border p-4 sm:p-5">
          <LinksRow project={project} />
          {project.links.demo ? (
            <Button href={project.links.demo} target="_blank" size="sm">
              Live demo
              <ExternalLink className="h-4 w-4" />
            </Button>
          ) : project.links.github ? (
            <Button
              href={project.links.github}
              target="_blank"
              variant="outline"
              size="sm"
            >
              View source
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          ) : (
            <span className="text-xs text-muted-foreground">
              Closed-source · shipped in production
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Projects() {
  const [category, setCategory] = React.useState<string>("All");
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState<Project | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const inCategory = category === "All" || p.category === category;
      if (!inCategory) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.tagline,
        p.description,
        ...p.stack,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [category, query]);

  return (
    <Section id="projects">
      <SectionHeading
        kicker="Selected Work"
        index="04"
        title={
          <>
            Systems I&apos;ve shipped,{" "}
            <span className="text-gradient-brand">end to end.</span>
          </>
        }
        description="Production AI systems and multi-tenant SaaS — filtered by domain, searchable by stack. Open any card for the problem, the hard part, and what I learned."
      />

      {/* Controls */}
      <Reveal delay={0.05} className="mt-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* filter pills */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="no-scrollbar -mx-1 flex items-center gap-1.5 overflow-x-auto px-1 pb-1"
          >
            {projectCategories.map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "text-background"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="projectFilterPill"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>

          {/* search field */}
          <div className="group relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-electric" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or stack…"
              aria-label="Search projects"
              className="glass h-11 w-full rounded-full pl-10 pr-10 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-electric/40 focus:shadow-glow"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </Reveal>

      {/* Grid / empty state */}
      <motion.div layout className="mt-8">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 gap-5 lg:grid-cols-2"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <ProjectCard
                    key={p.slug}
                    project={p}
                    index={i}
                    onOpen={setActive}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/30 px-6 py-20 text-center"
            >
              <div className="gradient-border grid h-14 w-14 place-items-center rounded-2xl bg-card">
                <SearchX className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1.5">
                <p className="font-display text-lg font-semibold">
                  Nothing matches that yet
                </p>
                <p className="mx-auto max-w-sm text-sm text-muted-foreground">
                  No projects in{" "}
                  <span className="text-foreground">{category}</span>
                  {query && (
                    <>
                      {" "}
                      for “<span className="text-foreground">{query}</span>”
                    </>
                  )}
                  . Try another category or clear your search.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
              >
                Reset filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </Section>
  );
}
