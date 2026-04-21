"use client";

import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { ComponentType } from "react";

interface SkillCardProps {
  name: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  category: string;
  proficiency?: number;
}

const TECH_COLORS: Record<string, string> = {
  // Version Control
  Git: "#F05032",
  GitHub: "#ffffff",
  
  // Languages
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  HTML5: "#E34C26",
  CSS3: "#1572B6",
  
  // Frontend
  "React.js": "#61DAFB",
  "Next.js": "#ffffff",
  "Material UI (MUI)": "#007FFF",
  "Mantine UI": "#339af0",
  
  // Backend
  "Node.js": "#339933",
  NestJS: "#E0234E",
  "Prisma ORM": "#2D3748",
  
  // Databases
  MySQL: "#00758F",
  PostgreSQL: "#4169E1",
  
  // Cloud & Hosting
  "Microsoft Azure": "#0078D4",
  "Amazon Web Services (AWS)": "#FF9900",
  Firebase: "#FFCA28",
  Vercel: "#ffffff",
  
  // CMS
  WordPress: "#21759B",
  
  // Tools
  "Visual Studio Code (VS Code)": "#007ACC",
  DBeaver: "#FFCB2A",
};

const TECH_COLORS_LIGHT: Record<string, string> = {
  // Version Control
  Git: "#F05032",
  GitHub: "#000000",
  
  // Languages
  Python: "#3776AB",
  JavaScript: "#b8860b",
  TypeScript: "#3178C6",
  HTML5: "#E34C26",
  CSS3: "#1572B6",
  
  // Frontend
  "React.js": "#087ea4",
  "Next.js": "#000000",
  "Material UI (MUI)": "#007FFF",
  "Mantine UI": "#2b6cb0",
  
  // Backend
  "Node.js": "#339933",
  NestJS: "#E0234E",
  "Prisma ORM": "#2D3748",
  
  // Databases
  MySQL: "#00758F",
  PostgreSQL: "#4169E1",
  
  // Cloud & Hosting
  "Microsoft Azure": "#0078D4",
  "Amazon Web Services (AWS)": "#FF9900",
  Firebase: "#dd7200",
  Vercel: "#000000",
  
  // CMS
  WordPress: "#21759B",
  
  // Tools
  "Visual Studio Code (VS Code)": "#007ACC",
  DBeaver: "#000000",
};

export default function SkillCard({ name, icon: Icon }: SkillCardProps) {
  const isDark = typeof document !== "undefined" && 
    document.documentElement.classList.contains("dark");
  
  const iconColor = isDark
    ? TECH_COLORS[name] || "#ffffff"
    : TECH_COLORS_LIGHT[name] || "#666666";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="min-w-[140px] h-[120px]"
    >
      <div className="relative h-full rounded-2xl border border-pink-200 dark:border-neutral-800/50 p-2">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          movementDuration={1.5}
        />
        <div className="relative flex h-full flex-col justify-center items-center gap-3 overflow-hidden rounded-xl p-4 bg-gradient-to-br from-white to-pink-50 dark:from-[#18181a] dark:to-[#0a0a0a] shadow-lg">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ color: iconColor }}
          >
            <Icon
              size={28}
              className="transition-colors duration-300"
            />
          </motion.div>

          {/* Skill Name */}
          <span className="text-sm font-semibold text-gray-900 dark:text-white text-center leading-tight">
            {name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
