/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#050505',
          light: '#fcfcfc',
        },
        sidebar: {
          dark: '#0a0a0a',
          light: '#f4f4f5',
        },
        accent: {
          dark: '#fbbf24', // Amber
          light: '#d97706', // Deep Orange
        },
        grid: {
          dark: '#111',
          light: '#e5e5e5',
        }
      },
    },
  },
  plugins: [],
}
