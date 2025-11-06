# Connecting Games Hub (PWA)

Mobile-first, installable Progressive Web App bundling multiple mini-games (couples, family, friends, gratitude, real talk cards, and more).

## Quick start

1. Install deps

```
npm install
```

2. Run dev server

```
npm run dev
```

3. Build

```
npm run build
```

4. Preview production build

```
npm run preview
```

## PWA
- Manifest: `manifest.webmanifest`
- Service worker: `sw.js` (precache core assets, runtime cache for HTML/CSS/JS/images)
- Icons: `/icons/`

## Structure
- Shared styles: `css/app.css`
- Shared scripts: `js/app.js`
- Per-page scripts moved to `js/*.page.js` or `js/<page>.js`

## Notes
- Offline: Home and core assets are cached; first load required per page for full offline usage.
- Theme: Use the Theme button on Home to toggle light/dark (persists).

## Accessibility
- Landmarks, focus states, and touch targets considered; please report any issues.

## License
MIT


