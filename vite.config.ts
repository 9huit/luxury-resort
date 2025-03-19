import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'path', 'fs', 'url', 'stream', 'http2', 'zlib', 'querystring',
        'util', 'os', 'child_process', 'net', 'tls', 'assert', 'crypto', 
        'buffer', 'http', 'https', 'node:events', 'node:process', 'node:util'
      ], // Mark server-side modules as external
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

