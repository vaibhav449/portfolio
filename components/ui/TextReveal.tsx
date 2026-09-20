"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Delay before the first word, in seconds. */
  delay?: number;
  /** Per-word stagger, in seconds. */
  stagger?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * TextReveal — animates a string word-by-word with a soft rise + blur clear.
 * Used for headline reveals.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  once = true,
  as = "span",
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[as] as typeof motion.span;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : "0.6em", filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <MotionTag
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.05em]">
          <motion.span variants={child} className="inline-block" aria-hidden>
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
