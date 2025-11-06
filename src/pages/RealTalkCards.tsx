import { useEffect, useState } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useRealTalkCards } from '@/hooks/useRealTalkCards';
import BackButton from '@/components/BackButton';
import { Link } from 'react-router-dom';
import type { RealTalkCategory } from '@/lib/game-data/real-talk-cards';

export default function RealTalkCards() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('real-talk-cards');
  const {
    currentCard,
    currentCategory,
    stats,
    canGoBack,
    canGoNext,
    drawCard,
    nextCard,
    previousCard,
    changeCategory,
    shuffleDeck,
    resetGame,
  } = useRealTalkCards();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'real-talk-cards' });
  }, [trackGamePlay]);

  const categories: RealTalkCategory[] = [
    'all',
    'real-life',
    'faith-culture',
    'encouragement',
    'fun-creative',
    'spiritually',
    'culturally',
    'prophetically',
    'practically',
  ];

  const categoryLabels: Record<RealTalkCategory, string> = {
    all: 'All Cards',
    'real-life': 'Real Life',
    'faith-culture': 'Faith + Culture',
    encouragement: 'Encouragement',
    'fun-creative': 'Fun / Creative',
    spiritually: 'Spiritually',
    culturally: 'Culturally',
    prophetically: 'Prophetically',
    practically: 'Practically',
  };

  const handleDrawCard = () => {
    try {
      drawCard();
      trackGamePlay.mutate({
        gameId: 'real-talk-cards',
        data: { cardsDrawn: 1 },
      });
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleReset = () => {
    if (showResetConfirm) {
      resetGame();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 3000);
    }
  };

  return (
    <div className="container">
      <BackButton />
      <h1>Real Talk Cards</h1>
      <p>Have real conversations that matter</p>

      <div
        className="game-controls"
        style={{
          padding: '1.5rem',
          marginBottom: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-bg-card)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          className="controls-row"
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}
        >
          <button className="btn-gaming-primary" onClick={handleDrawCard} data-haptic>
            Draw Card
          </button>
          <button className="btn-gaming-secondary" onClick={shuffleDeck} data-haptic>
            Shuffle
          </button>
          <button
            className="btn-gaming-secondary"
            onClick={handleReset}
            data-haptic
            style={{
              background: showResetConfirm ? 'var(--color-error, #e74c3c)' : undefined,
            }}
          >
            {showResetConfirm ? 'Click again to reset' : 'Reset'}
          </button>
        </div>

        <div
          className="category-select-wrapper"
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Category:</label>
          <select
            className="category-select"
            value={currentCategory}
            onChange={(e) => changeCategory(e.target.value as RealTalkCategory)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'var(--color-bg-card)',
              color: 'var(--color-text)',
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {categoryLabels[cat]}
              </option>
            ))}
          </select>
        </div>

        <div
          className="stats"
          style={{
            marginTop: '1rem',
            fontSize: '0.9rem',
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
          }}
        >
          Remaining: {stats.remaining} | Drawn: {stats.drawn}
        </div>
      </div>

      {currentCard ? (
        <div
          className="card-display-area"
          style={{
            minHeight: '400px',
            marginBottom: '1.5rem',
          }}
        >
          <div
            className="card-display"
            onClick={nextCard}
            style={{
              padding: '2rem',
              minHeight: '400px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-bg-card)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div
              className="card-header-display"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div
                className="card-icon-display"
                style={{
                  fontSize: '2rem',
                }}
              >
                {currentCard.icon}
              </div>
              <div
                className="card-category-display"
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {currentCard.category}
              </div>
            </div>

            <div
              className="card-question-display"
              style={{
                fontSize: '1.3rem',
                lineHeight: '1.8',
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                whiteSpace: 'pre-line',
              }}
            >
              {currentCard.type === 'wild-card' ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{currentCard.icon}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>{currentCard.question}</div>
                </div>
              ) : (
                currentCard.question
              )}
            </div>

            <div
              className="card-footer-display"
              style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
                textAlign: 'center',
              }}
            >
              {currentCard.footer} • Tap card for next
            </div>
          </div>

          <div
            className="card-navigation"
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '1rem',
            }}
          >
            <button
              className="btn-gaming-secondary"
              onClick={(e) => {
                e.stopPropagation();
                previousCard();
              }}
              disabled={!canGoBack}
              data-haptic
              style={{
                opacity: canGoBack ? 1 : 0.5,
                cursor: canGoBack ? 'pointer' : 'not-allowed',
              }}
            >
              ← Previous
            </button>
            <button
              className="btn-gaming-secondary"
              onClick={(e) => {
                e.stopPropagation();
                nextCard();
              }}
              disabled={!canGoNext}
              data-haptic
              style={{
                opacity: canGoNext ? 1 : 0.5,
                cursor: canGoNext ? 'pointer' : 'not-allowed',
              }}
            >
              Next →
            </button>
          </div>
        </div>
      ) : (
        <div
          className="empty-state"
          style={{
            minHeight: '400px',
            padding: '3rem 2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
            Ready to start?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, color: 'var(--color-text-secondary)' }}>
            Click "Draw Card" to begin your conversation journey!
          </p>
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

