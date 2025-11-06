import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { exportData, importData, type ExportData } from '@/lib/db';
import { checkForUpdates } from '@/lib/pwa/updateService';
import BackButton from '@/components/BackButton';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);

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

  return (
    <div className="container">
      <BackButton />
      <h1>Settings</h1>

      <div
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {/* Theme Toggle */}
        <div
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
            Appearance
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>Theme</span>
            <button
              onClick={toggleTheme}
              data-haptic
              className="btn-gaming-secondary"
              style={{ minWidth: '100px' }}
            >
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
            Data Management
          </h2>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <button
                onClick={handleExport}
                disabled={isExporting}
                data-haptic
                className="btn-gaming-primary"
                style={{ width: '100%' }}
              >
                {isExporting ? 'Exporting...' : '📥 Export Data'}
              </button>
              <p
                style={{
                  fontSize: '0.9rem',
                  opacity: 0.7,
                  marginTop: '0.5rem',
                }}
              >
                Download a backup of all your game data, settings, and sessions
              </p>
            </div>
            <div>
              <label
                htmlFor="import-file"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'var(--color-primary)',
                  color: 'white',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  cursor: isImporting ? 'not-allowed' : 'pointer',
                  opacity: isImporting ? 0.6 : 1,
                }}
              >
                {isImporting ? 'Importing...' : '📤 Import Data'}
              </label>
              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={handleImport}
                disabled={isImporting}
                style={{ display: 'none' }}
              />
              <p
                style={{
                  fontSize: '0.9rem',
                  opacity: 0.7,
                  marginTop: '0.5rem',
                }}
              >
                Restore from a previously exported backup file
              </p>
              {importError && (
                <p
                  style={{
                    color: 'var(--color-error, #e74c3c)',
                    fontSize: '0.9rem',
                    marginTop: '0.5rem',
                  }}
                >
                  {importError}
                </p>
              )}
              {importSuccess && (
                <p
                  style={{
                    color: 'var(--color-success, #2ecc71)',
                    fontSize: '0.9rem',
                    marginTop: '0.5rem',
                  }}
                >
                  ✓ Data imported successfully! Reloading...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* App Updates */}
        <div
          style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
            App Updates
          </h2>
          <button
            onClick={handleCheckUpdates}
            disabled={isCheckingUpdates}
            data-haptic
            className="btn-gaming-secondary"
            style={{ width: '100%' }}
          >
            {isCheckingUpdates ? 'Checking...' : '🔄 Check for Updates'}
          </button>
          <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '0.5rem' }}>
            Check if a new version of the app is available
          </p>
        </div>
      </div>
    </div>
  );
}
