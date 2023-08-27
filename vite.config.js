import { resolve } from "path";
import { defineConfig } from "vite";
import vitePluginHandlebarsPrecompile from "./vite-plugin-handlebars-precompile.js";

export default defineConfig({
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  plugins: [vitePluginHandlebarsPrecompile()],
});
