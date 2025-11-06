import { useEffect, useState } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useTwoTruths } from '@/hooks/useTwoTruths';
import BackButton from '@/components/BackButton';
import { Link } from 'react-router-dom';

export default function TwoTruths() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('two-truths');
  const {
    statements,
    lieIndex,
    timeLeft,
    gameStarted,
    gameEnded,
    selectedIndex,
    isCorrect,
    startGame,
    makeGuess,
    resetGame,
  } = useTwoTruths();
  const [inputStatements, setInputStatements] = useState<
    [string, string, string]
  >(['', '', '']);

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'two-truths' });
  }, [trackGamePlay]);

  const handleStartGame = () => {
    try {
      startGame(inputStatements);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleMakeGuess = (index: number) => {
    if (!gameEnded) {
      makeGuess(index);
    }
  };

  const handleReset = () => {
    resetGame();
    setInputStatements(['', '', '']);
  };

  return (
    <div className="container">
      <BackButton />
      <h1>Two Truths & a Lie</h1>
      <p>
        Challenge your friends to spot the lie among your statements. Can they
        see through your deception?
      </p>

      {!gameStarted ? (
        <div className="game-section" style={{ marginTop: '2rem' }}>
          <div
            className="setup-instructions"
            style={{
              background: 'rgba(155, 89, 182, 0.1)',
              padding: '1rem',
              borderRadius: '10px',
              marginBottom: '1.5rem',
              borderLeft: '4px solid var(--mystery-color, #9b59b6)',
            }}
          >
            <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
              <strong style={{ color: 'var(--mystery-color, #9b59b6)' }}>
                How to play:
              </strong>{' '}
              Enter three statements about yourself. Two must be true, and one
              must be a lie. Make them interesting and believable!
            </p>
          </div>
          <input
            type="text"
            className="statement-input"
            placeholder="Enter your first statement..."
            value={inputStatements[0]}
            onChange={(e) =>
              setInputStatements([
                e.target.value,
                inputStatements[1],
                inputStatements[2],
              ])
            }
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'var(--color-bg-card)',
              color: 'var(--color-text)',
              fontSize: '1rem',
            }}
          />
          <input
            type="text"
            className="statement-input"
            placeholder="Enter your second statement..."
            value={inputStatements[1]}
            onChange={(e) =>
              setInputStatements([
                inputStatements[0],
                e.target.value,
                inputStatements[2],
              ])
            }
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'var(--color-bg-card)',
              color: 'var(--color-text)',
              fontSize: '1rem',
            }}
          />
          <input
            type="text"
            className="statement-input"
            placeholder="Enter your third statement..."
            value={inputStatements[2]}
            onChange={(e) =>
              setInputStatements([
                inputStatements[0],
                inputStatements[1],
                e.target.value,
              ])
            }
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'var(--color-bg-card)',
              color: 'var(--color-text)',
              fontSize: '1rem',
            }}
          />
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              className="btn-gaming-primary"
              onClick={handleStartGame}
              data-haptic
            >
              Start the Game
            </button>
          </div>
        </div>
      ) : (
        <div className="game-section" style={{ marginTop: '2rem' }}>
          <div
            className="timer"
            style={{
              fontSize: '1.8rem',
              textAlign: 'center',
              margin: '1rem 0',
              color:
                timeLeft <= 10
                  ? 'var(--lie-color, #e74c3c)'
                  : 'var(--mystery-color, #9b59b6)',
              fontWeight: '600',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            ⏱️ Time: {timeLeft}s
          </div>
          <div
            id="statements-container"
            style={{
              display: 'grid',
              gap: '1rem',
              marginTop: '1.5rem',
            }}
          >
            {statements.map((statement, index) => {
              let cardClass = 'statement-card';
              if (gameEnded) {
                if (index === lieIndex) {
                  cardClass += ' correct';
                } else if (index === selectedIndex) {
                  cardClass += ' incorrect';
                }
              }
              return (
                <div
                  key={index}
                  className={cardClass}
                  onClick={() => handleMakeGuess(index)}
                  style={{
                    position: 'relative',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-bg-card)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    cursor: gameEnded ? 'default' : 'pointer',
                    transition: 'all 0.3s ease',
                    pointerEvents: gameEnded ? 'none' : 'auto',
                    ...(gameEnded && index === lieIndex
                      ? {
                          background: 'rgba(46, 204, 113, 0.1)',
                          borderColor: 'var(--truth-color, #2ecc71)',
                        }
                      : {}),
                    ...(gameEnded &&
                    index === selectedIndex &&
                    index !== lieIndex
                      ? {
                          background: 'rgba(231, 76, 60, 0.1)',
                          borderColor: 'var(--lie-color, #e74c3c)',
                        }
                      : {}),
                  }}
                >
                  <div
                    className="statement-number"
                    style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      fontSize: '0.8rem',
                      color: 'var(--color-text-secondary)',
                      opacity: 0.7,
                    }}
                  >
                    Statement {index + 1}
                  </div>
                  <div style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    {statement}
                  </div>
                </div>
              );
            })}
          </div>
          {gameEnded && (
            <div
              className="result-message"
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                fontSize: '1.2rem',
                fontWeight: '600',
                ...(isCorrect
                  ? {
                      background: 'rgba(46, 204, 113, 0.1)',
                      color: 'var(--truth-color, #2ecc71)',
                      border: '2px solid var(--truth-color, #2ecc71)',
                    }
                  : {
                      background: 'rgba(231, 76, 60, 0.1)',
                      color: 'var(--lie-color, #e74c3c)',
                      border: '2px solid var(--lie-color, #e74c3c)',
                    }),
              }}
            >
              {isCorrect
                ? '🎉 Brilliant! You found the lie!'
                : `😅 Not quite! Statement ${(lieIndex ?? 0) + 1} was the lie!`}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button
              className="btn-gaming-secondary"
              onClick={handleReset}
              data-haptic
            >
              Play Again
            </button>
          </div>
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
