import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        hero: ["3.5rem", { lineHeight: "0.95", letterSpacing: "-0.015em" }],
        section: ["2.25rem", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        subheading: ["1.5rem", { lineHeight: "1.15", letterSpacing: "-0.005em" }],
        body: ["1rem", { lineHeight: "1.6" }],
        caption: ["0.875rem", { lineHeight: "1.4" }],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#e5e7eb",
            h1: { fontFamily: "var(--font-heading)", fontWeight: "600" },
            h2: { fontFamily: "var(--font-heading)", fontWeight: "600" },
            h3: { fontFamily: "var(--font-heading)", fontWeight: "500" },
            p: { fontFamily: "var(--font-body)" },
          },
        },
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      colors: {
        brand: {
          gold: "#d4a964",
          gray: "#747474",
          white: "#ffffff",
          black: "#000000",
        },
        primary: {
          DEFAULT: "#d4a964",
          foreground: "#111113",
        },
        accent: {
          DEFAULT: "#f3d59f",
          foreground: "#111113",
        },
        background: "#000000",
        surface: "#111113",
        surfaceAlt: "#16161a",
        muted: {
          DEFAULT: "#9ca3af",
          foreground: "#6b7280",
        },
        border: "#27272a",
        foreground: "#e5e7eb",
      },
    },
  },
  plugins: [typography],
};

export default config;
