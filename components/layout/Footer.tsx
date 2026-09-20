"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { navLinks, profile, socials } from "@/data/resume";
import { SocialIcon } from "@/components/icons/BrandIcons";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";

/** Footer — elegant, minimal sign-off with quick links + socials. */
export function Footer() {
  const year = 2026; // static to avoid hydration drift; bump as needed

  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Giant watermark name */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-2.5rem] select-none text-center font-display text-[22vw] font-bold leading-none text-foreground/[0.03] sm:bottom-[-4rem]"
      >
        {profile.firstName}
      </div>

      <div className="container relative z-10 py-16">
        <Reveal className="flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
            <div className="max-w-sm">
              <a href="#hero" className="flex items-center gap-2">
                <span className="gradient-border grid h-9 w-9 place-items-center rounded-lg bg-card font-display text-sm font-bold text-gradient-brand">
                  {profile.initials}
                </span>
                <span className="font-display text-lg font-semibold">
                  {profile.name}
                </span>
              </a>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {profile.tagline}
              </p>
              <div className="mt-5 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs text-muted-foreground">
                  {profile.availability}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:gap-16">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Navigate
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-foreground/80 transition-colors hover:text-electric"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  Connect
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm text-foreground/80 transition-colors hover:text-electric"
                      >
                        {s.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">
              © {year} {profile.name}. Designed & built with Next.js, Tailwind
              &amp; Framer Motion.
            </p>
            <div className="flex items-center gap-2">
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
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
