<div align="center">

# Vaibhav Chaubey — Portfolio

**Full-Stack & AI Systems Engineer**

A premium, award-quality developer portfolio built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion & Lenis.
**Refined Monochrome** design language — neutral near-black, one disciplined indigo accent, solid (non-gradient)
typography and quiet, intentional motion. Designed to feel like Vercel × Linear × Stripe, not a template.

</div>

---

## ✨ Highlights

- **Refined hero** — animated headline, typewriter role cycling, a quiet grid backdrop, subtle mouse-follow light, and animated stat counters.
- **Flagship projects** — 3D tilt cards, category filter + live search, generated gradient covers, and a full-detail modal (problem → challenge → lesson → metrics).
- **Live GitHub integration** — latest repositories, profile stats, and a contribution heatmap fetched with ISR; plus a LeetCode stats card.
- **Command palette (⌘K)** — Raycast-style launcher for navigation, links, copy-email, résumé, and theme toggle.
- **Delightful details** — custom cursor, magnetic buttons, reading-progress bar, back-to-top, preloader, dark/light mode, glassmorphism, and reduced-motion support throughout.
- **Production-grade** — semantic SEO metadata, JSON-LD, dynamic OG image, sitemap, robots, web manifest, and accessible, responsive, code-split components.

## 🧱 Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, CSS variables, `tailwindcss-animate` |
| Motion | Framer Motion, GSAP-ready, Lenis smooth scroll |
| UI | shadcn-style primitives, `cmdk`, `sonner`, Lucide icons |
| Fonts | Geist Sans + Geist Mono (via `next/font`) |

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

> Requires Node.js 18.17+.

## 🗂 Project Structure

```
app/                 # App Router: layout, page, globals, SEO routes (sitemap, robots, OG, manifest)
components/
  ui/                # Design-system primitives (Button, Section, Reveal, TiltCard, SpotlightCard, …)
  effects/           # ParticleField, MouseGlow, CustomCursor, animated Backgrounds
  layout/            # Navbar, Footer
  sections/          # Hero, About, Skills, Experience, Projects, GithubActivity, Achievements, Education, Contact
  providers/         # ThemeProvider (next-themes), SmoothScroll (Lenis)
  icons/             # Hand-rolled brand SVGs (GitHub, LinkedIn, LeetCode, X)
hooks/               # useMediaQuery, useMousePosition, useScrollProgress, useActiveSection, useCopyToClipboard, …
lib/                 # utils (cn), github (REST helpers)
data/                # resume.ts — the single content source of truth
public/              # résumé PDF, favicon
```

## ✏️ Personalize

**All content lives in [`data/resume.ts`](data/resume.ts).** Edit that one file to update the entire site.

A few links were not explicit in the résumé and are **best guesses — please verify/replace**:

- `socials[].href` for **LinkedIn** (`https://www.linkedin.com/in/vaibhav-chaubey`)
- `socials[].href` / handle for **LeetCode** (`https://leetcode.com/u/vaibhav449`)
- `seo.url` — set to your deployed domain (used for canonical URLs, OG, sitemap)
- Replace `public/Vaibhav_Chaubey_Resume.pdf` when your résumé changes.

The GitHub username (`vaibhav449`) drives the live repos, stats and contribution graph. The LeetCode card and
contribution heatmap use free public image endpoints (`leetcard.jacoblin.cool`, `ghchart.rshah.org`) — if a handle is
wrong the card simply shows its alt text; everything else keeps working.

> **Add a real photo (optional):** drop a square image at `public/avatar.jpg`. The hero ships with an elegant generated
> monogram placeholder, so nothing is required.

## ♿ Accessibility & Performance

- Respects `prefers-reduced-motion` (animations, smooth scroll, counters, and the preloader all degrade gracefully).
- Semantic landmarks, focus-visible rings, keyboard-operable navigation and command palette.
- `next/font` (no layout shift), lazy-loaded images, ISR for GitHub data, and transform/opacity-only animations for smooth 60fps.

## 🚢 Deploy

Deploy to **Vercel** in one click — no configuration required. Remember to set `seo.url` in `data/resume.ts` to your
production domain.

---

<div align="center">
<sub>Designed & built by Vaibhav Chaubey.</sub>
</div>
