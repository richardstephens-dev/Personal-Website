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
      animation: {
        "rain-drop": "rain-drop 5s linear infinite",
        "rain-tail": "rain-tail 5s linear infinite",
      },
      keyframes: {
        "rain-drop": {
          "0%": {
            transform: "translateY(0vh) translateX(0vw) rotate(-10deg)",
          },

          "75%": {
            transform: "translateY(90vh) translateX(10vw) rotate(-10deg)",
          },

          "100%": {
            transform: "translateY(90vh) translateX(10vw) rotate(-10deg)",
          },
        },
        "rain-tail": {
          "0%": {
            opacity: 1,
          },
          "65%": {
            opacity: 1,
          },
          "75%": {
            opacity: 0,
          },
          "100%": {
            opacity: 0,
          },
        }
      },
      plugins: [],
    },
  }
}
