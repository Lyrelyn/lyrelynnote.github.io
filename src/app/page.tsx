import { Suspense } from "react";
import { getAllPosts, getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { TagFilter } from "@/components/TagFilter";

function HomeContent() {
  return (
    <div
      className="mx-auto max-w-5xl px-6 py-16 animate-fade-in"
      style={{ animation: "fade-in 0.5s ease-out" }}
    >
      {/* Hero */}
      <section className="mb-16">
        <h1
          className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Hey, I&apos;m{" "}
          <span
            className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text"
            style={{ color: "transparent" }}
          >
            Lyrelyn
          </span>
        </h1>
        <p
          className="text-lg max-w-2xl leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          A developer who loves building things. Here I write about code, design,
          and the projects I&apos;m working on.
        </p>
      </section>

      {/* Posts */}
      <HomePostList />
    </div>
  );
}

function HomePostList() {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const activeTag = params.get("tag");

  // We can't use useSearchParams in a Server Component directly for filtering
  // The client-side TagFilter handles navigation, and we show all posts here
  // then filter on the client. For SSR, we always show all.

  return (
    <>
      <div className="mb-10">
        <AllTags />
      </div>
      <AllPosts />
    </>
  );
}

function AllTags() {
  const tags = getAllTags();
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href="/"
        className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-primary-500 text-white"
      >
        All
      </a>
      {tags.map(({ tag, count }) => (
        <a
          key={tag}
          href={`/?tag=${encodeURIComponent(tag)}`}
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
  );
}

function AllPosts() {
  // Check URL params from the incoming request
  // In a real app with Next.js, we'd use searchParams in the page component
  const posts = getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="text-center py-20" style={{ color: "var(--color-text-muted)" }}>
        <p className="text-lg mb-2">No posts yet.</p>
        <p className="text-sm">
          Start writing! Add <code className="px-1.5 py-0.5 rounded bg-surface-alt">.mdx</code> files
          to the <code className="px-1.5 py-0.5 rounded bg-surface-alt">content/blog/</code> directory.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return <HomeContent />;
}
