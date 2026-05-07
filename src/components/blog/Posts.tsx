import { getPosts } from "@/lib/mdx";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
}: PostsProps) {
  let allBlogs = getPosts(["src", "app", "blog", "posts"]);

  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  const sortedBlogs = allBlogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  const gridCols =
    columns === "3"
      ? "grid-cols-1 sm:grid-cols-3"
      : columns === "2"
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1";

  return (
    <>
      {displayedBlogs.length > 0 && (
        <div className={`grid ${gridCols} gap-4`}>
          {displayedBlogs.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
          ))}
        </div>
      )}
    </>
  );
}
