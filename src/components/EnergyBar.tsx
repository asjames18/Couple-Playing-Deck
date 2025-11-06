import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import ParticleBurst from './ParticleBurst';

interface EnergyBarProps {
  current: number;
  max?: number;
  showIcon?: boolean;
  showLabel?: boolean;
  className?: string;
  onMilestone?: () => void;
}

export default function EnergyBar({
  current,
  max = 100,
  showIcon = true,
  showLabel = true,
  className = '',
  onMilestone,
}: EnergyBarProps) {
  const [prevValue, setPrevValue] = useState(current);
  const [particleTrigger, setParticleTrigger] = useState(0);
  const percentage = Math.min((current / max) * 100, 100);

  useEffect(() => {
    // Check for milestones (25%, 50%, 75%, 100%)
    const milestones = [25, 50, 75, 100];
    const prevPercentage = Math.min((prevValue / max) * 100, 100);
    
    const crossedMilestone = milestones.find(
      (milestone) => prevPercentage < milestone && percentage >= milestone
    );

    if (crossedMilestone) {
      setParticleTrigger((prev) => prev + 1);
      onMilestone?.();
    }

    setPrevValue(current);
  }, [current, max, percentage, prevValue, onMilestone]);

  return (
    <>
      <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 ${className}`}>
        {showIcon && <Zap className="w-4 h-4 text-gold flex-shrink-0" />}
        <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
          <motion.div
            className="bg-gradient-energy h-2 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Glow effect on energy bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </motion.div>
        </div>
        {showLabel && (
          <span className="text-xs text-muted ml-2 min-w-[3rem] text-right">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
      <ParticleBurst trigger={particleTrigger} color="#FACC15" count={8} />
    </>
  );
}

