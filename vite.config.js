import {resolve} from 'path';
import { defineConfig } from 'vite'
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  assetsInclude: "**/*.hbs",
  plugins: [handlebars({
    // Конструкция через resolve не регистрирует эти папки
    // resolve(__dirname, 'src/partials', 'src/layouts', 'src/pages')
    partialDirectory: ['src/partials', 'src/layouts', 'src/pages'],
  })],
})
