"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NoiseButton } from "./NoiseButton";
import "../Hero/Hero.css";

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

export const HeroParallax = ({
  products: productList = products,
  title,
  subtitle,
  primaryCtaText,
  secondaryCtaText,
}) => {
  const items = productList && productList.length > 0 ? productList : products;
  
  // Two rows with client images
  const firstRow = items;
  const secondRow = [...items].reverse();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 600]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -600]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [8, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [0.45, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [10, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [-260, 160]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="hero-parallax-wrapper"
    >
      <Header
        title={title}
        subtitle={subtitle}
        primaryCtaText={primaryCtaText}
        secondaryCtaText={secondaryCtaText}
      />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="hero-parallax-grid"
      >
        <motion.div className="hero-parallax-row hero-parallax-row-reverse">
          {firstRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`row1-${product.thumbnail}-${idx}`}
            />
          ))}
        </motion.div>

        <motion.div className="hero-parallax-row">
          {secondRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`row2-${product.thumbnail}-${idx}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

function renderHeroTitle(title) {
  if (!title) {
    return (
      <>
        We Build What Your Business <span className="accent">Needs Next.</span>
      </>
    );
  }

  if (React.isValidElement(title)) {
    return title;
  }

  if (typeof title === 'string') {
    if (title.includes('<span') || title.includes('<strong') || title.includes('<em')) {
      return <span dangerouslySetInnerHTML={{ __html: title }} />;
    }

    if (title.includes('Needs Next')) {
      const parts = title.split('Needs Next');
      return (
        <>
          {parts[0]}<span className="accent">Needs Next{parts[1] || ''}</span>
        </>
      );
    }

    const words = title.trim().split(' ');
    if (words.length >= 3) {
      const main = words.slice(0, -2).join(' ');
      const accent = words.slice(-2).join(' ');
      return (
        <>
          {main} <span className="accent">{accent}</span>
        </>
      );
    }

    return <span className="accent">{title}</span>;
  }

  return title;
}

export const Header = ({ title, subtitle, primaryCtaText, secondaryCtaText }) => {
  return (
    <div className="hero-parallax-header">
      <h1 className="hero-parallax-title">
        {renderHeroTitle(title)}
      </h1>

      <p className="hero-parallax-desc">
        {subtitle ||
          "From AI agents and automated workflows to web apps, mobile products, SaaS platforms, and growth marketing — we build practical digital solutions around the way your business works."}
      </p>

      <div className="hero-parallax-actions">
        <NoiseButton
          href="/contact"
          icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}
        >
          {primaryCtaText || "Start a Project"}
        </NoiseButton>

        <Link
          href="/portfolio"
          className="hero-parallax-btn-secondary"
        >
          <span>{secondaryCtaText || "See Our Work"}</span>
          <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="hero-parallax-card"
    >
      <Link
        href={product.link}
        target={product.link.startsWith("http") ? "_blank" : undefined}
        rel={product.link.startsWith("http") ? "noopener noreferrer" : undefined}
        className="hero-parallax-card-link"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="hero-parallax-card-img"
          loading="eager"
          decoding="async"
          width="450"
          height="280"
        />
        <div className="hero-parallax-card-overlay">
          <h2 className="hero-parallax-card-title">
            {product.title}
          </h2>
        </div>
        <div className="hero-parallax-card-bottom">
          <p className="hero-parallax-card-bottom-title">{product.title}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export default HeroParallax;
