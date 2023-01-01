/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        content: "calc(100vh - 8.5rem)",
      },
    },
  },
  plugins: [],
};
