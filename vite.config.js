import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Configuración para la raíz del repositorio en GitHub Pages
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Opcional: Divide el código en varios archivos más pequeños
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
