import { useState, useCallback } from 'react';
import { getSettings, saveSettings } from '@/lib/db';
import { GameMode, getModeConfig, type GameModeConfig } from '@/lib/game-modes';

export function useGameMode() {
  const [currentMode, setCurrentModeState] = useState<GameMode>('normal');

  // Load saved mode preference
  const loadMode = useCallback(async () => {
    try {
      const settings = await getSettings();
      const savedMode = (settings.preferredGameMode as GameMode) || 'normal';
      setCurrentModeState(savedMode);
      return savedMode;
    } catch (error) {
      console.error('Failed to load game mode:', error);
      return 'normal';
    }
  }, []);

  // Save mode preference
  const saveMode = useCallback(async (mode: GameMode) => {
    try {
      const settings = await getSettings();
      await saveSettings({
        ...settings,
        preferredGameMode: mode,
      });
      setCurrentModeState(mode);
    } catch (error) {
      console.error('Failed to save game mode:', error);
    }
  }, []);

  // Set mode (with auto-save)
  const setMode = useCallback(
    async (mode: GameMode) => {
      await saveMode(mode);
    },
    [saveMode]
  );

  const modeConfig: GameModeConfig = getModeConfig(currentMode);

  return {
    currentMode,
    modeConfig,
    setMode,
    loadMode,
  };
}

