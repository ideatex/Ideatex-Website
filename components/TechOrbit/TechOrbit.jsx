"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NoiseButton } from "../ui/NoiseButton";
import { TECH_ORBIT_ICONS } from "../../constants/techOrbitIcons";
import { BRAND_ICONS, brandColor } from "../TechIcon/brandIcons";
import "./TechOrbit.css";

const ORBIT_COUNT = 4;
const ORBIT_GAP = 8; // rem between orbits
const BASE_SIZE = 12; // rem, smallest orbit is BASE_SIZE + ORBIT_GAP

function BrandGlyph({ icon, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={brandColor(icon.hex)}
      role="img"
      aria-label={icon.title}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}

export default function TechOrbit({
  title = "Tools and Technologies We Use",
  subtitle = "Engineered with modern, reliable, and industry-standard technologies.",
}) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(true);

  // Pause the spinning while the section is off screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Share the logos between the orbits in proportion to each orbit's circumference
  const orbits = useMemo(() => {
    const sizes = Array.from({ length: ORBIT_COUNT }, (_, i) => BASE_SIZE + ORBIT_GAP * (i + 1));
    const total = sizes.reduce((a, b) => a + b, 0);
    let start = 0;
    return sizes.map((size, i) => {
      const count =
        i === ORBIT_COUNT - 1
          ? TECH_ORBIT_ICONS.length - start
          : Math.round((size / total) * TECH_ORBIT_ICONS.length);
      const icons = TECH_ORBIT_ICONS.slice(start, start + count);
      start += count;
      return { size, icons };
    });
  }, []);

  const center = BRAND_ICONS["react"];

  return (
    <section ref={sectionRef} className="tech-orbit" aria-label={title}>
      <div className="container tech-orbit-inner">
        {/* Left side: Heading and Text */}
        <div className="tech-orbit-copy">
          <h2 className="tech-orbit-title">{title}</h2>
          <p className="tech-orbit-text">{subtitle}</p>
          <div className="tech-orbit-actions">
            <NoiseButton href="/contact" icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
              Start a Project
            </NoiseButton>
            <Link href="/services" className="tech-orbit-link">
              Explore Services
            </Link>
          </div>
        </div>

      </div>

      {/* Right side: orbit animation, cropped by the edge of the screen */}
      <div className="tech-orbit-stage" aria-hidden="true">
          <div className="tech-orbit-disc">
            {/* Center circle */}
            <div className="tech-orbit-center">{center && <BrandGlyph icon={center} className="tech-orbit-center-icon" />}</div>

            {/* Orbits */}
            {orbits.map(({ size, icons }, orbitIdx) => {
              const angleStep = (2 * Math.PI) / icons.length;
              return (
                <div
                  key={orbitIdx}
                  className="tech-orbit-ring"
                  style={{
                    width: `${size}rem`,
                    height: `${size}rem`,
                    animationDuration: `${12 + orbitIdx * 6}s`,
                    animationPlayState: inView ? "running" : "paused",
                  }}
                >
                  {icons.map((icon, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    // Rounded so server and browser produce identical markup
                    const x = (50 + 50 * Math.cos(angle)).toFixed(3);
                    const y = (50 + 50 * Math.sin(angle)).toFixed(3);
                    return (
                      <div key={icon.title} className="tech-orbit-icon" style={{ left: `${x}%`, top: `${y}%` }}>
                        <BrandGlyph icon={icon} className="tech-orbit-glyph" />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
      </div>
    </section>
  );
}
