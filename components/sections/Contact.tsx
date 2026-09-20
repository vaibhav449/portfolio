"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";

import { profile, socials } from "@/data/resume";
import { SocialIcon } from "@/components/icons/BrandIcons";
import {
  Badge,
  Button,
  Magnetic,
  Reveal,
  Section,
  SectionHeading,
  SpotlightCard,
  StaggerGroup,
  staggerItem,
} from "@/components/ui";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

/* Simple, pragmatic email check — good enough for a mailto handoff. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = "name" | "email" | "message";
type FormState = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const FIELDS: {
  name: FieldName;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder: string;
  autoComplete?: string;
}[] = [
  { name: "name", label: "Your name", type: "text", placeholder: "Ada Lovelace", autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", placeholder: "you@company.com", autoComplete: "email" },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell me about the role, team, or system you're building…",
  },
];

/**
 * Contact — a friendly, high-conversion closing section: a client-side
 * form that hands off to the user's mail client, a copy-email affordance,
 * a live availability strip, and magnetic social links.
 */
export function Contact() {
  const { copied, copy } = useCopyToClipboard();
  const [values, setValues] = React.useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [submitting, setSubmitting] = React.useState(false);

  const setField = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear an error as soon as the user starts fixing it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const validate = (state: FormState): FormErrors => {
    const next: FormErrors = {};
    if (!state.name.trim()) next.name = "Please tell me your name.";
    if (!state.email.trim()) next.email = "An email is required.";
    else if (!EMAIL_RE.test(state.email.trim()))
      next.email = "That email doesn't look right.";
    if (!state.message.trim()) next.message = "Add a short message.";
    return next;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    const subject = `Portfolio inquiry from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`;
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    toast.success("Opening your email client…");
    window.location.href = mailto;

    // Release the button shortly after handing off.
    window.setTimeout(() => setSubmitting(false), 1200);
  };

  const handleCopy = async () => {
    const ok = await copy(profile.email);
    if (ok) toast.success("Email copied to clipboard");
    else toast.error("Couldn't copy — try selecting it manually.");
  };

  return (
    <Section id="contact">
      {/* Soft radial glow behind the whole section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-brand-radial opacity-60"
      />

      <SectionHeading
        align="center"
        kicker="Contact"
        index="08"
        title={
          <>
            Let&apos;s build something{" "}
            <span className="text-gradient-brand">exceptional</span>.
          </>
        }
        description="Have a role, a hard systems problem, or an idea worth shipping? I read every message — the fastest way to reach me is right here."
      />

      <div className="relative mt-14 grid gap-6 lg:mt-16 lg:grid-cols-5">
        {/* ───────────────── Left: identity + reach ───────────────── */}
        <Reveal className="lg:col-span-2" y={32}>
          <div className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-card/40 p-6 sm:p-8">
            {/* Availability strip */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available
              </span>
              <span className="text-xs text-muted-foreground">
                {profile.availability}
              </span>
            </div>

            <div>
              <h3 className="font-display text-fluid-lg font-semibold tracking-tight">
                Reach out directly
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Prefer your own client? Copy my address or fire off a message —
                either way it lands in the same inbox.
              </p>
            </div>

            {/* Email + copy */}
            <div className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 p-2 pl-4 transition-colors focus-within:border-electric/50 hover:border-foreground/20">
              <a
                href={`mailto:${profile.email}`}
                className="min-w-0 flex-1 truncate font-mono text-sm text-foreground transition-colors hover:text-electric"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={handleCopy}
                aria-label={copied ? "Email copied" : "Copy email address"}
                className={cn(
                  "relative grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-electric/40 hover:text-electric",
                  copied && "border-emerald-500/40 text-emerald-400",
                )}
              >
                <motion.span
                  key={copied ? "check" : "copy"}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="grid place-items-center"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </motion.span>
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-electric" />
              <span>{profile.location}</span>
            </div>

            <div className="mt-auto space-y-4 border-t border-border pt-6">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                Elsewhere
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {socials.map((s) => (
                  <Magnetic key={s.label} strength={0.4}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:border-electric/40 hover:text-electric"
                    >
                      <SocialIcon icon={s.icon} className="h-[18px] w-[18px]" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ───────────────── Right: the form ───────────────── */}
        <Reveal className="lg:col-span-3" delay={0.08} y={32}>
          <SpotlightCard accent="violet" radius={420} className="h-full">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex h-full flex-col gap-5 p-6 sm:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <Badge variant="violet">
                  <Sparkles className="h-3 w-3" />
                  Send a message
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Typically replies within a day
                </span>
              </div>

              <StaggerGroup className="flex flex-col gap-5" stagger={0.06}>
                {FIELDS.map((field) => {
                  const error = errors[field.name];
                  const id = `contact-${field.name}`;
                  return (
                    <motion.div
                      key={field.name}
                      variants={staggerItem}
                      className="flex flex-col gap-1.5"
                    >
                      <label
                        htmlFor={id}
                        className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground"
                      >
                        {field.label}
                      </label>

                      <div
                        className={cn(
                          "group relative rounded-xl border bg-background/60 backdrop-blur transition-colors duration-300",
                          "focus-within:border-electric focus-within:shadow-glow",
                          error
                            ? "border-red-500/60"
                            : "border-border hover:border-foreground/20",
                        )}
                      >
                        {field.type === "textarea" ? (
                          <textarea
                            id={id}
                            name={field.name}
                            rows={5}
                            value={values[field.name]}
                            onChange={(e) => setField(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            aria-invalid={!!error}
                            aria-describedby={error ? `${id}-error` : undefined}
                            className="w-full resize-none rounded-xl bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                          />
                        ) : (
                          <input
                            id={id}
                            name={field.name}
                            type={field.type}
                            value={values[field.name]}
                            onChange={(e) => setField(field.name, e.target.value)}
                            placeholder={field.placeholder}
                            autoComplete={field.autoComplete}
                            aria-invalid={!!error}
                            aria-describedby={error ? `${id}-error` : undefined}
                            className="w-full rounded-xl bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                          />
                        )}
                      </div>

                      {error && (
                        <motion.p
                          id={`${id}-error`}
                          role="alert"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-400"
                        >
                          {error}
                        </motion.p>
                      )}
                    </motion.div>
                  );
                })}
              </StaggerGroup>

              <div className="mt-1 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Opens in your mail app — no data leaves your browser.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="group w-full sm:w-auto"
                >
                  {submitting ? "Opening…" : "Send message"}
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
              </div>
            </form>
          </SpotlightCard>
        </Reveal>
      </div>

      {/* Resume nudge */}
      <Reveal delay={0.12} className="mt-8 flex justify-center">
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-electric"
        >
          Or skim the résumé first
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </Section>
  );
}
