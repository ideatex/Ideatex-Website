"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { NoiseButton } from "./NoiseButton";
import { IMAGES } from "../../constants/images";
import Link from "next/link";

const marqueeImagesRow1 = [
  IMAGES.portfolio[0],
  IMAGES.portfolio[1],
  IMAGES.portfolio[2],
  IMAGES.portfolio[3],
  IMAGES.portfolio[4],
  IMAGES.portfolio[5],
];

const marqueeImagesRow2 = [
  IMAGES.portfolio[6],
  IMAGES.portfolio[7],
  IMAGES.portfolio[8],
  IMAGES.portfolio[9],
  IMAGES.portfolio[10],
  IMAGES.portfolio[11],
];

export function CTA4({
  badgeText = "LET'S TALK",
  title = "Let's build something useful.",
  subtitle = "Have an idea, a workflow that needs fixing, or a product you've been meaning to build? Tell us about it.",
  primaryBtnText = "Start a Project",
  primaryBtnHref = "/contact",
  secondaryBtnText = "See Our Work",
  secondaryBtnHref = "/portfolio",
  className = "",
}) {
  return (
    <section className={`cta-4-section relative overflow-hidden py-24 ${className}`}>
      {/* Background Scrolling Images (Pure imagery, no text overlay, clearly visible) */}
      <div className="cta-4-bg-wrapper absolute inset-0 pointer-events-none">
        <div className="cta-4-marquee-row cta-4-marquee-left flex gap-6 mb-6">
          <div className="cta-4-track cta-4-track-left">
            {[...marqueeImagesRow1, ...marqueeImagesRow1, ...marqueeImagesRow1].map((imgSrc, i) => (
              <div key={i} className="cta-4-card">
                <img
                  src={imgSrc}
                  alt="Portfolio Showcase"
                  className="cta-4-card-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="cta-4-marquee-row cta-4-marquee-right flex gap-6">
          <div className="cta-4-track cta-4-track-right">
            {[...marqueeImagesRow2, ...marqueeImagesRow2, ...marqueeImagesRow2].map((imgSrc, i) => (
              <div key={i} className="cta-4-card">
                <img
                  src={imgSrc}
                  alt="Portfolio Showcase"
                  className="cta-4-card-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="cta-4-vignette-radial absolute inset-0" />
        <div className="cta-4-fade-top absolute top-0 left-0 right-0 h-32" />
        <div className="cta-4-fade-bottom absolute bottom-0 left-0 right-0 h-32" />
      </div>

      {/* Centered CTA Content Box */}
      <div className="container relative z-10">
        <div className="cta-4-glass-box mx-auto max-w-4xl text-center">
          <h2 className="cta-4-heading section-title mb-6">
            {title}
          </h2>

          <p className="cta-4-subtitle mx-auto mb-8">
            {subtitle}
          </p>

          <div className="cta-4-actions flex flex-wrap items-center justify-center gap-4">
            <NoiseButton
              href={primaryBtnHref}
              icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}
            >
              {primaryBtnText}
            </NoiseButton>

            {secondaryBtnHref && (
              <Link href={secondaryBtnHref} className="cta-4-secondary-btn">
                <span>{secondaryBtnText}</span>
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA4;
