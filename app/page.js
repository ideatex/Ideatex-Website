"use client";

import Hero from '../components/Hero/Hero';
import MarqueeTicker from '../components/MarqueeTicker/MarqueeTicker';
import PortfolioCard from '../components/PortfolioCard/PortfolioCard';
import LogoCloud from '../components/LogoCloud/LogoCloud';
import CTABanner from '../components/CTABanner/CTABanner';
import FAQAccordion from '../components/FAQAccordion/FAQAccordion';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import SpotlightCard from '../components/SpotlightCard/SpotlightCard';
import ProcessSteps from '../components/ProcessSteps/ProcessSteps';
import VerticalTabs from '../components/ui/vertical-tabs';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IMAGES } from '../constants/images';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NoiseButton } from '../components/ui/NoiseButton';
import WhyUs from '../components/WhyUs/WhyUs';
import HomeCaseStudies from '../components/HomeCaseStudies/HomeCaseStudies';

import { useCMSData } from '../lib/cms-client';

const defaultCapabilities = [
  {
    id: "01",
    title: "AI Agentic Systems",
    category: "AI & Automation",
    description: "Practical AI agents and automated workflows connecting your tools and data.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&q=80&fit=crop",
    link: "/services/ai-agentic-development",
  },
  {
    id: "02",
    title: "SaaS Platform Engineering",
    category: "Engineering",
    description: "Multi-tenant SaaS architectures, Stripe subscription billing, and cloud infrastructure.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&q=80&fit=crop",
    link: "/services/saas-development",
  },
  {
    id: "03",
    title: "Modern Web Development",
    category: "Engineering",
    description: "High-performance web applications and digital interfaces built for speed and scale.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&q=80&fit=crop",
    link: "/services/web-development",
  },
  {
    id: "04",
    title: "Mobile App Development",
    category: "Engineering",
    description: "Cross-platform mobile applications engineered for iOS and Android with offline sync.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&q=80&fit=crop",
    link: "/services/mobile-app-development",
  },
  {
    id: "05",
    title: "API & System Integration",
    category: "Engineering",
    description: "Connecting third-party APIs, payment gateways, databases, and internal workflows.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&q=80&fit=crop",
    link: "/services/api-system-integration",
  },
  {
    id: "06",
    title: "Digital Marketing & Growth",
    category: "Growth",
    description: "Data-driven demand generation, targeted acquisition funnels, and conversion optimization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&q=80&fit=crop",
    link: "/services/digital-marketing",
  },
];

const defaultProjects = [
  {
    title: 'CSAVA',
    category: 'SAAS & PLATFORMS',
    tags: ['Next.js', 'PostgreSQL', 'Supabase'],
    image: '/clients/CSAVA.png',
    link: 'https://csava.org',
  },
  {
    title: 'Keyo',
    category: 'MOBILE APPS & PWA',
    tags: ['Next.js', 'Prisma', 'Firebase', 'PWA'],
    image: '/clients/Keyo.png',
    link: 'https://keyo.co.in/en',
  },
  {
    title: 'SBE Builders',
    category: 'ENTERPRISE WEB PLATFORM',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    image: '/clients/SBEBuilders.png',
    link: 'https://sbebuilders.in',
  },
  {
    title: 'Sami V Landmarks',
    category: 'WEB APPLICATIONS',
    tags: ['React', 'Next.js', 'Interactive UI'],
    image: '/clients/SamiVLandmarks.png',
    link: 'https://samivlandmarks.in',
  },
  {
    title: 'Tifbox',
    category: 'MOBILE APPS & FOODTECH',
    tags: ['React Native', 'PWA', 'PostgreSQL', 'WhatsApp API'],
    image: '/clients/Tifbox.png',
    link: 'https://tifboxmeals.com',
  },
  {
    title: 'Vevy.One',
    category: 'SAAS PLATFORM',
    tags: ['Next.js', 'Prisma', 'PostgreSQL'],
    image: '/clients/Vevy.One.png',
    link: 'https://vevyone.netlify.app',
  },
  {
    title: 'Srinivas Packaging',
    category: 'MANUFACTURING & B2B',
    tags: ['Next.js', 'B2B Portal', 'Product Catalogue', 'Quote Engine'],
    image: '/clients/SrinivasPackaging.png',
    link: 'https://srinivaspackaging.in',
  },
];

