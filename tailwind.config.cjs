/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      'dark': '#2A2828',
      'light': '#F4EBE1',
      'primary': '#5A202E',
      'secondary': '#DC6D04',
      'tertiary': '#79B8F6',
    },
    extend: {},
  },
  plugins: [require('prettier-plugin-tailwindcss')],
  darkMode: 'class'
}
