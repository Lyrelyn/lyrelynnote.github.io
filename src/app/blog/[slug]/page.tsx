import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { getPostBySlug, getAdjacentPosts, getAllPosts } from "@/lib/posts";
import { Comments } from "@/components/Comments";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Callout } from "@/components/mdx/Callout";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

const components = {
  Callout,
  pre: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--color-border)" }}
    >
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">{children}</pre>
    </div>
  ),
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded-md text-sm font-mono"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            color: "var(--color-primary-600)",
          }}
        >
          {children}
        </code>
      );
    }
    return <code className={className}>{children}</code>;
  },
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-primary-500 hover:text-primary-600 underline underline-offset-2"
    >
      {children}
    </a>
  ),
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = getPostBySlug(slug);
  if (!result) return { title: "Not Found" };

  const { frontmatter } = result;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt || frontmatter.publishedAt,
      tags: frontmatter.tags,
      images: frontmatter.featuredImage
        ? [{ url: frontmatter.featuredImage }]
        : undefined,
    },
    twitter: {
      card: frontmatter.featuredImage ? "summary_large_image" : "summary",
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = getPostBySlug(slug);

  if (!result) {
    notFound();
  }

  const { frontmatter, content } = result;
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <article
      className="mx-auto max-w-3xl px-6 py-16"
      style={{ animation: "fade-in 0.5s ease-out" }}
    >
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm mb-8 transition-colors hover:text-primary-500"
        style={{ color: "var(--color-text-muted)" }}
      >
        <ChevronLeft className="h-4 w-4" /> Back to blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          style={{ color: "var(--color-text)" }}
        >
          {frontmatter.title}
        </h1>

        <div
          className="flex flex-wrap items-center gap-4 text-sm mb-4"
          style={{ color: "var(--color-text-muted)" }}
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {format(new Date(frontmatter.publishedAt), "MMMM dd, yyyy")}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {frontmatter.readingTime} min read
          </span>
        </div>

        {frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                           transition-colors duration-200 bg-primary-50 text-primary-600
                           dark:bg-primary-900/30 dark:text-primary-400
                           hover:bg-primary-100 dark:hover:bg-primary-900/50"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose max-w-none">
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                rehypeAutolinkHeadings,
                [
                  rehypePrettyCode,
                  {
                    theme: { dark: "github-dark", light: "github-light" },
                    keepBackground: false,
                  },
                ],
              ],
            },
          }}
        />
      </div>

      {/* Adjacent posts */}
      <nav
        className="mt-16 grid grid-cols-2 gap-4 border-t pt-8"
        style={{ borderColor: "var(--color-border)" }}
      >
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex flex-col gap-1 p-4 rounded-xl border transition-all duration-200 hover:shadow-md col-start-1"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface-alt)",
            }}
          >
            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              <ArrowLeft className="h-3 w-3" /> Previous
            </span>
            <span className="text-sm font-medium group-hover:text-primary-500 transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex flex-col gap-1 p-4 rounded-xl border transition-all duration-200 hover:shadow-md text-right col-start-2"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface-alt)",
            }}
          >
            <span className="flex items-center justify-end gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              Next <ArrowRight className="h-3 w-3" />
            </span>
            <span className="text-sm font-medium group-hover:text-primary-500 transition-colors">
              {next.title}
            </span>
          </Link>
        )}
      </nav>

      {/* Comments */}
      <Comments />
    </article>
  );
}
