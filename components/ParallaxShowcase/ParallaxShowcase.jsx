import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IMAGES } from '../../constants/images';
import './ParallaxShowcase.css';

const LAYERS = [
  { src: IMAGES.services[1], alt: 'UX/UI Design', label: 'UX/UI Design' },
  { src: IMAGES.services[2], alt: 'App Development', label: 'App Development' },
  { src: IMAGES.services[3], alt: 'Web Development', label: 'Web Development' },
];

export default function ParallaxShowcase({ 
  children, 
  sectionLabel = 'What We Do',
  heroTitle = 'Our Expertise',
  heroSubtitle = 'Crafting digital experiences through strategy, design & code',
  centerImage = IMAGES.services[0],
  layerImages = LAYERS
}) {
  const sectionRef = useRef(null);

  return (
    <div className="scroll-showcase-wrapper">
      <section ref={sectionRef} className="scroll-showcase">
        {/* Scaler — hero image that scales smoothly via GPU transform */}
        <ScalerImage sectionRef={sectionRef} centerImage={centerImage} heroTitle={heroTitle} heroSubtitle={heroSubtitle} />

        {/* Grid layers — 3 images that scale + fade in */}
        <div className="scroll-showcase-grid">
          {layerImages.map((layer, i) => (
            <GridLayer
              key={i}
              sectionRef={sectionRef}
              index={i}
              {...layer}
            />
          ))}
        </div>
      </section>
      {children}
    </div>
  );
}

function ScalerImage({ sectionRef, centerImage, heroTitle, heroSubtitle }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', '80% end'],
  });

  // Scale from fullscreen (1.35) down to 1.0 using GPU transform
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.8], ['0px', '24px']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);

  return (
    <div className="scroll-showcase-scaler">
      <motion.div
        className="scroll-showcase-scaler-container"
        style={{
          scale,
          borderRadius,
          width: 'min(90vw, 680px)',
          height: 'min(70vh, 440px)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={centerImage}
          alt="Showcase — Creative Studio"
          className="scroll-showcase-scaler-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
          decoding="async"
        />
        <motion.div className="scroll-showcase-scaler-overlay" style={{ opacity: overlayOpacity }}>
          <h2 className="scroll-showcase-title">{heroTitle}</h2>
          <p className="scroll-showcase-subtitle">
            {heroSubtitle}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function GridLayer({ sectionRef, index, src, alt, label }) {
  const endFraction = 1 - index * 0.05;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', `${endFraction} end`],
  });

  // opacity: hold at 0 until 55% then fade to 1
  const opacity = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0, 1]);

  // scale: hold at 0.85 until 30% then grow to 1
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [0.85, 0.85, 1]);

  return (
    <motion.div className="scroll-showcase-layer" style={{ opacity, scale }}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <span className="scroll-showcase-layer-label">{label}</span>
    </motion.div>
  );
}
