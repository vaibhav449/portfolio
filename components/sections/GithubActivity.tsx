"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star, GitFork, ArrowUpRight, BookMarked } from "lucide-react";
import type { GitHubRepo, GitHubUser } from "@/lib/github";
import { githubUsername, socials } from "@/data/resume";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, staggerItem } from "@/components/ui/Reveal";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Badge } from "@/components/ui/Badge";
import { GitHubIcon, LeetCodeIcon } from "@/components/icons/BrandIcons";
import { cn } from "@/lib/utils";

/** A small, well-known set of language → color mappings for repo dots. */
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
};

const leetcodeSocial = socials.find((s) => s.icon === "leetcode");
const leetcodeHandle = leetcodeSocial?.handle ?? githubUsername;
const leetcodeUrl = leetcodeSocial?.href ?? `https://leetcode.com/u/${leetcodeHandle}/`;

/**
 * GithubActivity — live open-source presence: profile stats, a contribution
 * heatmap, the latest repositories, and a LeetCode card. Data is fetched on
 * the server (ISR) and passed in; renders a graceful fallback when the API
 * is unavailable.
 */
export function GithubActivity({
  repos,
  user,
}: {
  repos: GitHubRepo[];
  user: GitHubUser | null;
}) {
  const stats = [
    { label: "Repositories", value: user?.public_repos ?? 0 },
    { label: "Followers", value: user?.followers ?? 0 },
    { label: "Following", value: user?.following ?? 0 },
  ];

  return (
    <Section id="github">
      <SectionHeading
        kicker="Open Source"
        index="05"
        title={
          <>
            Live from my <span className="text-gradient-brand">workbench</span>
          </>
        }
        description="A real-time window into what I'm building and solving — pulled straight from GitHub & LeetCode."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-12">
        {/* Profile + stats */}
        <Reveal className="lg:col-span-5">
          <SpotlightCard accent="violet" className="h-full p-7">
            <div className="flex items-center gap-4">
              <div className="gradient-border grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-card">
                <GitHubIcon className="h-6 w-6 text-foreground" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-semibold">
                  {user?.name ?? "Vaibhav Chaubey"}
                </p>
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-sm text-muted-foreground transition-colors hover:text-electric"
                >
                  @{githubUsername}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {user?.bio && (
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {user.bio}
              </p>
            )}

            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-background/40 p-3 text-center"
                >
                  <div className="font-display text-2xl font-semibold text-foreground">
                    <AnimatedCounter value={s.value} />
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Contribution heatmap (external, cached image) */}
            <div className="mt-6">
              <p className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                Contribution graph
              </p>
              <div className="overflow-hidden rounded-xl border border-border bg-background/40 p-3">
                {/* ghchart renders an SVG heatmap; falls back to alt text. */}
                <img
                  src={`https://ghchart.rshah.org/3b82f6/${githubUsername}`}
                  alt={`${githubUsername}'s GitHub contribution graph`}
                  loading="lazy"
                  className="w-full"
                />
              </div>
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Latest repositories */}
        <div className="lg:col-span-7">
          {repos.length > 0 ? (
            <StaggerGroup className="grid h-full gap-4 sm:grid-cols-2">
              {repos.map((repo) => (
                <motion.a
                  key={repo.id}
                  variants={staggerItem}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-2xl border border-border bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-glow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-foreground">
                      <BookMarked className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate font-medium">{repo.name}</span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-electric" />
                  </div>

                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
                    {repo.description ?? "No description provided."}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              LANG_COLORS[repo.language] ?? "#8b8b8b",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" /> {repo.forks_count}
                    </span>
                  </div>
                </motion.a>
              ))}
            </StaggerGroup>
          ) : (
            <RepoFallback />
          )}
        </div>

        {/* LeetCode card */}
        <Reveal className="lg:col-span-12">
          <SpotlightCard accent="electric" className="p-7">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#FFA116]/30 bg-[#FFA116]/10">
                  <LeetCodeIcon className="h-6 w-6 text-[#FFA116]" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold">
                    LeetCode & Competitive Programming
                  </p>
                  <p className="text-sm text-muted-foreground">
                    200+ problems solved across LeetCode, HackerRank &amp; GeeksforGeeks.
                  </p>
                </div>
              </div>
              <a
                href={leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start md:self-auto"
              >
                <Badge variant="electric" className="transition-colors hover:border-electric/60">
                  <span className="font-mono">@{leetcodeHandle}</span>
                </Badge>
              </a>
            </div>
            <a
              href={leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open LeetCode profile"
              className="mt-6 block overflow-hidden rounded-xl border border-border bg-background/40 p-3 transition-colors hover:border-foreground/20"
            >
              {/* External LeetCard SVG; graceful alt fallback if unavailable. */}
              <img
                src={`https://leetcard.jacoblin.cool/${leetcodeHandle}?theme=dark&font=Space%20Grotesk&ext=heatmap&border=0&radius=12`}
                alt="LeetCode statistics"
                loading="lazy"
                className="mx-auto w-full max-w-2xl"
              />
            </a>
          </SpotlightCard>
        </Reveal>
      </div>
    </Section>
  );
}

function RepoFallback() {
  return (
    <div className={cn("grid h-full place-items-center rounded-2xl border border-dashed border-border bg-card/30 p-10 text-center")}>
      <div>
        <GitHubIcon className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">
          Live repositories are taking a break (GitHub rate limit).
        </p>
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-electric hover:underline"
        >
          Browse on GitHub <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
