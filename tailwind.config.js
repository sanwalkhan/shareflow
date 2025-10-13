/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
         accent: "#86c232",      // Highlight color (for buttons, important text)
         primary: "#61892f",     // Dark version of main color
         secondary: "#474b4f",   // Slightly darker secondary color
         tertiary: "#6b6e70",    // Text color for smaller text
         neutral: "#222629",     // Overlay / background color
         white: "#ffffff",
         black: "#000000",
         textLight: "#f8f9fa",
         textDark: "#222629",
      },
    },
  },
  plugins: [],
};
