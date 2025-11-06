// Achievement definitions

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'games' | 'streak' | 'xp' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: number; // Timestamp when unlocked
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
  first_game: {
    id: 'first_game',
    name: 'First Steps',
    description: 'Played your first game',
    icon: '🎮',
    category: 'games',
    rarity: 'common',
  },
  ten_games: {
    id: 'ten_games',
    name: 'Getting Started',
    description: 'Played 10 games',
    icon: '🎯',
    category: 'games',
    rarity: 'common',
  },
  fifty_games: {
    id: 'fifty_games',
    name: 'Game Master',
    description: 'Played 50 games',
    icon: '🏆',
    category: 'games',
    rarity: 'rare',
  },
  hundred_games: {
    id: 'hundred_games',
    name: 'Century Club',
    description: 'Played 100 games',
    icon: '💯',
    category: 'games',
    rarity: 'epic',
  },
  streak_3: {
    id: 'streak_3',
    name: 'On a Roll',
    description: '3 day streak',
    icon: '🔥',
    category: 'streak',
    rarity: 'common',
  },
  streak_7: {
    id: 'streak_7',
    name: 'Week Warrior',
    description: '7 day streak',
    icon: '⚡',
    category: 'streak',
    rarity: 'rare',
  },
  streak_30: {
    id: 'streak_30',
    name: 'Monthly Master',
    description: '30 day streak',
    icon: '🌟',
    category: 'streak',
    rarity: 'epic',
  },
  level_5: {
    id: 'level_5',
    name: 'Dynamic Duo',
    description: 'Reached level 5',
    icon: '💑',
    category: 'xp',
    rarity: 'rare',
  },
  level_10: {
    id: 'level_10',
    name: 'Power Couple',
    description: 'Reached level 10',
    icon: '👑',
    category: 'xp',
    rarity: 'legendary',
  },
  all_decks: {
    id: 'all_decks',
    name: 'Deck Collector',
    description: 'Played all deck types',
    icon: '🃏',
    category: 'special',
    rarity: 'epic',
  },
};

export function getAchievement(id: string): Achievement | undefined {
  return ACHIEVEMENTS[id];
}

export function getAllAchievements(): Achievement[] {
  return Object.values(ACHIEVEMENTS);
}

export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
  return Object.values(ACHIEVEMENTS).filter((a) => a.category === category);
}

export function checkAchievementUnlock(
  achievementId: string,
  unlockedAchievements: string[]
): boolean {
  return unlockedAchievements.includes(achievementId);
}

