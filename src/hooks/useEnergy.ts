import { useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettings, saveSettings } from '@/lib/db';

const ENERGY_MAX = 100;
const ENERGY_RECHARGE_RATE = 1; // Energy per minute
const ENERGY_COST_PER_CARD = 5;

interface EnergyState {
  current: number;
  max: number;
  lastUpdated: number;
}

export function useEnergy() {
  const queryClient = useQueryClient();

  // Load energy from settings
  const { data: settings, isLoading: settingsLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
  });

  // Calculate current energy based on time passed
  const calculateCurrentEnergy = useCallback((energyState: EnergyState | null): number => {
    if (!energyState) return ENERGY_MAX;

    const now = Date.now();
    const timePassed = (now - energyState.lastUpdated) / 1000 / 60; // minutes
    const energyGained = Math.floor(timePassed * ENERGY_RECHARGE_RATE);
    const newEnergy = Math.min(ENERGY_MAX, energyState.current + energyGained);

    return newEnergy;
  }, []);

  // Get current energy
  const getCurrentEnergy = useCallback((): number => {
    if (!settings?.energy) {
      return ENERGY_MAX;
    }

    const energyState = settings.energy as EnergyState;
    return calculateCurrentEnergy(energyState);
  }, [settings, calculateCurrentEnergy]);

  // Update energy mutation
  const updateEnergyMutation = useMutation({
    mutationFn: async (newEnergy: number) => {
      const currentSettings = await getSettings();
      const energyState: EnergyState = (currentSettings.energy as EnergyState) || {
        current: ENERGY_MAX,
        max: ENERGY_MAX,
        lastUpdated: Date.now(),
      };

      const updatedState: EnergyState = {
        ...energyState,
        current: Math.max(0, Math.min(ENERGY_MAX, newEnergy)),
        lastUpdated: Date.now(),
      };

      await saveSettings({
        ...currentSettings,
        energy: updatedState,
      });

      return updatedState;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  // Use energy (when drawing a card)
  const useEnergy = useCallback(
    async (amount: number = ENERGY_COST_PER_CARD) => {
      const current = getCurrentEnergy();
      if (current < amount) {
        return false; // Not enough energy
      }

      const newEnergy = current - amount;
      await updateEnergyMutation.mutateAsync(newEnergy);
      return true;
    },
    [getCurrentEnergy, updateEnergyMutation]
  );

  // Recharge energy (manual or automatic)
  const rechargeEnergy = useCallback(
    async (amount?: number) => {
      const current = getCurrentEnergy();
      const newEnergy = amount
        ? Math.min(ENERGY_MAX, current + amount)
        : ENERGY_MAX; // Full recharge if no amount specified

      await updateEnergyMutation.mutateAsync(newEnergy);
    },
    [getCurrentEnergy, updateEnergyMutation]
  );

  // Initialize energy if not set (only once)
  useEffect(() => {
    if (settings && !settings.energy && !updateEnergyMutation.isPending) {
      const initializeEnergy = async () => {
        try {
          const currentSettings = await getSettings();
          if (!currentSettings.energy) {
            const energyState: EnergyState = {
              current: ENERGY_MAX,
              max: ENERGY_MAX,
              lastUpdated: Date.now(),
            };
            await saveSettings({
              ...currentSettings,
              energy: energyState,
            });
            queryClient.invalidateQueries({ queryKey: ['settings'] });
          }
        } catch (error) {
          console.error('Failed to initialize energy:', error);
        }
      };
      initializeEnergy();
    }
  }, [settings, queryClient]);

  // Sync energy periodically to reflect recharge
  useEffect(() => {
    if (!settings?.energy) return;

    const interval = setInterval(() => {
      const current = getCurrentEnergy();
      const energyState = settings.energy as EnergyState;
      
      // Only update if energy has actually changed (recharged)
      if (current !== energyState.current && current < ENERGY_MAX) {
        updateEnergyMutation.mutate(current);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [settings, getCurrentEnergy, updateEnergyMutation]);

  const currentEnergy = getCurrentEnergy();

  return {
    energy: currentEnergy,
    maxEnergy: ENERGY_MAX,
    canPlay: currentEnergy >= ENERGY_COST_PER_CARD,
    useEnergy,
    rechargeEnergy,
    isLoading: settingsLoading || updateEnergyMutation.isPending,
  };
}

