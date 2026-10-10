export default function MarqueeTicker({ items }) {
  const defaultItems = [
    'AI AGENTIC DEVELOPMENT', 'WORKFLOW AUTOMATIONS', 'CHATBOT DEVELOPMENT', 'CUSTOM APPS',
    'MOBILE APPS', 'WEB DEVELOPMENT', 'SAAS DEVELOPMENT', 'API INTEGRATIONS',
    'SEARCH ENGINE OPTIMIZATION', 'AD CAMPAIGNS', 'GROWTH MARKETING', 'PRODUCT PHOTOGRAPHY', 'VIDEO EDITING', 'PROMOTIONAL VIDEOS'
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
