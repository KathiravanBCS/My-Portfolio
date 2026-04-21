"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  HiEnvelope,
} from "react-icons/hi2";
import { ContactForm as ContactPage } from "@/components";


export function GetInTouch() {

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-6">
      <motion.div
        className="flex flex-col items-center gap-12 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="flex flex-col items-center gap-3 w-full" variants={itemVariants}>
          <p className="font-mono text-[#ff4081] text-sm tracking-widest uppercase">
            Get In Touch
          </p>
          <h2 className="font-mono font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white text-center">
            Let&apos;s Build <span className="text-[#ff4081]">Something</span>
          </h2>
          <p className="font-mono text-base sm:text-lg text-gray-700 dark:text-gray-400 max-w-2xl text-center">
            Got a project, opportunity, or just want to say hello? I'm always up for a conversation.
          </p>
        </motion.div>

        {/* Contact Form Component */}
        <motion.div variants={itemVariants} className="w-full">
          <ContactPage />
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"
          variants={itemVariants}
        />

        {/* Contact Info */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm"
          variants={containerVariants}
        >
          <motion.div
            className="flex items-center gap-3"
            variants={itemVariants}
            whileHover={{ x: 4 }}
          >
            <HiEnvelope className="w-5 h-5 text-[#ff4081]" />
            <a
              href="mailto:kathiravanvittopa717@gmail.com"
              className="text-gray-700 dark:text-gray-400 hover:text-[#ff4081] transition-colors"
            >
              kathiravanvittopa717@gmail.com
            </a>
          </motion.div>

          <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-700" />

          <motion.div
            className="flex items-center gap-3 font-mono"
            variants={itemVariants}
          >
            <span className="text-gray-600 dark:text-gray-500">Response time:</span>
            <span className="text-[#ff4081] font-semibold">24–48 hours</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
