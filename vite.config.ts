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
        start_url: '/?source=pwa',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
            theme_color: '#0E0E10',
            background_color: '#0E0E10',
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
            // HTML navigations: network-first
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages',
              networkTimeoutSeconds: 4,
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
            // static assets: stale-while-revalidate
            urlPattern: ({ url }) =>
              /\.(?:js|css|json|webmanifest)$/.test(url.pathname),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static',
            },
          },
          {
            // images: cache-first with cap
            urlPattern: ({ url }) =>
              /\.(?:png|jpg|jpeg|gif|svg|webp|avif)$/.test(url.pathname),
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
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

