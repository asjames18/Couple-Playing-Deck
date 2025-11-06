import { motion } from 'framer-motion';
import { Achievement } from '@/lib/achievements';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'w-12 h-12 text-xl',
  md: 'w-16 h-16 text-2xl',
  lg: 'w-24 h-24 text-4xl',
};

const rarityColors = {
  common: 'ring-white/20 bg-white/5',
  rare: 'ring-primary/40 bg-primary/10',
  epic: 'ring-gold/40 bg-gold/10',
  legendary: 'ring-gradient-fuchsia-amber bg-gradient-card',
};

export default function AchievementBadge({
  achievement,
  unlocked,
  size = 'md',
  showName = false,
  onClick,
}: AchievementBadgeProps) {
  const isClickable = !!onClick;

  return (
    <motion.div
      className={`relative flex flex-col items-center gap-2 ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      whileHover={isClickable ? { scale: 1.05 } : {}}
      whileTap={isClickable ? { scale: 0.95 } : {}}
    >
      <div
        className={`${sizeClasses[size]} rounded-2xl flex items-center justify-center
                   ring-2 ${unlocked ? rarityColors[achievement.rarity] : 'ring-white/10 bg-white/5 opacity-50'}
                   transition-all ${isClickable ? 'hover:ring-white/30' : ''}`}
        title={unlocked ? achievement.name : 'Locked'}
      >
        <span className={unlocked ? '' : 'grayscale opacity-50'}>
          {achievement.icon}
        </span>
      </div>
      {showName && (
        <div className="text-center">
          <div className={`text-xs font-semibold ${unlocked ? 'text-fg' : 'text-muted'}`}>
            {achievement.name}
          </div>
          {unlocked && (
            <div className="text-xs text-muted mt-0.5">{achievement.description}</div>
          )}
        </div>
      )}
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl opacity-30">🔒</div>
        </div>
      )}
    </motion.div>
  );
}

