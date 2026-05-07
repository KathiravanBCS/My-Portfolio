"use client";

import { useState, createContext, useContext, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Check, CaseSensitive, Clipboard, ClipboardCheck, Minus, Plus } from "lucide-react";

type FontSize = number;
type FontType = "standard" | "inter" | "mono";

interface ReadingContextValue {
  fontSize: FontSize;
  setFontSize: React.Dispatch<React.SetStateAction<FontSize>>;
  fontType: FontType;
  setFontType: React.Dispatch<React.SetStateAction<FontType>>;
  markdownContent: string;
  setMarkdownContent: React.Dispatch<React.SetStateAction<string>>;
}

const ReadingContext = createContext<ReadingContextValue | null>(null);

export function useReading() {
  const ctx = useContext(ReadingContext);
  if (!ctx) throw new Error("useReading must be used within ReadingProvider");
  return ctx;
}

export function ReadingProvider({
  children,
  markdownContent = "",
}: {
  children: React.ReactNode;
  markdownContent?: string;
}) {
  const [fontSize, setFontSize] = useState(18);
  const [fontType, setFontType] = useState<FontType>("standard");
  const [markdownContentState, setMarkdownContent] = useState(markdownContent);

  useEffect(() => {
    if (window.innerWidth < 640) setFontSize(16);
  }, []);

  return (
    <ReadingContext.Provider
      value={{
        fontSize,
        setFontSize,
        fontType,
        setFontType,
        markdownContent: markdownContentState,
        setMarkdownContent,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
}

function Tooltip({
  children,
  label,
  orientation = "horizontal",
}: {
  children: React.ReactNode;
  label: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <span
        className={cn(
          "absolute whitespace-nowrap px-2 py-1 text-xs rounded-lg border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10 shadow-lg",
          orientation === "vertical"
            ? "left-full ml-2"
            : "bottom-full mb-2"
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function ReadingFontControls({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical";
}) {
  const { fontType, setFontType } = useReading();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fonts: { type: FontType; label: string; className?: string }[] = [
    { type: "inter", label: "Inter" },
    { type: "standard", label: "Geist Sans" },
    { type: "mono", label: "JetBrains" },
  ];

  const getDropdownPosition = () => {
    if (orientation === "vertical") return "left-full top-0 ml-2";
    return "top-full left-0 mt-2";
  };

  return (
    <div className="relative" ref={menuRef}>
      <Tooltip label="Change Font" orientation={orientation}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-center h-[38px] w-[38px] rounded-lg transition-colors border",
            "bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20",
            isOpen && "bg-gray-200 dark:bg-white/10 border-gray-300 dark:border-white/20"
          )}
          aria-label="Change font"
        >
          <CaseSensitive size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
      </Tooltip>

      {isOpen && (
        <div
          className={cn(
            "absolute w-40 rounded-lg shadow-xl overflow-hidden z-50 backdrop-blur-sm border",
            getDropdownPosition(),
            "bg-white dark:bg-gray-900 border-gray-200 dark:border-white/10"
          )}
        >
          <div className="p-1 flex flex-col gap-0.5">
            {fonts.map((font) => (
              <button
                type="button"
                key={font.type}
                onClick={() => {
                  setFontType(font.type);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                  fontType === font.type
                    ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                )}
              >
                <span>{font.label}</span>
                {fontType === font.type && (
                  <Check size={14} className="text-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ReadingFontWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fontType } = useReading();

  const getFontStyles = () => {
    switch (fontType) {
      case "mono":
        return {
          className: "",
          style: { fontFamily: "var(--font-jetbrains), monospace" },
        };
      case "inter":
        return {
          className: "",
          style: { fontFamily: "var(--font-inter), system-ui, sans-serif" },
        };
      default:
        return {
          className: "",
          style: { fontFamily: "var(--font-geist-sans), system-ui, sans-serif" },
        };
    }
  };

  const { className, style } = getFontStyles();

  return (
    <div className={`reading-font-wrapper ${className}`} style={style}>
      {children}
    </div>
  );
}

export function ReadingZoomControls({ orientation = "horizontal" }: { orientation?: "horizontal" | "vertical" }) {
  const { fontSize, setFontSize } = useReading();
  const isVertical = orientation === "vertical";

  return (
    <div className={cn(
      "flex items-center gap-1 rounded-xl p-1 border transition-colors bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10",
      isVertical ? "flex-col w-[38px]" : "h-[38px]"
    )}>
      <Tooltip label="Decrease" orientation={orientation}>
        <button
          type="button"
          onClick={() => setFontSize((s) => Math.max(s - 2, 13))}
          className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          aria-label="Decrease font size"
        >
          <Minus size={16} />
        </button>
      </Tooltip>

      <Tooltip label="Reset" orientation={orientation}>
        <button
          type="button"
          onClick={() => setFontSize(window.innerWidth < 640 ? 16 : 18)}
          className="text-xs font-mono font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors min-w-[2.5ch] text-center select-none px-1"
          aria-label="Reset font size"
        >
          {fontSize}
        </button>
      </Tooltip>

      <Tooltip label="Increase" orientation={orientation}>
        <button
          type="button"
          onClick={() => setFontSize((s) => Math.min(s + 2, 30))}
          className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          aria-label="Increase font size"
        >
          <Plus size={16} />
        </button>
      </Tooltip>
    </div>
  );
}

export function CopyMarkdownButton({
  orientation = "horizontal",
}: {
  orientation?: "horizontal" | "vertical";
}) {
  const { markdownContent } = useReading();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Tooltip label="Copy Markdown" orientation={orientation}>
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center justify-center h-[38px] w-[38px] rounded-lg transition-colors border bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20"
        aria-label="Copy markdown"
      >
        {copied ? (
          <ClipboardCheck size={20} className="text-green-500" />
        ) : (
          <Clipboard size={20} className="text-gray-600 dark:text-gray-400" />
        )}
      </button>
    </Tooltip>
  );
}

export function ReadingFloatingControls() {
  return (
    <div className="hidden xl:flex fixed left-4 2xl:left-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3 p-2 backdrop-blur-xl border rounded-2xl shadow-2xl bg-white/95 dark:bg-gray-950/90 border-gray-200 dark:border-white/10">
      <ReadingZoomControls orientation="vertical" />
      <div className="w-6 h-px bg-gray-200 dark:bg-white/10" />
      <ReadingFontControls orientation="vertical" />
      <div className="w-6 h-px bg-gray-200 dark:bg-white/10" />
      <CopyMarkdownButton orientation="vertical" />
    </div>
  );
}

export function ReadingContentWrapper({ children }: { children: React.ReactNode }) {
  const { fontSize, fontType } = useReading();

  const effectiveFontSize = fontType === "mono" ? fontSize - 2 : fontSize;

  const getFontFamily = () => {
    switch (fontType) {
      case "mono":
        return "var(--font-jetbrains), monospace";
      case "inter":
        return "var(--font-inter), system-ui, sans-serif";
      default:
        return "var(--font-geist-sans), system-ui, sans-serif";
    }
  };

  return (
    <div
      className="blog-content"
      style={{
        "--blog-text-size": `${effectiveFontSize}px`,
        fontFamily: getFontFamily(),
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
