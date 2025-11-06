import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ParticleBurstProps {
  trigger: number;
  color?: string;
  count?: number;
}

export default function ParticleBurst({ trigger, color = '#D946EF', count = 12 }: ParticleBurstProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (trigger > 0) {
      // Generate particles in a circle
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x: Math.cos((i / count) * Math.PI * 2) * 50,
        y: Math.sin((i / count) * Math.PI * 2) * 50,
      }));
      setParticles(newParticles);

      // Clear particles after animation
      const timer = setTimeout(() => setParticles([]), 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, count]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`,
          }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{
            x: particle.x,
            y: particle.y,
            scale: [0, 1, 0],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

