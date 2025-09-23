/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
};
