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

export const FEATURES = [
  {
    icon: CheckCircle2,
    title: "Technology With Purpose",
    description:
      "Applications, AI and automation built around real requirements.",
  },
  {
    icon: Zap,
    title: "Growth With Direction",
    description:
      "Digital marketing focused on visibility, relevance and meaningful business goals.",
  },
  {
    icon: Layers,
    title: "Creative Thinking",
    description:
      "Content and visuals shaped around your brand, product and audience.",
  },
  {
    icon: Users,
    title: "A Practical Approach",
    description:
      "Clear communication, considered decisions and a focus on getting the work done.",
  },
];

export default function WhyUs() {
  return (
    <section className="why-us-section" id="why-partner-with-us">
      <div className="why-us-container">
        <h2 className="why-us-title">
          One Partner. Three Ways to Move Forward.
        </h2>
        <p className="why-us-subtitle">
          Creative production, digital marketing and development, working together under one roof.
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
