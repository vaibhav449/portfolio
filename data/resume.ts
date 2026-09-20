/**
 * ─────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH — all portfolio content lives here.
 * Extracted from Vaibhav Chaubey's résumé and elevated (truthfully) into
 * a portfolio voice. Update this file to update the whole site.
 *
 * NOTE ON LINKS: email, phone, GitHub, LinkedIn and LeetCode are all
 * verified. The LeetCode handle also drives the live stats card.
 * ─────────────────────────────────────────────────────────────────────────
 */

import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  Server,
  Sparkles,
  Terminal,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Vaibhav Chaubey",
  firstName: "Vaibhav",
  initials: "VC",
  title: "Full-Stack & AI Systems Engineer",
  // A short, punchy set of roles for the animated typing effect.
  roles: [
    "Full-Stack Engineer",
    "LLM Systems Designer",
    "Multi-Tenant SaaS Builder",
    "Real-Time Systems Engineer",
    "Agentic AI Architect",
  ],
  tagline:
    "I build production AI systems and multi-tenant SaaS that stay fast, observable, and cheap to run at scale.",
  location: "Ahmedabad · Raichur, India",
  availability: "Open to Summer 2026 internships & new-grad roles",
  available: true,
  bioShort:
    "Full-stack engineer specializing in production AI systems and multi-tenant SaaS. Sole engineer on a live Shopify AI Shopping Assistant.",
  bio: [
    "I'm a full-stack engineer who lives at the intersection of real-time systems and applied AI. As the sole engineer on a production Shopify AI Shopping Assistant, I've shipped provider-agnostic LLM gateways, bot-to-human handoff over WebSockets, and RAG pipelines that cut cost while raising reliability.",
    "I'm most interested in the unglamorous parts that make software actually work in production — cost accounting down to the microdollar, atomic claims that survive race conditions, and caches that shave milliseconds off every message. I care about systems that are fast, observable, and cheap to run at scale.",
    "Currently pursuing my B.Tech in Computer Science at IIIT Raichur while interning at Setubridge Technolabs. I've solved 200+ DSA problems and I'm always chasing the next hard systems problem.",
  ],
  /** Bump the `v` query whenever the PDF in /public is replaced (cache-bust). */
  resumeUrl: "/Vaibhav_Chaubey_Resume.pdf?v=2026-08-28",
  /** Filename the browser saves the résumé as (served unchanged from /public). */
  resumeFileName: "Vaibhav_Chaubey_Resume.pdf",
  avatar: "/avatar.jpg", // optional real photo; falls back to a generated monogram
  email: "vaibhavrm6667@gmail.com",
  phone: "+91-7874696877",
} as const;

/* ------------------------------------------------------------------ */
/* Social / links                                                      */
/* ------------------------------------------------------------------ */

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: "github" | "linkedin" | "mail" | "leetcode" | "phone" | "twitter";
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/vaibhav449",
    handle: "vaibhav449",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vaibhav-chaubey-00a774329",
    handle: "vaibhav-chaubey-00a774329",
    icon: "linkedin",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/Vaibhavchaubey007/",
    handle: "Vaibhavchaubey007",
    icon: "leetcode",
  },
  {
    label: "Email",
    href: "mailto:vaibhavrm6667@gmail.com",
    handle: "vaibhavrm6667@gmail.com",
    icon: "mail",
  },
];

export const githubUsername = "vaibhav449";

/* ------------------------------------------------------------------ */
/* Headline stats (animated counters)                                  */
/* ------------------------------------------------------------------ */

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  hint: string;
};

export const stats: Stat[] = [
  { value: 200, suffix: "+", label: "DSA Problems Solved", hint: "LeetCode · HackerRank · GFG" },
  { value: 55, suffix: "%", prefix: "~", label: "LLM Cost Reduced", hint: "Per-conversation, in production" },
  { value: 80, suffix: "K+", label: "Lines Shipped", hint: "OpsPanel billing platform" },
  { value: 3, suffix: "", label: "Production Services", hint: "Live, multi-tenant SaaS" },
];

