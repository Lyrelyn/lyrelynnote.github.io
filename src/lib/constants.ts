export const SITE = {
  title: "Lyrelyn's Notes",
  description: "Thoughts on code, design, and the things I build.",
  url: "https://lyrelynnote.github.io",
  author: "Lyrelyn",
  language: "zh-CN",
  social: {
    github: "https://github.com/Lyrelyn",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
] as const;

export const PAGE_SIZE = 10;

export const GISCUS_CONFIG = {
  repo: "Lyrelyn/lyrelynnote.github.io",
  repoId: "",
  category: "General",
  categoryId: "",
  mapping: "pathname" as const,
  reactionsEnabled: "1" as const,
  emitMetadata: "0" as const,
  theme: "preferred_color_scheme" as const,
};
