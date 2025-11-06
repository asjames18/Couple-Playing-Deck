import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettings, saveSettings } from '@/lib/db';

interface XPState {
  current: number;
  level: number;
  xpToNextLevel: number;
}

const XP_PER_LEVEL = 100;
const LEVEL_NAMES = [
  'Rookie',
  'Budding',
  'Growing',
  'Blossoming',
  'Dynamic Duo',
  'Power Couple',
  'Soul Mates',
  'Love Legends',
  'Connection Masters',
  'Relationship Royalty',
];

export function useXP() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
  });

  const xpState: XPState = (settings?.xp as XPState) || {
    current: 0,
    level: 1,
    xpToNextLevel: XP_PER_LEVEL,
  };

  // Calculate level from XP
  const calculateLevel = (xp: number): { level: number; xpToNextLevel: number; xpInCurrentLevel: number } => {
    const level = Math.floor(xp / XP_PER_LEVEL) + 1;
    const xpInCurrentLevel = xp % XP_PER_LEVEL;
    const xpToNextLevel = XP_PER_LEVEL - xpInCurrentLevel;

    return { level, xpToNextLevel, xpInCurrentLevel };
  };

  // Add XP mutation
  const addXPMutation = useMutation({
    mutationFn: async (amount: number) => {
      const currentSettings = await getSettings();
      const currentXP = (currentSettings.xp as XPState)?.current || 0;
      const newXP = currentXP + amount;

      const { level, xpToNextLevel, xpInCurrentLevel } = calculateLevel(newXP);
      const leveledUp = level > xpState.level;

      const newXPState: XPState = {
        current: newXP,
        level,
        xpToNextLevel,
      };

      await saveSettings({
        ...currentSettings,
        xp: newXPState,
      });

      return { newXPState, leveledUp, levelName: LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)] };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  // Add XP (call this when user completes actions)
  const addXP = async (amount: number = 10) => {
    return await addXPMutation.mutateAsync(amount);
  };

  const { level, xpToNextLevel, xpInCurrentLevel } = calculateLevel(xpState.current);
  const levelName = LEVEL_NAMES[Math.min(level - 1, LEVEL_NAMES.length - 1)] || 'Rookie';

  return {
    xp: xpState.current,
    level,
    levelName,
    xpInCurrentLevel,
    xpToNextLevel,
    progress: (xpInCurrentLevel / XP_PER_LEVEL) * 100,
    addXP,
    isLoading: isLoading || addXPMutation.isPending,
  };
}

