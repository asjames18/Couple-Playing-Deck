import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  root: process.cwd(),
  publicDir: 'public',
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'pwa-192x192.svg',
        'pwa-512x512.svg',
        'pwa-512x512-maskable.svg',
        'icons/icon-192.svg',
        'icons/icon-512.svg',
        'icons/maskable-512.svg',
      ],
      manifest: {
        name: 'Connecting Games Hub',
        short_name: 'Games Hub',
        description: 'Spark meaningful connections through play',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#667eea',
        background_color: '#0f0f1a',
        categories: ['games', 'entertainment'],
        icons: [
          {
            src: 'pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
          {
            src: 'pwa-512x512-maskable.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        skipWaiting: true,
        clientsClaim: true,
        navigateFallback: '/offline.html',
        navigateFallbackDenylist: [/^\/api/, /^\/_/],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 3,
              plugins: [
                {
                  cacheWillUpdate: async ({ response }) => {
                    return response && response.status === 200 ? response : null;
                  },
                },
              ],
            },
          },
          {
            urlPattern: ({ request }) =>
              ['style', 'script', 'worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'asset-cache',
            },
          },
          {
            urlPattern: ({ request }) =>
              ['image', 'font'].includes(request.destination),
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-cache',
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

