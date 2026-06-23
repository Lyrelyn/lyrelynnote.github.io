import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="border-t mt-auto"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p style={{ color: "var(--color-text-muted)" }} className="text-sm">
          &copy; {new Date().getFullYear()} {SITE.author}. Built with Next.js & Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={SITE.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-primary-500"
            style={{ color: "var(--color-text-muted)" }}
          >
            GitHub
          </a>
          <a
            href="/feed.xml"
            className="text-sm transition-colors hover:text-primary-500"
            style={{ color: "var(--color-text-muted)" }}
          >
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
