import { useEffect, useState, useCallback, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface OfflineGuardProps {
  children: ReactNode;
}

export default function OfflineGuard({ children }: OfflineGuardProps) {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);

  const checkIfCached = useCallback(async () => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      try {
        const cache = await caches.open('html-cache');
        const cached = await cache.match(location.pathname);

        // Show download prompt if offline and not cached
        if (!navigator.onLine && !cached) {
          setShowDownloadPrompt(true);
        } else {
          setShowDownloadPrompt(false);
        }
      } catch (error) {
        console.warn('Failed to check cache:', error);
        setShowDownloadPrompt(false);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check if current route is cached
    checkIfCached();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkIfCached]);

  const handlePrefetch = async () => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      try {
        const cache = await caches.open('html-cache');
        await cache.add(location.pathname);
        setShowDownloadPrompt(false);
      } catch (error) {
        console.error('Failed to prefetch:', error);
        alert('Failed to download for offline. Please check your connection.');
      }
    }
  };

  if (showDownloadPrompt && !isOnline) {
    return (
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            maxWidth: '400px',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📡</div>
          <h2 style={{ marginBottom: '1rem' }}>Not Available Offline</h2>
          <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
            This page hasn't been downloaded for offline use yet. Connect to the
            internet to download it.
          </p>
          <button
            onClick={handlePrefetch}
            data-haptic
            className="btn-gaming-primary"
            style={{ width: '100%' }}
          >
            Download for Offline
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
