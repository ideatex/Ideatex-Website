"use client";

import React from "react";
import AboutIntro from "../../components/About/AboutIntro";
import CTABanner from "../../components/CTABanner/CTABanner";
import LogoCloudSwap from "../../components/ui/logo-cloud-swap";
import FAQAccordion from "../../components/FAQAccordion/FAQAccordion";
import { ABOUT_FAQS } from "../../constants/pageFaqs";
import KineticTeamHybrid from "../../components/Team/KineticTeam";
import { FeatureCarousel } from "../../components/ProcessSteps/ProcessSteps";

const sectionTitle = {
  fontFamily: "var(--font-heading)",
  fontSize: "clamp(2rem, 3.8vw, 3rem)",
  fontWeight: 700,
  color: "#ffffff",
  letterSpacing: "-0.02em",
  marginBottom: "0.75rem",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Hero, About Us header and image + cards */}
      <AboutIntro />

      {/* ─── CORE TEAM & LEADERSHIP ─── */}
      <section className="section" aria-label="Core Team">
        <div className="container">
          <KineticTeamHybrid />
        </div>
      </section>

      {/* ─── PROCESS & ROADMAP ─── */}
      <section className="section" aria-label="Process and Roadmap">
        <div className="container">
          <div style={{ maxWidth: "780px", marginBottom: "2.5rem" }}>
            <h2 style={sectionTitle}>From first idea to finished work.</h2>
            <p style={{ color: "var(--text-body)", fontSize: "1.05rem", margin: 0, lineHeight: 1.6 }}>
              The same four steps, whether the project is a film, a search campaign or an application.
            </p>
          </div>

          <FeatureCarousel />
        </div>
      </section>

      <LogoCloudSwap />

      <FAQAccordion faqs={ABOUT_FAQS} title="Getting to Know Ideate X" subtitle="A few things people ask about who we are and how we work." />

      {/* ─── STANDALONE FULL-WIDTH CTA SECTION (Matching other pages) ─── */}
      <CTABanner
        title="Let's Talk About What You're Working On."
        subtitle="Tell us what you're planning, what needs improving or what you'd like to create. Let's discuss the right way forward."
        primaryBtnText="Contact Ideate X"
        primaryBtnHref="/contact"
        secondaryBtnText="View Our Work"
        secondaryBtnHref="/portfolio"
      />
    </main>
  );
}
