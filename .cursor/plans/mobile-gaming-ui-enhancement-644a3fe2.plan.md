<!-- 644a3fe2-955b-4e3d-8eb6-c57da48fc630 2d8b0e5e-5b4a-4bdd-b78f-5be9fe25dd3c -->
# Cinematic Relationship Gaming Platform - Complete Transformation

## Design Philosophy: "Cinematic Fun Meets Intimacy"

Transform Connecting Games Hub into a premium, emotionally-responsive relationship gaming platform. Combine Gamety's visual polish with warm, intimate energy focused on motion as personality, progression systems, and immersive experiences.

## Core Design System

### Visual Identity: "Warm-Energy Meets Futuristic Glow"

**Color Palette:**

- Background: `#0E0E10` → near-black gradient to deep plum (`#1a0a2e`)
- Primary Accent: `#D946EF` (fuchsia-violet) + `#FACC15` (gold) for energy
- Secondary: `#3B82F6` (soft blue) for CTA contrast
- Gradient Overlays: `linear-gradient(180deg, rgba(217,70,239,.3), rgba(250,204,21,.15))`
- Success/Energy: `#4ADE80` (green)
- Semantic: Warning `#FBBF24`, Error `#EF4444`, Info `#3B82F6`

**Typography:**

- Headings: Satoshi or Geist Sans (bold, geometric, 700-900 weight)
- Body: Inter (clean readability, 400-500 weight)
- Labels: Uppercase with `tracking-widest` for "LEVEL", "REWARD", "STREAK"

**Core Layout:**

```
Header (Status Bar: Streak 🔥 / Hearts ❤️ / Energy ⚡)
Main (Active Game Card with flip / Action Row / Progress)
Footer (Fixed Bottom Nav: Home | Games | Stats | Profile)
```

## Implementation Phases

### Phase 1: Foundation & Visual Identity ✅ COMPLETE

**1.1 Design Tokens & Theme System** ✅

- ✅ Updated CSS variables with new color palette (`#0E0E10`, `#D946EF`, `#FACC15`)
- ✅ Added gradient utilities to Tailwind (fuchsia→amber, gold→orange)
- ✅ Created animated background system (radial gradients with subtle movement)
- ✅ Implemented 3D lighting direction (top-left glow, bottom-right shadow)
- Files: `src/styles/index.css`, `tailwind.config.js`

**1.2 Typography System** ✅

- ✅ Integrated Geist Sans for headings (via Google Fonts)
- ✅ Configured Inter for body text
- ✅ Added label styles with uppercase + letter-spacing (`.label-gaming`)
- ✅ Created text gradient utilities (`.text-gradient-primary`, `.text-gradient-energy`)
- Files: `src/styles/index.css`, `public/index.html` (font links)

**1.3 Background Treatment** ✅

- ✅ Animated gradient overlay (radial gradients, 12s ease-in-out infinite)
- Files: `src/styles/index.css` (body::before animation)

### Phase 2: Core Components ✅ COMPLETE

**2.1 StatusBar Component** ✅

- ✅ Energy bar with gradient fill (fuchsia→amber)
- ✅ Streak counter with flame icon 🔥
- ✅ Hearts/XP display
- ✅ Fixed header with backdrop blur (`backdrop-blur bg-white/5`)
- Files: `src/components/StatusBar.tsx`

**2.2 Enhanced GameCard** ✅

- ✅ Flip animation (rotateY 180deg, 0.4s spring)
- ✅ Gradient background (`from-fuchsia-600/40 to-amber-400/20`)
- ✅ Glow effects (`shadow-[0_4px_20px_rgba(217,70,239,0.3)]`)
- ✅ Heart ripple effect on answer
- ✅ 3D shadow for depth
- Files: `src/components/GameCard.tsx` (update existing)

**2.3 Energy/Streak Bar Component** ✅

- ✅ Gradient progress bar
- ✅ Animated fill on energy gain
- ✅ Particle burst on milestone
- Files: `src/components/EnergyBar.tsx`

