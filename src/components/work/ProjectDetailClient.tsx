'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa6';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { LuLayers } from 'react-icons/lu';
import { useRef, useMemo } from 'react';
import { ShareButton } from '@/components/ShareButton';
import { baseURL, work } from '@/config';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  linkedIn?: string;
}

interface PostMetadata {
  title: string;
  summary: string;
  publishedAt: string;
  color?: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  challenges?: string[];
  team?: TeamMember[];
}

interface Post {
  slug: string;
  content: string;
  metadata: PostMetadata;
}

interface ProjectDetailClientProps {
  post: Post;
  prevPost?: { slug: string; title: string } | null;
  nextPost?: { slug: string; title: string } | null;
}

const extractTechnologies = (content: string): string[] => {
  const sectionMatch = content.match(/##\s+Technology(?:\s+Stack)?(?:\s+Used)?\s*\n([\s\S]*?)(?=\n##\s|\n##$|$)/i);
  if (!sectionMatch) return [];

  const section = sectionMatch[1];
  const techs = new Set<string>();

  // Match "Label → Value" lines inside code blocks
  const arrowLines = section.matchAll(/^\s*([A-Za-z][A-Za-z.\s/]+?)\s*→\s*(.+)$/gm);
  for (const [, , value] of arrowLines) {
    // Take the first token before any spaces/parens as the tech name
    const name = value.trim().split(/[\s(,+]/)[0];
    if (name && name.length > 1) techs.add(name);
  }

  // Also pick up ### subsection headings (Frontend, Backend, etc.)
  const subHeadings = section.matchAll(/^###\s+(.+)$/gm);
  for (const [, heading] of subHeadings) {
    if (!["frontend", "backend", "devops", "infrastructure", "machine learning"].includes(heading.toLowerCase())) {
      techs.add(heading.trim());
    }
  }

  return Array.from(techs).slice(0, 12);
};

const extractChallenges = (frontmatterChallenges: string[] | undefined, content: string): string[] => {
  if (frontmatterChallenges && frontmatterChallenges.length > 0) {
    return frontmatterChallenges;
  }

  const challengesMatch = content.match(/##\s+Challenges(?:\s+&\s+Solutions)?\s*([\s\S]*?)(?=##|$)/i);
  if (!challengesMatch) return [];

  const challengeSection = challengesMatch[1];
  const lines = challengeSection.split('\n').filter((line) => line.trim().startsWith('-') || line.trim().startsWith('*'));
  return lines.slice(0, 4).map((line) => line.replace(/^[-*]\s*/, '').trim()).filter(Boolean);
};

export default function ProjectDetailClient({
  post,
  prevPost,
  nextPost,
}: ProjectDetailClientProps) {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const technologies = useMemo(() => extractTechnologies(post.content), [post.content]);
  const challenges = useMemo(() => extractChallenges(post.metadata.challenges, post.content), [post.metadata.challenges, post.content]);

  const accentColor = post.metadata.color || 'from-pink-600 to-pink-400';
  const publishDate = new Date(post.metadata.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`min-h-screen pb-20 relative overflow-x-hidden transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-transparent'}`} ref={containerRef}>

      <div className="container mx-auto px-4 md:px-6 pt-16 md:pt-20 max-w-6xl">
        {/* Header with navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12 flex justify-between items-center gap-4 flex-wrap"
        >
          <Link
            href="/work"
            className={`group flex items-center gap-2 transition-colors px-4 py-2 border border-transparent ${
              isLight
                ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-200'
                : 'text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10'
            }`}
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">All Projects</span>
          </Link>

          <ShareButton title={post.metadata.title} url={`${baseURL}${work.path}/${post.slug}`} />

          {/* Prev/Next navigation */}
          <div className="flex gap-2">
            {prevPost && (
              <Link
                href={`/work/${prevPost.slug}`}
                className={`w-10 h-10 flex items-center justify-center border transition-all ${
                  isLight
                    ? 'border-gray-200 bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                title={`Previous: ${prevPost.title}`}
              >
                <FiArrowLeft className="w-4 h-4" />
              </Link>
            )}
            {nextPost && (
              <Link
                href={`/work/${nextPost.slug}`}
                className={`w-10 h-10 flex items-center justify-center border transition-all ${
                  isLight
                    ? 'border-gray-200 bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                title={`Next: ${nextPost.title}`}
              >
                <FiArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </motion.div>

        {/* Hero section */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Metadata badges */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border ${
                isLight ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}>
                <HiOutlineCalendarDays className="w-3 h-3" />
                {post.metadata.publishedAt.split('-')[0]}
              </span>
            </div>

            {/* Title */}
            <h1 className={`text-2xl md:text-3xl font-semibold mb-4 tracking-tight leading-snug ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {post.metadata.title}
            </h1>

            {/* Summary */}
            <p className={`text-sm md:text-base leading-relaxed mb-6 max-w-lg ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              {post.metadata.summary}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              {post.metadata.liveUrl && (
                <a
                  href={post.metadata.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative w-full sm:w-auto flex justify-center items-center gap-2 px-5 py-2.5 font-semibold overflow-hidden hover:scale-[1.02] transition-all text-sm ${
                    isLight
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-white text-black shadow-lg'
                  }`}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isLight ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-gray-100 to-white'
                  }`} />
                  <span className="relative flex items-center gap-2">
                    Live Demo
                    <FiExternalLink className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                  </span>
                </a>
              )}
              {post.metadata.githubUrl && (
                <a
                  href={post.metadata.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-full sm:w-auto flex justify-center items-center gap-2 px-5 py-2.5 font-semibold border transition-all hover:scale-[1.02] text-sm ${
                    isLight
                      ? 'bg-gray-100 text-gray-900 border-gray-300 hover:border-gray-400 hover:bg-gray-200'
                      : 'bg-[#161B22] text-white border-gray-700/50 hover:border-gray-600 hover:bg-[#1C2128]'
                  }`}
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  Source Code
                </a>
              )}
              <Link
                href={`/work/${post.slug}/details`}
                className={`group w-full sm:w-auto flex justify-center items-center gap-2 px-5 py-2.5 font-semibold border transition-all hover:scale-[1.02] text-sm ${
                  isLight
                    ? 'bg-pink-600 text-white border-pink-700 hover:bg-pink-700 hover:border-pink-800'
                    : 'bg-pink-600/80 text-white border-pink-600 hover:bg-pink-600 hover:border-pink-500'
                }`}
              >
                📄 View Full Document
              </Link>
            </div>
          </motion.div>

          {/* Hero image - browser frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className={`border shadow-xl overflow-hidden rounded-lg ${isLight ? 'bg-white border-gray-200' : 'bg-[#1C1C1C] border-gray-800'}`}>
              <div className={`h-8 flex items-center px-3 gap-1.5 border-b ${isLight ? 'bg-gray-100 border-gray-200' : 'bg-[#2A2A2A] border-gray-800'}`}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex-1 mx-2">
                  <div className={`text-[9px] font-mono ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                    {post.metadata.liveUrl ? new URL(post.metadata.liveUrl).hostname : 'localhost:3000'}
                  </div>
                </div>
              </div>

              <div className="relative aspect-[16/10] w-full group cursor-pointer bg-gray-900">
                {post.metadata.images && post.metadata.images.length > 0 ? (
                  <Image
                    src={post.metadata.images[0]}
                    alt={`${post.metadata.title} - ${post.metadata.summary}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 600px"
                    priority
                  />
                ) : (
                  <div className={`w-full h-full ${isLight ? 'bg-gray-100' : 'bg-gray-800'} flex items-center justify-center`}>
                    <span className={isLight ? 'text-gray-400' : 'text-gray-600'}>No image available</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Project Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-lg font-semibold mb-6 flex items-center gap-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                <span className={`w-1.5 h-8 bg-gradient-to-b ${accentColor}`} />
                Project Overview
              </h2>
              <div className={`prose prose-lg max-w-none leading-relaxed ${isLight ? 'prose-gray text-gray-600' : 'prose-invert text-gray-300/90'}`}>
                <p>{post.metadata.summary}</p>
              </div>
            </motion.section>

            {/* Technical Challenges */}
            {challenges.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  <span className={`w-1.5 h-8 bg-gradient-to-b ${accentColor}`} />
                  Technical Challenges
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={`challenge-${challenge.substring(0, 10)}-${index}`}
                      whileHover={{ y: -5 }}
                      className={`p-6 border transition-all group ${
                        isLight
                          ? 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                          : 'bg-black/40 border-white/10 hover:bg-black/60 hover:border-white/20'
                      }`}
                    >
                      <div className={`mb-4 w-10 h-10 rounded-full bg-gradient-to-br border flex items-center justify-center transition-colors ${
                        isLight
                          ? 'from-gray-200 to-gray-100 border-gray-300 text-gray-600 group-hover:text-gray-900 group-hover:border-gray-400'
                          : 'from-gray-800 to-black border-gray-700 text-gray-300 group-hover:text-white group-hover:border-gray-500'
                      }`}>
                        <span className="font-mono text-sm">{index + 1}</span>
                      </div>
                      <p className={`leading-relaxed text-sm ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                        {challenge}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Team Members */}
            {post.metadata.team && post.metadata.team.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  <span className={`w-1.5 h-8 bg-gradient-to-b ${accentColor}`} />
                  Team
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {post.metadata.team.map((member) => (
                    <div
                      key={member.name}
                      className={`flex items-center gap-4 p-5 border transition-all ${
                        isLight
                          ? 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                          : 'bg-black/40 border-white/10 hover:bg-black/60 hover:border-white/20'
                      }`}
                    >
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={48}
                        height={48}
                        className="rounded-full border shrink-0 border-gray-200 dark:border-gray-700"
                      />
                      <div className="min-w-0">
                        {member.linkedIn ? (
                          <a
                            href={member.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-semibold block hover:text-pink-500 transition-colors ${isLight ? 'text-gray-900' : 'text-white'}`}
                          >
                            {member.name}
                          </a>
                        ) : (
                          <p className={`text-sm font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>{member.name}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              {/* Tech Stack */}
              <div className={`backdrop-blur-xl border p-8 shadow-xl mb-8 ${
                isLight ? 'bg-white/80 border-gray-200' : 'bg-black/40 border-white/10'
              }`}>
                <h3 className={`text-base font-semibold mb-6 flex items-center gap-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  <LuLayers className={`w-5 h-5 ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <div
                      key={tech}
                      className={`flex items-center gap-2 px-3 py-2 border transition-all cursor-default group ${
                        isLight
                          ? 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                          : 'bg-black/40 border-white/10 hover:bg-black/60 hover:border-white/20'
                      }`}
                    >
                      <span className={`text-sm font-medium ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className={`backdrop-blur-xl border p-8 shadow-xl ${
                isLight
                  ? 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200'
                  : 'bg-black/40 border-white/10'
              }`}>
                <h3 className={`text-base font-semibold mb-6 flex items-center gap-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  <FiCheckCircle className={`w-5 h-5 ${isLight ? 'text-green-600' : 'text-green-400'}`} />
                  Status
                </h3>
                <div className="space-y-6">
                  <div className={`relative pl-6 border-l ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ${isLight ? 'ring-white' : 'ring-[#0D1117]'}`} />
                    <p className="text-xs text-gray-500 font-mono uppercase mb-1">Current Status</p>
                    <p className={`font-medium ${isLight ? 'text-gray-900' : 'text-white'}`}>Completed & Live</p>
                  </div>
                  <div className={`relative pl-6 border-l ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-gray-400 ring-4 ${isLight ? 'ring-white' : 'ring-[#0D1117]'}`} />
                    <p className="text-xs text-gray-500 font-mono uppercase mb-1">Published</p>
                    <p className={`font-medium ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{publishDate}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Next Project */}
        {nextPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-32 border-t pt-16 ${isLight ? 'border-gray-200' : 'border-white/10'}`}
          >
            <div className="text-center mb-12">
              <p className={`mb-2 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Continue Exploring</p>
              <h2 className={`text-2xl md:text-3xl font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>Next Project</h2>
            </div>

            <Link href={`/work/${nextPost.slug}`} className="block group">
              <div className={`relative overflow-hidden border ${isLight ? 'bg-white border-gray-200' : 'bg-[#161B22] border-white/10'}`}>
                <div className="grid md:grid-cols-2">
                  <div className={`relative aspect-video md:aspect-auto p-8 md:p-12 flex flex-col justify-center ${isLight ? 'bg-gray-50' : 'bg-gray-900/50'}`}>
                    <span className={`font-mono text-sm mb-3 group-hover:underline ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                      View Details →
                    </span>
                    <h3 className={`text-3xl md:text-4xl font-bold mb-4 group-hover:text-pink-600 transition-colors ${isLight ? 'text-gray-900' : 'text-white'}`}>
                      {nextPost.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
