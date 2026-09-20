"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small mono uppercase label above the title. */
  kicker?: string;
  /** Section index shown as a monospaced counter, e.g. "01". */
  index?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * SectionHeading — the consistent header for every section:
 * a kicker chip, a large display title, and an optional description.
 */
export function SectionHeading({
  kicker,
  index,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {kicker && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="kicker"
        >
          <span className="h-px w-8 bg-gradient-to-r from-electric to-transparent" />
          {index && <span className="text-electric">{index}</span>}
          {kicker}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "text-balance font-display text-fluid-xl font-semibold tracking-tight",
          align === "center" ? "max-w-3xl" : "max-w-2xl",
        )}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "text-pretty text-fluid-base leading-relaxed text-muted-foreground",
            align === "center" ? "max-w-2xl" : "max-w-xl",
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
