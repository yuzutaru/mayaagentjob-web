import { themeColors } from './src/core/theme/themeTokens';

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
          dark: themeColors.dark.background,
          cardDark: themeColors.dark.card,
          cardDarkHover: themeColors.dark.cardHover,
          modalDark: themeColors.dark.modal,
          footerDark: themeColors.dark.footer,
          gradientStart: themeColors.dark.gradientStart,
          gradientEnd: themeColors.dark.gradientEnd,
          green: themeColors.brand.green,
          greenLight: themeColors.brand.greenLight,
          greenDark: themeColors.brand.greenDark,
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

