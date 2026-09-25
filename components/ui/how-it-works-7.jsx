"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading/SectionHeading";
import "./how-it-works-7.css";

export const defaultSteps = [
  {
    number: "01",
    title: "Discover",
    subtitle: "Requirement & Goals",
    description: "Understand the business requirement, user needs, and project scope.",
  },
  {
    number: "02",
    title: "Define",
    subtitle: "Architecture & UX",
    description: "Plan the product scope, architecture, and technical approach.",
  },
  {
    number: "03",
    title: "Build",
    subtitle: "Engineering & QA",
    description: "Design the interface, write clean code, and test thoroughly.",
  },
  {
    number: "04",
    title: "Launch",
    subtitle: "Deployment & Iteration",
    description: "Deploy to production, monitor stability, and iterate based on data.",
  },
];

export function HowItWorks7({
  steps = defaultSteps,
  title = "How We Work",
  subtitle = "A straightforward, milestone-driven process from discovery to production launch.",
  sectionLabel = "Process",
  className = "",
}) {
  return (
    <section className={`hiw-flow-section section ${className}`}>
      <div className="container">
        {/* Section Heading */}
        <SectionHeading>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="section-title">{title}</h2>
              {subtitle && (
                <p
                  style={{
                    color: "var(--text-body)",
                    marginTop: "8px",
                    fontSize: "1.05rem",
                    maxWidth: "600px",
                    lineHeight: "1.6",
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </SectionHeading>

        {/* Clean Linear Milestone Timeline (No Clunky Box Grids) */}
        <div className="hiw-timeline-track">
          <div className="hiw-timeline-line" />
          <div className="hiw-timeline-steps">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number || idx}
                className="hiw-timeline-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
              >
                {/* Node indicator */}
                <div className="hiw-timeline-node">
                  <div className="hiw-timeline-dot" />
                </div>

                {/* Content */}
                <div className="hiw-timeline-content">
                  <h3 className="hiw-timeline-title">{step.title}</h3>
                  <p className="hiw-timeline-desc">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks7;
