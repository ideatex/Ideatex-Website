"use client";

import React from 'react';
import './FAQAccordion.css';
import { FaqAccordion, defaultFaqData } from '../ui/faq-accordion';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useCMSData } from '../../lib/cms-client';
import { Bot, Sparkles, GitBranch, Workflow, Cpu, MessageSquare } from 'lucide-react';

const defaultIcons = [Bot, Sparkles, GitBranch, Workflow, Cpu, MessageSquare];

export default function FAQAccordion({ 
  faqs, 
  title, 
  subtitle,
  sectionLabel,
  timestamp = "Every day, 9:01 AM",
  className = ""
}) {
  const cms = useCMSData();

  const dynamicFaqs = (cms.faqs && cms.faqs.length > 0)
    ? cms.faqs.map((f, idx) => ({
        id: f.id || idx + 1,
        question: f.question,
        answer: f.answer,
        icon: defaultIcons[idx % defaultIcons.length],
      }))
    : defaultFaqData;

  const activeFaqs = faqs || dynamicFaqs;
  const faqSection = (cms.sections || []).find((s) => s.sectionKey === 'faqs');

  const activeTitle = title || faqSection?.heading || "Questions before we start?";
  const activeSubtitle = subtitle !== undefined ? subtitle : (faqSection?.description || "A few things clients usually ask us before kicking off a project.");
  const activeSectionLabel = sectionLabel || "FAQ";

  return (
    <section className={`faq-section section ${className}`}>
      <div className="container">
        {/* Centered Section Heading */}
        <div className="faq-header-centered">
          <SectionHeading align="center">
            <h2 className="section-title text-center">{activeTitle}</h2>
            {activeSubtitle && (
              <p className="section-subtitle text-center">
                {activeSubtitle}
              </p>
            )}
          </SectionHeading>
        </div>

        {/* Centered FaqAccordion Component with Zig-Zag layout */}
        <div className="faq-accordion-wrapper">
          <FaqAccordion 
            data={activeFaqs}
            timestamp={timestamp}
          />
        </div>
      </div>
    </section>
  );
}

export { FaqAccordion, defaultFaqData };
