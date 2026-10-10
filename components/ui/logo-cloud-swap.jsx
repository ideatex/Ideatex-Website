"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import SmartImg from "../SmartImg";
import { CLIENT_LOGOS } from "../../constants/clientLogos";
import "./logo-cloud-swap.css";

const WIPE_DURATION = 0.92;
const WIPE_TIMES = [0, 0.4, 1];

const DEFAULT_LOGOS = CLIENT_LOGOS.map((l) => ({
  icon: (
    <SmartImg
      src={l.src}
      alt={l.name}
      sizes="(max-width: 1279px) 96px, 112px"
      width="256"
      height="256"
      loading="lazy"
      draggable={false}
    />
  ),
  name: l.name,
  id: l.name,
}));

function LogoItem({ logo, index, isWaving, stagger, totalCount, onDone }) {
  return (
    <motion.div
      aria-label={logo.name ?? "Logo"}
      animate={
        isWaving
          ? {
              clipPath: ["inset(0 0% 0 0)", "inset(0 100% 0 0)", "inset(0 0% 0 0)"],
              filter: ["blur(0px)", "blur(8px)", "blur(0px)"],
              opacity: [1, 0.2, 1],
            }
          : {
              clipPath: "inset(0 0% 0 0)",
              filter: "blur(0px)",
              opacity: 1,
            }
      }
      transition={
        isWaving
          ? {
              clipPath: {
                duration: WIPE_DURATION,
                times: WIPE_TIMES,
                ease: ["easeIn", [0.16, 1, 0.3, 1]],
                delay: index * stagger,
              },
              filter: {
                duration: WIPE_DURATION * 0.9,
                times: WIPE_TIMES,
                ease: "easeInOut",
                delay: index * stagger,
              },
              opacity: {
                duration: WIPE_DURATION * 0.85,
                times: WIPE_TIMES,
                ease: "easeInOut",
                delay: index * stagger,
              },
            }
          : { duration: 0.3, ease: "easeOut" }
      }
      onAnimationComplete={() => {
        if (isWaving && index === totalCount - 1) onDone();
      }}
      whileHover={{
        scale: 1.07,
        opacity: 1,
        filter: "blur(0px)",
        transition: { type: "spring", stiffness: 340, damping: 24 },
      }}
      className="logo-swap-item"
    >
      <span className="logo-swap-icon">{logo.icon}</span>
    </motion.div>
  );
}

export default function LogoCloudSwap({
  logos = DEFAULT_LOGOS,
  title = "Trusted by Growing Businesses",
  subtitle = "Brands across industries trust Ideate X with their products, platforms and growth.",
  interval = 3200,
  stagger = 0.11,
  className,
}) {
  const [waving, setWaving] = React.useState(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setWaving(true), interval);
    return () => clearInterval(id);
  }, [interval, reduceMotion]);

  return (
    <section className={cn("logo-swap-section", className)}>
      <div className="logo-swap-head">
        <h2 className="logo-swap-title">{title}</h2>
        {subtitle && <p className="logo-swap-subtitle">{subtitle}</p>}
      </div>

      <div className="logo-swap-grid">
        {logos.map((logo, i) => (
          <LogoItem
            key={logo.id ?? i}
            logo={logo}
            index={i}
            isWaving={waving}
            stagger={stagger}
            totalCount={logos.length}
            onDone={() => setWaving(false)}
          />
        ))}
      </div>
    </section>
  );
}
