// Centralized image URLs for the entire site
// Using Unsplash with optimal modern format and compression parameters

const UNSPLASH = 'https://images.unsplash.com';
const OPT = '&auto=format&q=75&fit=crop';

export const IMAGES = {
  // Hero section
  hero: {
    thumbnail: `${UNSPLASH}/photo-1522202176988-66273c2fd55f?w=600&h=700${OPT}`,
    video: `${UNSPLASH}/photo-1516116216624-53e697fedbea?w=1000&h=600${OPT}`,
  },

  // About page
  about: {
    thumbnail: `${UNSPLASH}/photo-1542744173-8e7e53415bb0?w=600&h=700${OPT}`,
    video: `${UNSPLASH}/photo-1600880292203-757bb62b4baf?w=800&h=500${OPT}`,
    values: `${UNSPLASH}/photo-1581472723648-909f4851d4ae?w=600&h=500${OPT}`,
  },

  // Service card thumbnails
  services: [
    `${UNSPLASH}/photo-1626785774573-4b799315345d?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1586717791821-3f44a563fa4c?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1512941937669-90a1b58e7e9c?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1460925895917-afdab827c52f?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1555421689-d68471e189f2?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1617802690992-15d93263d3a9?w=500&h=350${OPT}`,
  ],

  // Portfolio project thumbnails
  portfolio: [
    `${UNSPLASH}/photo-1498049794561-7780e7231661?w=600&h=420${OPT}`,
    `${UNSPLASH}/photo-1504384308090-c894fdcc538d?w=600&h=420${OPT}`,
    `${UNSPLASH}/photo-1508385082359-f38ae991e8f2?w=600&h=420${OPT}`,
    `${UNSPLASH}/photo-1531297484001-80022131f5a1?w=600&h=420${OPT}`,
    `${UNSPLASH}/photo-1542744095-fcf48d80b0fd?w=600&h=420${OPT}`,
    `${UNSPLASH}/photo-1553484771-371a605b060b?w=600&h=420${OPT}`,
    `${UNSPLASH}/photo-1556761175-5973dc0f32e7?w=600&h=420${OPT}`,
    `${UNSPLASH}/photo-1500634245200-e5245c7574ef?w=600&h=420${OPT}`,
    `${UNSPLASH}/photo-1561070791-36c11767b26a?w=600&h=420${OPT}`,
    `${UNSPLASH}/photo-1573164713714-d95e436ab8d6?w=600&h=420${OPT}`,
    `${UNSPLASH}/photo-1618005182384-a83a8bd57fbe?w=600&h=420${OPT}`,
    `${UNSPLASH}/photo-1617802690992-15d93263d3a9?w=600&h=420${OPT}`,
  ],

  // Team member photos
  team: [
    '/sankara.png',
    '/sudharsan.jpg',
    '/amal.jpg',
  ],

  // Blog card images
  blog: [
    `${UNSPLASH}/photo-1633356122544-f134324a6cee?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1522202176988-66273c2fd55f?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1551288049-bebda4e38f71?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1555421689-d68471e189f2?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1460925895917-afdab827c52f?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1516116216624-53e697fedbea?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1580894894513-541e068a3e2b?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1504639725590-34d0984388bd?w=500&h=350${OPT}`,
    `${UNSPLASH}/photo-1547658719-da2b51169166?w=500&h=350${OPT}`,
  ],

  // Testimonial author photos
  testimonials: [
    `${UNSPLASH}/photo-1507003211169-0a1dd7228f2d?w=150&h=150&crop=face${OPT}`,
    `${UNSPLASH}/photo-1494790108377-be9c29b29330?w=150&h=150&crop=face${OPT}`,
    `${UNSPLASH}/photo-1472099645785-5658abf4ff4e?w=150&h=150&crop=face${OPT}`,
    `${UNSPLASH}/photo-1438761681033-6461ffad8d80?w=150&h=150&crop=face${OPT}`,
  ],

  // CTA section
  cta: `${UNSPLASH}/photo-1551434678-e076c223a692?w=400&h=400${OPT}`,

  // Contact page
  contact: {
    person: `${UNSPLASH}/photo-1507003211169-0a1dd7228f2d?w=250&h=250&crop=face${OPT}`,
    office: `${UNSPLASH}/photo-1497366216548-37526070297c?w=700&h=450${OPT}`,
  },

  // Ticker / showcase images
  ticker: [
    `${UNSPLASH}/photo-1561070791-2526d30994b5?w=300&h=400${OPT}`,
    `${UNSPLASH}/photo-1512941937669-90a1b58e7e9c?w=300&h=400${OPT}`,
    `${UNSPLASH}/photo-1555421689-491a97ff2040?w=300&h=400${OPT}`,
    `${UNSPLASH}/photo-1551434678-e076c223a692?w=300&h=400${OPT}`,
  ],
};
