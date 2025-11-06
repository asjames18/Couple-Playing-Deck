import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettings, saveSettings } from '@/lib/db';

interface StreakState {
  current: number;
  longest: number;
  lastPlayedDate: string; // YYYY-MM-DD format
}

export function useStreak() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
  });

  const streakState: StreakState = (settings?.streak as StreakState) || {
    current: 0,
    longest: 0,
    lastPlayedDate: '',
  };

  // Check if streak should be maintained or reset
  const checkStreak = (): StreakState => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (streakState.lastPlayedDate === today) {
      // Already played today, maintain streak
      return streakState;
    } else if (streakState.lastPlayedDate === yesterday) {
      // Played yesterday, increment streak
      return {
        current: streakState.current + 1,
        longest: Math.max(streakState.longest, streakState.current + 1),
        lastPlayedDate: today,
      };
    } else {
      // Streak broken, reset to 1
      return {
        current: 1,
        longest: streakState.longest,
        lastPlayedDate: today,
      };
    }
  };

  // Update streak mutation
  const updateStreakMutation = useMutation({
    mutationFn: async () => {
      const currentSettings = await getSettings();
      const newStreak = checkStreak();

      await saveSettings({
        ...currentSettings,
        streak: newStreak,
      });

      return newStreak;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  // Record a play (call this when user plays a game)
  const recordPlay = async () => {
    await updateStreakMutation.mutateAsync();
  };

  return {
    currentStreak: streakState.current,
    longestStreak: streakState.longest,
    recordPlay,
    isLoading: isLoading || updateStreakMutation.isPending,
  };
}

