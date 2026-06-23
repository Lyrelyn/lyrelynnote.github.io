"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({
  children,
  language,
  filename,
}: {
  children: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--color-border)" }}
    >
      {filename && (
        <div
          className="flex items-center justify-between px-4 py-2 text-xs border-b"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          <span className="font-mono">{filename}</span>
          {language && <span>{language}</span>}
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md
                     text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     hover:bg-surface-hover"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            color: "var(--color-text-muted)",
          }}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy
            </>
          )}
        </button>
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code className={`font-mono ${language ? `language-${language}` : ""}`}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
}
