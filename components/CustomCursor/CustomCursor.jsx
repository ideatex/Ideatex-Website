"use client";

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (mouse)
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isVisible = false;
    let isMoving = false;
    let rafId = null;

    const render = () => {
      currentX += (mouseX - currentX) * 0.35;
      currentY += (mouseY - currentY) * 0.35;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
        rafId = requestAnimationFrame(render);
      } else {
        isMoving = false;
        rafId = null;
      }
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = '1';
      }

      if (!isMoving) {
        isMoving = true;
        rafId = requestAnimationFrame(render);
      }

      // Check hover state via target
      const target = e.target;
      if (target) {
        const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, .portfolio-card, .service-card, .interactive');
        if (isInteractive) {
          cursor.classList.add('hover');
        } else {
          cursor.classList.remove('hover');
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      cursor.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        willChange: 'transform',
        transition: 'opacity 0.2s ease, width 0.2s ease, height 0.2s ease',
      }}
    />
  );
}
