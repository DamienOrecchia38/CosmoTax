'use client';

import { useEffect, useRef } from 'react';

export default function AlienAnimation() {
  const alienRef = useRef(null);

  useEffect(() => {
    const alien = alienRef.current;
    const animationDuration = 5000; // Durée de l'animation en millisecondes
    
    const startAnimation = () => {
      const alienBottom = Math.random() * window.innerWidth;
      alien.style.left = `${alienBottom}px`;
      alien.style.bottom = '-100px';
      
      alien.animate([
        { bottom: '-100px' },
        { bottom: `${window.innerHeight / 2}px` },
        { bottom: '-100px' }
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
      className="fixed w-50 h-50"
    />
  );
}