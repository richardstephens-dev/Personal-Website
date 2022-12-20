/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", "./assets/js/*.js",],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      /* https://lospec.com/palette-list/pollen8 
      #fcb08c
#ef9d7f
#d6938a
#b48d92
#a597a1
#8fa0bf
#9aabc9
#a5b7d4*/
      colors: {
        "pollen-rust": "#73464c",
        "pollen-pink": "#ab5675",
        "pollen-red": "#ee6a7c",
        "pollen-peach": "#ffa7a5",
        "pollen-yellow": "#ffe07e",
        "pollen-cream": "#ffe7d6",
        "pollen-green": "#72dcbb",
        "pollen-blue": "#34acba",
        "cloudy-0": "#fcb08c",
        "cloudy-1": "#ef9d7f",
        "cloudy-2": "#d6938a",
        "cloudy-3": "#b48d92",
        "cloudy-4": "#a597a1",
        "cloudy-5": "#8fa0bf",
        "cloudy-6": "#9aabc9",
        "cloudy-7": "#a5b7d4",
      },
    },
    plugins: [],
  },
}
