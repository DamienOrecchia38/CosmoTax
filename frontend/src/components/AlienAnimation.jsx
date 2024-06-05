'use client';

import { useEffect, useRef } from 'react';

export default function AlienAnimation() {
  const alienRef = useRef(null);

  useEffect(() => {
    const alien = alienRef.current;
    const animationDuration = 7000;
    
    const startAnimation = () => {
      alien.style.left = '50%';
      alien.style.top = '50%';
      alien.style.transform = 'translate(-50%, -50%) scale(0.5)';
      
      alien.animate([
        { transform: 'translate(-50%, -50%) scale(0.5)' },
        { transform: 'translate(-50%, -50%) scale(1)' },
        { transform: 'translate(-50%, -50%) scale(0.5)' }
      ], {
        duration: animationDuration,
      });
    };

    const intervalId = setInterval(startAnimation, animationDuration);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <img
      ref={alienRef}
      src="/alien_navbar.png"
      alt="Alien"
      className="fixed"
    />
  );
}