import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: [
      { find: "@/ui", replacement: path.resolve(__dirname, "./ui") },
      { find: "@/contexts", replacement: path.resolve(__dirname, "./src/contexts") },
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
});