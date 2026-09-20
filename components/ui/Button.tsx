"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button — the primary interactive primitive.
 * Renders an <a> when `href` is provided, otherwise a <button>.
 * Variants follow the site's premium dark aesthetic.
 */
export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        // High-contrast primary (white-on-dark / dark-on-light).
        default:
          "bg-foreground text-background hover:bg-foreground/90",
        // Accent-filled secondary CTA (used sparingly).
        solid:
          "bg-accent text-accent-foreground hover:bg-accent/90",
        // Bordered, calm.
        outline:
          "border border-border bg-card/40 text-foreground hover:bg-card hover:border-foreground/25",
        // Subtle ghost.
        ghost: "text-muted-foreground hover:text-foreground hover:bg-muted/60",
        // Restrained glass.
        glass:
          "glass text-foreground hover:border-foreground/25",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type BaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, size, children, ...props }, ref) => {
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...(props as ButtonAsButton)}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";
