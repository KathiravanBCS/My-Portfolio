"use client";

import { createContext, useContext, useState, useEffect } from "react";

type FontType = "geist" | "inter" | "mono";

interface GlobalFontContextValue {
  fontType: FontType;
  setFontType: (font: FontType) => void;
}

const GlobalFontContext = createContext<GlobalFontContextValue | undefined>(
  undefined
);

const FONT_FAMILIES = {
  geist: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
  inter: "var(--font-inter), system-ui, -apple-system, sans-serif",
  mono: "var(--font-jetbrains), ui-monospace, monospace",
};

export function GlobalFontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fontType, setFontType] = useState<FontType>("geist");
  const [mounted, setMounted] = useState(false);

  // Load font preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("global-font");
    if (saved && (saved === "geist" || saved === "inter" || saved === "mono")) {
      setFontType(saved as FontType);
      applyFont(saved as FontType);
    } else {
      applyFont("geist");
    }
    setMounted(true);
  }, []);

  // Save font preference to localStorage and update CSS
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("global-font", fontType);
    applyFont(fontType);
  }, [fontType, mounted]);

  const applyFont = (font: FontType) => {
    const html = document.documentElement;
    const body = document.body;

    // Update CSS custom property for font-family
    html.style.setProperty("--global-font-family", FONT_FAMILIES[font]);

    // Apply font directly to html and body elements
    html.style.fontFamily = FONT_FAMILIES[font];
    body.style.fontFamily = FONT_FAMILIES[font];

    // Force update all elements with font-sans class
    const elements = document.querySelectorAll("[class*='font-']");
    for (const el of elements) {
      (el as HTMLElement).style.fontFamily = FONT_FAMILIES[font];
    }
  };

  const handleSetFontType = (font: FontType) => {
    setFontType(font);
  };

  return (
    <GlobalFontContext.Provider value={{ fontType, setFontType: handleSetFontType }}>
      {children}
    </GlobalFontContext.Provider>
  );
}

export function useGlobalFont() {
  const context = useContext(GlobalFontContext);
  if (context === undefined) {
    throw new Error("useGlobalFont must be used within GlobalFontProvider");
  }
  return context;
}
