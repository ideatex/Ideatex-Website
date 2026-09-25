"use client";

import { useRef, forwardRef } from 'react';
import { GlowingEffect } from '../ui/glowing-effect';
import './SpotlightCard.css';

const SpotlightCard = forwardRef(({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(0, 141, 228, 0.18)', 
  glow = true,
  spread = 40,
  proximity = 64,
  inactiveZone = 0.01,
  borderWidth = 1.5,
  ...props 
}, externalRef) => {
  const internalRef = useRef(null);
  const divRef = externalRef || internalRef;

  const handleMouseMove = e => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} className={`card-spotlight ${className}`} {...props}>
      <GlowingEffect
        spread={spread}
        glow={glow}
        disabled={false}
        proximity={proximity}
        inactiveZone={inactiveZone}
        borderWidth={borderWidth}
      />
      {children}
    </div>
  );
});

SpotlightCard.displayName = 'SpotlightCard';

export default SpotlightCard;

