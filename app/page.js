"use client";

import Hero from '../components/Hero/Hero';
import dynamic from 'next/dynamic';
import { useCMSData } from '../lib/cms-client';
import SectionHeading from '../components/SectionHeading/SectionHeading';
import VerticalTabs from '../components/ui/vertical-tabs';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';
import { NoiseButton } from '../components/ui/NoiseButton';

// Below-the-fold sections load as separate chunks so the first screen becomes interactive sooner
const WhyUs = dynamic(() => import('../components/WhyUs/WhyUs'));
const HomeCaseStudies = dynamic(() => import('../components/HomeCaseStudies/HomeCaseStudies'));
const FAQAccordion = dynamic(() => import('../components/FAQAccordion/FAQAccordion'));
const CTABanner = dynamic(() => import('../components/CTABanner/CTABanner'));
const ProjectShowcase = dynamic(() => import('../components/ui/project-showcase'));
const TechOrbit = dynamic(() => import('../components/TechOrbit/TechOrbit'));
const LogoCloudSwap = dynamic(() => import('../components/ui/logo-cloud-swap'));


const PILLAR_TABS = [
  {
    id: "development",
    name: "Software, AI & Product Development",
    imageAlt: "Code on a developer screen",
    title: "Build What Your Business Needs Next.",
    description:
      "From custom applications and SaaS products to AI agents, automation and connected systems, we develop technology around real business requirements.",
    items: ["AI Agentic Development", "Workflow Automations", "Chatbot Development", "Custom Apps Development", "Mobile Apps Development", "Web Development", "SaaS Development", "API Integrations"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=1100&auto=format&q=80&fit=crop",
    link: "/services#development",
    ctaLabel: "Explore Development Services",
  },
  {
    id: "marketing",
    name: "Digital Marketing & Growth",
    imageAlt: "Social media marketing on a laptop and phone",
    title: "Get Seen by the Right People.",
    description:
      "We help businesses improve search visibility, build brand awareness and engage relevant audiences, and strengthen marketing performance and conversion opportunities.",
    items: ["Search Engine Optimization", "Ad Campaigns & Brand Engagement", "Growth Marketing & Conversion Optimization"],
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=900&h=1100&auto=format&q=80&fit=crop",
    link: "/services#marketing",
    ctaLabel: "Explore Digital Marketing",
  },
  {
    id: "creative",
    name: "Creative Production",
    imageAlt: "Photographer with a camera",
    title: "Make Your Brand Worth a Closer Look.",
    description:
      "From product photography to polished video content, we create visuals that give your brand a clearer voice and a stronger presence.",
    items: ["Product Photography & Shoots", "Video Editing & Post-Production", "Commercial & Promotional Videos"],
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&h=1100&auto=format&q=80&fit=crop",
    link: "/services#creative",
    ctaLabel: "Explore Creative Production",
  },
];

const defaultProjects = [
  {
    title: 'CSAVA',
    category: 'SAAS & PLATFORMS',
    description: 'A member and community platform for the Chartered Surveyors and Valuers Association, handling profiles, events and resources in one secure portal.',
    tags: ['Next.js', 'PostgreSQL', 'Supabase'],
    image: '/clients/CSAVA.png',
    link: 'https://csava.org',
  },
  {
    title: 'Keyo',
    category: 'MOBILE APPS & PWA',
    description: 'A progressive web app for smart key and access management, installable on any phone with real-time sync and offline support.',
    tags: ['Next.js', 'Prisma', 'Firebase', 'PWA'],
    image: '/clients/project-keyo.jpeg',
    link: 'https://keyo.co.in/en',
  },
  {
    title: 'SBE Builders',
    category: 'ENTERPRISE WEB PLATFORM',
    description: 'A corporate web platform for a construction firm, showcasing projects and capabilities with fast pages and clear enquiry paths.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    image: '/clients/SBEBuilders.png',
    link: 'https://sbebuilders.in',
  },
  {
    title: 'Sami V Landmarks',
    category: 'WEB APPLICATIONS',
    description: 'An interactive real estate site that presents plots and layouts with rich visuals, so buyers can explore and enquire easily.',
    tags: ['React', 'Next.js', 'Interactive UI'],
    image: '/clients/project-samivlandmarks.jpeg',
    link: 'https://samivlandmarks.in',
  },
  {
    title: 'Tifbox',
    category: 'MOBILE APPS & FOODTECH',
    description: 'A food-tech app for tiffin subscriptions, with meal plans, order tracking and WhatsApp-based updates for customers.',
    tags: ['React Native', 'PWA', 'PostgreSQL', 'WhatsApp API'],
    image: '/clients/project-tifbox.jpeg',
    link: 'https://tifboxmeals.com',
  },
  {
    title: 'Vevy.One',
    category: 'SAAS PLATFORM',
    description: 'A multi-tenant SaaS platform that brings vendor workflows, data and dashboards into a single product.',
    tags: ['Next.js', 'Prisma', 'PostgreSQL'],
    image: '/clients/Vevy.One.png',
    link: 'https://vevyone.netlify.app',
  },
  {
    title: 'Srinivas Packaging',
    category: 'MANUFACTURING & B2B',
    description: 'A B2B portal for a packaging manufacturer, with a searchable product catalogue and a quote request engine.',
    tags: ['Next.js', 'B2B Portal', 'Product Catalogue', 'Quote Engine'],
    image: '/clients/project-srinivaspackaging.jpeg',
    link: 'https://srinivaspackaging.in',
  },
];

export default function Home() {
  const capabilitiesRef = useScrollReveal();
  const workRef = useScrollReveal();
  const caseStudiesRef = useScrollReveal();

  const cms = useCMSData();
  const dynamicWork = cms.workItems || [];
  const sections = cms.sections || [];

  // A section is shown unless the admin explicitly disabled it
  const isOn = (key) => sections.find((s) => s.sectionKey === key)?.enabled !== false;

  const heroSec = sections.find((s) => s.sectionKey === 'hero');
  const capabilitiesSec = sections.find((s) => s.sectionKey === 'capabilities');
  const workSec = sections.find((s) => s.sectionKey === 'selected_work');

  // The three service pillars shown in the capabilities tabs
  const capabilitiesList = PILLAR_TABS;

  const caseStudiesList = (cms.caseStudies || []).map((c, idx) => ({
    id: c.number || String(idx + 1).padStart(2, '0'),
    client: c.client,
    category: c.category,
    title: c.title,
    description: c.subtitle || c.summary,
    slug: c.slug,
    link: `/case-studies/${c.slug}`,
    image: c.image || c.coverBanner,
  }));

  const selectedProjects = dynamicWork.length > 0 ? dynamicWork.map((w, idx) => ({
    title: w.title,
    category: w.category,
    description: w.description || defaultProjects.find((d) => d.title === w.title)?.description,
    tags: w.tags || ['Next.js', 'React'],
    image: w.image || defaultProjects[idx % defaultProjects.length].image,
    link: w.liveUrl || defaultProjects[idx % defaultProjects.length].link,
  })) : defaultProjects;

  const showcaseItems = selectedProjects.map((p) => ({
    name: p.title,
    designation: p.category,
    quote: p.description || '',
    tags: p.tags,
    src: p.image,
    link: p.link,
  }));

  return (
    <main>
      {/* 1. Hero Section */}
      <Hero 
        title={heroSec?.heading}
        subtitle={heroSec?.subheading}
        primaryCtaText={heroSec?.ctaPrimaryLabel}
        secondaryCtaText={heroSec?.ctaSecondaryLabel}
        primaryCtaUrl={heroSec?.ctaPrimaryUrl}
        secondaryCtaUrl={heroSec?.ctaSecondaryUrl}
      />


      {/* 3. Capabilities Overview ("What We Do") */}
      <section className="section" ref={capabilitiesRef}>
        <div className="container reveal">
          <SectionHeading>
            <h2 className="section-title">{capabilitiesSec?.heading || "Create. Grow. Build."}</h2>
          </SectionHeading>

          <p style={{ maxWidth: '650px', color: 'var(--text-body)', fontSize: '1.1rem', marginBottom: 'var(--space-2xl)', lineHeight: 1.6 }}>
            {capabilitiesSec?.description || "Three ways we help businesses move forward, from the first creative idea to stronger digital visibility and the technology behind it."}
          </p>

          <VerticalTabs services={capabilitiesList} />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-2xl)' }}>
            <NoiseButton href={capabilitiesSec?.ctaUrl || "/services"} icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
              {capabilitiesSec?.ctaLabel || "Explore Our Services"}
            </NoiseButton>
          </div>
        </div>
      </section>

      {/* 4. Tools and Technologies */}
      {isOn('tech_cloud') && <TechOrbit />}

      {/* 5. Selected Work */}
      <section className="section" ref={workRef}>
        <div className="container reveal">
          <SectionHeading>
            <h2 className="section-title">{workSec?.heading || "Work That Speaks for Itself."}</h2>
          </SectionHeading>

          <p style={{ maxWidth: '650px', color: 'var(--text-body)', fontSize: '1.1rem', marginBottom: 'var(--space-xl)', lineHeight: 1.6 }}>
            {workSec?.description || "Explore the creative projects, digital experiences and platforms we've worked on."}
          </p>

          <ProjectShowcase testimonials={showcaseItems} />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-2xl)' }}>
            <NoiseButton href={workSec?.ctaUrl || "/portfolio"} icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
              {workSec?.ctaLabel || "View All Work"}
            </NoiseButton>
          </div>
        </div>
      </section>

      {/* 5b. Client logos */}
      <LogoCloudSwap />

      {/* 6. Featured Case Studies */}
      <section className="section" ref={caseStudiesRef}>
        <div className="container reveal">
          <SectionHeading>
            <h2 className="section-title">The Thinking Behind the Work.</h2>
          </SectionHeading>

          {caseStudiesList.length > 0 ? <HomeCaseStudies studies={caseStudiesList.slice(0, 6)} /> : <HomeCaseStudies />}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-2xl)' }}>
            <NoiseButton href="/case-studies" icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
              Explore All Case Studies
            </NoiseButton>
          </div>
        </div>
      </section>

      {/* 7. Why Ideate X */}
      {isOn('why_us') && <WhyUs />}

      {/* 8. FAQs */}
      {isOn('faqs') && <FAQAccordion />}

      {/* 9. Final CTA */}
      {isOn('cta') && <CTABanner />}
    </main>
  );
}
