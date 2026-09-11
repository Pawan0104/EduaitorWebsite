import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative base so the build works when hosted under /brain-league/
  // on the Eduaitor website (and in the Frontend public/ folder).
  base: "./",
  build: {
    chunkSizeWarningLimit: 1200,
  },
});