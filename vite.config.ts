import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config = {
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: ["@s0rt/3d-viewer"],
  },
} satisfies UserConfig;

export default config;
