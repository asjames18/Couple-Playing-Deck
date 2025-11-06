import { useState, useEffect } from 'react';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial state
    if (!navigator.onLine) {
      setShowBanner(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showBanner || isOnline) {
    return null;
  }

  return (
    <div className="offline-banner">
      <div className="offline-banner-content">
        <span className="offline-banner-icon">📡</span>
        <span className="offline-banner-text">
          You're offline. Some features may be limited.
        </span>
      </div>
    </div>
  );
}

