import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettings, saveSettings } from '@/lib/db';
import { ACHIEVEMENTS, type Achievement, checkAchievementUnlock } from '@/lib/achievements';

export function useAchievements() {
  const queryClient = useQueryClient();

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
    staleTime: Infinity,
  });

  const unlockedIds: string[] = (settings?.achievements as string[]) || [];
  const unlockedAchievements = unlockedIds
    .map((id) => ACHIEVEMENTS[id])
    .filter((a): a is Achievement => a !== undefined);

  // Unlock achievement mutation
  const unlockAchievementMutation = useMutation({
    mutationFn: async (achievementId: string) => {
      const currentSettings = await getSettings();
      const currentUnlocked = (currentSettings.achievements as string[]) || [];

      if (currentUnlocked.includes(achievementId)) {
        return; // Already unlocked
      }

      const achievement = ACHIEVEMENTS[achievementId];
      if (!achievement) {
        throw new Error(`Achievement ${achievementId} not found`);
      }

      const newUnlocked = [...currentUnlocked, achievementId];
      await saveSettings({
        ...currentSettings,
        achievements: newUnlocked,
      });

      return achievement;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  // Unlock an achievement
  const unlockAchievement = async (achievementId: string) => {
    if (checkAchievementUnlock(achievementId, unlockedIds)) {
      return null; // Already unlocked
    }
    return await unlockAchievementMutation.mutateAsync(achievementId);
  };

  // Check if achievement is unlocked
  const isUnlocked = (achievementId: string): boolean => {
    return checkAchievementUnlock(achievementId, unlockedIds);
  };

  return {
    unlockedAchievements,
    unlockedIds,
    unlockAchievement,
    isUnlocked,
    isLoading: unlockAchievementMutation.isPending,
  };
}

