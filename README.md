# Connecting Games Hub (PWA)

A modern, installable Progressive Web App built with React + TypeScript + Vite, featuring multiple connection games for couples, families, friends, and more.

## 🚀 Quick Start

### Prerequisites

- Node.js v20 or higher
- pnpm (recommended) or npm

### Setup

1. **Enable pnpm (if not already enabled)**

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Run development server**

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

4. **Build for production**

```bash
pnpm build
```

5. **Preview production build**

```bash
pnpm preview
```

## 📦 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run unit tests with Vitest
- `pnpm test:e2e` - Run end-to-end tests with Playwright
- `pnpm test:e2e:ui` - Run e2e tests with Playwright UI
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 🏗️ Project Structure

```
/
├── public/              # Static assets
│   ├── icons/          # App icons
│   └── index.html       # HTML entry point
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # React components
│   │   ├── games/      # Game-specific components
│   │   └── __tests__/  # Component tests
│   ├── hooks/          # Custom React hooks
│   │   └── __tests__/  # Hook tests
│   ├── lib/            # Utility functions
│   │   ├── db.ts       # IndexedDB wrapper
│   │   ├── analytics.ts # Google Analytics
│   │   └── app-utils.ts # App utilities
│   ├── pages/          # Page components
│   ├── styles/         # CSS files
│   │   └── legacy/     # Legacy CSS (preserved)
│   ├── test/           # Test setup
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json        # Dependencies and scripts
```

## 🎮 Features

### PWA (Progressive Web App)

- **Installable**: Add to home screen on mobile and desktop
- **Offline Support**: Works offline with service worker caching
- **App-like Experience**: Standalone mode with custom splash screen
- **Auto-update**: Service worker automatically updates in background

### Offline Behavior

- **Cached Pages**: All visited pages are cached for offline access
- **Cached Assets**: CSS, JS, images, and fonts are cached
- **IndexedDB**: Game state, recent games, and stats persist offline
- **Network First**: Pages attempt network fetch first, fall back to cache

### Data Management

- **IndexedDB**: All game data stored in IndexedDB for offline access
- **React Query**: Server state management with caching
- **Automatic Migration**: localStorage data automatically migrates to IndexedDB
- **State Persistence**: Game progress, recent games, and stats persist across sessions

### Games

- **Couples**: Heart & Hustle - Deep connection questions
- **Family**: Family bonding games
- **Friends**: Friend connection games
- **Kids**: Kid-friendly games
- **Truth or Dare**: Classic truth or dare
- **Would You Rather**: Choice-based questions
- **Never Have I Ever**: Confession game
- **Two Truths & a Lie**: Guessing game
- **Story Time**: Collaborative storytelling
- **Memory Lane**: Memory sharing
- **Gratitude Journal**: Gratitude exercises
- **Christian Games**: Faith-based games
- **Real Talk Cards**: Deep conversation starters
- **Love Escape**: Romantic games

## 🔧 Development

### TypeScript

The project uses TypeScript with strict mode enabled. Type definitions are provided for all major dependencies.

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Legacy CSS**: Existing CSS files preserved in `src/styles/legacy/`
- **Design System**: CSS variables for consistent theming
- **Responsive**: Mobile-first design approach

### State Management

- **React Query**: Server state and caching
- **Zustand**: Client state (theme, etc.)
- **IndexedDB**: Persistent storage via `idb` library

### Routing

- **React Router**: Client-side routing
- **URL Structure**: Clean URLs (e.g., `/couples` instead of `/couples.html`)
- **Route Preservation**: Existing URL structure maintained

## 🧪 Testing

### Unit Tests

Tests are written with Vitest and React Testing Library:

```bash
pnpm test
```

Test files are located alongside components in `__tests__` directories.

### End-to-End Tests

E2E tests are written with Playwright:

**First-time setup:**
```bash
pnpm exec playwright install
```

This downloads the required browser binaries (Chromium, Firefox, WebKit) for testing.

**Running tests:**
```bash
pnpm test:e2e
```

E2E tests cover:
- PWA installation flow
- Offline functionality
- Service worker updates
- Cache behavior

Run with UI mode:
```bash
pnpm test:e2e:ui
```

**Note:** E2E tests require the preview server to be running. The test command will automatically start it if not already running.

## 📱 PWA Features

### Installation

