"use client";

import React from "react";
import Link from "next/link";
import PageHero from "../../components/PageHero/PageHero";
import "../../styles/legal.css";

export default function TermsPage() {
  const lastUpdated = "September 19, 2026";

  return (
    <main className="legal-page">
      <PageHero
        title="Terms of Service"
        subtitle="Standard terms and conditions governing product development, product engineering, and digital consulting services."
        breadcrumb={[
          { label: "Home", path: "/" },
          { label: "Legal", path: "/terms" },
          { label: "Terms of Service", path: "/terms" },
        ]}
        compact={true}
      />

      <div className="legal-container">
        {/* Navigation Tabs */}
        <div className="legal-nav-tabs">
          <Link href="/privacy" className="legal-nav-tab">
            Privacy Policy
          </Link>
          <Link href="/terms" className="legal-nav-tab active">
            Terms of Service
          </Link>
          <Link href="/cookie-policy" className="legal-nav-tab">
            Cookie Policy
          </Link>
        </div>

        {/* Metadata Bar */}
        <div className="legal-meta-bar">
          <div className="legal-meta-item">
            <span>Effective Date:</span>
            <strong>{lastUpdated}</strong>
          </div>
          <div className="legal-badge">Standard Commercial Agreement</div>
        </div>

        {/* Content Card */}
        <div className="legal-content-card">
          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">01</span>
              <h2 className="legal-section-title">Acceptance of Terms</h2>
            </div>
            <p className="legal-text">
              By accessing the Ideate X website, engaging our services, or signing a formal Statement of Work (SOW), you (&ldquo;Client&rdquo; or &ldquo;User&rdquo;) agree to be legally bound by these Terms of Service. If you are entering into this agreement on behalf of an entity, you represent that you possess the authority to bind such entity.
            </p>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">02</span>
              <h2 className="legal-section-title">Scope of Services & Deliverables</h2>
            </div>
            <p className="legal-text">
              Ideate X provides bespoke product engineering, multi-tenant SaaS architecture, web/mobile application development, UI/UX design, and AI automation consulting:
            </p>
            <ul className="legal-list">
              <li><strong>Statements of Work (SOW):</strong> Each engineering engagement is governed by an executed SOW outlining exact milestones, technical deliverables, timelines, and acceptance criteria.</li>
              <li><strong>Change Requests:</strong> Modifications to project scope, architecture, or features outside the agreed SOW require written consent and may adjust estimates and delivery schedules accordingly.</li>
            </ul>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">03</span>
              <h2 className="legal-section-title">Intellectual Property & IP Transfer</h2>
            </div>
            <p className="legal-text">
              We respect and protect intellectual property rights:
            </p>
            <div className="legal-callout">
              <p>
                <strong>Full Ownership Transfer:</strong> Upon full receipt of payment for contracted milestones, all custom code, designs, documentation, and digital assets developed exclusively for the Client transfer entirely to the Client without recurring license fees.
              </p>
            </div>
            <ul className="legal-list">
              <li><strong>Pre-Existing Tools & Libraries:</strong> Any open-source libraries or pre-existing developer tooling utilized remain subject to their respective standard open-source licenses (e.g., MIT, Apache 2.0).</li>
              <li><strong>Client Materials:</strong> The Client retains all rights and ownership over all proprietary data, branding, and materials provided to Ideate X for project execution.</li>
            </ul>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">04</span>
              <h2 className="legal-section-title">Payment Terms & Milestones</h2>
            </div>
            <p className="legal-text">
              Payment schedules are structured by agreed milestones or sprints as specified in each project proposal or contract:
            </p>
            <ul className="legal-list">
              <li>Invoices are issued upon completion of agreed milestone deliverables or sprint cycles.</li>
              <li>Standard payment terms are Net 15 days from the date of invoice issuance unless otherwise agreed in writing.</li>
              <li>Payments may be executed via bank wire transfer, ACH, or designated secure payment processing platforms.</li>
            </ul>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">05</span>
              <h2 className="legal-section-title">Quality Assurance & Warranty</h2>
            </div>
            <p className="legal-text">
              Ideate X warrants that all custom deliverables will conform to the agreed technical specifications and acceptance criteria outlined in the SOW. We provide a complimentary 30-day post-deployment warranty period during which any critical bugs or defects arising from our code will be resolved at no additional cost.
            </p>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">06</span>
              <h2 className="legal-section-title">Confidentiality & Non-Disclosure</h2>
            </div>
            <p className="legal-text">
              Both parties agree to protect and keep confidential all non-public information, technical specifications, business plans, and source code disclosed during the engagement. This confidentiality obligation remains in effect indefinitely or as specified in an executed Mutual Non-Disclosure Agreement (MNDA).
            </p>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">07</span>
              <h2 className="legal-section-title">Limitation of Liability</h2>
            </div>
            <p className="legal-text">
              To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, special, or consequential damages. The total aggregate liability of Ideate X for any claim arising out of or relating to these terms shall not exceed the total fees paid by the Client under the applicable SOW during the six (6) months preceding the claim.
            </p>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">08</span>
              <h2 className="legal-section-title">Governing Law & Inquiries</h2>
            </div>
            <p className="legal-text">
              These Terms shall be governed by and construed in accordance with standard commercial commercial laws. For any legal inquiries or contractual clarifications, please contact:
            </p>
            <div className="legal-contact-box">
              <h4>Ideate X Private Limited — Legal & Contracts</h4>
              <p>Email: <a href="mailto:hello@ideatex.co.in">hello@ideatex.co.in</a></p>
              <p>Phone: <a href="tel:+918760007900">+91 8760007900</a> / <a href="tel:+917305905661">+91 7305905661</a></p>
              <p>Registered Address: Innov8 Millenia, 2nd Floor, Campus-1a, MGR Main Rd, Perungudi, Chennai, Tamil Nadu 600096</p>
              <p>Inquiries: Contractual, licensing, and partnership questions.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
