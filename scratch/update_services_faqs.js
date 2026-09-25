const fs = require('fs');
const path = require('path');

const servicesFaqs = {
  'ai-agentic-development': [
    {
      id: 1,
      question: 'How do you prevent AI hallucinations and ungrounded outputs in production?',
      answer: 'We implement deterministic schema enforcement (Zod/Pydantic), strict RAG ground-truth matching with citation attribution, confidence score thresholds, and mandatory human approval gates for high-stakes or irreversible operations.'
    },
    {
      id: 2,
      question: 'Is our proprietary company data used to train public LLMs?',
      answer: 'Never. We utilize zero-data-retention enterprise API agreements and store vector embeddings in private, VPC-isolated databases (pgvector / Pinecone) so your proprietary information is never shared or trained upon.'
    },
    {
      id: 3,
      question: 'Which AI models and providers do you support?',
      answer: 'We build model-agnostic agent architectures supporting OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), Google Gemini 1.5/2.0, as well as open-source LLMs (Llama 3, DeepSeek, Mistral) deployed on your private cloud infrastructure.'
    },
    {
      id: 4,
      question: 'How long does it take to develop and deploy an AI agent workflow?',
      answer: 'A focused discovery and working proof-of-concept typically takes 2–3 weeks. Full production-grade multi-agent architectures with tool integrations, telemetry, and evaluation benchmarks take 6–10 weeks.'
    },
    {
      id: 5,
      question: 'How do agents handle tool execution failures or API timeouts?',
      answer: 'We build stateful execution graphs with LangGraph featuring automatic exponential retries, fallback models, graceful failure messaging, and alert triggers for human supervisors.'
    }
  ],

  'saas-development': [
    {
      id: 1,
      question: 'How do you ensure complete data isolation between customer tenants?',
      answer: 'We implement rigorous PostgreSQL Row-Level Security (RLS) and workspace-scoped middleware to mathematically guarantee that no tenant can ever view or mutate another tenant\'s data.'
    },
    {
      id: 2,
      question: 'Can you handle usage-based, tiered, and metered subscription billing?',
      answer: 'Yes. We engineer Stripe Billing, LemonSqueezy, and Paddle integrations supporting tiered plans, per-seat licensing, free trials with dunning management, and high-frequency event ingestion for metered usage billing.'
    },
    {
      id: 3,
      question: 'Do you implement enterprise features like SSO, SAML, and audit logs?',
      answer: 'Yes. We build enterprise-ready capabilities including SAML/OIDC Single Sign-On (Okta, Azure AD, Google Workspace), SCIM user provisioning, granular role-based access control (RBAC), and immutable audit logs.'
    },
    {
      id: 4,
      question: 'What tech stack do you recommend for high-scale SaaS products?',
      answer: 'We typically build with Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL with Prisma ORM, Redis for caching and rate limiting, and containerized Node.js/Python microservices hosted on AWS or Vercel.'
    },
    {
      id: 5,
      question: 'What is the typical timeline for an MVP launch?',
      answer: 'A full-featured SaaS MVP with authentication, billing, dashboard interfaces, and core workflow features is typically engineered and launched within 8 to 12 weeks.'
    }
  ],

  'web-development': [
    {
      id: 1,
      question: 'Can non-technical team members update content and publish pages easily?',
      answer: 'Absolutely. We configure user-friendly headless CMS solutions (Sanity, Strapi, Contentful) or built-in CMS dashboards where marketing and operations teams can manage copy, upload media, publish blogs, and launch landing pages without touching code.'
    },
    {
      id: 2,
      question: 'How do you achieve 95–100 Google Lighthouse and Core Web Vitals scores?',
      answer: 'We leverage Next.js hybrid server-side rendering (SSR), static generation (SSG), automatic next-gen image optimization (AVIF/WebP), critical CSS extraction, font preloading, and aggressive JavaScript bundle tree-shaking.'
    },
    {
      id: 3,
      question: 'How do you ensure our existing SEO rankings are preserved during a redesign?',
      answer: 'We conduct comprehensive URL structure audits, configure 301 redirect mappings, generate dynamic XML sitemaps, maintain canonical URL structures, and implement schema.org structured JSON-LD data.'
    },
    {
      id: 4,
      question: 'Do you build custom web animations and interactive 3D experiences?',
      answer: 'Yes. We create fluid micro-interactions, scroll-driven storytelling, and interactive 3D scenes using GSAP, Framer Motion, Lenis Smooth Scroll, and Three.js/WebGL while maintaining 60fps performance.'
    },
    {
      id: 5,
      question: 'Who owns the code, design assets, and intellectual property?',
      answer: 'You own 100% of the source code, repository rights, Figma design files, and IP from day one. We provide full git handover and documentation upon delivery.'
    }
  ],

  'mobile-app-development': [
    {
      id: 1,
      question: 'Do we need separate engineering teams for iOS and Android?',
      answer: 'No. Our cross-platform engineering with React Native and Expo shares 95%+ of the codebase between iOS and Android, drastically reducing upfront development costs and ongoing maintenance overhead without sacrificing native 60fps performance.'
    },
    {
      id: 2,
      question: 'Can updates and bug fixes be published without waiting for App Store review?',
      answer: 'Yes. We implement Expo EAS Over-The-Air (OTA) updates, enabling instant rollout of critical bug fixes, UI improvements, and content updates directly to users\' devices.'
    },
    {
      id: 3,
      question: 'How do you handle offline mode and unreliable connectivity?',
      answer: 'We implement offline-first local SQLite / MMKV caching with background synchronization queues and conflict-resolution strategies, allowing users to interact with the app seamlessly even without an active internet connection.'
    },
    {
      id: 4,
      question: 'Do you manage the entire Apple App Store and Google Play submission process?',
      answer: 'Yes. We handle the full publishing lifecycle including developer account setup, provisioning profiles, privacy manifest compliance, store screenshots, metadata preparation, and direct responses to store review inquiries until approved.'
    },
    {
      id: 5,
      question: 'How long does it take to develop a custom mobile application?',
      answer: 'A standard cross-platform MVP app typically takes 8–12 weeks from initial wireframes to App Store and Play Store launch.'
    }
  ],

  'api-system-integration': [
    {
      id: 1,
      question: 'How do you handle rate limits and downtime from third-party vendor APIs?',
      answer: 'We engineer resilient middleware with Redis token-bucket rate limiters, intelligent caching, exponential backoff retry policies, and dead-letter queues (DLQ) to ensure zero data loss during upstream third-party outages.'
    },
    {
      id: 2,
      question: 'Can you integrate with legacy ERPs, SOAP services, or on-premise databases?',
      answer: 'Yes. We specialize in building secure REST, GraphQL, or gRPC wrapper layers and event bridges on top of legacy SAP, NetSuite, SOAP web services, and on-premise SQL/Oracle databases via secure VPN and SSH tunnels.'
    },
    {
      id: 3,
      question: 'How is security handled for API credentials, tokens, and sensitive data?',
      answer: 'All API keys, certificates, and secrets are encrypted at rest and managed through cloud secret managers (AWS Secrets Manager / Doppler). We enforce mTLS, JWT token rotation, and strict IP allowlisting.'
    },
    {
      id: 4,
      question: 'Do you provide developer documentation and SDKs for our APIs?',
      answer: 'Yes. We automatically generate interactive OpenAPI (Swagger) documentation, Postman collections, and TypeScript/Python starter SDKs for internal engineers or third-party developer ecosystems.'
    },
    {
      id: 5,
      question: 'What protocols and data formats do you support?',
      answer: 'We work across REST (JSON), GraphQL, gRPC (Protobuf), WebSockets for real-time bidirectional streaming, Webhooks, and event buses like Apache Kafka and RabbitMQ.'
    }
  ],

  'digital-marketing': [
    {
      id: 1,
      question: 'How do you measure marketing campaign performance and ROI?',
      answer: 'We focus on real business revenue metrics: Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), Cost Per Qualified Lead (CPL), and pipeline conversion velocity—avoiding vanity metrics like superficial impressions.'
    },
    {
      id: 2,
      question: 'Do you design and code the conversion landing pages as well?',
      answer: 'Yes! Because we are a full-stack engineering and design studio, we build custom, sub-second loading Next.js landing pages with interactive calculators, forms, and CRM integrations that convert at substantially higher rates than generic template builders.'
    },
    {
      id: 3,
      question: 'What paid channels do you manage?',
      answer: 'We manage high-intent Google Search & Performance Max ads, targeted LinkedIn B2B account-based marketing (ABM) campaigns, Meta (Facebook/Instagram) acquisition funnels, and programmatic retargeting.'
    },
    {
      id: 4,
      question: 'How do you track attribution across modern privacy regulations?',
      answer: 'We set up server-side Google Analytics 4 (GA4), Meta Conversions API (CAPI), and PostHog tracking with full GDPR/CCPA compliance, providing clean multi-touch attribution despite ad-blockers and browser cookie restrictions.'
    },
    {
      id: 5,
      question: 'What is the typical ramp-up time for marketing campaigns?',
      answer: 'Funnel setup, conversion tracking, landing page builds, and initial campaign launch take 2–3 weeks. Controlled A/B testing and algorithmic bidding optimization begin producing reliable CAC benchmarks within the first 30–45 days.'
    }
  ],

  'hosting-deployment-maintenance': [
    {
      id: 1,
      question: 'What happens if our website or server experiences an outage?',
      answer: 'Our automated 24/7 telemetry monitoring (Datadog / BetterStack / Sentry) detects anomalies within seconds, instantly notifying our on-call engineers. We trigger automated failover routines and initiate incident resolution according to our SLA.'
    },
    {
      id: 2,
      question: 'Can you help optimize cloud architecture to reduce monthly hosting costs?',
      answer: 'Yes. We perform cloud cost audits across AWS, Google Cloud, and Vercel—right-sizing underutilized instances, implementing edge CDN caching, optimizing database IOPS, and setting up automated scaling, typically reducing cloud spend by 30–50%.'
    },
    {
      id: 3,
      question: 'How do you manage database backups and disaster recovery?',
      answer: 'We configure automated daily and continuous point-in-time recovery (PITR) backups across isolated geographical regions, conducting routine recovery simulations to guarantee zero data loss.'
    },
    {
      id: 4,
      question: 'How are software package security updates and patches handled?',
      answer: 'We scan dependencies continuously for CVE vulnerabilities, testing security patches in staging environments with automated regression test suites before pushing zero-downtime production updates.'
    },
    {
      id: 5,
      question: 'What SLA tiers do you offer for ongoing support?',
      answer: 'We offer customized SLAs ranging from standard business-hours maintenance and weekly patch releases to 24/7 high-priority incident response with sub-15-minute response times for mission-critical platforms.'
    }
  ],

  'product-strategy-consulting': [
    {
      id: 1,
      question: 'What is included in a Technical Architecture and Codebase Audit?',
      answer: 'You receive an in-depth evaluation covering code maintainability, security vulnerabilities (OWASP), database bottlenecks, cloud scalability limits, and an actionable executive roadmap prioritizing quick wins and architectural refactoring.'
    },
    {
      id: 2,
      question: 'How does a Fractional CTO engagement work?',
      answer: 'We integrate directly with your leadership team for a set number of monthly hours, leading technical hiring, advising on architecture decisions, conducting vendor assessments, unblocking sprint roadblocks, and preparing technical decks for investors.'
    },
    {
      id: 3,
      question: 'Can you assist with investor technical due diligence during fundraising?',
      answer: 'Yes. We prepare enterprise architecture documentation, data flow diagrams, IP assignment verification, and participate directly in technical Q&A sessions with venture capital and private equity diligence teams.'
    },
    {
      id: 4,
      question: 'How do you help companies decide between building custom software vs. buying SaaS?',
      answer: 'We provide rigorous cost-benefit and total cost of ownership (TCO) analyses, identifying where custom development creates proprietary competitive advantage and where third-party SaaS saves time and budget.'
    },
    {
      id: 5,
      question: 'What is the typical duration of a strategy engagement?',
      answer: 'Standalone architecture audits and MVP roadmaps take 2–4 weeks. Fractional CTO and ongoing advisory relationships typically operate on 3- to 12-month retainer cycles.'
    }
  ],

  'chatbot-development': [
    {
      id: 1,
      question: 'Can we update the chatbot\'s knowledge base and responses without coding?',
      answer: 'Yes! The chatbot connects directly to your CMS Knowledge Manager, allowing you to update company FAQs, service details, pricing guidelines, and policies in real time without any code deployments.'
    },
    {
      id: 2,
      question: 'How does the chatbot prevent hallucinated or unauthorized responses?',
      answer: 'We enforce strict system prompt guardrails, semantic similarity retrieval thresholds, and strict fallback routing. If an inquiry falls outside approved documentation, the bot gracefully offers human escalation or lead capture.'
    },
    {
      id: 3,
      question: 'Can the chatbot qualify leads and schedule appointments automatically?',
      answer: 'Yes. The bot can ask custom qualifying questions (e.g. budget, timeline, project scope), collect contact information, validate emails/phone numbers, sync directly into your CRM (HubSpot/Salesforce), and provide Calendly booking links.'
    },
    {
      id: 4,
      question: 'Can the chatbot integrate with our internal systems or WhatsApp?',
      answer: 'Yes. We build omnichannel conversational bots that deploy as embeddable web widgets, Slack/Discord internal bots, or WhatsApp Business API integrations.'
    },
    {
      id: 5,
      question: 'What AI models power the chatbot?',
      answer: 'We utilize GPT-4o, Claude 3.5 Sonnet, and custom fine-tuned embeddings with streaming response support for lightning-fast, natural conversation flow.'
    }
  ],

  'custom-apps-development': [
    {
      id: 1,
      question: 'Can custom applications connect with our existing legacy database or SQL server?',
      answer: 'Yes. We build modern web and cloud portals that connect securely with existing PostgreSQL, MySQL, MS SQL Server, Oracle, or MongoDB databases without disrupting your active business operations.'
    },
    {
      id: 2,
      question: 'How do you handle user permissions, roles, and access levels?',
      answer: 'We implement granular Role-Based Access Control (RBAC) and attribute-based permissions, allowing you to restrict specific dashboards, reports, and data fields based on user roles (e.g., admin, manager, staff, external client).'
    },
    {
      id: 3,
      question: 'Can the application generate automated PDF reports, invoices, and data exports?',
      answer: 'Yes. We build high-speed PDF generation engines (for invoices, compliance certificates, and executive summaries) as well as scheduled Excel/CSV exports and email delivery triggers.'
    },
    {
      id: 4,
      question: 'How long does it take to build a custom internal business application?',
      answer: 'Typical custom internal tools or client portals take 6–10 weeks for an initial production release, built iteratively with bi-weekly staging demos.'
    },
    {
      id: 5,
      question: 'What happens after the application is deployed?',
      answer: 'We provide thorough user documentation, admin training sessions, source code handover, and optional ongoing hosting, monitoring, and feature iteration support.'
    }
  ]
};

