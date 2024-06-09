import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

export const Stars = ({ visible }) => {

    const [opacity, setOpacity] = useState(0);
    const colors = ["yellow", "lightgreen", "white"];
    const starPaths = [
        "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
        "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9.27L8.91 8.26L12 2z",
        "M12 2L14.09 8.26L20 9.27L15 14.14L16.18 21L12 17.77L7.82 21L9 14.14L4 9.27L9.91 8.26L12 2z"
    ];
  
    useEffect(() => {
      if (visible) {
        setOpacity(1);
        setTimeout(() => setOpacity(0), 1000);
      }
    }, [visible]);
  
    const generateSpringProps = () => {
      const scale = Math.random() * 1.5 + 0.5;
      const rotate = Math.random() * 360;
      return useSpring({
        from: { opacity: 0, transform: 'scale(0) rotate(0deg)' },
        to: { opacity, transform: `scale(${scale}) rotate(${rotate}deg)` },
        config: { tension: 200, friction: 10 },
        reset: true,
      });
    };
  
    const stars = Array.from({ length: 15 }, (_, i) => {

      const top = Math.random() * 150;
      const left = Math.random() * 150;
      const size = Math.random() * 0.75 + 0.25 + 'rem';
      const props = generateSpringProps();
      const color = colors[Math.floor(Math.random() * colors.length)];
      const path = starPaths[Math.floor(Math.random() * starPaths.length)];
  
      return (
        <animated.div
          key={i}
          style={{
            ...props,
            position: 'absolute',
            top: `${top}%`,
            left: `${left}%`,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={color}
            width={size}
            height={size}
          >
            <path d={path} />
          </svg>
        </animated.div>
      );
    });
  
    return <>{stars}</>;
};