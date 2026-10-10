/**
 * Ideate X Chatbot Knowledge Base & Intent Configuration
 * 
 * Strict knowledge boundary: Only approved Ideate X facts and the three-pillar service catalogue
 * (Software, AI & Product Development, Digital Marketing & Growth, Creative Production).
 * Never fabricates pricing, delivery dates, client names, awards, or capabilities.
 */

export const COMPANY_PROFILE = {
  name: "Ideate X",
  legalName: "Ideate X",
  tagline: "Create. Grow. Build.",
  description: "Ideate X brings creative production, digital marketing and technology development together to help businesses create, connect and grow.",
  location: "Innov8 Millenia, 2nd Floor, Campus-1a, MGR Main Rd, Perungudi, Chennai, Tamil Nadu 600096, India",
  email: "hello@ideatex.co.in",
  phones: ["+91 8760007900", "+91 7305905661"],
  ipOwnership: "Clients retain 100% full ownership of all custom source code, design assets, database schemas, and intellectual property from day one.",
  process: [
    { step: "01", title: "Understand", desc: "We learn about your business, your audience and what you want to achieve." },
    { step: "02", title: "Plan", desc: "We identify the right approach, set priorities and agree on the work ahead." },
    { step: "03", title: "Create & Build", desc: "We bring the plan to life through creative production, marketing or development." },
    { step: "04", title: "Refine", desc: "We review the work, make improvements and prepare it for its intended use." }
  ]
};

