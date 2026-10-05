import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: true,
    // Paksa mode test agar React memuat build development (menyediakan React.act),
    // terlepas dari NODE_ENV yang di-set di shell.
    env: { NODE_ENV: "test" },
  },
});
