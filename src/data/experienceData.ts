export interface Experience {
  id?: string;
  name: string;
  role: string;
  company?: string;
  description: string;
  duration: string;
  type: "achievement" | "experience" | "education";
  iconType: "trophy" | "medal" | "code" | "academic" | "award";
  technologies?: string[];
  logo: string;
  left?: boolean;
  certificate?: string;
  certificatePreview?: string;
}

export const experienceData: Experience[] = [
  {
    id: "7",
    name: "Performance Award Winner",
    role: "Q1 Recognition",
    company: "VSTN Technologies",
    description: "Recognized as the Performance Award Winner for the first quarter (January - March 2026) for outstanding contributions and exceptional performance.",
    duration: "January 2026 - March 2026",
    type: "achievement",
    iconType: "trophy",
    logo: "/images/avatar.png",
    certificate: "/assets/award cetificate from vstn q1.jpg",
    certificatePreview: "/assets/award cetificate from vstn q1.jpg",
    left: true,
  },
  {
    id: "6",
    name: "VSTN Technologies",
    role: "Full Stack Developer",
    company: "VSTN Technologies",
    description: "Building and maintaining full-stack web applications using React, TypeScript, and modern backend technologies.",
    duration: "May 2025 - Present",
    type: "experience",
    iconType: "code",
    technologies: ["React", "TypeScript", "NestJS", "PostgreSQL", "ExcelJS"],
    logo: "/images/avatar.png",
    left: false,
  },
  {
    id: "5",
    name: "Frontend Developer Course",
    role: "Professional Development",
    description: "Completed comprehensive frontend development course with practical projects and hands-on training.",
    duration: "June 2024 - January 2025",
    type: "experience",
    iconType: "code",
    technologies: ["React", "TypeScript", "HTML", "CSS", "JavaScript"],
    logo: "/images/avatar.png",
    certificate: "/assets/softtechasharam certificate.jpg",
    certificatePreview: "/assets/softtechasharam certificate.jpg",
    left: true,
  },
  {
    id: "4",
    name: "BSc Computer Science",
    role: "Bachelor of Science",
    description: "Completed BSc in Computer Science with a CGPA of 8.46.",
    duration: "June 2021 - May 2024",
    type: "education",
    iconType: "academic",
    technologies: ["Computer Science", "Programming", "Data Structures", "Web Development"],
    logo: "/images/avatar.png",
    left: false,
  },
  {
    id: "3",
    name: "12th Standard",
    role: "Higher Secondary Education",
    description: "Scored 90% in 12th standard board examination.",
    duration: "June 2020 - May 2021",
    type: "education",
    iconType: "academic",
    logo: "/images/avatar.png",
    certificate: "/assets/12th mark sheet.png",
    certificatePreview: "/assets/12th mark sheet.png",
    left: true,
  },
  {
    id: "2",
    name: "10th Standard",
    role: "Secondary Education",
    description: "Scored 85% in 10th standard board examination.",
    duration: "June 2017 - May 2018",
    type: "education",
    iconType: "academic",
    logo: "/images/avatar.png",
    certificate: "/assets/10th mark sheet.png",
    certificatePreview: "/assets/10th mark sheet.png",
    left: false,
  },
  {
    id: "1",
    name: "8th Standard",
    role: "NMMS Exam",
    description: "Successfully cleared the NMMS (National Mean-cum-Merit Scholarship) examination.",
    duration: "Completed",
    type: "education",
    iconType: "academic",
    logo: "/images/avatar.png",
    left: true,
  },
];
