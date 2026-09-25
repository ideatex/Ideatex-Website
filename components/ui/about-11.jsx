"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NoiseButton } from "./NoiseButton";
import "./about-11.css";

export const defaultChapters = [
  {
    number: "01",
    phase: "Direct Senior Engineering",
    title: "Direct Collaboration with Technical Leads",
    description:
      "You partner directly with lead software engineers and architects who design, build, and deploy your codebase. We eliminate sales intermediaries, account managers, and junior developer handoffs.",
  },
  {
    number: "02",
    phase: "Two-Week Sprint Cadence",
    title: "Rapid Iterative Sprint Delivery",
    description:
      "Projects move in predictable 2-week agile sprints. Every cycle delivers live staging deployments and interactive walkthroughs so you can test features on real devices.",
  },
  {
    number: "03",
    phase: "100% IP & Asset Control",
    title: "Complete Code & Infrastructure Ownership",
    description:
      "You retain full commercial IP rights, GitHub repository access, Figma design tokens, and cloud infrastructure configurations from day one. Zero vendor lock-in.",
  },
  {
    number: "04",
    phase: "Production-Grade Standards",
    title: "Enterprise Architecture & Scalability",
    description:
      "Codebases are built with strict TypeScript type safety, modular component systems, automated test suites, and robust CI/CD deployment pipelines engineered for long-term reliability.",
  },
];

export function About11({
  title = "Engineering built on clarity, speed, and complete ownership.",
  narrative = "We eliminated the traditional bloated agency model. You partner directly with senior practitioners who design, architect, and deploy your software.",
  chapters = defaultChapters,
  ctaText = "Start a Conversation",
  ctaHref = "/contact",
  className = "",
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 70%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <section className={`about11-section ${className}`} id="why-partner-with-us" ref={containerRef}>
      <div className="container">
        <div className="about11-grid">
          {/* Left Column: Sticky Narrative */}
          <div className="about11-sticky-col">
            <h2 className="about11-title">
              Engineering built on <span className="accent-gradient">clarity</span>, speed, and complete ownership.
            </h2>

            <p className="about11-narrative">{narrative}</p>

            <div style={{ marginTop: "12px" }}>
              <NoiseButton href={ctaHref} icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
                {ctaText}
              </NoiseButton>
            </div>
          </div>

          {/* Right Column: Drawn Timeline Rail with Varied Milestone Chapters */}
          <div className="about11-timeline-col">
            {/* Drawn Timeline Rail */}
            <div className="about11-rail-wrapper">
              <div className="about11-rail-track" />
              <motion.div
                className="about11-rail-fill"
                style={{ scaleY, transformOrigin: "top" }}
              />
            </div>

            {/* Milestone Chapters List */}
            <div className="about11-chapters-list">
              {chapters.map((chapter, idx) => (
                <div key={idx} className="about11-chapter">
                  {/* Timeline Node */}
                  <div className="about11-node">
                    <span className="about11-node-dot" />
                  </div>

                  {/* Chapter Card */}
                  <div className="about11-chapter-card">
                    <div className="about11-chapter-header">
                      <span className="about11-chapter-number">{chapter.number}</span>
                      <span className="about11-chapter-divider">•</span>
                      <span className="about11-chapter-phase">{chapter.phase}</span>
                    </div>

                    <h3 className="about11-chapter-title">{chapter.title}</h3>
                    <p className="about11-chapter-desc">{chapter.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About11;
