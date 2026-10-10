import { notFound } from 'next/navigation';
import SmartImg from '../../../components/SmartImg';
import Link from 'next/link';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import SpotlightCard from '../../../components/SpotlightCard/SpotlightCard';
import FAQAccordion from '../../../components/FAQAccordion/FAQAccordion';
import CTABanner from '../../../components/CTABanner/CTABanner';
import { NoiseButton } from '../../../components/ui/NoiseButton';
import { GlowingEffect } from '../../../components/ui/glowing-effect';
import { SERVICES_DATA } from '../../../constants/servicesData';
import JsonLd from '../../../components/JsonLd';
import { breadcrumbJsonLd, faqJsonLd } from '../../../lib/schema';
import { getServerServiceBySlug, getServerServices, getSiteBase, buildMetadata } from '../../../lib/cms-server';
import { TechIcon, TechCategoryIcon } from '../../../components/TechIcon/TechIcon';
import TechStackDock from '../../../components/TechStackDock/TechStackDock';
import {
  Bot, Cloud, Globe, Smartphone,
  Cpu, Megaphone, Server, Compass,
  ArrowRight, CheckCircle2, ShieldCheck, ArrowUpRight
} from 'lucide-react';
import './service-detail.css';

// Pre-render all service slugs at build time
export function generateStaticParams() {
  const cmsServices = getServerServices();
  const slugs = cmsServices.length > 0 ? cmsServices.map((s) => s.slug) : Object.keys(SERVICES_DATA);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cmsService = getServerServiceBySlug(slug);
  const service = cmsService || (getServerServices().length === 0 ? SERVICES_DATA[slug] : null);

  if (!service) {
    return {
      title: 'Service Not Found — Ideate X',
    };
  }

  return buildMetadata({
    title: service.seoTitle || `${service.title} — Ideate X`,
    description: service.seoDescription || service.heroDescription || service.tagline,
    path: `/services/${slug}`,
    image: service.ogImage || (typeof service.image === 'object' ? service.image?.src : service.image),
    canonical: service.canonicalUrl,
  });
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const cmsService = getServerServiceBySlug(slug);
  const service = cmsService || (getServerServices().length === 0 ? SERVICES_DATA[slug] : null);

  if (!service) {
    notFound();
  }

  const IconComponent = typeof service.icon === 'function' ? service.icon : Bot;

  const base = getSiteBase();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seoDescription || service.heroDescription || service.tagline,
    url: `${base}/services/${slug}`,
    provider: { '@type': 'Organization', name: 'Ideate X', url: base },
    areaServed: { '@type': 'City', name: 'Chennai' },
  };

  return (
    <main className="service-detail-page">
      <JsonLd data={breadcrumbJsonLd(base, [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: service.title, path: `/services/${slug}` }])} />
      <JsonLd data={faqJsonLd(service.faqs)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      {/* 1. Full-Width Hero Banner with Stock Photography Background */}
      <section className="service-hero-banner">
        <div className="service-hero-banner-bg">
          <SmartImg
            priority
            sizes="100vw"
            src={typeof service.image === 'object' ? service.image?.src : service.image}
            alt={typeof service.image === 'object' ? (service.image?.alt || service.title) : service.title}
            className="service-hero-banner-img"
          />
          <div className="service-hero-banner-overlay" />
          <div className="service-hero-banner-gradient-top" />
          <div className="service-hero-banner-gradient-bottom" />
        </div>

        <div className="container service-hero-banner-content">
          <Breadcrumb
            items={[
              { path: '/', label: 'Home' },
              { path: '/services', label: 'Services' },
              { label: service.title },
            ]}
          />

          <h1 className="service-hero-title">
            {service.heroHeading ? (
              <>
                {service.heroHeading.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="accent">{service.heroHeading.split(' ').slice(-2).join(' ')}</span>
              </>
            ) : (
              <>
                {service.title.split(' ')[0]}{' '}
                <span className="accent">
                  {service.title.split(' ').slice(1).join(' ')}
                </span>
              </>
            )}
          </h1>

          <p className="service-hero-description">
            {service.heroDescription}
          </p>

          <div className="service-hero-actions">
            <NoiseButton href="/contact" icon={<ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
              {service.ctaLabel || 'Start This Project'}
            </NoiseButton>
            <a href={service.secondaryCtaHref || '#overview'} className="service-hero-secondary-btn">
              <span>{service.secondaryCtaLabel || 'See the Details'}</span>
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Executive Overview & Problem/Solution */}
      <section id="overview" className="section">
        <div className="container">
          <SectionHeading>
            <h2 className="section-title">How We Approach It</h2>
          </SectionHeading>

          <div className="service-overview-grid">
            <div className="service-overview-text">
              <h3>{service.overview.headline}</h3>
              <p>{service.overview.body}</p>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <NoiseButton href="/contact" icon={<ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
                  {service.ctaLabel || 'Talk to Us'}
                </NoiseButton>
              </div>
            </div>

            <div className="service-highlights-card">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="service-highlights-title">
                <ShieldCheck size={18} strokeWidth={1.75} color="var(--accent)" aria-hidden="true" />
                <span>What You Can Count On</span>
              </div>
              <ul className="service-highlights-list">
                {service.overview.highlights.map((highlight, index) => (
                  <li key={index} className="service-highlight-item">
                    <CheckCircle2 size={16} strokeWidth={1.75} aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Deliverables (Rich Zig-Zag Specifications) */}
      <section className="section deliverables-zigzag-section">
        <div className="container">
          <SectionHeading>
            <h2 className="section-title">What You Get</h2>
          </SectionHeading>
          <p style={{ maxWidth: '680px', color: 'var(--text-body)', fontSize: '1.05rem', marginBottom: 'var(--space-2xl)', lineHeight: 1.6 }}>
            What is included in this service, and what you can expect from it.
          </p>

          <div className="deliverables-zigzag-container">
            {service.deliverables.map((item, idx) => {
              const isReversed = idx % 2 === 1;

              return (
                <article
                  key={`${item.title}-${idx}`}
                  className={`deliverable-zigzag-card ${isReversed ? 'is-reversed' : ''}`}
                >
                  {/* Content Column */}
                  <div className="deliverable-zigzag-content">
                    <h3 className="deliverable-zigzag-title">{item.title}</h3>
                    {item.tagline && (
                      <p className="deliverable-zigzag-tagline">{item.tagline}</p>
                    )}
                    <p className="deliverable-zigzag-desc">{item.description}</p>

                    <ul className="deliverable-points-grid">
                      {(item.points || []).map((pt, pIdx) => (
                        <li key={pIdx} className="deliverable-point-item">
                          <CheckCircle2 size={16} strokeWidth={2} color="var(--accent)" aria-hidden="true" className="deliverable-point-icon" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {item.tags && item.tags.length > 0 && (
                      <div className="deliverable-tags-row">
                        {item.tags.map((tag) => (
                          <span key={tag} className="deliverable-tech-chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Media / Visual Showcase Column */}
                  <div className="deliverable-zigzag-visual">
                    <div className="deliverable-visual-card">
                      <img
                        src={item.image || (typeof service.image === 'object' ? service.image?.src : service.image) || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&h=650&auto=format&q=80&fit=crop"}
                        alt={item.title}
                        className="deliverable-visual-img"
                        loading="lazy"
                      />
                      <div className="deliverable-visual-overlay" />
                      <div className="deliverable-visual-footer">
                        <div className="deliverable-visual-icon-box">
                          <IconComponent size={18} strokeWidth={2} aria-hidden="true" />
                        </div>
                        <div className="deliverable-visual-meta">
                          <span className="deliverable-meta-title">{item.title}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Tech Stack & Frameworks Interactive ToolDock */}
      {service.techStack && service.techStack.length > 0 && (      <section className="section tech-stack-section">
          <div className="container">
            <SectionHeading>
              <h2 className="section-title">Our Tech Toolbox</h2>
            </SectionHeading>
            <p style={{ maxWidth: '650px', color: 'var(--text-body)', fontSize: '1.05rem', marginBottom: 'var(--space-xl)', lineHeight: 1.6 }}>
              Battle-tested, modern technologies selected for performance, maintainability, and scale.
            </p>
  
            <TechStackDock 
              techStack={service.techStack} 
              title={service.title} 
            />
  
            <div className="tech-stack-cta-bar" style={{ marginTop: 'var(--space-2xl)' }}>
              <div className="tech-stack-cta-info">
                <span className="tech-stack-cta-label">Built to Fit Your Size</span>
                <p className="tech-stack-cta-desc">
                  Have specific hosting or compliance needs? We fit in with the tools and workflows you already use.
                </p>
              </div>
              <NoiseButton href="/contact" icon={<ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
                Discuss Custom Stack
              </NoiseButton>
            </div>
          </div>
        </section>
      )}

      {/* 5. Phased Execution Roadmap */}
      <section className="section">
        <div className="container">
          <SectionHeading>
            <h2 className="section-title">How It Comes Together</h2>
          </SectionHeading>
          <p style={{ maxWidth: '650px', color: 'var(--text-body)', fontSize: '1.05rem', marginBottom: 'var(--space-xl)', lineHeight: 1.6 }}>
            A clear path from the first conversation to the final delivery.
          </p>

          <div className="service-roadmap-flow">
            {service.process.map((step, idx) => (
              <div key={idx} className="service-roadmap-item">
                <div className="service-roadmap-node">
                  <div className="service-roadmap-dot" />
                </div>
                <div className="service-roadmap-content">
                  <h3 className="service-roadmap-title">{step.title}</h3>
                  <p className="service-roadmap-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Service-Specific FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <FAQAccordion
          faqs={service.faqs}
          title={`${service.title} FAQs`}
          subtitle={`Straight answers about timelines, scope and how we work on ${service.title.toLowerCase()}.`}
        />
      )}

      {/* 7. Related Services Navigator */}
      {service.related && service.related.length > 0 && (
        <section className="related-services-section">
          <div className="container">
            <SectionHeading>
              <h2 className="section-title">Services That Work Well Together</h2>
            </SectionHeading>

            <div className="related-services-grid">
              {service.related.map((relSlug) => {
                const relService = getServerServiceBySlug(relSlug) || (getServerServices().length === 0 ? SERVICES_DATA[relSlug] : null);
                if (!relService) return null;
                const RelIcon = typeof relService.icon === 'function' ? relService.icon : Bot;

                return (
                  <Link key={relSlug} href={`/services/${relSlug}`} className="related-service-card">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                          <RelIcon size={16} strokeWidth={1.75} aria-hidden="true" />
                        </div>
                      </div>
                      <h4>{relService.title}</h4>
                      <p>{relService.tagline}</p>
                    </div>

                    <div className="related-service-link-text">
                      <span>See this service</span>
                      <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. Final Call to Action */}
      <CTABanner
        title={service.closingHeading || `Ready to talk about ${service.title}?`}
        subtitle={service.closingText || "Tell us what you have in mind and we will discuss the right way forward."}
        primaryBtnText={service.closingCta || "Start a Project"}
        primaryBtnHref="/contact"
        secondaryBtnText="Explore All Services"
        secondaryBtnHref="/services"
      />
    </main>
  );
}
