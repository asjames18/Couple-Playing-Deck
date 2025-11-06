// App utilities - theme, haptics, etc.

export function vibrate(pattern: number | number[] = 20): void {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

export function registerHaptics(): void {
  if (typeof document === 'undefined') return;

  document.body.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-haptic]')) {
      vibrate(10);
    }
  });
}

