"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaAward, FaTrophy, FaMedal } from "react-icons/fa6";
import { HiAcademicCap, HiStar } from "react-icons/hi2";
import { LuCodeXml, LuBuilding, LuUser, LuX } from "react-icons/lu";
import { useState, useCallback, useEffect, memo, useRef } from "react";
import { createPortal } from "react-dom";
import type { Experience } from "@/data/experienceData";
import { experienceData } from "@/data/experienceData";
import Image from "next/image";

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
  const isPDF = src.endsWith('.pdf');
  const [mounted, setMounted] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-modal-open", "true");
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-modal-open");
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-modal-open");
    };
  }, [isOpen, handleKeyDown, mounted]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center cursor-default"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-black/60 transition-all rounded-full bg-black/40 z-50 cursor-pointer"
              aria-label="Close certificate preview"
            >
              <LuX className="w-6 h-6" />
            </button>
            {isPDF ? (
              <iframe
                src={`${src}#toolbar=0`}
                title={alt}
                className="w-full h-[80vh] rounded-2xl border-2 border-pink-400/30"
              />
            ) : (
              <Image
                src={src}
                alt={alt}
                width={800}
                height={600}
                className="w-full h-[80vh] object-contain border-2 border-pink-400/30"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "achievement": return "from-pink-500 to-rose-500";
    case "experience":  return "from-pink-400 to-pink-600";
    case "education":   return "from-pink-300 to-pink-500";
    default:            return "from-pink-400 to-pink-600";
  }
};

const getIcon = (iconType: string) => {
  switch (iconType) {
    case "trophy":   return <FaTrophy className="w-4 h-4 text-white" />;
    case "medal":    return <FaMedal className="w-4 h-4 text-white" />;
    case "code":     return <LuCodeXml className="w-4 h-4 text-white" />;
    case "academic": return <HiAcademicCap className="w-4 h-4 text-white" />;
    default:         return <FaAward className="w-4 h-4 text-white" />;
  }
};

