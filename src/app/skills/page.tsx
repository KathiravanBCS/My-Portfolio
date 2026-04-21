"use client";

import { motion } from "framer-motion";
import SkillCard from "@/components/ui/SkillCard";
import { FaStar, FaCode } from "react-icons/fa6";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiMui,
  SiMantine,
  SiNodedotjs,
  SiNestjs,
  SiMysql,
  SiPostgresql,
  SiFirebase,
  SiAmazon,
  SiVercel,
  SiGit,
  SiGithub,
  SiWordpress,
  SiPrisma,
} from "react-icons/si";

const skillsData = {
  "Languages & Version Control": [
    { name: "Git", icon: SiGit, proficiency: 92 },
    { name: "GitHub", icon: SiGithub, proficiency: 92 },
    { name: "Python", icon: SiPython, proficiency: 88 },
    { name: "JavaScript", icon: SiJavascript, proficiency: 95 },
    { name: "TypeScript", icon: SiTypescript, proficiency: 92 },
    { name: "HTML5", icon: SiHtml5, proficiency: 95 },
    { name: "CSS3", icon: SiCss3, proficiency: 93 },
  ],
  "Frontend & Backend": [
    { name: "React.js", icon: SiReact, proficiency: 95 },
    { name: "Next.js", icon: SiNextdotjs, proficiency: 94 },
    { name: "Material UI (MUI)", icon: SiMui , proficiency: 88 },
    { name: "Mantine UI", icon: SiMantine, proficiency: 88 },
    { name: "Node.js", icon: SiNodedotjs, proficiency: 90 },
    { name: "NestJS", icon: SiNestjs, proficiency: 88 },
    { name: "Prisma ORM", icon: SiPrisma, proficiency: 85 },
  ],
  "Databases & Cloud": [
    { name: "MySQL", icon: SiMysql, proficiency: 90 },
    { name: "PostgreSQL", icon: SiPostgresql, proficiency: 88 },
    { name: "Firebase", icon: SiFirebase, proficiency: 85 },
    { name: "Amazon Web Services (AWS)", icon: SiAmazon, proficiency: 87 },
    { name: "Microsoft Azure", icon: SiAmazon, proficiency: 82 },
    { name: "Vercel", icon: SiVercel, proficiency: 92 },
  ],
  "Tools & Platforms": [
    { name: "Visual Studio Code (VS Code)", icon: FaCode, proficiency: 95 },
    { name: "WordPress", icon: SiWordpress, proficiency: 80 },
    { name: "DBeaver", icon: SiMysql, proficiency: 85 },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

export default function Skills() {
  return (
    <section className="min-h-screen relative py-12 md:py-20 px-3 md:px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-[#ff4081]">Skills</span>{" "}
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="inline-block ml-3"
            >
              <FaStar className="text-[#ff4081] h-6 w-6 md:h-10 md:w-10" />
            </motion.span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto">
            A comprehensive overview of the technologies and tools I work with
            to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8 md:space-y-12"
        >
          {Object.entries(skillsData).map(([category, skills]) => (
            <motion.div
              key={category}
              variants={categoryVariants}
              className="space-y-6"
            >
              {/* Category Title */}
              <motion.h3
                className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center"
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                initial={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-gray-900 dark:text-white">{category}</span>
              </motion.h3>

              {/* Skills Grid for Category */}
              <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-6 justify-center items-center">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <SkillCard
                      name={skill.name}
                      icon={skill.icon}
                      category={category}
                      proficiency={skill.proficiency}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-gray-700 dark:text-neutral-400 mb-6">
            Always learning and expanding my skill set to stay current with the
            latest technologies
          </p>
        </motion.div>
      </div>
    </section>
  );
}
