import {
  getRecentGames,
  addRecentGame,
  getGameStats,
  updateGameStat,
  getSettings,
  saveSettings,
} from './db';

const RECENT_GAMES_KEY = 'recentGames';
const GAME_STATS_KEY = 'gameStats';
const THEME_KEY = 'theme';

export async function migrateLocalStorage(): Promise<void> {
  try {
    // Migrate recent games
    const recentGamesStr = localStorage.getItem(RECENT_GAMES_KEY);
    if (recentGamesStr) {
      try {
        const recentGames = JSON.parse(recentGamesStr) as Array<{
          url: string;
          name: string;
          icon: string;
          category: string;
          playedAt: number;
        }>;
        for (const game of recentGames) {
          await addRecentGame(game);
        }
        // Clear from localStorage after migration
        localStorage.removeItem(RECENT_GAMES_KEY);
      } catch (e) {
        console.warn('Failed to migrate recent games:', e);
      }
    }

    // Migrate game stats
    const gameStatsStr = localStorage.getItem(GAME_STATS_KEY);
    if (gameStatsStr) {
      try {
        const gameStats = JSON.parse(gameStatsStr) as Record<
          string,
          {
            plays: number;
            cardsDrawn: number;
            timeSpent: number;
            lastPlayed: number;
          }
        >;
        for (const [gameId, stats] of Object.entries(gameStats)) {
          await updateGameStat(gameId, stats);
        }
        // Clear from localStorage after migration
        localStorage.removeItem(GAME_STATS_KEY);
      } catch (e) {
        console.warn('Failed to migrate game stats:', e);
      }
    }

    // Migrate theme
    const theme = localStorage.getItem(THEME_KEY);
    if (theme) {
      try {
        const settings = await getSettings();
        settings.theme = theme === 'dark' ? 'dark' : 'light';
        await saveSettings(settings);
        // Keep in localStorage for backward compatibility during transition
      } catch (e) {
        console.warn('Failed to migrate theme:', e);
      }
    }

    // Mark migration as complete
    localStorage.setItem('migration_complete', 'true');
  } catch (e) {
    console.error('Migration failed:', e);
  }
}

export function shouldMigrate(): boolean {
  return localStorage.getItem('migration_complete') !== 'true';
}

