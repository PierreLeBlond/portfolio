import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{svelte,ts}", "./node_modules/@s0rt/**/*.{svelte,js}"],
  theme: {
    extend: {
      screens: {
        horizontal: { raw: "(min-aspect-ratio: 16/9)" },
        xs: { raw: "(max-aspect-ratio: 16/9) and (min-width: 448px)" },
      },
    },
  },
  plugins: [typography],
};
