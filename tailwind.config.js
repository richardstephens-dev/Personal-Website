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
      colors: {
        "gothic-bit-woodsmoke": "#0e0e12",
        "gothic-bit-steel-gray": "#1a1a24",
        "gothic-bit-tuna": "#333346",
        "gothic-bit-comet": "#535373",
        "gothic-bit-waterloo": "#8080a4",
        "gothic-bit-cadet-blue": "#a6a6bf",
        "gothic-bit-ghost": "#c1c1d2",
        "gothic-bit-athens-gray": "#e6e6ec",
      },
      fontFamily: {
        "ubuntu": ["Ubuntu Mono", "monospace"],
      },
      plugins: [],
    },
  }
}
