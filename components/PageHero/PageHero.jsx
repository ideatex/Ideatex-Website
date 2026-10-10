"use client";

import React from 'react';
import SmartImg from '../SmartImg';
import { motion } from 'framer-motion';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import './PageHero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

function formatHeroTitle(title, accentText) {
  if (accentText) {
    return (
      <>
        {title} <br /><span className="accent">{accentText}</span>
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
  }

  return title;
}


export default function PageHero({ title, subtitle, breadcrumb, widget, accentText, compact = false, backgroundImage }) {
  return (
    <section className={`page-hero ${compact ? 'page-hero-compact' : ''}`}>
      {/* Background with stock image and ambient glow overlay */}
      <div className="page-hero-bg">
        {backgroundImage && (
          <div className="page-hero-bg-img-wrap">
            <SmartImg
              priority
              sizes="100vw"
              src={backgroundImage}
              alt={typeof title === 'string' ? title : 'Page Hero Banner'}
              className="page-hero-bg-img"
            />
            <div className="page-hero-bg-overlay" />
          </div>
        )}
        <div className="page-hero-grain" />
        <motion.div 
          className="page-hero-glow page-hero-glow-1"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="page-hero-glow page-hero-glow-2"
          animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container page-hero-content">
        <div className="page-hero-left">
          {breadcrumb && <Breadcrumb items={breadcrumb} />}
          
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.h1 className="page-hero-title" variants={fadeUp} custom={0}>
              {formatHeroTitle(title, accentText)}
            </motion.h1>
            
            <motion.p className="page-hero-subtitle" variants={fadeUp} custom={1}>
              {subtitle}
            </motion.p>
          </motion.div>
        </div>

        {widget && (
          <motion.div 
            className="page-hero-right"
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {widget}
          </motion.div>
        )}
      </div>
    </section>
  );
}
