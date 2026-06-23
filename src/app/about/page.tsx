import { SITE } from "@/lib/constants";
import type { Metadata } from "next";
import { Github, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "About me.",
};

export default function AboutPage() {
  return (
    <div
      className="mx-auto max-w-3xl px-6 py-16"
      style={{ animation: "fade-in 0.5s ease-out" }}
    >
      <header className="mb-12">
        <h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          style={{ color: "var(--color-text)" }}
        >
          About
        </h1>
      </header>

      <div className="prose max-w-none" style={{ color: "var(--color-text-muted)" }}>
        <p className="text-lg leading-relaxed mb-6">
          Hi, I&apos;m {SITE.author}. I&apos;m a developer passionate about building
          well-crafted software and sharing what I learn along the way.
        </p>

        <p className="leading-relaxed mb-6">
          This blog is where I write about web development, TypeScript, React,
          open-source, and other topics that interest me. I believe in learning
          in public and hope my notes can help others on their journey.
        </p>

        <p className="leading-relaxed mb-6">
          When I&apos;m not coding, you might find me reading, exploring new tools,
          or working on side projects.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <a
          href={SITE.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 hover:shadow-md"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-surface-alt)",
            color: "var(--color-text)",
          }}
        >
          <Github className="h-5 w-5" style={{ color: "var(--color-text-muted)" }} />
          <span className="text-sm font-medium">GitHub</span>
          <span className="text-sm ml-auto" style={{ color: "var(--color-text-muted)" }}>
            {SITE.social.github}
          </span>
        </a>
      </div>
    </div>
  );
}
