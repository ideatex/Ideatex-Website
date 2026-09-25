"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NoiseButton } from "../ui/NoiseButton";
import Logo from "../Logo/Logo";
import { useCMSData } from "../../lib/cms-client";
import "./Navbar.css";

const defaultNavLinks = [
  { path: "/portfolio", label: "Work" },
  { path: "/services", label: "Services" },
  { path: "/case-studies", label: "Case Studies" },
  { path: "/blog", label: "Insights" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const cms = useCMSData();

  const navLinks = (cms.navigation?.header && cms.navigation.header.length > 0)
    ? cms.navigation.header.map((item) => ({ path: item.url, label: item.label }))
    : defaultNavLinks;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={`navbar-header-root ${scrolled ? "is-scrolled" : ""}`}>
      <nav
        className="navbar-glass-container"
        aria-label="Main Navigation"
      >
        <div className="navbar-glass-inner">
          {/* Brand logo */}
          <Link
            href="/"
            className="navbar-brand-link"
            aria-label="Ideate X Home"
          >
            <Logo size={26} showText={true} />
          </Link>

          {/* Center nav links */}
          <ul className="navbar-center-links">
            {navLinks.map(({ path, label }) => {
              const isActive =
                path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(path);
              return (
                <li key={path} className="navbar-link-li">
                  <Link
                    href={path}
                    className={`navbar-nav-item ${isActive ? "active" : ""}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Area: Glassy CTA Button + Mobile Toggle */}
          <div className="navbar-right-cluster">
            <div className="navbar-cta-desktop">
              <NoiseButton
                href="/contact"
                icon={<ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />}
                className="navbar-glass-btn"
              >
                Start a Project
              </NoiseButton>
            </div>

            <button
              type="button"
              className="navbar-mobile-toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X size={20} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Glassy Dropdown Menu */}
      {isOpen && (
        <div className="navbar-mobile-dropdown">
          <ul className="navbar-mobile-links-list">
            {navLinks.map(({ path, label }) => {
              const isActive =
                path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(path);
              return (
                <li key={path}>
                  <Link
                    href={path}
                    onClick={() => setIsOpen(false)}
                    className={`navbar-mobile-link-item ${isActive ? "active" : ""}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="navbar-mobile-cta-wrap">
              <NoiseButton
                href="/contact"
                onClick={() => setIsOpen(false)}
                icon={<ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />}
                className="navbar-mobile-glass-btn"
              >
                Start a Project
              </NoiseButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export { Navbar };
