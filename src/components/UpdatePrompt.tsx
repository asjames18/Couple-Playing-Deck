import { useState, useEffect } from 'react';
import {
  subscribeToUpdates,
  skipWaiting,
  getUpdateInfo,
  type UpdateInfo,
} from '@/lib/pwa/updateService';

export default function UpdatePrompt() {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo>(getUpdateInfo());
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToUpdates((info) => {
      setUpdateInfo(info);
    });
    return unsubscribe;
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await skipWaiting();
      // Page will reload automatically via controllerchange listener
    } catch (error) {
      console.error('Failed to update:', error);
      setIsUpdating(false);
    }
  };

  const handleDismiss = () => {
    setUpdateInfo((prev) => ({ ...prev, updateAvailable: false }));
  };

  if (!updateInfo.updateAvailable) {
    return null;
  }

  return (
    <div
      className="update-prompt"
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'rgba(102, 126, 234, 0.95)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        maxWidth: '90%',
        width: '400px',
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateX(-50%) translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '1.5rem' }}>🔄</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
            Update Available
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
            A new version is ready. Reload to get the latest features.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            data-haptic
            style={{
              padding: '0.5rem 1rem',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: isUpdating ? 'not-allowed' : 'pointer',
              opacity: isUpdating ? 0.6 : 1,
            }}
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
          <button
            onClick={handleDismiss}
            data-haptic
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
