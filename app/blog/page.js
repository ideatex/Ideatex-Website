"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import PageHero from '../../components/PageHero/PageHero';
import { GlowingEffect } from '../../components/ui/glowing-effect';
import { BLOG_POSTS } from '../../constants/blogData';
import { useCMSData } from '../../lib/cms-client';

const categories = ['All', 'ENGINEERING', 'DESIGN', 'AI & AUTOMATION', 'GROWTH', 'PERFORMANCE'];

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');
  const ref = useScrollReveal();

  const cms = useCMSData();
  const dynamicPosts = cms.insights || [];
  const allPosts = dynamicPosts.length > 0
    ? dynamicPosts.map((p, idx) => ({
        id: p.id || idx + 1,
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        excerpt: p.excerpt || p.subtitle,
        category: (p.category || 'ENGINEERING').toUpperCase(),
        date: p.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: p.readTime || '5 min read',
        featured: p.featured || idx === 0,
        image: p.image || (BLOG_POSTS[idx % BLOG_POSTS.length] || {}).image,
        author: p.author || { name: 'Ideate X Team', role: 'Systems Architect', initials: 'IX' },
        tags: p.tags || ['Engineering'],
      }))
    : BLOG_POSTS;

  const featured = allPosts.filter((p) => p.featured);
  const filtered =
    activeFilter === 'All'
      ? allPosts
      : allPosts.filter((p) => p.category === activeFilter.toUpperCase());

  return (
    <main className="blog-page">
      <PageHero
        breadcrumb={[
          { path: '/', label: 'Home' },
          { path: '/blog', label: 'Insights' },
        ]}
        title={
          <>
            Ideas worth <span className="accent">putting to work.</span>
          </>
        }
        subtitle="Practical thoughts on software, AI agents, automation, product development, technology, and digital growth."
        backgroundImage="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080&auto=format&q=80&fit=crop"
        widget={
          <div
            className="hero-widget-glass"
            style={{ width: '300px', padding: '1.25rem' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <BookOpen size={18} strokeWidth={1.75} aria-hidden="true" color="var(--accent)" />
              <p
                style={{
                  margin: 0,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#ffffff',
                }}
              >
                Engineering Notes
              </p>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '0.85rem',
                color: 'var(--text-body)',
                lineHeight: 1.5,
              }}
            >
              Articles written by the engineers and designers building products at Ideate X.
            </p>
          </div>
        }
      />

      {/* Featured Section */}
      <section className="section blog-featured">
        <div className="container">
          <SectionHeading>
            <h2 className="section-title">Featured Articles</h2>
          </SectionHeading>

          <div className="blog-featured-grid">
            {featured.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <article className="blog-card featured">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <div className="blog-card-image">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-card-category">{post.category}</span>
                      <span className="blog-card-date">{post.date}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="blog-card-read-time">
                        <Clock size={14} strokeWidth={1.75} aria-hidden="true" /> {post.readTime}
                      </span>
                      <span className="blog-card-link">
                        Read Article <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles Section */}
      <section className="section" ref={ref}>
        <div className="container reveal">
          <SectionHeading>
            <h2 className="section-title">All Insights</h2>
          </SectionHeading>

          <div className="blog-filters">
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

          <div className="blog-grid">
            <AnimatePresence>
              {filtered.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                  >
                    <article className="blog-card">
                      <GlowingEffect
                        spread={35}
                        glow={true}
                        disabled={false}
                        proximity={60}
                        inactiveZone={0.01}
                      />
                      <div className="blog-card-image small">
                        <img
                          src={post.image}
                          alt={post.title}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="blog-card-content">
                        <div className="blog-card-meta">
                          <span className="blog-card-category">
                            {post.category}
                          </span>
                          <span className="blog-card-date">{post.date}</span>
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <div className="blog-card-footer">
                          <span className="blog-card-read-time">
                            <Clock size={14} strokeWidth={1.75} aria-hidden="true" /> {post.readTime}
                          </span>
                          <span className="blog-card-link">
                            Read Article <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}
