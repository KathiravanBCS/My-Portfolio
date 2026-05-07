"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/headings";
import { slugify as transliterate } from "transliteration";

interface TableOfContentsProps {
  headings: Heading[];
  type?: "blog" | "project";
}

export function TableOfContents({ headings, type = "blog" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const tocNavRef = useRef<HTMLElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const contentStartId = type === "blog" ? "blog-content-start" : "project-content-start";
  const contentEndId = type === "blog" ? "blog-content-end" : "project-content-end";

  const updateVisibility = useCallback(() => {
    const startEl = document.getElementById(contentStartId);
    const endEl = document.getElementById(contentEndId);
    if (!startEl) return;
    const startRect = startEl.getBoundingClientRect();
    const hasPassedStart = startRect.top < 100;
    if (endEl) {
      const endRect = endEl.getBoundingClientRect();
      const hasReachedEnd = endRect.top < window.innerHeight * 0.7;
      setIsVisible(hasPassedStart && !hasReachedEnd);
    } else {
      setIsVisible(hasPassedStart);
    }
  }, [contentStartId, contentEndId]);

  const clearRAF = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (rafIdRef.current) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      updateVisibility();
    });
  }, [updateVisibility]);

  useEffect(() => {
    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearRAF();
    };
  }, [handleScroll, updateVisibility, clearRAF]);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (!activeId || !tocNavRef.current) return;
    const active = tocNavRef.current.querySelector(`a[href="#${activeId}"]`);
    if (active) {
      const navRect = tocNavRef.current.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      if (activeRect.top < navRect.top + 60 || activeRect.bottom > navRect.bottom - 20) {
        active.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      setIsMobileOpen(false);
    }
  };

  if (headings.length === 0) return null;

  const romans = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];

  const getNumber = (index: number) => {
    let h2Count = 0;
    let h3Count = 0;
    for (let i = 0; i <= index; i++) {
      if (headings[i].level === 2) {
        h2Count++;
        h3Count = 0;
      } else if (headings[i].level === 3) {
        h3Count++;
      }
    }
    const h = headings[index];
    if (h.level === 2) return `${h2Count}.`;
    if (h.level === 3) return romans[h3Count - 1] ?? `${h3Count}`;
    return "";
  };

  return (
    <>
      {/* Mobile collapsible */}
      <div className="lg:hidden mb-8">
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between p-4 border rounded-xl text-left transition-colors bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10"
        >
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" className="w-4 h-4 text-[#ff4081]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h10" />
            </svg>
            <span className="font-medium font-mono text-sm">TABLE OF CONTENTS</span>
          </div>
          <svg
            aria-hidden="true"
            className={cn("w-4 h-4 transition-transform", isMobileOpen && "rotate-180")}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isMobileOpen && (
          <nav className="mt-2 p-4 border rounded-xl bg-white dark:bg-gray-950 border-gray-200 dark:border-white/10">
            <ul className="space-y-3">
              {headings.map((h, idx) => {
                const num = getNumber(idx);
                return (
                  <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 16}px` }}>
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => handleClick(e, h.id)}
                      className={cn(
                        "flex items-baseline gap-3 text-sm transition-colors",
                        activeId === h.id
                          ? "text-gray-900 dark:text-white font-medium"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      )}
                    >
                      <span className={cn("font-mono text-xs shrink-0 w-5 text-right text-gray-400 dark:text-gray-500", h.level === 3 && "italic")}>
                        {num}
                      </span>
                      <span>{h.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop fixed sidebar */}
      <nav
        ref={tocNavRef}
        className={cn(
          "hidden lg:block fixed right-6 xl:right-8 top-24 w-56 xl:w-64 max-h-[calc(100vh-8rem)] p-4 overflow-y-auto toc-scrollbar transition-all duration-300 z-40",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        )}
      >
        <div className="mb-5 flex items-center gap-2">
          <svg aria-hidden="true" className="w-4 h-4 text-[#ff4081]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h10" />
          </svg>
          <h3 className="font-mono text-xs tracking-widest uppercase text-gray-500 dark:text-gray-400">
            Table of Contents
          </h3>
        </div>

        <ul className="space-y-3.5">
          {headings.map((h, idx) => {
            const num = getNumber(idx);
            const isActive = activeId === h.id;
            return (
              <li key={h.id} className="group relative">
                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleClick(e, h.id)}
                  style={{ marginLeft: `${(h.level - 2) * 12}px` }}
                  className={cn(
                    "flex items-baseline gap-3 text-sm transition-all duration-200 group-hover:translate-x-0.5",
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  )}
                >
                  <span className={cn(
                    "font-mono text-xs shrink-0 w-5 text-right transition-colors",
                    isActive ? "text-[#ff4081] font-bold" : "text-gray-400 dark:text-gray-600",
                    h.level === 3 && "italic"
                  )}>
                    {num}
                  </span>
                  <span className={cn("leading-snug", isActive && "font-medium")}>{h.text}</span>
                </a>
                {isActive && (
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#ff4081] rounded-full" />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

function slugify(str: string): string {
  return transliterate(str.replace(/&/g, " and "), {
    lowercase: true,
    separator: "-",
  }).replace(/\-\-+/g, "-");
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match: RegExpExecArray | null;
  match = headingRegex.exec(content);
  while (match !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[*_`]/g, "").trim();
    const id = slugify(text);
    headings.push({ id, text, level });
    match = headingRegex.exec(content);
  }
  return headings;
}