export const APPROVED_SERVICES = [
  {
    id: "ai-agentic-development",
    title: "AI Agentic Development",
    slug: "ai-agentic-development",
    route: "/services/ai-agentic-development",
    pillar: "development",
    shortDesc: "We develop AI agent solutions around defined tasks, business workflows and connected systems, with a focus on practical use rather than novelty.",
    capabilities: [],
    guidance: "We never make exaggerated claims about what the technology can do."
  },
  {
    id: "workflow-automations",
    title: "Workflow Automations",
    slug: "workflow-automations",
    route: "/services/workflow-automations",
    pillar: "development",
    shortDesc: "We connect steps, tools and systems to reduce repetitive manual work and make everyday processes easier to manage.",
    capabilities: [],
    guidance: "We never make exaggerated claims about what the technology can do."
  },
  {
    id: "chatbot-development",
    title: "Chatbot Development",
    slug: "chatbot-development",
    route: "/services/chatbot-development",
    pillar: "development",
    shortDesc: "We build chatbots for website enquiries, customer support, information discovery and other clearly defined business use cases.",
    capabilities: [],
    guidance: "We never make exaggerated claims about what the technology can do."
  },
  {
    id: "custom-apps-development",
    title: "Custom Apps Development",
    slug: "custom-apps-development",
    route: "/services/custom-apps-development",
    pillar: "development",
    shortDesc: "We develop custom applications around your workflows, users and requirements instead of forcing your business into an unsuitable off-the-shelf solution.",
    capabilities: [],
    guidance: "We never make exaggerated claims about what the technology can do."
  },
  {
    id: "mobile-app-development",
    title: "Mobile Apps Development",
    slug: "mobile-app-development",
    route: "/services/mobile-app-development",
    pillar: "development",
    shortDesc: "We develop mobile applications around the people who use them, the tasks they need to complete and the goals the product must support.",
    capabilities: [],
    guidance: "We never make exaggerated claims about what the technology can do."
  },
  {
    id: "web-development",
    title: "Web Development",
    slug: "web-development",
    route: "/services/web-development",
    pillar: "development",
    shortDesc: "From business websites to interactive web applications, we create digital experiences designed around usability, performance and business needs.",
    capabilities: [],
    guidance: "We never make exaggerated claims about what the technology can do."
  },
  {
    id: "saas-development",
    title: "SaaS Development",
    slug: "saas-development",
    route: "/services/saas-development",
    pillar: "development",
    shortDesc: "We help build SaaS products and platforms, bringing together the interfaces, workflows and core functionality required by the product.",
    capabilities: [],
    guidance: "We never make exaggerated claims about what the technology can do."
  },
  {
    id: "api-system-integration",
    title: "API Integrations",
    slug: "api-system-integration",
    route: "/services/api-system-integration",
    pillar: "development",
    shortDesc: "We integrate applications and services so information can move between systems more reliably and business workflows require less manual intervention.",
    capabilities: [],
    guidance: "We never make exaggerated claims about what the technology can do."
  },
  {
    id: "search-engine-optimization",
    title: "Search Engine Optimization",
    slug: "search-engine-optimization",
    aliases: ["seo", "search engine"],
    route: "/services/search-engine-optimization",
    pillar: "marketing",
    shortDesc: "We help improve your search visibility, reach relevant audiences and build a stronger organic presence across search engines.",
    capabilities: ["Search Engine Optimization (SEO)", "Technical SEO & Website Audits", "Keyword Research & Search Intent", "On-Page SEO & Content Optimization", "Local SEO", "Search Performance Monitoring"],
    guidance: "We help improve visibility and performance. We never guarantee rankings, leads, conversions or revenue."
  },
  {
    id: "ad-campaigns-brand-engagement",
    title: "Ad Campaigns & Brand Engagement",
    slug: "ad-campaigns-brand-engagement",
    aliases: ["social media", "paid ads", "advertising", "content marketing", "ad campaign"],
    route: "/services/ad-campaigns-brand-engagement",
    pillar: "marketing",
    shortDesc: "We create digital touchpoints that introduce your brand, engage your audience and communicate your value across relevant online channels.",
    capabilities: ["Social Media Marketing", "Paid Advertising & Campaign Management", "Content Marketing", "Brand Communication & Digital Strategy", "Campaign Creative & Ad Copy", "Audience Targeting & Engagement"],
    guidance: "We help improve visibility and performance. We never guarantee rankings, leads, conversions or revenue."
  },
  {
    id: "growth-marketing-conversion-optimization",
    title: "Growth Marketing & Conversion Optimization",
    slug: "growth-marketing-conversion-optimization",
    aliases: ["cro", "conversion", "lead generation", "growth marketing"],
    route: "/services/growth-marketing-conversion-optimization",
    pillar: "marketing",
    shortDesc: "We connect marketing activity with business goals through performance analysis, conversion improvements and data-informed growth strategies.",
    capabilities: ["Growth Marketing Strategy", "Conversion Rate Optimization (CRO)", "Landing Page Optimization", "Lead Generation Strategy", "Marketing Analytics & Reporting", "Customer Journey & Funnel Optimization"],
    guidance: "We help improve visibility and performance. We never guarantee rankings, leads, conversions or revenue."
  },
  {
    id: "product-photography-shoots",
    title: "Product Photography & Shoots",
    slug: "product-photography-shoots",
    aliases: ["photography", "photo shoot", "product shoot", "product photos"],
    route: "/services/product-photography-shoots",
    pillar: "creative",
    shortDesc: "We present your products with clear, considered visuals for ecommerce, websites, catalogues, advertising and social media.",
    capabilities: ["Product photography", "Commercial product shoots", "Product detail shots", "Brand-focused product visuals", "Campaign-ready image assets", "Product image editing"],
    guidance: "We only describe the creative services listed here."
  },
  {
    id: "video-editing-post-production",
    title: "Video Editing & Post-Production",
    slug: "video-editing-post-production",
    aliases: ["video editing", "post production", "edit my video"],
    route: "/services/video-editing-post-production",
    pillar: "creative",
    shortDesc: "We shape footage into focused, polished video content with considered pacing, clean edits and finishing suited to the intended platform.",
    capabilities: ["Video editing", "Colour correction and grading", "Audio cleanup where required", "Titles and text overlays", "Social media video edits", "Final exports in agreed formats"],
    guidance: "We only describe the creative services listed here."
  },
  {
    id: "commercial-promotional-videos",
    title: "Commercial & Promotional Videos",
    slug: "commercial-promotional-videos",
    aliases: ["promotional video", "commercial video", "brand video", "product video"],
    route: "/services/commercial-promotional-videos",
    pillar: "creative",
    shortDesc: "We introduce your business, explain an offering or showcase a product through video created for a clear communication goal.",
    capabilities: ["Brand introduction videos", "Product promotional videos", "Business showcase videos", "Campaign videos", "Short-form promotional content"],
    guidance: "We only describe the creative services listed here."
  }
];

