import { useEffect, useState, useCallback } from 'react';
import { getSettings, saveSettings } from '@/lib/db';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTheme() {
      try {
        const settings = await getSettings();
        const currentTheme = (settings.theme as Theme) || 'dark';
        setThemeState(currentTheme);
        applyTheme(currentTheme);
      } catch (e) {
        console.warn('Failed to load theme:', e);
      } finally {
        setLoading(false);
      }
    }
    loadTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEffectiveTheme = (themeValue: Theme): 'light' | 'dark' => {
    if (themeValue === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return themeValue;
  };

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    const effectiveTheme = getEffectiveTheme(newTheme);
    
    if (effectiveTheme === 'dark') {
      root.classList.remove('light');
      root.classList.add('theme-dark');
    } else {
      root.classList.add('light');
      root.classList.remove('theme-dark');
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme(theme);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, applyTheme]);

  const setTheme = useCallback(
    async (newTheme: Theme) => {
      setThemeState(newTheme);
      applyTheme(newTheme);
      try {
        const settings = await getSettings();
        settings.theme = newTheme;
        await saveSettings(settings);
      } catch (e) {
        console.warn('Failed to save theme:', e);
      }
    },
    [applyTheme]
  );

  const toggleTheme = useCallback(async () => {
    const newTheme: Theme =
      theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark';
    await setTheme(newTheme);
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme, loading };
}
