import { notFound } from "next/navigation";
import { getPosts } from "@/lib/mdx";
import type { Metadata } from "next";
import { baseURL, work } from "@/config";
import ProjectDetailClient from "@/components/work/ProjectDetailClient";

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
    title: post.metadata.title,
    description: post.metadata.summary,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${baseURL}${work.path}/${post.slug}`,
      images:
        post.metadata.images.length > 0
          ? [{ url: post.metadata.images[0] }]
          : [],
    },
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const allPosts = getPosts(["src", "app", "work", "projects"]);
  const post = allPosts.find((p) => p.slug === slugPath);

  if (!post) {
    notFound();
  }

  const sortedPosts = allPosts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
  const prevPost =
    currentIndex > 0
      ? { slug: sortedPosts[currentIndex - 1].slug, title: sortedPosts[currentIndex - 1].metadata.title }
      : null;
  const nextPost =
    currentIndex < sortedPosts.length - 1
      ? { slug: sortedPosts[currentIndex + 1].slug, title: sortedPosts[currentIndex + 1].metadata.title }
      : null;

  return (
    <ProjectDetailClient
      post={post}
      prevPost={prevPost}
      nextPost={nextPost}
    />
  );
}
