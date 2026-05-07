"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority = false,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="overflow-hidden group relative backdrop-blur-sm bg-white dark:bg-neutral-950/50 border border-pink-200 dark:border-pink-800/60 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {images.length > 0 && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={images[0]}
            alt={title}
            fill
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 960px) 100vw, 960px"
          />
        </div>
      )}
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
        {title && (
          <div className="sm:flex-[5]">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          </div>
        )}
        <div className="sm:flex-[7] flex flex-col gap-4">
          {avatars?.length > 0 && (
            <div className="flex -space-x-2">
              {avatars.map((avatar) => (
                <Image
                  key={avatar.src}
                  src={avatar.src}
                  alt="Team member"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white dark:border-gray-900"
                />
              ))}
            </div>
          )}
          {description?.trim() && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">{description}</p>
          )}
          <div className="flex items-center gap-6">
            {content?.trim() && (
              <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#ff4081] hover:text-[#e0356e] hover:underline transition-colors"
              >
                Read case study
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <title>Open case study</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-[#ff4081] hover:underline transition-colors"
              >
                View project
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <title>Open external project link</title>
                  <path
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
