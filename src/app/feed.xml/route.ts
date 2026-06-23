import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/constants";
import { Feed } from "feed";

export async function GET() {
  const posts = getAllPosts();
  const feed = new Feed({
    title: SITE.title,
    description: SITE.description,
    id: SITE.url,
    link: SITE.url,
    language: SITE.language,
    favicon: `${SITE.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${SITE.author}`,
    updated: posts.length > 0 ? new Date(posts[0].publishedAt) : new Date(),
    author: {
      name: SITE.author,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${SITE.url}/blog/${post.slug}`,
      link: `${SITE.url}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.publishedAt),
      category: post.tags.map((tag) => ({ name: tag })),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
