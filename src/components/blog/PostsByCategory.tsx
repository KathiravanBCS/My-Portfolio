"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Post from "./Post";
import { motion } from "framer-motion";
import { FiBook, FiTrendingUp, FiBriefcase, FiCode, FiGrid, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PostMetadata {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images?: string[];
  tag?: string;
  category?: string;
  team?: Array<{
    name: string;
    role: string;
    avatar: string;
    linkedIn: string;
  }>;
  [key: string]: unknown;
}

interface BlogPost {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

interface PostsByCategoryProps {
  posts: BlogPost[];
  thumbnail?: boolean;
}

const categoryIcons: Record<string, React.ReactNode> = {
  "All": <FiGrid className="w-5 h-5" />,
  "Learning & Tutorials": <FiBook className="w-5 h-5" />,
  "Market Trends & Industry Insights": <FiTrendingUp className="w-5 h-5" />,
  "Project Case Studies": <FiBriefcase className="w-5 h-5" />,
  "Technical Deep Dives": <FiCode className="w-5 h-5" />,
  Uncategorized: <FiBook className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  "All": "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-800",
  "Learning & Tutorials": "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
  "Market Trends & Industry Insights": "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800",
  "Project Case Studies": "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800",
  "Technical Deep Dives": "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
  Uncategorized: "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800",
};

export function PostsByCategory({
  posts,
  thumbnail = false,
}: PostsByCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sortedBlogs = posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  // Group posts by category
  const groupedByCategory = sortedBlogs.reduce(
    (acc, post) => {
      const category = post.metadata.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(post);
      return acc;
    },
    {} as Record<string, BlogPost[]>
  );

  // Define category order
  const categoryOrder = [
    "All",
    "Learning & Tutorials",
    "Market Trends & Industry Insights",
    "Project Case Studies",
    "Technical Deep Dives",
    "Uncategorized",
  ];

  const orderedCategories = categoryOrder.filter((cat) => {
    if (cat === "All") return true;
    return groupedByCategory[cat];
  });
  
  // Set default category on first load
  const activeCategory = selectedCategory || orderedCategories[0];
  
  // Get current posts based on active category
  let currentPosts: BlogPost[] = [];
  if (activeCategory === "All") {
    currentPosts = sortedBlogs;
  } else {
    currentPosts = groupedByCategory[activeCategory] || [];
  }

  // Check scroll position and update arrow visibility
  const checkScrollPosition = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const isAtStart = scrollLeft === 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1; // -1 for rounding errors

      setShowLeftArrow(!isAtStart);
      setShowRightArrow(!isAtEnd);
    }
  }, []);

  // Handle scroll events
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      // Check initial state
      checkScrollPosition();

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, [checkScrollPosition]);

  // Also check when category changes (content might change)
  useEffect(() => {
    checkScrollPosition();
  }, [checkScrollPosition]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-12">
      {/* Category Tabs - Single Row with Navigation Arrows */}
      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: showLeftArrow ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => scroll("left")}
          disabled={!showLeftArrow}
          className={`flex-shrink-0 p-2 rounded-lg transition-all ${
            showLeftArrow
              ? "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll left"
        >
          <FiChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto pb-2 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{"\n.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }\n.no-scrollbar::-webkit-scrollbar { display: none; }\n"}</style>
            <div className="flex gap-3 min-w-max">
              {orderedCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-[#ff4081] to-[#ff1b6b] text-white border-transparent shadow-lg"
                      : `${categoryColors[category]} hover:shadow-md`
                  }`}
                >
                  {categoryIcons[category]}
                  <span className="text-sm sm:text-base">{category}</span>
                  <span className="text-xs opacity-75 ml-1">
                    ({category === "All" ? sortedBlogs.length : (groupedByCategory[category]?.length || 0)})
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <motion.button
          initial={{ opacity: 1 }}
          animate={{ opacity: showRightArrow ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => scroll("right")}
          disabled={!showRightArrow}
          className={`flex-shrink-0 p-2 rounded-lg transition-all ${
            showRightArrow
              ? "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
              : "opacity-0 pointer-events-none"
          }`}
          aria-label="Scroll right"
        >
          <FiChevronRight className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Posts Grid */}
      <div>
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentPosts.map((post) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Post post={post} thumbnail={thumbnail} />
            </motion.div>
          ))}
        </motion.div>

        {currentPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No blog posts available in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
