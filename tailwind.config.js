/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softpink: "#ffb3c6",
        blush: "#ff5c8a",
        deeppink: "#ff2f68",
      },
    },
  },
  plugins: [],
};
