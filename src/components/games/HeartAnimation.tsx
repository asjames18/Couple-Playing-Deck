import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeartAnimationProps {
  trigger: number;
  intensity?: 'low' | 'medium' | 'high';
}

export function HeartAnimation({ trigger, intensity = 'medium' }: HeartAnimationProps) {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  const heartCount = intensity === 'low' ? 6 : intensity === 'medium' ? 12 : 20;

  useEffect(() => {
    if (trigger > 0) {
      // Generate hearts in a ripple pattern with varying delays
      const newHearts = Array.from({ length: heartCount }, (_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        delay: (i / heartCount) * 0.3,
      }));
      setHearts(newHearts);

      // Clear hearts after animation
      const timer = setTimeout(() => setHearts([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [trigger, heartCount]);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-2xl"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(217, 70, 239, 0.6))',
          }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: heart.x,
            y: heart.y - 80,
            scale: [0, 1.3, 1, 0.8],
            opacity: [1, 1, 1, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 1.8,
            delay: heart.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
