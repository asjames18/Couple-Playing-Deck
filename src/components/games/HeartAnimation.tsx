import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  delay: number;
}

export function HeartAnimation({ trigger }: { trigger: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    if (trigger > 0) {
      const newHearts: Heart[] = [];
      for (let i = 0; i < 5; i++) {
        newHearts.push({
          id: Date.now() + i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
        });
      }
      setHearts(newHearts);

      // Remove hearts after animation
      const timer = setTimeout(() => {
        setHearts([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="hearts"
          style={{
            left: `${heart.left}vw`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ❤️
        </div>
      ))}
    </>
  );
}
