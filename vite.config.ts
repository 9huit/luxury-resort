import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['path', 'fs', 'url', 'stream', 'http2', 'zlib', 'querystring'], // Mark server-side modules as external
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

