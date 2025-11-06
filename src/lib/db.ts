import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface GameMetadata {
  name: string;
  icon: string;
  category: 'relationship' | 'conversation' | 'creative' | 'spiritual' | 'other';
}

export interface RecentGame {
  id?: number;
  url: string;
  name: string;
  icon: string;
  category: string;
  playedAt: number;
  [key: string]: unknown;
}

export interface GameStats {
  plays: number;
  cardsDrawn: number;
  timeSpent: number;
  lastPlayed: number;
}

export interface Settings {
  theme: 'light' | 'dark';
  [key: string]: unknown;
}

interface GamesDB extends DBSchema {
  settings: {
    key: string;
    value: Settings;
  };
  gameState: {
    key: string;
    value: unknown;
  };
  recentGames: {
    key: number;
    value: RecentGame;
    indexes: { 'by-playedAt': number };
  };
  gameStats: {
    key: string;
    value: GameStats;
  };
}

const DB_NAME = 'connecting-games-hub';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<GamesDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<GamesDB>> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDB<GamesDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Settings store
      if (!db.objectStoreNames.contains('settings')) {
        const settingsStore = db.createObjectStore('settings');
        settingsStore.put({ theme: 'dark' }, 'app');
      }

      // Game state store
      if (!db.objectStoreNames.contains('gameState')) {
        db.createObjectStore('gameState');
      }

      // Recent games store
      if (!db.objectStoreNames.contains('recentGames')) {
        const recentGamesStore = db.createObjectStore('recentGames', {
          keyPath: 'id',
          autoIncrement: true,
        });
        recentGamesStore.createIndex('by-playedAt', 'playedAt');
      }

      // Game stats store
      if (!db.objectStoreNames.contains('gameStats')) {
        db.createObjectStore('gameStats');
      }
    },
  });

  return dbInstance;
}

// Settings operations
export async function getSettings(): Promise<Settings> {
  const db = await getDB();
  const settings = await db.get('settings', 'app');
  return settings || { theme: 'dark' };
}

export async function saveSettings(settings: Settings): Promise<void> {
  const db = await getDB();
  await db.put('settings', settings, 'app');
}

// Recent games operations
export async function getRecentGames(): Promise<RecentGame[]> {
  const db = await getDB();
  const index = db.transaction('recentGames').store.index('by-playedAt');
  const games = await index.getAll();
  return games.sort((a, b) => b.playedAt - a.playedAt);
}

export async function addRecentGame(game: Omit<RecentGame, 'id'>): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('recentGames', 'readwrite');
  const store = tx.store;
  const index = store.index('by-playedAt');

  // Check if game already exists
  const allGames = await index.getAll();
  const existing = allGames.find((g) => g.url === game.url);

  if (existing) {
    // Remove existing entry
    await store.delete(existing.id as number);
  }

  // Add new entry (id will be auto-generated)
  await store.add(game as Omit<RecentGame, 'id'>);

  // Keep only last 10 games
  const allGamesAfterAdd = await index.getAll();
  const sorted = allGamesAfterAdd.sort((a, b) => b.playedAt - a.playedAt);
  if (sorted.length > 10) {
    const toDelete = sorted.slice(10);
    for (const gameToDelete of toDelete) {
      if (gameToDelete.id) {
        await store.delete(gameToDelete.id as number);
      }
    }
  }

  await tx.done;
}

export async function clearRecentGames(): Promise<void> {
  const db = await getDB();
  await db.clear('recentGames');
}

// Game stats operations
export async function getGameStats(): Promise<Record<string, GameStats>> {
  const db = await getDB();
  const allStats = await db.getAll('gameStats');
  const stats: Record<string, GameStats> = {};
  for (const stat of allStats) {
    stats[stat.key as string] = stat.value;
  }
  return stats;
}

export async function getGameStat(gameId: string): Promise<GameStats | undefined> {
  const db = await getDB();
  return await db.get('gameStats', gameId);
}

export async function updateGameStat(
  gameId: string,
  updates: Partial<GameStats>
): Promise<void> {
  const db = await getDB();
  const existing = await db.get('gameStats', gameId);
  const updated: GameStats = {
    plays: 0,
    cardsDrawn: 0,
    timeSpent: 0,
    lastPlayed: Date.now(),
    ...existing,
    ...updates,
  };
  await db.put('gameStats', updated, gameId);
}

export async function clearGameStats(): Promise<void> {
  const db = await getDB();
  await db.clear('gameStats');
}

// Game state operations
export async function getGameState(key: string): Promise<unknown> {
  const db = await getDB();
  return await db.get('gameState', key);
}

export async function saveGameState(key: string, value: unknown): Promise<void> {
  const db = await getDB();
  await db.put('gameState', value, key);
}

export async function clearGameState(): Promise<void> {
  const db = await getDB();
  await db.clear('gameState');
}

