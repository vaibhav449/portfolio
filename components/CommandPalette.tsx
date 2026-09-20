"use client";

import * as React from "react";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Copy,
  FileText,
  Home,
  Moon,
  Sun,
  Command as CommandIcon,
} from "lucide-react";
import type Lenis from "lenis";
import { navLinks, profile, socials } from "@/data/resume";
import { SocialIcon } from "@/components/icons/BrandIcons";
import { useLockBody } from "@/hooks/useLockBody";

/** Smoothly scroll to an in-page anchor via Lenis when available. */
function scrollToId(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth" });
}

/**
 * CommandPalette — a Raycast-style ⌘K launcher for navigation, links and
 * actions. Opens on ⌘/Ctrl+K, "/" or a custom `open-command-palette` event
 * (dispatched by the navbar button).
 */
export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  useLockBody(open);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "/" && !isTyping(e)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const openEvt = () => setOpen(true);
    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", openEvt);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", openEvt);
    };
  }, []);

  const run = React.useCallback((fn: () => void) => {
    setOpen(false);
    // Wait for the dialog to unmount before scrolling/acting.
    setTimeout(fn, 120);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh] sm:pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Scrim */}
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl"
          >
            <Command
              label="Command Menu"
              className="glass-strong overflow-hidden rounded-2xl shadow-card-hover"
              loop
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <CommandIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  autoFocus
                  placeholder="Search sections, links, actions…"
                  className="h-14 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[min(60vh,400px)] overflow-y-auto overscroll-contain p-2">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="cmdk-group">
                  <Item
                    onSelect={() => run(() => scrollToId("#hero"))}
                    icon={<Home className="h-4 w-4" />}
                    label="Home"
                  />
                  {navLinks.map((link) => (
                    <Item
                      key={link.href}
                      onSelect={() => run(() => scrollToId(link.href))}
                      icon={<span className="text-xs text-electric">#</span>}
                      label={link.label}
                    />
                  ))}
                </Command.Group>

                <Command.Group heading="Actions" className="cmdk-group">
                  <Item
                    onSelect={() =>
                      run(() => {
                        navigator.clipboard.writeText(profile.email);
                        toast.success("Email copied to clipboard");
                      })
                    }
                    icon={<Copy className="h-4 w-4" />}
                    label="Copy email address"
                    hint={profile.email}
                  />
                  <Item
                    onSelect={() =>
                      run(() => {
                        // Trigger a real file download (not an inline PDF view).
                        const a = document.createElement("a");
                        a.href = profile.resumeUrl;
                        a.download = profile.resumeFileName;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                      })
                    }
                    icon={<FileText className="h-4 w-4" />}
                    label="Download résumé"
                  />
                  <Item
                    onSelect={() =>
                      run(() =>
                        setTheme(resolvedTheme === "dark" ? "light" : "dark"),
                      )
                    }
                    icon={
                      resolvedTheme === "dark" ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )
                    }
                    label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                  />
                </Command.Group>

                <Command.Group heading="Connect" className="cmdk-group">
                  {socials.map((s) => (
                    <Item
                      key={s.label}
                      onSelect={() => run(() => window.open(s.href, "_blank"))}
                      icon={<SocialIcon icon={s.icon} className="h-4 w-4" />}
                      label={s.label}
                      hint={s.handle}
                      external
                    />
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Item({
  onSelect,
  icon,
  label,
  hint,
  external,
}: {
  onSelect: () => void;
  icon: React.ReactNode;
  label: string;
  hint?: string;
  external?: boolean;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground aria-selected:bg-muted aria-selected:text-foreground"
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border bg-card/60 text-muted-foreground group-aria-selected:text-electric">
        {icon}
      </span>
      <span className="flex-1 truncate text-foreground/90">{label}</span>
      {hint && (
        <span className="hidden max-w-[40%] truncate font-mono text-xs text-muted-foreground sm:block">
          {hint}
        </span>
      )}
      {external && (
        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-aria-selected:opacity-100" />
      )}
    </Command.Item>
  );
}

function isTyping(e: KeyboardEvent) {
  const t = e.target as HTMLElement;
  return (
    t.tagName === "INPUT" ||
    t.tagName === "TEXTAREA" ||
    t.isContentEditable
  );
}
