import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Anchor id (also used by nav + command palette). */
  id: string;
  /** Constrain inner content to the site container. Default true. */
  container?: boolean;
}

/**
 * Section — consistent vertical rhythm + scroll anchor for every block.
 * Adds `scroll-mt` so anchored jumps clear the fixed navbar.
 */
export function Section({
  id,
  container = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-24 sm:py-28 lg:py-36",
        className,
      )}
      {...props}
    >
      {container ? (
        <div className="container">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
