import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostFrontmatter, ProjectFrontmatter, TagCount } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readMdxFiles<T>(subdir: string): { data: T; content: string; rawContent: string }[] {
  const dir = path.join(CONTENT_DIR, subdir);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");

    return {
      data: { ...data, slug } as T,
      content,
      rawContent: raw,
    };
  });
}

export function getAllPosts(): PostFrontmatter[] {
  const posts = readMdxFiles<PostFrontmatter>("blog");
  return posts
    .map((p) => {
      const wordCount = p.rawContent.split(/\s+/).filter(Boolean).length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));
      return {
        ...p.data,
        readingTime,
        tags: p.data.tags || [],
        draft: p.data.draft ?? false,
        featured: p.data.featured ?? false,
      };
    })
    .filter((p) => !p.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getPostBySlug(slug: string): {
  frontmatter: PostFrontmatter;
  content: string;
  rawContent: string;
} | null {
  const filePath = path.join(CONTENT_DIR, "blog", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const wordCount = raw.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return {
    frontmatter: {
      ...(data as Omit<PostFrontmatter, "slug" | "readingTime">),
      slug,
      readingTime,
      tags: data.tags || [],
      draft: data.draft ?? false,
      featured: data.featured ?? false,
    },
    content,
    rawContent: raw,
  };
}

export function getAllTags(): TagCount[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostFrontmatter[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function getAllProjects(): ProjectFrontmatter[] {
  const projects = readMdxFiles<ProjectFrontmatter>("projects");
  return projects
    .map((p) => ({
      ...p.data,
      tags: p.data.tags || [],
      featured: p.data.featured ?? false,
      order: p.data.order ?? 0,
    }))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.order - a.order;
    });
}

export function getAdjacentPosts(slug: string): {
  prev: PostFrontmatter | null;
  next: PostFrontmatter | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
