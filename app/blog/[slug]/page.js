import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import CTABanner from '../../../components/CTABanner/CTABanner';
import {
  BLOG_POSTS,
  getBlogPostBySlug,
  getAllBlogPostSlugs,
  getRelatedBlogPosts,
} from '../../../constants/blogData';
import {
  getServerInsightBySlug,
  getServerInsights,
} from '../../../lib/cms-server';
import '../../../styles/blog-detail.css';

export async function generateStaticParams() {
  const cmsInsights = getServerInsights();
  if (cmsInsights && cmsInsights.length > 0) {
    return cmsInsights.map((i) => ({ slug: i.slug }));
  }
  return getAllBlogPostSlugs();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cmsPost = getServerInsightBySlug(slug);
  const post = cmsPost || getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found — Ideate X',
    };
  }

  return {
    title: post.seoTitle || `${post.title} — Technical Insights | Ideate X`,
    description: post.seoDescription || post.subtitle || post.excerpt,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const cmsPost = getServerInsightBySlug(slug);
  const post = cmsPost || getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getServerInsights().length > 0 ? getServerInsights() : BLOG_POSTS;
  const relatedPosts = allPosts.filter((p) => p.slug !== slug && (p.category === post.category || true)).slice(0, 2);

  const authorName = typeof post.author === 'object' ? (post.author?.name || 'Ideate X Team') : (post.author || 'Ideate X Team');
  const authorRole = typeof post.author === 'object' ? (post.author?.role || 'Technical Architecture') : 'Technical Architecture';
  const authorAvatar = typeof post.author === 'object' ? post.author?.avatar : null;
  const authorInitials = typeof post.author === 'object' ? (post.author?.initials || 'IX') : 'IX';

  const sections = Array.isArray(post.sections) && post.sections.length > 0 ? post.sections : (
    post.content ? [{
      id: 'sec-overview',
      heading: 'Overview & Technical Analysis',
      content: typeof post.content === 'string' ? post.content.split('\n\n') : [String(post.content)]
    }] : []
  );

  return (
    <main className="blog-detail-page">
      {/* ── Hero Section ── */}
      <section className="blog-detail-hero">
        <div className="blog-detail-hero-glow" />

        <div className="container blog-detail-hero-inner">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Technical Insights', path: '/blog' },
              { label: post.title, path: `/blog/${post.slug}` },
            ]}
          />

          <Link href="/blog" className="blog-back-link">
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" /> Back to all Insights
          </Link>

          <div className="blog-detail-meta-row">
            <span className="blog-detail-category-badge">{post.category}</span>
            <div className="blog-detail-meta-item">
              <Calendar size={14} strokeWidth={1.75} aria-hidden="true" />
              <span>{post.date}</span>
            </div>
            <span className="blog-detail-meta-dot">&bull;</span>
            <div className="blog-detail-meta-item">
              <Clock size={14} strokeWidth={1.75} aria-hidden="true" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="blog-detail-title">{post.title}</h1>
          <p className="blog-detail-subtitle">{post.subtitle || post.excerpt}</p>

          {/* Author bar */}
          <div className="blog-author-bar">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={authorName}
                className="blog-author-avatar"
              />
            ) : (
              <div className="blog-author-avatar-fallback">
                {authorInitials}
              </div>
            )}
            <div className="blog-author-info">
              <span className="blog-author-name">{authorName}</span>
              <span className="blog-author-role">{authorRole}</span>
            </div>
          </div>
        </div>

        {/* Featured Banner Image */}
        <div className="container">
          <div className="blog-detail-banner-wrap">
            <img
              src={post.image}
              alt={post.title}
              className="blog-detail-banner-img"
            />
          </div>
        </div>
      </section>

      {/* ── Main Layout: Article + Sidebar ── */}
      <section className="container">
        <div className="blog-detail-layout">
          {/* Article Main Content */}
          <article className="blog-article-content">
            {sections.map((section, sIdx) => (
              <section
                key={section.id || sIdx}
                id={section.id}
                className="blog-article-section"
              >
                <h2>{section.heading}</h2>

                {section.content && Array.isArray(section.content) ? (
                  section.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))
                ) : section.content ? (
                  <p>{section.content}</p>
                ) : null}

                {section.callout && (
                  <div className="blog-callout-box">
                    <p>{section.callout}</p>
                  </div>
                )}

                {section.codeSnippet && (
                  <div className="blog-code-card">
                    <div className="blog-code-header">
                      <span className="blog-code-title">
                        {section.codeSnippet.title || 'Code Snippet'}
                      </span>
                      <span className="blog-code-lang">
                        {section.codeSnippet.language}
                      </span>
                    </div>
                    <pre className="blog-code-body">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {section.bulletPoints && (
                  <ul className="blog-bullet-list">
                    {section.bulletPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="blog-bullet-item">
                        <CheckCircle2
                          size={18}
                          strokeWidth={1.75}
                          aria-hidden="true"
                          className="blog-bullet-icon"
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Tags footer */}
            {post.tags && post.tags.length > 0 && (
              <div className="blog-tags-bar">
                <span className="blog-tags-label">Topics:</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Sticky Sidebar */}
          <aside className="blog-sidebar">
            {/* Table of Contents */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="blog-sidebar-card">
                <h3 className="blog-sidebar-title">Table of Contents</h3>
                <ul className="blog-toc-list">
                  {post.tableOfContents.map((toc) => (
                    <li key={toc.id}>
                      <a href={`#${toc.id}`} className="blog-toc-link">
                        {toc.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Author Profile */}
            <div className="blog-sidebar-card">
              <h3 className="blog-sidebar-title">Written By</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {authorAvatar ? (
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="blog-author-avatar"
                    style={{ width: '42px', height: '42px' }}
                  />
                ) : (
                  <div
                    className="blog-author-avatar-fallback"
                    style={{ width: '42px', height: '42px' }}
                  >
                    {authorInitials}
                  </div>
                )}
                <div>
                  <div className="blog-author-name">{authorName}</div>
                  <div className="blog-author-role">{authorRole}</div>
                </div>
              </div>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Building software architecture and high-performance digital products at Ideate X.
              </p>
            </div>

            {/* Work With Us CTA */}
            <div className="blog-sidebar-cta">
              <h4>Build with Ideate X</h4>
              <p>
                Need help engineering your SaaS platform, AI agent workflow, or custom web application?
              </p>
              <Link href="/contact" className="blog-sidebar-cta-btn">
                Start a Conversation <ArrowRight size={15} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>

        {/* ── Related Articles ── */}
        {relatedPosts.length > 0 && (
          <div className="blog-related-section">
            <SectionHeading label="Continue Reading">
              <h2 className="section-title">Related Insights</h2>
            </SectionHeading>

            <div className="blog-related-grid">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <article className="blog-card" style={{ height: '100%' }}>
                    <div className="blog-card-image small">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-card-meta">
                        <span className="blog-card-category">
                          {rel.category}
                        </span>
                        <span className="blog-card-date">{rel.date}</span>
                      </div>
                      <h3>{rel.title}</h3>
                      <p>{rel.excerpt}</p>
                      <div className="blog-card-footer">
                        <span className="blog-card-read-time">
                          <Clock size={14} strokeWidth={1.75} aria-hidden="true" /> {rel.readTime}
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
        )}
      </section>

      {/* ── Final CTA Banner ── */}
      <CTABanner />
    </main>
  );
}
