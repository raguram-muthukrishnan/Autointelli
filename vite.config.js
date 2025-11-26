import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,                  // allow access from any network (important)
    port: 5173,                  // default Vite port
    strictPort: true,            // ensures same port each time
    cors: true,                  // enables cross-origin requests
    hmr: {
      protocol: 'ws',            // use ws protocol for local development
      host: 'localhost',
      port: 5173,
    },
  },
})
