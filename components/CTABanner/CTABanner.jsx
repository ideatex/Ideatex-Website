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

  const activeTitle = title || ctaSec?.heading || "Have Something Worth Building?";
  const activeSubtitle = subtitle || ctaSec?.description || "Tell us what you're planning, what needs improving or what you'd like to create. Let's discuss the right way forward.";
  const activePrimaryText = primaryBtnText || ctaSec?.ctaLabel || "Start a Conversation";
  const activePrimaryHref = primaryBtnHref || ctaSec?.ctaUrl || "/contact";
  const activeSecondaryText = secondaryBtnText || "View Our Work";
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
