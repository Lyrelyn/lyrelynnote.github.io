export interface PostFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featuredImage?: string;
  featured: boolean;
  draft: boolean;
  slug: string;
  readingTime: number;
}

export interface Post extends PostFrontmatter {
  content: string;
  rawContent: string;
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  url?: string;
  github?: string;
  tags: string[];
  image?: string;
  featured: boolean;
  order: number;
  slug: string;
}

export interface Project extends ProjectFrontmatter {
  content: string;
}

export interface TagCount {
  tag: string;
  count: number;
}
