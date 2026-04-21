import React from "react";
import { getPosts } from "@/utils/utils";
import { FeaturedBlogsClient } from "./FeaturedBlogsClient";

export function FeaturedBlogs() {
  const allPosts = getPosts(["src", "app", "blog", "posts"]);
  
  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  return <FeaturedBlogsClient posts={sortedPosts} />;
}