// 1. Update data/cms-db.json
const dbPath = path.join(__dirname, '..', 'data', 'cms-db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.services.forEach(service => {
  if (servicesFaqs[service.slug]) {
    service.faqs = servicesFaqs[service.slug];
  }
});

// Also add hosting-deployment-maintenance and product-strategy-consulting if not present in db.services
const existingSlugs = new Set(db.services.map(s => s.slug));
if (!existingSlugs.has('hosting-deployment-maintenance')) {
  db.services.push({
    id: 'srv-09',
    slug: 'hosting-deployment-maintenance',
    title: 'Hosting, Deployment & Maintenance',
    category: 'Support',
    tagline: 'Reliable cloud infrastructure, automated deployments, and 24/7 uptime monitoring.',
    heroDescription: 'We manage your cloud hosting, automated CI/CD pipelines, SSL certificates, database backups, security patches, and ongoing software health.',
    shortDescription: 'Reliable cloud infrastructure, CI/CD pipelines, and 24/7 uptime monitoring.',
    iconName: 'Server',
    image: {
      src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Cloud hosting servers and data center infrastructure'
    },
    overview: {
      headline: 'Zero-Downtime Infrastructure & Proactive Maintenance',
      body: 'Launching software is only the first step. To maintain customer trust and operational stability, your applications require continuous monitoring, security patching, database optimization, and automated deployment pipelines. We act as your dedicated DevOps and platform reliability team.',
      highlights: [
        'Automated CI/CD pipelines deploying code from Git in minutes',
        '24/7 uptime monitoring and instant incident response',
        'Automated daily database backups with point-in-time recovery',
        'Proactive package dependency security updates and vulnerability scanning'
      ]
    },
    deliverables: [
      {
        title: 'Automated CI/CD Pipelines',
        description: 'Push code with confidence through automated test suites and zero-downtime deploys.',
        points: ['GitHub Actions / GitLab CI configuration', 'Automated staging preview environments', 'Zero-downtime deployments', 'One-click rollbacks']
      }
    ],
    techStack: [
      { category: 'Cloud Providers', tools: ['AWS', 'Vercel', 'Cloudflare', 'DigitalOcean'] },
      { category: 'Containers & CI', tools: ['Docker', 'GitHub Actions', 'Terraform', 'Kubernetes'] }
    ],
    process: [
      { step: '01', title: 'Infrastructure Audit', desc: 'Review existing servers and optimize cloud hosting costs.' },
      { step: '02', title: 'CI/CD Setup', desc: 'Build automated test pipelines and staging preview environments.' },
      { step: '03', title: 'Backup & Monitoring', desc: 'Configure 24/7 uptime alerts and automated backup schedules.' },
      { step: '04', title: 'Continuous Support', desc: 'Ongoing server optimization and dependency updates.' }
    ],
    faqs: servicesFaqs['hosting-deployment-maintenance'],
    related: ['saas-development', 'web-development', 'api-system-integration'],
    status: 'published',
    order: 9,
    seoTitle: 'Hosting, Cloud Deployment & Maintenance | Ideate X',
    seoDescription: 'Cloud infrastructure setup, automated CI/CD pipelines, uptime monitoring, and ongoing software maintenance by Ideate X.'
  });
}

