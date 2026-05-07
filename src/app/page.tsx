import type { Metadata } from "next";
import { home, about, person, baseURL } from "@/config";
import { HomeHero } from "@/components/home/HomeHero";
import { TechSkills } from "@/components/home/TechSkills";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { GitHubStats } from "@/components/home/GitHubStats";
import { GetInTouch } from "@/components/home/GetInTouch";

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
  openGraph: {
    title: home.title,
    description: home.description,
    url: `${baseURL}${home.path}`,
    images: [{ url: home.image }],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8">
      {/* Hero Section */}
      <HomeHero />

      {/* Tech Skills Section */}
      <TechSkills />

      {/* GitHub Stats Section */}
      <GitHubStats />

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* Get In Touch Section */}
      <GetInTouch />
    </div>
  );
}