export default function Home() {
  const capabilitiesRef = useScrollReveal();
  const workRef = useScrollReveal();
  const caseStudiesRef = useScrollReveal();

  const cms = useCMSData();
  const dynamicServices = cms.services || [];
  const dynamicWork = cms.workItems || [];
  const sections = cms.sections || [];

  const heroSec = sections.find((s) => s.sectionKey === 'hero');
  const capabilitiesSec = sections.find((s) => s.sectionKey === 'capabilities');
  const workSec = sections.find((s) => s.sectionKey === 'selected_work');

  const capabilitiesList = (dynamicServices.length > 0
    ? dynamicServices.slice(0, 5).map((s, idx) => ({
        id: `0${idx + 1}`,
        title: s.title,
        category: s.category,
        description: s.shortDescription || s.tagline || s.description,
        image: s.image?.src || defaultCapabilities[idx % defaultCapabilities.length].image,
        link: `/services/${s.slug}`,
      }))
    : defaultCapabilities.slice(0, 5));

  const selectedProjects = dynamicWork.length > 0 ? dynamicWork.map((w, idx) => ({
    title: w.title,
    category: w.category,
    tags: w.tags || ['Next.js', 'React'],
    image: w.image || defaultProjects[idx % defaultProjects.length].image,
    link: w.liveUrl || defaultProjects[idx % defaultProjects.length].link,
  })) : defaultProjects;

  return (
    <main>
      {/* 1. Hero Section */}
      <Hero 
        title={heroSec?.heading}
        subtitle={heroSec?.subheading}
        primaryCtaText={heroSec?.ctaPrimaryLabel}
        secondaryCtaText={heroSec?.ctaSecondaryLabel}
      />

      {/* 2. Tech Stack Marquee */}
      <LogoCloud />

      {/* 3. Capabilities Overview ("What We Do") */}
      <section className="section" ref={capabilitiesRef}>
        <div className="container reveal">
          <SectionHeading>
            <h2 className="section-title">{capabilitiesSec?.heading || "What We Do"}</h2>
          </SectionHeading>

          <p style={{ maxWidth: '650px', color: 'var(--text-body)', fontSize: '1.1rem', marginBottom: 'var(--space-2xl)', lineHeight: 1.6 }}>
            {capabilitiesSec?.description || "We design, build, and support software products, web applications, and automated workflows."}
          </p>

          <VerticalTabs services={capabilitiesList} />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-2xl)' }}>
            <NoiseButton href={capabilitiesSec?.ctaUrl || "/services"} icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
              {capabilitiesSec?.ctaLabel || "Explore All Services"}
            </NoiseButton>
          </div>
        </div>
      </section>

      {/* 4. Marquee Capability Strip */}
      <MarqueeTicker />

      {/* 5. Selected Work */}
      <section className="section" ref={workRef}>
        <div className="container reveal">
          <SectionHeading>
            <h2 className="section-title">{workSec?.heading || "Selected Work"}</h2>
          </SectionHeading>

          <p style={{ maxWidth: '650px', color: 'var(--text-body)', fontSize: '1.1rem', marginBottom: 'var(--space-xl)', lineHeight: 1.6 }}>
            {workSec?.description || "A selection of software products, platforms, and digital experiences we've worked on."}
          </p>

          <div className="portfolio-grid">
            {selectedProjects.map((project, i) => (
              <PortfolioCard key={`proj-${project.title}-${project.image}-${i}`} {...project} index={i} />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-2xl)' }}>
            <NoiseButton href={workSec?.ctaUrl || "/portfolio"} icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
              {workSec?.ctaLabel || "View All Work"}
            </NoiseButton>
          </div>
        </div>
      </section>

      {/* 6. Featured Case Studies */}
      <section className="section" ref={caseStudiesRef}>
        <div className="container reveal">
          <SectionHeading>
            <h2 className="section-title">Case Studies</h2>
          </SectionHeading>

          <HomeCaseStudies />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-2xl)' }}>
            <NoiseButton href="/case-studies" icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
              Explore All Case Studies
            </NoiseButton>
          </div>
        </div>
      </section>

      {/* 7. How We Work */}
      <ProcessSteps />

      {/* 7. Why Ideate X */}
      <WhyUs />

      {/* 8. FAQs */}
      <FAQAccordion />

      {/* 9. Final CTA */}
      <CTABanner />
    </main>
  );
}
