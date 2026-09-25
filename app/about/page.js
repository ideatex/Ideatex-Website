"use client";

import React from "react";
import Link from "next/link";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { FlowArt, FlowSection } from "../../components/ui/flow-art";
import { NoiseButton } from "../../components/ui/NoiseButton";
import CTABanner from "../../components/CTABanner/CTABanner";
import SpotlightCard from "../../components/SpotlightCard/SpotlightCard";
import KineticTeamHybrid from "../../components/Team/KineticTeam";
import { FeatureCarousel } from "../../components/ProcessSteps/ProcessSteps";
import { IMAGES } from "../../constants/images";
import {
  Code2,
  Users,
  Cpu,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Layers,
  Zap,
  Target,
  Compass,
} from "lucide-react";

const principles = [
  {
    icon: Code2,
    title: "Practical Engineering",
    desc: "We write clean, documented code and choose technologies based on reliability, speed, and long-term maintainability.",
  },
  {
    icon: Users,
    title: "Direct Communication",
    desc: "You work directly with the developers and designers building your software — no middlemen or confusing handoffs.",
  },
  {
    icon: Cpu,
    title: "Product-First Mindset",
    desc: "We build features that solve real problems for users and create measurable business value.",
  },
  {
    icon: ShieldCheck,
    title: "Code & IP Ownership",
    desc: "You own 100% of your source code, design assets, and intellectual property from day one.",
  },
];

const team = [
  { name: "Sankara", role: "Business Lead", initials: "S", photo: "/sankara.png" },
  { name: "Sudharsan", role: "Business Strategist", initials: "S", photo: "/sudharsan.jpg" },
  { name: "Amal Alex", role: "Software Developer", initials: "AA", photo: "/amal.jpg" },
];



export default function AboutPage() {
  return (
    <main className="about-page">
      <FlowArt aria-label="About Ideate X Story Scroll">
        {/* ─── SECTION 1: STUDIO HERO & MANIFESTO ─── */}
        <FlowSection className="flow-card-hero" aria-label="About Ideate X Introduction">
          <div className="flow-content-body">
            <div style={{ maxWidth: "860px" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <Breadcrumb items={[{ path: '/', label: 'Home' }, { label: 'About' }]} />
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)",
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  marginBottom: "1.25rem",
                  textTransform: "none",
                }}
              >
                We build software for{" "}
                <span className="accent">
                  what comes next.
                </span>
              </h1>
              <p
                style={{
                  fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                  color: "var(--text-body)",
                  lineHeight: 1.7,
                  maxWidth: "740px",
                  marginBottom: "2rem",
                }}
              >
                Ideate X is a software development company building AI agents, automated workflows, applications, SaaS products, and digital experiences for businesses that want to move forward.
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <NoiseButton href="/contact" icon={<ArrowRight size={16} />}>
                  Start a Conversation
                </NoiseButton>
                <Link
                  href="/portfolio"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    padding: "10px 18px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    transition: "all 0.2s ease",
                  }}
                >
                  See Our Work →
                </Link>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* ─── SECTION 2: WHAT WE DO & CAPABILITIES ─── */}
        <FlowSection className="flow-card-dark" aria-label="What We Do">
          <div className="flow-content-body">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2.5rem",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(2rem, 3.8vw, 3rem)",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                    marginBottom: "1.25rem",
                  }}
                >
                  Software built around your business.
                </h2>
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "#ffffff",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                    fontWeight: 500,
                  }}
                >
                  Your business doesn't have to fit into someone else's software. We build technology around your processes, your customers, and the way your team actually works.
                </p>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-body)",
                    lineHeight: 1.7,
                    marginBottom: "1.5rem",
                  }}
                >
                  From a new product idea to an existing system that needs a better way forward, we help turn requirements into software that people can actually use.
                </p>

                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    padding: 0,
                    listStyle: "none",
                  }}
                >
                  {[
                    "Full-stack web & SaaS architectures (React 19, Next.js, Node, Python, Postgres)",
                    "Autonomous AI agents, retrieval workflows & model integrations",
                    "Design systems, interactive prototypes & high-converting UX",
                    "Cloud infrastructure, continuous delivery & performance optimization",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontSize: "0.9375rem",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      <CheckCircle2
                        size={18}
                        strokeWidth={1.75}
                        color="var(--accent-green)"
                        aria-hidden="true"
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
                  maxHeight: "460px",
                }}
              >
                <img
                  src={IMAGES.about.thumbnail}
                  alt="Ideate X Engineering Lab"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(9,13,22,0.92) 0%, rgba(9,13,22,0.2) 60%, transparent 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "1.5rem",
                  }}
                >
                  <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "#ffffff" }}>
                    Product-Grade Delivery & Precision Code
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* ─── SECTION 3: OPERATING PRINCIPLES ─── */}
        <FlowSection className="flow-card-navy" aria-label="Operating Principles">
          <div className="flow-content-body">
            <div style={{ maxWidth: "720px", marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2rem, 3.8vw, 3rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.75rem",
                }}
              >
                Engineered with unwavering standards.
              </h2>
              <p style={{ color: "var(--text-body)", fontSize: "1.05rem", margin: 0, lineHeight: 1.6 }}>
                The foundational values that govern every architecture decision, line of code, and client partnership.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2.5rem 3rem",
              }}
            >
              {principles.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                      paddingTop: "1.25rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "8px",
                          background: "rgba(0, 141, 228, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--accent)",
                        }}
                      >
                        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.925rem",
                        color: "var(--text-body)",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </FlowSection>

        {/* ─── SECTION 4: CORE TEAM & LEADERSHIP ─── */}
        <FlowSection className="flow-card-accent" aria-label="Core Team">
          <div className="flow-content-body">
            <KineticTeamHybrid />
          </div>
        </FlowSection>

        {/* ─── SECTION 5: 4-STEP PROCESS & ROADMAP ─── */}
        <FlowSection className="flow-card-cta" aria-label="Process and Roadmap">
          <div className="flow-content-body">
            <div style={{ maxWidth: "780px", marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2rem, 3.8vw, 3rem)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.75rem",
                }}
              >
                How we turn your ideas into reality.
              </h2>
              <p style={{ color: "var(--text-body)", fontSize: "1.05rem", margin: 0, lineHeight: 1.6 }}>
                A disciplined, milestone-driven delivery process designed for transparency, rapid validation, and production reliability.
              </p>
            </div>

            {/* Feature Carousel */}
            <FeatureCarousel />
          </div>
        </FlowSection>
      </FlowArt>

      {/* ─── STANDALONE FULL-WIDTH CTA SECTION (Matching other pages) ─── */}
      <CTABanner
        title="Have something worth building?"
        subtitle="Tell us what you're working on, what you're trying to solve, or where things are getting stuck. We'll start from there."
        primaryBtnText="Start a Conversation"
        primaryBtnHref="/contact"
        secondaryBtnText="See Our Work"
        secondaryBtnHref="/portfolio"
      />
    </main>
  );
}
