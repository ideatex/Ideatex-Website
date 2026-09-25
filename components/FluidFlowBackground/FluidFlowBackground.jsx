import { useEffect, useRef } from 'react';

export default function FluidFlowBackground({ colors = ['#008DE4', '#FF5733', '#FBB040', '#00B862'], style = {} }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const particlesRef = useRef([]);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    contextRef.current = ctx;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap DPR at 1.5 for performance
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Initialize particles (reduced to 10 for lightweight mobile/desktop performance)
    const initializeParticles = () => {
      particlesRef.current = [];
      const particleCount = 10;
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * (canvas.offsetWidth || 800),
          y: Math.random() * (canvas.offsetHeight || 600),
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 50 + 35,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initializeParticles();

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Animation loop that only executes when visible
    const animate = () => {
      if (!isVisibleRef.current) return;

      const canvasWidth = canvas.offsetWidth;
      const canvasHeight = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Mouse interaction
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 180;

          if (distance < maxDistance) {
            const force = (1 - distance / maxDistance) * 0.2;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        // Movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Boundary wrapping
        if (particle.x < -particle.size) particle.x = canvasWidth + particle.size;
        if (particle.x > canvasWidth + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvasHeight + particle.size;
        if (particle.y > canvasHeight + particle.size) particle.y = -particle.size;

        // Draw particle gradient
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size);
        gradient.addColorStop(0, particle.color + '33');
        gradient.addColorStop(0.6, particle.color + '15');
        gradient.addColorStop(1, particle.color + '00');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // IntersectionObserver to pause loop when not on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      className="fluid-flow-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}
