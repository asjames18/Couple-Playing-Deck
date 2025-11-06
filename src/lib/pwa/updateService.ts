// Service Worker update detection and management

export interface UpdateInfo {
  waiting: ServiceWorker | null;
  updateAvailable: boolean;
  updateError: Error | null;
}

const updateInfo: UpdateInfo = {
  waiting: null,
  updateAvailable: false,
  updateError: null,
};

const listeners = new Set<(info: UpdateInfo) => void>();

export function getUpdateInfo(): UpdateInfo {
  return { ...updateInfo };
}

export function subscribeToUpdates(
  callback: (info: UpdateInfo) => void
): () => void {
  listeners.add(callback);
  callback(updateInfo);
  return () => listeners.delete(callback);
}

function notifyListeners() {
  const info = getUpdateInfo();
  listeners.forEach((callback) => callback(info));
}

export function checkForUpdates(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('serviceWorker' in navigator)) {
      const error = new Error('Service Workers not supported');
      updateInfo.updateError = error;
      notifyListeners();
      reject(error);
      return;
    }

    navigator.serviceWorker
      .getRegistration()
      .then((registration) => {
        if (!registration) {
          resolve();
          return;
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              // New service worker is waiting
              updateInfo.waiting = newWorker;
              updateInfo.updateAvailable = true;
              updateInfo.updateError = null;
              notifyListeners();
            }
          });
        });

        // Check for waiting service worker
        if (registration.waiting) {
          updateInfo.waiting = registration.waiting;
          updateInfo.updateAvailable = true;
          updateInfo.updateError = null;
          notifyListeners();
        }

        // Try to update
        registration
          .update()
          .then(() => {
            resolve();
          })
          .catch((error) => {
            updateInfo.updateError = error;
            notifyListeners();
            reject(error);
          });
      })
      .catch((error) => {
        updateInfo.updateError = error;
        notifyListeners();
        reject(error);
      });
  });
}

export function skipWaiting(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!updateInfo.waiting) {
      reject(new Error('No waiting service worker'));
      return;
    }

    const channel = new MessageChannel();
    channel.port1.onmessage = (event) => {
      if (event.data.error) {
        reject(new Error(event.data.error));
      } else {
        updateInfo.waiting = null;
        updateInfo.updateAvailable = false;
        notifyListeners();
        resolve();
      }
    };

    updateInfo.waiting.postMessage({ type: 'SKIP_WAITING' }, [channel.port2]);
  });
}

// Initialize update detection
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // Service worker has taken control, reload the page
    window.location.reload();
  });

  // Check for updates periodically (every 5 minutes)
  setInterval(
    () => {
      checkForUpdates().catch(() => {
        // Silently fail - updates will be checked on next page load
      });
    },
    5 * 60 * 1000
  );

  // Check for updates on page load
  checkForUpdates().catch(() => {
    // Silently fail
  });
}
