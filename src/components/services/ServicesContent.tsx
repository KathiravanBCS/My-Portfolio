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
            What I Offer
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Services & <span className="text-[#ff4081]">Solutions</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Full-stack development, AI integration, and custom solutions tailored to your business needs. From concept to deployment, I help bring your ideas to life.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-8 mb-16"
      >
        {services.services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/50 hover:border-pink-300 dark:hover:border-pink-800/60 hover:shadow-lg dark:hover:shadow-pink-900/20 transition-all duration-300 backdrop-blur-sm"
          >
            {/* Hover gradient background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-50 to-transparent dark:from-pink-950/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10">
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Highlights */}
              {service.highlights && service.highlights.length > 0 && (
                <div className="space-y-2 mb-6">
                  {service.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
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
                href="/contact"
                className="inline-flex items-center gap-2 text-[#ff4081] font-semibold text-sm hover:gap-3 transition-all group/link"
              >
                Get Started
                <HiArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Why Choose Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 p-10 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-950/50"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Why Work With Me?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-950/50 flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              Fast & Reliable
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Optimized code, quick turnaround, and proven delivery track record.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/50 flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              AI-Ready
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Latest AI integrations and automation to stay ahead of the curve.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              Secure & Scalable
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enterprise-grade security and architecture that grows with you.
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
          Ready to bring your project to life?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Let's discuss your requirements and create a custom solution that fits your needs.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#ff4081] hover:bg-[#e0356e] text-white font-semibold rounded-lg transition-all hover:shadow-lg"
        >
          Start Your Project
          <HiArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
