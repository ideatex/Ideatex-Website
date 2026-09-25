"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";

export const products = [
  {
    title: "CSAVA",
    link: "https://csava.org",
    thumbnail: "/clients/CSAVA.png",
    category: "SaaS & Platforms",
  },
  {
    title: "Keyo",
    link: "https://keyo.co.in/en",
    thumbnail: "/clients/Keyo.png",
    category: "Mobile Apps & PWA",
  },
  {
    title: "SBE Builders",
    link: "https://sbebuilders.in",
    thumbnail: "/clients/SBEBuilders.png",
    category: "Enterprise Web Platform",
  },
  {
    title: "Sami V Landmarks",
    link: "https://samivlandmarks.in",
    thumbnail: "/clients/SamiVLandmarks.png",
    category: "Real Estate & Infrastructure",
  },
  {
    title: "Tifbox",
    link: "https://tifboxmeals.com",
    thumbnail: "/clients/Tifbox.png",
    category: "Mobile Apps & FoodTech",
  },
  {
    title: "Vevy.One",
    link: "https://vevyone.netlify.app",
    thumbnail: "/clients/Vevy.One.png",
    category: "SaaS & API Platform",
  },
  {
    title: "Srinivas Packaging",
    link: "https://srinivaspackaging.in",
    thumbnail: "/clients/SrinivasPackaging.png",
    category: "Manufacturing & Packaging",
  },
];

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export default function Hero(props = {}) {
  return (
    <HeroParallax
      products={props.products || products}
      title={props.title}
      subtitle={props.subtitle}
      primaryCtaText={props.primaryCtaText}
      secondaryCtaText={props.secondaryCtaText}
    />
  );
}

export { HeroParallax };
