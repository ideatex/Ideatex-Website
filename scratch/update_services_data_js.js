const fs = require('fs');
const path = require('path');

const servicesDataJsContent = `// Centralized data repository for all Studio 52 / Ideate X services
import {
  Bot, Cloud, Globe, Smartphone,
  Cpu, Megaphone, Server, Compass,
  CheckCircle2, Terminal, Shield, Workflow, Database,
  GitBranch, RefreshCw, BarChart3, Activity,
  Lock, Key, Sliders, Monitor, Radio, MessageSquare
} from 'lucide-react';

export const SERVICES_DATA = {
  'ai-agentic-development': {
    slug: 'ai-agentic-development',
    category: 'AI & Automation',
    title: 'AI Agentic Development',
    tagline: 'Autonomous AI agents engineered for real-world enterprise workflows.',
    heroDescription: 'We design and deploy practical agentic workflows that integrate LLMs, tool orchestration, internal knowledge bases, and human-in-the-loop validation.',
    icon: Bot,
    image: {
      src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'AI analytics interface and neural network model execution',
    },
    overview: {
      headline: 'Autonomous Systems Beyond Simple Chatbots',
      body: 'Generative AI is only useful when it executes actions, accesses company data securely, and integrates directly with existing business tools. We develop autonomous agent architectures with strict guardrails, function calling, vector embeddings, and real-time validation so your agents perform meaningful cognitive work accurately.',
      highlights: [
        'Secure Retrieval-Augmented Generation (RAG) over private company documents',
        'Function calling and API orchestration to execute tasks across software tools',
        'Stateful multi-agent collaboration with supervisor and worker hierarchies',
        'Deterministic validation guardrails preventing hallucinations and unauthorized actions',
      ],
    },
    deliverables: [
      {
        title: 'Custom Autonomous Agents',
        description: 'Domain-specific agents designed to research, draft, execute, and verify tasks.',
        points: ['LangChain & LangGraph frameworks', 'Tool execution & function calling', 'Persistent memory & conversation state', 'Self-correcting feedback loops'],
      },
      {
        title: 'Enterprise RAG & Knowledge Systems',
        description: 'Connect internal documents, databases, and wikis for instant, cited intelligence.',
        points: ['Vector databases (Pinecone / pgvector)', 'Semantic chunking & hybrid search', 'Source attribution & citation links', 'Role-based document access controls'],
      },
      {
        title: 'Multi-Agent Workflow Pipelines',
        description: 'Orchestrate teams of specialized agents handling complex multi-step operations.',
        points: ['Supervisor-worker agent models', 'Parallel execution pipelines', 'Human-in-the-loop review checkpoints', 'Audit trails & execution logs'],
      },
      {
        title: 'LLM Fine-Tuning & Prompt Guardrails',
        description: 'Optimize model outputs for domain accuracy, tone consistency, and compliance.',
        points: ['Structured output enforcement (JSON/Zod)', 'Cost & latency optimization', 'Safety & prompt-injection filters', 'Custom evaluations & benchmarks'],
      },
    ],
    techStack: [
      { category: 'AI & Orchestration', tools: ['LangGraph', 'LangChain', 'LlamaIndex', 'OpenAI API', 'Anthropic Claude'] },
      { category: 'Vector & Data', tools: ['pgvector', 'Pinecone', 'Qdrant', 'Unstructured.io'] },
      { category: 'Backend & APIs', tools: ['Python', 'FastAPI', 'Node.js', 'Celery', 'Redis'] },
      { category: 'Monitoring & Eval', tools: ['Langfuse', 'LangSmith', 'OpenTelemetry', 'Weights & Biases'] },
    ],
    process: [
      { step: '01', title: 'Workflow & Data Audit', desc: 'Identify repetitive knowledge tasks, data schemas, tool APIs, and safety requirements.' },
      { step: '02', title: 'Agent Architecture', desc: 'Build RAG pipelines, define function definitions, and establish deterministic guardrails.' },
      { step: '03', title: 'Evaluation & Benchmarking', desc: 'Run automated evaluations on real historical data to tune accuracy and eliminate hallucinations.' },
      { step: '04', title: 'Integration & Live Deployment', desc: 'Deploy agents into Slack, internal dashboards, CRMs, or customer-facing apps.' },
    ],
    faqs: [
      {
        id: 1,
        question: 'How do you prevent AI hallucinations and ungrounded outputs in production?',
        answer: 'We implement deterministic schema enforcement (Zod/Pydantic), strict RAG ground-truth matching with citation attribution, confidence score thresholds, and mandatory human approval gates for high-stakes or irreversible operations.',
      },
      {
        id: 2,
        question: 'Is our proprietary company data used to train public LLMs?',
        answer: 'Never. We utilize zero-data-retention enterprise API agreements and store vector embeddings in private, VPC-isolated databases (pgvector / Pinecone) so your proprietary information is never shared or trained upon.',
      },
      {
        id: 3,
        question: 'Which AI models and providers do you support?',
        answer: 'We build model-agnostic agent architectures supporting OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), Google Gemini 1.5/2.0, as well as open-source LLMs (Llama 3, DeepSeek, Mistral) deployed on your private cloud infrastructure.',
      },
      {
        id: 4,
        question: 'How long does it take to develop and deploy an AI agent workflow?',
        answer: 'A focused discovery and working proof-of-concept typically takes 2–3 weeks. Full production-grade multi-agent architectures with tool integrations, telemetry, and evaluation benchmarks take 6–10 weeks.',
      },
      {
        id: 5,
        question: 'How do agents handle tool execution failures or API timeouts?',
        answer: 'We build stateful execution graphs with LangGraph featuring automatic exponential retries, fallback models, graceful failure messaging, and alert triggers for human supervisors.',
      },
    ],
    related: ['saas-development', 'api-system-integration', 'web-development'],
  },

  'saas-development': {
    slug: 'saas-development',
    category: 'Engineering',
    title: 'SaaS Platform Engineering',
    tagline: 'Multi-tenant, subscription-ready SaaS products built for scale.',
    heroDescription: 'We build complete SaaS platforms with multi-tenancy, subscription billing, team permissions, analytics dashboards, and scalable cloud backends.',
    icon: Cloud,
    image: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'SaaS subscription analytics and enterprise dashboard',
    },
    overview: {
      headline: 'Architected for Thousands of Concurrent Tenants',
      body: 'Building a SaaS platform involves complex foundational decisions: tenant data isolation, recurring subscription billing, seat management, webhook reliability, and automated onboarding. We deliver battle-tested SaaS foundations that empower you to onboard B2B teams, collect recurring revenue, and scale seamlessly without rewriting core architecture.',
      highlights: [
        'Secure multi-tenant data partitioning (schema or row-level security)',
        'Stripe Billing & LemonSqueezy integration with tiered subscriptions & usage metering',
        'Enterprise SSO (SAML / Okta / Google Workspace) and granular role-based permissions',
        'Live interactive dashboards with real-time charting and data exports',
      ],
    },
    deliverables: [
      {
        title: 'Multi-Tenant Architecture',
        description: 'Isolated workspaces, organizations, and team permissions.',
        points: ['Row-level security (RLS)', 'Custom domain routing', 'Member invitations & roles', 'Activity & audit logs'],
      },
      {
        title: 'Recurring Billing & Subscription Engine',
        description: 'Frictionless checkout, upgrade flows, customer portals, and webhooks.',
        points: ['Stripe Checkout & Billing Portal', 'Tiered, seat-based & usage pricing', 'Invoice generation & VAT handling', 'Dunning management & grace periods'],
      },
      {
        title: 'Analytics & Management Dashboards',
        description: 'High-speed dashboards for end-users and internal platform administrators.',
        points: ['Real-time metrics & data charts', 'CSV/PDF data export engine', 'Admin impersonation & support tools', 'Feature flags & tier gating'],
      },
      {
        title: 'Public API & Developer Webhooks',
        description: 'Empower your customers to automate workflows and build integrations.',
        points: ['API key generation & rate limiting', 'Outgoing webhook dispatchers', 'Interactive API docs (OpenAPI/Swagger)', 'SDK starter boilerplates'],
      },
    ],
    techStack: [
      { category: 'App Framework', tools: ['Next.js', 'React', 'Node.js', 'TypeScript'] },
      { category: 'Data & Auth', tools: ['PostgreSQL', 'Prisma', 'Supabase Auth', 'Clerk', 'NextAuth'] },
      { category: 'Payments', tools: ['Stripe Billing', 'LemonSqueezy', 'Paddle'] },
      { category: 'Cloud & Queues', tools: ['AWS ECS', 'Vercel', 'Redis (Upstash)', 'Resend'] },
    ],
    process: [
      { step: '01', title: 'SaaS Blueprint', desc: 'Define tenant models, pricing structures, authentication flows, and database schemas.' },
      { step: '02', title: 'Core Platform Build', desc: 'Implement workspace isolation, Stripe checkout, dashboards, and role management.' },
      { step: '03', title: 'Webhooks & Edge Cases', desc: 'Thoroughly test invoice failures, subscription cancellations, upgrades, and seat limits.' },
      { step: '04', title: 'Production Rollout', desc: 'Deploy with monitoring, automated backups, error tracking, and performance alerting.' },
    ],
    faqs: [
      {
        id: 1,
        question: 'How do you ensure complete data isolation between customer tenants?',
        answer: 'We implement rigorous PostgreSQL Row-Level Security (RLS) and workspace-scoped middleware to mathematically guarantee that no tenant can ever view or mutate another tenant\\'s data.',
      },
      {
        id: 2,
        question: 'Can you handle usage-based, tiered, and metered subscription billing?',
        answer: 'Yes. We engineer Stripe Billing, LemonSqueezy, and Paddle integrations supporting tiered plans, per-seat licensing, free trials with dunning management, and high-frequency event ingestion for metered usage billing.',
      },
      {
        id: 3,
        question: 'Do you implement enterprise features like SSO, SAML, and audit logs?',
        answer: 'Yes. We build enterprise-ready capabilities including SAML/OIDC Single Sign-On (Okta, Azure AD, Google Workspace), SCIM user provisioning, granular role-based access control (RBAC), and immutable audit logs.',
      },
      {
        id: 4,
        question: 'What tech stack do you recommend for high-scale SaaS products?',
        answer: 'We typically build with Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL with Prisma ORM, Redis for caching and rate limiting, and containerized Node.js/Python microservices hosted on AWS or Vercel.',
      },
      {
        id: 5,
        question: 'What is the typical timeline for an MVP launch?',
        answer: 'A full-featured SaaS MVP with authentication, billing, dashboard interfaces, and core workflow features is typically engineered and launched within 8 to 12 weeks.',
      },
    ],
    related: ['ai-agentic-development', 'api-system-integration', 'web-development'],
  },

  'web-development': {
    slug: 'web-development',
    category: 'Engineering',
    title: 'Modern Web Development',
    tagline: 'Blazing fast, SEO-optimized websites and web applications.',
    heroDescription: 'We build ultra-fast websites and rich web applications with modern frontend engineering, animations, CMS integrations, and top-tier performance benchmarks.',
    icon: Globe,
    image: {
      src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Modern web engineering and responsive website design layout',
    },
    overview: {
      headline: 'Lightning-Fast Load Times & Engaging User Experiences',
      body: 'Your website is your primary digital storefront and growth engine. We combine cutting-edge frontend technologies like Next.js, React, and GSAP with clean headless CMS backends to deliver websites that load in milliseconds and convert visitors into qualified leads.',
      highlights: [
        'Perfect Core Web Vitals and 100/100 Google Lighthouse performance benchmarks',
        'Server-side rendering (SSR) and static generation (SSG) for instant page loads',
        'Smooth micro-animations, parallax effects, and fluid user interactions',
        'Headless CMS integration (Sanity, Strapi, Contentful) for effortless content editing',
      ],
    },
    deliverables: [
      {
        title: 'Custom Marketing & Enterprise Websites',
        description: 'Showcase your brand with immersive design, typography, and interactive visuals.',
        points: ['Next.js App Router architecture', 'Interactive GSAP / Framer Motion animations', 'Full mobile & retina responsiveness', 'Dynamic dark/light mode theming'],
      },
      {
        title: 'Headless CMS Architecture',
        description: 'Give non-technical marketing teams total autonomy over content and landing pages.',
        points: ['Sanity / Contentful schema design', 'Live preview editing environments', 'Structured modular page builders', 'Asset optimization pipelines'],
      },
      {
        title: 'Speed & Core Web Vitals Tuning',
        description: 'Optimize every asset, script, and font for sub-second load times worldwide.',
        points: ['Zero cumulative layout shift (CLS)', 'Sub-100ms Largest Contentful Paint (LCP)', 'Next-gen WebP/AVIF image delivery', 'Dynamic code splitting & bundle pruning'],
      },
      {
        title: 'Technical Infrastructure & Metadata System',
        description: 'Ensure every page renders properly with structured schema data and OpenGraph tags.',
        points: ['Dynamic XML sitemaps & robots.txt', 'JSON-LD structured organization data', 'Automatic OpenGraph social preview images', 'Canonical URL management'],
      },
    ],
    techStack: [
      { category: 'Frontend', tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vanilla CSS'] },
      { category: 'Animation', tools: ['GSAP', 'Framer Motion', 'Lenis Smooth Scroll', 'Three.js'] },
      { category: 'Headless CMS', tools: ['Sanity.io', 'Contentful', 'Strapi', 'Prismic'] },
      { category: 'Hosting & CDN', tools: ['Vercel', 'Cloudflare', 'AWS CloudFront'] },
    ],
    process: [
      { step: '01', title: 'Design & Tokenization', desc: 'Figma to code translation, setting up typographic scales, colors, and responsive breakpoints.' },
      { step: '02', title: 'Component Engineering', desc: 'Build modular, accessible UI components with rich micro-animations.' },
      { step: '03', title: 'CMS Integration & SEO', desc: 'Connect content schemas, generate dynamic sitemaps, and optimize Core Web Vitals.' },
      { step: '04', title: 'Launch & CDN Deployment', desc: 'Deploy to edge network with SSL, performance monitoring, and analytics setup.' },
    ],
    faqs: [
      {
        id: 1,
        question: 'Can non-technical team members update content and publish pages easily?',
        answer: 'Absolutely. We configure user-friendly headless CMS solutions (Sanity, Strapi, Contentful) or built-in CMS dashboards where marketing and operations teams can manage copy, upload media, publish blogs, and launch landing pages without touching code.',
      },
      {
        id: 2,
        question: 'How do you achieve 95–100 Google Lighthouse and Core Web Vitals scores?',
        answer: 'We leverage Next.js hybrid server-side rendering (SSR), static generation (SSG), automatic next-gen image optimization (AVIF/WebP), critical CSS extraction, font preloading, and aggressive JavaScript bundle tree-shaking.',
      },
      {
        id: 3,
        question: 'How do you ensure our existing SEO rankings are preserved during a redesign?',
        answer: 'We conduct comprehensive URL structure audits, configure 301 redirect mappings, generate dynamic XML sitemaps, maintain canonical URL structures, and implement schema.org structured JSON-LD data.',
      },
      {
        id: 4,
        question: 'Do you build custom web animations and interactive 3D experiences?',
        answer: 'Yes. We create fluid micro-interactions, scroll-driven storytelling, and interactive 3D scenes using GSAP, Framer Motion, Lenis Smooth Scroll, and Three.js/WebGL while maintaining 60fps performance.',
      },
      {
        id: 5,
        question: 'Who owns the code, design assets, and intellectual property?',
        answer: 'You own 100% of the source code, repository rights, Figma design files, and IP from day one. We provide full git handover and documentation upon delivery.',
      },
    ],
    related: ['mobile-app-development', 'digital-marketing', 'saas-development'],
  },

  'mobile-app-development': {
    slug: 'mobile-app-development',
    category: 'Engineering',
    title: 'Mobile App Development',
    tagline: 'Cross-platform iOS and Android apps engineered for fluid performance.',
    heroDescription: 'We build high-quality mobile applications using React Native and Flutter with native performance, offline capabilities, push notifications, and app store compliance.',
    icon: Smartphone,
    image: {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Mobile application interface development on iOS and Android smartphones',
    },
    overview: {
      headline: 'Single Codebase. Native 60fps Experience.',
      body: 'Building separate native codebases for iOS and Android is expensive and slow to maintain. We build cross-platform mobile products using modern React Native and Expo, delivering silky-smooth 60fps animations, native device API access, offline data persistence, and unified backend synchronization.',
      highlights: [
        'Single maintainable codebase deploying natively to both Apple App Store and Google Play',
        'Hardware integration: biometric auth (FaceID/TouchID), camera, GPS, and Bluetooth',
        'Offline-first architecture with local SQLite storage and automated cloud sync',
        'Seamless push notification pipelines (OneSignal / Expo Push / Firebase Cloud Messaging)',
      ],
    },
    deliverables: [
      {
        title: 'Cross-Platform React Native Apps',
        description: 'Native look, feel, and performance on both iOS and Android smartphones and tablets.',
        points: ['Expo / React Native framework', 'Native gesture navigation', 'Smooth 60fps interactive animations', 'Dynamic tablet & foldable layouts'],
      },
      {
        title: 'Hardware & Native SDK Integration',
        description: 'Connect with device capabilities, peripherals, and third-party SDKs.',
        points: ['FaceID & Biometric authentication', 'Camera & photo library processing', 'Geolocation & background tracking', 'In-app purchases & Apple Pay'],
      },
      {
        title: 'Offline-First Data Sync',
        description: 'Allow users to continue using the app without an active internet connection.',
        points: ['Local SQLite / WatermelonDB storage', 'Conflict-resolution sync engine', 'Optimistic UI updates', 'Background queue synchronization'],
      },
      {
        title: 'App Store Submission & Over-the-Air Updates',
        description: 'Complete store approval handling, metadata compliance, and instant code updates.',
        points: ['Apple App Store & Google Play compliance', 'EAS Over-The-Air (OTA) updates', 'Crashlytics & error tracking', 'Automated TestFlight distribution'],
      },
    ],
    techStack: [
      { category: 'Mobile Framework', tools: ['React Native', 'Expo', 'TypeScript'] },
      { category: 'State & Local DB', tools: ['Zustand', 'React Query', 'SQLite', 'MMKV'] },
      { category: 'Backend & APIs', tools: ['Node.js', 'PostgreSQL', 'GraphQL', 'Firebase'] },
      { category: 'Deployment & CI', tools: ['EAS Build', 'Fastlane', 'TestFlight', 'Google Play Console'] },
    ],
    process: [
      { step: '01', title: 'Mobile UX & Prototypes', desc: 'Design mobile-native navigation flows, touch gestures, and interactive Figma prototypes.' },
      { step: '02', title: 'Core App Engineering', desc: 'Build React Native screens, state management, and API endpoints with bi-weekly TestFlight builds.' },
      { step: '03', title: 'Device Testing & QA', desc: 'Test across real physical iOS and Android devices, edge cases, offline modes, and push notifications.' },
      { step: '04', title: 'Store Submission & Launch', desc: 'Manage App Store Review and Google Play submissions to ensure 100% approval.' },
    ],
    faqs: [
      {
        id: 1,
        question: 'Do we need separate engineering teams for iOS and Android?',
        answer: 'No. Our cross-platform engineering with React Native and Expo shares 95%+ of the codebase between iOS and Android, drastically reducing upfront development costs and ongoing maintenance overhead without sacrificing native 60fps performance.',
      },
      {
        id: 2,
        question: 'Can updates and bug fixes be published without waiting for App Store review?',
        answer: 'Yes. We implement Expo EAS Over-The-Air (OTA) updates, enabling instant rollout of critical bug fixes, UI improvements, and content updates directly to users\\' devices.',
      },
      {
        id: 3,
        question: 'How do you handle offline mode and unreliable connectivity?',
        answer: 'We implement offline-first local SQLite / MMKV caching with background synchronization queues and conflict-resolution strategies, allowing users to interact with the app seamlessly even without an active internet connection.',
      },
      {
        id: 4,
        question: 'Do you manage the entire Apple App Store and Google Play submission process?',
        answer: 'Yes. We handle the full publishing lifecycle including developer account setup, provisioning profiles, privacy manifest compliance, store screenshots, metadata preparation, and direct responses to store review inquiries until approved.',
      },
      {
        id: 5,
        question: 'How long does it take to develop a custom mobile application?',
        answer: 'A standard cross-platform MVP app typically takes 8–12 weeks from initial wireframes to App Store and Play Store launch.',
      },
    ],
    related: ['web-development', 'api-system-integration', 'saas-development'],
  },

  'api-system-integration': {
    slug: 'api-system-integration',
    category: 'Engineering',
    title: 'API & System Integration',
    tagline: 'Connect the software tools and data silos your business relies on.',
    heroDescription: 'We build secure, robust API gateways, custom middleware, payment connectors, and third-party integrations that harmonize your enterprise ecosystem.',
    icon: Cpu,
    image: {
      src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Enterprise API integration servers and cloud data infrastructure',
    },
    overview: {
      headline: 'Unified Data Across All Your Operational Systems',
      body: 'Modern enterprises use dozens of specialized SaaS platforms, ERPs, and databases. When these systems cannot communicate seamlessly, operational velocity halts. We engineer reliable API bridges, GraphQL gateways, and event-driven microservices that synchronize your data bidirectionally with zero data loss.',
      highlights: [
        'REST, GraphQL, and gRPC microservice development with strict schema validation',
        'Secure payment gateway integrations (Stripe, Adyen, PayPal, Authorize.Net)',
        'Bi-directional synchronization between legacy ERPs and modern cloud apps',
        'Comprehensive rate limiting, token caching, and automated API documentation',
      ],
    },
    deliverables: [
      {
        title: 'Custom API Gateways & Middleware',
        description: 'Centralized API layers that unify multiple microservices and legacy databases.',
        points: ['Fastify / Express / FastAPI backends', 'Unified GraphQL / REST endpoints', 'JWT & API Key authentication', 'Redis token caching & rate limits'],
      },
      {
        title: 'Payment & Financial Integrations',
        description: 'Bulletproof payment processing, billing, and accounting synchronizations.',
        points: ['Stripe Custom Connect & Marketplace', 'QuickBooks / Xero accounting sync', 'Automated reconciliation pipelines', 'PCI-DSS compliance best practices'],
      },
      {
        title: 'ERP & Legacy System Connectors',
        description: 'Bridge modern web applications with SAP, NetSuite, and on-premise databases.',
        points: ['Secure VPN / SSH tunneling', 'Data normalization & transformation', 'Scheduled batch sync & live triggers', 'Failure rollback & idempotency'],
      },
      {
        title: 'Developer Portal & Interactive Docs',
        description: 'Interactive API documentation allowing internal or external developers to build.',
        points: ['OpenAPI (Swagger) specifications', 'Postman collections & test suites', 'Interactive sandbox testing environments', 'Client SDK generation'],
      },
    ],
    techStack: [
      { category: 'API Protocols', tools: ['REST', 'GraphQL', 'gRPC', 'WebSockets', 'Webhooks'] },
      { category: 'Backend Frameworks', tools: ['Node.js (NestJS)', 'Go (Gin)', 'Python (FastAPI)'] },
      { category: 'Data & Queues', tools: ['PostgreSQL', 'Redis', 'RabbitMQ', 'Apache Kafka'] },
      { category: 'Monitoring', tools: ['Datadog', 'Sentry', 'Prometheus', 'Grafana'] },
    ],
    process: [
      { step: '01', title: 'API Audit & Schema Design', desc: 'Inspect endpoints, authentication methods, rate limits, and define target JSON schemas.' },
      { step: '02', title: 'Middleware & Transformer Build', desc: 'Engineer data transformation logic, error handlers, and caching layers.' },
      { step: '03', title: 'Load & Idempotency Testing', desc: 'Simulate high concurrency, duplicate requests, and network failure recoveries.' },
      { step: '04', title: 'Production Rollout', desc: 'Deploy with zero-downtime blue/green strategy and live latency telemetry.' },
    ],
    faqs: [
      {
        id: 1,
        question: 'How do you handle rate limits and downtime from third-party vendor APIs?',
        answer: 'We engineer resilient middleware with Redis token-bucket rate limiters, intelligent caching, exponential backoff retry policies, and dead-letter queues (DLQ) to ensure zero data loss during upstream third-party outages.',
      },
      {
        id: 2,
        question: 'Can you integrate with legacy ERPs, SOAP services, or on-premise databases?',
        answer: 'Yes. We specialize in building secure REST, GraphQL, or gRPC wrapper layers and event bridges on top of legacy SAP, NetSuite, SOAP web services, and on-premise SQL/Oracle databases via secure VPN and SSH tunnels.',
      },
      {
        id: 3,
        question: 'How is security handled for API credentials, tokens, and sensitive data?',
        answer: 'All API keys, certificates, and secrets are encrypted at rest and managed through cloud secret managers (AWS Secrets Manager / Doppler). We enforce mTLS, JWT token rotation, and strict IP allowlisting.',
      },
      {
        id: 4,
        question: 'Do you provide developer documentation and SDKs for our APIs?',
        answer: 'Yes. We automatically generate interactive OpenAPI (Swagger) documentation, Postman collections, and TypeScript/Python starter SDKs for internal engineers or third-party developer ecosystems.',
      },
      {
        id: 5,
        question: 'What protocols and data formats do you support?',
        answer: 'We work across REST (JSON), GraphQL, gRPC (Protobuf), WebSockets for real-time bidirectional streaming, Webhooks, and event buses like Apache Kafka and RabbitMQ.',
      },
    ],
    related: ['saas-development', 'ai-agentic-development', 'hosting-deployment-maintenance'],
  },

  'digital-marketing': {
    slug: 'digital-marketing',
    category: 'Growth',
    title: 'Digital Marketing & Growth',
    tagline: 'High-intent customer acquisition and digital growth campaigns.',
    heroDescription: 'We plan, execute, and scale digital marketing campaigns that drive qualified demand through targeted search, content strategy, and conversion optimization.',
    icon: Megaphone,
    image: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Growth marketing analytics dashboard with ROI charts',
    },
    overview: {
      headline: 'Growth Built on Real Metrics, Not Vanity Clicks',
      body: 'Effective marketing is an engineering discipline: formulating hypotheses, running controlled experiments, tracking attribution, and optimizing conversion funnels. We create targeted acquisition systems that attract high-intent buyers, decrease customer acquisition cost (CAC), and increase lifetime value (LTV).',
      highlights: [
        'Full-funnel attribution tracking with server-side Google Analytics and PostHog',
        'High-converting landing page creation and automated A/B testing',
        'Targeted B2B account-based marketing (ABM) and search acquisition',
        'Content strategy designed to capture high-intent organic search queries',
      ],
    },
    deliverables: [
      {
        title: 'High-Converting Landing Pages',
        description: 'Custom landing pages engineered for maximum conversion velocity.',
        points: ['Figma design & Next.js development', 'Sub-second mobile loading speeds', 'Clear conversion-focused copywriting', 'Heatmap tracking & session recording'],
      },
      {
        title: 'Paid Search & Social Campaigns',
        description: 'Targeted Google Ads and LinkedIn campaigns focused on profitable ROI.',
        points: ['High-intent keyword targeting', 'B2B audience segmentation', 'Ad copy testing & creative iterations', 'Negative keyword pruning & budget management'],
      },
      {
        title: 'Conversion Rate Optimization (CRO)',
        description: 'Iteratively optimize forms, onboarding, and call-to-actions to convert more visitors.',
        points: ['A/B testing implementation', 'Checkout & form drop-off audits', 'Copywriting & headline optimization', 'Social proof & trust badge integration'],
      },
      {
        title: 'Attribution & Analytics Dashboards',
        description: 'Unified reporting showing exactly which channels generate pipeline and revenue.',
        points: ['Server-side GA4 & Meta Pixel setup', 'Custom Looker Studio dashboards', 'Multi-touch attribution models', 'UTM parameter tracking standard'],
      },
    ],
    techStack: [
      { category: 'Analytics & CRO', tools: ['Google Analytics 4', 'PostHog', 'Hotjar', 'Google Tag Manager'] },
      { category: 'Ad Platforms', tools: ['Google Ads', 'LinkedIn Campaign Manager', 'Meta Ads'] },
      { category: 'Reporting', tools: ['Looker Studio', 'Segment', 'HubSpot Analytics'] },
    ],
    process: [
      { step: '01', title: 'Audience & Funnel Audit', desc: 'Analyze existing traffic, conversion bottlenecks, CAC benchmarks, and ideal customer profiles.' },
      { step: '02', title: 'Campaign & Landing Page Build', desc: 'Design high-intent landing pages, write ad copy, and configure server-side conversion tracking.' },
      { step: '03', title: 'Launch & A/B Testing', desc: 'Deploy campaigns with daily budget monitoring and weekly copy/design split tests.' },
      { step: '04', title: 'Scale & Optimization', desc: 'Double down on top-performing keywords and audiences while reducing cost per acquisition.' },
    ],
    faqs: [
      {
        id: 1,
        question: 'How do you measure marketing campaign performance and ROI?',
        answer: 'We focus on real business revenue metrics: Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), Cost Per Qualified Lead (CPL), and pipeline conversion velocity—avoiding vanity metrics like superficial impressions.',
      },
      {
        id: 2,
        question: 'Do you design and code the conversion landing pages as well?',
        answer: 'Yes! Because we are a full-stack engineering and design studio, we build custom, sub-second loading Next.js landing pages with interactive calculators, forms, and CRM integrations that convert at substantially higher rates than generic template builders.',
      },
      {
        id: 3,
        question: 'What paid channels do you manage?',
        answer: 'We manage high-intent Google Search & Performance Max ads, targeted LinkedIn B2B account-based marketing (ABM) campaigns, Meta (Facebook/Instagram) acquisition funnels, and programmatic retargeting.',
      },
      {
        id: 4,
        question: 'How do you track attribution across modern privacy regulations?',
        answer: 'We set up server-side Google Analytics 4 (GA4), Meta Conversions API (CAPI), and PostHog tracking with full GDPR/CCPA compliance, providing clean multi-touch attribution despite ad-blockers and browser cookie restrictions.',
      },
      {
        id: 5,
        question: 'What is the typical ramp-up time for marketing campaigns?',
        answer: 'Funnel setup, conversion tracking, landing page builds, and initial campaign launch take 2–3 weeks. Controlled A/B testing and algorithmic bidding optimization begin producing reliable CAC benchmarks within the first 30–45 days.',
      },
    ],
    related: ['web-development', 'saas-development', 'product-strategy-consulting'],
  },

  'hosting-deployment-maintenance': {
    slug: 'hosting-deployment-maintenance',
    category: 'Support',
    title: 'Hosting, Deployment & Maintenance',
    tagline: 'Reliable cloud infrastructure, automated deployments, and 24/7 uptime monitoring.',
    heroDescription: 'We manage your cloud hosting, automated CI/CD pipelines, SSL certificates, database backups, security patches, and ongoing software health.',
    icon: Server,
    image: {
      src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Cloud hosting servers and data center infrastructure',
    },
    overview: {
      headline: 'Zero-Downtime Infrastructure & Proactive Maintenance',
      body: 'Launching software is only the first step. To maintain customer trust and operational stability, your applications require continuous monitoring, security patching, database optimization, and automated deployment pipelines. We act as your dedicated DevOps and platform reliability team so you never worry about outages or broken releases.',
      highlights: [
        'Automated CI/CD pipelines deploying code from Git to staging and production in minutes',
        '24/7 uptime monitoring, server performance telemetry, and instant incident response',
        'Automated daily database backups with verified point-in-time recovery testing',
        'Proactive package dependency security updates and vulnerability scanning',
      ],
    },
    deliverables: [
      {
        title: 'Automated CI/CD Pipelines',
        description: 'Push code with confidence through automated test suites and zero-downtime deploys.',
        points: ['GitHub Actions / GitLab CI configuration', 'Automated staging preview environments', 'Zero-downtime blue/green deployments', 'Instant one-click rollbacks'],
      },
      {
        title: 'Cloud Hosting & Server Management',
        description: 'Scalable infrastructure architecture configured for cost efficiency and peak traffic.',
        points: ['AWS / Vercel / Cloudflare architecture', 'Docker container orchestration', 'Edge CDN caching & SSL configuration', 'Auto-scaling server instances'],
      },
      {
        title: 'Database Backups & Recovery',
        description: 'Protect critical business data with automated backups and recovery drills.',
        points: ['Daily automated snapshot backups', 'Point-in-time recovery (PITR)', 'Read-replica database scaling', 'Database connection pooling (PgBouncer)'],
      },
      {
        title: '24/7 Monitoring & Security Updates',
        description: 'Real-time alert systems and proactive patching of software dependencies.',
        points: ['Uptime monitoring & status page setup', 'Error & anomaly tracking (Sentry/Datadog)', 'Security patch management', 'SSL certificate auto-renewals'],
      },
    ],
    techStack: [
      { category: 'Cloud Providers', tools: ['AWS (ECS, RDS, S3)', 'Vercel', 'Cloudflare', 'DigitalOcean'] },
      { category: 'Containers & CI', tools: ['Docker', 'GitHub Actions', 'Terraform', 'Kubernetes'] },
      { category: 'Monitoring', tools: ['Datadog', 'Sentry', 'BetterStack', 'Grafana'] },
    ],
    process: [
      { step: '01', title: 'Infrastructure Audit', desc: 'Review existing servers, identify single points of failure, and analyze cloud hosting costs.' },
      { step: '02', title: 'CI/CD & Automation Setup', desc: 'Build automated test pipelines and staging preview environments in GitHub Actions.' },
      { step: '03', title: 'Backup & Monitoring Implementation', desc: 'Configure 24/7 uptime alerts, error tracking, and automated backup schedules.' },
      { step: '04', title: 'Continuous Management', desc: 'Ongoing server optimization, dependency updates, and monthly performance reports.' },
    ],
    faqs: [
      {
        id: 1,
        question: 'What happens if our website or server experiences an outage?',
        answer: 'Our automated 24/7 telemetry monitoring (Datadog / BetterStack / Sentry) detects anomalies within seconds, instantly notifying our on-call engineers. We trigger automated failover routines and initiate incident resolution according to our SLA.',
      },
      {
        id: 2,
        question: 'Can you help optimize cloud architecture to reduce monthly hosting costs?',
        answer: 'Yes. We perform cloud cost audits across AWS, Google Cloud, and Vercel—right-sizing underutilized instances, implementing edge CDN caching, optimizing database IOPS, and setting up automated scaling, typically reducing cloud spend by 30–50%.',
      },
      {
        id: 3,
        question: 'How do you manage database backups and disaster recovery?',
        answer: 'We configure automated daily and continuous point-in-time recovery (PITR) backups across isolated geographical regions, conducting routine recovery simulations to guarantee zero data loss.',
      },
      {
        id: 4,
        question: 'How are software package security updates and patches handled?',
        answer: 'We scan dependencies continuously for CVE vulnerabilities, testing security patches in staging environments with automated regression test suites before pushing zero-downtime production updates.',
      },
      {
        id: 5,
        question: 'What SLA tiers do you offer for ongoing support?',
        answer: 'We offer customized SLAs ranging from standard business-hours maintenance and weekly patch releases to 24/7 high-priority incident response with sub-15-minute response times for mission-critical platforms.',
      },
    ],
    related: ['saas-development', 'web-development', 'api-system-integration'],
  },

  'product-strategy-consulting': {
    slug: 'product-strategy-consulting',
    category: 'Strategy',
    title: 'Product Strategy & Technical Consulting',
    tagline: 'Strategic technical direction, architecture reviews, and product roadmap guidance.',
    heroDescription: 'We help founders and enterprise leaders make high-confidence technology decisions, avoid costly technical debt, and plan clear software roadmaps.',
    icon: Compass,
    image: {
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Technology leaders and consultants discussing product roadmap and architecture',
    },
    overview: {
      headline: 'High-Level Technical Leadership for Critical Decisions',
      body: 'Choosing the wrong technology stack, building bloated feature sets, or hiring without technical clarity can cost months of time and hundreds of thousands of dollars. We provide fractional CTO advisory, architectural assessments, and product roadmap strategy to de-risk your investment and accelerate time-to-market.',
      highlights: [
        'Fractional CTO guidance for startups and scaling companies without full-time executive overhead',
        'Independent architecture audits reviewing security, scalability, and technical debt',
        'Vendor and tech stack evaluations to select the right tools for your specific constraints',
        'Pragmatic product roadmaps balancing rapid customer delivery with engineering quality',
      ],
    },
    deliverables: [
      {
        title: 'Architecture & Codebase Audits',
        description: 'Comprehensive review of your system architecture, security posture, and bottlenecks.',
        points: ['Scalability & bottleneck analysis', 'Security vulnerability review', 'Code quality & technical debt score', 'Actionable remediation roadmap'],
      },
      {
        title: 'Tech Stack Selection & Feasibility',
        description: 'Select the optimal frameworks, databases, and third-party APIs for your product.',
        points: ['Framework & database comparisons', 'Cloud provider cost projections', 'Buy vs. build recommendations', 'Third-party API risk evaluations'],
      },
      {
        title: 'Product Roadmap & MVP Planning',
        description: 'Turn broad product visions into prioritized, phased engineering milestones.',
        points: ['Feature prioritization matrices', 'Sprint resource & timeline estimation', 'Risk mitigation planning', 'Release milestone definitions'],
      },
      {
        title: 'Fractional CTO Advisory',
        description: 'Ongoing strategic counsel for founders, executives, and engineering leads.',
        points: ['Weekly or bi-weekly strategic check-ins', 'Technical hiring & candidate interviews', 'Investor technical due diligence support', 'Architecture guidance on key PRs'],
      },
    ],
    techStack: [
      { category: 'Architecture Methodologies', tools: ['Domain-Driven Design', 'Event-Driven Architecture', 'Clean Architecture'] },
      { category: 'Evaluation Tools', tools: ['SonarQube', 'AWS Well-Architected', 'OWASP Security Standards'] },
      { category: 'Roadmapping', tools: ['Linear', 'Jira', 'Notion Architecture Wikis', 'Miro'] },
    ],
    process: [
      { step: '01', title: 'Technical Discovery', desc: 'Understand business goals, team structure, current software assets, and immediate pain points.' },
      { step: '02', title: 'System & Code Audit', desc: 'Review repositories, architecture diagrams, cloud infrastructure, and database schemas.' },
      { step: '03', title: 'Strategic Report & Roadmap', desc: 'Deliver an executive summary with concrete, prioritized technical recommendations.' },
      { step: '04', title: 'Advisory & Execution Support', desc: 'Provide continuous guidance during engineering execution, vendor selection, or investor reviews.' },
    ],
    faqs: [
      {
        id: 1,
        question: 'What is included in a Technical Architecture and Codebase Audit?',
        answer: 'You receive an in-depth evaluation covering code maintainability, security vulnerabilities (OWASP), database bottlenecks, cloud scalability limits, and an actionable executive roadmap prioritizing quick wins and architectural refactoring.',
      },
      {
        id: 2,
        question: 'How does a Fractional CTO engagement work?',
        answer: 'We integrate directly with your leadership team for a set number of monthly hours, leading technical hiring, advising on architecture decisions, conducting vendor assessments, unblocking sprint roadblocks, and preparing technical decks for investors.',
      },
      {
        id: 3,
        question: 'Can you assist with investor technical due diligence during fundraising?',
        answer: 'Yes. We prepare enterprise architecture documentation, data flow diagrams, IP assignment verification, and participate directly in technical Q&A sessions with venture capital and private equity diligence teams.',
      },
      {
        id: 4,
        question: 'How do you help companies decide between building custom software vs. buying SaaS?',
        answer: 'We provide rigorous cost-benefit and total cost of ownership (TCO) analyses, identifying where custom development creates proprietary competitive advantage and where third-party SaaS saves time and budget.',
      },
      {
        id: 5,
        question: 'What is the typical duration of a strategy engagement?',
        answer: 'Standalone architecture audits and MVP roadmaps take 2–4 weeks. Fractional CTO and ongoing advisory relationships typically operate on 3- to 12-month retainer cycles.',
      },
    ],
    related: ['saas-development', 'ai-agentic-development', 'hosting-deployment-maintenance'],
  },

  'chatbot-development': {
    slug: 'chatbot-development',
    category: 'AI & Automation',
    title: 'Custom Chatbot Development',
    tagline: 'Intelligent, brand-aligned customer support and lead qualification bots.',
    heroDescription: 'We develop smart chatbots trained on your approved knowledge base that answer visitor inquiries, capture qualified leads, and book meetings 24/7.',
    icon: MessageSquare,
    image: {
      src: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Customer support AI chat interface and conversational lead bot',
    },
    overview: {
      headline: 'Always-On Customer Support & Intelligent Lead Capture',
      body: 'Turn website visitors into scheduled meetings and qualified sales leads. Our chatbots combine strict knowledge base boundaries with contextual memory, automated CRM syncing, and escalation triggers.',
      highlights: [
        'Strict knowledge base matching preventing off-topic or incorrect responses',
        'Automated email notifications and CRM lead creation on enquiry submission',
        'Custom UI widget matching your brand typography and colors',
        'Full conversation history and analytics stored inside the CMS',
      ],
    },
    deliverables: [
      {
        title: 'Website Chatbot Widget',
        description: 'Embeddable, responsive conversational interface.',
        points: ['Live streaming responses', 'Lead capture modal', 'Preset conversation starters', 'Mobile-responsive layout'],
      },
      {
        title: 'CRM & Notification Integrations',
        description: 'Automatically route captured leads into your sales pipeline.',
        points: ['HubSpot / Salesforce integration', 'Instant email & Slack alerts', 'Meeting scheduler booking links', 'Conversation transcript exports'],
      },
    ],
    techStack: [
      { category: 'AI Models', tools: ['OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'Vector Embeddings'] },
      { category: 'Frontend', tools: ['React', 'Framer Motion', 'Tailwind CSS'] },
      { category: 'Backend & Data', tools: ['Node.js', 'PostgreSQL', 'Redis', 'WebSockets'] },
    ],
    process: [
      { step: '01', title: 'Knowledge Base Setup', desc: 'Import services, FAQs, and company details into the CMS knowledge manager.' },
      { step: '02', title: 'Bot Flow & Guardrails', desc: 'Define lead qualification questions, persona guidelines, and fallback rules.' },
      { step: '03', title: 'Integration & Testing', desc: 'Test question handling, edge cases, and automated lead forwarding.' },
      { step: '04', title: 'Deployment & Analytics', desc: 'Deploy chatbot across website pages and track visitor engagement metrics.' },
    ],
    faqs: [
      {
        id: 1,
        question: 'Can we update the chatbot\\'s knowledge base and responses without coding?',
        answer: 'Yes! The chatbot connects directly to your CMS Knowledge Manager, allowing you to update company FAQs, service details, pricing guidelines, and policies in real time without any code deployments.',
      },
      {
        id: 2,
        question: 'How does the chatbot prevent hallucinated or unauthorized responses?',
        answer: 'We enforce strict system prompt guardrails, semantic similarity retrieval thresholds, and strict fallback routing. If an inquiry falls outside approved documentation, the bot gracefully offers human escalation or lead capture.',
      },
      {
        id: 3,
        question: 'Can the chatbot qualify leads and schedule appointments automatically?',
        answer: 'Yes. The bot can ask custom qualifying questions (e.g. budget, timeline, project scope), collect contact information, validate emails/phone numbers, sync directly into your CRM (HubSpot/Salesforce), and provide Calendly booking links.',
      },
      {
        id: 4,
        question: 'Can the chatbot integrate with our internal systems or WhatsApp?',
        answer: 'Yes. We build omnichannel conversational bots that deploy as embeddable web widgets, Slack/Discord internal bots, or WhatsApp Business API integrations.',
      },
      {
        id: 5,
        question: 'What AI models power the chatbot?',
        answer: 'We utilize GPT-4o, Claude 3.5 Sonnet, and custom fine-tuned embeddings with streaming response support for lightning-fast, natural conversation flow.',
      },
    ],
    related: ['ai-agentic-development', 'web-development', 'api-system-integration'],
  },

  'custom-apps-development': {
    slug: 'custom-apps-development',
    category: 'Engineering',
    title: 'Custom Apps Development',
    tagline: 'Bespoke business software tailored to your specific operational workflows.',
    heroDescription: 'We engineer internal tooling, customer portals, inventory managers, and custom business applications that eliminate manual spreadsheets and legacy bottlenecks.',
    icon: Terminal,
    image: {
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Custom enterprise software dashboard and business workflow application',
    },
    overview: {
      headline: 'Software Built Exactly Around Your Operating Procedures',
      body: 'Off-the-shelf software often forces you to compromise on your business processes. We build custom applications designed precisely around your team workflows, data models, and customer journeys.',
      highlights: [
        'Role-based dashboards for staff, managers, and clients',
        'Automated document generation and PDF exporting',
        'Real-time data synchronization across teams',
        'Enterprise security, encryption, and audit logs',
      ],
    },
    deliverables: [
      {
        title: 'Custom Internal & Client Portals',
        description: 'Secure, high-productivity web applications.',
        points: ['Custom permissions matrix', 'Exportable data tables', 'Automated email alerts', 'Mobile-ready UI'],
      },
      {
        title: 'Automated Reporting & Workflows',
        description: 'Eliminate manual data entry and spreadsheet consolidation.',
        points: ['PDF & Excel generation', 'Scheduled background jobs', 'Third-party API synchronization', 'Audit logs & activity trails'],
      },
    ],
    techStack: [
      { category: 'Frontend', tools: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'] },
      { category: 'Backend', tools: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis'] },
      { category: 'Cloud & Queues', tools: ['AWS ECS', 'Docker', 'BullMQ', 'Vercel'] },
    ],
    process: [
      { step: '01', title: 'Workflow Audit', desc: 'Analyze existing spreadsheets, bottlenecks, and user roles.' },
      { step: '02', title: 'Custom Architecture', desc: 'Design database schema, UI mockups, and authorization hierarchy.' },
      { step: '03', title: 'Agile Build', desc: 'Iteratively build and review modules with your operational team.' },
      { step: '04', title: 'Deployment & Training', desc: 'Deploy to production with team onboarding, documentation, and support.' },
    ],
    faqs: [
      {
        id: 1,
        question: 'Can custom applications connect with our existing legacy database or SQL server?',
        answer: 'Yes. We build modern web and cloud portals that connect securely with existing PostgreSQL, MySQL, MS SQL Server, Oracle, or MongoDB databases without disrupting your active business operations.',
      },
      {
        id: 2,
        question: 'How do you handle user permissions, roles, and access levels?',
        answer: 'We implement granular Role-Based Access Control (RBAC) and attribute-based permissions, allowing you to restrict specific dashboards, reports, and data fields based on user roles (e.g., admin, manager, staff, external client).',
      },
      {
        id: 3,
        question: 'Can the application generate automated PDF reports, invoices, and data exports?',
        answer: 'Yes. We build high-speed PDF generation engines (for invoices, compliance certificates, and executive summaries) as well as scheduled Excel/CSV exports and email delivery triggers.',
      },
      {
        id: 4,
        question: 'How long does it take to build a custom internal business application?',
        answer: 'Typical custom internal tools or client portals take 6–10 weeks for an initial production release, built iteratively with bi-weekly staging demos.',
      },
      {
        id: 5,
        question: 'What happens after the application is deployed?',
        answer: 'We provide thorough user documentation, admin training sessions, source code handover, and optional ongoing hosting, monitoring, and feature iteration support.',
      },
    ],
    related: ['saas-development', 'web-development', 'api-system-integration'],
  },
};
`;

fs.writeFileSync(path.join(__dirname, '..', 'constants', 'servicesData.js'), servicesDataJsContent, 'utf8');
console.log('Successfully updated constants/servicesData.js!');
