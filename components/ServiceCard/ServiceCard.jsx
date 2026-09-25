"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SpotlightCard from '../SpotlightCard/SpotlightCard';

export default function ServiceCard({ title, image, index }) {
  const ref = useScrollReveal();
  const num = String((index || 0) + 1).padStart(2, '0');

  return (
    <SpotlightCard className="service-card-spotlight" ref={ref} style={{ transitionDelay: `${(index || 0) * 0.08}s` }}>
      <Link href="/services" className="service-card reveal">
        <div className="service-card-thumb">
          <img src={image} alt={title} loading="lazy" />
        </div>

        <h3 className="service-card-title">{title}</h3>

        <span className="service-card-arrow-group" aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={1.75} className="service-card-arrow" />
          <ArrowUpRight size={16} strokeWidth={1.75} className="service-card-arrow" />
        </span>

        <span className="service-card-cta">GET IN TOUCH</span>
      </Link>
    </SpotlightCard>
  );
}
