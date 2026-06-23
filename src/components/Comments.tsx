"use client";

import { useEffect, useRef } from "react";
import { GISCUS_CONFIG } from "@/lib/constants";

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    for (const [key, value] of Object.entries(GISCUS_CONFIG)) {
      script.setAttribute(`data-${key.toLowerCase()}`, String(value));
    }
    script.setAttribute("data-theme", "preferred_color_scheme");
    ref.current.appendChild(script);
  }, []);

  return (
    <section className="mt-16 border-t pt-8" style={{ borderColor: "var(--color-border)" }}>
      <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--color-text)" }}>
        Comments
      </h2>
      <div ref={ref} />
    </section>
  );
}
