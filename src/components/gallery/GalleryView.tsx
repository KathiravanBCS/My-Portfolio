"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { gallery } from "@/resources";
import { FaStar } from "react-icons/fa6";

export default function GalleryView() {
  return (
    <div>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Photo <span className="text-[#ff4081]">Gallery</span>{" "}
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="inline-block ml-1"
          >
            <FaStar className="text-[#ff4081] h-5 w-5 md:h-8 md:w-8 inline" />
          </motion.span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
          A visual journey through my work and experiences
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="columns-1 sm:columns-2 gap-4">
        {gallery.images.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.02 }}
            className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-pink-200/50 dark:border-pink-800/30 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={image.orientation === "horizontal" ? 338 : 800}
              className="w-full h-auto"
              sizes="(max-width: 560px) 100vw, 50vw"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
