import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work, Services } from "@/types";

const person: Person = {
  firstName: "Kathiravan",
  lastName: "V",
  name: "Kathiravan V",
  role: "Full-Stack Developer",
  avatar: "/images/avatar.png",
  email: "kathiravanvittopa717@gmail.com",
  location: "Asia/Chennai",
  timeZone: "Asia/Kolkata",
  languages: ["Tamil", "English"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: <>Updates on projects, AI integrations, and web development</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/KathiravanBCS",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/kathiravan-vittobha-182569317/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "Twitter",
    icon: "twitter",
    link: "https://x.com/Kathiravan27117",
    essential: false,
  },
  {
    name: "Peerlist",
    icon: "globe",
    link: "https://peerlist.io/kathiravan",
    essential: false,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} Full-Stack Developer`,
  description:
    "Building intelligent, scalable web experiences — from pixel-perfect UIs to powerful backends.",
  headline: <>Building intelligent, scalable web experiences</>,
  featured: {
    display: true,
    title: (
      <span className="flex items-center gap-3">
        <strong>VazhiIQ</strong>
        <span className="w-px h-5 bg-blue-400" />
        <span className="text-blue-600 dark:text-blue-400">Featured project</span>
      </span>
    ),
    href: "/work/vazhiiq-ai-career-guidance-platform",
  },
  subline: (
    <>
      I&apos;m Kathiravan, a Full-Stack Developer at{" "}
      <strong>VSTN Technologies</strong>, Chennai. I specialize in AI-integrated
      applications, invoicing systems, and data-driven dashboards — blending clean
      frontend work with robust backend architecture.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About - ${person.name} | Full-Stack Developer`,
  description: `Meet ${person.name}, ${person.role} from Chennai, India`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I&apos;m Kathiravan Vittobha, a full-stack developer based in Chennai, Tamil Nadu,
        currently working at <strong>VSTN Technologies</strong>. I hold a Bachelor&apos;s
        degree in Computer Science from Vellore Institute of Technology (2021–2024) and
        specialize in building intelligent, scalable web applications.
        <br />
        <br />
        My core stack includes React, TypeScript, Next.js, Node.js, and NestJS — backed
        by databases like PostgreSQL and MySQL managed through Prisma ORM. I&apos;ve worked
        hands-on with Mantine UI and Material UI for frontend design systems, and I integrate
        AI capabilities using APIs like Groq to deliver smart, interactive user experiences.
        <br />
        <br />
        Beyond standard web applications, I&apos;ve delivered projects spanning CRM systems,
        SharePoint-based solutions, AI-powered platforms, and data-driven dashboards. I&apos;m
        comfortable working across the entire product lifecycle — from architecture and API
        design to UI implementation and cloud deployment on Azure, AWS, and Firebase.
        <br />
        <br />
        I&apos;m passionate about merging cutting-edge technologies to solve real problems,
        and I&apos;m always looking to push what&apos;s possible with modern full-stack and
        AI tooling.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "VSTN Technologies",
        timeframe: "May 2025 - Present",
        role: "Software Developer",
        achievements: [
          "Building and maintaining full-stack web applications using React, TypeScript, and NestJS",
          "Developed an invoicing frontend with complex form logic, PATCH API integration, and dynamic engagement tracking",
          "Built Excel file generation features using ExcelJS with dynamic row support, auto-filter, formula shifting, and styled cell output",
          "Worked with Prisma ORM and PostgreSQL for backend data modeling and query optimization",
          "Collaborated on AI-powered features integrated via the Groq API",
        ],
        images: [],
        tags: ["React", "TypeScript", "NestJS", "PostgreSQL", "ExcelJS"],
      },
      {
        company: "AWS Cloud Virtual Foundation And Architecting",
        timeframe: "January - March 2025",
        role: "Cloud Certification",
        institution: "SRM Institute of Kattankulathur",
        achievements: [
          "Architected and deployed scalable, secure, and cost-effective solutions using AWS services (EC2, S3, Lambda, VPC) to meet business requirements",
          "Gained practical expertise in cloud architecture and infrastructure design",
        ],
        images: [],
        tags: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS VPC", "Cloud Architecture"],
      },
      {
        company: "Java Full Stack Developer",
        timeframe: "April - June 2025",
        role: "Developer Training",
        institution: "SRM Institute of Kattankulathur",
        achievements: [
          "Comprehensive training in Java Full-Stack development covering Spring Boot backend and React frontend",
          "Built efficient, scalable, and user-friendly applications using industry best practices and modern development frameworks",
        ],
        images: [],
        tags: ["Java", "Spring Boot", "React", "REST APIs", "MySQL"],
      },
      {
        company: "DCA - Diploma in Computer Application",
        timeframe: "Completed",
        role: "Computer Application",
        institution: "CSC Institute, Vellaipet",
        achievements: [
          "Completed Diploma in Computer Application with hands-on training in programming languages and application development",
          "Developed proficiency through practical projects in software creation and problem-solving",
        ],
        images: [],
        tags: ["Programming", "Application Development", "Software Creation", "Problem Solving"],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Vellore Institute of Technology",
        description: <>Bachelor of Science — Computer Science · 2021–2024</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Frontend",
        description: (
          <>Building modern, responsive user interfaces with React, TypeScript, and component libraries like Mantine UI.</>
        ),
        tags: [
          { name: "React.js", icon: "react" },
          { name: "TypeScript", icon: "typescript" },
          { name: "JavaScript", icon: "javascript" },
          { name: "Next.js", icon: "nextjs" },
          { name: "HTML5" },
          { name: "CSS3" },
          { name: "Mantine UI" },
        ],
        images: [],
      },
      {
        title: "Backend",
        description: (
          <>Designing robust REST APIs and server-side applications with NestJS, Express, and Prisma ORM.</>
        ),
        tags: [
          { name: "Node.js", icon: "nodejs" },
          { name: "NestJS", icon: "nestjs" },
          { name: "Express.js" },
          { name: "Prisma ORM" },
          { name: "PostgreSQL" },
          { name: "MySQL" },
          { name: "MongoDB" },
        ],
        images: [],
      },
      {
        title: "Tools & DevOps",
        description: (
          <>Version control, cloud platforms, and developer tooling for efficient workflows.</>
        ),
        tags: [
          { name: "Git", icon: "github" },
          { name: "AWS" },
          { name: "Azure" },
          { name: "ExcelJS" },
          { name: "Groq API" },
          { name: "Figma", icon: "figma" },
        ],
        images: [],
      },
    ],
  },
  expertise: {
    display: true,
    title: "Project Expertise",
    projects: [
      {
        category: "CRM Systems",
        description: "Building intelligent customer relationship management platforms with advanced data management and user interfaces.",
      },
      {
        category: "SharePoint Solutions",
        description: "Developing enterprise solutions integrated with Microsoft SharePoint for document management and collaboration.",
      },
      {
        category: "AI-Powered Apps",
        description: "Creating applications that leverage AI APIs and machine learning to deliver smart, interactive user experiences.",
      },
      {
        category: "Web-Based Projects",
        description: "Full-stack development of responsive, scalable web applications using modern frameworks and best practices.",
      },
      {
        category: "Data Dashboards",
        description: "Designing and building data visualization dashboards for analytics, reporting, and business intelligence.",
      },
      {
        category: "Invoicing Systems",
        description: "Developing comprehensive invoicing platforms with complex form logic, PDF generation, and payment integration.",
      },
      {
        category: "Learning Platforms",
        description: "Creating interactive educational platforms with course management, progress tracking, and user engagement features.",
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about development and tech...",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects ${person.name}`,
  description: `Full-stack and AI projects by ${person.name}`,
};

const services: Services = {
  path: "/specialties",
  label: "Specialties",
  title: `Specialties - ${person.name} | Full-Stack Development Expertise`,
  description: "Areas of expertise and technical specializations as a full-stack developer",
  services: [
    {
      title: "Frontend Development",
      description: "Building modern, responsive user interfaces with a focus on performance and user experience. Expertise in React, TypeScript, and Next.js frameworks.",
      icon: "code",
      highlights: [
        "React.js & Next.js applications",
        "TypeScript for type-safe code",
        "Component-based architecture",
        "Responsive & accessible design",
      ],
    },
    {
      title: "Backend & API Development",
      description: "Designing and building scalable REST APIs and server-side applications using Node.js and NestJS with proper database management.",
      icon: "sparkles",
      highlights: [
        "NestJS & Express.js APIs",
        "Database design (PostgreSQL, MySQL)",
        "Prisma ORM implementation",
        "Authentication & authorization",
      ],
    },
    {
      title: "AI-Powered Features",
      description: "Integrating AI capabilities into applications using modern APIs like Groq LLM to create intelligent, interactive experiences.",
      icon: "briefcase",
      highlights: [
        "LLM API integration (Groq)",
        "AI-powered user features",
        "Smart content generation",
        "Intelligent automation",
      ],
    },
    {
      title: "Enterprise Systems",
      description: "Building complex enterprise applications including CRM systems, business process automation, and SharePoint-based solutions.",
      icon: "receipt",
      highlights: [
        "CRM system development",
        "Enterprise workflow automation",
        "SharePoint integration",
        "Business process optimization",
      ],
    },
    {
      title: "Invoicing & Financial Platforms",
      description: "Creating comprehensive invoicing systems and financial dashboards with features like PDF generation, complex form logic, and data tracking.",
      icon: "chart",
      highlights: [
        "Invoicing system development",
        "PDF generation with ExcelJS",
        "Complex form handling",
        "Financial data visualization",
      ],
    },
    {
      title: "Cloud & DevOps",
      description: "Deploying and managing applications on cloud platforms with focus on scalability, security, and infrastructure best practices.",
      icon: "cloud",
      highlights: [
        "AWS cloud architecture",
        "Azure deployment",
        "Firebase integration",
        "Infrastructure management",
      ],
    },
  ],
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery ${person.name}`,
  description: `A collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, services, gallery };
