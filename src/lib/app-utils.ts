// App utilities - theme, haptics, etc.

export function vibrate(pattern: number | number[] = 20): void {
  if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
    navigator.vibrate(pattern);
  }
}

export function registerHaptics(): void {
  if (typeof document === 'undefined') return;

  document.body.addEventListener('click', async (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-haptic]')) {
      // Check settings for haptics preference
      try {
        const { getSettings } = await import('./db');
        const settings = await getSettings();
        if (settings.hapticsEnabled !== false) {
          // Default to enabled if not set
          vibrate(15);
        }
      } catch {
        // If settings check fails, default to enabled
        vibrate(15);
      }
    }
  });
}
