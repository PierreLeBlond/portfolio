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
        horizontal: { raw: "(min-aspect-ratio: 16/9)" },
        xs: { raw: "(max-aspect-ratio: 16/9) and (min-width: 448px)" },
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle at top left, var(--tw-gradient-stops))",
      },
    },
  },
};
