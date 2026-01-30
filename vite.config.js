import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        sales: resolve(__dirname, 'sales.html'),
        shop: resolve(__dirname, 'shop.html'),
        success: resolve(__dirname, 'success.html'),
        access: resolve(__dirname, 'access.html'),
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    open: true,
    proxy: {
      '/api': {
        // En développement : utilise localhost
        // En production : utilise l'URL Railway depuis les variables d'environnement
        target: process.env.VITE_API_URL || 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
