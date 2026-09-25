import {
  Bot, Cloud, Globe, Smartphone,
  Cpu, Megaphone, Server, Compass,
  MessageSquareCode, Layers
} from 'lucide-react';

export const SERVICES_DATA = {
  'ai-agentic-development': {
    slug: "ai-agentic-development",
    title: "AI Agentic Development",
    tagline: "Autonomous AI agents engineered for real-world enterprise workflows.",
    category: "AI & Automation",
    icon: Bot,
    color: undefined,
    image: {
      "src": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&auto=format&q=85&fit=crop",
      "alt": "Autonomous AI agentic development and neural reasoning network"
},
    heroDescription: "We design and deploy practical agentic workflows that integrate LLMs, tool orchestration, internal knowledge bases, and human-in-the-loop validation.",
    overview: {
      "headline": "Autonomous Systems Beyond Simple Chatbots",
      "body": "Generative AI is only useful when it executes actions, accesses company data securely, and integrates directly with existing business tools. We develop autonomous agent architectures with strict guardrails, function calling, vector embeddings, and real-time validation so your agents perform meaningful cognitive work accurately.",
      "highlights": [
            "Secure Retrieval-Augmented Generation (RAG) over private company documents",
            "Function calling and API orchestration to execute tasks across software tools",
            "Stateful multi-agent collaboration with supervisor and worker hierarchies",
            "Deterministic validation guardrails preventing hallucinations and unauthorized actions"
      ]
},
    deliverables: [
      {
            "title": "Custom Autonomous Agents & Tool Orchestration",
            "tagline": "Goal-Driven Cognitive Automation",
            "description": "We engineer autonomous agents capable of multi-step problem solving, executing actions across third-party software tools, and self-correcting errors through continuous feedback loops.",
            "points": [
                  "LangChain & LangGraph deterministic state machines",
                  "External tool execution via OpenAI / Anthropic function calling",
                  "Persistent conversation state & short/long-term memory",
                  "Self-healing execution with fallback model routing"
            ],
            "tags": [
                  "LangGraph",
                  "Function Calling",
                  "State Machine",
                  "Self-Correction"
            ],
            "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Autonomous Execution"
      },
      {
            "title": "Enterprise RAG & Private Knowledge Systems",
            "tagline": "Cited Intelligence Over Proprietary Data",
            "description": "Connect internal PDFs, wikis, Slack archives, and SQL databases into an ultra-fast semantic retrieval engine with precise source attribution and zero public data leakage.",
            "points": [
                  "High-dimensional vector databases (pgvector / Pinecone)",
                  "Hybrid dense + sparse semantic chunking pipelines",
                  "Zero-data-retention VPC security guarantees",
                  "Strict role-based document access permissions"
            ],
            "tags": [
                  "pgvector",
                  "Hybrid Search",
                  "Private VPC",
                  "Role-Based Access"
            ],
            "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Private & Secure"
      },
      {
            "title": "Multi-Agent Supervisor & Worker Pipelines",
            "tagline": "Collaborative Agent Architectures",
            "description": "Orchestrate specialized agent teams where supervisor agents review, delegate, and approve work executed by specialized researcher, coder, and analyst agents.",
            "points": [
                  "Supervisor-worker orchestration topologies",
                  "Parallel asynchronous task distribution",
                  "Human-in-the-loop validation review checkpoints",
                  "Complete audit logging and replayable state telemetry"
            ],
            "tags": [
                  "Multi-Agent",
                  "Human-in-the-Loop",
                  "Telemetry",
                  "Langfuse"
            ],
            "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Team Orchestration"
      },
      {
            "title": "Deterministic Guardrails & Benchmark Evals",
            "tagline": "Hallucination-Proof Output Enforcement",
            "description": "Enforce strict JSON schema validation, Pydantic type checking, and automated continuous regression benchmarks against historical company edge cases.",
            "points": [
                  "Strict structured output enforcement (Zod/Pydantic)",
                  "Continuous automated eval suites (Ragas / LangSmith)",
                  "Prompt-injection and toxicity security filters",
                  "Token usage and latency optimization"
            ],
            "tags": [
                  "Zod",
                  "Ragas",
                  "LangSmith",
                  "Guardrails"
            ],
            "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Zero Hallucination"
      }
],
    techStack: [
      {
            "category": "AI & Orchestration",
            "tools": [
                  "LangGraph",
                  "LangChain",
                  "LlamaIndex",
                  "OpenAI API",
                  "Anthropic Claude"
            ]
      },
      {
            "category": "Vector & Data",
            "tools": [
                  "pgvector",
                  "Pinecone",
                  "Qdrant",
                  "Unstructured.io"
            ]
      },
      {
            "category": "Backend & APIs",
            "tools": [
                  "Python",
                  "FastAPI",
                  "Node.js",
                  "Celery",
                  "Redis"
            ]
      },
      {
            "category": "Monitoring & Eval",
            "tools": [
                  "Langfuse",
                  "LangSmith",
                  "OpenTelemetry",
                  "Weights & Biases"
            ]
      }
],
    process: [
      {
            "step": "01",
            "title": "Workflow & Data Audit",
            "desc": "Identify repetitive knowledge tasks, data schemas, tool APIs, and safety requirements."
      },
      {
            "step": "02",
            "title": "Agent Architecture",
            "desc": "Build RAG pipelines, define function definitions, and establish deterministic guardrails."
      },
      {
            "step": "03",
            "title": "Evaluation & Benchmarking",
            "desc": "Run automated evaluations on real historical data to tune accuracy and eliminate hallucinations."
      },
      {
            "step": "04",
            "title": "Integration & Live Deployment",
            "desc": "Deploy agents into Slack, internal dashboards, CRMs, or customer-facing apps."
      }
],
    faqs: [
      {
            "id": 1,
            "question": "How do you prevent AI hallucinations and ungrounded outputs in production?",
            "answer": "We implement deterministic schema enforcement (Zod/Pydantic), strict RAG ground-truth matching with citation attribution, confidence score thresholds, and mandatory human approval gates for high-stakes or irreversible operations."
      },
      {
            "id": 2,
            "question": "Is our proprietary company data used to train public LLMs?",
            "answer": "Never. We utilize zero-data-retention enterprise API agreements and store vector embeddings in private, VPC-isolated databases (pgvector / Pinecone) so your proprietary information is never shared or trained upon."
      },
      {
            "id": 3,
            "question": "Which AI models and providers do you support?",
            "answer": "We build model-agnostic agent architectures supporting OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), Google Gemini 1.5/2.0, as well as open-source LLMs (Llama 3, DeepSeek, Mistral) deployed on your private cloud infrastructure."
      },
      {
            "id": 4,
            "question": "How long does it take to develop and deploy an AI agent workflow?",
            "answer": "A focused discovery and working proof-of-concept typically takes 2–3 weeks. Full production-grade multi-agent architectures with tool integrations, telemetry, and evaluation benchmarks take 6–10 weeks."
      },
      {
            "id": 5,
            "question": "How do agents handle tool execution failures or API timeouts?",
            "answer": "We build stateful execution graphs with LangGraph featuring automatic exponential retries, fallback models, graceful failure messaging, and alert triggers for human supervisors."
      }
],
    related: [
      "saas-development",
      "api-system-integration",
      "web-development"
],
    featured: false
  },
  'saas-development': {
    slug: "saas-development",
    title: "SaaS Platform Engineering",
    tagline: "Multi-tenant, subscription-ready SaaS products built for scale.",
    category: "Engineering",
    icon: Cloud,
    color: undefined,
    image: {
      "src": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&auto=format&q=85&fit=crop",
      "alt": "SaaS subscription analytics and enterprise dashboard"
},
    heroDescription: "We build complete SaaS platforms with multi-tenancy, subscription billing, team permissions, analytics dashboards, and scalable cloud backends.",
    overview: {
      "headline": "Architected for Thousands of Concurrent Tenants",
      "body": "Building a SaaS platform involves complex foundational decisions: tenant data isolation, recurring subscription billing, seat management, webhook reliability, and automated onboarding. We deliver battle-tested SaaS foundations that empower you to onboard B2B teams, collect recurring revenue, and scale seamlessly without rewriting core architecture.",
      "highlights": [
            "Secure multi-tenant data partitioning (schema or row-level security)",
            "Stripe Billing & LemonSqueezy integration with tiered subscriptions & usage metering",
            "Enterprise SSO (SAML / Okta / Google Workspace) and granular role-based permissions",
            "Live interactive dashboards with real-time charting and data exports"
      ]
},
    deliverables: [
      {
            "title": "Multi-Tenant Architecture & Data Partitioning",
            "tagline": "Enterprise Security from Tenant Zero",
            "description": "We engineer multi-tenant SaaS foundations with PostgreSQL Row-Level Security (RLS) ensuring strict mathematical tenant isolation, custom subdomain routing, and granular role permissions.",
            "points": [
                  "PostgreSQL Row-Level Security (RLS) data partitioning",
                  "Custom vanity domain mapping with automated SSL",
                  "Organization member invitations and RBAC hierarchy",
                  "Immutable audit logging for security compliance"
            ],
            "tags": [
                  "PostgreSQL RLS",
                  "Multi-Tenant",
                  "Custom Domains",
                  "RBAC"
            ],
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Enterprise Multi-Tenancy"
      },
      {
            "title": "Subscription & Metered Billing Engine",
            "tagline": "Frictionless Monetization Infrastructure",
            "description": "Complete integration with Stripe Billing, LemonSqueezy, and Paddle supporting tiered recurring plans, per-seat licensing, dunning management, and metered usage ingestion.",
            "points": [
                  "Stripe Customer Portal and hosted checkout sessions",
                  "High-throughput usage metering and aggregation events",
                  "Automated invoice generation, tax, and VAT compliance",
                  "Dunning recovery emails and grace period logic"
            ],
            "tags": [
                  "Stripe Billing",
                  "Metered Pricing",
                  "Automated Invoicing",
                  "Dunning"
            ],
            "image": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Monetization Ready"
      },
      {
            "title": "High-Velocity Management Dashboards",
            "tagline": "Real-Time Operational Intelligence",
            "description": "Ultra-responsive analytics dashboards for end-users and internal super-admins with real-time charting, CSV/PDF report generators, and user impersonation capabilities.",
            "points": [
                  "Real-time data visualization with optimized SQL aggregations",
                  "Instant CSV, Excel, and branded PDF exports",
                  "Super-admin support tooling and account impersonation",
                  "Dynamic feature flags and subscription tier gating"
            ],
            "tags": [
                  "Next.js App Router",
                  "Data Charts",
                  "PDF Export",
                  "Feature Flags"
            ],
            "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Real-Time Telemetry"
      },
      {
            "title": "Public Developer APIs & Webhook Dispatchers",
            "tagline": "Ecosystem Extensibility & Integrations",
            "description": "Allow your B2B customers to automate workflows and integrate their internal tools with your platform through secure REST/GraphQL APIs and outgoing webhooks.",
            "points": [
                  "API key management with scoped tokens & rate limiting",
                  "Resilient outgoing webhook delivery with retry queues",
                  "Interactive OpenAPI (Swagger) documentation portal",
                  "Starter SDKs in TypeScript and Python"
            ],
            "tags": [
                  "REST API",
                  "Webhooks",
                  "OpenAPI",
                  "Developer Portal"
            ],
            "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "API First"
      }
],
    techStack: [
      {
            "category": "App Framework",
            "tools": [
                  "Next.js",
                  "React",
                  "Node.js",
                  "TypeScript"
            ]
      },
      {
            "category": "Data & Auth",
            "tools": [
                  "PostgreSQL",
                  "Prisma",
                  "Supabase Auth",
                  "Clerk",
                  "NextAuth"
            ]
      },
      {
            "category": "Payments",
            "tools": [
                  "Stripe Billing",
                  "LemonSqueezy",
                  "Paddle"
            ]
      },
      {
            "category": "Cloud & Queues",
            "tools": [
                  "AWS ECS",
                  "Vercel",
                  "Redis (Upstash)",
                  "Resend"
            ]
      }
],
    process: [
      {
            "step": "01",
            "title": "SaaS Blueprint",
            "desc": "Define tenant models, pricing structures, authentication flows, and database schemas."
      },
      {
            "step": "02",
            "title": "Core Platform Build",
            "desc": "Implement workspace isolation, Stripe checkout, dashboards, and role management."
      },
      {
            "step": "03",
            "title": "Webhooks & Edge Cases",
            "desc": "Thoroughly test invoice failures, subscription cancellations, upgrades, and seat limits."
      },
      {
            "step": "04",
            "title": "Production Rollout",
            "desc": "Deploy with monitoring, automated backups, error tracking, and performance alerting."
      }
],
    faqs: [
      {
            "id": 1,
            "question": "How do you ensure complete data isolation between customer tenants?",
            "answer": "We implement rigorous PostgreSQL Row-Level Security (RLS) and workspace-scoped middleware to mathematically guarantee that no tenant can ever view or mutate another tenant's data."
      },
      {
            "id": 2,
            "question": "Can you handle usage-based, tiered, and metered subscription billing?",
            "answer": "Yes. We engineer Stripe Billing, LemonSqueezy, and Paddle integrations supporting tiered plans, per-seat licensing, free trials with dunning management, and high-frequency event ingestion for metered usage billing."
      },
      {
            "id": 3,
            "question": "Do you implement enterprise features like SSO, SAML, and audit logs?",
            "answer": "Yes. We build enterprise-ready capabilities including SAML/OIDC Single Sign-On (Okta, Azure AD, Google Workspace), SCIM user provisioning, granular role-based access control (RBAC), and immutable audit logs."
      },
      {
            "id": 4,
            "question": "What tech stack do you recommend for high-scale SaaS products?",
            "answer": "We typically build with Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL with Prisma ORM, Redis for caching and rate limiting, and containerized Node.js/Python microservices hosted on AWS or Vercel."
      },
      {
            "id": 5,
            "question": "What is the typical timeline for an MVP launch?",
            "answer": "A full-featured SaaS MVP with authentication, billing, dashboard interfaces, and core workflow features is typically engineered and launched within 8 to 12 weeks."
      }
],
    related: [
      "ai-agentic-development",
      "api-system-integration",
      "web-development"
],
    featured: false
  },
  'web-development': {
    slug: "web-development",
    title: "Modern Web Development",
    tagline: "Blazing fast, SEO-optimized websites and web applications.",
    category: "Engineering",
    icon: Globe,
    color: undefined,
    image: {
      "src": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1920&h=1080&auto=format&q=85&fit=crop",
      "alt": "Modern web engineering and responsive website design layout"
},
    heroDescription: "We build ultra-fast websites and rich web applications with modern frontend engineering, animations, CMS integrations, and top-tier performance benchmarks.",
    overview: {
      "headline": "Lightning-Fast Load Times & Engaging User Experiences",
      "body": "Your website is your primary digital storefront and growth engine. We combine cutting-edge frontend technologies like Next.js, React, and GSAP with clean headless CMS backends to deliver websites that load in milliseconds and convert visitors into qualified leads.",
      "highlights": [
            "Perfect Core Web Vitals and 100/100 Google Lighthouse performance benchmarks",
            "Server-side rendering (SSR) and static generation (SSG) for instant page loads",
            "Smooth micro-animations, parallax effects, and fluid user interactions",
            "Headless CMS integration (Sanity, Strapi, Contentful) for effortless content editing"
      ]
},
    deliverables: [
      {
            "title": "Custom Marketing & High-Speed Web Applications",
            "tagline": "Speed, Typography & Immersive Interaction",
            "description": "Custom Next.js web applications engineered for instantaneous sub-second load times, fluid micro-interactions, responsive ergonomics, and top-tier lead conversion.",
            "points": [
                  "Next.js App Router with Server-Side Rendering (SSR)",
                  "Fluid 60fps micro-animations with GSAP and Framer Motion",
                  "Adaptive mobile-first layout with dark/light themes",
                  "WCAG 2.1 AA accessibility and cross-browser testing"
            ],
            "tags": [
                  "Next.js",
                  "React 19",
                  "GSAP",
                  "WCAG 2.1"
            ],
            "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Sub-Second Speed"
      },
      {
            "title": "Headless CMS & Content Publishing Engine",
            "tagline": "Total Autonomy for Marketing Teams",
            "description": "Empower your marketing and growth teams to create landing pages, update copy, upload assets, and publish blogs through Sanity, Strapi, or Contentful without writing code.",
            "points": [
                  "Modular block-based page builder architectures",
                  "Live real-time editing previews in staging",
                  "Automated WebP/AVIF image transformation pipelines",
                  "Dynamic multi-language localization (i18n)"
            ],
            "tags": [
                  "Sanity.io",
                  "Strapi",
                  "Contentful",
                  "Live Preview"
            ],
            "image": "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "No-Code CMS"
      },
      {
            "title": "Core Web Vitals & Technical SEO Architecture",
            "tagline": "100/100 Google Lighthouse Standards",
            "description": "Every page is engineered for maximum search visibility with structured schema markup, zero layout shifts, critical CSS inlining, and CDN edge caching.",
            "points": [
                  "100/100 Lighthouse performance, SEO, and best practices",
                  "JSON-LD structured data for rich Google search snippets",
                  "Dynamic sitemap generation and automated robots.txt",
                  "Sub-100ms Largest Contentful Paint (LCP) benchmarks"
            ],
            "tags": [
                  "Core Web Vitals",
                  "JSON-LD",
                  "Edge CDN",
                  "Technical SEO"
            ],
            "image": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "100/100 Lighthouse"
      },
      {
            "title": "Interactive 3D & WebGL Canvas Visualizations",
            "tagline": "Next-Gen Visual Storytelling",
            "description": "Elevate your digital product narrative with Three.js, shaders, and WebGL canvas elements that react smoothly to user scroll gestures without degrading performance.",
            "points": [
                  "Lightweight Three.js and WebGL rendering pipelines",
                  "GPU-accelerated smooth canvas animations",
                  "Adaptive performance fallback for low-power mobile devices",
                  "Custom interactive 3D product configurators"
            ],
            "tags": [
                  "Three.js",
                  "WebGL",
                  "Shaders",
                  "Interactive 3D"
            ],
            "image": "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "60fps Visuals"
      }
],
    techStack: [
      {
            "category": "Frontend",
            "tools": [
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Vanilla CSS"
            ]
      },
      {
            "category": "Animation",
            "tools": [
                  "GSAP",
                  "Framer Motion",
                  "Lenis Smooth Scroll",
                  "Three.js"
            ]
      },
      {
            "category": "Headless CMS",
            "tools": [
                  "Sanity.io",
                  "Contentful",
                  "Strapi",
                  "Prismic"
            ]
      },
      {
            "category": "Hosting & CDN",
            "tools": [
                  "Vercel",
                  "Cloudflare",
                  "AWS CloudFront"
            ]
      }
],
    process: [
      {
            "step": "01",
            "title": "Design & Tokenization",
            "desc": "Figma to code translation, setting up typographic scales, colors, and responsive breakpoints."
      },
      {
            "step": "02",
            "title": "Component Engineering",
            "desc": "Build modular, accessible UI components with rich micro-animations."
      },
      {
            "step": "03",
            "title": "CMS Integration & SEO",
            "desc": "Connect content schemas, generate dynamic sitemaps, and optimize Core Web Vitals."
      },
      {
            "step": "04",
            "title": "Launch & CDN Deployment",
            "desc": "Deploy to edge network with SSL, performance monitoring, and analytics setup."
      }
],
    faqs: [
      {
            "id": 1,
            "question": "Can non-technical team members update content and publish pages easily?",
            "answer": "Absolutely. We configure user-friendly headless CMS solutions (Sanity, Strapi, Contentful) or built-in CMS dashboards where marketing and operations teams can manage copy, upload media, publish blogs, and launch landing pages without touching code."
      },
      {
            "id": 2,
            "question": "How do you achieve 95–100 Google Lighthouse and Core Web Vitals scores?",
            "answer": "We leverage Next.js hybrid server-side rendering (SSR), static generation (SSG), automatic next-gen image optimization (AVIF/WebP), critical CSS extraction, font preloading, and aggressive JavaScript bundle tree-shaking."
      },
      {
            "id": 3,
            "question": "How do you ensure our existing SEO rankings are preserved during a redesign?",
            "answer": "We conduct comprehensive URL structure audits, configure 301 redirect mappings, generate dynamic XML sitemaps, maintain canonical URL structures, and implement schema.org structured JSON-LD data."
      },
      {
            "id": 4,
            "question": "Do you build custom web animations and interactive 3D experiences?",
            "answer": "Yes. We create fluid micro-interactions, scroll-driven storytelling, and interactive 3D scenes using GSAP, Framer Motion, Lenis Smooth Scroll, and Three.js/WebGL while maintaining 60fps performance."
      },
      {
            "id": 5,
            "question": "Who owns the code, design assets, and intellectual property?",
            "answer": "You own 100% of the source code, repository rights, Figma design files, and IP from day one. We provide full git handover and documentation upon delivery."
      }
],
    related: [
      "mobile-app-development",
      "digital-marketing",
      "saas-development"
],
    featured: false
  },
  'mobile-app-development': {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    tagline: "Cross-platform iOS and Android apps engineered for fluid performance.",
    category: "Engineering",
    icon: Smartphone,
    color: undefined,
    image: {
      "src": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&h=1080&auto=format&q=85&fit=crop",
      "alt": "Mobile application interface development on iOS and Android smartphones"
},
    heroDescription: "We build high-quality mobile applications using React Native and Flutter with native performance, offline capabilities, push notifications, and app store compliance.",
    overview: {
      "headline": "Single Codebase. Native 60fps Experience.",
      "body": "Building separate native codebases for iOS and Android is expensive and slow to maintain. We build cross-platform mobile products using modern React Native and Expo, delivering silky-smooth 60fps animations, native device API access, offline data persistence, and unified backend synchronization.",
      "highlights": [
            "Single maintainable codebase deploying natively to both Apple App Store and Google Play",
            "Hardware integration: biometric auth (FaceID/TouchID), camera, GPS, and Bluetooth",
            "Offline-first architecture with local SQLite storage and automated cloud sync",
            "Seamless push notification pipelines (OneSignal / Expo Push / Firebase Cloud Messaging)"
      ]
},
    deliverables: [
      {
            "title": "Cross-Platform React Native Applications",
            "tagline": "Single Codebase. True Native Performance.",
            "description": "Engineered with React Native and Expo, sharing 95%+ of the codebase across iOS and Android with silky-smooth 60fps animations and platform-native ergonomics.",
            "points": [
                  "React Native & Expo modern architecture",
                  "Native gesture navigation and transition physics",
                  "Fluid 60fps animations on both mobile platforms",
                  "Adaptive layouts for smartphones, tablets, and foldables"
            ],
            "tags": [
                  "React Native",
                  "Expo",
                  "iOS & Android",
                  "60fps Physics"
            ],
            "image": "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Native 60fps"
      },
      {
            "title": "Offline-First Storage & Data Synchronization",
            "tagline": "Uninterrupted Offline Functionality",
            "description": "Users can continue using the application offline with local SQLite/MMKV storage, with automatic conflict-resolution and background sync upon reconnection.",
            "points": [
                  "Local SQLite & WatermelonDB relational caching",
                  "Optimistic UI mutations for instantaneous feedback",
                  "Background queue synchronization with conflict resolution",
                  "Battery-efficient network polling protocols"
            ],
            "tags": [
                  "SQLite",
                  "WatermelonDB",
                  "Offline First",
                  "Auto-Sync"
            ],
            "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Zero Downtime"
      },
      {
            "title": "Hardware Sensors & Native Device APIs",
            "tagline": "Deep Device Integration",
            "description": "Connect seamlessly with biometric authentication (FaceID/TouchID), camera processing, GPS geolocation, push notifications, and Bluetooth peripherals.",
            "points": [
                  "Biometric security (FaceID, TouchID, Android Biometrics)",
                  "In-app camera filters and real-time document scanning",
                  "FCM & Apple APNs rich push notification channels",
                  "Apple Pay and Google In-App Purchases integration"
            ],
            "tags": [
                  "Biometrics",
                  "Push Notifications",
                  "Apple Pay",
                  "GPS"
            ],
            "image": "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Hardware Connected"
      },
      {
            "title": "App Store Publishing & Over-the-Air (OTA) Updates",
            "tagline": "Instant Rollouts & Store Approval",
            "description": "We manage the entire App Store and Google Play approval process, and configure Expo EAS Over-The-Air updates so critical bug fixes bypass app store review delays.",
            "points": [
                  "100% Apple App Store & Google Play compliance guarantee",
                  "Expo EAS Over-The-Air (OTA) instant code updates",
                  "Automated TestFlight & Internal Testing CI distribution",
                  "Crashlytics telemetry and real-time error alerts"
            ],
            "tags": [
                  "EAS OTA",
                  "App Store",
                  "TestFlight",
                  "Crashlytics"
            ],
            "image": "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Store Approved"
      }
],
    techStack: [
      {
            "category": "Mobile Framework",
            "tools": [
                  "React Native",
                  "Expo",
                  "TypeScript"
            ]
      },
      {
            "category": "State & Local DB",
            "tools": [
                  "Zustand",
                  "React Query",
                  "SQLite",
                  "MMKV"
            ]
      },
      {
            "category": "Backend & APIs",
            "tools": [
                  "Node.js",
                  "PostgreSQL",
                  "GraphQL",
                  "Firebase"
            ]
      },
      {
            "category": "Deployment & CI",
            "tools": [
                  "EAS Build",
                  "Fastlane",
                  "TestFlight",
                  "Google Play Console"
            ]
      }
],
    process: [
      {
            "step": "01",
            "title": "Mobile UX & Prototypes",
            "desc": "Design mobile-native navigation flows, touch gestures, and interactive Figma prototypes."
      },
      {
            "step": "02",
            "title": "Core App Engineering",
            "desc": "Build React Native screens, state management, and API endpoints with bi-weekly TestFlight builds."
      },
      {
            "step": "03",
            "title": "Device Testing & QA",
            "desc": "Test across real physical iOS and Android devices, edge cases, offline modes, and push notifications."
      },
      {
            "step": "04",
            "title": "Store Submission & Launch",
            "desc": "Manage App Store Review and Google Play submissions to ensure 100% approval."
      }
],
    faqs: [
      {
            "id": 1,
            "question": "Do we need separate engineering teams for iOS and Android?",
            "answer": "No. Our cross-platform engineering with React Native and Expo shares 95%+ of the codebase between iOS and Android, drastically reducing upfront development costs and ongoing maintenance overhead without sacrificing native 60fps performance."
      },
      {
            "id": 2,
            "question": "Can updates and bug fixes be published without waiting for App Store review?",
            "answer": "Yes. We implement Expo EAS Over-The-Air (OTA) updates, enabling instant rollout of critical bug fixes, UI improvements, and content updates directly to users' devices."
      },
      {
            "id": 3,
            "question": "How do you handle offline mode and unreliable connectivity?",
            "answer": "We implement offline-first local SQLite / MMKV caching with background synchronization queues and conflict-resolution strategies, allowing users to interact with the app seamlessly even without an active internet connection."
      },
      {
            "id": 4,
            "question": "Do you manage the entire Apple App Store and Google Play submission process?",
            "answer": "Yes. We handle the full publishing lifecycle including developer account setup, provisioning profiles, privacy manifest compliance, store screenshots, metadata preparation, and direct responses to store review inquiries until approved."
      },
      {
            "id": 5,
            "question": "How long does it take to develop a custom mobile application?",
            "answer": "A standard cross-platform MVP app typically takes 8–12 weeks from initial wireframes to App Store and Play Store launch."
      }
],
    related: [
      "web-development",
      "api-system-integration",
      "saas-development"
],
    featured: false
  },
  'api-system-integration': {
    slug: "api-system-integration",
    title: "API & System Integration",
    tagline: "Connect the software tools and data silos your business relies on.",
    category: "Engineering",
    icon: Cpu,
    color: undefined,
    image: {
      "src": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&auto=format&q=85&fit=crop",
      "alt": "Enterprise API integration servers and cloud data infrastructure"
},
    heroDescription: "We build secure, robust API gateways, custom middleware, payment connectors, and third-party integrations that harmonize your enterprise ecosystem.",
    overview: {
      "headline": "Unified Data Across All Your Operational Systems",
      "body": "Modern enterprises use dozens of specialized SaaS platforms, ERPs, and databases. When these systems cannot communicate seamlessly, operational velocity halts. We engineer reliable API bridges, GraphQL gateways, and event-driven microservices that synchronize your data bidirectionally with zero data loss.",
      "highlights": [
            "REST, GraphQL, and gRPC microservice development with strict schema validation",
            "Secure payment gateway integrations (Stripe, Adyen, PayPal, Authorize.Net)",
            "Bi-directional synchronization between legacy ERPs and modern cloud apps",
            "Comprehensive rate limiting, token caching, and automated API documentation"
      ]
},
    deliverables: [
      {
            "title": "Resilient API Gateways & Middleware",
            "tagline": "High-Throughput Microservice Unification",
            "description": "Centralized API layers that unify distributed backends, microservices, and databases with token caching, strict rate-limiting, and validation schemas.",
            "points": [
                  "Fastify & NestJS high-throughput gateway backends",
                  "Unified GraphQL Federation and RESTful endpoints",
                  "JWT, mTLS, and API Key authentication middleware",
                  "Redis token-bucket rate limiters preventing DDoS"
            ],
            "tags": [
                  "Fastify",
                  "NestJS",
                  "GraphQL",
                  "Redis"
            ],
            "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "High Throughput"
      },
      {
            "title": "Payment Gateways & Financial Connectors",
            "tagline": "Bulletproof Transaction Processing",
            "description": "Secure, idempotent payment integration across Stripe Custom Connect, Adyen, PayPal, QuickBooks, and Xero with automated reconciliations.",
            "points": [
                  "Stripe Connect marketplace split payments",
                  "QuickBooks & Xero automated ledger synchronizations",
                  "Idempotency keys preventing duplicate customer charges",
                  "PCI-DSS compliance and financial audit trails"
            ],
            "tags": [
                  "Stripe Connect",
                  "QuickBooks",
                  "PCI-DSS",
                  "Idempotency"
            ],
            "image": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "PCI Compliant"
      },
      {
            "title": "Legacy ERP & Enterprise Database Bridges",
            "tagline": "Modernizing Legacy Data Silos",
            "description": "Bridge modern web applications with SAP, NetSuite, Oracle, and on-premise databases via encrypted VPN and SSH tunnels with zero downtime.",
            "points": [
                  "Secure SSH / IPSec VPN tunneling protocols",
                  "Automated data normalization and schema mapping",
                  "Real-time webhook triggers and scheduled batch syncs",
                  "Failure recovery with dead-letter queue (DLQ) replay"
            ],
            "tags": [
                  "SAP",
                  "NetSuite",
                  "Oracle",
                  "DLQ Replay"
            ],
            "image": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Zero Data Loss"
      },
      {
            "title": "Interactive Developer Portals & Client SDKs",
            "tagline": "Accelerating Developer Adoption",
            "description": "Interactive documentation portals with real-time sandbox request testers, OpenAPI specifications, and auto-generated TypeScript and Python SDKs.",
            "points": [
                  "OpenAPI 3.0 / Swagger interactive documentation",
                  "Pre-configured Postman test collections and environments",
                  "Interactive live sandbox API playground",
                  "Auto-generated client SDKs for TypeScript and Python"
            ],
            "tags": [
                  "OpenAPI",
                  "Swagger",
                  "Postman",
                  "SDKs"
            ],
            "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Developer Ready"
      }
],
    techStack: [
      {
            "category": "API Protocols",
            "tools": [
                  "REST",
                  "GraphQL",
                  "gRPC",
                  "WebSockets",
                  "Webhooks"
            ]
      },
      {
            "category": "Backend Frameworks",
            "tools": [
                  "Node.js (NestJS)",
                  "Go (Gin)",
                  "Python (FastAPI)"
            ]
      },
      {
            "category": "Data & Queues",
            "tools": [
                  "PostgreSQL",
                  "Redis",
                  "RabbitMQ",
                  "Apache Kafka"
            ]
      },
      {
            "category": "Monitoring",
            "tools": [
                  "Datadog",
                  "Sentry",
                  "Prometheus",
                  "Grafana"
            ]
      }
],
    process: [
      {
            "step": "01",
            "title": "API Audit & Schema Design",
            "desc": "Inspect endpoints, authentication methods, rate limits, and define target JSON schemas."
      },
      {
            "step": "02",
            "title": "Middleware & Transformer Build",
            "desc": "Engineer data transformation logic, error handlers, and caching layers."
      },
      {
            "step": "03",
            "title": "Load & Idempotency Testing",
            "desc": "Simulate high concurrency, duplicate requests, and network failure recoveries."
      },
      {
            "step": "04",
            "title": "Production Rollout",
            "desc": "Deploy with zero-downtime blue/green strategy and live latency telemetry."
      }
],
    faqs: [
      {
            "id": 1,
            "question": "How do you handle rate limits and downtime from third-party vendor APIs?",
            "answer": "We engineer resilient middleware with Redis token-bucket rate limiters, intelligent caching, exponential backoff retry policies, and dead-letter queues (DLQ) to ensure zero data loss during upstream third-party outages."
      },
      {
            "id": 2,
            "question": "Can you integrate with legacy ERPs, SOAP services, or on-premise databases?",
            "answer": "Yes. We specialize in building secure REST, GraphQL, or gRPC wrapper layers and event bridges on top of legacy SAP, NetSuite, SOAP web services, and on-premise SQL/Oracle databases via secure VPN and SSH tunnels."
      },
      {
            "id": 3,
            "question": "How is security handled for API credentials, tokens, and sensitive data?",
            "answer": "All API keys, certificates, and secrets are encrypted at rest and managed through cloud secret managers (AWS Secrets Manager / Doppler). We enforce mTLS, JWT token rotation, and strict IP allowlisting."
      },
      {
            "id": 4,
            "question": "Do you provide developer documentation and SDKs for our APIs?",
            "answer": "Yes. We automatically generate interactive OpenAPI (Swagger) documentation, Postman collections, and TypeScript/Python starter SDKs for internal engineers or third-party developer ecosystems."
      },
      {
            "id": 5,
            "question": "What protocols and data formats do you support?",
            "answer": "We work across REST (JSON), GraphQL, gRPC (Protobuf), WebSockets for real-time bidirectional streaming, Webhooks, and event buses like Apache Kafka and RabbitMQ."
      }
],
    related: [
      "saas-development",
      "ai-agentic-development",
      "hosting-deployment-maintenance"
],
    featured: false
  },
  'digital-marketing': {
    slug: "digital-marketing",
    title: "Digital Marketing & Growth",
    tagline: "High-intent customer acquisition and digital growth campaigns.",
    category: "Growth",
    icon: Megaphone,
    color: undefined,
    image: {
      "src": "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1920&h=1080&auto=format&q=85&fit=crop",
      "alt": "Digital growth marketing analytics, funnel optimization, and campaign strategy"
},
    heroDescription: "We plan, execute, and scale digital marketing campaigns that drive qualified demand through targeted search, content strategy, and conversion optimization.",
    overview: {
      "headline": "Growth Built on Real Metrics, Not Vanity Clicks",
      "body": "Effective marketing is an engineering discipline: formulating hypotheses, running controlled experiments, tracking attribution, and optimizing conversion funnels. We create targeted acquisition systems that attract high-intent buyers, decrease customer acquisition cost (CAC), and increase lifetime value (LTV).",
      "highlights": [
            "Full-funnel attribution tracking with server-side Google Analytics and PostHog",
            "High-converting landing page creation and automated A/B testing",
            "Targeted B2B account-based marketing (ABM) and search acquisition",
            "Content strategy designed to capture high-intent organic search queries"
      ]
},
    deliverables: [
      {
            "title": "High-Converting Performance Landing Pages",
            "tagline": "Speed & Copy Engineered to Convert",
            "description": "Custom landing pages built on Next.js with sub-second mobile speeds, clear conversion-focused copy, and direct CRM form routing.",
            "points": [
                  "Sub-second mobile loading speed on all 4G/5G connections",
                  "Conversion rate optimized (CRO) headline & form hierarchy",
                  "Interactive price calculators and multi-step lead capture",
                  "Heatmap tracking, user session recordings, and scroll depth"
            ],
            "tags": [
                  "Next.js",
                  "CRO",
                  "Heatmaps",
                  "Lead Forms"
            ],
            "image": "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "High Conversion"
      },
      {
            "title": "Targeted Paid Search & B2B ABM Campaigns",
            "tagline": "High-Intent Buyer Acquisition",
            "description": "Data-driven Google Ads (Search, Performance Max) and LinkedIn B2B account-based marketing campaigns engineered for profitable ROAS and low CAC.",
            "points": [
                  "High-intent commercial search keyword targeting",
                  "Granular B2B decision-maker job title segmentation",
                  "Algorithmic bidding optimization with negative keyword pruning",
                  "A/B creative testing with weekly ad copy iterations"
            ],
            "tags": [
                  "Google Ads",
                  "LinkedIn ABM",
                  "ROAS",
                  "PPC"
            ],
            "image": "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "High ROI"
      },
      {
            "title": "Server-Side Tracking & Multi-Touch Attribution",
            "tagline": "Privacy-Compliant Analytics",
            "description": "Implement server-side GA4, Meta Conversions API (CAPI), and PostHog tracking that bypasses ad-blockers and browser cookie limits with full GDPR compliance.",
            "points": [
                  "Server-side Google Tag Manager (sGTM) deployment",
                  "Meta Conversions API (CAPI) direct server syncing",
                  "Multi-touch first/last click revenue attribution modeling",
                  "Full GDPR, CCPA, and cookie-consent compliance"
            ],
            "tags": [
                  "GA4",
                  "Meta CAPI",
                  "sGTM",
                  "PostHog"
            ],
            "image": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Accurate Data"
      },
      {
            "title": "Organic Search Strategy & Programmatic SEO",
            "tagline": "Compounding Organic Pipeline",
            "description": "Capture high-intent search queries with technical SEO audits, programmatic content page generation, and authoritative topic cluster strategies.",
            "points": [
                  "Comprehensive competitive search gap analysis",
                  "Programmatic SEO landing page database generation",
                  "High-authority topic cluster and content architecture",
                  "Core Web Vitals tuning for priority index ranking"
            ],
            "tags": [
                  "Technical SEO",
                  "Programmatic SEO",
                  "Keyword Strategy",
                  "Topic Clusters"
            ],
            "image": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Organic Growth"
      }
],
    techStack: [
      {
            "category": "Analytics & CRO",
            "tools": [
                  "Google Analytics 4",
                  "PostHog",
                  "Hotjar",
                  "Google Tag Manager"
            ]
      },
      {
            "category": "Ad Platforms",
            "tools": [
                  "Google Ads",
                  "LinkedIn Campaign Manager",
                  "Meta Ads"
            ]
      },
      {
            "category": "Reporting",
            "tools": [
                  "Looker Studio",
                  "Segment",
                  "HubSpot Analytics"
            ]
      }
],
    process: [
      {
            "step": "01",
            "title": "Audience & Funnel Audit",
            "desc": "Analyze existing traffic, conversion bottlenecks, CAC benchmarks, and ideal customer profiles."
      },
      {
            "step": "02",
            "title": "Campaign & Landing Page Build",
            "desc": "Design high-intent landing pages, write ad copy, and configure server-side conversion tracking."
      },
      {
            "step": "03",
            "title": "Launch & A/B Testing",
            "desc": "Deploy campaigns with daily budget monitoring and weekly copy/design split tests."
      },
      {
            "step": "04",
            "title": "Scale & Optimization",
            "desc": "Double down on top-performing keywords and audiences while reducing cost per acquisition."
      }
],
    faqs: [
      {
            "id": 1,
            "question": "How do you measure marketing campaign performance and ROI?",
            "answer": "We focus on real business revenue metrics: Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), Cost Per Qualified Lead (CPL), and pipeline conversion velocity—avoiding vanity metrics like superficial impressions."
      },
      {
            "id": 2,
            "question": "Do you design and code the conversion landing pages as well?",
            "answer": "Yes! Because we are a full-stack engineering and design studio, we build custom, sub-second loading Next.js landing pages with interactive calculators, forms, and CRM integrations that convert at substantially higher rates than generic template builders."
      },
      {
            "id": 3,
            "question": "What paid channels do you manage?",
            "answer": "We manage high-intent Google Search & Performance Max ads, targeted LinkedIn B2B account-based marketing (ABM) campaigns, Meta (Facebook/Instagram) acquisition funnels, and programmatic retargeting."
      },
      {
            "id": 4,
            "question": "How do you track attribution across modern privacy regulations?",
            "answer": "We set up server-side Google Analytics 4 (GA4), Meta Conversions API (CAPI), and PostHog tracking with full GDPR/CCPA compliance, providing clean multi-touch attribution despite ad-blockers and browser cookie restrictions."
      },
      {
            "id": 5,
            "question": "What is the typical ramp-up time for marketing campaigns?",
            "answer": "Funnel setup, conversion tracking, landing page builds, and initial campaign launch take 2–3 weeks. Controlled A/B testing and algorithmic bidding optimization begin producing reliable CAC benchmarks within the first 30–45 days."
      }
],
    related: [
      "web-development",
      "saas-development",
      "product-strategy-consulting"
],
    featured: false
  },
  'hosting-deployment-maintenance': {
    slug: "hosting-deployment-maintenance",
    title: "Hosting, Deployment & Maintenance",
    tagline: "Reliable cloud infrastructure, automated deployments, and 24/7 uptime monitoring.",
    category: "Support",
    icon: Server,
    color: undefined,
    image: {
      "src": "https://images.unsplash.com/photo-1597852074816-d933c4d2b988?w=1920&h=1080&auto=format&q=85&fit=crop",
      "alt": "Cloud hosting servers and enterprise data center infrastructure"
},
    heroDescription: "We manage your cloud hosting, automated CI/CD pipelines, SSL certificates, database backups, security patches, and ongoing software health.",
    overview: {
      "headline": "Zero-Downtime Infrastructure & Proactive Maintenance",
      "body": "Launching software is only the first step. To maintain customer trust and operational stability, your applications require continuous monitoring, security patching, database optimization, and automated deployment pipelines. We act as your dedicated DevOps and platform reliability team so you never worry about outages or broken releases.",
      "highlights": [
            "Automated CI/CD pipelines deploying code from Git to staging and production in minutes",
            "24/7 uptime monitoring, server performance telemetry, and instant incident response",
            "Automated daily database backups with verified point-in-time recovery testing",
            "Proactive package dependency security updates and vulnerability scanning"
      ]
},
    deliverables: [
      {
            "title": "Automated CI/CD Pipelines & Zero-Downtime Releases",
            "tagline": "Deploy Code with Absolute Confidence",
            "description": "Automated GitHub Actions and GitLab CI workflows that run test suites, generate ephemeral staging previews, and deploy zero-downtime blue/green releases.",
            "points": [
                  "Automated pull request staging preview environments",
                  "Zero-downtime blue/green and rolling deployments",
                  "Automated unit, integration, and regression test suites",
                  "Instant one-click rollback to any previous stable commit"
            ],
            "tags": [
                  "GitHub Actions",
                  "Blue/Green",
                  "Staging Previews",
                  "CI/CD"
            ],
            "image": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Zero Downtime"
      },
      {
            "title": "Cloud Hosting Architecture & Cost Optimization",
            "tagline": "Scalable Infrastructure Without Waste",
            "description": "Architect and right-size your AWS, Vercel, and Cloudflare infrastructure to handle traffic spikes seamlessly while eliminating wasted monthly cloud spend.",
            "points": [
                  "Docker and Kubernetes container cluster orchestration",
                  "Edge CDN caching and automatic global SSL renewals",
                  "Cloud cost reduction audits (typically saving 30–50%)",
                  "Horizontal auto-scaling server groups for peak traffic"
            ],
            "tags": [
                  "AWS ECS",
                  "Vercel",
                  "Cloudflare",
                  "Cost Optimization"
            ],
            "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Cloud Scaled"
      },
      {
            "title": "24/7 Uptime Telemetry & Incident Response",
            "tagline": "Continuous Health & SLA Protection",
            "description": "Round-the-clock monitoring with Datadog, BetterStack, and Sentry detecting anomalies and errors in real time with sub-15-minute emergency response.",
            "points": [
                  "Real-time uptime and server resource telemetry",
                  "Sentry error aggregation with stack trace alerting",
                  "Public and private system status page configuration",
                  "Guaranteed response SLA with on-call DevOps engineers"
            ],
            "tags": [
                  "Datadog",
                  "BetterStack",
                  "Sentry",
                  "24/7 SLA"
            ],
            "image": "https://images.unsplash.com/photo-1551836022-b06985bceb24?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "99.99% Uptime"
      },
      {
            "title": "Automated Backups & Disaster Recovery Drills",
            "tagline": "Mission-Critical Data Protection",
            "description": "Automated continuous point-in-time recovery (PITR) backups across geodistributed regions with routine disaster simulation drills.",
            "points": [
                  "Daily automated snapshot backups across isolated regions",
                  "Point-in-time recovery (PITR) with zero data loss",
                  "Read-replica database scaling and connection pooling",
                  "Routine disaster recovery drill testing and validation"
            ],
            "tags": [
                  "PITR Backups",
                  "Disaster Recovery",
                  "Geo-Replication",
                  "PgBouncer"
            ],
            "image": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Data Protected"
      }
],
    techStack: [
      {
            "category": "Cloud Providers",
            "tools": [
                  "AWS (ECS, RDS, S3)",
                  "Vercel",
                  "Cloudflare",
                  "DigitalOcean"
            ]
      },
      {
            "category": "Containers & CI",
            "tools": [
                  "Docker",
                  "GitHub Actions",
                  "Terraform",
                  "Kubernetes"
            ]
      },
      {
            "category": "Monitoring",
            "tools": [
                  "Datadog",
                  "Sentry",
                  "BetterStack",
                  "Grafana"
            ]
      }
],
    process: [
      {
            "step": "01",
            "title": "Infrastructure Audit",
            "desc": "Review existing servers, identify single points of failure, and analyze cloud hosting costs."
      },
      {
            "step": "02",
            "title": "CI/CD & Automation Setup",
            "desc": "Build automated test pipelines and staging preview environments in GitHub Actions."
      },
      {
            "step": "03",
            "title": "Backup & Monitoring Implementation",
            "desc": "Configure 24/7 uptime alerts, error tracking, and automated backup schedules."
      },
      {
            "step": "04",
            "title": "Continuous Management",
            "desc": "Ongoing server optimization, dependency updates, and monthly performance reports."
      }
],
    faqs: [
      {
            "id": 1,
            "question": "What happens if our website or server experiences an outage?",
            "answer": "Our automated 24/7 telemetry monitoring (Datadog / BetterStack / Sentry) detects anomalies within seconds, instantly notifying our on-call engineers. We trigger automated failover routines and initiate incident resolution according to our SLA."
      },
      {
            "id": 2,
            "question": "Can you help optimize cloud architecture to reduce monthly hosting costs?",
            "answer": "Yes. We perform cloud cost audits across AWS, Google Cloud, and Vercel—right-sizing underutilized instances, implementing edge CDN caching, optimizing database IOPS, and setting up automated scaling, typically reducing cloud spend by 30–50%."
      },
      {
            "id": 3,
            "question": "How do you manage database backups and disaster recovery?",
            "answer": "We configure automated daily and continuous point-in-time recovery (PITR) backups across isolated geographical regions, conducting routine recovery simulations to guarantee zero data loss."
      },
      {
            "id": 4,
            "question": "How are software package security updates and patches handled?",
            "answer": "We scan dependencies continuously for CVE vulnerabilities, testing security patches in staging environments with automated regression test suites before pushing zero-downtime production updates."
      },
      {
            "id": 5,
            "question": "What SLA tiers do you offer for ongoing support?",
            "answer": "We offer customized SLAs ranging from standard business-hours maintenance and weekly patch releases to 24/7 high-priority incident response with sub-15-minute response times for mission-critical platforms."
      }
],
    related: [
      "saas-development",
      "web-development",
      "api-system-integration"
],
    featured: false
  },
  'product-strategy-consulting': {
    slug: "product-strategy-consulting",
    title: "Product Strategy & Technical Consulting",
    tagline: "Strategic technical direction, architecture reviews, and product roadmap guidance.",
    category: "Strategy",
    icon: Compass,
    color: undefined,
    image: {
      "src": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&auto=format&q=85&fit=crop",
      "alt": "Technology leaders and consultants discussing product roadmap and architecture"
},
    heroDescription: "We help founders and enterprise leaders make high-confidence technology decisions, avoid costly technical debt, and plan clear software roadmaps.",
    overview: {
      "headline": "High-Level Technical Leadership for Critical Decisions",
      "body": "Choosing the wrong technology stack, building bloated feature sets, or hiring without technical clarity can cost months of time and hundreds of thousands of dollars. We provide fractional CTO advisory, architectural assessments, and product roadmap strategy to de-risk your investment and accelerate time-to-market.",
      "highlights": [
            "Fractional CTO guidance for startups and scaling companies without full-time executive overhead",
            "Independent architecture audits reviewing security, scalability, and technical debt",
            "Vendor and tech stack evaluations to select the right tools for your specific constraints",
            "Pragmatic product roadmaps balancing rapid customer delivery with engineering quality"
      ]
},
    deliverables: [
      {
            "title": "Architecture Audits & Technical Debt Remediation",
            "tagline": "Independent System Health Check",
            "description": "In-depth review of your existing code repositories, architecture diagrams, cloud spend, and security postures with a prioritized remediation roadmap.",
            "points": [
                  "Security vulnerability analysis based on OWASP standards",
                  "Database query bottlenecks and indexing optimization",
                  "Code maintainability and modular architecture scoring",
                  "Prioritized executive action plan with quick wins"
            ],
            "tags": [
                  "OWASP",
                  "SonarQube",
                  "Tech Debt",
                  "Architecture Review"
            ],
            "image": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Expert Audit"
      },
      {
            "title": "Fractional CTO & Strategic Engineering Leadership",
            "tagline": "Executive Technical Direction",
            "description": "Dedicated monthly CTO advisory guiding architecture decisions, hiring senior talent, unblocking development bottlenecks, and aligning tech with business goals.",
            "points": [
                  "Weekly sprint roadmap and architecture reviews",
                  "Technical interview vetting for senior engineering hires",
                  "Third-party vendor, SaaS, and API feasibility audits",
                  "Architecture guidance on critical pull requests"
            ],
            "tags": [
                  "Fractional CTO",
                  "Tech Leadership",
                  "Hiring",
                  "Roadmap"
            ],
            "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "CTO Advisory"
      },
      {
            "title": "Investor Technical Due Diligence Preparation",
            "tagline": "Fundraising & Acquisition Readiness",
            "description": "Prepare complete technical due diligence documentation, verify IP ownership assignments, and represent your technology in investor Q&A meetings.",
            "points": [
                  "System architecture diagrams and data flow blueprints",
                  "IP assignment and open-source license compliance audit",
                  "Scalability projections and cloud infrastructure cost models",
                  "Direct participation in technical diligence investor meetings"
            ],
            "tags": [
                  "Due Diligence",
                  "IP Verification",
                  "Investor Decks",
                  "Data Flows"
            ],
            "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Due Diligence"
      },
      {
            "title": "Product Roadmap & MVP Scope Definition",
            "tagline": "De-Risking Product Launches",
            "description": "Transform broad product concepts into phased, prioritized engineering milestones that maximize customer validation while minimizing upfront budget.",
            "points": [
                  "Feature prioritization matrices (Impact vs. Effort)",
                  "Pragmatic MVP scope definition to accelerate launch",
                  "Sprint resource planning and timeline estimations",
                  "Risk mitigation strategies for complex dependencies"
            ],
            "tags": [
                  "MVP Planning",
                  "Linear",
                  "Jira",
                  "Risk Mitigation"
            ],
            "image": "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Validated Scope"
      }
],
    techStack: [
      {
            "category": "Architecture Methodologies",
            "tools": [
                  "Domain-Driven Design",
                  "Event-Driven Architecture",
                  "Clean Architecture"
            ]
      },
      {
            "category": "Evaluation Tools",
            "tools": [
                  "SonarQube",
                  "AWS Well-Architected",
                  "OWASP Security Standards"
            ]
      },
      {
            "category": "Roadmapping",
            "tools": [
                  "Linear",
                  "Jira",
                  "Notion Architecture Wikis",
                  "Miro"
            ]
      }
],
    process: [
      {
            "step": "01",
            "title": "Technical Discovery",
            "desc": "Understand business goals, team structure, current software assets, and immediate pain points."
      },
      {
            "step": "02",
            "title": "System & Code Audit",
            "desc": "Review repositories, architecture diagrams, cloud infrastructure, and database schemas."
      },
      {
            "step": "03",
            "title": "Strategic Report & Roadmap",
            "desc": "Deliver an executive summary with concrete, prioritized technical recommendations."
      },
      {
            "step": "04",
            "title": "Advisory & Execution Support",
            "desc": "Provide continuous guidance during engineering execution, vendor selection, or investor reviews."
      }
],
    faqs: [
      {
            "id": 1,
            "question": "What is included in a Technical Architecture and Codebase Audit?",
            "answer": "You receive an in-depth evaluation covering code maintainability, security vulnerabilities (OWASP), database bottlenecks, cloud scalability limits, and an actionable executive roadmap prioritizing quick wins and architectural refactoring."
      },
      {
            "id": 2,
            "question": "How does a Fractional CTO engagement work?",
            "answer": "We integrate directly with your leadership team for a set number of monthly hours, leading technical hiring, advising on architecture decisions, conducting vendor assessments, unblocking sprint roadblocks, and preparing technical decks for investors."
      },
      {
            "id": 3,
            "question": "Can you assist with investor technical due diligence during fundraising?",
            "answer": "Yes. We prepare enterprise architecture documentation, data flow diagrams, IP assignment verification, and participate directly in technical Q&A sessions with venture capital and private equity diligence teams."
      },
      {
            "id": 4,
            "question": "How do you help companies decide between building custom software vs. buying SaaS?",
            "answer": "We provide rigorous cost-benefit and total cost of ownership (TCO) analyses, identifying where custom development creates proprietary competitive advantage and where third-party SaaS saves time and budget."
      },
      {
            "id": 5,
            "question": "What is the typical duration of a strategy engagement?",
            "answer": "Standalone architecture audits and MVP roadmaps take 2–4 weeks. Fractional CTO and ongoing advisory relationships typically operate on 3- to 12-month retainer cycles."
      }
],
    related: [
      "saas-development",
      "ai-agentic-development",
      "hosting-deployment-maintenance"
],
    featured: false
  },
  'chatbot-development': {
    slug: "chatbot-development",
    title: "Custom Chatbot Development",
    tagline: "Intelligent, brand-aligned customer support and lead qualification bots.",
    category: "AI & Automation",
    icon: MessageSquareCode,
    color: undefined,
    image: {
      "src": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1920&h=1080&auto=format&q=85&fit=crop",
      "alt": "Customer support AI chat interface and conversational lead bot"
},
    heroDescription: "We develop smart chatbots trained on your approved knowledge base that answer visitor inquiries, capture qualified leads, and book meetings 24/7.",
    overview: {
      "headline": "Always-On Customer Support & Intelligent Lead Capture",
      "body": "Turn website visitors into scheduled meetings and qualified sales leads. Our chatbots combine strict knowledge base boundaries with contextual memory, automated CRM syncing, and escalation triggers.",
      "highlights": [
            "Strict knowledge base matching preventing off-topic or incorrect responses",
            "Automated email notifications and CRM lead creation on enquiry submission",
            "Custom UI widget matching your brand typography and colors",
            "Full conversation history and analytics stored inside the CMS"
      ]
},
    deliverables: [
      {
            "title": "Custom AI Chatbot Widgets & Conversational UI",
            "tagline": "Always-On Brand Representative",
            "description": "Embeddable, mobile-responsive chat interfaces with streaming responses, pre-set prompt starters, and customized brand theming.",
            "points": [
                  "Real-time streaming responses with sub-second latency",
                  "Custom brand styling (typography, accent colors, avatars)",
                  "Pre-set conversation starters and quick-action chips",
                  "Mobile-optimized floating drawer and fullscreen view"
            ],
            "tags": [
                  "Streaming UI",
                  "React",
                  "Tailwind",
                  "Brand Avatars"
            ],
            "image": "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Live Streaming"
      },
      {
            "title": "CMS Knowledge Base & Real-Time Sync",
            "tagline": "Zero-Code Content Updates",
            "description": "The chatbot connects directly to your CMS Knowledge Manager, letting non-technical teams update FAQs, pricing, and service details in real time.",
            "points": [
                  "Direct integration with CMS Knowledge Base manager",
                  "Instant updates without redeploying code",
                  "Strict ground-truth semantic matching guardrails",
                  "Automated fallback routing for unknown inquiries"
            ],
            "tags": [
                  "CMS Sync",
                  "Vector RAG",
                  "Zero Code",
                  "Guardrails"
            ],
            "image": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Real-Time Sync"
      },
      {
            "title": "Automated Lead Qualification & CRM Routing",
            "tagline": "Converting Visitors into Pipeline",
            "description": "Qualify inbound prospects 24/7 by collecting budget, scope, and contact details, and route them immediately into HubSpot, Salesforce, or Slack.",
            "points": [
                  "Custom qualification question logic and branching",
                  "Instant email alerts and Slack channel lead notifications",
                  "Direct sync into HubSpot, Salesforce, and webhook endpoints",
                  "Calendly meeting scheduler embed for instant bookings"
            ],
            "tags": [
                  "HubSpot",
                  "Salesforce",
                  "Lead Capture",
                  "Calendly"
            ],
            "image": "https://images.unsplash.com/photo-1556742049-0a67e55722ee?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Lead Engine"
      },
      {
            "title": "Omnichannel Messaging & WhatsApp Integration",
            "tagline": "Engage Customers Across Every Channel",
            "description": "Deploy your trained conversational bot across web widgets, WhatsApp Business API, Slack internal teams, and Discord communities.",
            "points": [
                  "Official WhatsApp Business API integration",
                  "Internal team Slack and Discord bot deployments",
                  "Unified multi-channel conversation history in CMS",
                  "Seamless human agent live takeover handoff"
            ],
            "tags": [
                  "WhatsApp API",
                  "Slack Bot",
                  "Live Handoff",
                  "Omnichannel"
            ],
            "image": "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Omnichannel"
      }
],
    techStack: [
      {
            "category": "AI Models",
            "tools": [
                  "OpenAI GPT-4o",
                  "Claude 3.5 Sonnet",
                  "Vector Embeddings"
            ]
      },
      {
            "category": "Frontend",
            "tools": [
                  "React",
                  "Framer Motion",
                  "Tailwind CSS"
            ]
      },
      {
            "category": "Backend & Data",
            "tools": [
                  "Node.js",
                  "PostgreSQL",
                  "Redis",
                  "WebSockets"
            ]
      }
],
    process: [
      {
            "step": "01",
            "title": "Knowledge Base Setup",
            "desc": "Import services, FAQs, and company details into the CMS knowledge manager."
      },
      {
            "step": "02",
            "title": "Bot Flow & Guardrails",
            "desc": "Define lead qualification questions, persona guidelines, and fallback rules."
      },
      {
            "step": "03",
            "title": "Integration & Testing",
            "desc": "Test question handling, edge cases, and automated lead forwarding."
      },
      {
            "step": "04",
            "title": "Deployment & Analytics",
            "desc": "Deploy chatbot across website pages and track visitor engagement metrics."
      }
],
    faqs: [
      {
            "id": 1,
            "question": "Can we update the chatbot's knowledge base and responses without coding?",
            "answer": "Yes! The chatbot connects directly to your CMS Knowledge Manager, allowing you to update company FAQs, service details, pricing guidelines, and policies in real time without any code deployments."
      },
      {
            "id": 2,
            "question": "How does the chatbot prevent hallucinated or unauthorized responses?",
            "answer": "We enforce strict system prompt guardrails, semantic similarity retrieval thresholds, and strict fallback routing. If an inquiry falls outside approved documentation, the bot gracefully offers human escalation or lead capture."
      },
      {
            "id": 3,
            "question": "Can the chatbot qualify leads and schedule appointments automatically?",
            "answer": "Yes. The bot can ask custom qualifying questions (e.g. budget, timeline, project scope), collect contact information, validate emails/phone numbers, sync directly into your CRM (HubSpot/Salesforce), and provide Calendly booking links."
      },
      {
            "id": 4,
            "question": "Can the chatbot integrate with our internal systems or WhatsApp?",
            "answer": "Yes. We build omnichannel conversational bots that deploy as embeddable web widgets, Slack/Discord internal bots, or WhatsApp Business API integrations."
      },
      {
            "id": 5,
            "question": "What AI models power the chatbot?",
            "answer": "We utilize GPT-4o, Claude 3.5 Sonnet, and custom fine-tuned embeddings with streaming response support for lightning-fast, natural conversation flow."
      }
],
    related: [
      "ai-agentic-development",
      "web-development",
      "api-system-integration"
],
    featured: false
  },
  'custom-apps-development': {
    slug: "custom-apps-development",
    title: "Custom Apps Development",
    tagline: "Bespoke business software tailored to your specific operational workflows.",
    category: "Engineering",
    icon: Layers,
    color: undefined,
    image: {
      "src": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&auto=format&q=85&fit=crop",
      "alt": "Custom enterprise software dashboard and business workflow application"
},
    heroDescription: "We engineer internal tooling, customer portals, inventory managers, and custom business applications that eliminate manual spreadsheets and legacy bottlenecks.",
    overview: {
      "headline": "Software Built Exactly Around Your Operating Procedures",
      "body": "Off-the-shelf software often forces you to compromise on your business processes. We build custom applications designed precisely around your team workflows, data models, and customer journeys.",
      "highlights": [
            "Role-based dashboards for staff, managers, and clients",
            "Automated document generation and PDF exporting",
            "Real-time data synchronization across teams",
            "Enterprise security, encryption, and audit logs"
      ]
},
    deliverables: [
      {
            "title": "Custom Internal & Client Management Portals",
            "tagline": "Eliminating Spreadsheets & Bottlenecks",
            "description": "Bespoke web applications designed around your exact business operating procedures, data models, and team workflows.",
            "points": [
                  "Role-Based Access Control (RBAC) permissions matrix",
                  "High-density data tables with advanced filtering & sorting",
                  "Custom status workflows and approval hierarchies",
                  "Responsive UI optimized for desktop and mobile tablets"
            ],
            "tags": [
                  "RBAC",
                  "Next.js",
                  "Data Tables",
                  "Custom Workflows"
            ],
            "image": "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Bespoke Software"
      },
      {
            "title": "Automated Document & PDF Reporting Engines",
            "tagline": "High-Speed Report Generation",
            "description": "Generate pixel-perfect compliance certificates, invoices, contracts, and analytical PDF/Excel summaries automatically on demand or on schedule.",
            "points": [
                  "Automated branded PDF certificate & invoice rendering",
                  "Scheduled background Excel and CSV data exports",
                  "Dynamic email delivery triggers to clients and managers",
                  "Cryptographic digital signature verification support"
            ],
            "tags": [
                  "PDF Engine",
                  "Excel Exports",
                  "Scheduled Tasks",
                  "BullMQ"
            ],
            "image": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Auto Reports"
      },
      {
            "title": "Legacy Database & SQL Connectors",
            "tagline": "Connecting Core Business Data",
            "description": "Modernize legacy PostgreSQL, MySQL, MS SQL, Oracle, or MongoDB databases by building secure, modern web frontends on top of them.",
            "points": [
                  "Direct secure connection to existing SQL/Postgres databases",
                  "Prisma ORM data modeling with zero schema lock-in",
                  "Automated database migration and rollback scripts",
                  "Encrypted data at rest and in transit (AES-256 / TLS 1.3)"
            ],
            "tags": [
                  "PostgreSQL",
                  "Prisma",
                  "MS SQL",
                  "AES-256"
            ],
            "image": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "SQL Connected"
      },
      {
            "title": "Event-Driven Background Job Processing",
            "tagline": "Handling Heavy Computations Seamlessly",
            "description": "Asynchronous task workers powered by Redis and BullMQ that handle heavy data imports, webhooks, notifications, and scheduled synchronizations.",
            "points": [
                  "Redis-backed BullMQ job queues with concurrency controls",
                  "Automated task retries with exponential backoff",
                  "Live job progress tracking and failure alert notifications",
                  "High-throughput batch CSV parsing with zero memory leaks"
            ],
            "tags": [
                  "BullMQ",
                  "Redis",
                  "Background Workers",
                  "Batch Jobs"
            ],
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&auto=format&q=80&fit=crop",
            "badge": "Asynchronous Scale"
      }
],
    techStack: [
      {
            "category": "Frontend",
            "tools": [
                  "Next.js",
                  "React",
                  "Tailwind CSS",
                  "TypeScript"
            ]
      },
      {
            "category": "Backend",
            "tools": [
                  "Node.js",
                  "PostgreSQL",
                  "Prisma",
                  "Redis"
            ]
      },
      {
            "category": "Cloud & Queues",
            "tools": [
                  "AWS ECS",
                  "Docker",
                  "BullMQ",
                  "Vercel"
            ]
      }
],
    process: [
      {
            "step": "01",
            "title": "Workflow Audit",
            "desc": "Analyze existing spreadsheets, bottlenecks, and user roles."
      },
      {
            "step": "02",
            "title": "Custom Architecture",
            "desc": "Design database schema, UI mockups, and authorization hierarchy."
      },
      {
            "step": "03",
            "title": "Agile Build",
            "desc": "Iteratively build and review modules with your operational team."
      },
      {
            "step": "04",
            "title": "Deployment & Training",
            "desc": "Deploy to production with team onboarding, documentation, and support."
      }
],
    faqs: [
      {
            "id": 1,
            "question": "Can custom applications connect with our existing legacy database or SQL server?",
            "answer": "Yes. We build modern web and cloud portals that connect securely with existing PostgreSQL, MySQL, MS SQL Server, Oracle, or MongoDB databases without disrupting your active business operations."
      },
      {
            "id": 2,
            "question": "How do you handle user permissions, roles, and access levels?",
            "answer": "We implement granular Role-Based Access Control (RBAC) and attribute-based permissions, allowing you to restrict specific dashboards, reports, and data fields based on user roles (e.g., admin, manager, staff, external client)."
      },
      {
            "id": 3,
            "question": "Can the application generate automated PDF reports, invoices, and data exports?",
            "answer": "Yes. We build high-speed PDF generation engines (for invoices, compliance certificates, and executive summaries) as well as scheduled Excel/CSV exports and email delivery triggers."
      },
      {
            "id": 4,
            "question": "How long does it take to build a custom internal business application?",
            "answer": "Typical custom internal tools or client portals take 6–10 weeks for an initial production release, built iteratively with bi-weekly staging demos."
      },
      {
            "id": 5,
            "question": "What happens after the application is deployed?",
            "answer": "We provide thorough user documentation, admin training sessions, source code handover, and optional ongoing hosting, monitoring, and feature iteration support."
      }
],
    related: [
      "saas-development",
      "web-development",
      "api-system-integration"
],
    featured: false
  }
};

export const SERVICES_LIST = Object.values(SERVICES_DATA);
