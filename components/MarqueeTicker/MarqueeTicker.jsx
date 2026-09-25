export default function MarqueeTicker({ items }) {
  const defaultItems = [
    'AI AGENTIC SYSTEMS', 'SAAS PLATFORM ENGINEERING', 'MODERN WEB APPS',
    'MOBILE APP DEVELOPMENT', 'API & SYSTEM INTEGRATION', 'DIGITAL MARKETING',
    'CLOUD DEPLOYMENT & MAINTENANCE', 'PRODUCT STRATEGY & CONSULTING'
  ];
  
  const tickerItems = items || defaultItems;

  return (
    <div className="marquee-section">
      <div className="marquee-container">
        <div className="marquee-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-separator">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
