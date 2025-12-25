import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-expect-error: Tailwind v4 vite plugin lacks type declarations
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
})

