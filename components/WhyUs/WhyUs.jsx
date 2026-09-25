"use client";

import React from "react";
import {
  Users,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Layers,
  LifeBuoy,
} from "lucide-react";
import "./WhyUs.css";

const FEATURES = [
  {
    icon: Users,
    title: "Direct Senior Collaboration",
    description:
      "Partner directly with lead engineers and architects who design, build, and deploy your codebase — zero sales middlemen.",
  },
  {
    icon: Zap,
    title: "Rapid Bi-Weekly Sprints",
    description:
      "Projects move in predictable 2-week agile sprints with live staging deployments and interactive walkthroughs.",
  },
  {
    icon: ShieldCheck,
    title: "100% Code & IP Ownership",
    description:
      "Complete commercial IP rights, GitHub repository access, Figma design tokens, and cloud configs from day one.",
  },
  {
    icon: CheckCircle2,
    title: "Production-Grade Standards",
    description:
      "Strict TypeScript safety, modular component systems, automated tests, and robust CI/CD deployment pipelines.",
  },
  {
    icon: Layers,
    title: "Modern Scalable Architecture",
    description:
      "Modern web and mobile architectures built on Next.js, React, Node.js, and cloud platforms with zero legacy debt.",
  },
  {
    icon: LifeBuoy,
    title: "Full Lifecycle Support",
    description:
      "From technical discovery and UX design to production launch, uptime monitoring, security, and continuous evolution.",
  },
];

export default function WhyUs() {
  return (
    <section className="why-us-section" id="why-partner-with-us">
      <div className="why-us-container">
        <h2 className="why-us-title">
          Why Partner With Us
        </h2>
        <p className="why-us-subtitle">
          Engineering impact without overhead — architecting, building, and deploying mission-critical software and AI systems.
        </p>

        <div className="why-us-grid">
          <div className="why-us-glow" aria-hidden="true" />

          {FEATURES.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="why-us-item">
                <div className="why-us-icon size-10 p-2 rounded">
                  <IconComponent
                    size={20}
                    strokeWidth={1.75}
                    className="text-accent"
                    aria-hidden="true"
                  />
                </div>
                <div className="why-us-item-content mt-5 space-y-2">
                  <h3 className="why-us-item-title text-base font-medium text-slate-600">
                    {feature.title}
                  </h3>
                  <p className="why-us-item-desc text-sm text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
