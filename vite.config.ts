import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouterDevTools } from "react-router-devtools";

export default defineConfig(() => ({
  server: {
    open: true,
    host: true,
  },
  plugins: [
    reactRouterDevTools(),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
}));
