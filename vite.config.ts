import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-static-assets',
      writeBundle() {
        const src = resolve(__dirname, 'assets');
        const dest = resolve(__dirname, 'dist', 'assets');
        if (existsSync(src)) {
          cpSync(src, dest, { recursive: true });
        }
      }
    }
  ],
  server: {
    port: 3000,
    open: false,
    host: true
  }
});
