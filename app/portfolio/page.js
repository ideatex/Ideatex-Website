"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioCard from '../../components/PortfolioCard/PortfolioCard';
import CTABanner from '../../components/CTABanner/CTABanner';
import LogoCloudSwap from '../../components/ui/logo-cloud-swap';
import FAQAccordion from '../../components/FAQAccordion/FAQAccordion';
import { PORTFOLIO_FAQS } from '../../constants/pageFaqs';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import PageHero from '../../components/PageHero/PageHero';
import { IMAGES } from '../../constants/images';

const categories = ['All', 'Web Applications', 'SaaS & Platforms', 'UI/UX Design', '3D & Interactive', 'Mobile Apps'];

const projects = [
  {
    title: 'CSAVA',
    category: 'SaaS & Platforms',
    tags: ['Next.js', 'PostgreSQL', 'Supabase', 'Multi-tenant'],
    image: '/clients/CSAVA.png',
    link: 'https://csava.org',
  },
  {
    title: 'Keyo',
    category: 'Mobile Apps',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Firebase', 'WebAPK', 'PWA'],
    image: '/clients/project-keyo.jpeg',
    link: 'https://keyo.co.in/en',
  },
  {
    title: 'SBE Builders',
    category: 'Web Applications',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Cloud Infrastructure'],
    image: '/clients/SBEBuilders.png',
    link: 'https://sbebuilders.in',
  },
  {
    title: 'Sami V Landmarks',
    category: 'Web Applications',
    tags: ['React', 'Next.js', 'Interactive UI', 'PostgreSQL'],
    image: '/clients/project-samivlandmarks.jpeg',
    link: 'https://samivlandmarks.in',
  },
  {
    title: 'Tifbox',
    category: 'Mobile Apps',
    tags: ['React Native', 'PWA', 'PostgreSQL', 'WhatsApp API'],
    image: '/clients/project-tifbox.jpeg',
    link: 'https://tifboxmeals.com',
  },
  {
    title: 'Vevy.One',
    category: 'SaaS & Platforms',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'API Gateway'],
    image: '/clients/Vevy.One.png',
    link: 'https://vevyone.netlify.app',
  },
  {
    title: 'Srinivas Packaging',
    category: 'Web Applications',
    tags: ['Next.js', 'B2B Portal', 'Product Catalogue', 'Quote Engine'],
    image: '/clients/project-srinivaspackaging.jpeg',
    link: 'https://srinivaspackaging.in',
  },
  {
    title: 'Zeep-Car Web Platform',
    category: '3D & Interactive',
    tags: ['Three.js', 'React', 'WebGL'],
    image: IMAGES.portfolio[4],
  },
  {
    title: 'SynthLab Audio Workstation',
    category: 'SaaS & Platforms',
    tags: ['SaaS', 'Web Audio', 'Next.js'],
    image: IMAGES.portfolio[4],
  },
  {
    title: 'Orbis Trading Dashboard',
    category: 'Web Applications',
    tags: ['React', 'WebSockets', 'PostgreSQL'],
    image: IMAGES.portfolio[5],
  },
  {
    title: 'MedViz Interactive Anatomy',
    category: '3D & Interactive',
    tags: ['Three.js', 'WebGL', 'WebGL 2'],
    image: IMAGES.portfolio[6],
  },
  {
    title: 'FitTrack Mobile Application',
    category: 'Mobile Apps',
    tags: ['React Native', 'iOS', 'Android'],
    image: IMAGES.portfolio[7],
  },
  {
    title: 'AutoViz 3D Configurator',
    category: '3D & Interactive',
    tags: ['Three.js', 'React', 'Shaders'],
    image: IMAGES.portfolio[9],
  },
];

import { useCMSData } from '../../lib/cms-client';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const cms = useCMSData();
  const dynamicWork = cms.workItems || [];
  const allProjects = dynamicWork.length > 0
    ? dynamicWork.map((w, idx) => ({
      title: w.title,
      category: w.category || 'Web Applications',
      tags: w.tags || ['Next.js', 'React'],
      image: w.image || projects[idx % projects.length].image,
      link: w.liveUrl || projects[idx % projects.length]?.link,
    }))
    : projects;

  const filtered = activeFilter === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase() || p.category.includes(activeFilter));

  return (
    <main className="portfolio-page">
      <PageHero
        breadcrumb={[{ path: '/', label: 'Home' }, { label: 'Work' }]}
        title={<>Work That Speaks <span className="accent">for Itself.</span></>}
        subtitle="Explore selected creative projects, digital experiences and software platforms developed around different business needs."
        backgroundImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&auto=format&q=80&fit=crop"
        widget={
          <div className="hero-widget-glass" style={{ width: '300px', padding: '1.25rem' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.4 }}>
              Real Projects
            </p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
              Creative work, digital experiences and applications built around real business needs.
            </p>
          </div>
        }
      />

      {/* Filters & Grid */}
      <section className="section">
        <div className="container">
          <SectionHeading>
            <h2 className="section-title">Featured Projects</h2>
          </SectionHeading>

          <div className="portfolio-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div className="portfolio-masonry" layout>
            <AnimatePresence>
              {filtered.map((project, i) => (
                <motion.div
                  key={`port-${project.title}-${project.image}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <PortfolioCard {...project} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <LogoCloudSwap />

      <FAQAccordion faqs={PORTFOLIO_FAQS} title="Questions About Our Work" subtitle="What clients usually ask before starting a project with us." />

      <CTABanner />
    </main>
  );
}
