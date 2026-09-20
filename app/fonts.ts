import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

/**
 * Refined Monochrome type system — unified on Geist.
 *  - Geist Sans → body, UI and display (hierarchy comes from size, weight
 *    and tight tracking, the Vercel/Linear approach — not a second typeface).
 *  - Geist Mono → code, kickers, counters, labels.
 * `--font-display` is aliased to Geist Sans in globals.css.
 */
export const fontSans = GeistSans;
export const fontMono = GeistMono;
