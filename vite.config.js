import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

import { chats, messages } from "./public/mock";

export default defineConfig({
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
        notFound: resolve(__dirname, "src/404.html"),
        errorServer: resolve(__dirname, "src/500.html"),
        authorization: resolve(__dirname, "src/authorization.html"),
        registration: resolve(__dirname, "src/registration.html"),
        profile: resolve(__dirname, "src/profile.html"),
        profileEdit: resolve(__dirname, "src/profile-edit.html"),
        changePassword: resolve(__dirname, "src/change-password.html"),
      },
    },
  },
  assetsInclude: "**/*.hbs",
  plugins: [
    handlebars({
      // Конструкция через resolve не регистрирует эти папки
      // resolve(__dirname, 'src/partials', 'src/layouts', 'src/pages')
      partialDirectory: ["src/partials", "src/layouts", "src/pages"],
      context: {
        chats,
        messages,
      },
    }),
  ],
});
