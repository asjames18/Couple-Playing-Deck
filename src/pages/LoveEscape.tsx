import { useEffect, useState } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useLoveEscape } from '@/hooks/useLoveEscape';
import BackButton from '@/components/BackButton';
import { Link } from 'react-router-dom';
import type { DifficultyLevel } from '@/lib/game-data/love-escape-questions';

export default function LoveEscape() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('loveescape');
  const {
    player1,
    player2,
    setPlayer1,
    setPlayer2,
    difficulty,
    gameStarted,
    gameCompleted,
    gameFailed,
    timeDisplay,
    isPaused,
    hintsLeft,
    questionsAnswered,
    score,
    progress,
    stageTitle,
    currentQuestion,
    userAnswer,
    setUserAnswer,
    showHint,
    achievements,
    startGame,
    checkAnswer,
    useHint,
    togglePause,
    resetGame,
  } = useLoveEscape();
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'loveescape' });
  }, [trackGamePlay]);

  useEffect(() => {
    if (gameCompleted || gameFailed) {
      setShowResult(true);
    }
  }, [gameCompleted, gameFailed]);

  const handleNameSubmit = () => {
    if (!player1.trim() || !player2.trim()) {
      alert('Please enter both names!');
      return;
    }
    setShowDifficulty(true);
  };

  const handleStartGame = (level: DifficultyLevel) => {
    startGame(level);
    setShowDifficulty(false);
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      alert('Please enter an answer!');
      return;
    }
    const isCorrect = checkAnswer();
    if (!isCorrect) {
      alert('Incorrect! Try again.');
    }
  };

  const handleReset = () => {
    resetGame();
    setShowDifficulty(false);
    setShowResult(false);
  };

  return (
    <div className="container">
      <BackButton />
      <h1>Cupid's Love Quiz Escape</h1>
      <p>Answer questions to unlock your dream date night!</p>

      {!showDifficulty && !gameStarted && (
        <div
          id="name-form"
          style={{
            marginTop: '2rem',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
              Player 1 Name:
            </label>
            <input
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              placeholder="Enter name"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontSize: '1rem',
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
              Player 2 Name:
            </label>
            <input
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              placeholder="Enter name"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontSize: '1rem',
              }}
            />
          </div>
          <button className="btn-gaming-primary" onClick={handleNameSubmit} data-haptic>
            Continue
          </button>
        </div>
      )}

      {showDifficulty && !gameStarted && (
        <div
          id="difficulty-form"
          style={{
            marginTop: '2rem',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <h2 style={{ marginBottom: '1.5rem' }}>Choose Difficulty</h2>
          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <button
              className="btn-gaming-primary"
              onClick={() => handleStartGame('easy')}
              data-haptic
              style={{ padding: '1rem' }}
            >
              Easy (20 min, 4 hints)
            </button>
            <button
              className="btn-gaming-primary"
              onClick={() => handleStartGame('normal')}
              data-haptic
              style={{ padding: '1rem' }}
            >
              Normal (15 min, 3 hints)
            </button>
            <button
              className="btn-gaming-primary"
              onClick={() => handleStartGame('hard')}
              data-haptic
              style={{ padding: '1rem' }}
            >
              Hard (10 min, 2 hints)
            </button>
          </div>
        </div>
      )}

      {gameStarted && !gameCompleted && !gameFailed && (
        <div
          id="game"
          style={{
            marginTop: '2rem',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>Time Left: {timeDisplay}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>Hints Left: {hintsLeft}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>Score: {score}</div>
            <button className="btn-gaming-secondary" onClick={togglePause} data-haptic>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>

          <div
            style={{
              width: '100%',
              height: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '1.5rem',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'var(--color-primary)',
                transition: 'width 0.5s ease',
              }}
            />
          </div>

          <div
            style={{
              fontStyle: 'italic',
              marginBottom: '1.5rem',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            Dear {player1} & {player2}, Cupid challenges you to prove your love through a quiz! Answer questions to
            unlock your dream date night!
          </div>

          {currentQuestion && (
            <div
              className="puzzle"
              style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{stageTitle}</h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.6' }}>
                {currentQuestion.question}
              </p>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                Discuss together before answering!
              </p>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmitAnswer();
                  }
                }}
                placeholder="Your answer"
                disabled={isPaused}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  fontSize: '1rem',
                }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-gaming-primary" onClick={handleSubmitAnswer} disabled={isPaused} data-haptic>
                  Submit
                </button>
                <button
                  className="btn-gaming-secondary"
                  onClick={useHint}
                  disabled={hintsLeft === 0 || isPaused}
                  data-haptic
                  style={{ opacity: hintsLeft === 0 ? 0.5 : 1 }}
                >
                  Hint ({hintsLeft})
                </button>
              </div>
              {showHint && currentQuestion.hint && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(255, 215, 0, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                  }}
                >
                  <strong>Hint:</strong> {currentQuestion.hint}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {showResult && (gameCompleted || gameFailed) && (
        <div
          id="result-modal"
          style={{
            marginTop: '2rem',
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>
            {gameCompleted ? '🎉 Congratulations!' : '⏰ Time\'s Up!'}
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            {gameCompleted
              ? `You've completed the Love Quiz Escape! Your dream date night awaits!`
              : `You ran out of time, but don't give up! Try again!`}
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '1.1rem' }}>Final Score: {score}</p>
            <p style={{ fontSize: '1.1rem' }}>Questions Answered: {questionsAnswered}/15</p>
          </div>
          {achievements.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Achievements:</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {achievements.map((achievement, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(255, 215, 0, 0.2)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                    }}
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          )}
          <button className="btn-gaming-primary" onClick={handleReset} data-haptic>
            Play Again
          </button>
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

