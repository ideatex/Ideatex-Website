import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Sparkles,
  Layers,
} from "lucide-react";
import PageHero from "../../../components/PageHero/PageHero";
import SectionHeading from "../../../components/SectionHeading/SectionHeading";
import CTABanner from "../../../components/CTABanner/CTABanner";
import { NoiseButton } from "../../../components/ui/NoiseButton";
import {
  CASE_STUDIES,
  getCaseStudyBySlug,
  getAllCaseStudySlugs,
} from "../../../constants/caseStudiesData";
import {
  getServerCaseStudyBySlug,
  getServerCaseStudies,
} from "../../../lib/cms-server";
import "../../../components/CaseStudy/CaseStudy.css";

export async function generateStaticParams() {
  const cmsStudies = getServerCaseStudies();
  if (cmsStudies && cmsStudies.length > 0) {
    const list = [];
    cmsStudies.forEach((s) => {
      list.push({ slug: s.slug });
      if (s.aliases) {
        s.aliases.forEach((alias) => list.push({ slug: alias }));
      }
    });
    return list;
  }
  return getAllCaseStudySlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cmsStudy = getServerCaseStudyBySlug(slug);
  const study = cmsStudy || getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found — Ideate X",
    };
  }

  return {
    title: `${study.title} — Ideate X Case Study`,
    description: study.subtitle || study.summary,
  };
}

