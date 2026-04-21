"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { about, person, social } from "@/resources";
import { iconLibrary } from "@/resources/icons";
import { FaStar } from "react-icons/fa6";
import { HiEnvelope } from "react-icons/hi2";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function AboutContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto py-16 sm:py-24"
    >
      {/* Profile Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-8 items-center sm:items-start mb-12"
      >
        {about.avatar.display && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="shrink-0"
          >
            <Image
              src={person.avatar}
              alt={person.name}
              width={160}
              height={160}
              className="rounded-2xl border-2 border-pink-200 dark:border-pink-800/60"
            />
          </motion.div>
        )}
        <div className="flex flex-col items-center sm:items-start gap-4">
          <div className="text-center sm:text-left">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
            >
              {person.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-[#ff4081] mt-1 font-medium"
            >
              {person.role}
            </motion.p>
          </div>
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              className="w-4 h-4 text-[#ff4081]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span>Chennai, Tamil Nadu, India</span>
          </motion.div>
          {person.languages && person.languages.length > 0 && (
            <motion.div variants={itemVariants} className="flex gap-2">
              {person.languages.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium border border-pink-200 dark:border-pink-800/40"
                >
                  {lang}
                </span>
              ))}
            </motion.div>
          )}
          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mt-2">
            {social
              .filter((item) => item.essential)
              .map((item) => {
                const IconComponent = iconLibrary[item.icon];
                return IconComponent ? (
                  <motion.a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-pink-200 dark:border-pink-800/60 hover:bg-pink-50 dark:hover:bg-pink-950/30 rounded-lg font-medium transition-colors text-sm"
                  >
                    <IconComponent className="w-4 h-4 text-[#ff4081]" />
                    <span>{item.name}</span>
                  </motion.a>
                ) : null;
              })}
          </motion.div>
        </div>
      </motion.div>

      {/* Introduction */}
      {about.intro.display && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {about.intro.title}{" "}
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="inline-block ml-1"
            >
              <FaStar className="text-[#ff4081] h-5 w-5 inline" />
            </motion.span>
          </h2>
          <div className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {about.intro.description}
          </div>
        </motion.section>
      )}

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href={social.find((s) => s.name === "Email")?.link ?? "#"}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-pink-300 dark:border-pink-800/60 bg-white dark:bg-transparent text-gray-900 dark:text-white font-mono text-sm font-medium hover:bg-pink-50 dark:hover:bg-pink-950/30 transition-colors"
        >
          <HiEnvelope className="w-4 h-4 text-[#ff4081]" />
          Get in touch
        </a>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ff4081] hover:bg-[#e0356e] text-white font-mono text-sm font-medium transition-colors"
        >
          View Projects
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-pink-300 dark:border-pink-800/60 bg-pink-50 dark:bg-pink-950/30 hover:bg-pink-100 dark:hover:bg-pink-900/40 text-pink-700 dark:text-pink-300 font-mono text-sm font-medium transition-colors"
        >
          About Me
        </Link>
      </motion.div>
    </motion.div>
  );
}
