"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "./HomeCaseStudies.css";

export const HOME_CASE_STUDIES = [
  {
    id: "01",
    client: "Tifbox",
    category: "FoodTech · Mobile App",
    title: "Tifbox Food Delivery Mobile App",
    description:
      "A location-aware food delivery and subscription mobile app connecting customers with verified cloud kitchens, tiffin vendors, and automated dispatch.",
    slug: "tifbox",
    link: "/case-studies/tifbox",
    image: "/case-studies/Tifbox - CS.png",
  },
  {
    id: "02",
    client: "CSAVA",
    category: "Association Management · Web Platform",
    title: "CSAVA Association Platform",
    description:
      "A centralized platform for membership, events, accreditation, billing and executive administration.",
    slug: "csava",
    link: "/case-studies/csava",
    image: "/case-studies/CSAVA - CS.png",
  },
  {
    id: "03",
    client: "Real Estate",
    category: "PropTech · Multi-Role Platform",
    title: "Real Estate Leasing & Tenancy Engine",
    description:
      "A connected property platform bringing owners, brokers, tenants and inspection teams into one transaction workflow.",
    slug: "real-estate",
    link: "/case-studies/real-estate",
    image: "/case-studies/Keyo - CS.png",
  },
  {
    id: "04",
    client: "FinTech",
    category: "FinTech · Investment Platform",
    title: "FinTech Investment Platform",
    description:
      "A financial engine built around investment management, hierarchical commission structures, automated payouts and transaction ledgers.",
    slug: "fintech",
    link: "/case-studies/fintech",
    image: "/case-studies/369 - CS.png",
  },
  {
    id: "05",
    client: "Sami V Landmarks",
    category: "Hospitality",
    title: "Sami V Landmarks",
    description:
      "A hotel booking management system designed to simplify reservations, room availability and booking operations through one connected platform.",
    slug: "sami-v-landmarks",
    link: "/case-studies/sami-v-landmarks",
    image: "/case-studies/Sami V Landmarks - CS.png",
  },
  {
    id: "06",
    client: "Srinivas Packaging",
    category: "Manufacturing · B2B",
    title: "Srinivas Packaging",
    description:
      "A modern digital platform and custom quotation engine built for corrugated carton box manufacturing and industrial supply.",
    slug: "srinivas-packaging",
    link: "/case-studies/srinivas-packaging",
    image: "/case-studies/Srinivas Packaging - CS.png",
  },
];

export default function HomeCaseStudies({ studies = HOME_CASE_STUDIES }) {
  return (
    <div className="home-case-studies-grid">
      {studies.map((item) => (
        <Link
          key={item.slug || item.id}
          href={item.link || `/case-studies/${item.slug}`}
          className="home-case-card"
        >
          {/* Card Image */}
          <div className="home-case-img-container">
            <img
              src={item.image}
              alt={item.title}
              className="home-case-img"
              loading="lazy"
              decoding="async"
            />
            <div className="home-case-overlay" />
          </div>

          {/* Card Body */}
          <div className="home-case-body">
            <div className="home-case-top">
              <div className="home-case-meta">
                <span className="home-case-client">{item.client}</span>
                <span className="home-case-category">{item.category}</span>
              </div>

              <h3 className="home-case-title">{item.title}</h3>

              <p className="home-case-desc">{item.description}</p>
            </div>

            <div className="home-case-bottom">
              <span className="home-case-action">
                <span>Explore Case Study</span>
                <ArrowRight size={16} className="home-case-arrow-icon" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
