"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectGridCard } from "@/components";

type ProjectCategory = "all" | "ai" | "others";

interface Project {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    images: string[];
    team?: Array<{ avatar: string }>;
    link?: string;
    liveUrl?: string;
    githubUrl?: string;
  };
  content: string;
}

interface FeaturedProjectsClientProps {
  projects: Project[];
}

export function FeaturedProjectsClient({ projects }: FeaturedProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const projectCategories: Record<string, ProjectCategory[]> = {
    "VazhiIQ — AI Career Guidance Platform": ["ai"],
    "E-Commerce Platform": ["others"],
    "Excel Report Generator": ["others"],
    "Movie Database Application": ["others"],
    "Production Invoicing System": ["others"],
    "Travel Buddy — Mobile App UI Design": ["others"],
  };

  const filteredProjects =
    activeFilter === "all"
      ? projects.slice(0, 2)
      : projects.filter((project) => {
          const categories = projectCategories[project.metadata.title] || [];
          return categories.includes(activeFilter);
        });

  return (
    <>
      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-3"
      >
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-sm font-medium transition-all ${
            activeFilter === "all"
              ? "border-[#ff4081] dark:border-[#ff4081] bg-pink-50 dark:bg-pink-950/40 text-[#ff4081] dark:text-pink-400"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 hover:border-pink-300 dark:hover:border-pink-800/60"
          }`}
        >
          <span>✦</span>
          All
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("ai")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-sm font-medium transition-all ${
            activeFilter === "ai"
              ? "border-[#ff4081] dark:border-[#ff4081] bg-pink-50 dark:bg-pink-950/40 text-[#ff4081] dark:text-pink-400"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 hover:border-pink-300 dark:hover:border-pink-800/60"
          }`}
        >
          <span>◉</span>
          AI
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("others")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-sm font-medium transition-all ${
            activeFilter === "others"
              ? "border-[#ff4081] dark:border-[#ff4081] bg-pink-50 dark:bg-pink-950/40 text-[#ff4081] dark:text-pink-400"
              : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 hover:border-pink-300 dark:hover:border-pink-800/60"
          }`}
        >
          <span className="text-[#ff4081]">⊗</span>
          Others
        </button>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((post, index) => (
            <ProjectGridCard
              key={post.slug}
              href={`/work/${post.slug}`}
              images={post.metadata.images}
              title={post.metadata.title}
              description={post.metadata.summary}
              content={post.content}
              liveUrl={post.metadata.liveUrl}
              githubUrl={post.metadata.githubUrl}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-pink-300 dark:border-pink-800/60 text-gray-900 dark:text-white font-mono text-sm font-medium hover:bg-pink-50 dark:hover:bg-pink-950/30 transition-colors"
        >
          View All Projects
          <span className="text-[#ff4081]">→</span>
        </Link>
      </motion.div>
    </>
  );
}
