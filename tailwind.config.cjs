/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.png",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      'dark': "var(--dark)",
      'light': "var(--light)",
      'red': "var(--red)",
      'orange': "var(--orange)",
      'blue': "var(--blue)",
    },
    extend: {},
  },
  plugins: [require("prettier-plugin-tailwindcss")],
  darkMode: "class",
};
