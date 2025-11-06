import { useEffect, useState } from 'react';

interface Star {
  id: number;
  left: number;
  delay: number;
}

export function StarAnimation({ trigger }: { trigger: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    if (trigger > 0) {
      const newStars: Star[] = [];
      for (let i = 0; i < 5; i++) {
        newStars.push({
          id: Date.now() + i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
        });
      }
      setStars(newStars);

      const timer = setTimeout(() => {
        setStars([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="stars"
          style={{
            left: `${star.left}vw`,
            animationDelay: `${star.delay}s`,
          }}
        >
          ✨
        </div>
      ))}
    </>
  );
}
