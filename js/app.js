// Shared app utilities (theme, haptics, audio toggle)

export function initApp() {
  initTheme();
  registerHaptics();
}

export function initTheme() {
  try {
    const pref = localStorage.getItem('theme');
    if (pref === 'dark') document.documentElement.classList.add('theme-dark');
    if (pref === 'light') document.documentElement.classList.remove('theme-dark');
  } catch {}
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('theme-dark');
  try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch {}
}

export function vibrate(pattern = 20) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

function registerHaptics() {
  document.body.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-haptic]')) vibrate(10);
  });
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
}


