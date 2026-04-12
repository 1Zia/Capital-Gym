import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const port = Number(process.env.PORT) || 5173;
const basePath = process.env.BASE_PATH || "./";

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-tooltip', '@radix-ui/react-select', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-avatar', '@radix-ui/react-collapsible', '@radix-ui/react-toggle-group', '@radix-ui/react-label', '@radix-ui/react-progress', '@radix-ui/react-sheet', 'lucide-react', 'class-variance-authority'],
          router: ['react-router-dom'],
          utils: ['clsx', 'tailwind-merge'],
        },
      },
    },
  },
  server: {
    port,
    host: true,
    allowedHosts: true,
  },
  preview: {
    port,
    host: true,
    allowedHosts: true,
  },
});
