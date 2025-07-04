/// <reference types="vitest" />
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  //ts-expect-error Vitest test config
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'], 
    globals: true
  },
})
