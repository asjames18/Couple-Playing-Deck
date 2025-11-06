import { useEffect, useState, useCallback, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface OfflineGuardProps {
  children: ReactNode;
}

export default function OfflineGuard({ children }: OfflineGuardProps) {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false);
  const [isPrefetching, setIsPrefetching] = useState(false);
  const [prefetchProgress, setPrefetchProgress] = useState(0);

  const checkIfCached = useCallback(async () => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      try {
        // Check pages cache (new name) or html-cache (legacy)
        const pagesCache = await caches.open('pages').catch(() => null);
        const htmlCache = await caches.open('html-cache').catch(() => null);
        const cached =
          (pagesCache && (await pagesCache.match(location.pathname))) ||
          (htmlCache && (await htmlCache.match(location.pathname)));

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
      setIsPrefetching(true);
      setPrefetchProgress(0);

      try {
        // Prefetch the page itself
        const pagesCache = await caches.open('pages');
        await pagesCache.add(location.pathname);
        setPrefetchProgress(25);

        // Prefetch related assets (JS, CSS) by fetching the page and extracting resources
        // This is a simplified approach - in production, you might want to prefetch
        // specific known assets for each route
        try {
          const response = await fetch(location.pathname);
          const html = await response.text();
          
          // Extract script and stylesheet links from HTML
          const scriptMatches = html.matchAll(/<script[^>]+src=["']([^"']+)["']/g);
          const linkMatches = html.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']stylesheet["']/g);
          
          const assets: string[] = [];
          for (const match of scriptMatches) {
            if (match[1] && !match[1].startsWith('http')) {
              assets.push(new URL(match[1], window.location.origin).pathname);
            }
          }
          for (const match of linkMatches) {
            if (match[1] && !match[1].startsWith('http')) {
              assets.push(new URL(match[1], window.location.origin).pathname);
            }
          }

          // Prefetch assets
          const staticCache = await caches.open('static');
          let fetched = 0;
          for (const asset of assets.slice(0, 10)) {
            // Limit to 10 assets to avoid overwhelming
            try {
              await staticCache.add(asset);
              fetched++;
              setPrefetchProgress(25 + (fetched / 10) * 50);
            } catch (e) {
              // Ignore individual asset failures
            }
          }
        } catch (e) {
          // Asset prefetching is optional
          console.warn('Could not prefetch assets:', e);
        }

        setPrefetchProgress(100);
        setShowDownloadPrompt(false);
        
        // Show success message briefly
        setTimeout(() => {
          setIsPrefetching(false);
          setPrefetchProgress(0);
        }, 1000);
      } catch (error) {
        console.error('Failed to prefetch:', error);
        alert('Failed to download for offline. Please check your connection.');
        setIsPrefetching(false);
        setPrefetchProgress(0);
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
            disabled={isPrefetching}
            data-haptic
            className="btn-gaming-primary tap-target"
            style={{ width: '100%', position: 'relative', overflow: 'hidden' }}
          >
            {isPrefetching ? (
              <>
                <span>Downloading... {Math.round(prefetchProgress)}%</span>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '4px',
                    width: `${prefetchProgress}%`,
                    background: 'rgba(255, 255, 255, 0.5)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </>
            ) : (
              'Download for Offline'
            )}
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
