"use client";

import Link from 'next/link';
import Logo from '../Logo/Logo';
import { TextHoverEffect, FooterBackgroundGradient } from '../ui/text-hover-effect';
import { COMPANY_DETAILS } from '../../constants/contactInfo';
import { useCMSData } from '../../lib/cms-client';
import './Footer.css';

const defaultNavServices = [
  { label: 'Ai agentic development', to: '/services/ai-agentic-development' },
  { label: 'Saas platform engineering', to: '/services/saas-development' },
  { label: 'Modern web development', to: '/services/web-development' },
  { label: 'Mobile app development', to: '/services/mobile-app-development' },
  { label: 'Api & system integration', to: '/services/api-system-integration' },
  { label: 'All services', to: '/services' },
];

const defaultNavCompany = [
  { label: 'About us', to: '/about' },
  { label: 'Case studies', to: '/case-studies' },
  { label: 'Selected work', to: '/portfolio' },
  { label: 'Technical insights', to: '/blog' },
  { label: 'Start a project', to: '/contact' },
];

const defaultNavLegal = [
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Terms of service', to: '/terms' },
  { label: 'Cookie policy', to: '/cookie-policy' },
];

export default function Footer() {
  const cms = useCMSData();

  const footerGroups = cms.navigation?.footer;
  const navServices = (footerGroups?.services && footerGroups.services.length > 0)
    ? footerGroups.services.map((s) => ({ label: s.label, to: s.url }))
    : defaultNavServices;

  const navCompany = (footerGroups?.company && footerGroups.company.length > 0)
    ? footerGroups.company.map((c) => ({ label: c.label, to: c.url }))
    : defaultNavCompany;

  const navLegal = (footerGroups?.legal && footerGroups.legal.length > 0)
    ? footerGroups.legal.map((l) => ({ label: l.label, to: l.url }))
    : defaultNavLegal;

  const settings = cms.settings || {};
  const legalName = settings.legalName || settings.name || COMPANY_DETAILS.legalName;
  const email = settings.email || COMPANY_DETAILS.email;
  const phones = (settings.phones && settings.phones.length > 0)
    ? settings.phones
    : (settings.phone ? [{ display: settings.phone, raw: settings.phone.replace(/[^0-9+]/g, '') }] : COMPANY_DETAILS.phones);
  const addressFull = settings.address?.full || (settings.address ? `${settings.address.line1 || ''}, ${settings.address.city || ''}, ${settings.address.state || ''} ${settings.address.postalCode || ''}` : COMPANY_DETAILS.address.full);
  const tagline = settings.tagline || COMPANY_DETAILS.tagline;

  return (
    <footer className="footer">
      {/* ── Ambient Background Gradient ── */}
      <FooterBackgroundGradient />

      <div className="container footer-content-container">
        {/* Brand Summary */}
        <div className="footer-brand-summary">
          <div className="footer-logo-wrap">
            <Logo size={34} showText={true} />
          </div>
          <p className="footer-brand-desc">
            <strong>{legalName}</strong> builds high-performance software, scalable digital platforms, and AI-driven growth systems.
          </p>
        </div>

        {/* ── 4-column navigation grid ── */}
        <div className="footer-grid">
          <nav className="footer-nav-col" aria-label="Services">
            <h4 className="footer-col-title">SERVICES</h4>
            {navServices.map((link) => (
              <Link key={link.label} href={link.to} className="footer-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="footer-nav-col" aria-label="Company">
            <h4 className="footer-col-title">COMPANY</h4>
            {navCompany.map((link) => (
              <Link key={link.label} href={link.to} className="footer-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <nav className="footer-nav-col" aria-label="Legal">
            <h4 className="footer-col-title">LEGAL</h4>
            {navLegal.map((link) => (
              <Link key={link.label} href={link.to} className="footer-nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact column */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">CONTACT</h4>
            <ul className="footer-contact">
              <li>
                <span className="footer-contact-label">EMAIL</span>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <span className="footer-contact-label">PHONE</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {phones.map((phone, pIdx) => (
                    <a key={phone.raw || pIdx} href={`tel:${phone.raw}`}>
                      {phone.display}
                    </a>
                  ))}
                </div>
              </li>
              <li>
                <span className="footer-contact-label">OFFICE LOCATION</span>
                <span className="footer-location-text">
                  {addressFull}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Giant IDEATE X Text Hover Effect overlaying / positioned with footer links ── */}
      <div className="footer-text-hover-wrap">
        <TextHoverEffect text={legalName.toUpperCase()} />
      </div>

      <div className="container footer-bottom-container">
        {/* ── Wave decoration ── */}
        <div className="footer-decor">
          <svg className="footer-wave" viewBox="0 0 1200 24" fill="none" preserveAspectRatio="none">
            <path d="M0 12 C100 2, 200 22, 300 12 C400 2, 500 22, 600 12 C700 2, 800 22, 900 12 C1000 2, 1100 22, 1200 12" stroke="var(--accent)" strokeWidth="1.2" fill="none"/>
          </svg>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p>{legalName} &copy; {new Date().getFullYear()}. All rights reserved.</p>
          
          <div className="footer-bottom-legal">
            <Link href="/privacy" className="footer-bottom-link">Privacy policy</Link>
            <span className="footer-bottom-sep">&bull;</span>
            <Link href="/terms" className="footer-bottom-link">Terms of service</Link>
            <span className="footer-bottom-sep">&bull;</span>
            <Link href="/cookie-policy" className="footer-bottom-link">Cookie policy</Link>
          </div>

          <p className="footer-credit">
            {tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
