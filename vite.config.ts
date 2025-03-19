import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import polyfillNode from 'rollup-plugin-polyfill-node'; // Ajout du polyfill

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    polyfillNode() // Ajouter le plugin de polyfill
  ],
  build: {
    sourcemap: false, // Désactiver les sourcemaps
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

