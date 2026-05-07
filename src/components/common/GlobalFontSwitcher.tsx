"use client";

import { useState, useRef, useEffect } from "react";
import { useGlobalFont } from "./GlobalFontProvider";
import { Check, CaseSensitive } from "lucide-react";
import { cn } from "@/lib/utils";

type FontType = "geist" | "inter" | "mono";

const FONTS: { type: FontType; label: string }[] = [
  { type: "geist", label: "Geist Sans" },
  { type: "inter", label: "Inter" },
  { type: "mono", label: "JetBrains" },
];

export function GlobalFontSwitcher() {
  const { fontType, setFontType } = useGlobalFont();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentFont = FONTS.find((f) => f.type === fontType);

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className="p-2 rounded-full text-gray-400 dark:text-gray-600"
        aria-label="Loading font switcher"
      >
        <CaseSensitive size={18} />
      </button>
    );
  }

  return (
    <div className="relative group" ref={menuRef}>
      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-2 rounded-full transition-colors border relative",
          "text-gray-600 dark:text-gray-400",
          "hover:text-gray-900 dark:hover:text-white",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "border-gray-200 dark:border-gray-700",
          isOpen && "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        )}
        aria-label="Change font"
      >
        <CaseSensitive size={18} />
        {/* Mobile Tooltip - appears above on small screens */}
        <span className="md:hidden absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap px-2 py-1 text-xs rounded bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          {currentFont?.label}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 bottom-full md:bottom-auto md:top-full md:mt-2 mb-2 md:mb-0 w-40 rounded-lg shadow-xl overflow-hidden z-50 backdrop-blur-sm border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <div className="p-1 flex flex-col gap-0.5">
            {FONTS.map((font) => (
              <button
                type="button"
                key={font.type}
                onClick={() => {
                  setFontType(font.type);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors text-left",
                  fontType === font.type
                    ? "bg-pink-100 dark:bg-pink-950/30 text-pink-900 dark:text-pink-300 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <span>{font.label}</span>
                {fontType === font.type && (
                  <Check size={14} className="text-pink-600 dark:text-pink-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
