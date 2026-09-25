"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { NoiseButton } from "@/components/ui/NoiseButton";
import { cn } from "../../lib/utils";
import "./about-bento.css";

const metrics = [
  {
    value: "99.99%",
    label: "Production SLA & Uptime",
    desc: "Zero single points of failure with enterprise reliability and observability.",
  },
  {
    value: "450%",
    label: "Average Velocity Gain",
    desc: "Rapid milestone delivery with bi-weekly deployments and continuous staging.",
  },
  {
    value: "50+",
    label: "Platforms Engineered",
    desc: "High-impact web applications, SaaS backends, and AI agent systems.",
  },
  {
    value: "100%",
    label: "Code & IP Ownership",
    desc: "Complete asset, source code, and intellectual property ownership from day one.",
  },
];

export function AboutBento({
  title = "Engineering Impact Without Overhead.",
  subtitle = "We partner directly with visionary founders and enterprise teams to architect, build, and deploy mission-critical software and AI systems.",
  className = "",
}) {
  return (
    <section className={cn("about-editorial-section", className)} id="why-partner-with-us">
      <div className="about-editorial-container">
        <div className="about-editorial-grid">
          {/* Left Column: Direct Narrative */}
          <div className="about-editorial-main">
            <h2 className="about-editorial-title">
              {title}
            </h2>
            
            <p className="about-editorial-subtitle">
              {subtitle}
            </p>

            <ul className="about-editorial-checklist">
              {[
                "Direct collaboration with senior architects — zero middle management",
                "Scalable modern tech stack without legacy technical debt",
                "Fixed sprint milestones with transparent code repositories",
              ].map((item, idx) => (
                <li key={idx} className="about-editorial-check-item">
                  <CheckCircle2 size={18} strokeWidth={1.75} aria-hidden="true" className="text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "32px" }}>
              <NoiseButton href="/contact" icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
                Start Your Milestone
              </NoiseButton>
            </div>
          </div>

          {/* Right Column: Unified Metric Flow */}
          <div className="about-editorial-stats">
            {metrics.map((metric, idx) => (
              <div key={idx} className="about-editorial-stat-row">
                <div className="about-editorial-stat-num">
                  {metric.value}
                </div>
                <div className="about-editorial-stat-info">
                  <h4 className="about-editorial-stat-label">{metric.label}</h4>
                  <p className="about-editorial-stat-desc">{metric.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutBento;
