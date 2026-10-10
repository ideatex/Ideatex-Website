"use client";

import React from "react";
import Link from "next/link";
import PageHero from "../../components/PageHero/PageHero";
import "../../styles/legal.css";

export default function PrivacyPage() {
  const lastUpdated = "September 19, 2026";

  return (
    <main className="legal-page">
      <PageHero
        title="Privacy Policy"
        subtitle="How Ideate X collects, protects, and manages your personal data and client project information."
        breadcrumb={[
          { label: "Home", path: "/" },
          { label: "Legal", path: "/privacy" },
          { label: "Privacy Policy", path: "/privacy" },
        ]}
        compact={true}
      />

      <div className="legal-container">
        {/* Navigation Tabs */}
        <div className="legal-nav-tabs">
          <Link href="/privacy" className="legal-nav-tab active">
            Privacy Policy
          </Link>
          <Link href="/terms" className="legal-nav-tab">
            Terms of Service
          </Link>
          <Link href="/cookie-policy" className="legal-nav-tab">
            Cookie Policy
          </Link>
        </div>

        {/* Metadata Bar */}
        <div className="legal-meta-bar">
          <div className="legal-meta-item">
            <span>Last Updated:</span>
            <strong>{lastUpdated}</strong>
          </div>
          <div className="legal-badge">GDPR & CCPA Compliant</div>
        </div>

        {/* Content Card */}
        <div className="legal-content-card">
          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">01</span>
              <h2 className="legal-section-title">Introduction & Scope</h2>
            </div>
            <p className="legal-text">
              Ideate X (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is dedicated to safeguarding the privacy of our website visitors, clients, and partners. This Privacy Policy outlines our practices concerning the collection, usage, processing, and protection of personal data and confidential client materials when interacting with our website, product engineering services, and digital solutions.
            </p>
            <div className="legal-callout">
              <p>
                <strong>Core Commitment:</strong> We never sell, rent, or monetize your personal data or client project data to any third parties under any circumstance.
              </p>
            </div>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">02</span>
              <h2 className="legal-section-title">Information We Collect</h2>
            </div>
            <p className="legal-text">
              We collect information strictly necessary to communicate with you and deliver custom apps engineering services:
            </p>
            <ul className="legal-list">
              <li>
                <strong>Direct Inquiries & Contact:</strong> Name, work email address, company name, project specifications, and estimated budget provided through our contact forms or email correspondence.
              </li>
              <li>
                <strong>Project Collaboration Data:</strong> Technical specifications, design assets, repository access credentials, API keys, and documentation provided during active development under non-disclosure agreements (NDAs).
              </li>
              <li>
                <strong>Technical & Usage Information:</strong> Anonymized browser type, operating system, IP address, page response times, and navigation paths collected automatically to ensure system uptime and security.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">03</span>
              <h2 className="legal-section-title">How We Use Your Information</h2>
            </div>
            <p className="legal-text">
              We use collected information solely for legitimate business and engineering operations:
            </p>
            <ul className="legal-list">
              <li>Delivering, scoping, and executing contracted product development, SaaS architecture, and design services.</li>
              <li>Responding to project inquiries, generating accurate proposals, and providing ongoing technical support.</li>
              <li>Fulfilling billing, invoicing, and contractual obligations.</li>
              <li>Protecting the integrity, performance, and security of our digital platforms and client repositories.</li>
            </ul>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">04</span>
              <h2 className="legal-section-title">Client Confidentiality & Code Ownership</h2>
            </div>
            <p className="legal-text">
              All proprietary source code, algorithms, business logic, system architectures, and client databases entrusted to Ideate X are treated with strict confidentiality:
            </p>
            <ul className="legal-list">
              <li><strong>Zero Sub-Licensing:</strong> We do not reuse proprietary client codebase components or business logic across other client projects.</li>
              <li><strong>Full Ownership:</strong> Clients retain 100% intellectual property ownership of all custom code, assets, and deliverables produced under their agreements.</li>
              <li><strong>Access Controls:</strong> Engineering access is restricted on a strict need-to-know basis using role-based authentication and encrypted communication channels.</li>
            </ul>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">05</span>
              <h2 className="legal-section-title">Data Storage, Security & Retention</h2>
            </div>
            <p className="legal-text">
              We implement industry-standard organizational and technical measures to protect your personal and project information against unauthorized access, loss, or alteration. Data is stored on secure, encrypted cloud infrastructure. We retain personal and project data only for as long as necessary to fulfill project requirements, warranty obligations, and statutory tax or legal requirements.
            </p>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">06</span>
              <h2 className="legal-section-title">Your Rights (GDPR & CCPA)</h2>
            </div>
            <p className="legal-text">
              Depending on your jurisdiction, you possess the following rights regarding your personal information:
            </p>
            <ul className="legal-list">
              <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete information.</li>
              <li><strong>Right to Erasure:</strong> Request the deletion of your personal records, subject to statutory retention obligations.</li>
              <li><strong>Right to Restrict Processing:</strong> Object to or restrict specific forms of data processing.</li>
            </ul>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">07</span>
              <h2 className="legal-section-title">Contact Our Privacy Team</h2>
            </div>
            <p className="legal-text">
              If you have any questions about this Privacy Policy, your data rights, or our confidentiality practices, please contact us directly:
            </p>
            <div className="legal-contact-box">
              <h4>Ideate X Private Limited — Data Protection</h4>
              <p>Email: <a href="mailto:hello@ideatex.co.in">hello@ideatex.co.in</a></p>
              <p>Phone: <a href="tel:+918760007900">+91 8760007900</a> / <a href="tel:+917305905661">+91 7305905661</a></p>
              <p>Registered Address: Innov8 Millenia, 2nd Floor, Campus-1a, MGR Main Rd, Perungudi, Chennai, Tamil Nadu 600096</p>
              <p>Response Time: We respond to all privacy and data requests within 2 business days.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
