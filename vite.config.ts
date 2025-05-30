import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ID_Dev/',
  server: {
    port: 5173,
    host: true
  },
  assetsInclude: ['**/*.svg']
}) 