if (!existingSlugs.has('product-strategy-consulting')) {
  db.services.push({
    id: 'srv-10',
    slug: 'product-strategy-consulting',
    title: 'Product Strategy & Technical Consulting',
    category: 'Strategy',
    tagline: 'Strategic technical direction, architecture reviews, and product roadmap guidance.',
    heroDescription: 'We help founders and enterprise leaders make high-confidence technology decisions, avoid costly technical debt, and plan clear software roadmaps.',
    shortDescription: 'Fractional CTO advisory, independent system audits, and product roadmaps.',
    iconName: 'Compass',
    image: {
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Technology leaders and consultants discussing product roadmap and architecture'
    },
    overview: {
      headline: 'High-Level Technical Leadership for Critical Decisions',
      body: 'Choosing the wrong technology stack or building bloated feature sets can cost months of time and budget. We provide fractional CTO advisory, architectural assessments, and product roadmap strategy to de-risk your investment and accelerate time-to-market.',
      highlights: [
        'Fractional CTO guidance for startups and scaling companies',
        'Independent architecture audits reviewing security and scalability',
        'Vendor and tech stack evaluations tailored to your constraints',
        'Pragmatic product roadmaps balancing customer delivery with quality'
      ]
    },
    deliverables: [
      {
        title: 'Architecture & Codebase Audits',
        description: 'Comprehensive review of your system architecture, security posture, and bottlenecks.',
        points: ['Scalability & bottleneck analysis', 'Security vulnerability review', 'Code quality score', 'Remediation roadmap']
      }
    ],
    techStack: [
      { category: 'Methodologies', tools: ['Domain-Driven Design', 'Event-Driven Architecture', 'Clean Architecture'] },
      { category: 'Tools', tools: ['SonarQube', 'AWS Well-Architected', 'Linear', 'Jira'] }
    ],
    process: [
      { step: '01', title: 'Technical Discovery', desc: 'Understand business goals, team structure, and pain points.' },
      { step: '02', title: 'System Audit', desc: 'Review repositories, architecture, and database schemas.' },
      { step: '03', title: 'Strategic Report', desc: 'Deliver an executive roadmap with concrete recommendations.' },
      { step: '04', title: 'Advisory Support', desc: 'Provide continuous guidance during engineering execution.' }
    ],
    faqs: servicesFaqs['product-strategy-consulting'],
    related: ['saas-development', 'ai-agentic-development', 'hosting-deployment-maintenance'],
    status: 'published',
    order: 10,
    seoTitle: 'Product Strategy & Technical Consulting | Ideate X',
    seoDescription: 'Fractional CTO advisory, independent architecture audits, tech stack evaluations, and pragmatic software roadmaps by Ideate X.'
  });
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated cms-db.json with all service FAQs!');
