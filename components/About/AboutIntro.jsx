"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SmartImg from "../SmartImg";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { NoiseButton } from "../ui/NoiseButton";
import { IMAGES } from "../../constants/images";
import "./AboutIntro.css";

// The shared image URLs are small crops; ask Unsplash for a wider cut where the layout needs it
const wide = (url) => url.replace(/w=\d+&h=\d+/, "w=1600");

const SERVICES = [
  "Software, AI and product development: AI agents, automation, apps, web and SaaS",
  "Digital marketing and growth: SEO, ad campaigns and growth marketing",
  "Creative production: product photography, video editing and promotional videos",
];

export default function AboutIntro() {
  return (
    <div className="about-intro">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="about-intro-hero">
        <div className="about-intro-inner">
          <div className="about-intro-crumbs">
            <Breadcrumb items={[{ path: "/", label: "Home" }, { label: "About" }]} />
          </div>

          <SmartImg
            className="about-intro-hero-img"
            src={wide(IMAGES.about.video)}
            alt="The Ideate X team at work"
            sizes="(max-width: 1200px) 100vw, 1152px"
            width="1200"
            height="600"
            loading="eager"
          />

          <div className="about-intro-split">
            <h1 className="about-intro-lead">
              Different Skills. <span className="about-intro-lead-accent">One Shared Purpose.</span>{" "}
              <span className="about-intro-lead-muted">
                Creative, marketing and technology, working as one team.
              </span>
            </h1>
            <div className="about-intro-copy">
              <p>
                Ideate X brings creative production, digital marketing and technology development together to help
                businesses turn ideas into meaningful work.
              </p>
              <NoiseButton href="/contact" icon={<ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />}>
                Start a Conversation
              </NoiseButton>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section className="about-intro-about">
        <div className="about-intro-inner about-intro-inner--stack">
          {/* Header */}
          <div className="about-intro-split about-intro-split--header">
            <div>
              <h2 className="about-intro-title">About Us</h2>
              <p className="about-intro-subtitle">We Start With What You Need to Achieve.</p>
            </div>
            <div className="about-intro-copy">
              <p className="about-intro-strong">
                Every business has a different challenge. Sometimes it&apos;s telling a product&apos;s story. Sometimes
                it&apos;s reaching the right audience. Sometimes it&apos;s building a system that makes everyday work
                easier.
              </p>
              <p>
                We work across creative, marketing and development to help businesses find the right approach and put
                it into practice.
              </p>
              <ul className="about-intro-list">
                {SERVICES.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} strokeWidth={1.75} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image + two cards */}
          <div className="about-intro-cards">
            {/* LEFT BIG IMAGE */}
            <div className="about-intro-big">
              <SmartImg
                src={wide(IMAGES.about.thumbnail)}
                alt="The Ideate X team at work"
                sizes="(max-width: 768px) 100vw, 560px"
                width="800"
                height="550"
                loading="lazy"
              />
            </div>

            {/* RIGHT TWO CARDS */}
            <div className="about-intro-side">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="about-intro-card about-intro-card--dark"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="about-intro-card-media"
                >
                  <SmartImg
                    src={wide(IMAGES.about.values)}
                    alt="Digital marketing and growth"
                    sizes="(max-width: 768px) 100vw, 560px"
                    width="600"
                    height="400"
                    loading="lazy"
                  />
                  <div className="about-intro-card-fade" />
                </motion.div>
                <div className="about-intro-card-body">
                  <h3>Accelerate Growth</h3>
                  <p>
                    Search, ad campaigns and growth marketing that help the right audience find you and act on it.
                  </p>
                  <NoiseButton href="/services#marketing" className="about-intro-card-btn">
                    Explore Digital Marketing
                  </NoiseButton>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="about-intro-card about-intro-card--photo"
              >
                <SmartImg
                  src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1600&auto=format&q=80&fit=crop"
                  alt="Creative production"
                  sizes="(max-width: 768px) 100vw, 560px"
                  width="600"
                  height="400"
                  loading="lazy"
                />
                <div className="about-intro-card-overlay">
                  <h3>Creative Production</h3>
                  <p>
                    Product photography, video editing and promotional films that give your brand a clearer voice.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
