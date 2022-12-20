/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html",],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      /* https://lospec.com/palette-list/shido-cyberneon */
      colors: {
        "dark-blue": "#00033c",
        "dark-green": "#005260",
        "light-green": "#009d4a",
        "lighter-green": "#0aff52",
        "dark-blue-2": "#003884",
        "light-blue": "#008ac5",
        "lighter-blue": "#00f7ff",
        "light-purple": "#ff5cff",
        "dark-purple": "#ac29ce",
        "dark-purple-2": "#600088",
        "light-purple-2": "#b10585",
        "light-red": "#ff004e",
        "dark-blue-3": "#2a2e79",
        "light-blue-2": "#4e6ea8",
        "lighter-blue-2": "#add4fa",
        "white": "#ffffff",
      },
    },
    plugins: [],
  },
}
