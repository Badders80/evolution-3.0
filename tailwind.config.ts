import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
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
