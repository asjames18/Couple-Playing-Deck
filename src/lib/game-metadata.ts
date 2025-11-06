import { GameMetadata } from './db';

export const GAME_METADATA: Record<string, GameMetadata> = {
  couples: { name: 'Couples', icon: '💑', category: 'relationship' },
  family: { name: 'Family', icon: '👨‍👩‍👧‍👦', category: 'relationship' },
  friends: { name: 'Friends', icon: '👥', category: 'relationship' },
  kids: { name: 'Kids', icon: '🎮', category: 'relationship' },
  'truth-or-dare': { name: 'Truth or Dare', icon: '🎲', category: 'conversation' },
  'would-you-rather': { name: 'Would You Rather', icon: '🤔', category: 'conversation' },
  'never-have-i-ever': { name: 'Never Have I Ever', icon: '🙈', category: 'conversation' },
  'two-truths': { name: 'Two Truths & a Lie', icon: '🎯', category: 'conversation' },
  'story-time': { name: 'Story Time', icon: '📚', category: 'creative' },
  'memory-lane': { name: 'Memory Lane', icon: '🏞️', category: 'creative' },
  gratitude: { name: 'Gratitude Journal', icon: '🙏', category: 'creative' },
  christian: { name: 'Christian Games', icon: '✝️', category: 'spiritual' },
  'real-talk-cards': { name: 'Real Talk Cards', icon: '💬', category: 'spiritual' },
  loveescape: { name: 'Love Escape', icon: '💕', category: 'relationship' },
};

export function getGameMetadata(gameId: string): GameMetadata {
  return (
    GAME_METADATA[gameId] || { name: gameId, icon: '🎮', category: 'other' }
  );
}

export function getRelatedGames(currentGameId: string): Array<{
  id: string;
  name: string;
  icon: string;
  category: string;
}> {
  const currentGame = GAME_METADATA[currentGameId];
  if (!currentGame) return [];

  return Object.entries(GAME_METADATA)
    .filter(
      ([id, metadata]) =>
        id !== currentGameId && metadata.category === currentGame.category
    )
    .map(([id, metadata]) => ({
      id,
      name: metadata.name,
      icon: metadata.icon,
      category: metadata.category,
    }))
    .slice(0, 3);
}

