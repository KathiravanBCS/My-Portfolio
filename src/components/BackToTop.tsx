"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowUp } from "react-icons/lu";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 300);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [toggleVisibility]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="back-to-top-desktop"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-28 right-20 md:bottom-28 md:right-24 z-40 hidden md:block"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="relative">
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  key="tooltip"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
                >
                  Back to top
                  <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-gray-900 dark:border-l-gray-800 border-y-4 border-y-transparent" />
                </motion.div>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex h-12 w-12 items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
              aria-label="Back to top"
            >
              <LuArrowUp className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
      {isVisible && (
        <motion.div
          key="back-to-top-mobile"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-28 right-20 md:bottom-28 md:right-24 z-40 md:hidden"
        >
          <button
            type="button"
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600 active:from-pink-600 active:to-pink-700 text-white rounded-full shadow-lg active:shadow-xl transition-all duration-200 cursor-pointer"
            aria-label="Back to top"
          >
            <LuArrowUp className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
