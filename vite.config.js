import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost',
    strictPort: false,
    open: true,
    cors: true,
    hmr: {
      overlay: true
    }
  }
})
