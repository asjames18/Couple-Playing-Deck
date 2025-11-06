import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/lib/achievements';
import { X } from 'lucide-react';

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export default function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed top-20 inset-x-4 z-50 mx-auto max-w-md"
      >
        <div className="rounded-3xl bg-gradient-card p-5 ring-2 ring-primary shadow-[0_8px_30px_rgba(217,70,239,0.4)]">
          <div className="flex items-start gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.1 }}
              className="text-5xl"
            >
              {achievement.icon}
            </motion.div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest text-primary mb-1">
                Achievement Unlocked!
              </div>
              <h3 className="font-bold text-lg mb-1">{achievement.name}</h3>
              <p className="text-sm text-muted">{achievement.description}</p>
            </div>
            <button
              onClick={onDismiss}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors tap-target"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-muted" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

