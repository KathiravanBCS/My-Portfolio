"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services, person } from "@/config";
import { FaStar } from "react-icons/fa6";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi2";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function ServicesContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto py-16 sm:py-24 px-4"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-200 dark:border-pink-800/60 bg-pink-50 dark:bg-pink-950/30 mb-6">
          <FaStar className="text-[#ff4081] h-3 w-3" />
          <span className="text-sm font-medium text-pink-700 dark:text-pink-300">
            My Expertise
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Technical <span className="text-[#ff4081]">Specialties</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Full-stack development with expertise in React, TypeScript, NestJS, and AI integration. I specialize in building scalable, intelligent applications across the entire tech stack.
        </p>
      </motion.div>

      {/* Specialties Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 mb-16"
      >
        {services.services.map((specialty) => (
          <motion.div
            key={specialty.title}
            variants={itemVariants}
            className="group relative p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50 hover:border-pink-300 dark:hover:border-pink-800/60 hover:shadow-lg dark:hover:shadow-pink-900/20 transition-all duration-300 backdrop-blur-sm"
          >
            {/* Hover gradient background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-50 to-transparent dark:from-pink-950/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10">
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {specialty.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {specialty.description}
              </p>

              {/* Highlights */}
              {specialty.highlights && specialty.highlights.length > 0 && (
                <div className="space-y-2 mb-6">
                  {specialty.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <HiCheckCircle className="w-5 h-5 text-[#ff4081] mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Learn More Link */}
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-[#ff4081] font-semibold text-sm hover:gap-3 transition-all group/link"
              >
                View Projects
                <HiArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Strengths Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 p-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-950/50"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          My Approach
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-950/50 flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              Performance First
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Optimized code, efficient algorithms, and lightning-fast applications with proven track record.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              AI-Integrated
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Building intelligent features with latest AI APIs and machine learning to solve real problems.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              Scalable & Secure
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enterprise-grade architecture that is built to grow, with security and best practices throughout.
            </p>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Interested in my work?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Check out my latest projects, or get in touch to discuss potential collaboration or opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#ff4081] hover:bg-[#e0356e] text-white font-semibold rounded-lg transition-all hover:shadow-lg"
          >
            View My Projects
            <HiArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-[#ff4081] text-[#ff4081] hover:bg-pink-50 dark:hover:bg-pink-950/30 font-semibold rounded-lg transition-all"
          >
            Get In Touch
            <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
