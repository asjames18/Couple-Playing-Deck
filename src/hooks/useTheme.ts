import { useEffect, useState } from 'react';
import { getSettings, saveSettings } from '@/lib/db';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTheme() {
      try {
        const settings = await getSettings();
        const currentTheme = settings.theme || 'dark';
        setTheme(currentTheme);
        applyTheme(currentTheme);
      } catch (e) {
        console.warn('Failed to load theme:', e);
      } finally {
        setLoading(false);
      }
    }
    loadTheme();
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
  };

  const toggleTheme = async () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    try {
      const settings = await getSettings();
      settings.theme = newTheme;
      await saveSettings(settings);
    } catch (e) {
      console.warn('Failed to save theme:', e);
    }
  };

  return { theme, toggleTheme, loading };
}

