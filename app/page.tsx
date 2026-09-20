import { getTopRepos, getGitHubUser } from "@/lib/github";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { GithubActivity } from "@/components/sections/GithubActivity";
import { Achievements } from "@/components/sections/Achievements";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

// Revalidate the page (and its GitHub data) hourly.
export const revalidate = 3600;

export default async function Home() {
  // Fetch live GitHub data on the server (ISR). Both degrade gracefully.
  const [repos, ghUser] = await Promise.all([getTopRepos(6), getGitHubUser()]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <GithubActivity repos={repos} user={ghUser} />
      <Achievements />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}
