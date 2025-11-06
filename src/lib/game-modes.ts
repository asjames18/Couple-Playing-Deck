// Game modes and mood tagging system

export type GameMood = 'fun' | 'deep' | 'flirty' | 'faith' | 'all';
export type GameMode = 'chill' | 'honesty' | 'challenge' | 'normal';

export interface MoodWeights {
  fun: number;
  deep: number;
  flirty: number;
  faith: number;
}

export interface GameModeConfig {
  id: GameMode;
  name: string;
  description: string;
  icon: string;
  moodWeights: MoodWeights;
  shuffleIntensity: 'light' | 'medium' | 'heavy';
  allowRepeats: boolean;
  timeLimit?: number; // seconds
}

export const GAME_MODES: Record<GameMode, GameModeConfig> = {
  normal: {
    id: 'normal',
    name: 'Normal',
    description: 'Standard gameplay',
    icon: '🎮',
    moodWeights: { fun: 1, deep: 1, flirty: 1, faith: 1 },
    shuffleIntensity: 'medium',
    allowRepeats: true,
  },
  chill: {
    id: 'chill',
    name: 'Chill Night',
    description: 'Relaxed, fun questions',
    icon: '🌙',
    moodWeights: { fun: 2, deep: 1, flirty: 0.5, faith: 0.5 },
    shuffleIntensity: 'light',
    allowRepeats: true,
  },
  honesty: {
    id: 'honesty',
    name: 'Honesty Hour',
    description: 'Deep, meaningful conversations',
    icon: '💬',
    moodWeights: { fun: 0.5, deep: 3, flirty: 0.5, faith: 1 },
    shuffleIntensity: 'medium',
    allowRepeats: false,
  },
  challenge: {
    id: 'challenge',
    name: 'Challenge Mode',
    description: 'Intense, time-limited rounds',
    icon: '⚡',
    moodWeights: { fun: 1.5, deep: 1, flirty: 2, faith: 0.5 },
    shuffleIntensity: 'heavy',
    allowRepeats: false,
    timeLimit: 60, // 60 seconds per card
  },
};

export function getModeConfig(mode: GameMode): GameModeConfig {
  return GAME_MODES[mode] || GAME_MODES.normal;
}

