import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";
import { format } from "date-fns";
import type { PostFrontmatter } from "@/types";

export function PostCard({ post }: { post: PostFrontmatter }) {
  return (
    <article
      className="group relative rounded-xl border p-6 transition-all duration-300
                 hover:shadow-lg hover:-translate-y-0.5"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface-alt)",
      }}
    >
      <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={post.title} />
      <div className="relative z-20 pointer-events-none">
        <div className="flex flex-wrap items-center gap-3 mb-3 text-xs"
          style={{ color: "var(--color-text-muted)" }}
        >
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(post.publishedAt), "yyyy-MM-dd")}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime} min read
          </span>
        </div>

        <h2
          className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors duration-200"
          style={{ color: "var(--color-text)" }}
        >
          {post.title}
        </h2>

        <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
          {post.description}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs
                           transition-colors duration-200 bg-primary-50 text-primary-600
                           dark:bg-primary-900/30 dark:text-primary-400
                           hover:bg-primary-100 dark:hover:bg-primary-900/50"
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
