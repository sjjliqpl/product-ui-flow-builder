import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "ui-sans-serif", "system-ui"],
        serif: ['"Playfair Display"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        paper: "#faf8f2",
        warm: "#f5f1e8",
        ink: "#1a1a1a",
        muted: "#5c5a55",
        faint: "#9c9890",
        line: "#e8e4da",
        strongLine: "#d4cec0",
        accent: {
          DEFAULT: "#c2674a",
          light: "#fdf0ea",
          dark: "#9a4a35",
        },
        teal: {
          DEFAULT: "#2d6a6a",
          light: "#e8f4f4",
          dark: "#1a4a4a",
        },
        amber: {
          DEFAULT: "#b8860b",
          light: "#fef9ee",
          dark: "#8b6508",
        },
        ok: {
          DEFAULT: "#4a7c59",
          light: "#edf7ef",
        },
        danger: {
          DEFAULT: "#c44",
          light: "#fef2f2",
        },
        violet: {
          DEFAULT: "#7c5cbf",
          light: "#f6f3fc",
        },
        calm: {
          DEFAULT: "#4a6fa5",
          light: "#eef4fb",
        },
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)",
        panel: "0 8px 24px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
} satisfies Config;
