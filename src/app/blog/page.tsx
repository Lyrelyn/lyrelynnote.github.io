import { getAllPosts, getAllTags } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog",
  description: "All articles on Lyrelyn's Notes.",
  openGraph: {
    title: `Blog | ${SITE.title}`,
    description: "All articles on Lyrelyn's Notes.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div
      className="mx-auto max-w-5xl px-6 py-16"
      style={{ animation: "fade-in 0.5s ease-out" }}
    >
      <header className="mb-12">
        <h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Blog
        </h1>
        <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
          {posts.length} article{posts.length !== 1 ? "s" : ""} published.
        </p>
      </header>

      {/* Tags */}
      <div className="mb-10 flex flex-wrap gap-2">
        <a
          href="/blog"
          className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-500 text-white"
        >
          All
        </a>
        {tags.map(({ tag, count }) => (
          <a
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:opacity-80"
            style={{
              backgroundColor: "var(--color-surface-alt)",
              color: "var(--color-text-muted)",
              border: "1px solid var(--color-border)",
            }}
          >
            {tag}
            <span className="ml-1.5 text-xs opacity-60">{count}</span>
          </a>
        ))}
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <div className="text-center py-20" style={{ color: "var(--color-text-muted)" }}>
          <p className="text-lg">No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
