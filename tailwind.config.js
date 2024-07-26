/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.vue"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        green: {
          500: "#38A169",
          600: "#2F855A",
        },
        cyan: {
          500: "#09B4B4",
          400: "#09B48B",
        },
      },
    },
  },
  plugins: [],
};
