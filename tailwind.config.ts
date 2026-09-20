import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Semantic tokens backed by CSS variables (see globals.css) so
        // light/dark theming flows through a single source of truth.
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        "card-foreground": "hsl(var(--card-foreground) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        // Brand accents
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        electric: "hsl(var(--electric) / <alpha-value>)",
        violet: "hsl(var(--violet-accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.4vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.92rem + 0.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.25rem, 1rem + 1.2vw, 1.75rem)",
        "fluid-xl": "clamp(1.75rem, 1.2rem + 2.6vw, 3rem)",
        "fluid-2xl": "clamp(2.5rem, 1.4rem + 5.2vw, 5.5rem)",
        "fluid-3xl": "clamp(3rem, 1rem + 9vw, 8rem)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 16px)",
      },
      boxShadow: {
        // Neutral elevation — no colored glow.
        glow: "0 8px 30px -12px hsl(0 0% 0% / 0.6)",
        "glow-lg": "0 18px 50px -16px hsl(0 0% 0% / 0.7)",
        "glow-violet": "0 8px 30px -12px hsl(0 0% 0% / 0.6)",
        card: "0 1px 0 0 hsl(var(--foreground) / 0.04) inset, 0 8px 32px -16px hsl(0 0% 0% / 0.6)",
        "card-hover": "0 1px 0 0 hsl(var(--foreground) / 0.06) inset, 0 24px 64px -20px hsl(0 0% 0% / 0.7)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, hsl(var(--border) / 0.6) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.6) 1px, transparent 1px)",
        "dot-pattern":
          "radial-gradient(hsl(var(--border) / 0.9) 1px, transparent 1px)",
        // Solid accent (used only on the reading-progress bar).
        "brand-gradient":
          "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent)))",
        // Soft neutral top light — no color.
        "brand-radial":
          "radial-gradient(circle at 50% 0%, hsl(var(--foreground) / 0.05), transparent 62%)",
        "shine":
          "linear-gradient(110deg, transparent 30%, hsl(var(--foreground) / 0.10) 50%, transparent 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "border-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "border-flow": "border-flow 4s ease infinite",
        shimmer: "shimmer 2s infinite",
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--marquee-duration, 40s) linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 12s linear infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        blink: "blink 1s step-end infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-circ": "cubic-bezier(0.85, 0, 0.15, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
