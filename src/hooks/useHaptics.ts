import { useCallback } from 'react';
import { getSettings } from '@/lib/db';

export function useHaptics() {
  const triggerHaptic = useCallback(
    async (pattern: number | number[] = 15) => {
      // Check if haptics are enabled
      const settings = await getSettings();
      if (settings.hapticsEnabled === false) {
        return;
      }

      // Default to enabled if not set
      if (
        'vibrate' in navigator &&
        typeof navigator.vibrate === 'function'
      ) {
        navigator.vibrate(pattern);
      }
    },
    []
  );

  const triggerShort = useCallback(() => {
    return triggerHaptic(15);
  }, [triggerHaptic]);

  const triggerLong = useCallback(() => {
    return triggerHaptic([15, 50, 15]);
  }, [triggerHaptic]);

  const triggerMilestone = useCallback(() => {
    return triggerHaptic([15, 30, 15, 30, 15]);
  }, [triggerHaptic]);

  return {
    triggerHaptic,
    triggerShort,
    triggerLong,
    triggerMilestone,
  };
}

