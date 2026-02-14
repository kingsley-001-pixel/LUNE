/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
      colors: {
        // LIGHT MODE
        lightBg: "#f6f7fb",
        lightCard: "#ffffff",
        lightTextMain: "#0F172A",
        lightTextMuted: "#64748b",
        lightBorder: "#e2e8f0",

        // DARK MODE
        darkBg: "#0b0f1a",
        darkCard: "#11162a",
        darkTextMain: "#e6e9f0",
        darkTextMuted: "#a9b0c2",
        darkBorder: "#2a2f45",

        // SHARED ACCENT
        primary: "#6d6aff",
        primaryHover: "#5b58e6",
        accent: "#7c7cff",

        error: "#ff6b6b",
        success: "#4ade80",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

