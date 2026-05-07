"use client";

import { ThemeProvider } from "next-themes";
import { AnimatedBackground } from "./AnimatedBackground";
import { GlobalFontProvider } from "@/components/common/GlobalFontProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <GlobalFontProvider>
        <AnimatedBackground />
        {children}
      </GlobalFontProvider>
    </ThemeProvider>
  );
}
