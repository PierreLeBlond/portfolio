const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{svelte,ts}", "./node_modules/@s0rt/**/*.{svelte,js}"],
  theme: {
    extend: {
      boxShadow: {
        solid: "2px 2px rgba(0, 0, 0, 0.2)",
      },
      screens: {
        large: { raw: "(min-aspect-ratio: 1/0.75) and (min-height: 700px)" },
        square: { raw: "(min-aspect-ratio: 1/1)" },
      },
    },
    colors: {
      ...colors,
      primary: colors.yellow,
      secondary: colors.sky,
    },
  },
};
