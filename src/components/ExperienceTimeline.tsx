"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaAward, FaTrophy, FaMedal } from "react-icons/fa6";
import { HiAcademicCap, HiStar } from "react-icons/hi2";
import { LuCodeXml, LuBuilding, LuUser, LuX } from "react-icons/lu";
import { useState, useCallback, useEffect, memo, useRef } from "react";
import type { Experience } from "@/data/experienceData";
import { experienceData } from "@/data/experienceData";
import Image from "next/image";

// Image popup component
const ImagePopup = ({
  src,
  alt,
  isOpen,
  onClose,
}: {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  const handleDialogClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <motion.dialog
      ref={dialogRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="backdrop:bg-black/80 backdrop:backdrop-blur-sm max-w-2xl max-h-[80vh] rounded-2xl"
      onClick={handleDialogClick}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors rounded-full bg-black/20 hover:bg-black/40"
          aria-label="Close image popup"
        >
          <LuX className="w-6 h-6" />
        </button>
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-auto rounded-2xl shadow-2xl border-2 border-pink-400/30"
        />
      </motion.div>
    </motion.dialog>
  );
};

const ExperienceCard = memo(({ exp }: { exp: Experience }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "from-pink-500 to-rose-500";
      case "experience":
        return "from-pink-400 to-pink-600";
      case "education":
        return "from-pink-300 to-pink-500";
      default:
        return "from-pink-400 to-pink-600";
    }
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "trophy":
        return <FaTrophy className="text-pink-400" />;
      case "medal":
        return <FaMedal className="text-pink-400" />;
      case "code":
        return <LuCodeXml className="text-pink-400" />;
      case "academic":
        return <HiAcademicCap className="text-pink-400" />;
      default:
        return <FaAward className="text-pink-400" />;
    }
  };

  return (
        <div className="mb-12 md:mb-20 relative">
      {/* Timeline node/circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
        }}
        viewport={{ once: true, margin: "-150px", amount: 0.3 }}
        className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r ${getTypeColor(
          exp.type
        )} z-10 shadow-lg shadow-pink-400/30 flex items-center justify-center`}
      >
        <div className="text-white text-sm">{getIcon(exp.iconType)}</div>
      </motion.div>

      {/* Animated pulse around the circle */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-pink-400/10" />

      {/* Content card */}
      <div
        className={`flex w-full ${exp.left ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`w-full md:w-1/2 ${
            exp.left ? "md:pl-4 lg:pl-10" : "md:pr-4 lg:pr-10"
          }`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-120px", amount: 0.2 }}
            transition={{
              duration: 0.8,
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative backdrop-blur-sm bg-white dark:bg-neutral-950/50 border border-pink-200 dark:border-pink-800/60 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-start gap-4">
              {/* Logo - Hidden */}

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-neutral-100 mb-2">
                  {exp.name}
                </h3>

                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                  <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 justify-center md:justify-start">
                    <LuUser className="w-4 h-4" />
                    <span className="text-sm font-medium">{exp.role}</span>
                  </div>
                  {exp.company && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-neutral-400 justify-center md:justify-start">
                      <LuBuilding className="w-4 h-4" />
                      <span className="text-sm">{exp.company}</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {exp.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border border-pink-300 dark:border-pink-800/40 font-medium transition-transform hover:scale-105"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating date indicator */}
      <div className="absolute -top-5 md:-top-6 left-1/2 transform -translate-x-1/2 bg-pink-900/30 backdrop-blur-sm border border-pink-800/60 text-pink-300 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs font-medium shadow-lg z-20">
        {exp.duration}
      </div>

      {/* Image Popup - Only for achievements */}
      {exp.type === "achievement" && (
        <ImagePopup
          src={exp.logo}
          alt={`${exp.company} logo`}
          isOpen={showImagePopup}
          onClose={() => setShowImagePopup(false)}
        />
      )}
    </div>
  );
});

ExperienceCard.displayName = "ExperienceCard";

export default function ExperienceTimeline() {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 md:px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            Experience <span className="text-[#ff4081]">&</span> Achievements
            <span className="inline-block ml-3">
              <FaAward className="text-[#ff4081]" />
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
            My journey through various achievements, experiences, and milestones
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative z-10">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-300/40 via-pink-400/60 to-pink-300/40 hidden md:block" />

          {/* Experience Cards */}
          <div className="relative">
            {experienceData.map((exp, index) => (
              <ExperienceCard key={exp.id || index} exp={exp} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center md:mt-12 relative z-10">
          <div className="inline-flex items-center gap-1 md:gap-3 px-3 md:px-6 py-1.5 md:py-4 bg-gradient-to-r from-pink-900/30 to-pink-800/20 rounded-full text-pink-300 font-medium border border-pink-800/60 shadow-lg">
            <HiStar className="text-pink-500" />
            <span>Always striving for excellence!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
