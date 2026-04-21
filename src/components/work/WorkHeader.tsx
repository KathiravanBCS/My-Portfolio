"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa6";

export function WorkHeader({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
        My <span className="text-[#ff4081]">{title}</span>{" "}
        <motion.span
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block ml-1"
        >
          <FaStar className="text-[#ff4081] h-5 w-5 md:h-7 md:w-7 inline" />
        </motion.span>
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto mt-4"
      >
        A collection of projects I&apos;ve built and contributed to
      </motion.p>
    </motion.div>
  );
}
