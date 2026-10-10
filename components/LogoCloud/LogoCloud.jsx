"use client";

import React from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { TechIcon } from "../TechIcon/TechIcon";

const techItems = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "GraphQL",
  "Docker",
  "TailwindCSS",
  "Three.js",
  "Redis",
  "WebGL",
  "Figma",
  "FastAPI",
];

export default function LogoCloud({
  title = "Tools and Technologies We Use",
  subtitle = "Engineered with modern, reliable, and industry-standard technologies.",
}) {
  const ref = useScrollReveal();

  return (
    <section className="logo-cloud" ref={ref}>
      <div className="container" style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 800,
            color: "var(--text-white)",
            letterSpacing: "-0.02em",
            margin: "0 0 10px 0",
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-body)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="logo-cloud-track-wrapper reveal">
        <div className="logo-cloud-fade logo-cloud-fade--left" />
        <div className="logo-cloud-fade logo-cloud-fade--right" />
        <div className="logo-cloud-track">
          {[...techItems, ...techItems, ...techItems].map((name, i) => (
            <div key={i} className="logo-cloud-item">
              <TechIcon name={name} size={26} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
