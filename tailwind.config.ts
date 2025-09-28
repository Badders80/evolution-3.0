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
        evolution: {
          gold: "#d4a964",
          gray: "#747474",
          white: "#ffffff",
          black: "#000000",
        },
        background: "#000000",
        surface: "#111113",
        muted: "#9ca3af",
        border: "#27272a",
        foreground: "#e5e7eb",
      },
    },
  },
  plugins: [typography],
};

export default config;