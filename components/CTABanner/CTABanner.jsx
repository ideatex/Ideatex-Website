"use client";

import React from 'react';
import './CTABanner.css';
import { CTA4 } from '../ui/cta-4';
import { useCMSData } from '../../lib/cms-client';

export default function CTABanner({
  title,
  subtitle,
  badgeText = "LET'S TALK",
  primaryBtnText,
  primaryBtnHref,
  secondaryBtnText,
  secondaryBtnHref,
}) {
  const cms = useCMSData();
  const ctaSec = (cms.sections || []).find((s) => s.sectionKey === 'cta');

  const activeTitle = title || ctaSec?.heading || "Let's build something useful.";
  const activeSubtitle = subtitle || ctaSec?.description || "Have an idea, a workflow that needs fixing, or a product you've been meaning to build? Tell us about it.";
  const activePrimaryText = primaryBtnText || ctaSec?.ctaLabel || "Start a Project";
  const activePrimaryHref = primaryBtnHref || ctaSec?.ctaUrl || "/contact";
  const activeSecondaryText = secondaryBtnText || "See Our Work";
  const activeSecondaryHref = secondaryBtnHref || "/portfolio";

  return (
    <CTA4
      title={activeTitle}
      subtitle={activeSubtitle}
      badgeText={badgeText}
      primaryBtnText={activePrimaryText}
      primaryBtnHref={activePrimaryHref}
      secondaryBtnText={activeSecondaryText}
      secondaryBtnHref={activeSecondaryHref}
    />
  );
}

export { CTA4 };
