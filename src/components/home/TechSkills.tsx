"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiAmazon,
  SiHtml5,
  SiCss3,
  SiMantine,
  SiMui ,
  SiNestjs,
  SiExpress,
  SiPhp,
  SiMysql,
  SiPrisma,
  SiGithub,
  SiWordpress,
  SiFigma,
  SiTailwindcss,
  SiFirebase,
  SiDocker,
  SiVercel,
  SiPython,
} from "react-icons/si";
import { FaWindows, FaTableCellsLarge } from "react-icons/fa6";
import { CgCode } from "react-icons/cg";
import Link from "next/link";

const techStack = [
  // Version Control
  { id: "git", name: "Git", icon: SiGit },
  { id: "github", name: "GitHub", icon: SiGithub },

  // Languages
  { id: "python", name: "Python", icon: SiPython },
  { id: "javascript", name: "JavaScript", icon: SiJavascript },
  { id: "typescript", name: "TypeScript", icon: SiTypescript },
  { id: "html5", name: "HTML5", icon: SiHtml5 },
  { id: "css3", name: "CSS3", icon: SiCss3 },

  // Frontend
  { id: "react", name: "React.js", icon: SiReact },
  { id: "nextjs", name: "Next.js", icon: SiNextdotjs },
  { id: "mui", name: "Material UI (MUI)", icon: SiMui  },
  { id: "mantine", name: "Mantine UI", icon: SiMantine },

  // Backend
  { id: "nodejs", name: "Node.js", icon: SiNodedotjs },
  { id: "nestjs", name: "NestJS", icon: SiNestjs },
  { id: "prisma", name: "Prisma ORM", icon: SiPrisma },

  // Databases
  { id: "mysql", name: "MySQL", icon: SiMysql },
  { id: "postgresql", name: "PostgreSQL", icon: SiPostgresql },

  // Cloud & Hosting
  { id: "azure", name: "Microsoft Azure", icon: FaWindows },
  { id: "aws", name: "Amazon Web Services (AWS)", icon: SiAmazon },
  { id: "firebase", name: "Firebase", icon: SiFirebase },
  { id: "vercel", name: "Vercel", icon: SiVercel },

  // CMS
  { id: "wordpress", name: "WordPress", icon: SiWordpress },

  // Tools
  { id: "vscode", name: "Visual Studio Code (VS Code)", icon: CgCode },
  { id: "dbeaver", name: "DBeaver", icon: SiMysql },
];

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

const SkillItem = ({
  tech,
  isDark,
}: {
  tech: (typeof techStack)[0];
  isDark: boolean;
}) => {
  const [isHovered, setHovered] = useState(false);
  const Icon = tech.icon;
  const color = isDark
    ? TECH_COLORS[tech.name] || "#ffffff"
    : TECH_COLORS_LIGHT[tech.name] || "#666666";

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        whileHover={{
          scale: 1.2,
          y: -5,
          transition: { duration: 0.2 },
        }}
        className="p-2 sm:p-3 cursor-pointer transition-all duration-300"
      >
        <Icon
          className={`transition-colors duration-300 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${
            isHovered
              ? ""
              : isDark
                ? "text-gray-600"
                : "text-gray-400"
          }`}
          style={{ color: isHovered ? color : undefined }}
        />

        {isHovered && (
          <motion.div
            className="absolute inset-0 blur-2xl -z-10 opacity-20 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, y: -15, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className={`absolute -top-8 left-1/2 z-50 px-3 py-1.5 rounded-lg border backdrop-blur-md text-xs font-medium whitespace-nowrap shadow-xl pointer-events-none ${
              isDark
                ? "border-white/10 bg-gray-900/90 text-white"
                : "border-gray-200 bg-white/90 text-gray-800"
            }`}
          >
            {tech.name}
            <div
              className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b ${
                isDark
                  ? "bg-gray-900/90 border-white/10"
                  : "bg-white/90 border-gray-200"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function TechSkills() {
  const isDark =
    typeof window !== "undefined" &&
    !document.documentElement.classList.contains("light");

  return (
    <section id="skills-section" className="w-full py-16 sm:py-24 relative overflow-hidden">

      <div className="flex flex-col items-center text-center gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="font-mono text-[#ff4081] text-sm tracking-widest uppercase">
            Tech Stack
          </p>
          <h2 className="font-mono font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white">
            <span className="text-[#ff4081]">Skills</span>
          </h2>
          <p className="font-mono text-base sm:text-lg text-gray-700 dark:text-gray-400 max-w-2xl">
            The technologies I build with.
          </p>
        </motion.div>

        {/* Tech Stack Flex Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-8 md:gap-x-12 md:gap-y-12 max-w-5xl mx-auto"
        >
          {techStack.map((tech) => (
            <SkillItem key={tech.id} tech={tech} isDark={isDark} />
          ))}
        </motion.div>

        {/* Technologies count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Link href="/skills" className="focus:outline-none">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-pink-300 dark:border-pink-800/60 bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-400 font-mono text-sm hover:border-pink-400 dark:hover:border-pink-700 transition-colors cursor-pointer">
              <CgCode className="w-4 h-4 text-[#ff4081]" />
              <span className="font-semibold text-gray-900 dark:text-gray-300">
                {techStack.length}+ technologies
              </span>
              <span className="text-gray-600 dark:text-gray-500">in my arsenal</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
