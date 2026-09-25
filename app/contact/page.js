"use client";

import React, { useState } from "react";
import { Mail, Clock, Send, CheckCircle2, Check, Phone, MapPin, Building2 } from "lucide-react";
import PageHero from "../../components/PageHero/PageHero";
import SectionHeading from "../../components/SectionHeading/SectionHeading";
import { NoiseButton } from "../../components/ui/NoiseButton";
import { COMPANY_DETAILS } from "../../constants/contactInfo";
import { useCMSData } from "../../lib/cms-client";
import "../../components/Contact/ContactForm.css";

const projectTypeOptions = [
  "Website",
  "Mobile App",
  "Web App",
  "E-Commerce",
  "Brand Identity",
  "3D & Animation",
  "Social Media Marketing",
  "Brand Strategy & Consulting",
  "Other",
];

const socialLinks = [
  {
    id: "x",
    name: "X (Twitter)",
    href: "https://twitter.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const cms = useCMSData();
  const settings = cms.settings || {};
  const legalName = settings.legalName || settings.name || COMPANY_DETAILS.legalName;
  const email = settings.email || COMPANY_DETAILS.email;
  const phones = (settings.phones && settings.phones.length > 0)
    ? settings.phones
    : (settings.phone ? [{ display: settings.phone, raw: settings.phone.replace(/[^0-9+]/g, '') }] : COMPANY_DETAILS.phones);
  const addressFull = settings.address?.full || (settings.address ? `${settings.address.line1 || ''}, ${settings.address.city || ''}, ${settings.address.state || ''} ${settings.address.postalCode || ''}` : COMPANY_DETAILS.address.full);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    projectType: [],
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxToggle = (option) => {
    setFormData((prev) => {
      const exists = prev.projectType.includes(option);
      if (exists) {
        return { ...prev, projectType: prev.projectType.filter((item) => item !== option) };
      } else {
        return { ...prev, projectType: [...prev.projectType, option] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "", projectType: [] });
      } else {
        setStatus("error");
        setErrorMessage(
          Array.isArray(data?.errors)
            ? data.errors.join(". ")
            : (data?.error || data?.message || `Something went wrong. Please check your fields or email us directly at ${COMPANY_DETAILS.email}.`)
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(`Network error occurred. Please try again or email us directly at ${COMPANY_DETAILS.email}.`);
    }
  };

  return (
    <main className="contact-page contact-section-container">
      {/* Background Floating Ambient Bubbles */}
      <div className="contact-bubble-layer">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="contact-bubble"
            style={{
              width: `${120 + i * 35}px`,
              height: `${120 + i * 35}px`,
              left: `${15 + i * 14}%`,
              bottom: "-100px",
              "--bubble-delay": `${i * 2.8}s`,
              "--bubble-duration": `${14 + i * 3}s`,
              "--bubble-x-dir": i % 2 === 0 ? 1 : -1,
            }}
          />
        ))}
      </div>

      <PageHero
        breadcrumb={[{ path: "/", label: "Home" }, { label: "Contact" }]}
        title={<>Have something <span className="accent">worth building?</span></>}
        subtitle="Tell us what you're working on, what you're trying to solve, or where things are getting stuck. We'll start from there."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&auto=format&q=80&fit=crop"
        widget={
          <div className="hero-widget-glass" style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "260px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}></div>
              <span style={{ color: "var(--text-white)", fontWeight: 600, fontSize: "0.9rem" }}>Taking On New Projects</span>
            </div>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Direct conversation with senior technical leads.
            </p>
            <div style={{ paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Clock size={14} strokeWidth={1.75} aria-hidden="true" color="var(--accent)" />
              <span style={{ fontSize: "0.8rem", color: "var(--text-white)" }}>Typical response: 24–48 hours</span>
            </div>
          </div>
        }
      />

      <section className="section" style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <SectionHeading>
            <h2 className="section-title">Start a Conversation</h2>
          </SectionHeading>

          <div className="contact-layout-grid">
            {/* Left/Main: Contact Form Card */}
            <div className="contact-form-glass-card">
              <div className="contact-form-header">
                <h3 className="contact-form-main-message">Let&apos;s talk!</h3>
                <p className="contact-form-lead-text">
                  Have a question, RFP, or exciting software idea? Fill in the details below.
                </p>
              </div>

              {/* Direct Mail & Social Links Cluster */}
              <div className="contact-direct-bar">
                <div className="contact-mail-info">
                  <span className="contact-mail-label">Mail us directly</span>
                  <a href={`mailto:${email}`} className="contact-mail-link">
                    {email}
                  </a>
                </div>

                <div className="contact-social-cluster">
                  <span className="contact-social-or">OR</span>
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-btn"
                      aria-label={social.name}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <hr className="contact-divider" />

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="contact-section-form">
                <div>
                  <div className="contact-field-subtitle">Leave us a brief message</div>
                  <div className="contact-field-grid">
                    <div className="contact-form-group">
                      <label htmlFor="name">Your name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="contact-form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="sarah@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="contact-form-group contact-field-full">
                      <label htmlFor="phone">Mobile Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+91 98765 43210 or +1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="contact-form-group">
                  <label htmlFor="message">Briefly describe your project idea... *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what you're building, target launch goals, and any core feature requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>

                {/* "I'm looking for..." Multi-Select Checkboxes */}
                <div>
                  <div className="contact-options-title">I&apos;m looking for...</div>
                  <div className="contact-options-grid">
                    {projectTypeOptions.map((option) => {
                      const isChecked = formData.projectType.includes(option);
                      return (
                        <div
                          key={option}
                          className={`contact-option-checkbox-item ${isChecked ? "checked" : ""}`}
                          onClick={() => handleCheckboxToggle(option)}
                          role="checkbox"
                          aria-checked={isChecked}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              handleCheckboxToggle(option);
                            }
                          }}
                        >
                          <div className="contact-custom-box">
                            {isChecked && <Check size={12} color="#ffffff" strokeWidth={2.5} aria-hidden="true" />}
                          </div>
                          <span className="contact-option-label">{option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="contact-submit-wrap">
                  <NoiseButton
                    type="submit"
                    disabled={status === "sending"}
                    className="contact-submit-btn"
                    icon={<Send size={16} strokeWidth={1.75} aria-hidden="true" />}
                  >
                    {status === "sending" ? "Sending Message..." : "Send a message"}
                  </NoiseButton>
                </div>

                {status === "success" && (
                  <div
                    style={{
                    marginTop: "12px",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "rgba(0, 184, 98, 0.12)",
                    border: "1px solid rgba(0, 184, 98, 0.3)",
                    color: "#00B862",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <CheckCircle2 size={18} strokeWidth={1.75} aria-hidden="true" />
                  <span>Thank you! Your message has been sent. We will respond within 24 hours.</span>
                </div>
              )}

              {status === "error" && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    background: "rgba(255, 87, 51, 0.12)",
                    border: "1px solid rgba(255, 87, 51, 0.3)",
                    color: "#FF5733",
                    fontSize: "0.875rem",
                  }}
                >
                  {errorMessage || `Something went wrong. Please check your fields or email us directly at ${email}.`}
                </div>
              )}
            </form>
            </div>

            {/* Right Side: Sidebar Info & Next Steps */}
            <div className="contact-sidebar">
              {/* Direct Inquiries Card */}
              <div className="contact-sidebar-card">
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-white)", marginBottom: "12px" }}>
                  Direct Contact
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-body)", lineHeight: 1.6, marginBottom: "16px" }}>
                  Prefer direct phone or email communication? Reach out directly to our engineering leads.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Mail size={16} strokeWidth={1.75} aria-hidden="true" color="var(--accent)" />
                    <a href={`mailto:${email}`} style={{ color: "var(--text-white)", fontWeight: 600, fontSize: "0.9rem" }}>
                      {email}
                    </a>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <Phone size={16} strokeWidth={1.75} aria-hidden="true" color="var(--accent)" style={{ marginTop: "3px" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      {phones.map((p, pIdx) => (
                        <a key={p.raw || pIdx} href={`tel:${p.raw}`} style={{ color: "var(--text-white)", fontWeight: 600, fontSize: "0.9rem" }}>
                          {p.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Location Card */}
              <div className="contact-sidebar-card">
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Building2 size={18} strokeWidth={1.75} aria-hidden="true" color="var(--accent)" />
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-white)", margin: 0 }}>
                    Registered Office
                  </h3>
                </div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
                  {legalName}
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "var(--text-body)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                  <MapPin size={16} strokeWidth={1.75} aria-hidden="true" color="var(--accent)" style={{ flexShrink: 0, marginTop: "4px" }} />
                  <span>{addressFull}</span>
                </div>
              </div>

              {/* Next steps card */}
              <div className="contact-sidebar-card">
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-white)", marginBottom: "12px" }}>
                  What Happens Next?
                </h3>
                <ul className="contact-steps-list">
                  <li className="contact-steps-item">
                    <CheckCircle2 size={16} strokeWidth={1.75} aria-hidden="true" className="contact-steps-icon" />
                    <span>We review your requirements and technical goals with our engineering leads.</span>
                  </li>
                  <li className="contact-steps-item">
                    <CheckCircle2 size={16} strokeWidth={1.75} aria-hidden="true" className="contact-steps-icon" />
                    <span>We schedule a 30-minute discovery call to align on architecture & scope.</span>
                  </li>
                  <li className="contact-steps-item">
                    <CheckCircle2 size={16} strokeWidth={1.75} aria-hidden="true" className="contact-steps-icon" />
                    <span>You receive a clear scope proposal with timeline and fixed milestones.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
