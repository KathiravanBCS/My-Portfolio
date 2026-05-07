import { notFound } from "next/navigation";
import { getPosts } from "@/lib/mdx";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { baseURL, work } from "@/config";
import { CustomMDX } from "@/components";
import { TableOfContents } from "@/components/common/TableOfContents";
import { extractHeadings } from "@/lib/headings";
import { ReadingProgressBar } from "@/components/common/ReadingProgressBar";
import {
  ReadingProvider as BlogReadingProvider,
  ReadingFloatingControls as BlogFloatingControls,
  ReadingContentWrapper as BlogContentWrapper,
} from "@/components/common/ReadingControls";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getPosts(["src", "app", "work", "projects"]).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getPosts(["src", "app", "work", "projects"]).find(
    (p) => p.slug === slugPath
  );

  if (!post) return {};

  return {
    title: `${post.metadata.title} - Full Document`,
    description: post.metadata.summary,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${baseURL}${work.path}/${post.slug}/details`,
      images:
        post.metadata.images.length > 0
          ? [{ url: post.metadata.images[0] }]
          : [],
    },
  };
}

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getPosts(["src", "app", "work", "projects"]).find(
    (p) => p.slug === slugPath
  );

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);

  return (
    <BlogReadingProvider>
      <ReadingProgressBar />
      <BlogFloatingControls />

      <div className="min-h-screen py-10 md:py-16 overflow-x-hidden w-full">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">

        {/* Back button */}
        <div className="flex items-center justify-between gap-4 mb-8 md:mb-10 max-w-4xl">
          <Link
            href={`/work/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Details
          </Link>
        </div>

        {/* Cover image */}
        {post.metadata.images && post.metadata.images.length > 0 && (
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 mb-10 md:mb-12 max-w-4xl">
            <Image
              src={post.metadata.images[0]}
              alt={post.metadata.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8 md:mb-12 max-w-4xl">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <time dateTime={post.metadata.publishedAt}>
              {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.metadata.liveUrl && (
              <>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <a
                  href={post.metadata.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 dark:text-pink-400 hover:underline font-medium"
                >
                  View Live
                </a>
              </>
            )}
            {post.metadata.githubUrl && (
              <>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <a
                  href={post.metadata.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 dark:text-pink-400 hover:underline font-medium"
                >
                  GitHub
                </a>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            {post.metadata.title}
          </h1>

          {/* Summary */}
          {post.metadata.summary && (
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {post.metadata.summary}
            </p>
          )}
        </header>

        {/* Team section */}
        {post.metadata.team && post.metadata.team.length > 0 && (
          <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-800 max-w-4xl">
            <h3 className="text-sm font-mono tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-4">
              Team Members
            </h3>
            <div className="flex flex-wrap gap-6">
              {post.metadata.team.map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-200 dark:border-gray-700"
                  />
                  <div>
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                    >
                      {member.name}
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile TOC */}
        <div className="max-w-4xl">
          <TableOfContents headings={headings} type="project" />
        </div>

        {/* Anchor for TOC visibility trigger */}
        <div id="project-content-start" className="h-0 w-0 pointer-events-none" aria-hidden="true" />

        {/* Project content */}
        <article className="max-w-4xl lg:mr-20 xl:mr-35">
          <BlogContentWrapper>
            <CustomMDX source={post.content} />
          </BlogContentWrapper>
        </article>

        {/* Anchor for TOC hide trigger */}
        <div id="project-content-end" className="h-0 w-0 pointer-events-none" aria-hidden="true" />

      </div>
    </div>
    </BlogReadingProvider>
  );
}
