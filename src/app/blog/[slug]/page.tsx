import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { baseURL, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import { Posts } from "@/components/blog/Posts";

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
    },
  };
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

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-16 sm:py-24 flex flex-col gap-8">
      <div className="text-center flex flex-col items-center gap-3">
        <Link
          href="/blog"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Blog
        </Link>
        <p className="text-sm text-gray-500">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold">
          {post.metadata.title}
        </h1>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Image
          src={person.avatar}
          alt={person.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-sm font-medium">{person.name}</span>
      </div>

      {post.metadata.image && (
        <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <article className="max-w-2xl mx-auto w-full">
        <CustomMDX source={post.content} />
      </article>

      <div className="mt-16 flex flex-col items-center gap-8">
        <hr className="w-16 border-gray-200 dark:border-gray-800" />
        <h2 className="text-2xl font-bold">Recent Posts</h2>
        <Posts
          exclude={[post.slug]}
          range={[1, 2]}
          columns="2"
          thumbnail
          direction="column"
        />
      </div>

      <ScrollToHash />
    </div>
  );
}
