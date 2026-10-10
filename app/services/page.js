"use client";

import { useState } from 'react';
import SmartImg from '../../components/SmartImg';
import Link from 'next/link';
import PageHero from '../../components/PageHero/PageHero';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ProcessSteps from '../../components/ProcessSteps/ProcessSteps';
import CTABanner from '../../components/CTABanner/CTABanner';
import FAQAccordion from '../../components/FAQAccordion/FAQAccordion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import {
  Bot, Cloud, Globe, Smartphone,
  Cpu, TrendingUp, Megaphone, Server, Compass,
  Terminal, MessageSquare, ArrowRight
} from 'lucide-react';
import { SERVICES_DATA } from '../../constants/servicesData';
import { useCMSData } from '../../lib/cms-client';
import '../../components/ServiceCard/ServicesZigZag.css';

const ICON_MAP = {
  Bot,
  Cloud,
  Globe,
  Smartphone,
  Cpu,
  TrendingUp,
  Megaphone,
  Server,
  Compass,
  Terminal,
  MessageSquare,
};

// Fallback services generated directly from centralized SERVICES_DATA
const defaultServicesList = Object.values(SERVICES_DATA).map((s) => ({
  slug: s.slug,
  category: s.category || 'Engineering',
  icon: typeof s.icon === 'function' ? s.icon : (ICON_MAP[s.iconName] || Bot),
  title: s.title,
  tagline: s.tagline || s.heroDescription,
  description: s.heroDescription || s.tagline,
  image: (typeof s.image === 'object' ? s.image?.src : s.image) || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&h=650&auto=format&q=80&fit=crop',
  imageAlt: (typeof s.image === 'object' ? s.image?.alt : s.title) || s.title,
  tags: s.deliverables ? s.deliverables.map((d) => d.title).slice(0, 4) : ['Production Engineering', 'Scalable Architecture'],
}));

const PILLARS = [
  {
    key: 'development',
    heading: 'Technology Built Around Your Business.',
    description: 'Develop applications, digital products and connected systems that solve practical problems and support the way your business operates.',
  },
  {
    key: 'marketing',
    heading: 'Be Easier to Find. Harder to Forget.',
    description: 'Improve search visibility, build brand awareness and engage the right audience, then strengthen how your marketing performs.',
  },
  {
    key: 'creative',
    heading: 'Give Your Brand Something to Say.',
    description: 'Create stronger first impressions through product photography, carefully edited video and promotional content.',
  },
];

export default function Services() {
  const mainRef = useScrollReveal();

  const cms = useCMSData();
  const dynamicServices = cms.services || [];

  const allServices = (dynamicServices && dynamicServices.length > 0)
    ? dynamicServices.map((s, idx) => {
        const fallback = defaultServicesList.find((def) => def.slug === s.slug) || defaultServicesList[idx % defaultServicesList.length] || {};
        const iconComp = typeof s.icon === 'function' ? s.icon : (ICON_MAP[s.iconName] || fallback.icon || Bot);
        return {
          slug: s.slug,
          pillar: s.pillar || 'development',
          hidden: s.showInOverview === false,
          category: s.category || fallback.category || 'Engineering',
          icon: iconComp,
          title: s.title || fallback.title,
          tagline: s.tagline || s.shortDescription || fallback.tagline,
          description: s.shortDescription || s.heroDescription || s.tagline || fallback.description,
          image: (typeof s.image === 'object' ? s.image?.src : s.image) || fallback.image,
          imageAlt: (typeof s.image === 'object' ? s.image?.alt : s.title) || fallback.imageAlt,
          tags: (s.tags && s.tags.length > 0) ? s.tags : (s.deliverables ? s.deliverables.map((d) => d.title).slice(0, 4) : fallback.tags),
        };
      })
    : defaultServicesList;

  const visibleServices = allServices.filter((s) => !s.hidden);

  return (
    <main className="services-page">
      <PageHero 
        breadcrumb={[{ path: '/', label: 'Home' }, { label: 'Services' }]}
        title={<>Everything Starts With <span className="accent">a Clear Purpose.</span></>}
        subtitle="From creating brand content to growing your online presence and developing custom technology, we bring together the services businesses need to move forward."
        backgroundImage="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920&h=1080&auto=format&q=85&fit=crop"
        widget={
          <div className="hero-widget-glass" style={{ width: '300px', maxWidth: '100%', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff', margin: 0, lineHeight: 1.4 }}>
              Create. Grow. Build.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.5 }}>
              Creative production, digital marketing and development, working together from the first idea to the finished work.
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
              <span style={{ fontSize: '0.75rem', padding: '3px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--text-muted)' }}>Create</span>
              <span style={{ fontSize: '0.75rem', padding: '3px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--text-muted)' }}>Grow</span>
              <span style={{ fontSize: '0.75rem', padding: '3px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--text-muted)' }}>Build</span>
            </div>
          </div>
        }
      />

      {/* Services List Section */}
      <section className="section" ref={mainRef}>
        <div className="container visible reveal">
          {PILLARS.map((pillar) => {
            const group = visibleServices.filter((svc) => svc.pillar === pillar.key);
            if (group.length === 0) return null;
            return (
              <div key={pillar.key} id={pillar.key} style={{ scrollMarginTop: '110px', marginBottom: 'clamp(64px, 9vw, 112px)' }}>
                <SectionHeading>
                  <h2 className="section-title">{pillar.heading}</h2>
                </SectionHeading>

                <p style={{ maxWidth: '680px', color: 'var(--text-body)', fontSize: '1.1rem', marginBottom: 'var(--space-xl)', lineHeight: 1.6 }}>
                  {pillar.description}
                </p>

            <div className="services-zigzag-list is-compact">
              {group.map((service, index) => {
                const isReversed = index % 2 === 1;

                return (
                  <article
                    key={`${service.slug}-${index}`}
                    className={`service-zigzag-card ${isReversed ? 'is-reversed' : ''}`}
                  >
                    {/* Content Side */}
                    <div className="service-zigzag-content">
                      <h3 className="service-zigzag-title">
                        <Link href={`/services/${service.slug}`}>
                          {service.title}
                        </Link>
                      </h3>

                      <p className="service-zigzag-tagline">
                        {service.tagline}
                      </p>

                      <p className="service-zigzag-desc">
                        {service.description}
                      </p>

                      {service.tags && service.tags.length > 0 && (
                        <div className="service-zigzag-tags">
                          {service.tags.map((tag) => (
                            <span key={tag} className="service-zigzag-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="service-zigzag-action">
                        <Link href={`/services/${service.slug}`} className="service-zigzag-btn">
                          <span>Explore Service</span>
                          <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                    {/* Media / Image Side */}
                    <div className="service-zigzag-media">
                      <SmartImg sizes="(max-width: 900px) 100vw, 560px"
                        src={service.image}
                        alt={service.imageAlt || service.title}
                        className="service-zigzag-img"
                        loading="lazy"
                      />
                      <div className="service-zigzag-media-overlay" />
                    </div>
                  </article>
                );
              })}
            </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How We Work Process */}
      <ProcessSteps />

      {/* FAQ */}
      <FAQAccordion />

      {/* Final CTA */}
      <CTABanner />
    </main>
  );
}
