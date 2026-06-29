import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/widget',
    rollupOptions: {
      input: {
        widget: path.resolve(__dirname, 'widget.html'),
      },
      output: {
        entryFileNames: 'widget.js',
        chunkFileNames: '[name]-chunk.js',
        assetFileNames: '[name][extname]',
      },
    },
  },
})
