# Lyrelyn's Notes

Personal blog built with **Next.js 15**, **TypeScript**, **Tailwind CSS 4**, and **MDX**. Deployed on Vercel.

## Features

- MDX content with custom React components (Callout, CodeBlock)
- Dark mode with system preference detection
- Tag-based filtering
- RSS feed, sitemap, and full SEO (Open Graph, Twitter Cards)
- Giscus comments powered by GitHub Discussions
- Framer Motion animations
- Velite for type-safe content

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Writing Content

### Blog Posts

Create `.mdx` files in `content/blog/`:

```mdx
---
title: "My Post Title"
description: "A short description for SEO and previews"
publishedAt: "2026-06-24"
tags: ["nextjs", "typescript"]
featured: false
draft: false
---

Your content here...
```

### Projects

Create `.mdx` files in `content/projects/`:

```mdx
---
title: "Project Name"
description: "What this project does"
url: "https://..."
github: "https://..."
tags: ["react", "nodejs"]
featured: true
order: 1
---

Project details...
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   └── mdx/          # Custom MDX components
├── lib/              # Utility functions
└── types/            # TypeScript types
content/
├── blog/             # Blog posts (.mdx)
└── projects/         # Project showcases (.mdx)
public/               # Static assets
```

## Deployment (Vercel)

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Vercel auto-detects Next.js — no config needed
4. Set environment variables if needed
5. Deploy!

## Customization

Edit `src/lib/constants.ts` to update:

- Site title, description, and URL
- Social links
- Navigation items
- Giscus configuration (repo ID, category ID)

## Giscus Setup

1. Enable [GitHub Discussions](https://docs.github.com/en/discussions) on your repo
2. Install the [Giscus app](https://github.com/apps/giscus)
3. Visit [giscus.app](https://giscus.app) to get your `repoId` and `categoryId`
4. Update `GISCUS_CONFIG` in `src/lib/constants.ts`
