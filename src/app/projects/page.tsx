import { getAllProjects } from "@/lib/posts";
import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { ExternalLink, Github, Tag } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of things I've built.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

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
          Projects
        </h1>
        <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
          Things I&apos;ve built and shipped.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="text-center py-20" style={{ color: "var(--color-text-muted)" }}>
          <p className="text-lg mb-2">No projects yet.</p>
          <p className="text-sm">
            Add <code className="px-1.5 py-0.5 rounded bg-surface-alt">.mdx</code> files
            to <code className="px-1.5 py-0.5 rounded bg-surface-alt">content/projects/</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group rounded-xl border p-6 transition-all duration-300 hover:shadow-lg"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface-alt)",
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {project.title}
                </h2>
                <div className="flex items-center gap-2 shrink-0">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg transition-colors hover:bg-surface-hover"
                      style={{ color: "var(--color-text-muted)" }}
                      aria-label="Visit project"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg transition-colors hover:bg-surface-hover"
                      style={{ color: "var(--color-text-muted)" }}
                      aria-label="View source on GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {project.description}
              </p>

              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs
                                 bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                    >
                      <Tag className="h-2.5 w-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