/* ------------------------------------------------------------------ */
/* About — story, values, strengths                                    */
/* ------------------------------------------------------------------ */

export const values = [
  {
    title: "Systems thinking",
    description:
      "I design for the whole lifecycle — state machines, race conditions, retries and fallbacks — not just the happy path.",
    icon: "Layers",
  },
  {
    title: "Cost & performance obsession",
    description:
      "Microdollar-precision cost accounting, dual-layer caching, and token budgets that keep AI features cheap at scale.",
    icon: "Gauge",
  },
  {
    title: "Reliability under real traffic",
    description:
      "Atomic claims, presence dedupe, and reconnect catchup so real merchants never lose a message.",
    icon: "ShieldCheck",
  },
  {
    title: "End-to-end ownership",
    description:
      "From a Chrome MV3 recorder to an FFmpeg compositor — I ship the whole pipeline, sole-engineer when needed.",
    icon: "Rocket",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Skills — grouped, with proficiency + accent                         */
/* ------------------------------------------------------------------ */

export type SkillGroup = {
  category: string;
  icon: LucideIcon;
  accent: string; // tailwind color class base for the group glow
  blurb: string;
  skills: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "AI & LLM",
    icon: BrainCircuit,
    accent: "violet",
    blurb: "Provider-agnostic gateways, RAG, and agentic pipelines in production.",
    skills: [
      { name: "Anthropic Claude API", level: 92 },
      { name: "OpenAI API", level: 90 },
      { name: "RAG Pipelines", level: 88 },
      { name: "Qdrant (Vector DB)", level: 85 },
      { name: "LangGraph", level: 80 },
      { name: "MCP", level: 82 },
      { name: "SSE Streaming", level: 88 },
      { name: "Prompt Engineering", level: 90 },
      { name: "Ollama", level: 78 },
    ],
  },
  {
    category: "Frontend",
    icon: Layers,
    accent: "electric",
    blurb: "Fast, accessible React interfaces — from dashboards to embeddable SDKs.",
    skills: [
      { name: "React.js (18/19)", level: 93 },
      { name: "React Router 7", level: 88 },
      { name: "Redux", level: 85 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Vite (IIFE SDK)", level: 84 },
      { name: "Axios", level: 88 },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    accent: "electric",
    blurb: "APIs, real-time gateways, and job pipelines built to survive production.",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Express.js", level: 90 },
      { name: "FastAPI", level: 80 },
      { name: "Prisma ORM", level: 88 },
      { name: "Socket.IO", level: 87 },
      { name: "JWT / Auth", level: 88 },
      { name: "Webhooks", level: 85 },
      { name: "Cron Jobs", level: 84 },
    ],
  },
  {
    category: "Languages",
    icon: Code2,
    accent: "violet",
    blurb: "Typed, systems-minded, and comfortable close to the metal.",
    skills: [
      { name: "TypeScript", level: 92 },
      { name: "JavaScript (ES2022)", level: 93 },
      { name: "Python", level: 85 },
      { name: "C++", level: 82 },
      { name: "C", level: 78 },
      { name: "SQL", level: 86 },
      { name: "GraphQL", level: 80 },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    accent: "electric",
    blurb: "Relational, document, and vector stores — chosen per workload.",
    skills: [
      { name: "MySQL", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "Qdrant", level: 84 },
      { name: "Prisma Schema Design", level: 87 },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    accent: "violet",
    blurb: "Ship it, run it, keep it up — from container to HTTPS edge.",
    skills: [
      { name: "Docker", level: 85 },
      { name: "DigitalOcean", level: 82 },
      { name: "Linux", level: 84 },
      { name: "Bitbucket Pipelines", level: 80 },
      { name: "Caddy + systemd", level: 78 },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: GitBranch,
    accent: "electric",
    blurb: "The everyday kit — plus the platform APIs my products live on.",
    skills: [
      { name: "Git", level: 90 },
      { name: "Shopify Admin/Billing API", level: 86 },
      { name: "Cloudinary", level: 84 },
      { name: "FFmpeg", level: 80 },
      { name: "edge-tts / Whisper", level: 78 },
    ],
  },
  {
    category: "Architecture",
    icon: Boxes,
    accent: "violet",
    blurb: "The patterns that hold multi-tenant AI SaaS together.",
    skills: [
      { name: "Multi-Tenant SaaS", level: 88 },
      { name: "Dual-Layer Caching", level: 86 },
      { name: "Provider-Agnostic LLM Abstraction", level: 87 },
      { name: "Rate Limiting", level: 85 },
      { name: "State Machines", level: 84 },
      { name: "WebSocket Gateways", level: 86 },
    ],
  },
];

// Marquee reel of technologies (used in the tech ticker).
export const techMarquee = [
  "TypeScript", "React", "Node.js", "Next.js", "Anthropic Claude", "OpenAI",
  "Qdrant", "Socket.IO", "Prisma", "MySQL", "MongoDB", "Docker", "Python",
  "FastAPI", "GraphQL", "Redux", "Tailwind CSS", "LangGraph", "MCP", "FFmpeg",
  "DigitalOcean", "Linux", "Vite", "Express", "RAG", "SSE",
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  start: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    role: "Full-Stack Developer Intern (MERN + AI/LLM)",
    company: "Setubridge Technolabs",
    location: "Ahmedabad, India",
    period: "Dec 2025 — Present",
    start: "2025-12",
    current: true,
    summary:
      "Sole engineer on a production multi-tenant Shopify AI SaaS, and end-to-end builder of an internal billing platform and an AI marketing-video pipeline.",
    highlights: [
      "Shipped a 3-service production Shopify app — Remix backend, a JWT-authenticated Socket.IO gateway, and a React agent dashboard — serving merchants on DigitalOcean with per-shop row-level isolation across 26 Prisma models and 66 REST routes.",
      "Cut LLM cost per conversation ~55% by replacing a monolithic prompt with a 7-state intent engine that loads tier-based prompt modules on demand, with cosine-scored embedding classification and an LRU-cached GPT-4o-mini fallback.",
      "Built end-to-end bot-to-human handoff over WebSockets with atomic SQL-level conversation claims (no double-claim races), shared inbox, multi-tab presence dedupe, and reconnect catchup for messages missed during disconnect windows.",
      "Designed a provider-agnostic LLM gateway over Anthropic Claude and an OpenAI-compatible bus (OpenAI, Groq, Together, Gemini) with unified SSE streaming, tool-schema normalization, and microdollar-precision cost accounting.",
      "Built an internal billing platform (OpsPanel) and an AI demo-video generator from a Chrome MV3 recorder through a GPT-4o scene planner to a Python/FFmpeg compositor.",
    ],
    stack: [
      "React Router 7", "Node.js", "TypeScript", "Prisma", "MySQL", "Qdrant",
      "Socket.IO", "Anthropic Claude", "OpenAI", "Docker", "DigitalOcean",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects — the flagship section                                     */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: "AI/LLM" | "SaaS" | "Full-Stack" | "Tooling";
  featured: boolean;
  year: string;
  role: string;
  description: string;
  problem: string;
  challenge: string;
  lesson: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  highlights: string[];
  links: { github?: string; demo?: string };
  isPrivate?: boolean;
  accent: "electric" | "violet";
};

export const projects: Project[] = [
  {
    slug: "ai-shopping-assistant",
    name: "AI Shopping Assistant",
    tagline: "Production multi-tenant Shopify SaaS — sole engineer",
    category: "AI/LLM",
    featured: true,
    year: "2026",
    role: "Sole Engineer",
    description:
      "A production AI shopping assistant serving Shopify merchants: a 3-service system with a Remix backend, a JWT-authenticated WebSocket gateway, and a live agent dashboard — with a provider-agnostic LLM core, RAG grounding, and real-time human handoff.",
    problem:
      "Merchants needed an on-brand AI assistant that could answer from their own catalog and content, escalate to humans seamlessly, and not blow up the LLM bill.",
    challenge:
      "Bounding LLM cost on repeat ambiguous queries without hurting answer quality — solved with a 7-state intent engine, cosine-scored embedding prototypes across 3 confidence bands, and an LRU-cached mini-model fallback.",
    lesson:
      "Reliability in real-time systems is won at the edges: atomic claims, presence dedupe, and reconnect catchup matter more than the happy-path demo.",
    metrics: [
      { label: "LLM cost cut", value: "~55%" },
      { label: "Prisma models", value: "26" },
      { label: "REST routes", value: "66" },
      { label: "Latency saved", value: "~250ms/msg" },
    ],
    stack: [
      "React Router 7", "Node.js", "TypeScript", "Prisma", "MySQL", "Qdrant",
      "Socket.IO", "Anthropic Claude", "OpenAI", "Docker", "DigitalOcean",
    ],
    highlights: [
      "Per-shop row-level isolation across 26 Prisma models & 66 REST routes.",
      "Provider-agnostic gateway (Claude + OpenAI-compatible bus) with unified SSE streaming and prompt-cache hit-rate monitoring.",
      "Shopify Storefront MCP behind a two-tier cache + a Qdrant RAG pipeline over 5 source types.",
      "Atomic SQL-level conversation claim preventing double-claim races on human handoff.",
    ],
    links: {},
    isPrivate: true,
    accent: "violet",
  },
  {
    slug: "opspanel",
    name: "OpsPanel",
    tagline: "Internal Shopify pricing, subscription & billing platform",
    category: "SaaS",
    featured: true,
    year: "2026",
    role: "Full-Stack Engineer",
    description:
      "An internal platform to manage pricing plans, subscriptions and billing for the company's Shopify apps — multi-tenant, dual-authenticated, with embeddable pricing widgets that mount on any storefront via a single <div>.",
    problem:
      "The company needed one place to run pricing, coupons, trials and billing across multiple Shopify apps — with widgets any app could embed without a rebuild.",
    challenge:
      "Making 10 composable pricing components deploy anywhere via a single <div> tag — solved with React + Vite IIFE bundles, MutationObserver auto-mount, and cross-widget communication.",
    lesson:
      "A stateless token cache and per-shop rate limiting turned a chatty integration into a calm one — external API calls dropped ~80%.",
    metrics: [
      { label: "Lines of code", value: "~80K" },
      { label: "External calls cut", value: "~80%" },
      { label: "MySQL tables", value: "16" },
      { label: "Composable widgets", value: "10" },
    ],
    stack: [
      "React 19", "Express 5", "MySQL", "Vite", "Shopify Billing API", "JWT", "Bitbucket Pipelines",
    ],
    highlights: [
      "Dual-auth (JWT + stateless Shopify token validation) with per-shop rate limiting (100 req/min).",
      "Embeddable React + Vite IIFE widgets with MutationObserver auto-mount & cross-widget messaging.",
      "6-state subscription machine with automated trial-expiry cron.",
      "Admin dashboard: campaigns, coupon engine, CMS, trial tracking & merchant provisioning.",
    ],
    links: {},
    isPrivate: true,
    accent: "electric",
  },
  {
    slug: "ai-demo-video-generator",
    name: "AI Demo-Video Generator",
    tagline: "Narrated screen walkthrough → auto-voiced marketing video",
    category: "AI/LLM",
    featured: true,
    year: "2026",
    role: "End-to-End Builder",
    description:
      "A pipeline that turns a narrated screen recording into a polished, auto-voiced marketing video — from a Chrome MV3 recorder that captures DOM events on one absolute clock, to a GPT-4o scene planner, to a Python/FFmpeg compositor with action-anchored time-warp.",
    problem:
      "Marketing needed demo videos fast, but recording, scripting, voicing and editing each one by hand took hours.",
    challenge:
      "Understanding the screen without computer vision — solved by synchronizing tab video, mic narration, live transcript and capture-phase DOM events onto ONE absolute clock via an explicit readiness handshake.",
    lesson:
      "Determinism beats cleverness: a timestamp/scene-parity validator that re-prompts once before a deterministic fallback made GPT-4o outputs safe to ship unattended.",
    metrics: [
      { label: "Render time", value: "30–60s" },
      { label: "Cost / video", value: "cents" },
      { label: "Scene timeline", value: "8–12" },
      { label: "Video bitrate", value: "VP9 8Mbps" },
    ],
    stack: [
      "Chrome MV3", "TypeScript", "Express", "OpenAI GPT-4o", "Whisper", "Python", "FFmpeg", "edge-tts", "Caddy", "systemd",
    ],
    highlights: [
      "Chrome MV3 recorder syncs video, narration, transcript & DOM events on one performance clock.",
      "Token-gated Express pipeline fuses events + transcript into a heuristic 8–12 scene timeline.",
      "GPT-4o structured outputs on a hallucination-guarded prompt grounded only in real on-screen labels.",
      "Python/FFmpeg compositor with scene-level, action-anchored time-warp eliminating drift & chipmunk audio.",
    ],
    links: {},
    isPrivate: true,
    accent: "violet",
  },
  {
    slug: "hirescope",
    name: "HireScope",
    tagline: "AI interview assistant with a live recruiter dashboard",
    category: "AI/LLM",
    featured: false,
    year: "2025",
    role: "Full-Stack Engineer",
    description:
      "A two-tab AI interview app — an interviewee chat and a live-synced interviewer dashboard — with resume parsing, a Gemini-powered question engine, timed answers, scoring and ranked candidate summaries.",
    problem:
      "Screening interviews are slow and inconsistent; recruiters needed structured, scored, comparable results fast.",
    challenge:
      "Keeping two tabs perfectly in sync while persisting interview state across reloads — solved with live sync and redux-persist.",
    lesson:
      "Small UX guarantees (auto-prompting for missing fields, resilient reloads) are what make an AI tool feel trustworthy.",
    metrics: [
      { label: "Questions / role", value: "6" },
      { label: "Timer modes", value: "20/60/120s" },
      { label: "Live tabs", value: "2 synced" },
      { label: "Resume parse", value: "PDF/DOCX" },
    ],
    stack: ["React", "Redux", "Node.js", "Express", "Gemini API", "redux-persist"],
    highlights: [
      "PDF/DOCX resume parsing (name/email/phone) with auto-prompting for missing fields.",
      "Gemini engine generates 6 role-specific questions with configurable auto-submit timers.",
      "Scores answers, produces summaries, ranks candidates with per-candidate chat history.",
      "State persisted across reloads via redux-persist.",
    ],
    links: { github: "https://github.com/vaibhav449" },
    accent: "electric",
  },
  {
    slug: "placement-portal",
    name: "Placement Portal",
    tagline: "Full-stack placement management platform",
    category: "Full-Stack",
    featured: false,
    year: "2025",
    role: "Full-Stack Engineer",
    description:
      "A placement management platform for a college placement cell — JWT auth, Cloudinary resume upload/download, bulk admin workflows, company CRUD, application tracking with advanced filters, and a coordinator statistics dashboard.",
    problem:
      "Placement coordinators juggled spreadsheets for students, companies and applications with no single source of truth.",
    challenge:
      "Bulk workflows at scale — CSV student import and ZIP export of resumes — without blocking the UI.",
    lesson:
      "Advanced filtering and clean stats turn raw records into decisions coordinators actually trust.",
    metrics: [
      { label: "Auth", value: "JWT" },
      { label: "Bulk import", value: "CSV" },
      { label: "Bulk export", value: "ZIP" },
      { label: "Filters", value: "Advanced" },
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "JWT"],
    highlights: [
      "JWT auth with Cloudinary resume upload/download.",
      "Bulk admin workflows: CSV student import and ZIP export of resumes.",
      "Company CRUD & application tracking with on/off-campus + remote/hybrid filters.",
      "Coordinator dashboard with key placement statistics.",
    ],
    links: { github: "https://github.com/vaibhav449" },
    accent: "electric",
  },
];

export const projectCategories = ["All", "AI/LLM", "SaaS", "Full-Stack", "Tooling"] as const;

/* ------------------------------------------------------------------ */
/* Achievements                                                        */
/* ------------------------------------------------------------------ */

export type Achievement = {
  title: string;
  detail: string;
  metric: string;
  icon: "Trophy" | "Code" | "Cpu" | "Rocket" | "Target" | "Sparkles";
};

export const achievements: Achievement[] = [
  {
    title: "200+ DSA Problems Solved",
    detail: "Across LeetCode, HackerRank & GeeksforGeeks — a daily habit of hard problems.",
    metric: "200+",
    icon: "Code",
  },
  {
    title: "~55% LLM Cost Reduction",
    detail: "Re-architected a monolithic prompt into a 7-state intent engine in production.",
    metric: "~55%",
    icon: "Cpu",
  },
  {
    title: "Sole Engineer, Production SaaS",
    detail: "Shipped a 3-service multi-tenant Shopify AI app serving real merchants.",
    metric: "3 svc",
    icon: "Rocket",
  },
  {
    title: "~80K LOC Billing Platform",
    detail: "Built OpsPanel end-to-end across 16 tables and 15 REST modules.",
    metric: "80K",
    icon: "Target",
  },
];

// Areas of focus / interests, surfaced as chips.
export const interests = [
  "Agentic AI Architecture",
  "LLM Systems Design",
  "Competitive Programming",
];

/* ------------------------------------------------------------------ */
/* Education                                                           */
/* ------------------------------------------------------------------ */

export type Education = {
  degree: string;
  field: string;
  school: string;
  location: string;
  period: string;
  gpa: string;
  coursework: string[];
};

export const education: Education[] = [
  {
    degree: "B.Tech",
    field: "Computer Science & Engineering",
    school: "IIIT Raichur",
    location: "Raichur, India",
    period: "2023 — Expected May 2027",
    gpa: "7.3 / 10.0",
    coursework: [
      "Data Structures & Algorithms",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

/* ------------------------------------------------------------------ */
/* SEO                                                                 */
/* ------------------------------------------------------------------ */

export const seo = {
  siteName: "Vaibhav Chaubey — Portfolio",
  title: "Vaibhav Chaubey · Full-Stack & AI Systems Engineer",
  description:
    "Vaibhav Chaubey is a full-stack & AI systems engineer building production LLM systems and multi-tenant SaaS. Sole engineer on a live Shopify AI Shopping Assistant.",
  url: "https://vaibhavchaubey.live", // canonical, sitemap, robots, OG and JSON-LD all derive from this
  keywords: [
    "Vaibhav Chaubey", "Full-Stack Engineer", "AI Engineer", "LLM Systems",
    "React", "Node.js", "TypeScript", "Shopify", "RAG", "Multi-tenant SaaS",
    "Anthropic Claude", "OpenAI", "IIIT Raichur",
  ],
};

// Re-export icon lookup so sections don't each import lucide directly for these.
export const skillCategoryIcons = {
  Layers, Server, Code2, Database, Cloud, GitBranch, Boxes, BrainCircuit,
  Terminal, Sparkles,
} as const;
