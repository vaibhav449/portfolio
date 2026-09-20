"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Command as CommandIcon } from "lucide-react";
import { navLinks, profile } from "@/data/resume";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLockBody } from "@/hooks/useLockBody";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

/**
 * Navbar — a floating glass pill that condenses on scroll, highlights the
 * active section with a shared-layout pill, and exposes the ⌘K launcher.
 */
export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const active = useActiveSection(["hero", ...sectionIds]);
  const { scrollY } = useScroll();
  useLockBody(menuOpen);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  const openPalette = () =>
    window.dispatchEvent(new CustomEvent("open-command-palette"));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border px-3 py-2 transition-all duration-500",
            scrolled
              ? "glass-strong border-border shadow-card"
              : "border-transparent bg-transparent",
          )}
        >
          {/* Brand */}
          <a
            href="#hero"
            className="group flex items-center gap-2 rounded-full px-2 py-1"
            aria-label="Home"
          >
            <span className="gradient-border grid h-8 w-8 place-items-center rounded-lg bg-card font-display text-sm font-bold text-gradient-brand">
              {profile.initials}
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
              {profile.firstName}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-muted"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Open command palette"
              className="hidden items-center gap-2 rounded-full border border-border bg-card/50 py-1.5 pl-3 pr-2 text-xs text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground sm:flex"
            >
              <CommandIcon className="h-3.5 w-3.5" />
              <span className="font-mono">⌘K</span>
            </button>
            <ThemeToggle className="hidden h-9 w-9 sm:grid" />
            <Magnetic strength={0.4} className="hidden md:inline-flex">
              <Button href="#contact" size="sm" variant="default">
                Let&apos;s talk
              </Button>
            </Magnetic>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card/50 text-foreground md:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-4 mt-24 flex flex-col gap-1 rounded-3xl border border-border bg-card p-4 shadow-card"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-lg font-medium text-foreground/90 hover:bg-muted"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-border pt-4">
                <ThemeToggle />
                <Button href="#contact" size="sm" onClick={() => setMenuOpen(false)}>
                  Let&apos;s talk
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
