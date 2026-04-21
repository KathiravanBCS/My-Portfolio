"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaGithub } from "react-icons/fa6";
import { FiStar, FiExternalLink } from "react-icons/fi";

interface ProjectGridCardProps {
  href: string;
  images: string[];
  title: string;
  description: string;
  content: string;
  liveUrl?: string;
  githubUrl?: string;
  index?: number;
}

// Extract technologies from markdown content
function extractTechnologies(content: string): string[] {
  const technologiesMatch = content.match(
    /##\s+Technologies\s+(?:Used)?[\s\S]*?(?=##|$)/i
  );
  if (!technologiesMatch) return [];

  const techSection = technologiesMatch[0];
  const techs = techSection.match(/\*\*([^*]+)\*\*:/g) || [];
  return techs
    .slice(0, 5) // Limit to 5 technologies
    .map((tech) => tech.replace(/\*\*|\*$/g, "").replace(":", ""));
}

export const ProjectGridCard: React.FC<ProjectGridCardProps> = ({
  href,
  images = [],
  title,
  description,
  content,
  liveUrl,
  githubUrl,
  index = 0,
}) => {
  const technologies = extractTechnologies(content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      className="group h-full"
    >
      <div className="relative h-full flex flex-col overflow-hidden rounded-2xl border border-pink-200 dark:border-pink-800/60 bg-white dark:bg-neutral-950/50 shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Featured Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-400/40 to-blue-600/40 backdrop-blur-md border border-blue-400/50 dark:border-blue-500/40 rounded-full text-white text-xs font-semibold shadow-lg hover:shadow-xl hover:from-blue-400/50 hover:to-blue-600/50 transition-all duration-300">
            <FiStar className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
            FEATURED
          </div>
        </div>

        {/* Image Container */}
        {images.length > 0 && (
          <div className="relative w-full aspect-video overflow-hidden group/image">
            <Image
              src={images[0]}
              alt={title}
              fill
              priority={index < 2}
              className="object-cover group-hover/image:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />
          </div>
        )}

        {/* Content Container */}
        <div className="flex flex-col flex-1 p-6 md:p-8">
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-5 line-clamp-3">
            {description}
          </p>

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Status Indicator */}
          <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium mb-5 mt-auto">
            <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full" />
            All Systems Operational
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {/* Live Button */}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all duration-300 group/live"
              >
                <FiExternalLink className="w-4 h-4 group-hover/live:translate-x-1 transition-transform" />
                <span>Live</span>
              </a>
            )}

            {/* GitHub Button */}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg font-semibold text-sm transition-all duration-300 group/github"
              >
                <FaGithub className="w-4 h-4 group-hover/github:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
            )}

            {/* View Details Button */}
            <Link
              href={href}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#ff4081] hover:bg-[#e0356e] text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:gap-3 group/btn"
            >
              <span>View Details</span>
              <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
