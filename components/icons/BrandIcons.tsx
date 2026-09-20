import * as React from "react";
import { Mail, Phone } from "lucide-react";
import type { SocialLink } from "@/data/resume";

type IconProps = React.SVGProps<SVGSVGElement>;

/** Hand-rolled brand marks (lucide dropped brand glyphs), 24×24 viewBox. */

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function LeetCodeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.1 1.6a1.3 1.3 0 0 0-1.86.05L6.9 9.3a3.7 3.7 0 0 0-1.02 2.58c0 .98.37 1.9 1.02 2.58l4.4 4.48a1.3 1.3 0 0 0 1.85-1.83l-4.4-4.48a1.1 1.1 0 0 1 0-1.5l7.35-7.65a1.3 1.3 0 0 0 0-1.86Zm2.83 9.1h-8.2a1.3 1.3 0 0 0 0 2.6h8.2a1.3 1.3 0 0 0 0-2.6Z" />
      <path d="M12.62 17.35 10.9 19.1a3.68 3.68 0 0 1-5.2 0l-2.4-2.44a3.85 3.85 0 0 1 0-5.36L5.7 8.9l1.2 1.22-2.4 2.44a2.13 2.13 0 0 0 0 2.98l2.4 2.44a1.98 1.98 0 0 0 2.82 0l1.72-1.75 1.18 1.12Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z" />
    </svg>
  );
}

/** Resolves a social link's `icon` name to its component. */
export function SocialIcon({
  icon,
  className,
}: {
  icon: SocialLink["icon"];
  className?: string;
}) {
  switch (icon) {
    case "github":
      return <GitHubIcon className={className} />;
    case "linkedin":
      return <LinkedInIcon className={className} />;
    case "leetcode":
      return <LeetCodeIcon className={className} />;
    case "twitter":
      return <XIcon className={className} />;
    case "phone":
      return <Phone className={className} />;
    case "mail":
    default:
      return <Mail className={className} />;
  }
}
