"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../../components/PageHero/PageHero";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import CTABanner from "../../components/CTABanner/CTABanner";
import { CASE_STUDIES, CASE_STUDY_CATEGORIES } from "../../constants/caseStudiesData";
import { useCMSData } from "../../lib/cms-client";
import "../../components/CaseStudy/CaseStudy.css";

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const cms = useCMSData();
  const dynamicStudies = cms.caseStudies || [];
  const allStudies = dynamicStudies.length > 0
    ? dynamicStudies.map((s, idx) => ({
        slug: s.slug,
        number: s.number || `0${idx + 1}`,
        title: s.title,
        subtitle: s.subtitle,
        category: s.category || "Food & Logistics",
        image: s.image || (CASE_STUDIES[idx % CASE_STUDIES.length] || {}).image,
        tags: s.tags || (s.techStack ? s.techStack.map(t => t.name || t).slice(0, 5) : ["Next.js", "React"]),
      }))
    : CASE_STUDIES;

  const filteredStudies =
    selectedCategory === "All"
      ? allStudies
      : allStudies.filter((study) => study.category === selectedCategory);

  return (
    <main className="case-studies-page">
      <PageHero
        breadcrumb={[{ path: "/", label: "Home" }, { label: "Case Studies" }]}
        title={<>Behind the work. <span className="accent">Behind the results.</span></>}
        subtitle="Go beyond the finished product. See the challenges, decisions, and solutions behind the platforms we've built."
        backgroundImage="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920&h=1080&auto=format&q=80&fit=crop"
      />

      <section className="section">
        <div className="container">
          <SectionHeading>
            <h2 className="section-title">Selected Case Studies</h2>
          </SectionHeading>

          {/* Category filter tabs */}
          <div className="portfolio-filters" style={{ marginBottom: "var(--space-2xl)" }}>
            {CASE_STUDY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Clean Case Studies Grid */}
          <div className="case-studies-clean-grid">
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study, index) => (
                <motion.article
                  key={study.slug}
                  className="case-study-clean-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                >
                  {/* Image */}
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="case-study-card-img-link"
                    aria-label={study.title}
                  >
                    <div className="case-study-card-img-container">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="case-study-clean-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="case-study-card-body">
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {/* Project Index / Category */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span className="case-study-project-type">
                          {study.number ? `${study.number} — ` : ""}{study.category}
                        </span>
                        <Link
                          href={`/case-studies/${study.slug}`}
                          className="case-study-arrow-link"
                          aria-label={`View ${study.title}`}
                          style={{ color: "var(--accent)", display: "inline-flex", alignItems: "center" }}
                        >
                          <ArrowUpRight size={18} strokeWidth={2} />
                        </Link>
                      </div>

                      {/* Title */}
                      <Link
                        href={`/case-studies/${study.slug}`}
                        className="case-study-clean-title-link"
                      >
                        <h3 className="case-study-clean-title">
                          {study.title}
                        </h3>
                      </Link>

                      {/* Subtitle if present */}
                      {study.subtitle && (
                        <p style={{ fontSize: "0.875rem", color: "var(--text-body)", lineHeight: 1.5, margin: 0 }}>
                          {study.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Tech Stack / Highlights */}
                    <div className="case-study-clean-tech-stack">
                      {(study.tags || []).slice(0, 5).map((tag) => (
                        <span key={tag} className="case-study-clean-tech-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
