import { profile } from "@/data/resume";

/** Route-level loading fallback — a minimal branded shimmer. */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="gradient-border grid h-16 w-16 animate-pulse-glow place-items-center rounded-2xl bg-card">
          <span className="font-display text-2xl font-semibold text-gradient-brand">
            {profile.initials}
          </span>
        </div>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/3 animate-marquee bg-brand-gradient" />
        </div>
      </div>
    </div>
  );
}
