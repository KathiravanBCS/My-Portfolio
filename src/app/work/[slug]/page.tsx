import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { baseURL, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Projects } from "@/components/work/Projects";

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

  const post = getPosts(["src", "app", "work", "projects"]).find(
    (p) => p.slug === slugPath
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-16 sm:py-24 flex flex-col gap-8">
      <div className="text-center flex flex-col items-center gap-3">
        <Link
          href="/work"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          All Projects
        </Link>
        <p className="text-sm text-gray-500">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold">
          {post.metadata.title}
        </h1>
      </div>

      {post.metadata.team && post.metadata.team.length > 0 && (
        <div className="flex items-center justify-center gap-4">
          <div className="flex -space-x-2">
            {post.metadata.team.map((member) => (
              <Image
                key={member.name}
                src={member.avatar}
                alt={member.name}
                width={32}
                height={32}
                className="rounded-full border-2 border-white dark:border-gray-900"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            {post.metadata.team.map((member, i) => (
              <span key={member.name}>
                {i > 0 && ", "}
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {member.name}
                </a>
              </span>
            ))}
          </p>
        </div>
      )}

      {post.metadata.images.length > 0 && (
        <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          <Image
            src={post.metadata.images[0]}
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
        <h2 className="text-2xl font-bold">Related Projects</h2>
        <Projects exclude={[post.slug]} range={[1, 2]} />
      </div>

      <ScrollToHash />
    </div>
  );
}
