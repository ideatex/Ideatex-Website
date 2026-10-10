"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import SmartImg from "../SmartImg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./project-showcase.css";

// Stable tilt per card (no Math.random during render, which would break SSR hydration)
const tiltFor = (index) => ((index * 7) % 21) - 10;

const calculateGap = (width) => {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
};

export const ProjectShowcase = ({
  testimonials,
  autoplay = false,
  desktopVersionBottomThreshold = 1024,
  imageAspectRatio = 1.37,
  isRTL = false,
}) => {
  const [active, setActive] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [componentWidth, setComponentWidth] = useState(0);
  const componentRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const count = testimonials.length;

  const handleNext = useCallback(() => setActive((prev) => (prev + 1) % count), [count]);
  const handlePrev = useCallback(() => setActive((prev) => (prev - 1 + count) % count), [count]);

  useEffect(() => {
    if (!autoplay || count < 2) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, count, handleNext]);

  useEffect(() => {
    const el = componentRef.current;
    if (!el) return;
    const measure = () => {
      setComponentWidth(el.offsetWidth);
      setIsMobileView(el.offsetWidth < desktopVersionBottomThreshold);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, [desktopVersionBottomThreshold]);

  // Keep the active index valid if the list shrinks (e.g. CMS data loads)
  useEffect(() => {
    if (active >= count && count > 0) setActive(0);
  }, [active, count]);

  const tilts = useMemo(() => testimonials.map((_, i) => tiltFor(i)), [testimonials]);

  const current = testimonials[active];
  if (!current) return null;

  return (
    <div
      ref={componentRef}
      className="project-showcase"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <div
        className="project-showcase-grid"
        style={{
          gridTemplateColumns: isMobileView ? "1fr" : "1fr 1fr",
          gap: `${calculateGap(componentWidth)}px`,
        }}
      >
        <div className="project-showcase-stage">
          <div
            className="project-showcase-stage-inner"
            style={{ paddingTop: `${(1 / imageAspectRatio) * 100}%` }}
          >
            {testimonials.map((item, index) => {
              const isActive = index === active;
              return (
                <motion.div
                  key={`${item.src}-${index}`}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    scale: isActive ? 1 : 0.95,
                    rotate: isActive || reduceMotion ? 0 : tilts[index],
                    y: isActive && !reduceMotion ? [0, -80, 0] : 0,
                    z: isActive ? 0 : -100,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="project-showcase-slide"
                  style={{ zIndex: isActive ? 999 : count + 2 - index, pointerEvents: isActive ? "auto" : "none" }}
                  aria-hidden={!isActive}
                >
                  <div className="project-showcase-image">
                    <SmartImg
                      src={item.src}
                      alt={item.name}
                      sizes="(max-width: 900px) 100vw, 560px"
                      width="800"
                      height="500"
                      loading={index === 0 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="project-showcase-content">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="project-showcase-name">{current.name}</h3>
            <p className="project-showcase-position">{current.designation}</p>
            <p className="project-showcase-quote">
              {current.quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={reduceMotion ? false : { filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                  className="project-showcase-word"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </p>
            {current.tags?.length > 0 && (
              <ul className="project-showcase-tags" aria-label="Tech stack">
                {current.tags.map((tag) => (
                  <li key={tag} className="project-showcase-tag">{tag}</li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>

      <div className="project-showcase-nav">
        <button type="button" className="project-showcase-nav-btn" onClick={handlePrev} aria-label="Previous project">
          <ChevronLeft size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <button type="button" className="project-showcase-nav-btn" onClick={handleNext} aria-label="Next project">
          <ChevronRight size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default ProjectShowcase;