**2.4 Bottom Navigation Enhancement** ✅

- ✅ Glass morphism with gradient
- ✅ Active state with fuchsia glow
- Files: `src/components/BottomNavigation.tsx` (update existing)

**2.5 PrimaryButton Enhancement** ✅

- ✅ Gradient backgrounds (fuchsia→amber)
- ✅ Scale animation (0.96 → 1)
- ✅ Glow effects
- Files: `src/components/PrimaryButton.tsx` (update existing)

### Phase 3: Motion & Animation System ✅ COMPLETE

- ✅ Card flip: 0.4s spring, rotateY 180
- ✅ Page transitions: fade + slide 30px
- ✅ Button press: scale 0.96 → 1
- ✅ XP/Energy gain: particle burst
- ✅ Emotional micro-animations
- Files: `src/lib/motion.ts` (update existing)

### Phase 4: Gamification Layer ✅ COMPLETE

- ✅ Energy system (limits rounds, recharge mechanism)
- ✅ Streak counter (days played, rewards)
- ✅ XP & Leveling ("Rookie" → "Dynamic Duo" → "Power Couple")
- ✅ Achievements system (badges, gallery)
- ⏳ Daily challenges (countdown ring) - Not yet implemented
- ⏳ Unlockable decks (milestone-based) - Not yet implemented
- Files: New hooks and components

### Phase 5: Smart Session Flow ✅ COMPLETE

- ✅ Mood tagging (`fun`, `deep`, `flirty`, `faith`)
- ✅ Mode selection ("Chill Night", "Honesty Hour", "Challenge Mode")
- ✅ Smart shuffle with weights
- ✅ Session memory (resume, skip duplicates)
- Files: Update game hooks and data

### Phase 6: Audio & Sound Design

- Ambient loop (toggleable)
- Sound effects (flip, earn, unlock, heart sync)
- Volume controls
- Files: `src/hooks/useSound.ts`, `src/lib/audio.ts`

### Phase 7: Social & Sharing

- Invite system (QR code, referral tracking)
- Shareable moments (canvas export)
- Anonymous leaderboard (optional)
- Files: New sharing components

### Phase 8: Thematic Customization

- Theme system ("Royal Gold", "Neon Love", etc.)
- Avatar builder
- Custom decks (create/share)
- Files: Theme and customization components

### Phase 9: Privacy & Safety

- Local-only storage
- App lock (PIN/Face ID)
- Data management (clear, reset, export)
- Files: Security components

### Phase 10: Tech Enhancements

- Background sync (PeriodicSyncManager)
- Caching strategy (IndexedDB by version)
- Offline analytics
- PWA enhancements (custom install, onboarding)
- Files: Background sync and PWA updates

### Phase 11: Branding & Marketing

- Logo (heart-in-flame icon)
- Splash screen (gradient glow, pulse)
- Onboarding (3-slide carousel)
- Files: Branding components

### Phase 12: Long-Term Features (Roadmap)

- AI-powered deck generator
- Voice mode (TTS)
- Sync play (WebRTC)
- Mini-games

### To-dos

- [ ] Analyze current codebase structure: review all HTML pages, JS modules, CSS files, and identify migration mapping
- [ ] Create React + TypeScript directory structure, configuration files (vite.config.ts, tsconfig.json, tailwind.config.js, ESLint, Prettier, Vitest)
- [ ] Update package.json with all required dependencies (React, TypeScript, PWA plugin, React Query, Tailwind, testing libraries) and scripts
- [ ] Configure vite-plugin-pwa with manifest, Workbox runtime caching strategies, and icon assets
- [ ] Create IndexedDB wrapper (src/lib/db.ts) using idb library with stores for settings, gameState, recentGames, gameStats
- [ ] Create src/main.tsx, src/App.tsx with React Router setup, React Query provider, and route definitions for all 16 pages
- [ ] Move all existing CSS files to src/styles/legacy/ and import them, ensure all styles still work
- [ ] Configure Tailwind CSS with design system variables, add to src/styles/index.css, test integration with legacy CSS