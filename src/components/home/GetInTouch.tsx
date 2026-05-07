"use client";


import { motion } from "framer-motion";
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
    <section  id="get-in-touch-section" className="w-full py-8 md:py-12 px-4 md:px-6">
      <motion.div
        className="flex flex-col items-center gap-6 max-w-6xl mx-auto"
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

      </motion.div>
    </section>
  );
}
