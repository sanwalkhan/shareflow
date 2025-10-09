/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#46344e", // dark purple
        secondary: "#5a5560",
        accent: "#faed26", // yellow
        neutral: "#9b986f",
        tertiary: "#9d8d8f",
      },
    },
  },
  plugins: [],
};
