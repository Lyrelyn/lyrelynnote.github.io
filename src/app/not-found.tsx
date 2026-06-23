import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="mx-auto max-w-3xl px-6 py-32 text-center"
      style={{ animation: "fade-in 0.5s ease-out" }}
    >
      <h1
        className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text"
        style={{ color: "transparent" }}
      >
        404
      </h1>
      <p className="text-lg mb-8" style={{ color: "var(--color-text-muted)" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium
                   bg-primary-500 text-white hover:bg-primary-600 transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
