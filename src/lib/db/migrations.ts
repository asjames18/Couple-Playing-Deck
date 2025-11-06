// IndexedDB migration functions

import type { IDBPDatabase } from 'idb';

export interface Migration {
  version: number;
  migrate: (
    db: IDBPDatabase,
    transaction: IDBTransaction
  ) => Promise<void> | void;
}

export const migrations: Migration[] = [
  {
    version: 2,
    migrate: async (db, transaction) => {
      // Migration from v1 to v2: Ensure indexes exist
      if (db.objectStoreNames.contains('recentGames')) {
        const store = transaction.objectStore('recentGames');
        if (!store.indexNames.contains('by-playedAt')) {
          store.createIndex('by-playedAt', 'playedAt');
        }
      }
    },
  },
  {
    version: 3,
    migrate: (db, _transaction) => {
      // Migration from v2 to v3: Add sessions and decks stores
      if (!db.objectStoreNames.contains('sessions')) {
        const sessionsStore = db.createObjectStore('sessions', {
          keyPath: 'sessionId',
        });
        sessionsStore.createIndex('by-deckId', 'deckId');
        sessionsStore.createIndex('by-timestamp', 'startedAt');
      }

      if (!db.objectStoreNames.contains('decks')) {
        const decksStore = db.createObjectStore('decks', {
          keyPath: 'deckId',
        });
        decksStore.createIndex('by-name', 'name');
      }
    },
  },
];

export function runMigrations(
  db: IDBPDatabase,
  oldVersion: number,
  newVersion: number,
  transaction: IDBTransaction
): void {
  for (let version = oldVersion + 1; version <= newVersion; version++) {
    const migration = migrations.find((m) => m.version === version);
    if (migration) {
      migration.migrate(db, transaction);
    }
  }
}
