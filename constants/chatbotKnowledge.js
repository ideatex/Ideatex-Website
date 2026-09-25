/**
 * Ideate X Chatbot Knowledge Base & Intent Configuration
 * 
 * Strict knowledge boundary: Only approved Ideate X facts and the 9 verified services.
 * Never fabricates pricing, delivery dates, client names, awards, or capabilities.
 */

export const COMPANY_PROFILE = {
  name: "Ideate X",
  legalName: "Ideate X",
  tagline: "Software, Products & Digital Growth",
  description: "Ideate X is a software development company building AI agents, automated workflows, custom applications, mobile apps, web applications, SaaS platforms, API integrations, and growth systems.",
  location: "Innov8 Millenia, 2nd Floor, Campus-1a, MGR Main Rd, Perungudi, Chennai, Tamil Nadu 600096, India",
  email: "hello@ideatex.co.in",
  phones: ["+91 8760007900", "+91 7305905661"],
  responseTimeline: "24–48 hours",
  ipOwnership: "Clients retain 100% full ownership of all custom source code, design assets, database schemas, and intellectual property from day one.",
  process: [
    { step: "01", title: "Discovery & Blueprint", desc: "Understand requirements, business logic, architecture constraints, and roadmap." },
    { step: "02", title: "Architecture & UX", desc: "Figma design prototypes, database models, and cloud infrastructure planning." },
    { step: "03", title: "Milestone Sprints", desc: "High-velocity two-week development sprints with continuous staging demos." },
    { step: "04", title: "Production Launch", desc: "Zero-downtime deployment, automated testing, and post-launch optimization." }
  ]
};

export const APPROVED_SERVICES = [
  {
    id: "ai-agentic-development",
    title: "AI Agentic Development",
    slug: "ai-agentic-development",
    route: "/services/ai-agentic-development",
    shortDesc: "We build practical AI agents around specific business tasks, workflows, tools, and company data.",
    capabilities: [
      "Task-specific autonomous agents",
      "Agent workflow pipelines (LangGraph / LangChain)",
      "Secure Retrieval-Augmented Generation (RAG) over private company documents",
      "Tool and API-connected agents",
      "Internal knowledge assistants",
      "Human-in-the-loop review checkpoints"
    ],
    guidance: "We build AI agents around specific business tasks and workflows. We do not make exaggerated claims about AI."
  },
  {
    id: "workflow-automations",
    title: "Workflow Automations",
    slug: "workflow-automations",
    route: "/services/workflow-automations",
    shortDesc: "We reduce repetitive manual work by connecting systems and automating multi-step business processes.",
    capabilities: [
      "Automated data transfer between tools",
      "Notification and alert pipelines",
      "Multi-stage approval workflows",
      "Lead routing and customer onboarding automation",
      "System-to-system scheduled background jobs"
    ]
  },
  {
    id: "chatbot-development",
    title: "Chatbot Development",
    slug: "chatbot-development",
    route: "/services/chatbot-development",
    shortDesc: "We build useful conversational experiences for websites, businesses, customers, and internal teams.",
    capabilities: [
      "Website enquiry and lead qualification chatbots",
      "Customer support assistants",
      "Internal team knowledge assistants",
      "FAQ and documentation assistants",
      "CRM-connected conversational workflows"
    ]
  },
  {
    id: "custom-apps-development",
    title: "Custom Apps Development",
    slug: "custom-apps-development",
    route: "/services/custom-apps-development",
    shortDesc: "We build tailored software around specific business requirements where off-the-shelf software falls short.",
    capabilities: [
      "Internal operational platforms and dashboards",
      "Custom business management software",
      "Admin portals and permission management",
      "Bespoke data entry and workflow systems"
    ]
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    route: "/services/mobile-app-development",
    shortDesc: "We engineer cross-platform mobile applications for iOS and Android with 60fps performance and offline synchronization.",
    capabilities: [
      "Customer-facing mobile applications",
      "Internal business and field operations apps",
      "Marketplace and on-demand platforms",
      "Push notifications and biometric authentication",
      "Offline-first data sync"
    ]
  },
  {
    id: "web-development",
    title: "Modern Web Development",
    slug: "web-development",
    route: "/services/web-development",
    shortDesc: "We build modern, ultra-fast websites, portals, and web applications with top Core Web Vitals.",
    capabilities: [
      "High-converting corporate and marketing websites",
      "Customer web portals and client hubs",
      "Full-stack Next.js and React 19 web applications",
      "Headless CMS and dynamic content architecture",
      "Fluid kinetic interactions and accessibility"
    ]
  },
  {
    id: "saas-development",
    title: "SaaS Platform Engineering",
    slug: "saas-development",
    route: "/services/saas-development",
    shortDesc: "We build subscription-ready multi-tenant SaaS products with billing, team permissions, and scalable backends.",
    capabilities: [
      "Multi-tenant database architectures (Postgres RLS)",
      "Stripe recurring subscription and seat billing",
      "Granular role-based access control (RBAC)",
      "Customer analytics dashboards and admin panels",
      "Scalable cloud infrastructure"
    ]
  },
  {
    id: "api-system-integration",
    title: "API & System Integration",
    slug: "api-system-integration",
    route: "/services/api-system-integration",
    shortDesc: "We connect third-party APIs, payment gateways, databases, CRMs, and internal systems for seamless data flow.",
    capabilities: [
      "Payment gateway integrations (Stripe, Razorpay, Lemon Squeezy)",
      "CRM and ERP integrations (Salesforce, HubSpot, Zoho)",
      "Third-party API connections and webhooks",
      "Real-time bidirectional data synchronization",
      "Legacy system modernization"
    ]
  },
  {
    id: "digital-marketing",
    title: "SEO & Growth Marketing",
    slug: "digital-marketing",
    route: "/services/digital-marketing",
    shortDesc: "We help businesses improve search visibility, optimize conversion funnels, and attract high-intent customers.",
    capabilities: [
      "Technical on-page SEO and structured schema",
      "High-intent keyword and content strategy",
      "Conversion Rate Optimization (CRO)",
      "Audience acquisition and landing page funnels"
    ],
    guidance: "We help businesses improve online visibility and customer acquisition. We never guarantee fixed rankings or revenue."
  }
];

