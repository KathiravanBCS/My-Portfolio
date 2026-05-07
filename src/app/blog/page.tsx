import type { Metadata } from "next";
import { blog, person, baseURL } from "@/config";
import { PostsByCategory } from "@/components/blog/PostsByCategory";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { getPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: blog.title,
  description: blog.description,
  openGraph: {
    title: blog.title,
    description: blog.description,
    url: `${baseURL}${blog.path}`,
  },
};

export default function Blog() {
  const allPosts = getPosts(["src", "app", "blog", "posts"]);

  return (
    <div className="py-16 sm:py-24">
      <BlogHeader title={blog.title} />
      <div className="flex flex-col gap-12">
        <PostsByCategory posts={allPosts} thumbnail />
      </div>
    </div>
  );
}