// The three service pillars (sections on /services)
export const PILLARS = [
  {
    id: "development",
    title: "Software, AI & Product Development",
    anchor: "/services#development",
    shortDesc: "We develop custom applications, SaaS products, AI agents, automation and connected systems around real business requirements.",
    aliases: ["software ai product development", "development services", "technology services", "technology solutions"]
  },
  {
    id: "marketing",
    title: "Digital Marketing & Growth",
    anchor: "/services#marketing",
    shortDesc: "We help businesses improve search visibility, build brand awareness and engage relevant audiences, and strengthen marketing performance.",
    aliases: ["digital marketing", "marketing services", "marketing and growth"]
  },
  {
    id: "creative",
    title: "Creative Production",
    anchor: "/services#creative",
    shortDesc: "We create product photography, edited video and promotional content that give your brand a clearer voice.",
    aliases: ["creative production", "creative services", "video production", "video", "photo shoot"]
  }
];

export const PAGE_ROUTES = [
  { label: "Explore Services", route: "/services", desc: "Full catalog of Ideate X capabilities" },
  { label: "View Work", route: "/portfolio", desc: "Featured projects and platforms" },
  { label: "Case Studies", route: "/case-studies", desc: "The thinking behind selected projects" },
  { label: "About Us", route: "/about", desc: "Our team and how we work" },
  { label: "Insights", route: "/blog", desc: "Practical perspectives on creative, marketing and technology work" },
  { label: "Start a Project", route: "/contact", desc: "Tell us what you are working on" }
];

export const CHAT_STARTERS = [
  { label: "Explore Services", action: "explore_services" },
  { label: "Start a Project", action: "start_project" },
  { label: "How Ideate X Works", action: "how_we_work" },
  { label: "Ask a Question", action: "ask_question" }
];

export const SERVICE_QUICK_ACTIONS = [
  { label: "Software, AI & Development", text: "Tell me about Software, AI & Product Development" },
  { label: "Digital Marketing", text: "Tell me about Digital Marketing & Growth" },
  { label: "Creative Production", text: "Tell me about Creative Production" },
  { label: "AI Agents", text: "Tell me about AI Agentic Development" },
  { label: "SEO", text: "Tell me about Search Engine Optimization" },
  { label: "Product Photography", text: "Tell me about Product Photography & Shoots" }
];

export const COMMON_FAQS = [
  {
    keywords: ["what do you do", "what is ideate x", "who are you", "about ideate x", "overview"],
    answer: "Ideate X brings creative production, digital marketing and technology together. We create product photography and video content, help businesses with digital marketing (SEO, ad campaigns and growth marketing), and build AI agents, automations, chatbots, apps, websites, SaaS products and API integrations.",
    cta: { label: "Explore Services", route: "/services" }
  },
  {
    keywords: ["how does it work", "how do you work", "process", "workflow", "how does a project start", "kickoff"],
    answer: "Every project starts with a conversation. We learn about your business and goals, agree on the approach and priorities, create or build the work, and then review and refine it before it goes live.",
    cta: { label: "Learn About Our Process", route: "/about" }
  },
  {
    keywords: ["cost", "pricing", "price", "how much", "rate", "quote", "charges"],
    answer: "Project cost depends on the scope, features, integrations, and level of design and engineering involved. If you tell me a little about what you're building, I can help outline the requirements for the Ideate X team to provide an accurate estimate.",
    cta: { label: "Start a Project Enquiry", action: "start_project" }
  },
  {
    keywords: ["timeline", "how long", "duration", "time", "deadline", "how fast"],
    answer: "Timelines depend on the scope of the work, the number of deliverables and the feedback cycles involved. Tell us what you have in mind and the team will share a realistic timeline before work begins.",
    cta: { label: "Discuss Your Timeline", action: "start_project" }
  },
  {
    keywords: ["ownership", "ip", "code ownership", "who owns", "source code", "license"],
    answer: "You retain 100% full ownership of all custom source code, design assets, database schemas, and intellectual property from day one.",
    cta: { label: "About Ideate X Standards", route: "/about" }
  },
  {
    keywords: ["existing app", "existing code", "legacy", "work on existing", "maintain existing", "upgrade"],
    answer: "Yes. If you already have an application or website, tell us what you need, whether that is new features, integrations or improvements, and we will talk it through.",
    cta: { label: "Talk to the Team", route: "/contact" }
  },
  {
    keywords: ["location", "office", "where are you", "address", "chennai", "contact details"],
    answer: "Our primary office is located at Innov8 Millenia, 2nd Floor, Campus-1a, MGR Main Rd, Perungudi, Chennai, India. You can email us at hello@ideatex.co.in or call +91 8760007900.",
    cta: { label: "View Contact Page", route: "/contact" }
  }
];
