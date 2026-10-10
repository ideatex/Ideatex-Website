"use client";

import React, { useState, useEffect, useCallback } from "react";
import SmartImg from '../SmartImg';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import "./vertical-tabs.css";

const DEFAULT_SERVICES = [
  {
    id: "01",
    title: "AI Agentic Systems",
    category: "AI & Automation",
    description:
      "Practical AI agents and automated workflows connecting your tools and data.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&q=80&fit=crop",
    link: "/services/ai-agentic-development",
  },
  {
    id: "02",
    title: "SaaS Platform Engineering",
    category: "Engineering",
    description:
      "Multi-tenant SaaS architectures, Stripe subscription billing, and cloud infrastructure.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&q=80&fit=crop",
    link: "/services/saas-development",
  },
  {
    id: "03",
    title: "Modern Web Development",
    category: "Engineering",
    description:
      "High-performance web applications and digital interfaces built for speed and scale.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&q=80&fit=crop",
    link: "/services/web-development",
  },
  {
    id: "04",
    title: "Mobile App Development",
    category: "Engineering",
    description:
      "Cross-platform mobile applications engineered for iOS and Android with offline sync.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&q=80&fit=crop",
    link: "/services/mobile-app-development",
  },
  {
    id: "05",
    title: "API & System Integration",
    category: "Engineering",
    description:
      "Connecting third-party APIs, payment gateways, databases, and internal workflows.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&q=80&fit=crop",
    link: "/services/api-system-integration",
  },
  {
    id: "06",
    title: "Digital Marketing & Growth",
    category: "Growth",
    description:
      "Data-driven demand generation, targeted acquisition funnels, and conversion optimization.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&q=80&fit=crop",
    link: "/services#marketing",
  },
];

const AUTO_PLAY_DURATION = 5000;

export function VerticalTabs({
  services = DEFAULT_SERVICES,
  autoPlayDuration = AUTO_PLAY_DURATION,
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % services.length);
  }, [services.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  }, [services.length]);

  const handleTabClick = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayDuration);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext, autoPlayDuration]);

  const variants = {
    enter: (dir) => ({
      y: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      y: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const activeService = services[activeIndex] || services[0];

  return (
    <div className={cn("vertical-tabs-wrapper w-full", className)}>
      <div className="vertical-tabs-grid">
        {/* Left Column: Vertical Tabs */}
        <div className="vertical-tabs-left">
          <div className="vertical-tabs-stack">
          <div className="vertical-tabs-list">
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={service.id || index}
                  type="button"
                  onClick={() => handleTabClick(index)}
                  className={cn(
                    "vertical-tab-item",
                    isActive ? "active" : ""
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Left Track Progress Indicator */}
                  <div className="vertical-tab-indicator">
                    {isActive && (
                      <motion.div
                        key={`progress-${index}-${isPaused}`}
                        className="vertical-tab-progress"
                        initial={{ height: "0%" }}
                        animate={
                          isPaused ? { height: "0%" } : { height: "100%" }
                        }
                        transition={{
                          duration: autoPlayDuration / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                  </div>

                  <div className="vertical-tab-content">
                    <span className="vertical-tab-title">
                      {service.title}
                    </span>

                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.23, 1, 0.32, 1],
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          <p className="vertical-tab-desc">
                            {service.description}
                          </p>
                          {service.link && (
                            <Link
                              href={service.link}
                              className="vertical-tab-link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>{service.ctaLabel || "Explore capability"}</span>
                              <ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" />
                            </Link>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Invisible copies of every tab state share this grid cell, so the stack always
              reserves the tallest layout and the page below never jumps as tabs change. */}
          {services.map((active, i) => (
            <div key={`sizer-${active.id || i}`} className="vertical-tabs-list vertical-tabs-sizer" aria-hidden="true" inert={true}>
              {services.map((service, j) => (
                <div key={j} className={cn("vertical-tab-item", j === i ? "active" : "")}>
                  <div className="vertical-tab-content">
                    <span className="vertical-tab-title">{service.title}</span>
                    {j === i && (
                      <div>
                        <p className="vertical-tab-desc">{service.description}</p>
                        {service.link && (
                          <span className="vertical-tab-link">
                            <span>{service.ctaLabel || "Explore capability"}</span>
                            <ArrowRight size={14} strokeWidth={1.75} />
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
          </div>
        </div>

        {/* Right Column: Visual Showcase Gallery */}
        <div className="vertical-tabs-right">
          <div
            className="vertical-tabs-gallery"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: "spring", stiffness: 260, damping: 32 },
                  opacity: { duration: 0.4 },
                }}
                className="vertical-tabs-slide"
                onClick={handleNext}
              >
                <SmartImg sizes="(max-width: 1024px) 100vw, 640px"
                  src={activeService.image}
                  alt={activeService.title}
                  className="vertical-tabs-image"
                  loading="lazy"
                />
                <div className="vertical-tabs-overlay" />

                <div className="vertical-tabs-card-info">
                  <h3 className="vertical-tabs-card-title">
                    {activeService.title}
                  </h3>
                  <p className="vertical-tabs-card-meta">
                    {activeService.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="vertical-tabs-controls">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="vertical-tabs-nav-btn"
                aria-label="Previous capability"
              >
                <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="vertical-tabs-nav-btn"
                aria-label="Next capability"
              >
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerticalTabs;
