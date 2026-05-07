"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { person, social } from "@/config";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiNestjs,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiAmazon,
  SiVercel,
  SiJavascript,
  SiPrisma,
} from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiEnvelope, HiChevronDown } from "react-icons/hi2";

const roles = [
  "a Full-Stack Developer",
  "a React Engineer",
  "a Next Js Developer",
  "an AI Enthusiast",
];

const techStack = [
  { name: "React.js", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "NestJS", Icon: SiNestjs, color: "#E0234E" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", Icon: SiMysql, color: "#00758F" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "AWS", Icon: SiAmazon, color: "#FF9900" },
  { name: "Vercel", Icon: SiVercel, color: "#ffffff" },
  { name: "Prisma ORM", Icon: SiPrisma, color: "#2D3748" },
];

export function HomeHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const socialIcons = [
    { name: "GitHub", Icon: FaGithub, link: social.find((s) => s.name === "GitHub")?.link ?? "#" },
    { name: "LinkedIn", Icon: FaLinkedin, link: social.find((s) => s.name === "LinkedIn")?.link ?? "#" },
    { name: "Email", Icon: HiEnvelope, link: social.find((s) => s.name === "Email")?.link ?? "#" },
  ];

  const doubled = [...techStack, ...techStack];

  const scrollToSkills = () => {
    const skillsSection = document.getElementById("skills-section");
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToGetInTouch = () => {
    const getInTouchSection = document.getElementById("get-in-touch-section");
    if (getInTouchSection) {
      getInTouchSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="flex flex-col items-center text-center gap-8 pt-16 pb-8 w-full">
      {/* Avatar with online dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="relative w-24 h-24"
      >
        <Image
          src={person.avatar}
          alt={person.name}
          width={96}
          height={96}
          className="rounded-full object-cover w-24 h-24 border-2 border-pink-300 dark:border-pink-800/60"
          priority
        />
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-950 block" />
      </motion.div>

      {/* Hi, I'm */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col items-center gap-2"
      >
        <p className="font-mono text-gray-600 dark:text-gray-500 text-lg tracking-widest uppercase">
          Hi, I&apos;m
        </p>
        <h1 className="font-mono font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-gray-900 dark:text-white">
          {person.name}
        </h1>
        {/* Typewriter role */}
        <p className="font-mono text-xl sm:text-2xl text-gray-700 dark:text-gray-400 h-8 flex items-center gap-1">
          <span className="text-gray-700 dark:text-gray-500">I&apos;m</span>
          <span className="text-[#ff4081] ml-1 font-semibold">{displayed}</span>
          <span className="w-0.5 h-5 bg-[#ff4081] inline-block animate-blink" />
        </p>
      </motion.div>

      {/* Description with inline badges */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-mono text-base sm:text-lg text-gray-700 dark:text-gray-400 max-w-xl leading-relaxed"
      >
        I build{" "}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-green-600 dark:border-green-600/60 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm font-semibold">
          Full-Stack
        </span>{" "}
        web applications with a focus on{" "}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-purple-600 dark:border-purple-600/60 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 text-sm font-semibold">
          AI Integration
        </span>
        ,{" "}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-blue-600 dark:border-blue-600/60 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 text-sm font-semibold">
          Clean Code
        </span>{" "}
        and robust{" "}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-orange-600 dark:border-orange-600/60 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 text-sm font-semibold">
          System Design
        </span>
        .
      </motion.p>

      {/* Tech stack marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full overflow-hidden"
      >
        <div className="flex gap-10 animate-marquee whitespace-nowrap w-max">
          {doubled.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-500 text-sm font-mono"
            >
              <tech.Icon className="w-5 h-5 flex-shrink-0 opacity-70 dark:opacity-100" style={{ color: tech.color }} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3"
      >
        <button
          type="button"
          onClick={scrollToGetInTouch}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-pink-300 dark:border-pink-800/60 bg-white dark:bg-transparent text-gray-900 dark:text-white font-mono text-sm font-medium hover:bg-pink-50 dark:hover:bg-pink-950/30 transition-colors"
        >
          <HiEnvelope className="w-4 h-4 text-[#ff4081]" />
          Get in touch
        </button>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ff4081] hover:bg-[#e0356e] text-white font-mono text-sm font-medium transition-colors"
        >
          View Projects
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-pink-300 dark:border-pink-800/60 bg-pink-50 dark:bg-pink-950/30 hover:bg-pink-100 dark:hover:bg-pink-900/40 text-pink-700 dark:text-pink-300 font-mono text-sm font-medium transition-colors"
        >
          About Me
        </Link>
      </motion.div>

      {/* Social icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex items-center gap-5"
      >
        {socialIcons.map(({ name, Icon, link }) => (
          <motion.a
            key={name}
            href={link}
            target={link.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={name}
            whileHover={{ scale: 1.2, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-gray-700 dark:text-gray-400 hover:text-[#ff4081] dark:hover:text-[#ff4081] transition-colors"
          >
            <Icon className="w-5 h-5" />
          </motion.a>
        ))}
      </motion.div>

      {/* Down arrow */}
      <motion.button
        type="button"
        onClick={scrollToSkills}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        className="text-[#ff4081] mt-2 hover:text-[#e0356e] transition-colors cursor-pointer"
        aria-label="Scroll to skills section"
      >
        <HiChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
