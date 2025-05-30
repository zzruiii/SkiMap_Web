import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SkiMap_Web/',
  server: {
    port: 5173,
    host: true
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  publicDir: 'public'
}) 