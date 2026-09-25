"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import "./glowing-effect.css";

export const GlowingEffect = memo(function GlowingEffect({
  blur = 0,
  inactiveZone = 0.01,
  proximity = 64,
  spread = 40,
  variant = "default",
  glow = true,
  className = "",
  disabled = false,
  movementDuration = 2,
  borderWidth = 1.5,
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      if (disabled || !containerRef.current) return;
      const element = containerRef.current.parentElement || containerRef.current;
      const rect = element.getBoundingClientRect();

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check proximity bounding box
      const isNear =
        mouseX >= rect.left - proximity &&
        mouseX <= rect.right + proximity &&
        mouseY >= rect.top - proximity &&
        mouseY <= rect.bottom + proximity;

      if (!isNear && !glow) {
        setIsHovered(false);
        return;
      }

      setIsHovered(true);

      // Relative coordinates within the element
      const x = mouseX - rect.left;
      const y = mouseY - rect.top;

      // Inactive zone check
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      const maxRadius = Math.max(rect.width, rect.height) / 2;

      if (inactiveZone > 0 && distFromCenter < maxRadius * inactiveZone && !glow) {
        setIsHovered(false);
        return;
      }

      // Calculate angle from center for perimeter glow
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 180;

      containerRef.current.style.setProperty("--glow-x", `${x}px`);
      containerRef.current.style.setProperty("--glow-y", `${y}px`);
      containerRef.current.style.setProperty("--glow-angle", `${angle}deg`);
      containerRef.current.style.setProperty("--glow-spread", `${spread * 5}px`);
      containerRef.current.style.setProperty("--glow-border-width", `${borderWidth}px`);
    },
    [disabled, proximity, inactiveZone, glow, spread, borderWidth]
  );

  useEffect(() => {
    if (disabled) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, disabled]);

  if (disabled) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`glowing-effect-container ${variant} ${glow ? "glow-active" : ""} ${
        isHovered ? "is-hovered" : ""
      } ${className}`}
      style={{
        "--glow-blur": `${blur}px`,
        "--glow-border-width": `${borderWidth}px`,
        "--glow-transition-duration": `${movementDuration}s`,
      }}
    >
      <div className="glowing-effect-border" />
      <div className="glowing-effect-glow" />
    </div>
  );
});

GlowingEffect.displayName = "GlowingEffect";
export default GlowingEffect;
