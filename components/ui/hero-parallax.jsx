"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import SmartImg from "../SmartImg";
import { NoiseButton } from "./NoiseButton";
import "../Hero/Hero.css";

// Phones get a shorter travel distance so the rows come into view sooner
const NARROW_QUERY = "(max-width: 768px)";
const subscribeNarrow = (cb) => {
  const mq = window.matchMedia(NARROW_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getNarrow = () => window.matchMedia(NARROW_QUERY).matches;

// Hero parallax (21st.dev / Aceternity "hero-parallax"): two rows of project cards that slide
// sideways, tilt and rise into place as the page scrolls.
export const HeroParallax = ({
  products = [],
  title,
  subtitle,
  primaryCtaText,
  secondaryCtaText,
  primaryCtaUrl,
  secondaryCtaUrl,
}) => {
  const reduceMotion = useReducedMotion();
  const narrow = React.useSyncExternalStore(subscribeNarrow, getNarrow, () => false);
  const total = products.length;
  // Two rows of cards: the first slides right, the second slides left
  const first = Math.ceil(total / 2);
  const firstRow = products.slice(0, first);
  const secondRow = products.slice(first);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, narrow ? 400 : 700]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, narrow ? -400 : -700]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [narrow ? 10 : 20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.12], narrow ? [-380, 0] : [-700, 0]), springConfig);

  const gridStyle = reduceMotion ? undefined : { rotateX, rotateZ, translateY, opacity };

  return (
    <div ref={ref} className={`hero-parallax-wrapper${reduceMotion ? " is-static" : ""}`}>
      <Header
        title={title}
        subtitle={subtitle}
        primaryCtaText={primaryCtaText}
        secondaryCtaText={secondaryCtaText}
        primaryCtaUrl={primaryCtaUrl}
        secondaryCtaUrl={secondaryCtaUrl}
      />

      {total > 0 && (
        <motion.div style={gridStyle} className="hero-parallax-grid">
          <motion.div className="hero-parallax-row hero-parallax-row-reverse hero-parallax-row-right">
            {firstRow.map((product, i, row) => (
              <ProductCard product={product} priority={i < 2 || i >= row.length - 2} translate={reduceMotion ? undefined : translateX} key={product.title + product.thumbnail} />
            ))}
          </motion.div>
          <motion.div className="hero-parallax-row">
            {secondRow.map((product, i, row) => (
              <ProductCard product={product} priority={i < 2 || i >= row.length - 2} translate={reduceMotion ? undefined : translateXReverse} key={product.title + product.thumbnail} />
            ))}
          </motion.div>
        </motion.div>
      )}
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

  if (typeof title === "string") {
    if (title.includes("<span") || title.includes("<strong") || title.includes("<em")) {
      return <span dangerouslySetInnerHTML={{ __html: title }} />;
    }

    const words = title.trim().split(" ");
    if (words.length >= 3) {
      const main = words.slice(0, -2).join(" ");
      const accent = words.slice(-2).join(" ");
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

export const Header = ({ title, subtitle, primaryCtaText, secondaryCtaText, primaryCtaUrl, secondaryCtaUrl }) => {
  return (
    <div className="hero-parallax-header">
      <h1 className="hero-parallax-title">{renderHeroTitle(title)}</h1>

      <p className="hero-parallax-desc">
        {subtitle ||
          "We help businesses get noticed, reach the right people and grow through digital marketing, app development and smarter technology."}
      </p>

      <div className="hero-parallax-actions">
        <NoiseButton
          href={primaryCtaUrl || "/contact"}
          icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}
        >
          {primaryCtaText || "Start a Project"}
        </NoiseButton>

        <Link href={secondaryCtaUrl || "/portfolio"} className="hero-parallax-btn-secondary">
          <span>{secondaryCtaText || "See Our Work"}</span>
          <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export const ProductCard = ({ product, translate, priority = false }) => {
  const external = /^https?:\/\//i.test(product.link || "");
  const LinkTag = external ? "a" : Link;
  const linkProps = external
    ? { href: product.link, target: "_blank", rel: "noopener noreferrer" }
    : { href: product.link || "/portfolio" };

  return (
    <motion.div
      style={translate ? { x: translate } : undefined}
      whileHover={{ y: -20 }}
      className="hero-parallax-card"
    >
      <LinkTag {...linkProps} className="hero-parallax-card-link" aria-label={product.title}>
        <SmartImg
          sizes="(max-width: 768px) 70vw, 480px"
          src={product.thumbnail}
          alt={product.title}
          className="hero-parallax-card-img"
          loading="eager"
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          width="480"
          height="384"
        />
      </LinkTag>
      <div className="hero-parallax-card-shade" />
      <h2 className="hero-parallax-card-title">{product.title}</h2>
    </motion.div>
  );
};
