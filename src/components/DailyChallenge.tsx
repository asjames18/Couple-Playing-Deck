import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Target, Clock } from 'lucide-react';

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: {
    xp: number;
    energy?: number;
  };
}

interface DailyChallengeProps {
  challenge: DailyChallenge;
  onComplete?: () => void;
}

export default function DailyChallenge({ challenge, onComplete }: DailyChallengeProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeRemaining(`${hours}h ${minutes}m`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const progress = Math.min((challenge.current / challenge.target) * 100, 100);
  const isComplete = challenge.current >= challenge.target;

  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-gradient-card p-5 ring-1 ring-white/10 shadow-[0_4px_20px_rgba(217,70,239,0.3)]"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(217, 70, 239, 0.4), rgba(250, 204, 21, 0.2))',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Daily Challenge</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted">
          <Clock className="w-3 h-3" />
          <span>{timeRemaining}</span>
        </div>
      </div>

      <p className="text-sm text-muted mb-4">{challenge.description}</p>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-muted">
            {challenge.current} / {challenge.target}
          </span>
          <span className="text-gold font-semibold">
            +{challenge.reward.xp} XP {challenge.reward.energy && `+${challenge.reward.energy} Energy`}
          </span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-energy rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </motion.div>
        </div>
      </div>

      {isComplete && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center py-2 rounded-xl bg-success/20 text-success font-semibold text-sm"
        >
          ✓ Challenge Complete!
        </motion.div>
      )}
    </motion.div>
  );
}

