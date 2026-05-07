# AGENTS.md — Claude Reference for Kathiravan Portfolio

This file is the authoritative reference for AI agents (Claude Code, Copilot, etc.) working in this codebase. Read this before making any changes.

---

## Project Identity

**Project:** Kathiravan V — Personal Portfolio
**Owner:** Kathiravan Vittobha (kathiravanvittopa717@gmail.com)
**Stack:** Next.js 16 · TypeScript 5 · Tailwind CSS 3 · MDX
**Live URL:** https://kathiravan.dev
**Node requirement:** v18.17+
**Dev port:** 3030 (`npm run dev`)

---

## Folder Structure Rules

```
src/
├── app/          — Next.js App Router pages and API routes ONLY. No business logic here.
├── components/
│   ├── layout/   — Header, Footer, Providers, RouteGuard. App shell only.
│   ├── common/   — Shared stateless/utility components (CustomCursor, ThemeToggle, etc.)
│   ├── ui/       — Primitive design-system components (SkillCard, glowing-effect, etc.)
│   ├── home/     — Components used only on the home page
│   ├── about/    — Components used only on the about page
│   ├── blog/     — Blog-specific components
│   ├── work/     — Work/projects-specific components
│   ├── gallery/  — Gallery-specific components
│   ├── contact/  — Contact form component
│   └── index.ts  — Barrel re-exports for layout + common components only
├── config/       — ALL site config and personal content data
│   ├── content.tsx          — Person info, page metadata, nav labels
│   ├── once-ui.config.ts    — Routes on/off, display flags, schema, social sharing
│   └── icons.ts             — react-icons registry (iconLibrary)
├── lib/          — Pure TypeScript utility functions (zero React)
│   ├── utils.ts             — cn() helper (clsx + tailwind-merge)
│   ├── mdx.ts               — getPosts() — reads MDX files from disk
│   └── formatDate.ts        — Date formatting with relative time
├── data/         — Static data arrays (experienceData.ts)
├── styles/       — Global CSS files beyond globals.css
└── types/        — All TypeScript type definitions
```

**Critical rules:**
- Never import from `@/resources` — it no longer exists. Use `@/config` instead.
- Never import from `@/utils` — it no longer exists. Use `@/lib/mdx` or `@/lib/formatDate`.
- Never put personal content (person name, bio, social links) outside `src/config/content.tsx`.
- Never put route config outside `src/config/once-ui.config.ts`.
- Feature-specific components belong in their feature subfolder, not at `src/components/` root.

---

## Import Path Conventions

```typescript
// Config / content data
import { person, home, about, social } from "@/config";
import { baseURL, routes, display } from "@/config";
import { iconLibrary } from "@/config/icons";

// Utility functions
import { cn } from "@/lib/utils";
import { getPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/formatDate";

// Types
import type { Person, About, Work } from "@/types";

// Components — use barrel for layout/common
import { Header, Footer, RouteGuard, CustomCursor } from "@/components";

// Components — use direct path for feature components
import { HomeHero } from "@/components/home/HomeHero";
import { Posts } from "@/components/blog/Posts";
```

---

## Content Architecture

### Personal Data (`src/config/content.tsx`)

The `person` object is the single source of truth for all personal information:

```typescript
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
```

Do not hardcode any of these values anywhere else. Always import from `@/config`.

### Route Control (`src/config/once-ui.config.ts`)

Enable or disable pages by toggling the `routes` object:

```typescript
const routes: Record<string, boolean> = {
  "/": true,
  "/about": true,
  "/gallery": false,   // set true to enable gallery page
};
```

Disabled routes return a 404 via `RouteGuard`.

### MDX Content

- Blog posts: `src/app/blog/posts/*.mdx`
- Projects: `src/app/work/projects/*.mdx`

Required frontmatter fields for both:

```yaml
---
title: string           # required
publishedAt: string     # required — YYYY-MM-DD format
summary: string         # required — used for cards and SEO meta
images: string[]        # optional — array of /public image paths
tag: string             # optional — used for category filtering
---
```

Additional project-only fields:

```yaml
liveUrl: string         # optional
githubUrl: string       # optional
team:                   # optional
  - name: string
    role: string
    avatar: string
    linkedIn: string
```

---

## Coding Standards

### TypeScript

- Strict mode is enabled. Never use `any` unless absolutely unavoidable.
- Use `type` imports: `import type { X } from "..."`.
- All component props must have explicit types — no implicit `{}` or inline untyped objects.
- Prefer `interface` for object shapes that may be extended; `type` for unions and intersections.

### React / Next.js

- Use Server Components by default. Only add `"use client"` when the component uses browser APIs, hooks, or event handlers.
- Never use `useEffect` for data fetching — use async Server Components or `fetch` in route handlers.
- Never use `next/image` for the neko cursor sprites — they require `<img>` with `imageRendering: pixelated`. The `@next/next/no-img-element` lint suppression is intentional in `CustomCursor.tsx`.
- Dynamic routes (`[slug]/page.tsx`) must export `generateStaticParams` for static generation.

