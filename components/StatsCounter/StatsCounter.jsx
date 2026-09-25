import { useEffect, useRef, useState } from 'react';


function RollingDigit({ digit, delay = 0 }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span className="rolling-digit" ref={ref}>
      <span
        className={`rolling-digit-inner ${active ? 'roll' : ''}`}
        style={{
          transform: active ? `translateY(-${digit * 10}%)` : 'translateY(0)',
          transitionDelay: `${delay}ms`,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="rolling-digit-num">{n}</span>
        ))}
      </span>
    </span>
  );
}

function StatValue({ display }) {
  // Parse display string like "18k", "24k", "12+", "150+"
  const parts = display.split('');
  let digitDelay = 0;

  return (
    <span className="stat-value">
      {parts.map((char, i) => {
        const num = parseInt(char);
        if (!isNaN(num)) {
          digitDelay += 150;
          return <RollingDigit key={i} digit={num} delay={digitDelay} />;
        }
        return <span key={i} className="stat-suffix">{char}</span>;
      })}
    </span>
  );
}

function StatItem({ display, label }) {
  return (
    <div className="stat-item">
      <StatValue display={display} />
      <span className="stat-label">{label}</span>
      <div className="stat-item-shape" />
    </div>
  );
}

export default function StatsCounter() {
  const stats = [
    { display: '18k', label: 'Happy Customers' },
    { display: '24k', label: 'Completed Projects' },
    { display: '12+', label: 'Awards Achievement' },
    { display: '8+', label: 'Years Experience' },
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
