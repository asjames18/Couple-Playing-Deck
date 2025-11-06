import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  left: number;
  delay: number;
}

export function BubbleAnimation({ trigger }: { trigger: number }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    if (trigger > 0) {
      const newBubbles: Bubble[] = [];
      for (let i = 0; i < 5; i++) {
        newBubbles.push({
          id: Date.now() + i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
        });
      }
      setBubbles(newBubbles);

      const timer = setTimeout(() => {
        setBubbles([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubbles"
          style={{
            left: `${bubble.left}vw`,
            animationDelay: `${bubble.delay}s`,
          }}
        >
          💬
        </div>
      ))}
    </>
  );
}

