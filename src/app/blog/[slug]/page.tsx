import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/common/mdx";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { baseURL, blog, person } from "@/config";
import { getPosts } from "@/lib/mdx";
import { Posts } from "@/components/blog/Posts";
import { TableOfContents } from "@/components/common/TableOfContents";
import { extractHeadings } from "@/lib/headings";
import { ReadingProgressBar } from "@/components/common/ReadingProgressBar";
import { ShareButton } from "@/components/ShareButton";
import {
  ReadingProvider as BlogReadingProvider,
  ReadingFloatingControls as BlogFloatingControls,
  ReadingContentWrapper as BlogContentWrapper,
  ReadingFontWrapper as BlogFontWrapper,
} from "@/components/common/ReadingControls";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getPosts(["src", "app", "blog", "posts"]).map((post) => ({
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

  const post = getPosts(["src", "app", "blog", "posts"]).find(
    (p) => p.slug === slugPath
  );

  if (!post) return {};

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${baseURL}${blog.path}/${post.slug}`,
      images: post.metadata.image ? [{ url: post.metadata.image }] : [],
    },
  };
}

function calcReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const post = getPosts(["src", "app", "blog", "posts"]).find(
    (p) => p.slug === slugPath
  );

  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const readingTime = calcReadingTime(post.content);

  return (
    <BlogReadingProvider markdownContent={post.content}>
      <ReadingProgressBar />
      <BlogFloatingControls />

      <div className="min-h-screen py-10 md:py-16 overflow-x-hidden w-full">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">

          {/* Back + Share row */}
          <div className="flex items-center justify-between gap-4 mb-8 md:mb-10 max-w-4xl flex-wrap">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blogs
            </Link>
            <ShareButton title={post.metadata.title} url={`${baseURL}${blog.path}/${post.slug}`} />
          </div>

          {/* Cover image */}
          {post.metadata.image && (
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 mb-10 md:mb-12 max-w-4xl">
              <Image
                src={post.metadata.image}
                alt={post.metadata.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          )}

          {/* Header */}
          <BlogFontWrapper>
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
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <span>{readingTime}</span>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <span>By {person.name}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                {post.metadata.title}
              </h1>

              {/* Summary */}
              {post.metadata.summary && (
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {post.metadata.summary}
                </p>
              )}

              {/* Tags */}
              {post.metadata.tag && (
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(post.metadata.tag) ? post.metadata.tag : [post.metadata.tag]).map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-medium border rounded-md bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                  {post.metadata.category && (
                    <span className="px-3 py-1 text-xs font-medium border rounded-md bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800">
                      {post.metadata.category}
                    </span>
                  )}
                </div>
              )}
            </header>
          </BlogFontWrapper>


          {/* Anchor for TOC visibility trigger */}
          <div id="blog-content-start" className="h-0 w-0 pointer-events-none" aria-hidden="true" />

          {/* Mobile TOC */}
          <div className="max-w-4xl">
            <TableOfContents headings={headings} />
          </div>

          {/* Article body */}
          <article className="max-w-4xl lg:mr-20 xl:mr-35">
            <BlogContentWrapper>
              <CustomMDX source={post.content} />
            </BlogContentWrapper>
          </article>

          {/* Anchor for TOC hide trigger */}
          <div id="blog-content-end" className="h-0 w-0 pointer-events-none" aria-hidden="true" />

          {/* Desktop TOC (fixed, injected into DOM here but visually positioned via CSS) */}
          <div className="hidden lg:block">
            {/* TableOfContents already renders its fixed sidebar above */}
          </div>

          {/* Related articles */}
          <div className="mt-14 pt-10 border-t border-gray-200 dark:border-gray-800 max-w-4xl">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
            <Posts
              exclude={[post.slug]}
              range={[1, 3]}
              columns="3"
              thumbnail
              direction="column"
            />
          </div>

        </div>
      </div>
    </BlogReadingProvider>
  );
}