### Styling

- Use Tailwind CSS utility classes exclusively. Do not write custom CSS except in `globals.css` or `styles/`.
- Use the `cn()` helper from `@/lib/utils` to merge conditional classes — never string-concatenate class names.
- Dark mode uses the `class` strategy. Always pair light and dark variants: `text-gray-900 dark:text-white`.
- The brand accent color is `#ff4081` (pink). Use `text-[#ff4081]` / `bg-[#ff4081]` — do not add it to `tailwind.config.ts` unless needed in many places.

### Component Guidelines

- One component per file. File name must match the exported component name exactly.
- Default exports only for page files (`app/**/page.tsx`). All components use named exports.
- Do not write prop comments or JSDoc. Keep components self-documenting through naming.
- Never inline more than 3 Tailwind class groups on a single element — extract a variable or component.

### File Naming

| Type | Convention | Example |
|---|---|---|
| Page files | lowercase | `page.tsx`, `layout.tsx` |
| Components | PascalCase | `HomeHero.tsx` |
| Utilities | camelCase | `formatDate.ts`, `mdx.ts` |
| Config files | kebab-case | `once-ui.config.ts` |
| MDX content | kebab-case | `learning-typescript-advanced.mdx` |

---

## Environment Variables

| Variable | Required | Where used |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Yes | `ContactForm.tsx` — contact form POST |
| `NEXT_PUBLIC_CAL_API_KEY` | No | `ContactForm.tsx` — Cal.com scheduling |

Both are public (`NEXT_PUBLIC_`) and safe to expose in client bundles. Never add server-only secrets as `NEXT_PUBLIC_`.

---

## Key Behaviors to Preserve

### RouteGuard

`src/components/layout/RouteGuard.tsx` wraps every page. It checks:
1. Is the route enabled in `routes` config? If not → renders `NotFound`.
2. Is the route in `protectedRoutes`? If yes → shows password prompt and calls `/api/authenticate`.

Do not bypass or remove RouteGuard. To disable a page, set its route to `false` in `once-ui.config.ts`.

### CustomCursor (Neko Cat)

`src/components/common/CustomCursor.tsx` runs a `requestAnimationFrame` loop. It:
- Uses `useRef` for all animation state to avoid re-renders.
- Reads mouse position via a `mousemove` event listener (not state).
- The neko sprites are loaded from `/public/images/neko/` and require exact filenames (`awake.png`, `down1.png`, `down2.png`, etc.).

Do not convert the animation loop to use `useState` — it will drop frames.

### Contact Form

`src/components/contact/ContactForm.tsx` has two modes toggled by `isTerminalMode`:
- **Terminal mode** (default): command-line interface with `name`, `email`, `message`, `send` commands.
- **Standard mode**: regular HTML form.

Both modes submit to [web3forms.com](https://web3forms.com) via `fetch`. The form does its own email validation — do not add a library for this.

### getPosts

`src/lib/mdx.ts` exports `getPosts(customPath)`. The `customPath` array is spread into `path.join(process.cwd(), ...customPath)`.

Usage pattern:
```typescript
// Blog posts
getPosts(["src", "app", "blog", "posts"])

// Projects
getPosts(["src", "app", "work", "projects"])
```

This is a server-only function. Never import it in a client component.

---

## Common Tasks

### Add a new page

1. Create `src/app/<route>/page.tsx`.
2. Enable the route in `src/config/once-ui.config.ts`.
3. Add a nav item in `src/components/layout/Header.tsx`.

### Add a new MDX blog post

Create `src/app/blog/posts/<slug>.mdx` with required frontmatter. The slug is the filename without `.mdx`.

### Add a new project

Create `src/app/work/projects/<slug>.mdx` with required frontmatter.

### Add a new icon

Import from `react-icons` and add to the `iconLibrary` object in `src/config/icons.ts`. The key becomes the `IconName` string used throughout the app.

### Update personal info

Edit `src/config/content.tsx` — the `person`, `home`, `about`, `social` objects.

### Toggle a feature

Edit the relevant display flag in `src/config/content.tsx` (e.g., `about.calendar.display`, `newsletter.display`) or toggle a route in `src/config/once-ui.config.ts`.

---

## Do Not

- Do not create files in `src/resources/` — it was removed. Use `src/config/`.
- Do not create files in `src/utils/` — it was removed. Use `src/lib/`.
- Do not create `src/features/` — it was removed as unused.
- Do not add `"use client"` to `src/lib/mdx.ts` — it uses Node.js `fs` and must stay server-only.
- Do not mock `fs` in tests for MDX reading — use real file fixtures.
- Do not add comments explaining what code does — name things clearly instead.
- Do not add backwards-compatibility shims when changing an API — just update all callers.
- Do not hardcode the owner's name, email, or social links outside `src/config/content.tsx`.
