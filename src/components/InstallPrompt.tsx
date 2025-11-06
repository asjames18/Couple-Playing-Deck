import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowPrompt(false);
      setDeferredPrompt(null);
      // Track install event
      if (window.gtag) {
        window.gtag('event', 'pwa_install', {
          event_category: 'PWA',
          event_label: 'Install Accepted',
        });
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && deferredPrompt && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 0) + 1rem)' }}
        >
          <div className="max-w-md mx-auto bg-card/95 backdrop-blur-md rounded-xl shadow-soft ring-1 ring-white/5 p-4 flex items-center gap-3">
            <Download className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-fg">Install App</p>
              <p className="text-xs text-muted">Add to home screen</p>
            </div>
            <div className="flex items-center gap-2">
              <PrimaryButton
                onClick={handleInstall}
                className="px-3 py-1.5 text-sm"
                data-haptic
              >
                Install
              </PrimaryButton>
              <button
                onClick={handleDismiss}
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors tap-target focus-visible-ring"
                aria-label="Dismiss"
                data-haptic
              >
                <X className="w-4 h-4 text-muted" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
