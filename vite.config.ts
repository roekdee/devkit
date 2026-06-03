import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base must match the GitHub Pages sub-path (https://<user>.github.io/devkit/)
export default defineConfig({
  base: "/devkit/",
  plugins: [react(), tailwindcss()],
});
