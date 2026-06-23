"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="relative flex items-center justify-center w-9 h-9 rounded-full
                 text-text-muted hover:text-text hover:bg-surface-hover
                 transition-all duration-200 cursor-pointer"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === "dark" ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === "light" ? "opacity-0 scale-50 -rotate-90" : "opacity-100 scale-100 rotate-0"
        }`}
      />
    </button>
  );
}
