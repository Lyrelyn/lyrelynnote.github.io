"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { TagCount } from "@/types";

export function TagFilter({ tags, activeTag }: { tags: TagCount[]; activeTag: string | null }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag === activeTag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleClick("")}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          !activeTag
            ? "bg-primary-500 text-white"
            : "hover:opacity-80"
        }`}
        style={!activeTag ? {} : {
          backgroundColor: "var(--color-surface-alt)",
          color: "var(--color-text-muted)",
          border: "1px solid var(--color-border)",
        }}
      >
        All
      </button>
      {tags.map(({ tag, count }) => (
        <button
          key={tag}
          onClick={() => handleClick(tag)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTag === tag
              ? "bg-primary-500 text-white"
              : "hover:opacity-80"
          }`}
          style={activeTag === tag ? {} : {
            backgroundColor: "var(--color-surface-alt)",
            color: "var(--color-text-muted)",
            border: "1px solid var(--color-border)",
          }}
        >
          {tag}
          <span className="ml-1.5 text-xs opacity-60">{count}</span>
        </button>
      ))}
    </div>
  );
}
