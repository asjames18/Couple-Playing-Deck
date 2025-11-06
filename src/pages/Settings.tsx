import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { exportData, importData, getSettings, saveSettings, type ExportData } from '@/lib/db';
import { checkForUpdates } from '@/lib/pwa/updateService';
import BackButton from '@/components/BackButton';
import PrimaryButton from '@/components/PrimaryButton';
import { pageTransition } from '@/lib/motion';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Load settings
    getSettings().then((settings) => {
      if (settings.hapticsEnabled !== undefined) {
        setHapticsEnabled(settings.hapticsEnabled);
      }
      if (settings.soundEnabled !== undefined) {
        setSoundEnabled(settings.soundEnabled);
      }
    });
  }, []);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const data = await exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `games-hub-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);
    setImportSuccess(false);

    try {
      const text = await file.text();
      const data = JSON.parse(text) as ExportData;

      // Validate data structure
      if (!data.version || !data.exportedAt) {
        throw new Error('Invalid backup file format');
      }

      // Confirm import
      if (!confirm('This will replace all your current data. Are you sure?')) {
        return;
      }

      await importData(data);
      setImportSuccess(true);
      setTimeout(() => {
        setImportSuccess(false);
        window.location.reload(); // Reload to reflect changes
      }, 2000);
    } catch (error) {
      console.error('Import failed:', error);
      setImportError(
        error instanceof Error ? error.message : 'Failed to import data'
      );
    } finally {
      setIsImporting(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleCheckUpdates = async () => {
    setIsCheckingUpdates(true);
    try {
      await checkForUpdates();
      // Update prompt will show automatically if update is available
    } catch (error) {
      console.error('Failed to check for updates:', error);
    } finally {
      setIsCheckingUpdates(false);
    }
  };

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    const settings = await getSettings();
    settings.theme = newTheme;
    await saveSettings(settings);
  };

  const handleHapticsToggle = async () => {
    const newValue = !hapticsEnabled;
    setHapticsEnabled(newValue);
    const settings = await getSettings();
    settings.hapticsEnabled = newValue;
    await saveSettings(settings);
  };

  const handleSoundToggle = async () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    const settings = await getSettings();
    settings.soundEnabled = newValue;
    await saveSettings(settings);
  };

  return (
    <motion.div
      {...pageTransition}
      className="container pb-24"
      style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0))' }}
    >
      <BackButton />
      <h1 className="text-[32px] leading-[1.1] font-heading font-bold mb-2">Settings</h1>

      <div className="flex flex-col gap-4 mt-6">
        {/* Appearance */}
        <div className="rounded-xl bg-card shadow-soft p-5 ring-1 ring-white/5">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <div className="flex flex-col gap-3">
            <label className="text-sm text-muted">Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {(['system', 'light', 'dark'] as const).map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => handleThemeChange(themeOption)}
                  className={`px-4 py-3 rounded-xl font-medium transition-colors tap-target focus-visible-ring ${
                    theme === themeOption
                      ? 'bg-primary text-white'
                      : 'bg-card/50 text-muted hover:bg-card'
                  }`}
                  data-haptic
                >
                  {themeOption === 'system' ? '🌓 System' : themeOption === 'dark' ? '🌙 Dark' : '☀️ Light'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="rounded-xl bg-card shadow-soft p-5 ring-1 ring-white/5">
          <h2 className="text-lg font-semibold mb-4">Preferences</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Haptic Feedback</div>
                <div className="text-sm text-muted">Vibrate on interactions</div>
              </div>
              <button
                onClick={handleHapticsToggle}
                className={`relative w-12 h-6 rounded-full transition-colors tap-target focus-visible-ring ${
                  hapticsEnabled ? 'bg-primary' : 'bg-muted/30'
                }`}
                data-haptic={false}
                aria-label={hapticsEnabled ? 'Disable haptics' : 'Enable haptics'}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    hapticsEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Sound Effects</div>
                <div className="text-sm text-muted">Play sounds on actions</div>
              </div>
              <button
                onClick={handleSoundToggle}
                className={`relative w-12 h-6 rounded-full transition-colors tap-target focus-visible-ring ${
                  soundEnabled ? 'bg-primary' : 'bg-muted/30'
                }`}
                data-haptic
                aria-label={soundEnabled ? 'Disable sound' : 'Enable sound'}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    soundEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="rounded-xl bg-card shadow-soft p-5 ring-1 ring-white/5">
          <h2 className="text-lg font-semibold mb-4">Data Management</h2>
          <div className="flex flex-col gap-4">
            <div>
              <PrimaryButton
                onClick={handleExport}
                disabled={isExporting}
                className="w-full"
                data-haptic
              >
                {isExporting ? 'Exporting...' : '📥 Export Data'}
              </PrimaryButton>
              <p className="text-sm text-muted mt-2">
                Download a backup of all your game data, settings, and sessions
              </p>
            </div>
            <div>
              <label
                htmlFor="import-file"
                className="block w-full"
              >
                <PrimaryButton
                  as="span"
                  className={`w-full ${isImporting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {isImporting ? 'Importing...' : '📤 Import Data'}
                </PrimaryButton>
              </label>
              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={handleImport}
                disabled={isImporting}
                className="hidden"
              />
              <p className="text-sm text-muted mt-2">
                Restore from a previously exported backup file
              </p>
              {importError && (
                <p className="text-sm text-red-400 mt-2">{importError}</p>
              )}
              {importSuccess && (
                <p className="text-sm text-green-400 mt-2">
                  ✓ Data imported successfully! Reloading...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* App Updates */}
        <div className="rounded-xl bg-card shadow-soft p-5 ring-1 ring-white/5">
          <h2 className="text-lg font-semibold mb-4">App Updates</h2>
          <PrimaryButton
            onClick={handleCheckUpdates}
            disabled={isCheckingUpdates}
            className="w-full"
            data-haptic
          >
            {isCheckingUpdates ? 'Checking...' : '🔄 Check for Updates'}
          </PrimaryButton>
          <p className="text-sm text-muted mt-2">
            Check if a new version of the app is available
          </p>
        </div>

        {/* iOS Install Guide */}
        {isIOS && (
          <div className="rounded-xl bg-card shadow-soft p-5 ring-1 ring-white/5">
            <h2 className="text-lg font-semibold mb-4">Install App</h2>
            <div className="text-sm text-muted space-y-2">
              <p>Add this app to your home screen:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Tap the Share button <span className="inline-block">📤</span> at the bottom</li>
                <li>Scroll down and tap "Add to Home Screen"</li>
                <li>Tap "Add" to confirm</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
