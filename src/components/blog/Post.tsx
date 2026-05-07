"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/formatDate";
import { person } from "@/config";

interface BlogPostMetadata {
  image?: string;
  title: string;
  publishedAt: string;
  tag?: string;
  [key: string]: unknown;
}

interface BlogPost {
  slug: string;
  metadata: BlogPostMetadata;
  content: string;
}

interface PostProps {
  post: BlogPost;
  thumbnail: boolean;
  direction?: "row" | "column";
}

export default function Post({ post, thumbnail, direction }: PostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="overflow-hidden hover:shadow-xl transition-shadow group block relative backdrop-blur-sm bg-white dark:bg-neutral-950/50 border border-pink-200 dark:border-pink-800/60 rounded-xl shadow-lg"
      >
        {post.metadata.image && thumbnail && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.metadata.image}
              alt={post.metadata.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>
        )}
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image
              src={person.avatar}
              alt={person.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-gray-500">{person.name}</span>
            <span className="text-xs text-[#ff4081]">
              {formatDate(post.metadata.publishedAt, false)}
            </span>
          </div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white h-14 line-clamp-2 overflow-hidden text-ellipsis">{post.metadata.title}</h3>
          {post.metadata.tag && (
            <span className="text-sm text-pink-600 dark:text-pink-400 font-medium">{post.metadata.tag}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
