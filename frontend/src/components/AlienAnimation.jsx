'use client';

import { useEffect, useRef } from 'react';

export default function AlienAnimation() {
  const alienRef = useRef(null);

  useEffect(() => {
    const alien = alienRef.current;
    const animationDuration = 7000;
    
    const startAnimation = () => {
      alien.style.position = 'absolute';
      alien.style.left = '50%';
      alien.style.top = '50%';
      alien.style.transform = 'translate(-50%, -50%) scale(0.5)';
      
      alien.animate([
        { transform: 'translate(-50%, -50%) scale(0.5)' },
        { transform: 'translate(-50%, -50%) scale(0.8)' },
        { transform: 'translate(-50%, -50%) scale(0.5)' }
      ], {
        duration: animationDuration,
      });
    };

    startAnimation();

    const intervalId = setInterval(startAnimation, animationDuration);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <img
        ref={alienRef}
        src="/images/navbar/alien_navbar.png"
        alt="Alien"
        className="absolute"
      />
    </div>
  );
}