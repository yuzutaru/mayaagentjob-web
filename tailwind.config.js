/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        career: {
          dark: '#090A0E',
          cardDark: '#151821',
          cardDarkHover: '#1E222E',
          green: '#22C55E',
          greenLight: '#4ADE80',
          greenDark: '#16A34A',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
