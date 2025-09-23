/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#D4A017',
        'brand-black': '#000000',
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Evolution Stables Brand Colors
        evolution: {
          gold: "#d4a964",
          gray: "#747474", 
          white: "#ffffff",
          black: "#000000",
        },
        brand: {
          gold: "#d4a964",
          gray: "#747474",
          white: "#ffffff", 
          black: "#000000",
          primary: "#d4a964",
          secondary: "#747474",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],  // Skip BwGradual—images for branded text
      },
    },
  },
  plugins: [],
};