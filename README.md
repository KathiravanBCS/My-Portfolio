# Kathiravan V — Personal Portfolio

A production-grade personal portfolio built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Features MDX-based blog posts and project case studies, dark/light theme, a custom neko cursor, terminal-style contact form, GitHub heatmap, and fully responsive layout.

**Live:** [kathiravan.dev](https://kathiravan.dev)
**Author:** Kathiravan Vittobha — Full-Stack Developer @ VSTN Technologies, Chennai

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3, CSS Modules |
| Content | MDX (gray-matter, next-mdx-remote) |
| Animation | Framer Motion |
| Icons | react-icons 5 |
| Theming | next-themes |
| Linting | Biome, ESLint |
| Runtime | Node.js v18.17+ |

---

## Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/KathiravanBCS/kathiravan-portfolio.git
cd kathiravan-portfolio
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and fill in:
```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_key_here
NEXT_PUBLIC_CAL_API_KEY=your_key_here
```

**4. Start the development server**
```bash
npm run dev
# Runs on http://localhost:3030
```

**5. Build for production**
```bash
npm run build
npm start
```

---

## Project Structure

```
kathiravan-portfolio/
├── public/
│   └── images/
│       ├── avatar.png              # Profile photo
│       ├── neko/                   # Custom neko cursor sprites
│       ├── gallery/                # Gallery images
│       ├── og/                     # Open Graph images
│       └── projects/               # Project screenshots
│
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx                # Home
│   │   ├── layout.tsx              # Root layout (fonts, providers)
│   │   ├── globals.css             # Global styles
│   │   ├── about/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/page.tsx
│   │   │   └── posts/              # MDX blog content (*.mdx)
│   │   ├── work/
│   │   │   ├── page.tsx
│   │   │   ├── [slug]/page.tsx
│   │   │   └── projects/           # MDX project case studies (*.mdx)
│   │   ├── contact/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── skills/page.tsx
│   │   └── api/
│   │       ├── authenticate/       # Password-protected route auth
│   │       ├── check-auth/
│   │       ├── og/                 # Dynamic OG image generation
│   │       └── rss/                # RSS feed
│   │
│   ├── components/                 # All UI components
│   │   ├── index.ts                # Barrel exports
│   │   ├── layout/                 # App shell components
│   │   │   ├── Header.tsx          # Sticky nav (desktop + mobile bottom bar)
│   │   │   ├── Footer.tsx
│   │   │   ├── Providers.tsx       # next-themes ThemeProvider
│   │   │   └── RouteGuard.tsx      # Route enable/disable + password protection
│   │   ├── common/                 # Shared utility components
│   │   │   ├── CustomCursor.tsx    # Neko cat cursor with sprite animation
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── ScrollToHash.tsx
│   │   │   ├── HeadingLink.tsx
│   │   │   └── TechIcons.tsx       # SVG tech logo components
│   │   ├── ui/                     # Primitive UI components
│   │   │   ├── SkillCard.tsx
│   │   │   ├── glowing-effect.tsx
│   │   │   └── shine-border.tsx
│   │   ├── home/                   # Home page sections
│   │   │   ├── HomeHero.tsx
│   │   │   ├── TechSkills.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   ├── FeaturedProjectsClient.tsx
│   │   │   ├── FeaturedBlogs.tsx
│   │   │   ├── FeaturedBlogsClient.tsx
│   │   │   ├── GitHubStats.tsx
│   │   │   └── GetInTouch.tsx
│   │   ├── about/
│   │   │   ├── AboutContent.tsx
│   │   │   └── TableOfContents.tsx
│   │   ├── blog/
│   │   │   ├── Post.tsx
│   │   │   ├── Posts.tsx
│   │   │   ├── PostsByCategory.tsx
│   │   │   ├── BlogHeader.tsx
│   │   │   └── ShareSection.tsx
│   │   ├── work/
│   │   │   ├── Projects.tsx
│   │   │   └── WorkHeader.tsx
│   │   ├── gallery/
│   │   │   └── GalleryView.tsx
│   │   ├── contact/
│   │   │   └── ContactForm.tsx     # Terminal + standard form modes
│   │   ├── mdx.tsx                 # MDX component renderer
│   │   ├── Mailchimp.tsx
│   │   ├── ProjectCard.tsx
│   │   └── ProjectGridCard.tsx
│   │
│   ├── config/                     # All site configuration and content data
│   │   ├── index.ts                # Barrel export for config + content
│   │   ├── content.tsx             # Person info, nav labels, page metadata
│   │   └── once-ui.config.ts       # Routes, display flags, schema, social sharing
│   │   └── icons.ts                # Icon library (react-icons registry)
│   │
│   ├── lib/                        # Pure utility functions (no React)
│   │   ├── utils.ts                # cn() — clsx + tailwind-merge helper
│   │   ├── mdx.ts                  # MDX file reader (getPosts)
│   │   └── formatDate.ts           # Date formatting with relative time
│   │
│   ├── data/
│   │   └── experienceData.ts       # Work experience static data
│   │
│   ├── styles/
│   │   └── calendar-heatmap.css    # GitHub heatmap calendar styles
│   │
│   └── types/                      # Global TypeScript types
│       ├── index.ts
│       ├── content.types.ts
│       ├── config.types.ts
│       └── react-calendar-heatmap.d.ts
│
├── .env                            # Environment variables (git-ignored)
├── .env.example                    # Environment variable template
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── biome.json                      # Biome linter/formatter config
└── package.json
```

---

## Customizing Content

All personal content lives in one file — [src/config/content.tsx](src/config/content.tsx).

Edit the `person` object for your name, role, avatar, email, location, and timezone. Edit `home`, `about`, `blog`, `work`, `gallery` objects for page titles and descriptions. Routes can be enabled or disabled in [src/config/once-ui.config.ts](src/config/once-ui.config.ts).

### Adding a Blog Post

Create a new `.mdx` file in [src/app/blog/posts/](src/app/blog/posts/):

```mdx
---
title: "Your Post Title"
publishedAt: "2026-05-06"
summary: "A short description for cards and SEO."
tag: "Technical"
category: "Development"
---

Your markdown content here.
```

### Adding a Project

Create a new `.mdx` file in [src/app/work/projects/](src/app/work/projects/):

```mdx
---
title: "Project Name"
publishedAt: "2026-05-06"
summary: "What this project does."
images:
  - "/images/projects/project-01/screenshot.png"
liveUrl: "https://yourproject.com"
githubUrl: "https://github.com/you/project"
tag: "Full-Stack"
team:
  - name: "Kathiravan V"
    role: "Developer"
    avatar: "/images/avatar.png"
    linkedIn: "https://linkedin.com/in/kathiravan-vittobha-182569317"
---

Project description in MDX.
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server on port 3030 |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run biome-write` | Format all files with Biome |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, tech skills, GitHub stats, featured projects |
| `/about` | Bio, work experience, education, technical skills |
| `/work` | Project grid with MDX case studies |
| `/blog` | Blog posts with category filtering |
| `/experience` | Timeline of work experience |
| `/skills` | Full skills breakdown |
| `/contact` | Terminal + standard contact form with Cal.com scheduling |
| `/gallery` | Photo gallery |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Yes | API key for contact form submissions (web3forms.com) |
| `NEXT_PUBLIC_CAL_API_KEY` | No | Cal.com API key for scheduling integration |

---

## Deployment

Deploy to Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/KathiravanBCS/kathiravan-portfolio&project-name=kathiravan-portfolio&repository-name=kathiravan-portfolio)

Or deploy manually:
```bash
npm run build
# Upload .next/ + public/ to your hosting provider
```

---

## License

Distributed under the **CC BY-NC 4.0 License**.
See [LICENSE](LICENSE) for details.

---

## Author

**Kathiravan Vittobha**
Full-Stack Developer — React · TypeScript · Next.js · NestJS · PostgreSQL

- GitHub: [github.com/KathiravanBCS](https://github.com/KathiravanBCS)
- LinkedIn: [linkedin.com/in/kathiravan-vittobha-182569317](https://www.linkedin.com/in/kathiravan-vittobha-182569317/)
- Email: kathiravanvittopa717@gmail.com