export default async function CaseStudyDetailPage({ params }) {
  const { slug } = await params;
  const cmsStudy = getServerCaseStudyBySlug(slug);
  const study = cmsStudy || getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const allStudies = getServerCaseStudies().length > 0 ? getServerCaseStudies() : CASE_STUDIES;

  // Determine Next Case Study for navigation loop
  const currentIndex = allStudies.findIndex((s) => s.slug === study.slug || (s.aliases && s.aliases.includes(study.slug)));
  const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % allStudies.length : 0;
  const nextStudy = allStudies[nextIndex];

  return (
    <main className="case-detail-page">
      <PageHero
        breadcrumb={[
          { path: "/", label: "Home" },
          { path: "/case-studies", label: "Case Studies" },
          { label: study.client },
        ]}
        title={<>{study.title}</>}
        subtitle={study.subtitle}
        backgroundImage={study.coverBanner || study.image}
        widget={
          <div className="hero-widget-glass" style={{ minWidth: "260px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Client Partnership</span>
              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>{study.client}</span>
            </div>
            <div style={{ paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-body)" }}>
              <span>Duration: {study.duration}</span>
              <span>Year: {study.year}</span>
            </div>
          </div>
        }
      />

      <section className="section" style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          {/* Back Navigation Bar */}
          <div style={{ marginBottom: "var(--space-xl)" }}>
            <Link
              href="/case-studies"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.2s ease",
              }}
            >
              <ArrowLeft size={14} strokeWidth={1.75} aria-hidden="true" />
              <span>Back to All Case Studies</span>
            </Link>
          </div>

          <div className="case-detail-layout">
            {/* ─── LEFT COLUMN: In-Depth Case Study Narrative ─── */}
            <article className="case-detail-article">
              {/* Overview Summary */}
              <div className="case-detail-section">
                <SectionHeading>
                  <h2 className="case-detail-section-title">Overview</h2>
                </SectionHeading>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {study.summary.split("\n\n").map((para, i) => (
                    <p key={i} className="case-detail-paragraph">{para}</p>
                  ))}
                </div>
              </div>

              {/* The Challenge */}
              <div className="case-detail-section">
                <SectionHeading>
                  <h2 className="case-detail-section-title">The Challenge</h2>
                </SectionHeading>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {study.challenge.split("\n\n").map((para, i) => (
                    <p key={i} className="case-detail-paragraph">{para}</p>
                  ))}
                </div>

                {study.challengePoints && study.challengePoints.length > 0 && (
                  <ul className="case-detail-points-list">
                    {study.challengePoints.map((point, idx) => (
                      <li key={idx} className="case-detail-point-item">
                        <span className="case-detail-point-badge">Issue {idx + 1}</span>
                        <span className="case-detail-point-text">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Visual Showcase Card / Cover */}
              <div
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
                  background: "#0a0e18",
                }}
              >
                <img
                  src={study.image}
                  alt={study.title}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>

              {/* What We Built / Delivered Features */}
              {study.keyFeatures && study.keyFeatures.length > 0 && (
                <div className="case-detail-section">
                  <SectionHeading>
                    <h2 className="case-detail-section-title">What We Built</h2>
                  </SectionHeading>

                  <div className="case-detail-features-list">
                    {study.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="case-detail-feature-item">
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "10px",
                            background: "rgba(0, 141, 228, 0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--accent)",
                            flexShrink: 0,
                          }}
                        >
                          <Zap size={18} strokeWidth={1.75} aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="case-detail-feature-title">{feat.title}</h3>
                          <p className="case-detail-feature-desc">{feat.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* The Technical Architecture & Approach */}
              {study.approach && (
                <div className="case-detail-section">
                  <SectionHeading>
                    <h2 className="case-detail-section-title">Architecture & Approach</h2>
                  </SectionHeading>
                  <p className="case-detail-paragraph">{study.approach}</p>

                  {study.architecturePoints && study.architecturePoints.length > 0 && (
                    <ul className="case-detail-points-list">
                      {study.architecturePoints.map((point, idx) => (
                        <li key={idx} className="case-detail-point-item">
                          <CheckCircle2 size={18} strokeWidth={1.75} aria-hidden="true" className="case-detail-point-icon" />
                          <span className="case-detail-point-text">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* The Outcome */}
              {study.outcome && (
                <div className="case-detail-section">
                  <SectionHeading>
                    <h2 className="case-detail-section-title">The Outcome</h2>
                  </SectionHeading>
                  <div
                    style={{
                      padding: "24px 28px",
                      borderRadius: "16px",
                      background: "radial-gradient(circle at 10% 10%, rgba(0, 141, 228, 0.08) 0%, transparent 70%), rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(0, 141, 228, 0.25)",
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                    }}
                  >
                    <Sparkles size={24} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
                    <p className="case-detail-paragraph" style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.92)", fontWeight: 500 }}>
                      {study.outcome}
                    </p>
                  </div>
                </div>
              )}

              {/* Measurable Outcomes / Impact Metrics */}
              {study.metrics && study.metrics.length > 0 && (
                <div className="case-detail-section">
                  <SectionHeading>
                    <h2 className="case-detail-section-title">Measurable Impact</h2>
                  </SectionHeading>

                  <div className="case-detail-metrics-strip">
                    {study.metrics.map((metric, idx) => (
                      <div key={idx} className="case-detail-metric-item">
                        <span className="case-detail-metric-value">{metric.value}</span>
                        <span className="case-detail-metric-label">{metric.label}</span>
                        <p className="case-detail-metric-desc">{metric.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Client Testimonial (if available) */}
              {study.testimonial && (
                <div className="case-detail-testimonial-card">
                  <p className="case-detail-quote">
                    &ldquo;{study.testimonial.quote}&rdquo;
                  </p>
                  <div className="case-detail-author-row">
                    {study.testimonial.avatar && (
                      <img
                        src={study.testimonial.avatar}
                        alt={study.testimonial.author}
                        className="case-detail-author-avatar"
                      />
                    )}
                    <div>
                      <h4 className="case-detail-author-name">{study.testimonial.author}</h4>
                      <p className="case-detail-author-role">{study.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* ─── RIGHT COLUMN: Sticky Project Specs Sidebar ─── */}
            <aside className="case-detail-sidebar">
              <div className="case-detail-meta-card">
                <div className="case-meta-list">
                  <div className="case-meta-item">
                    <span className="case-meta-label">Client</span>
                    <span className="case-meta-value">{study.client}</span>
                  </div>

                  <div className="case-meta-item">
                    <span className="case-meta-label">Discipline / Category</span>
                    <span className="case-meta-value">{study.category}</span>
                  </div>

                  <div className="case-meta-item">
                    <span className="case-meta-label">Ideate X Role</span>
                    <span className="case-meta-value">{study.role}</span>
                  </div>

                  <div className="case-meta-item">
                    <span className="case-meta-label">Project Duration</span>
                    <span className="case-meta-value">{study.duration}</span>
                  </div>

                  <div className="case-meta-item">
                    <span className="case-meta-label">Release Year</span>
                    <span className="case-meta-value">{study.year}</span>
                  </div>

                  {/* Platform Highlights */}
                  {study.tags && study.tags.length > 0 && (
                    <div className="case-meta-item">
                      <span className="case-meta-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Layers size={12} />
                        Platform Highlights
                      </span>
                      <div className="case-detail-tech-list">
                        {study.tags.map((tag, idx) => (
                          <span key={idx} className="case-detail-tech-token" style={{ borderColor: "rgba(0, 141, 228, 0.25)", color: "#ffffff" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies Deployed */}
                  {study.techStack && study.techStack.length > 0 && (
                    <div className="case-meta-item">
                      <span className="case-meta-label">Technologies Deployed</span>
                      <div className="case-detail-tech-list">
                        {study.techStack.map((tech, idx) => (
                          <span key={idx} className="case-detail-tech-token">
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <NoiseButton
                    href="/contact"
                    icon={<ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />}
                    className="w-full justify-center"
                  >
                    Build Something Similar
                  </NoiseButton>
                </div>
              </div>
            </aside>
          </div>

          {/* ─── Next Project Navigation Loop ─── */}
          {nextStudy && (
            <div className="case-detail-next-nav">
              <div>
                <span className="case-detail-next-label">Next Project</span>
                <h4 className="case-detail-next-title">{nextStudy.title}</h4>
              </div>

              <Link
                href={`/case-studies/${nextStudy.slug}`}
                className="case-detail-next-link"
              >
                <span>Explore Next Case Study</span>
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Case Study Specific CTA Banner */}
      <CTABanner
        title={study.ctaHeading || "Ready to build something impactful?"}
        subtitle={study.ctaText || "Let's turn your workflow into a connected high-performance software system."}
        badgeText="CASE STUDY CTA"
        primaryBtnText="Let's Talk"
        primaryBtnHref="/contact"
      />
    </main>
  );
}
