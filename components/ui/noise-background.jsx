"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export function NoiseBackground({
  children,
  className = "",
  containerClassName = "",
  gradientColors = [
    "rgb(255, 87, 51)",
    "rgb(251, 176, 64)",
    "rgb(0, 141, 228)",
  ],
  noiseIntensity = 0.2,
  speed = 0.1,
  animating = true,
  backdropBlur = false,
  style = {},
}) {
  // SVG Noise Data URI
  const noiseSvg = useMemo(() => {
    const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noiseFilter)"/></svg>`;
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  }, []);

  const color1 = gradientColors[0] || "rgb(255, 100, 150)";
  const color2 = gradientColors[1] || "rgb(100, 150, 255)";
  const color3 = gradientColors[2] || "rgb(255, 200, 100)";

  const duration = Math.max(4, 12 / (speed || 0.1));

  return (
    <div
      className={`relative overflow-hidden inline-flex items-center justify-center noise-bg-root ${containerClassName}`}
      style={{
        position: "relative",
        isolation: "isolate",
        ...style,
      }}
    >
      {/* Animated gradient layer */}
      <div
        className="absolute inset-0 pointer-events-none noise-gradient-layer"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          borderRadius: "inherit",
          background: `radial-gradient(circle at 50% 50%, ${color1} 0%, ${color2} 50%, ${color3} 100%)`,
        }}
      >
        {animating && (
          <>
            <motion.div
              className="noise-blob noise-blob-1"
              style={{
                position: "absolute",
                top: "-40%",
                left: "-30%",
                width: "160%",
                height: "160%",
                background: `radial-gradient(circle, ${color1} 0%, transparent 70%)`,
                filter: "blur(14px)",
                opacity: 0.85,
              }}
              animate={{
                x: ["-10%", "15%", "-5%", "-10%"],
                y: ["-5%", "15%", "-15%", "-5%"],
                scale: [1, 1.25, 0.95, 1],
                rotate: [0, 90, 180, 360],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="noise-blob noise-blob-2"
              style={{
                position: "absolute",
                bottom: "-40%",
                right: "-30%",
                width: "160%",
                height: "160%",
                background: `radial-gradient(circle, ${color2} 0%, transparent 70%)`,
                filter: "blur(14px)",
                opacity: 0.85,
              }}
              animate={{
                x: ["10%", "-15%", "5%", "10%"],
                y: ["10%", "-10%", "15%", "10%"],
                scale: [1.1, 0.9, 1.2, 1.1],
                rotate: [360, 270, 90, 0],
              }}
              transition={{
                duration: duration * 1.2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="noise-blob noise-blob-3"
              style={{
                position: "absolute",
                top: "10%",
                right: "-20%",
                width: "130%",
                height: "130%",
                background: `radial-gradient(circle, ${color3} 0%, transparent 70%)`,
                filter: "blur(12px)",
                opacity: 0.75,
              }}
              animate={{
                x: ["-15%", "10%", "-10%", "-15%"],
                y: ["15%", "-15%", "5%", "15%"],
                scale: [0.95, 1.15, 1, 0.95],
              }}
              transition={{
                duration: duration * 0.9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </div>

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none noise-texture-layer"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage: noiseSvg,
          backgroundRepeat: "repeat",
          opacity: noiseIntensity,
          mixBlendMode: "overlay",
          borderRadius: "inherit",
        }}
      />

      {/* Optional Backdrop Blur */}
      {backdropBlur && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "inherit",
          }}
        />
      )}

      {/* Content wrapper */}
      <div
        className={`relative z-10 noise-content ${className}`}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function NoiseBackgroundDemo() {
  return (
    <div className="flex justify-center">
      <NoiseBackground
        containerClassName="w-fit p-2 rounded-full mx-auto"
        gradientColors={[
          "rgb(255, 100, 150)",
          "rgb(100, 150, 255)",
          "rgb(255, 200, 100)",
        ]}
      >
        <button className="h-full w-full cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)] noise-btn-inner">
          Start publishing &rarr;
        </button>
      </NoiseBackground>
    </div>
  );
}

export default NoiseBackground;