const ExperienceCard = memo(({ exp }: { exp: Experience }) => {
  const [showImagePopup, setShowImagePopup] = useState(false);

  return (
    <>
      {/* ── MOBILE: simple stacked card, no timeline ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="md:hidden mb-4"
      >
        <div className="backdrop-blur-sm bg-white/60 dark:bg-neutral-950/50 border border-pink-200/60 dark:border-pink-800/60 rounded-2xl p-4 shadow-lg">
          {/* Top row: icon + title + date badge */}
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getTypeColor(exp.type)} flex items-center justify-center flex-shrink-0 shadow-md`}>
              {getIcon(exp.iconType)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 dark:text-neutral-100 leading-tight">{exp.name}</h3>
              <span className="inline-block mt-1 text-[10px] bg-pink-100 dark:bg-pink-900/40 border border-pink-300 dark:border-pink-800/60 text-pink-700 dark:text-pink-300 px-2 py-0.5 rounded-full">
                {exp.duration}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-pink-600 dark:text-pink-400 mb-1">
            <LuUser className="w-3 h-3 flex-shrink-0" />
            <span className="text-xs font-medium">{exp.role}</span>
          </div>
          {exp.company && (
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-neutral-400 mb-2">
              <LuBuilding className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs">{exp.company}</span>
            </div>
          )}
          <p className="text-xs text-gray-600 dark:text-neutral-400 leading-relaxed">{exp.description}</p>
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {exp.technologies.map((tech: string) => (
                <span key={tech} className="px-2 py-0.5 text-[10px] rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border border-pink-300 dark:border-pink-800/40 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          )}
          {exp.certificate && (
            <button
              type="button"
              onClick={() => setShowImagePopup(true)}
              className="mt-3 inline-flex items-center gap-2 px-2.5 py-1.5 bg-pink-100 dark:bg-pink-900/20 hover:bg-pink-200 dark:hover:bg-pink-900/40 border border-pink-300 dark:border-pink-800/60 rounded-lg transition-colors duration-200 group"
            >
              <div className="relative w-9 h-12 bg-gradient-to-br from-pink-200 dark:from-pink-900/40 to-pink-100 dark:to-pink-800/40 rounded border border-pink-300 dark:border-pink-800/40 overflow-hidden flex items-center justify-center flex-shrink-0">
                {exp.certificate.endsWith('.pdf') ? (
                  <span className="text-[8px] font-bold text-pink-700 dark:text-pink-400">PDF</span>
                ) : (
                  <Image
                    src={exp.certificate}
                    alt={`${exp.name} certificate`}
                    width={36}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <span className="text-[10px] font-medium text-pink-700 dark:text-pink-300 group-hover:text-pink-800 dark:group-hover:text-pink-200">Certificate</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* ── DESKTOP: 3-column timeline grid ── */}
      <div className="hidden md:grid grid-cols-[1fr_80px_1fr] mb-12">
        {/* LEFT card slot */}
        <div className="pr-8 flex flex-col justify-start">
          {exp.left && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="backdrop-blur-sm bg-white/60 dark:bg-neutral-950/50 border border-pink-200/60 dark:border-pink-800/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent exp={exp} onImageOpen={() => setShowImagePopup(true)} />
            </motion.div>
          )}
        </div>

        {/* CENTER spine */}
        <div className="flex flex-col items-center">
          <div className="relative z-10 bg-pink-100 dark:bg-pink-900/30 backdrop-blur-sm border border-pink-300 dark:border-pink-800/60 text-pink-700 dark:text-pink-300 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg whitespace-nowrap text-center">
            {exp.duration}
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`relative z-10 mt-3 w-9 h-9 rounded-full bg-gradient-to-br ${getTypeColor(exp.type)} shadow-lg shadow-pink-500/40 flex items-center justify-center flex-shrink-0`}
          >
            {getIcon(exp.iconType)}
          </motion.div>
        </div>

        {/* RIGHT card slot */}
        <div className="pl-8 flex flex-col justify-start">
          {!exp.left && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="backdrop-blur-sm bg-white/60 dark:bg-neutral-950/50 border border-pink-200/60 dark:border-pink-800/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent exp={exp} onImageOpen={() => setShowImagePopup(true)} />
            </motion.div>
          )}
        </div>
      </div>

      {exp.certificate && (
        <ImagePopup
          src={exp.certificate}
          alt={`${exp.name} certificate`}
          isOpen={showImagePopup}
          onClose={() => setShowImagePopup(false)}
        />
      )}
    </>
  );
});

ExperienceCard.displayName = "ExperienceCard";

const CardContent = ({ exp, onImageOpen }: { exp: Experience; onImageOpen: () => void }) => (
  <div>
    <h3 className="text-base md:text-xl font-bold text-gray-900 dark:text-neutral-100 mb-2">
      {exp.name}
    </h3>
    <div className="flex flex-col gap-1 mb-3">
      <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
        <LuUser className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="text-sm font-medium">{exp.role}</span>
      </div>
      {exp.company && (
        <div className="flex items-center gap-2 text-gray-600 dark:text-neutral-400">
          <LuBuilding className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-sm">{exp.company}</span>
        </div>
      )}
    </div>
    <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed mb-3">
      {exp.description}
    </p>
    {exp.technologies && exp.technologies.length > 0 && (
      <div className="flex flex-wrap gap-1.5">
        {exp.technologies.map((tech: string) => (
          <span
            key={tech}
            className="px-2.5 py-0.5 text-xs rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border border-pink-300 dark:border-pink-800/40 font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    )}
    {exp.certificate && (
      <button
        type="button"
        onClick={onImageOpen}
        className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-pink-100 dark:bg-pink-900/20 hover:bg-pink-200 dark:hover:bg-pink-900/40 border border-pink-300 dark:border-pink-800/60 rounded-lg transition-colors duration-200 group"
      >
        <div className="relative w-12 h-16 bg-gradient-to-br from-pink-200 dark:from-pink-900/40 to-pink-100 dark:to-pink-800/40 rounded border border-pink-300 dark:border-pink-800/40 overflow-hidden flex items-center justify-center">
          {exp.certificate.endsWith('.pdf') ? (
            <span className="text-xs font-bold text-pink-700 dark:text-pink-400">PDF</span>
          ) : (
            <Image
              src={exp.certificate}
              alt={`${exp.name} certificate`}
              width={48}
              height={64}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <span className="text-xs font-medium text-pink-700 dark:text-pink-300 group-hover:text-pink-800 dark:group-hover:text-pink-200">View Certificate</span>
      </button>
    )}
  </div>
);

export default function ExperienceTimeline() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
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

        {/* Single continuous line behind all cards */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-300/40 via-pink-400/70 to-pink-300/40" />
          <div className="relative z-10">
            {experienceData.map((exp, index) => (
              <ExperienceCard key={exp.id || index} exp={exp} />
            ))}
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12">
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-800/20 rounded-full text-pink-700 dark:text-pink-300 font-medium border border-pink-300 dark:border-pink-800/60 shadow-lg">
            <HiStar className="text-pink-500" />
            <span>Always striving for excellence!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
