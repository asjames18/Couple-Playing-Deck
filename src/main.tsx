import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { initAnalytics } from './lib/analytics';
import { migrateLocalStorage, shouldMigrate } from './lib/migrate-localStorage';
import { registerHaptics } from './lib/app-utils';
import './styles/index.css';

// Initialize analytics
initAnalytics();

// Register haptics
registerHaptics();

// Migrate localStorage to IndexedDB if needed
if (shouldMigrate()) {
  migrateLocalStorage().catch((e) => {
    console.error('Migration failed:', e);
  });
}

// Service Worker update handling
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // New service worker has taken control, reload to get fresh assets
    window.location.reload();
  });
}

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes (for remote queries)
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
