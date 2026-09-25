import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SpotlightCard from '../SpotlightCard/SpotlightCard';
import { IMAGES } from '../../constants/images';
import SectionHeading from '../SectionHeading/SectionHeading';


const testimonials = [
  {
    quote: "The growth we've experienced since partnering with Studio52 is phenomenal. Their design strategies have significantly boosted our traffic and online presence.",
    author: "Neil Saidi",
    role: "CEO @ Clarity LLC",
    photo: IMAGES.testimonials[0],
    rating: 4.5
  },
  {
    quote: "Studio52 transformed our vision into a breathtaking 3D experience. Their attention to detail and technical expertise is unmatched in the industry.",
    author: "Sarah Chen",
    role: "CTO @ NexGen Robotics",
    photo: IMAGES.testimonials[1],
    rating: 5
  },
  {
    quote: "Working with Studio52 felt like having an extension of our own team. They delivered a product that exceeded every expectation we had.",
    author: "Marcus Rivera",
    role: "Founder @ CloudVault",
    photo: IMAGES.testimonials[2],
    rating: 4.5
  },
  {
    quote: "Their 3D visualization capabilities gave our real estate platform a competitive edge. Users spend 3x more time exploring properties now.",
    author: "Emily Watson",
    role: "VP Design @ ArtFrame",
    photo: IMAGES.testimonials[3],
    rating: 5
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const ref = useScrollReveal();
  const autoplayRef = useRef(null);

  // Autoplay interval
  useEffect(() => {
    if (!autoplay) return;
    
    autoplayRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(autoplayRef.current);
  }, [autoplay]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 3000);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 3000);
  };

  const getTesto = (index) => testimonials[(current + index) % testimonials.length];

  // Zig-zag positions for staggered effect
  const getCardPosition = (index) => {
    const isCenter = index === 2;
    
    const positions = [
      // Left cards
      { x: -580, y: -40, scale: 0.55, opacity: 0.15, blur: 20, zIndex: 1 },
      { x: -380, y: 20, scale: 0.7, opacity: 0.35, blur: 15, zIndex: 2 },
      // Center card
      { x: 0, y: 0, scale: 1, opacity: 1, blur: 0, zIndex: 10 },
      // Right cards
      { x: 380, y: -20, scale: 0.7, opacity: 0.35, blur: 15, zIndex: 2 },
      { x: 580, y: 40, scale: 0.55, opacity: 0.15, blur: 20, zIndex: 1 }
    ];
    return positions[index] || positions[2];
  };

  const displayCount = 5;

  return (
    <section className="testimonials-section section" ref={ref}>
      <div className="container reveal">
        <SectionHeading>
          <h2 className="section-title">What Clients Say</h2>
        </SectionHeading>

        <div className="testimonials-carousel-wrapper">
          {/* Zig-zag Carousel container */}
          <div className="testimonials-carousel-perspective">
            <div className="testimonials-carousel">
              <AnimatePresence mode="wait">
                {[...Array(displayCount)].map((_, index) => {
                  const testo = getTesto(index);
                  const position = getCardPosition(index);
                  const isCenter = index === 2;

                  return (
                    <motion.div
                      key={`${current}-${index}`}
                      className={`testimonials-carousel-item ${isCenter ? 'active' : ''}`}
                      initial={{ opacity: 0, x: position.x * 1.5, y: position.y, filter: `blur(${position.blur}px)` }}
                      animate={{
                        opacity: position.opacity,
                        x: position.x,
                        y: position.y,
                        scale: position.scale,
                        zIndex: position.zIndex,
                        filter: `blur(${position.blur}px)`,
                      }}
                      exit={{ opacity: 0, x: position.x * 1.5, y: position.y, filter: `blur(${position.blur}px)` }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.03,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      <SpotlightCard className="testimonial-card-spotlight">
                        <div className={`testimonial-card ${isCenter ? 'testimonial-card--active' : ''}`}>
                          {/* Avatar */}
                          <div className="testimonial-card-header">
                            <img
                              src={testo.photo}
                              alt={testo.author}
                              className="testimonial-card-avatar"
                            />
                          </div>

                          {/* Quote text */}
                          <blockquote className="testimonial-card-quote">
                            {isCenter && <span className="testimonial-card-quote-mark">&ldquo;</span>}
                            {testo.quote}
                          </blockquote>

                          {/* Author info */}
                          <div className="testimonial-card-footer">
                            <div className="testimonial-card-author-info">
                              <p className="testimonial-card-name">{testo.author}</p>
                              <p className="testimonial-card-role">{testo.role}</p>
                            </div>

                            {isCenter && (
                              <div className="testimonial-card-stars">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                  key={i}
                                  size={14}
                                  strokeWidth={1.75}
                                  aria-hidden="true"
                                  fill={i < Math.floor(testo.rating) ? 'var(--accent)' : 'none'}
                                  color={i < Math.ceil(testo.rating) ? 'var(--accent)' : 'var(--border-color)'}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="testimonials-controls">
          <motion.button
            onClick={handlePrev}
            className="testimonials-control-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          </motion.button>

          <div className="testimonials-dots">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                className={`testimonials-dot ${i === current ? 'active' : ''}`}
                onClick={() => {
                  setCurrent(i);
                  setAutoplay(false);
                  setTimeout(() => setAutoplay(true), 3000);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={handleNext}
            className="testimonials-control-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </motion.button>
          </div>

          {/* Autoplay progress */}
          <motion.div
            className="testimonials-progress"
            key={current}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 6, ease: 'linear' }}
            style={{ originX: 0 }}
          />
        </div>
      </div>
    </section>
  );
}
