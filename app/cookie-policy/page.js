"use client";

import React from "react";
import Link from "next/link";
import PageHero from "../../components/PageHero/PageHero";
import "../../styles/legal.css";

export default function CookiePolicyPage() {
  const lastUpdated = "September 19, 2026";

  return (
    <main className="legal-page">
      <PageHero
        title="Cookie Policy"
        subtitle="Learn how Ideate X uses essential cookies and client-side storage to optimize performance and usability."
        breadcrumb={[
          { label: "Home", path: "/" },
          { label: "Legal", path: "/cookie-policy" },
          { label: "Cookie Policy", path: "/cookie-policy" },
        ]}
        compact={true}
      />

      <div className="legal-container">
        {/* Navigation Tabs */}
        <div className="legal-nav-tabs">
          <Link href="/privacy" className="legal-nav-tab">
            Privacy Policy
          </Link>
          <Link href="/terms" className="legal-nav-tab">
            Terms of Service
          </Link>
          <Link href="/cookie-policy" className="legal-nav-tab active">
            Cookie Policy
          </Link>
        </div>

        {/* Metadata Bar */}
        <div className="legal-meta-bar">
          <div className="legal-meta-item">
            <span>Last Updated:</span>
            <strong>{lastUpdated}</strong>
          </div>
          <div className="legal-badge">Strictly Essential & Minimal</div>
        </div>

        {/* Content Card */}
        <div className="legal-content-card">
          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">01</span>
              <h2 className="legal-section-title">What Are Cookies?</h2>
            </div>
            <p className="legal-text">
              Cookies and local storage items are small data files placed on your browser or device when you visit websites. They allow web platforms to remember your preferences (such as theme modes), maintain security, and analyze anonymous traffic performance to improve responsiveness.
            </p>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">02</span>
              <h2 className="legal-section-title">Categories of Cookies We Use</h2>
            </div>
            <p className="legal-text">
              We employ a minimal, privacy-conscious approach to cookies and tracking:
            </p>
            <ul className="legal-list">
              <li>
                <strong>Strictly Necessary & Functional:</strong> Essential for core website navigation, CSRF protection, and persisting UI states (e.g. interactive animations, form inputs, session handling).
              </li>
              <li>
                <strong>Performance & Optimization:</strong> Anonymized metrics to assess page load speeds, resource caching, and broken links across diverse client devices.
              </li>
              <li>
                <strong>Zero Third-Party Advertising:</strong> We do NOT use third-party behavioral advertising cookies or sell visitor profile data to ad brokers.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">03</span>
              <h2 className="legal-section-title">Specific Cookies & Storage Items</h2>
            </div>
            <div className="legal-table-wrap">
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Cookie / Key</th>
                    <th>Purpose</th>
                    <th>Category</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>__ideatex_theme</code></td>
                    <td>Saves dark theme preferences and UI settings</td>
                    <td>Functional</td>
                    <td>1 Year</td>
                  </tr>
                  <tr>
                    <td><code>__session_id</code></td>
                    <td>Maintains secure contact form state across requests</td>
                    <td>Essential</td>
                    <td>Session</td>
                  </tr>
                  <tr>
                    <td><code>_ga / _analytics</code></td>
                    <td>Anonymized aggregate traffic metrics (IP anonymized)</td>
                    <td>Analytics</td>
                    <td>90 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">04</span>
              <h2 className="legal-section-title">Managing & Disabling Cookies</h2>
            </div>
            <p className="legal-text">
              You can control and manage cookies through your browser settings. Please note that disabling essential cookies may impact specific interactive components or display preferences on our website.
            </p>
            <ul className="legal-list">
              <li><strong>Google Chrome:</strong> Settings &rarr; Privacy and security &rarr; Cookies and other site data.</li>
              <li><strong>Apple Safari:</strong> Preferences &rarr; Privacy &rarr; Manage Website Data.</li>
              <li><strong>Mozilla Firefox:</strong> Settings &rarr; Privacy &amp; Security &rarr; Cookies and Site Data.</li>
              <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions &rarr; Manage and delete cookies.</li>
            </ul>
          </section>

          <section className="legal-section">
            <div className="legal-section-header">
              <span className="legal-section-num">05</span>
              <h2 className="legal-section-title">Contact Us</h2>
            </div>
            <p className="legal-text">
              For any questions regarding our cookie practices or data management, please reach out to:
            </p>
            <div className="legal-contact-box">
              <h4>Ideate X Private Limited — Privacy & Operations</h4>
              <p>Email: <a href="mailto:hello@ideatex.co.in">hello@ideatex.co.in</a></p>
              <p>Phone: <a href="tel:+918760007900">+91 8760007900</a> / <a href="tel:+917305905661">+91 7305905661</a></p>
              <p>Registered Address: Innov8 Millenia, 2nd Floor, Campus-1a, MGR Main Rd, Perungudi, Chennai, Tamil Nadu 600096</p>
              <p>We are committed to transparent, privacy-first web practices.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
