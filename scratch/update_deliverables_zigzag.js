const fs = require('fs');
const path = require('path');

const deliverablesData = {
  'ai-agentic-development': [
    {
      title: 'Custom Autonomous Agents & Tool Orchestration',
      tagline: 'Goal-Driven Cognitive Automation',
      description: 'We engineer autonomous agents capable of multi-step problem solving, executing actions across third-party software tools, and self-correcting errors through continuous feedback loops.',
      points: [
        'LangChain & LangGraph deterministic state machines',
        'External tool execution via OpenAI / Anthropic function calling',
        'Persistent conversation state & short/long-term memory',
        'Self-healing execution with fallback model routing'
      ],
      tags: ['LangGraph', 'Function Calling', 'State Machine', 'Self-Correction'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Autonomous Execution'
    },
    {
      title: 'Enterprise RAG & Private Knowledge Systems',
      tagline: 'Cited Intelligence Over Proprietary Data',
      description: 'Connect internal PDFs, wikis, Slack archives, and SQL databases into an ultra-fast semantic retrieval engine with precise source attribution and zero public data leakage.',
      points: [
        'High-dimensional vector databases (pgvector / Pinecone)',
        'Hybrid dense + sparse semantic chunking pipelines',
        'Zero-data-retention VPC security guarantees',
        'Strict role-based document access permissions'
      ],
      tags: ['pgvector', 'Hybrid Search', 'Private VPC', 'Role-Based Access'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Private & Secure'
    },
    {
      title: 'Multi-Agent Supervisor & Worker Pipelines',
      tagline: 'Collaborative Agent Architectures',
      description: 'Orchestrate specialized agent teams where supervisor agents review, delegate, and approve work executed by specialized researcher, coder, and analyst agents.',
      points: [
        'Supervisor-worker orchestration topologies',
        'Parallel asynchronous task distribution',
        'Human-in-the-loop validation review checkpoints',
        'Complete audit logging and replayable state telemetry'
      ],
      tags: ['Multi-Agent', 'Human-in-the-Loop', 'Telemetry', 'Langfuse'],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Team Orchestration'
    },
    {
      title: 'Deterministic Guardrails & Benchmark Evals',
      tagline: 'Hallucination-Proof Output Enforcement',
      description: 'Enforce strict JSON schema validation, Pydantic type checking, and automated continuous regression benchmarks against historical company edge cases.',
      points: [
        'Strict structured output enforcement (Zod/Pydantic)',
        'Continuous automated eval suites (Ragas / LangSmith)',
        'Prompt-injection and toxicity security filters',
        'Token usage and latency optimization'
      ],
      tags: ['Zod', 'Ragas', 'LangSmith', 'Guardrails'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Zero Hallucination'
    }
  ],

  'saas-development': [
    {
      title: 'Multi-Tenant Architecture & Data Partitioning',
      tagline: 'Enterprise Security from Tenant Zero',
      description: 'We engineer multi-tenant SaaS foundations with PostgreSQL Row-Level Security (RLS) ensuring strict mathematical tenant isolation, custom subdomain routing, and granular role permissions.',
      points: [
        'PostgreSQL Row-Level Security (RLS) data partitioning',
        'Custom vanity domain mapping with automated SSL',
        'Organization member invitations and RBAC hierarchy',
        'Immutable audit logging for security compliance'
      ],
      tags: ['PostgreSQL RLS', 'Multi-Tenant', 'Custom Domains', 'RBAC'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Enterprise Multi-Tenancy'
    },
    {
      title: 'Subscription & Metered Billing Engine',
      tagline: 'Frictionless Monetization Infrastructure',
      description: 'Complete integration with Stripe Billing, LemonSqueezy, and Paddle supporting tiered recurring plans, per-seat licensing, dunning management, and metered usage ingestion.',
      points: [
        'Stripe Customer Portal and hosted checkout sessions',
        'High-throughput usage metering and aggregation events',
        'Automated invoice generation, tax, and VAT compliance',
        'Dunning recovery emails and grace period logic'
      ],
      tags: ['Stripe Billing', 'Metered Pricing', 'Automated Invoicing', 'Dunning'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Monetization Ready'
    },
    {
      title: 'High-Velocity Management Dashboards',
      tagline: 'Real-Time Operational Intelligence',
      description: 'Ultra-responsive analytics dashboards for end-users and internal super-admins with real-time charting, CSV/PDF report generators, and user impersonation capabilities.',
      points: [
        'Real-time data visualization with optimized SQL aggregations',
        'Instant CSV, Excel, and branded PDF exports',
        'Super-admin support tooling and account impersonation',
        'Dynamic feature flags and subscription tier gating'
      ],
      tags: ['Next.js App Router', 'Data Charts', 'PDF Export', 'Feature Flags'],
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Real-Time Telemetry'
    },
    {
      title: 'Public Developer APIs & Webhook Dispatchers',
      tagline: 'Ecosystem Extensibility & Integrations',
      description: 'Allow your B2B customers to automate workflows and integrate their internal tools with your platform through secure REST/GraphQL APIs and outgoing webhooks.',
      points: [
        'API key management with scoped tokens & rate limiting',
        'Resilient outgoing webhook delivery with retry queues',
        'Interactive OpenAPI (Swagger) documentation portal',
        'Starter SDKs in TypeScript and Python'
      ],
      tags: ['REST API', 'Webhooks', 'OpenAPI', 'Developer Portal'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'API First'
    }
  ],

  'web-development': [
    {
      title: 'Custom Marketing & High-Speed Web Applications',
      tagline: 'Speed, Typography & Immersive Interaction',
      description: 'Custom Next.js web applications engineered for instantaneous sub-second load times, fluid micro-interactions, responsive ergonomics, and top-tier lead conversion.',
      points: [
        'Next.js App Router with Server-Side Rendering (SSR)',
        'Fluid 60fps micro-animations with GSAP and Framer Motion',
        'Adaptive mobile-first layout with dark/light themes',
        'WCAG 2.1 AA accessibility and cross-browser testing'
      ],
      tags: ['Next.js', 'React 19', 'GSAP', 'WCAG 2.1'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Sub-Second Speed'
    },
    {
      title: 'Headless CMS & Content Publishing Engine',
      tagline: 'Total Autonomy for Marketing Teams',
      description: 'Empower your marketing and growth teams to create landing pages, update copy, upload assets, and publish blogs through Sanity, Strapi, or Contentful without writing code.',
      points: [
        'Modular block-based page builder architectures',
        'Live real-time editing previews in staging',
        'Automated WebP/AVIF image transformation pipelines',
        'Dynamic multi-language localization (i18n)'
      ],
      tags: ['Sanity.io', 'Strapi', 'Contentful', 'Live Preview'],
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'No-Code CMS'
    },
    {
      title: 'Core Web Vitals & Technical SEO Architecture',
      tagline: '100/100 Google Lighthouse Standards',
      description: 'Every page is engineered for maximum search visibility with structured schema markup, zero layout shifts, critical CSS inlining, and CDN edge caching.',
      points: [
        '100/100 Lighthouse performance, SEO, and best practices',
        'JSON-LD structured data for rich Google search snippets',
        'Dynamic sitemap generation and automated robots.txt',
        'Sub-100ms Largest Contentful Paint (LCP) benchmarks'
      ],
      tags: ['Core Web Vitals', 'JSON-LD', 'Edge CDN', 'Technical SEO'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: '100/100 Lighthouse'
    },
    {
      title: 'Interactive 3D & WebGL Canvas Visualizations',
      tagline: 'Next-Gen Visual Storytelling',
      description: 'Elevate your digital product narrative with Three.js, shaders, and WebGL canvas elements that react smoothly to user scroll gestures without degrading performance.',
      points: [
        'Lightweight Three.js and WebGL rendering pipelines',
        'GPU-accelerated smooth canvas animations',
        'Adaptive performance fallback for low-power mobile devices',
        'Custom interactive 3D product configurators'
      ],
      tags: ['Three.js', 'WebGL', 'Shaders', 'Interactive 3D'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: '60fps Visuals'
    }
  ],

  'mobile-app-development': [
    {
      title: 'Cross-Platform React Native Applications',
      tagline: 'Single Codebase. True Native Performance.',
      description: 'Engineered with React Native and Expo, sharing 95%+ of the codebase across iOS and Android with silky-smooth 60fps animations and platform-native ergonomics.',
      points: [
        'React Native & Expo modern architecture',
        'Native gesture navigation and transition physics',
        'Fluid 60fps animations on both mobile platforms',
        'Adaptive layouts for smartphones, tablets, and foldables'
      ],
      tags: ['React Native', 'Expo', 'iOS & Android', '60fps Physics'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Native 60fps'
    },
    {
      title: 'Offline-First Storage & Data Synchronization',
      tagline: 'Uninterrupted Offline Functionality',
      description: 'Users can continue using the application offline with local SQLite/MMKV storage, with automatic conflict-resolution and background sync upon reconnection.',
      points: [
        'Local SQLite & WatermelonDB relational caching',
        'Optimistic UI mutations for instantaneous feedback',
        'Background queue synchronization with conflict resolution',
        'Battery-efficient network polling protocols'
      ],
      tags: ['SQLite', 'WatermelonDB', 'Offline First', 'Auto-Sync'],
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Zero Downtime'
    },
    {
      title: 'Hardware Sensors & Native Device APIs',
      tagline: 'Deep Device Integration',
      description: 'Connect seamlessly with biometric authentication (FaceID/TouchID), camera processing, GPS geolocation, push notifications, and Bluetooth peripherals.',
      points: [
        'Biometric security (FaceID, TouchID, Android Biometrics)',
        'In-app camera filters and real-time document scanning',
        'FCM & Apple APNs rich push notification channels',
        'Apple Pay and Google In-App Purchases integration'
      ],
      tags: ['Biometrics', 'Push Notifications', 'Apple Pay', 'GPS'],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Hardware Connected'
    },
    {
      title: 'App Store Publishing & Over-the-Air (OTA) Updates',
      tagline: 'Instant Rollouts & Store Approval',
      description: 'We manage the entire App Store and Google Play approval process, and configure Expo EAS Over-The-Air updates so critical bug fixes bypass app store review delays.',
      points: [
        '100% Apple App Store & Google Play compliance guarantee',
        'Expo EAS Over-The-Air (OTA) instant code updates',
        'Automated TestFlight & Internal Testing CI distribution',
        'Crashlytics telemetry and real-time error alerts'
      ],
      tags: ['EAS OTA', 'App Store', 'TestFlight', 'Crashlytics'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Store Approved'
    }
  ],

  'api-system-integration': [
    {
      title: 'Resilient API Gateways & Middleware',
      tagline: 'High-Throughput Microservice Unification',
      description: 'Centralized API layers that unify distributed backends, microservices, and databases with token caching, strict rate-limiting, and validation schemas.',
      points: [
        'Fastify & NestJS high-throughput gateway backends',
        'Unified GraphQL Federation and RESTful endpoints',
        'JWT, mTLS, and API Key authentication middleware',
        'Redis token-bucket rate limiters preventing DDoS'
      ],
      tags: ['Fastify', 'NestJS', 'GraphQL', 'Redis'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&h=650&auto=format&q=85&fit=crop',
      badge: 'High Throughput'
    },
    {
      title: 'Payment Gateways & Financial Connectors',
      tagline: 'Bulletproof Transaction Processing',
      description: 'Secure, idempotent payment integration across Stripe Custom Connect, Adyen, PayPal, QuickBooks, and Xero with automated reconciliations.',
      points: [
        'Stripe Connect marketplace split payments',
        'QuickBooks & Xero automated ledger synchronizations',
        'Idempotency keys preventing duplicate customer charges',
        'PCI-DSS compliance and financial audit trails'
      ],
      tags: ['Stripe Connect', 'QuickBooks', 'PCI-DSS', 'Idempotency'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=650&auto=format&q=85&fit=crop',
      badge: 'PCI Compliant'
    },
    {
      title: 'Legacy ERP & Enterprise Database Bridges',
      tagline: 'Modernizing Legacy Data Silos',
      description: 'Bridge modern web applications with SAP, NetSuite, Oracle, and on-premise databases via encrypted VPN and SSH tunnels with zero downtime.',
      points: [
        'Secure SSH / IPSec VPN tunneling protocols',
        'Automated data normalization and schema mapping',
        'Real-time webhook triggers and scheduled batch syncs',
        'Failure recovery with dead-letter queue (DLQ) replay'
      ],
      tags: ['SAP', 'NetSuite', 'Oracle', 'DLQ Replay'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&h=650&auto=format&q=85&fit=crop',
      badge: 'Zero Data Loss'
    },
    {
      title: 'Interactive Developer Portals & Client SDKs',
      tagline: 'Accelerating Developer Adoption',
      description: 'Interactive documentation portals with real-time sandbox request testers, OpenAPI specifications, and auto-generated TypeScript and Python SDKs.',
      points: [
        'OpenAPI 3.0 / Swagger interactive documentation',
        'Pre-configured Postman test collections and environments',
        'Interactive live sandbox API playground',
        'Auto-generated client SDKs for TypeScript and Python'
      ],
      tags: ['OpenAPI', 'Swagger', 'Postman', 'SDKs'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&h=650&auto=format&q=85&fit=crop',
      badge: 'Developer Ready'
    }
  ],

  'digital-marketing': [
    {
      title: 'High-Converting Performance Landing Pages',
      tagline: 'Speed & Copy Engineered to Convert',
      description: 'Custom landing pages built on Next.js with sub-second mobile speeds, clear conversion-focused copy, and direct CRM form routing.',
      points: [
        'Sub-second mobile loading speed on all 4G/5G connections',
        'Conversion rate optimized (CRO) headline & form hierarchy',
        'Interactive price calculators and multi-step lead capture',
        'Heatmap tracking, user session recordings, and scroll depth'
      ],
      tags: ['Next.js', 'CRO', 'Heatmaps', 'Lead Forms'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'High Conversion'
    },
    {
      title: 'Targeted Paid Search & B2B ABM Campaigns',
      tagline: 'High-Intent Buyer Acquisition',
      description: 'Data-driven Google Ads (Search, Performance Max) and LinkedIn B2B account-based marketing campaigns engineered for profitable ROAS and low CAC.',
      points: [
        'High-intent commercial search keyword targeting',
        'Granular B2B decision-maker job title segmentation',
        'Algorithmic bidding optimization with negative keyword pruning',
        'A/B creative testing with weekly ad copy iterations'
      ],
      tags: ['Google Ads', 'LinkedIn ABM', 'ROAS', 'PPC'],
      image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'High ROI'
    },
    {
      title: 'Server-Side Tracking & Multi-Touch Attribution',
      tagline: 'Privacy-Compliant Analytics',
      description: 'Implement server-side GA4, Meta Conversions API (CAPI), and PostHog tracking that bypasses ad-blockers and browser cookie limits with full GDPR compliance.',
      points: [
        'Server-side Google Tag Manager (sGTM) deployment',
        'Meta Conversions API (CAPI) direct server syncing',
        'Multi-touch first/last click revenue attribution modeling',
        'Full GDPR, CCPA, and cookie-consent compliance'
      ],
      tags: ['GA4', 'Meta CAPI', 'sGTM', 'PostHog'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Accurate Data'
    },
    {
      title: 'Organic Search Strategy & Programmatic SEO',
      tagline: 'Compounding Organic Pipeline',
      description: 'Capture high-intent search queries with technical SEO audits, programmatic content page generation, and authoritative topic cluster strategies.',
      points: [
        'Comprehensive competitive search gap analysis',
        'Programmatic SEO landing page database generation',
        'High-authority topic cluster and content architecture',
        'Core Web Vitals tuning for priority index ranking'
      ],
      tags: ['Technical SEO', 'Programmatic SEO', 'Keyword Strategy', 'Topic Clusters'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Organic Growth'
    }
  ],

  'hosting-deployment-maintenance': [
    {
      title: 'Automated CI/CD Pipelines & Zero-Downtime Releases',
      tagline: 'Deploy Code with Absolute Confidence',
      description: 'Automated GitHub Actions and GitLab CI workflows that run test suites, generate ephemeral staging previews, and deploy zero-downtime blue/green releases.',
      points: [
        'Automated pull request staging preview environments',
        'Zero-downtime blue/green and rolling deployments',
        'Automated unit, integration, and regression test suites',
        'Instant one-click rollback to any previous stable commit'
      ],
      tags: ['GitHub Actions', 'Blue/Green', 'Staging Previews', 'CI/CD'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Zero Downtime'
    },
    {
      title: 'Cloud Hosting Architecture & Cost Optimization',
      tagline: 'Scalable Infrastructure Without Waste',
      description: 'Architect and right-size your AWS, Vercel, and Cloudflare infrastructure to handle traffic spikes seamlessly while eliminating wasted monthly cloud spend.',
      points: [
        'Docker and Kubernetes container cluster orchestration',
        'Edge CDN caching and automatic global SSL renewals',
        'Cloud cost reduction audits (typically saving 30–50%)',
        'Horizontal auto-scaling server groups for peak traffic'
      ],
      tags: ['AWS ECS', 'Vercel', 'Cloudflare', 'Cost Optimization'],
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Cloud Scaled'
    },
    {
      title: '24/7 Uptime Telemetry & Incident Response',
      tagline: 'Continuous Health & SLA Protection',
      description: 'Round-the-clock monitoring with Datadog, BetterStack, and Sentry detecting anomalies and errors in real time with sub-15-minute emergency response.',
      points: [
        'Real-time uptime and server resource telemetry',
        'Sentry error aggregation with stack trace alerting',
        'Public and private system status page configuration',
        'Guaranteed response SLA with on-call DevOps engineers'
      ],
      tags: ['Datadog', 'BetterStack', 'Sentry', '24/7 SLA'],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: '99.99% Uptime'
    },
    {
      title: 'Automated Backups & Disaster Recovery Drills',
      tagline: 'Mission-Critical Data Protection',
      description: 'Automated continuous point-in-time recovery (PITR) backups across geodistributed regions with routine disaster simulation drills.',
      points: [
        'Daily automated snapshot backups across isolated regions',
        'Point-in-time recovery (PITR) with zero data loss',
        'Read-replica database scaling and connection pooling',
        'Routine disaster recovery drill testing and validation'
      ],
      tags: ['PITR Backups', 'Disaster Recovery', 'Geo-Replication', 'PgBouncer'],
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Data Protected'
    }
  ],

  'product-strategy-consulting': [
    {
      title: 'Architecture Audits & Technical Debt Remediation',
      tagline: 'Independent System Health Check',
      description: 'In-depth review of your existing code repositories, architecture diagrams, cloud spend, and security postures with a prioritized remediation roadmap.',
      points: [
        'Security vulnerability analysis based on OWASP standards',
        'Database query bottlenecks and indexing optimization',
        'Code maintainability and modular architecture scoring',
        'Prioritized executive action plan with quick wins'
      ],
      tags: ['OWASP', 'SonarQube', 'Tech Debt', 'Architecture Review'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Expert Audit'
    },
    {
      title: 'Fractional CTO & Strategic Engineering Leadership',
      tagline: 'Executive Technical Direction',
      description: 'Dedicated monthly CTO advisory guiding architecture decisions, hiring senior talent, unblocking development bottlenecks, and aligning tech with business goals.',
      points: [
        'Weekly sprint roadmap and architecture reviews',
        'Technical interview vetting for senior engineering hires',
        'Third-party vendor, SaaS, and API feasibility audits',
        'Architecture guidance on critical pull requests'
      ],
      tags: ['Fractional CTO', 'Tech Leadership', 'Hiring', 'Roadmap'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'CTO Advisory'
    },
    {
      title: 'Investor Technical Due Diligence Preparation',
      tagline: 'Fundraising & Acquisition Readiness',
      description: 'Prepare complete technical due diligence documentation, verify IP ownership assignments, and represent your technology in investor Q&A meetings.',
      points: [
        'System architecture diagrams and data flow blueprints',
        'IP assignment and open-source license compliance audit',
        'Scalability projections and cloud infrastructure cost models',
        'Direct participation in technical diligence investor meetings'
      ],
      tags: ['Due Diligence', 'IP Verification', 'Investor Decks', 'Data Flows'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Due Diligence'
    },
    {
      title: 'Product Roadmap & MVP Scope Definition',
      tagline: 'De-Risking Product Launches',
      description: 'Transform broad product concepts into phased, prioritized engineering milestones that maximize customer validation while minimizing upfront budget.',
      points: [
        'Feature prioritization matrices (Impact vs. Effort)',
        'Pragmatic MVP scope definition to accelerate launch',
        'Sprint resource planning and timeline estimations',
        'Risk mitigation strategies for complex dependencies'
      ],
      tags: ['MVP Planning', 'Linear', 'Jira', 'Risk Mitigation'],
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Validated Scope'
    }
  ],

  'chatbot-development': [
    {
      title: 'Custom AI Chatbot Widgets & Conversational UI',
      tagline: 'Always-On Brand Representative',
      description: 'Embeddable, mobile-responsive chat interfaces with streaming responses, pre-set prompt starters, and customized brand theming.',
      points: [
        'Real-time streaming responses with sub-second latency',
        'Custom brand styling (typography, accent colors, avatars)',
        'Pre-set conversation starters and quick-action chips',
        'Mobile-optimized floating drawer and fullscreen view'
      ],
      tags: ['Streaming UI', 'React', 'Tailwind', 'Brand Avatars'],
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Live Streaming'
    },
    {
      title: 'CMS Knowledge Base & Real-Time Sync',
      tagline: 'Zero-Code Content Updates',
      description: 'The chatbot connects directly to your CMS Knowledge Manager, letting non-technical teams update FAQs, pricing, and service details in real time.',
      points: [
        'Direct integration with CMS Knowledge Base manager',
        'Instant updates without redeploying code',
        'Strict ground-truth semantic matching guardrails',
        'Automated fallback routing for unknown inquiries'
      ],
      tags: ['CMS Sync', 'Vector RAG', 'Zero Code', 'Guardrails'],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Real-Time Sync'
    },
    {
      title: 'Automated Lead Qualification & CRM Routing',
      tagline: 'Converting Visitors into Pipeline',
      description: 'Qualify inbound prospects 24/7 by collecting budget, scope, and contact details, and route them immediately into HubSpot, Salesforce, or Slack.',
      points: [
        'Custom qualification question logic and branching',
        'Instant email alerts and Slack channel lead notifications',
        'Direct sync into HubSpot, Salesforce, and webhook endpoints',
        'Calendly meeting scheduler embed for instant bookings'
      ],
      tags: ['HubSpot', 'Salesforce', 'Lead Capture', 'Calendly'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Lead Engine'
    },
    {
      title: 'Omnichannel Messaging & WhatsApp Integration',
      tagline: 'Engage Customers Across Every Channel',
      description: 'Deploy your trained conversational bot across web widgets, WhatsApp Business API, Slack internal teams, and Discord communities.',
      points: [
        'Official WhatsApp Business API integration',
        'Internal team Slack and Discord bot deployments',
        'Unified multi-channel conversation history in CMS',
        'Seamless human agent live takeover handoff'
      ],
      tags: ['WhatsApp API', 'Slack Bot', 'Live Handoff', 'Omnichannel'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Omnichannel'
    }
  ],

  'custom-apps-development': [
    {
      title: 'Custom Internal & Client Management Portals',
      tagline: 'Eliminating Spreadsheets & Bottlenecks',
      description: 'Bespoke web applications designed around your exact business operating procedures, data models, and team workflows.',
      points: [
        'Role-Based Access Control (RBAC) permissions matrix',
        'High-density data tables with advanced filtering & sorting',
        'Custom status workflows and approval hierarchies',
        'Responsive UI optimized for desktop and mobile tablets'
      ],
      tags: ['RBAC', 'Next.js', 'Data Tables', 'Custom Workflows'],
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Bespoke Software'
    },
    {
      title: 'Automated Document & PDF Reporting Engines',
      tagline: 'High-Speed Report Generation',
      description: 'Generate pixel-perfect compliance certificates, invoices, contracts, and analytical PDF/Excel summaries automatically on demand or on schedule.',
      points: [
        'Automated branded PDF certificate & invoice rendering',
        'Scheduled background Excel and CSV data exports',
        'Dynamic email delivery triggers to clients and managers',
        'Cryptographic digital signature verification support'
      ],
      tags: ['PDF Engine', 'Excel Exports', 'Scheduled Tasks', 'BullMQ'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Auto Reports'
    },
    {
      title: 'Legacy Database & SQL Connectors',
      tagline: 'Connecting Core Business Data',
      description: 'Modernize legacy PostgreSQL, MySQL, MS SQL, Oracle, or MongoDB databases by building secure, modern web frontends on top of them.',
      points: [
        'Direct secure connection to existing SQL/Postgres databases',
        'Prisma ORM data modeling with zero schema lock-in',
        'Automated database migration and rollback scripts',
        'Encrypted data at rest and in transit (AES-256 / TLS 1.3)'
      ],
      tags: ['PostgreSQL', 'Prisma', 'MS SQL', 'AES-256'],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'SQL Connected'
    },
    {
      title: 'Event-Driven Background Job Processing',
      tagline: 'Handling Heavy Computations Seamlessly',
      description: 'Asynchronous task workers powered by Redis and BullMQ that handle heavy data imports, webhooks, notifications, and scheduled synchronizations.',
      points: [
        'Redis-backed BullMQ job queues with concurrency controls',
        'Automated task retries with exponential backoff',
        'Live job progress tracking and failure alert notifications',
        'High-throughput batch CSV parsing with zero memory leaks'
      ],
      tags: ['BullMQ', 'Redis', 'Background Workers', 'Batch Jobs'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&h=650&auto=format&q=80&fit=crop',
      badge: 'Asynchronous Scale'
    }
  ]
};

// 1. Update data/cms-db.json
const dbPath = path.join(__dirname, '..', 'data', 'cms-db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.services.forEach(service => {
  if (deliverablesData[service.slug]) {
    service.deliverables = deliverablesData[service.slug];
  }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated deliverables in data/cms-db.json!');

// 2. Update constants/servicesData.js
const servicesDataPath = path.join(__dirname, '..', 'constants', 'servicesData.js');
let servicesDataJs = fs.readFileSync(servicesDataPath, 'utf8');

// We will write a complete updated constants/servicesData.js file
const { SERVICES_DATA } = require('../constants/servicesData');
Object.keys(deliverablesData).forEach(slug => {
  if (SERVICES_DATA[slug]) {
    SERVICES_DATA[slug].deliverables = deliverablesData[slug];
  }
});

fs.writeFileSync(path.join(__dirname, 'deliverables_export.json'), JSON.stringify(deliverablesData, null, 2), 'utf8');
console.log('Deliverables exported for servicesData.js update!');
