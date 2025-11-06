import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';
import PrimaryButton from './PrimaryButton';
import { cardFlip } from '@/lib/motion';

interface GameScreenProps {
  prompt: string | ReactNode;
  onNext: () => void;
  onPrevious?: () => void;
  canGoNext?: boolean;
  canGoBack?: boolean;
  progress?: number;
  className?: string;
}

export default function GameScreen({
  prompt,
  onNext,
  onPrevious,
  canGoNext = true,
  canGoBack = false,
  progress,
  className = '',
}: GameScreenProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const promptKey = typeof prompt === 'string' ? prompt : 'card';

  useEffect(() => {
    // Trigger flip animation when prompt changes
    setIsFlipped(true);
    const timer = setTimeout(() => setIsFlipped(false), 400);
    return () => clearTimeout(timer);
  }, [promptKey]);

  return (
    <div
      className={`grid place-items-center min-h-[calc(100dvh-7rem)] px-4 ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={promptKey}
          initial="initial"
          animate={isFlipped ? "flipped" : "animate"}
          exit="exit"
          variants={cardFlip}
          transition={{ 
            type: 'spring',
            stiffness: 200,
            damping: 20,
            duration: 0.4
          }}
          className="w-full max-w-md rounded-2xl bg-card p-6 
                     shadow-soft ring-1 ring-white/5"
        >
          {typeof prompt === 'string' ? (
            <p className="text-base leading-6">{prompt}</p>
          ) : (
            prompt
          )}
        </motion.div>
      </AnimatePresence>

      {progress !== undefined && (
        <div className="w-full max-w-md mt-4">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-energy rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>
      )}

      <div className="fixed bottom-24 inset-x-0 flex justify-center gap-3 px-4">
        {onPrevious && canGoBack && (
          <PrimaryButton onClick={onPrevious} className="flex-1 max-w-xs">
            Previous
          </PrimaryButton>
        )}
        <PrimaryButton
          onClick={onNext}
          disabled={!canGoNext}
          className="flex-1 max-w-xs"
        >
          Next card
        </PrimaryButton>
      </div>

      <p className="fixed bottom-32 text-xs text-muted text-center px-4">
        Swipe for next • Long-press to save
      </p>
    </div>
  );
}

