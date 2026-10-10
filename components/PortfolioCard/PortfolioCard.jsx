"use client";
import React from 'react';
import SmartImg from '../SmartImg';
import { ExternalLink } from 'lucide-react';
import SpotlightCard from '../SpotlightCard/SpotlightCard';
import './PortfolioCard.css';

export default function PortfolioCard({ title, category, image, tags, link, liveUrl, index }) {
  const number = String((index || 0) + 1).padStart(2, '0');
  const targetUrl = link || liveUrl;
  const isExternal = targetUrl && (targetUrl.startsWith('http://') || targetUrl.startsWith('https://'));

  const cardInner = (
    <div className="portfolio-card visible">
      <div className="portfolio-card-image">
        {image ? (
          <SmartImg sizes="(max-width: 768px) 100vw, 600px" 
            src={image} 
            alt={title} 
            className="portfolio-card-img" 
            loading="lazy"
            decoding="async"
            width="600"
            height="338"
          />
        ) : (
          <div className="portfolio-card-placeholder" />
        )}
        {targetUrl && (
          <div className="portfolio-card-hover-overlay">
            <span className="portfolio-card-visit-badge">
              <span>Visit Website</span>
              <ExternalLink size={13} strokeWidth={2} />
            </span>
          </div>
        )}
      </div>
      <div className="portfolio-card-info" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <h3 className="portfolio-card-title" style={{ margin: 0 }}>{title}</h3>
          {targetUrl && (
            <span style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', opacity: 0.85 }}>
              <ExternalLink size={16} strokeWidth={1.75} />
            </span>
          )}
        </div>
        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.6875rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-muted)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <SpotlightCard className="portfolio-card-spotlight" style={{ transitionDelay: `${(index || 0) * 0.05}s` }}>
      {targetUrl ? (
        <a
          href={targetUrl}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          aria-label={`Visit ${title}`}
        >
          {cardInner}
        </a>
      ) : (
        cardInner
      )}
    </SpotlightCard>
  );
}
