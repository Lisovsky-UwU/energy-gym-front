import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    proxy: {
      '/api/v1': {
        target: 'http://127.0.0.1:5020',
        changeOrigin: true,
      },
      '/media': {
        target: 'http://127.0.0.1:5020',
        changeOrigin: true,
      },
    }
  }
})
