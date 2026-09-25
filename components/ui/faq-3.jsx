"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeading from "../SectionHeading/SectionHeading";

export const defaultFaqData = [
  {
    category: "Projects",
    question: "What type of projects do you work on?",
    answer: "We design and build custom web applications, mobile apps, SaaS platforms, internal business tools, AI agent workflows, and company websites."
  },
  {
    category: "Projects",
    question: "Can you work with an existing codebase or product?",
    answer: "Yes. We can audit, refactor, add features to, or take over maintenance of existing applications and design systems."
  },
  {
    category: "Services",
    question: "Do you handle both design and development?",
    answer: "Yes. We manage the entire lifecycle from early product definition and UI/UX design to frontend engineering, backend architecture, and deployment."
  },
  {
    category: "Services",
    question: "Can you build SaaS products from scratch?",
    answer: "Yes. We build subscription products including authentication, multi-tenancy, billing integrations, dashboards, and scalable database architectures."
  },
  {
    category: "Support",
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes. We offer hosting management, security updates, performance monitoring, and ongoing feature development after launch."
  },
  {
    category: "Engagement",
    question: "How do projects typically start?",
    answer: "We start with a short discovery conversation to review your goals and requirements, followed by a clear scope proposal with timeline and pricing."
  }
];

export function FAQ3({
  items = defaultFaqData,
  title = "Common Questions",
  subtitle = "Clear answers about how we work and what we build.",
  sectionLabel = "FAQ",
  categories = ["All", "Projects", "Services", "Support", "Engagement"],
  className = "",
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState(0);

  const filteredItems = activeCategory === "All" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`faq-3-section section ${className}`}>
      <div className="container">
        {/* Section Heading */}
        <SectionHeading label={sectionLabel}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="section-title">{title}</h2>
              {subtitle && <p className="section-subtitle max-w-2xl text-muted" style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '1rem', lineHeight: '1.6' }}>{subtitle}</p>}
            </div>
          </div>
        </SectionHeading>

        {/* Category Tabs */}
        <div className="faq-3-tabs-wrapper">
          <div className="faq-3-tabs">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(0);
                  }}
                  className={`faq-3-tab-btn ${isActive ? "active" : ""}`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="faq3ActiveTab"
                      className="faq-3-tab-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Accordion Items */}
        <motion.div 
          layout 
          className="faq-3-accordion-list"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="faq-3-items-grid"
            >
              {filteredItems.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const formattedNum = String(idx + 1).padStart(2, "0");

                return (
                  <motion.div
                    key={faq.question}
                    layout
                    className={`faq-3-card ${isOpen ? "open" : ""}`}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="faq-3-question-btn"
                      aria-expanded={isOpen}
                    >
                      <div className="faq-3-question-content">
                        <span className="faq-3-num">[{formattedNum}]</span>
                        <div className="faq-3-text-group">
                          <span className="faq-3-category-badge">{faq.category}</span>
                          <h3 className="faq-3-question-title">{faq.question}</h3>
                        </div>
                      </div>

                      <div className={`faq-3-icon-badge ${isOpen ? "open" : ""}`}>
                        {isOpen ? (
                          <Minus size={18} strokeWidth={1.75} aria-hidden="true" />
                        ) : (
                          <Plus size={18} strokeWidth={1.75} aria-hidden="true" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="faq-3-answer-wrapper"
                        >
                          <div className="faq-3-answer-inner">
                            <p className="faq-3-answer-text">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ3;
