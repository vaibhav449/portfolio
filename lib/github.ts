/**
 * Lightweight GitHub REST helpers. No token required for public data
 * (subject to a 60 req/hr unauthenticated limit). Failures degrade
 * gracefully so the UI can show a fallback.
 */

import { githubUsername } from "@/data/resume";

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

const BASE = "https://api.github.com";

/** ISR-cached fetch of the top public repositories, most recent first. */
export async function getTopRepos(count = 6): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${BASE}/users/${githubUsername}/repos?per_page=100&sort=updated`,
      { next: { revalidate: 3600 }, headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) return [];
    const repos: GitHubRepo[] = await res.json();
    return repos
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.updated_at) - +new Date(a.updated_at))
      .slice(0, count);
  } catch {
    return [];
  }
}

/** ISR-cached fetch of the public user profile. */
export async function getGitHubUser(): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${BASE}/users/${githubUsername}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
