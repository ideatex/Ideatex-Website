"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";
import { useCMSData } from "../../lib/cms-client";

// Used if the CMS has too few projects to fill the two rows
const FALLBACK_PRODUCTS = [
  { title: "CSAVA", link: "https://csava.org", thumbnail: "/clients/CSAVA.png" },
  { title: "Keyo", link: "https://keyo.co.in/en", thumbnail: "/clients/project-keyo.jpeg" },
  { title: "SBE Builders", link: "https://sbebuilders.in", thumbnail: "/clients/SBEBuilders.png" },
  { title: "Sami V Landmarks", link: "https://samivlandmarks.in", thumbnail: "/clients/project-samivlandmarks.jpeg" },
  { title: "Tifbox", link: "https://tifboxmeals.com", thumbnail: "/clients/project-tifbox.jpeg" },
  { title: "Vevy.One", link: "https://vevyone.netlify.app", thumbnail: "/clients/Vevy.One.png" },
  { title: "Srinivas Packaging", link: "https://srinivaspackaging.in", thumbnail: "/clients/project-srinivaspackaging.jpeg" },
];

export default function Hero(props = {}) {
  const cms = useCMSData();

  // Real projects and case studies from the CMS, each with its own image
  const work = (cms.workItems || [])
    .filter((w) => w.image)
    .map((w) => ({ title: w.title, link: w.liveUrl || "/portfolio", thumbnail: w.image }));
  const studies = (cms.caseStudies || [])
    .filter((c) => c.image || c.coverBanner)
    .map((c) => ({ title: c.title, link: `/case-studies/${c.slug}`, thumbnail: c.image || c.coverBanner }));

  const products = work.length + studies.length >= 6 ? [...work, ...studies] : FALLBACK_PRODUCTS;

  return (
    <HeroParallax
      products={products}
      title={props.title}
      subtitle={props.subtitle}
      primaryCtaText={props.primaryCtaText}
      secondaryCtaText={props.secondaryCtaText}
      primaryCtaUrl={props.primaryCtaUrl}
      secondaryCtaUrl={props.secondaryCtaUrl}
    />
  );
}
