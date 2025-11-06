import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { HeartAnimation } from './games/HeartAnimation';

interface GameCardProps {
  title: string;
  icon?: ReactNode;
  onTap: () => void;
  description?: string;
  className?: string;
  showHeartRipple?: boolean;
}

export default function GameCard({
  title,
  icon,
  onTap,
  description,
  className = '',
  showHeartRipple = false,
}: GameCardProps) {
  const [heartTrigger, setHeartTrigger] = useState(0);

  const handleTap = () => {
    if (showHeartRipple) {
      setHeartTrigger((prev) => prev + 1);
    }
    onTap();
  };

  return (
    <>
      <motion.button
        onClick={handleTap}
        whileTap={{ scale: 0.98 }}
        className={`w-full rounded-2xl bg-card shadow-soft
                   ring-1 ring-white/5 hover:ring-white/10 transition-all
                   tap-target focus-visible-ring ${className}`}
        style={{
          backgroundImage: 'radial-gradient(120% 140% at 0% 0%, rgba(255,255,255,.03), transparent 60%)',
        }}
        aria-label={title}
      >
      {description && (
        <div className="text-xs uppercase tracking-widest text-muted mb-2">
          {description}
        </div>
      )}
      <div className="flex items-center gap-3">
        {icon && <div className="text-2xl">{icon}</div>}
        <div className="text-lg font-semibold">{title}</div>
      </div>
      </motion.button>
      {showHeartRipple && <HeartAnimation trigger={heartTrigger} intensity="low" />}
    </>
  );
}

