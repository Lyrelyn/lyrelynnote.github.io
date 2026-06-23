import { defineConfig, s, defineCollection } from "velite";

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      description: s.string().max(300),
      publishedAt: s.isodate(),
      updatedAt: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
      featuredImage: s.string().optional(),
      featured: s.boolean().default(false),
      draft: s.boolean().default(false),
    })
    .transform((data, { meta }) => ({
      ...data,
      slug: meta.path.replace(/^blog\//, "").replace(/\.mdx$/, ""),
      readingTime: Math.ceil(meta.plain.split(/\s+/).length / 200),
    })),
});

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      description: s.string().max(500),
      url: s.string().optional(),
      github: s.string().optional(),
      tags: s.array(s.string()).default([]),
      image: s.string().optional(),
      featured: s.boolean().default(false),
      order: s.number().default(0),
    })
    .transform((data, { meta }) => ({
      ...data,
      slug: meta.path.replace(/^projects\//, "").replace(/\.mdx$/, ""),
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, projects },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
});
