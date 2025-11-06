import { useEffect } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useChristianGame } from '@/hooks/useChristianGame';
import BackButton from '@/components/BackButton';
import { Link } from 'react-router-dom';
import type { SpiritualPathName } from '@/lib/game-data/spiritual-content';

export default function Christian() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('christian');
  const { currentPrompt, currentPath, paths, drawPrompt, changePath } =
    useChristianGame();

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'christian' });
  }, [trackGamePlay]);

  const pathLabels: Record<SpiritualPathName, string> = {
    reflect: 'Reflect',
    praise: 'Praise',
    pray: 'Pray',
    connect: 'Connect',
  };

  return (
    <div className="container">
      <BackButton />
      <h1>Spiritual Paths</h1>
      <p>Deepen your spiritual connection through reflection and prayer!</p>

      <div
        className="spiritual-path"
        style={{
          marginBottom: '1rem',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {paths.map((path) => (
          <button
            key={path}
            onClick={() => changePath(path)}
            className={`path-step ${currentPath === path ? 'active' : ''}`}
            data-haptic
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--color-primary)',
              background:
                currentPath === path ? 'var(--color-primary)' : 'transparent',
              color: 'var(--color-text)',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            {pathLabels[path] || path}
          </button>
        ))}
      </div>

      <button
        onClick={drawPrompt}
        data-haptic
        className="btn-gaming-primary"
        style={{ marginBottom: '1rem' }}
      >
        Get Prompt
      </button>

      {currentPrompt && (
        <div
          className="card-display"
          style={{
            minHeight: '200px',
            padding: '2rem',
            marginTop: '1rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              lineHeight: '1.8',
            }}
          >
            {currentPrompt.text}
          </div>
          <div
            style={{
              fontSize: '0.9rem',
              fontStyle: 'italic',
              opacity: 0.8,
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {currentPrompt.verse}
          </div>
        </div>
      )}

      {!currentPrompt && (
        <div
          id="card-display"
          className="card-display"
          style={{
            minHeight: '200px',
            padding: '2rem',
            marginTop: '1rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Click "Get Prompt" to start!
        </div>
      )}

      {relatedGames.length > 0 && (
        <div className="related-games-section" style={{ marginTop: '2rem' }}>
          <h3>You might also like:</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {relatedGames.map((game) => (
              <Link
                key={game.id}
                to={`/${game.id}`}
                className="btn-gaming-secondary"
                style={{ textDecoration: 'none' }}
              >
                {game.icon} {game.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
