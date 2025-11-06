import { Flame, Heart } from 'lucide-react';
import { useAggregatedStats } from '@/hooks/useGameState';
import { useEnergy } from '@/hooks/useEnergy';
import { useStreak } from '@/hooks/useStreak';
import { useXP } from '@/hooks/useXP';
import EnergyBar from './EnergyBar';

export default function StatusBar() {
  const stats = useAggregatedStats();
  const { energy, maxEnergy, isLoading: energyLoading } = useEnergy();
  const { currentStreak, isLoading: streakLoading } = useStreak();
  const { level, levelName, isLoading: xpLoading } = useXP();
  
  // Use XP level as "hearts" display
  const hearts = level;
  
  // Show loading state if any data is loading
  if (energyLoading || streakLoading || xpLoading) {
    return (
      <header
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-black/40 border-b border-white/10"
        style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}
      >
        <div className="px-4 py-3 flex items-center justify-center">
          <div className="text-sm text-muted">Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-card/80 border-b border-white/5"
      style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}
    >
      <div className="px-4 py-2.5 flex items-center justify-between">
        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5">
          <Flame className="w-3.5 h-3.5 text-primary" />
          <span className="text-sm font-medium">{currentStreak}</span>
        </div>

        {/* Level Display */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5" title={levelName}>
          <Heart className="w-3.5 h-3.5 text-error" />
          <span className="text-sm font-medium">{hearts}</span>
        </div>

        {/* Energy Bar */}
        <EnergyBar
          current={energy}
          max={maxEnergy}
          showIcon={true}
          showLabel={false}
          className="flex-1 max-w-[80px]"
        />
      </div>
    </header>
  );
}

