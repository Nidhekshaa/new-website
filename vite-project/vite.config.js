import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Vite PWA Stopwatch',
        short_name: 'Stopwatch',
        description: 'A simple stopwatch application built with Vite and React',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'stopwatch.jpeg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'stopwatch.jpeg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});