export const PAGE_ROUTES = [
  { label: "Explore Services", route: "/services", desc: "Full catalog of Ideate X capabilities" },
  { label: "View Work", route: "/portfolio", desc: "Featured projects and platforms" },
  { label: "Case Studies", route: "/case-studies", desc: "Deep technical architectures and outcomes" },
  { label: "About Us", route: "/about", desc: "Our team, standards, and delivery process" },
  { label: "Insights", route: "/blog", desc: "Engineering perspectives and principles" },
  { label: "Start a Project", route: "/contact", desc: "Direct consultation with technical leads" }
];

export const CHAT_STARTERS = [
  { label: "Explore Services", action: "explore_services" },
  { label: "Start a Project", action: "start_project" },
  { label: "How Ideate X Works", action: "how_we_work" },
  { label: "Ask a Question", action: "ask_question" }
];

export const SERVICE_QUICK_ACTIONS = [
  { label: "AI Agents", text: "Tell me about AI Agentic Development" },
  { label: "Workflow Automation", text: "I want to automate a business workflow" },
  { label: "Build an App", text: "I want to build a mobile or web app" },
  { label: "Build a SaaS", text: "I want to build a SaaS platform" },
  { label: "API Integrations", text: "I need API integrations" },
  { label: "SEO & Growth", text: "Tell me about SEO & Growth Marketing" }
];

export const COMMON_FAQS = [
  {
    keywords: ["what do you do", "what is ideate x", "who are you", "about ideate x", "overview"],
    answer: "Ideate X is a software development and digital engineering company. We build AI agents, automated workflows, custom business apps, mobile apps, web applications, SaaS platforms, API integrations, and SEO growth systems.",
    cta: { label: "Explore Services", route: "/services" }
  },
  {
    keywords: ["how does it work", "how do you work", "process", "workflow", "how does a project start", "kickoff"],
    answer: "Projects start with a conversation to understand your requirements and goals. We then create an architectural blueprint, design prototypes, run two-week milestone development sprints, and deliver tested production software.",
    cta: { label: "Learn About Our Process", route: "/about" }
  },
  {
    keywords: ["cost", "pricing", "price", "how much", "rate", "quote", "charges"],
    answer: "Project cost depends on the scope, features, integrations, and level of design and engineering involved. If you tell me a little about what you're building, I can help outline the requirements for the Ideate X team to provide an accurate estimate.",
    cta: { label: "Start a Project Enquiry", action: "start_project" }
  },
  {
    keywords: ["timeline", "how long", "duration", "time", "deadline", "how fast"],
    answer: "Timelines depend on the product scope, features, integrations, and feedback cycles. Typical focused applications take 4 to 8 weeks, while comprehensive SaaS or multi-agent systems range from 8 to 16 weeks. The team provides milestone schedules once requirements are clear.",
    cta: { label: "Discuss Your Timeline", action: "start_project" }
  },
  {
    keywords: ["ownership", "ip", "code ownership", "who owns", "source code", "license"],
    answer: "You retain 100% full ownership of all custom source code, design assets, database schemas, and intellectual property from day one.",
    cta: { label: "About Ideate X Standards", route: "/about" }
  },
  {
    keywords: ["existing app", "existing code", "legacy", "work on existing", "maintain existing", "upgrade"],
    answer: "Yes. We can work with your existing application to add features, modernize architecture, connect third-party APIs, optimize performance, or take over maintenance.",
    cta: { label: "Talk to Engineering Team", route: "/contact" }
  },
  {
    keywords: ["location", "office", "where are you", "address", "chennai", "contact details"],
    answer: "Our primary office is located at Innov8 Millenia, 2nd Floor, Campus-1a, MGR Main Rd, Perungudi, Chennai, India. You can email us at hello@ideatex.co.in or call +91 8760007900.",
    cta: { label: "View Contact Page", route: "/contact" }
  }
];
