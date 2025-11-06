// Reusable motion variants for consistent animations
// Cinematic Relationship Gaming Platform Motion Language

export const pageTransition = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
  transition: { duration: 0.2, ease: 'easeOut' },
};

export const cardFlip = {
  initial: { rotateY: 0, opacity: 0, y: 12 },
  animate: { rotateY: 0, opacity: 1, y: 0 },
  flipped: { rotateY: 180, opacity: 0.5 },
  exit: { rotateY: -180, opacity: 0, y: -12 },
  transition: {
    type: 'spring',
    stiffness: 200,
    damping: 20,
    duration: 0.4,
  },
};

export const cardShuffle = {
  initial: { scale: 0.98, opacity: 0, y: 12 },
  animate: { scale: 1, opacity: 1, y: 0 },
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 24,
  },
};

export const buttonPress = {
  whileTap: { scale: 0.96 },
  transition: { duration: 0.1 },
};

export const emptyState = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: 'easeOut' },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 },
};

export const slideUp = {
  initial: { y: 12, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -12, opacity: 0 },
  transition: { duration: 0.12 },
};

// XP/Energy gain animation with particle burst
export const xpGain = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    y: [0, -20, -40],
  },
  exit: { 
    scale: 0,
    opacity: 0,
    y: -60,
  },
  transition: {
    duration: 0.6,
    ease: 'easeOut',
  },
};

// Emotional micro-animations
export const heartRipple = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: [0, 1.5, 1],
    opacity: [0, 1, 0],
  },
  transition: {
    duration: 0.8,
    ease: 'easeOut',
  },
};

export const energyGlow = {
  animate: {
    boxShadow: [
      '0 0 10px rgba(250, 204, 21, 0.3)',
      '0 0 20px rgba(250, 204, 21, 0.6)',
      '0 0 10px rgba(250, 204, 21, 0.3)',
    ],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

