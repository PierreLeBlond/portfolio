const colors = require("tailwindcss/colors");

delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{svelte,ts}", "./node_modules/@s0rt/**/*.{svelte,js}"],
  theme: {
    extend: {
      boxShadow: {
        solid: "2px 2px rgba(0, 0, 0, 0.2)",
      },
    },
    colors: {
      ...colors,
      primary: colors.yellow,
      secondary: colors.sky,
    },
  },
};