The app can be installed on:
- **Chrome/Edge**: Install prompt appears automatically
- **Safari (iOS)**: Add to Home Screen from share menu
- **Firefox**: Install from address bar

### Manifest

The PWA manifest includes:
- App name and description
- Icons (192x192, 512x512, maskable)
- Theme colors
- Display mode (standalone)
- Start URL

### Service Worker

- **Workbox**: Automatic service worker generation via `vite-plugin-pwa`
- **Caching Strategies**:
  - **HTML pages**: NetworkFirst with 4s timeout (cache name: `pages`)
  - **Static assets** (JS/CSS/JSON/webmanifest): StaleWhileRevalidate (cache name: `static`)
  - **Images** (PNG/JPG/SVG/WebP/AVIF): CacheFirst with 30-day expiration, 80 entry limit (cache name: `images`)
- **Auto-update**: Service worker updates automatically with user prompt
- **Offline fallback**: `/offline.html` shown when page not cached

### Image Optimization

For best performance:

- **Format**: Use AVIF or WebP when possible (better compression than PNG/JPG)
- **Lazy loading**: Add `loading="lazy"` to images below the fold
- **Responsive images**: Use `srcset` for different screen densities
- **Vite optimization**: Vite automatically optimizes images during build

Example:
```html
<img 
  src="/image.webp" 
  srcset="/image@2x.webp 2x" 
  loading="lazy" 
  alt="Description" 
/>
```

### Performance & PWA Audit

Run a Lighthouse audit to verify PWA compliance:

```bash
# Build the project
pnpm build

# Serve locally
pnpm preview

# Run Lighthouse (requires Chrome)
npx lighthouse http://localhost:4173 --view
```

Expected results:
- ✅ **Installable**: PWA install prompt works
- ✅ **Offline**: App works offline with service worker
- ✅ **Performance**: First Contentful Paint < 1.8s
- ✅ **Accessibility**: WCAG AA compliance (tap targets ≥44px, color contrast)
- ✅ **Best Practices**: HTTPS, valid manifest, service worker registered

Screenshot the Lighthouse PWA audit results and include in your project documentation.

## 🚢 Deployment

### Required Server Headers

For optimal PWA functionality, ensure your hosting provider sets these headers:

**Content Security Policy (CSP):**
```
default-src 'self';
img-src 'self' data: blob:;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com;
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
connect-src 'self' https://www.googletagmanager.com;
```

**Manifest:**
- `manifest.webmanifest` should be served with `Content-Type: application/manifest+json`

**Cache Headers:**
- `sw.js` (service worker): `Cache-Control: no-cache, no-store, must-revalidate`
- Hashed assets (JS/CSS): `Cache-Control: public, immutable, max-age=31536000`

### Vercel

1. Push to GitHub
2. Import project in Vercel
3. Deploy (automatic on push)

Vercel automatically handles:
- Manifest Content-Type
- Cache headers for static assets
- CSP can be configured in `vercel.json`

### Netlify

1. Push to GitHub
2. Connect to Netlify
3. Build command: `pnpm build`
4. Publish directory: `dist`

Add `_headers` file in `public/`:
```
/manifest.webmanifest
  Content-Type: application/manifest+json

/sw.js
  Cache-Control: no-cache, no-store, must-revalidate

/assets/*
  Cache-Control: public, immutable, max-age=31536000
```

### Cloudflare Pages

1. Push to GitHub
2. Connect to Cloudflare Pages
3. Build command: `pnpm build`
4. Build output directory: `dist`

Add `_headers` file in `public/` (same as Netlify).

### Static Hosting

Build the project and serve the `dist` directory:

```bash
pnpm build
# Serve dist/ directory with any static file server
```

Ensure your server:
- Serves `manifest.webmanifest` with correct Content-Type
- Sets appropriate cache headers for service worker and assets

## 🔄 Migration Notes

This project was migrated from a multi-page HTML/CSS/JS app to a React SPA. Key changes:

- **Routing**: Client-side routing with React Router
- **State**: localStorage → IndexedDB with automatic migration
- **Components**: HTML pages → React components
- **Build**: Vite replaces manual build process
- **PWA**: vite-plugin-pwa replaces manual service worker

### Preserved Features

- All existing CSS styles
- All game functionality
- URL structure (mapped to React routes)
- Design system and theme
- Google Analytics integration

## 📝 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📧 Support

For issues and questions, please open an issue on GitHub.
