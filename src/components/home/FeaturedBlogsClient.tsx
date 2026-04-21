"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaBlogger } from "react-icons/fa";
import Post from "@/components/blog/Post";

interface BlogPost {
  slug: string;
  metadata: {
    image?: string;
    title: string;
    publishedAt: string;
    tag?: string;
    [key: string]: unknown;
  };
  content: string;
}

interface FeaturedBlogsClientProps {
  posts: BlogPost[];
}

export function FeaturedBlogsClient({ posts }: FeaturedBlogsClientProps) {
  const featuredPost = posts[0];
  const additionalPosts = posts.slice(1, 4);

  return (
    <section className="min-h-screen relative overflow-hidden py-20 px-4">
      <div className="relative z-10 container mx-auto max-w-6xl md:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-7 md:mb-16 flex flex-col items-center gap-3"
        >
          <p className="font-mono text-[#ff4081] text-sm tracking-widest uppercase">
            Latest Articles
          </p>
          <h2 className="font-mono font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white">
            <span className="text-[#ff4081]">Blog Posts</span>
          </h2>
          <p className="font-mono text-base sm:text-lg text-gray-700 dark:text-gray-400 max-w-2xl">
            Insights on development, technology, and web design.
          </p>
        </motion.div>

        {/* Blog Posts */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            staggerChildren: 0.1,
          }}
          className="space-y-6 md:space-y-12"
        >
          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Post post={featuredPost} thumbnail={true} />
            </motion.div>
          )}

          {/* Additional Posts Grid */}
          {additionalPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {additionalPosts.map((post) => (
                <Post key={post.slug} post={post} thumbnail={true} />
              ))}
            </motion.div>
          )}

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center pt-8"
          >
            <motion.a
              href="/blog"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 p-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-[#fa0f69] to-[#ff1b6b] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#fa0f69]/25 transition-all duration-300"
            >
              <FaBlogger className="w-5 h-5" />
              View All Articles
              <FaArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
