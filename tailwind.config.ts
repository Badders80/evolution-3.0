import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
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
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) translateX(10px) rotate(2deg)' },
          '66%': { transform: 'translateY(10px) translateX(-10px) rotate(-2deg)' },
        },
        'tilt': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'float': 'float 15s ease-in-out infinite',
        'float-slow': 'float 20s ease-in-out infinite',
        'tilt': 'tilt 10s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        slideUp: 'slideUp 0.5s ease-in-out forwards',
        slideInFromLeft: 'slideInFromLeft 0.5s ease-in-out forwards',
      },
      colors: {
        // Semantic color tokens for better consistency
        background: '#000000',
        foreground: '#ffffff',
        surface: '#111113',
        border: 'rgba(255, 255, 255, 0.1)',
        brand: {
          gold: '#d4a964',
          gray: '#747474',
          white: '#ffffff',
          black: '#000000',
        },
        evolution: {
          gold: '#d4a964',
          gray: '#747474',
          white: '#ffffff',
          black: '#000000',
        },
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
