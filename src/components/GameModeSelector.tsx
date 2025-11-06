import { motion } from 'framer-motion';
import { GameMode, GAME_MODES, type GameModeConfig } from '@/lib/game-modes';
import PrimaryButton from './PrimaryButton';

interface GameModeSelectorProps {
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  className?: string;
}

export default function GameModeSelector({
  currentMode,
  onModeChange,
  className = '',
}: GameModeSelectorProps) {
  const modes: GameModeConfig[] = Object.values(GAME_MODES);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <label className="text-sm font-medium text-muted">Game Mode</label>
      <div className="grid grid-cols-2 gap-2">
        {modes.map((mode) => (
          <motion.button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-3 rounded-xl font-medium transition-all tap-target focus-visible-ring ${
              currentMode === mode.id
                ? 'bg-primary text-white'
                : 'bg-card text-muted hover:bg-card-hover ring-1 ring-white/5'
            }`}
            data-haptic
            aria-label={`Select ${mode.name} mode`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{mode.icon}</span>
              <div className="text-left">
                <div className="text-sm font-semibold">{mode.name}</div>
                <div className="text-xs opacity-80">{mode.description}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

