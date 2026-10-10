"use client";

import React from 'react';
import './FAQAccordion.css';
import { FaqAccordion, defaultFaqData } from '../ui/faq-accordion';
import SectionHeading from '../SectionHeading/SectionHeading';
import { useCMSData } from '../../lib/cms-client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FAQAccordion({ 
  faqs, 
  title, 
  subtitle,
  layout = 'stacked',
  className = ""
}) {
  const cms = useCMSData();

  const dynamicFaqs = (cms.faqs && cms.faqs.length > 0)
    ? cms.faqs.map((f, idx) => ({
        id: f.id || idx + 1,
        question: f.question,
        answer: f.answer,
      }))
    : defaultFaqData;

  const activeFaqs = faqs || dynamicFaqs;
  const faqSection = (cms.sections || []).find((s) => s.sectionKey === 'faqs');

  const activeTitle = title || faqSection?.heading || "Questions before we start?";
  const activeSubtitle = subtitle !== undefined ? subtitle : (faqSection?.description || "A few things clients usually ask us before kicking off a project.");

  if (layout === 'split') {
    return (
      <section className={`faq-section section faq-split ${className}`}>
        <div className="container faq-split-grid">
          <div className="faq-split-copy">
            <h2 className="section-title">{activeTitle}</h2>
            {activeSubtitle && <p className="faq-split-lead">{activeSubtitle}</p>}
            <Link href="/contact" className="faq-split-link">
              <span>Still curious? Talk to us</span>
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
          <div className="faq-accordion-wrapper">
            <FaqAccordion data={activeFaqs} />
          </div>
        </div>
      </section>
    );
  }

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
          <FaqAccordion data={activeFaqs} />
        </div>
      </div>
    </section>
  );
}

export { FaqAccordion, defaultFaqData };
