import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'cms-db.json');

// Helper to safely read and write JSON with atomic replacement
function getInitialData() {
  return {
    cms_users: [
      {
        id: 'usr-admin-01',
        username: 'admin',
        email: 'admin@ideatex.co.in',
        // default password: "adminPassword123!" (SHA-256 hashed with salt)
        passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // SHA-256 for admin@123
        role: 'ADMIN',
        name: 'Ideate X Administrator',
        avatar: '/logo-ideatex.png',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
      {
        id: 'usr-editor-01',
        username: 'editor',
        email: 'editor@ideatex.co.in',
        passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
        role: 'EDITOR',
        name: 'Content Editor',
        avatar: '/logo-ideatex.png',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
      {
        id: 'usr-author-01',
        username: 'author',
        email: 'author@ideatex.co.in',
        passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
        role: 'AUTHOR',
        name: 'Technical Writer',
        avatar: '/logo-ideatex.png',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      }
    ],
    pages: [
      {
        id: 'page-home',
        title: 'Home',
        slug: 'home',
        template: 'home',
        status: 'published',
        content: 'Homepage of Ideate X - Software, Products & Digital Growth',
        featuredImage: '/sankara.png',
        seoTitle: 'Ideate X — Software, Products & Digital Growth',
        seoDescription: 'We design, build and grow software products, digital platforms and business systems.',
        ogImage: '/logo-ideatex.png',
        canonicalUrl: 'https://ideatex.co.in',
        publishedAt: '2026-01-01T00:00:00.000Z',
        updatedAt: new Date().toISOString(),
        author: 'Ideate X Administrator',
        sections: ['hero', 'tech_cloud', 'capabilities', 'marquee', 'selected_work', 'process', 'why_us', 'faqs', 'cta']
      },
      {
        id: 'page-about',
        title: 'About Us',
        slug: 'about',
        template: 'about',
        status: 'published',
        content: 'About Ideate X - Technology architects and digital engineering team.',
        featuredImage: '/sankara.png',
        seoTitle: 'About Us — Ideate X',
        seoDescription: 'Meet the engineering and strategy minds driving digital growth and modern software development.',
        ogImage: '/logo-ideatex.png',
        canonicalUrl: 'https://ideatex.co.in/about',
        publishedAt: '2026-01-01T00:00:00.000Z',
        updatedAt: new Date().toISOString(),
        author: 'Ideate X Administrator'
      },
      {
        id: 'page-services',
        title: 'Services',
        slug: 'services',
        template: 'services',
        status: 'published',
        content: 'Full spectrum engineering and growth services.',
        featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&q=80&fit=crop',
        seoTitle: 'Our Services — Ideate X',
        seoDescription: 'AI agentic development, SaaS engineering, web development, mobile apps, API integrations and growth marketing.',
        ogImage: '/logo-ideatex.png',
        canonicalUrl: 'https://ideatex.co.in/services',
        publishedAt: '2026-01-01T00:00:00.000Z',
        updatedAt: new Date().toISOString(),
        author: 'Ideate X Administrator'
      },
      {
        id: 'page-portfolio',
        title: 'Selected Work',
        slug: 'portfolio',
        template: 'portfolio',
        status: 'published',
        content: 'Featured projects and software platforms delivered by Ideate X.',
        featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&q=80&fit=crop',
        seoTitle: 'Portfolio & Work — Ideate X',
        seoDescription: 'Explore our portfolio of web platforms, enterprise applications, and SaaS products.',
        ogImage: '/logo-ideatex.png',
        canonicalUrl: 'https://ideatex.co.in/portfolio',
        publishedAt: '2026-01-01T00:00:00.000Z',
        updatedAt: new Date().toISOString(),
        author: 'Ideate X Administrator'
      },
      {
        id: 'page-case-studies',
        title: 'Case Studies',
        slug: 'case-studies',
        template: 'case-studies',
        status: 'published',
        content: 'In-depth engineering case studies and technical architectures.',
        featuredImage: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&auto=format&q=80&fit=crop',
        seoTitle: 'Technical Case Studies — Ideate X',
        seoDescription: 'Detailed deep dives into 3D configurators, enterprise migrations, and real-time platforms.',
        ogImage: '/logo-ideatex.png',
        canonicalUrl: 'https://ideatex.co.in/case-studies',
        publishedAt: '2026-01-01T00:00:00.000Z',
        updatedAt: new Date().toISOString(),
        author: 'Ideate X Administrator'
      },
      {
        id: 'page-blog',
        title: 'Insights',
        slug: 'blog',
        template: 'blog',
        status: 'published',
        content: 'Engineering principles, architecture patterns, and technical perspectives.',
        featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&q=80&fit=crop',
        seoTitle: 'Insights & Engineering Blog — Ideate X',
        seoDescription: 'Architectural perspectives on multi-tenant SaaS, agentic workflows, and modern web engineering.',
        ogImage: '/logo-ideatex.png',
        canonicalUrl: 'https://ideatex.co.in/blog',
        publishedAt: '2026-01-01T00:00:00.000Z',
        updatedAt: new Date().toISOString(),
        author: 'Ideate X Administrator'
      },
      {
        id: 'page-contact',
        title: 'Contact',
        slug: 'contact',
        template: 'contact',
        status: 'published',
        content: 'Get in touch with the Ideate X engineering team.',
        featuredImage: '/logo-ideatex.png',
        seoTitle: 'Contact Us — Start a Project | Ideate X',
        seoDescription: 'Discuss your project requirements, technical architecture, or consulting needs with our engineers.',
        ogImage: '/logo-ideatex.png',
        canonicalUrl: 'https://ideatex.co.in/contact',
        publishedAt: '2026-01-01T00:00:00.000Z',
        updatedAt: new Date().toISOString(),
        author: 'Ideate X Administrator'
      }
    ],
    homepage_sections: [
      {
        id: 'sec-hero',
        sectionKey: 'hero',
        title: 'Hero Section',
        heading: 'We Design, Build & Scale Digital Systems',
        subheading: 'High-performance web applications, scalable platforms, and AI-driven growth systems.',
        ctaPrimaryLabel: 'Start a Project',
        ctaPrimaryUrl: '/contact',
        ctaSecondaryLabel: 'Explore Services',
        ctaSecondaryUrl: '/services',
        enabled: true,
        order: 1
      },
      {
        id: 'sec-tech-cloud',
        sectionKey: 'tech_cloud',
        title: 'Tech Stack Cloud',
        heading: 'Engineering Technologies',
        description: 'Modern, battle-tested technologies powering mission-critical client platforms.',
        enabled: true,
        order: 2
      },
      {
        id: 'sec-capabilities',
        sectionKey: 'capabilities',
        title: 'What We Do (Capabilities)',
        heading: 'What We Do',
        description: 'We design, build, and support software products, web applications, and automated workflows.',
        ctaLabel: 'Explore All Services',
        ctaUrl: '/services',
        enabled: true,
        order: 3
      },
      {
        id: 'sec-marquee',
        sectionKey: 'marquee',
        title: 'Marquee Strip',
        heading: 'Continuous Innovation',
        enabled: true,
        order: 4
      },
      {
        id: 'sec-work',
        sectionKey: 'selected_work',
        title: 'Selected Work',
        heading: 'Selected Work',
        description: "A selection of software products, platforms, and digital experiences we've worked on.",
        ctaLabel: 'View All Work',
        ctaUrl: '/portfolio',
        enabled: true,
        order: 5
      },
      {
        id: 'sec-process',
        sectionKey: 'process',
        title: 'How We Work (Process)',
        heading: 'How We Work',
        description: 'A disciplined engineering methodology from architecture to deployment.',
        enabled: true,
        order: 6
      },
      {
        id: 'sec-why-us',
        sectionKey: 'why_us',
        title: 'Why Ideate X',
        heading: 'Why Ideate X',
        description: 'Direct engineering partnership without agency bloat or unnecessary overhead.',
        enabled: true,
        order: 7
      },
      {
        id: 'sec-faqs',
        sectionKey: 'faqs',
        title: 'Frequently Asked Questions',
        heading: 'Frequently Asked Questions',
        description: 'Answers to common questions regarding timelines, architecture, and collaboration.',
        enabled: true,
        order: 8
      },
      {
        id: 'sec-cta',
        sectionKey: 'cta',
        title: 'Final CTA Banner',
        heading: 'Ready to build something impactful?',
        description: 'Let us architect, build, and launch your next high-performance software system.',
        ctaLabel: 'Start a Project',
        ctaUrl: '/contact',
        enabled: true,
        order: 9
      }
    ],
    services: [
      {
        id: 'srv-01',
        slug: 'ai-agentic-development',
        title: 'AI Agentic Development',
        category: 'AI & Automation',
        tagline: 'Autonomous AI agents engineered for real-world enterprise workflows.',
        heroDescription: 'We design and deploy practical agentic workflows that integrate LLMs, tool orchestration, internal knowledge bases, and human-in-the-loop validation.',
        shortDescription: 'Practical AI agents and automated workflows connecting your tools and data.',
        iconName: 'Bot',
        image: {
          src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&h=1080&auto=format&q=85&fit=crop',
          alt: 'AI analytics interface and neural network model execution'
        },
        overview: {
          headline: 'Autonomous Systems Beyond Simple Chatbots',
          body: 'Generative AI is only useful when it executes actions, accesses company data securely, and integrates directly with existing business tools. We develop autonomous agent architectures with strict guardrails, function calling, vector embeddings, and real-time validation so your agents perform meaningful cognitive work accurately.',
          highlights: [
            'Secure Retrieval-Augmented Generation (RAG) over private company documents',
            'Function calling and API orchestration to execute tasks across software tools',
            'Stateful multi-agent collaboration with supervisor and worker hierarchies',
            'Deterministic validation guardrails preventing hallucinations and unauthorized actions'
          ]
        },
        deliverables: [
          {
            title: 'Custom Autonomous Agents',
            description: 'Domain-specific agents designed to research, draft, execute, and verify tasks.',
            points: ['LangChain & LangGraph frameworks', 'Tool execution & function calling', 'Persistent memory & conversation state', 'Self-correcting feedback loops']
          },
          {
            title: 'Enterprise RAG & Knowledge Systems',
            description: 'Connect internal documents, databases, and wikis for instant, cited intelligence.',
            points: ['Vector databases (Pinecone / pgvector)', 'Semantic chunking & hybrid search', 'Source attribution & citation links', 'Role-based document access controls']
          },
          {
            title: 'Multi-Agent Workflow Pipelines',
            description: 'Orchestrate teams of specialized agents handling complex multi-step operations.',
            points: ['Supervisor-worker agent models', 'Parallel execution pipelines', 'Human-in-the-loop review checkpoints', 'Audit trails & execution logs']
          },
          {
            title: 'LLM Fine-Tuning & Prompt Guardrails',
            description: 'Optimize model outputs for domain accuracy, tone consistency, and compliance.',
            points: ['Structured output enforcement (JSON/Zod)', 'Cost & latency optimization', 'Safety & prompt-injection filters', 'Custom evaluations & benchmarks']
          }
        ],
        techStack: [
          { category: 'AI & Orchestration', tools: ['LangGraph', 'LangChain', 'LlamaIndex', 'OpenAI API', 'Anthropic Claude'] },
          { category: 'Vector & Data', tools: ['pgvector', 'Pinecone', 'Qdrant', 'Unstructured.io'] },
          { category: 'Backend & APIs', tools: ['Python', 'FastAPI', 'Node.js', 'Celery', 'Redis'] },
          { category: 'Monitoring & Eval', tools: ['Langfuse', 'LangSmith', 'OpenTelemetry', 'Weights & Biases'] }
        ],
        process: [
          { step: '01', title: 'Workflow & Data Audit', desc: 'Identify repetitive knowledge tasks, data schemas, tool APIs, and safety requirements.' },
          { step: '02', title: 'Agent Architecture', desc: 'Build RAG pipelines, define function definitions, and establish deterministic guardrails.' },
          { step: '03', title: 'Evaluation & Benchmarking', desc: 'Run automated evaluations on real historical data to tune accuracy and eliminate hallucinations.' },
          { step: '04', title: 'Integration & Live Deployment', desc: 'Deploy agents into Slack, internal dashboards, CRMs, or customer-facing apps.' }
        ],
        faqs: [
          { id: 1, question: 'How do you prevent AI hallucinations in critical operations?', answer: 'We use deterministic schema enforcement (Zod/Pydantic), strict RAG ground-truth matching, confidence score thresholds, and mandatory human approval gates for high-stakes actions.' },
          { id: 2, question: 'Is our company data used to train public LLMs?', answer: 'No. We utilize zero-data-retention enterprise API agreements and self-hosted/private vector embeddings to ensure your proprietary information is never shared or trained upon.' }
        ],
        related: ['saas-development', 'api-system-integration', 'web-development'],
        status: 'published',
        order: 1,
        seoTitle: 'AI Agentic Development Services — Ideate X',
        seoDescription: 'Autonomous AI agents, enterprise RAG systems, and deterministic workflow automations.'
      },
      {
        id: 'srv-02',
        slug: 'saas-development',
        title: 'SaaS Platform Engineering',
        category: 'Engineering',
        tagline: 'Multi-tenant, subscription-ready SaaS products built for scale.',
        heroDescription: 'We build complete SaaS platforms with multi-tenancy, subscription billing, team permissions, analytics dashboards, and scalable cloud backends.',
        shortDescription: 'Multi-tenant SaaS architectures, Stripe subscription billing, and cloud infrastructure.',
        iconName: 'Cloud',
        image: {
          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&auto=format&q=85&fit=crop',
          alt: 'SaaS subscription analytics and enterprise dashboard'
        },
        overview: {
          headline: 'Architected for Thousands of Concurrent Tenants',
          body: 'Building a SaaS platform involves complex foundational decisions: tenant data isolation, recurring subscription billing, seat management, webhook reliability, and automated onboarding. We deliver battle-tested SaaS foundations that empower you to onboard B2B teams, collect recurring revenue, and scale seamlessly without rewriting core architecture.',
          highlights: [
            'Multi-tenant database isolation with PostgreSQL Row-Level Security (RLS)',
            'Turnkey Stripe / Lemon Squeezy billing with metered usage and seat management',
            'Granular Role-Based Access Control (RBAC) and team invitation workflows',
            'Serverless & containerized deployments with automatic horizontal scaling'
          ]
        },
        deliverables: [
          {
            title: 'Multi-Tenant Core Architecture',
            description: 'Database schemas and auth layers isolated per organization.',
            points: ['Tenant schema separation & RLS', 'Custom domain mapping & SSL', 'Organization switcher & team invites', 'Audit logging per tenant']
          },
          {
            title: 'Subscription & Billing Engine',
            description: 'Automated recurring billing, invoicing, and usage metering.',
            points: ['Stripe Customer Portal integration', 'Tiered, flat, and seat-based plans', 'Dunning management & webhook retry queues', 'Self-serve plan upgrades & downgrades']
          }
        ],
        techStack: [
          { category: 'Frontend', tools: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Radix UI'] },
          { category: 'Backend & DB', tools: ['Node.js', 'PostgreSQL', 'Prisma', 'Supabase', 'Redis'] },
          { category: 'Billing & Auth', tools: ['Stripe', 'NextAuth / Clerk', 'JWT', 'Resend'] }
        ],
        process: [
          { step: '01', title: 'Data Model & Tenant Strategy', desc: 'Design schemas, isolation tiers, and permission matrix.' },
          { step: '02', title: 'Core Engine & Billing', desc: 'Implement auth, RBAC, team invitations, and Stripe checkout pipelines.' },
          { step: '03', title: 'Product Features & UI', desc: 'Build reactive user workflows, dashboards, and analytical charts.' },
          { step: '04', title: 'Production Hardening', desc: 'Load testing, RLS penetration checks, and CI/CD pipelines.' }
        ],
        faqs: [
          { id: 1, question: 'Do you build on Next.js or dedicated microservices?', answer: 'We primarily build modular Next.js applications with separated serverless or containerized API layers, providing incredible developer velocity alongside isolated scale.' }
        ],
        related: ['web-development', 'api-system-integration', 'ai-agentic-development'],
        status: 'published',
        order: 2,
        seoTitle: 'SaaS Platform Engineering — Ideate X',
        seoDescription: 'Custom multi-tenant SaaS application development, Stripe billing, and cloud engineering.'
      },
      {
        id: 'srv-03',
        slug: 'web-development',
        title: 'Modern Web Development',
        category: 'Engineering',
        tagline: 'High-performance web applications and digital interfaces built for speed and scale.',
        heroDescription: 'We build responsive, fast-loading web applications using Next.js, React, and modern full-stack architectures designed to engage visitors and convert users.',
        shortDescription: 'High-performance web applications and digital interfaces built for speed and scale.',
        iconName: 'Globe',
        image: {
          src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080&auto=format&q=85&fit=crop',
          alt: 'Modern code editor and responsive web design layout'
        },
        overview: {
          headline: 'Sub-Second Speeds, Fluid Motion, and Resilient Architecture',
          body: 'Your web application is often the primary touchpoint for customers. We construct digital interfaces that combine clean visual aesthetics with high-performance engineering — perfect Core Web Vitals, accessible semantic markups, and instant page transitions.',
          highlights: [
            '100/100 Core Web Vitals & Lighthouse score targets',
            'Server-Side Rendering (SSR) & Static Site Generation (SSG) for peak SEO',
            'Micro-animations with Framer Motion and GSAP',
            'Robust API integration and zero-lag state management'
          ]
        },
        deliverables: [
          {
            title: 'Custom Web Applications',
            description: 'Feature-rich web portals, dashboards, and customer hubs.',
            points: ['Next.js App Router', 'React 19 Server Components', 'Tailwind & CSS Tokens', 'Real-time WebSocket sync']
          },
          {
            title: 'High-Converting Corporate Websites',
            description: 'Brand-forward marketing websites built for maximum conversion.',
            points: ['Headless CMS integration', 'Dynamic metadata & OpenGraph', 'Localized content (i18n)', 'Structured JSON-LD schema']
          }
        ],
        techStack: [
          { category: 'Frameworks', tools: ['Next.js 16', 'React 19', 'TypeScript', 'Node.js'] },
          { category: 'Animation & Styling', tools: ['Framer Motion', 'GSAP', 'Tailwind CSS', 'Lenis Scroll'] }
        ],
        process: [
          { step: '01', title: 'Architecture & UX Wireframes', desc: 'Map site hierarchy, interaction states, and component tokens.' },
          { step: '02', title: 'Frontend Engineering', desc: 'Build pixel-accurate components with fluid kinetic motion.' },
          { step: '03', title: 'Backend & CMS Wiring', desc: 'Hook up dynamic data feeds, forms, and third-party APIs.' },
          { step: '04', title: 'Performance Optimization', desc: 'Audit bundle sizes, font loading, caching headers, and SEO tags.' }
        ],
        faqs: [
          { id: 1, question: 'Will the website be fully manageable without code changes?', answer: 'Yes! All page contents, services, portfolios, and blogs are connected directly to this CMS.' }
        ],
        related: ['saas-development', 'mobile-app-development', 'digital-marketing'],
        status: 'published',
        order: 3,
        seoTitle: 'Modern Web Development Services — Ideate X',
        seoDescription: 'High performance Next.js and React web application engineering with top-tier Core Web Vitals.'
      },
      {
        id: 'srv-04',
        slug: 'mobile-app-development',
        title: 'Mobile App Development',
        category: 'Engineering',
        tagline: 'Cross-platform mobile applications engineered for iOS and Android with offline sync.',
        heroDescription: 'We build native-feel mobile applications using React Native and Flutter with background sync, push notifications, and hardware integrations.',
        shortDescription: 'Cross-platform mobile applications engineered for iOS and Android with offline sync.',
        iconName: 'Smartphone',
        image: {
          src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&h=1080&auto=format&q=85&fit=crop',
          alt: 'Mobile application interface and responsive layout'
        },
        overview: {
          headline: 'Native Performance with Unified Cross-Platform Velocity',
          body: 'We engineer mobile applications that deliver smooth 60fps animations, instant offline-first caching, biometrics authentication, and reliable push notification pipelines across iOS and Android.',
          highlights: [
            'Unified React Native / Expo codebase saving 40%+ in engineering time',
            'Offline-first data replication via WatermelonDB or SQLite',
            'Biometric authentication (FaceID, Fingerprint)',
            'Automated App Store & Google Play submission pipelines'
          ]
        },
        deliverables: [
          {
            title: 'iOS & Android App Engineering',
            description: 'Complete cross-platform mobile apps deployed to both stores.',
            points: ['React Native / Expo', 'Custom native modules (Swift/Kotlin)', 'Hardware camera & GPS access', 'Background push notification handling']
          }
        ],
        techStack: [
          { category: 'Mobile', tools: ['React Native', 'Expo', 'Flutter', 'TypeScript'] },
          { category: 'State & Local DB', tools: ['Zustand', 'SQLite', 'WatermelonDB', 'AsyncStorage'] }
        ],
        process: [
          { step: '01', title: 'Product & Mobile UX Design', desc: 'Design touch targets, mobile gesture flows, and navigation bars.' },
          { step: '02', title: 'App Development', desc: 'Build mobile screens, offline synchronization, and native integrations.' },
          { step: '03', title: 'Device Testing & QA', desc: 'Test across 20+ real Android and iOS screen sizes and OS versions.' },
          { step: '04', title: 'Store Deployment', desc: 'Manage App Store Connect and Google Play Console compliance.' }
        ],
        faqs: [
          { id: 1, question: 'Do you help with App Store submissions?', answer: 'Yes, we manage the complete submission process including screenshots, privacy policies, and compliance reviews.' }
        ],
        related: ['web-development', 'saas-development', 'api-system-integration'],
        status: 'published',
        order: 4,
        seoTitle: 'Mobile App Development — Ideate X',
        seoDescription: 'Cross-platform iOS and Android mobile app development with offline-first synchronization.'
      },
      {
        id: 'srv-05',
        slug: 'api-system-integration',
        title: 'API & System Integration',
        category: 'Engineering',
        tagline: 'Connecting third-party APIs, payment gateways, databases, and internal workflows.',
        heroDescription: 'We build resilient integration pipelines, webhooks, and middleware layers that connect your existing business tools into a cohesive automated ecosystem.',
        shortDescription: 'Connecting third-party APIs, payment gateways, databases, and internal workflows.',
        iconName: 'Server',
        image: {
          src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&auto=format&q=85&fit=crop',
          alt: 'System integration architecture and server microservices'
        },
        overview: {
          headline: 'Eliminate Data Silos with Resilient Middleware',
          body: 'Siloed software slows teams down. We engineer robust REST and GraphQL API gateways, automated webhook listeners with idempotent retry queues, and bi-directional synchronizations across CRMs, ERPs, and internal databases.',
          highlights: [
            'Fault-tolerant webhook processing with Redis and BullMQ queues',
            'Secure OAuth2 and API Key authorization gateways',
            'Data transformation & schema mapping between legacy and modern systems',
            'Real-time observability and anomaly alerting'
          ]
        },
        deliverables: [
          {
            title: 'Custom API Gateway & Middleware',
            description: 'Secure, rate-limited middleware bridging multiple internal tools.',
            points: ['Node.js & FastAPI endpoints', 'Redis rate limiting & caching', 'Idempotent transaction logs', 'Swagger/OpenAPI documentation']
          }
        ],
        techStack: [
          { category: 'Backend', tools: ['Node.js', 'FastAPI', 'Express', 'GraphQL'] },
          { category: 'Queues & Messaging', tools: ['Redis', 'BullMQ', 'RabbitMQ', 'Kafka'] }
        ],
        process: [
          { step: '01', title: 'Data Flow & API Audit', desc: 'Map endpoints, rate limits, and failure modes across all target tools.' },
          { step: '02', title: 'Integration Architecture', desc: 'Build webhook receivers, queue workers, and transformation schemas.' },
          { step: '03', title: 'Edge Case Testing', desc: 'Simulate network drops, rate limits, and duplicate payloads to test recovery.' },
          { step: '04', title: 'Deployment & Monitoring', desc: 'Deploy with automated alerts and telemetry logs.' }
        ],
        faqs: [
          { id: 1, question: 'How do you handle API downtime from third-party services?', answer: 'We implement persistent retry queues with exponential backoff and dead-letter queues so no transaction is ever dropped.' }
        ],
        related: ['ai-agentic-development', 'saas-development', 'web-development'],
        status: 'published',
        order: 5,
        seoTitle: 'API & System Integration Services — Ideate X',
        seoDescription: 'Enterprise API integration, webhook queue pipelines, and automated data synchronization.'
      },
      {
        id: 'srv-06',
        slug: 'digital-marketing',
        title: 'Digital Marketing & Growth',
        category: 'Growth',
        tagline: 'Data-driven demand generation, targeted acquisition funnels, and conversion optimization.',
        heroDescription: 'We pair technical engineering with growth strategies — technical SEO, conversion rate optimization (CRO), analytics architecture, and performance marketing funnels.',
        shortDescription: 'Data-driven demand generation, targeted acquisition funnels, and conversion optimization.',
        iconName: 'Megaphone',
        image: {
          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&auto=format&q=85&fit=crop',
          alt: 'Digital growth analytics dashboard and conversion optimization'
        },
        overview: {
          headline: 'Engineering-Led Growth & Conversion Optimization',
          body: 'Great software needs users. We build high-converting acquisition engines using programmatic SEO, automated lead routing, Google Tag Manager event tracking, and targeted paid funnels.',
          highlights: [
            'Programmatic SEO architectures generating hundreds of targeted landing pages',
            'Full-funnel attribution tracking with Google Analytics 4 and PostHog',
            'A/B testing pipelines improving conversion rates',
            'Server-side conversion API (CAPI) for Facebook and Google Ads'
          ]
        },
        deliverables: [
          {
            title: 'Technical SEO & Programmatic Landing Pages',
            description: 'Scalable organic search footprint capturing high-intent commercial keywords.',
            points: ['Dynamic sitemap generation', 'Schema.org JSON-LD microdata', 'Automated page speed optimizations', 'Core Web Vitals monitoring']
          }
        ],
        techStack: [
          { category: 'Analytics', tools: ['PostHog', 'Google Analytics 4', 'Mixpanel', 'Hotjar'] },
          { category: 'SEO & Tracking', tools: ['GTM', 'Ahrefs', 'Semrush', 'Search Console'] }
        ],
        process: [
          { step: '01', title: 'Audit & Funnel Analysis', desc: 'Identify drop-off points, keyword opportunities, and technical SEO issues.' },
          { step: '02', title: 'Strategy & Tracking Setup', desc: 'Deploy server-side event tracking and conversion goals.' },
          { step: '03', title: 'Execution & Campaigns', desc: 'Publish SEO content, optimize page copy, and launch acquisition channels.' },
          { step: '04', title: 'Optimization & Iteration', desc: 'Analyze data weekly to double down on winning channels.' }
        ],
        faqs: [
          { id: 1, question: 'Do you combine engineering with marketing?', answer: 'Yes, our engineering background allows us to build programmatic landing pages and custom tracking that traditional marketing agencies cannot execute.' }
        ],
        related: ['web-development', 'saas-development'],
        status: 'published',
        order: 6,
        seoTitle: 'Digital Marketing & Technical Growth — Ideate X',
        seoDescription: 'Data-driven growth marketing, programmatic SEO, and full-funnel conversion optimization.'
      },
      {
        id: 'srv-07',
        slug: 'chatbot-development',
        title: 'Custom Chatbot Development',
        category: 'AI & Automation',
        tagline: 'Intelligent, brand-aligned customer support and lead qualification bots.',
        heroDescription: 'We develop smart chatbots trained on your approved knowledge base that answer visitor inquiries, capture qualified leads, and book meetings 24/7.',
        shortDescription: 'AI customer support and lead qualification chatbots connected to CRM and CMS.',
        iconName: 'Bot',
        image: {
          src: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1920&h=1080&auto=format&q=85&fit=crop',
          alt: 'Customer support AI chat interface and conversational lead bot'
        },
        overview: {
          headline: 'Always-On Customer Support & Intelligent Lead Capture',
          body: 'Turn website visitors into scheduled meetings and qualified sales leads. Our chatbots combine strict knowledge base boundaries with contextual memory, automated CRM syncing, and escalation triggers.',
          highlights: [
            'Strict knowledge base matching preventing off-topic or incorrect responses',
            'Automated email notifications and CRM lead creation on enquiry submission',
            'Custom UI widget matching your brand typography and colors',
            'Full conversation history and analytics stored inside the CMS'
          ]
        },
        deliverables: [
          {
            title: 'Website Chatbot Widget',
            description: 'Embeddable, responsive conversational interface.',
            points: ['Live streaming responses', 'Lead capture modal', 'Preset conversation starters', 'Mobile-responsive layout']
          }
        ],
        techStack: [
          { category: 'AI Models', tools: ['OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'Embeddings'] },
          { category: 'Frontend', tools: ['React', 'Framer Motion', 'Lucide Icons'] }
        ],
        process: [
          { step: '01', title: 'Knowledge Base Setup', desc: 'Import services, FAQs, and company details into the CMS knowledge manager.' },
          { step: '02', title: 'Bot Flow & Guardrails', desc: 'Define lead qualification questions and fallback rules.' },
          { step: '03', title: 'Integration & Testing', desc: 'Test question handling and lead forwarding.' },
          { step: '04', title: 'Launch', desc: 'Deploy chatbot across website pages.' }
        ],
        faqs: [
          { id: 1, question: 'Can we change the bot answers anytime?', answer: 'Yes! The bot reads directly from the CMS Chatbot Knowledge Base in real time.' }
        ],
        related: ['ai-agentic-development', 'web-development'],
        status: 'published',
        order: 7,
        seoTitle: 'Custom Chatbot Development — Ideate X',
        seoDescription: 'Intelligent AI chatbot development for customer support, lead capture, and CRM integration.'
      },
      {
        id: 'srv-08',
        slug: 'custom-apps-development',
        title: 'Custom Apps Development',
        category: 'Engineering',
        tagline: 'Bespoke business software tailored to your specific operational workflows.',
        heroDescription: 'We engineer internal tooling, customer portals, inventory managers, and custom business applications that eliminate manual spreadsheets and legacy bottlenecks.',
        shortDescription: 'Bespoke business software and internal tooling tailored to unique operations.',
        iconName: 'Terminal',
        image: {
          src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&auto=format&q=85&fit=crop',
          alt: 'Custom enterprise software dashboard and business workflow application'
        },
        overview: {
          headline: 'Software Built Exactly Around Your Operating Procedures',
          body: 'Off-the-shelf software often forces you to compromise on your business processes. We build custom applications designed precisely around your team workflows, data models, and customer journeys.',
          highlights: [
            'Role-based dashboards for staff, managers, and clients',
            'Automated document generation and PDF exporting',
            'Real-time data synchronization across teams',
            'Enterprise security, encryption, and audit logs'
          ]
        },
        deliverables: [
          {
            title: 'Custom Internal & Client Portals',
            description: 'Secure, high-productivity web applications.',
            points: ['Custom permissions matrix', 'Exportable data tables', 'Automated email alerts', 'Mobile-ready UI']
          }
        ],
        techStack: [
          { category: 'Frontend', tools: ['Next.js', 'React', 'Tailwind'] },
          { category: 'Backend', tools: ['Node.js', 'PostgreSQL', 'Prisma', 'Redis'] }
        ],
        process: [
          { step: '01', title: 'Workflow Audit', desc: 'Analyze existing spreadsheets, pain points, and user roles.' },
          { step: '02', title: 'Custom Architecture', desc: 'Design database schema, UI mockups, and authorization hierarchy.' },
          { step: '03', title: 'Agile Build', desc: 'Iteratively build and review modules with your operational team.' },
          { step: '04', title: 'Deployment & Training', desc: 'Deploy to production with team onboarding and documentation.' }
        ],
        faqs: [
          { id: 1, question: 'Can we integrate with our existing database?', answer: 'Yes, we can build custom frontend portals on top of existing SQL, Postgres, or legacy databases.' }
        ],
        related: ['saas-development', 'web-development', 'api-system-integration'],
        status: 'published',
        order: 8,
        seoTitle: 'Custom Apps Development — Ideate X',
        seoDescription: 'Bespoke enterprise software, internal tools, and client portal development.'
      }
    ],
    work_items: [
      {
        id: 'work-01',
        title: 'Tifbox',
        slug: 'tifbox',
        category: 'WEB APPLICATION',
        tags: ['React Js', 'Vite', 'PostgreSQL', 'Supabase'],
        technologies: ['React', 'Vite', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
        client: 'Tifbox Inc.',
        year: '2024',
        duration: '8 Weeks',
        role: 'Full-Stack Engineering',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&q=80&fit=crop',
        coverBanner: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&auto=format&q=80&fit=crop',
        liveUrl: 'https://tifboxmeals.com',
        shortDescription: 'Modern web application for data aggregation and collaborative project workspace.',
        fullDescription: 'High performance web application built with React and Vite backed by Supabase PostgreSQL for instant data queries and state sync.',
        featured: true,
        order: 1,
        status: 'published',
        seoTitle: 'Tifbox Project — Ideate X Portfolio',
        seoDescription: 'High-performance web platform engineered with React, Vite, and Supabase.'
      },
      {
        id: 'work-02',
        title: 'CSAVA',
        slug: 'csava',
        category: 'ENTERPRISE PLATFORM',
        tags: ['Next Js', 'PostgreSQL', 'Supabase'],
        technologies: ['Next.js', 'PostgreSQL', 'Supabase', 'Node.js'],
        client: 'CSAVA Global',
        year: '2024',
        duration: '12 Weeks',
        role: 'Enterprise Platform Architecture',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&q=80&fit=crop',
        coverBanner: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1920&h=1080&auto=format&q=80&fit=crop',
        liveUrl: 'https://csava.org',
        shortDescription: 'Enterprise workflow management and compliance reporting platform.',
        fullDescription: 'Built with Next.js App Router and PostgreSQL, supporting high-throughput compliance audits and team permissions.',
        featured: true,
        order: 2,
        status: 'published',
        seoTitle: 'CSAVA Platform — Ideate X Portfolio',
        seoDescription: 'Enterprise software platform built on Next.js and PostgreSQL.'
      },
      {
        id: 'work-03',
        title: 'Keyo',
        slug: 'keyo',
        category: 'SAAS & PWA',
        tags: ['Next Js', 'Prisma', 'PostgreSQL', 'Firebase', 'WebAPK', 'PWA'],
        technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Firebase', 'PWA'],
        client: 'Keyo Tech',
        year: '2024',
        duration: '14 Weeks',
        role: 'SaaS & PWA Engineering',
        image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&auto=format&q=80&fit=crop',
        coverBanner: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1920&h=1080&auto=format&q=80&fit=crop',
        liveUrl: 'https://keyo.co.in/en',
        shortDescription: 'Progressive web application and SaaS platform with offline synchronization.',
        fullDescription: 'Multi-tenant SaaS with offline-first PWA capabilities, Firebase push notifications, and Prisma ORM data modeling.',
        featured: true,
        order: 3,
        status: 'published',
        seoTitle: 'Keyo SaaS & PWA — Ideate X Portfolio',
        seoDescription: 'Progressive Web Application and multi-tenant SaaS engineering.'
      },
      {
        id: 'work-04',
        title: '369',
        slug: '369',
        category: 'WEB PLATFORM',
        tags: ['Next JS', 'Prisma', 'PostgreSQL'],
        technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
        client: '369 Media',
        year: '2023',
        duration: '6 Weeks',
        role: 'Full-Stack Development',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&q=80&fit=crop',
        coverBanner: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&h=1080&auto=format&q=80&fit=crop',
        liveUrl: 'https://369.example.com',
        shortDescription: 'High-speed digital media platform with dynamic publishing pipelines.',
        fullDescription: 'Modern media platform with sub-second page loads, automated SEO tagging, and PostgreSQL backend.',
        featured: true,
        order: 4,
        status: 'published',
        seoTitle: '369 Web Platform — Ideate X Portfolio',
        seoDescription: 'High performance digital media platform powered by Next.js.'
      },
      {
        id: 'work-srinivas-packaging',
        title: 'Srinivas Packaging',
        slug: 'srinivas-packaging',
        category: 'WEB APPLICATIONS',
        tags: ['Next.js', 'B2B Portal', 'Product Catalogue', 'Quote Engine'],
        technologies: ['Next.js', 'React', 'Tailwind CSS', 'PostgreSQL', 'Node.js'],
        client: 'Srinivas Packaging Industries',
        year: '2024',
        duration: '8 Weeks',
        role: 'B2B Platform Architecture & Web Engineering',
        image: '/clients/SrinivasPackaging.png',
        coverBanner: '/clients/SrinivasPackaging.png',
        liveUrl: 'https://srinivaspackaging.in',
        shortDescription: 'Industrial corrugated carton box manufacturing catalogue and B2B RFQ quotation platform.',
        fullDescription: 'Custom digital manufacturing platform designed for enterprise packaging procurement with interactive dimension RFQ estimation and quality testing certification showcases.',
        featured: true,
        order: 5,
        status: 'published',
        seoTitle: 'Srinivas Packaging — Ideate X Portfolio',
        seoDescription: 'B2B Corrugated carton manufacturing platform and quote estimation engine.'
      }
    ],
    case_studies: [
      {
        id: 'cs-01',
        slug: 'tifbox',
        aliases: ['tifbox-food-delivery', 'tifbox-mobile-app', 'tifboxmeals'],
        number: '01',
        title: 'Tifbox Food Delivery Mobile App',
        subtitle: 'A location-aware food delivery and subscription mobile app connecting customers with verified cloud kitchens, tiffin vendors, and automated dispatch.',
        category: 'FoodTech · Mobile App',
        client: 'Tifbox Meals',
        year: '2024',
        duration: '10 Weeks',
        role: 'Mobile App Architecture, UX Engineering & Full-Stack',
        image: '/case-studies/Tifbox - CS.png',
        coverBanner: '/case-studies/Tifbox - CS.png',
        summary: 'Tifbox Meals is a mobile-first food delivery and recurring tiffin platform built to connect users with hyper-local cloud kitchens and home-style meal providers.\n\nThe mobile application allows customers to discover verified kitchens within a customized distance radius (1km - 4km), filter by dietary choices (Pure Veg, Vegan, Home-style North Indian), customize lunch and dinner subscriptions, and order directly via in-app checkout or instant WhatsApp and phone channels.\n\nBehind the intuitive mobile interface, Ideate X engineered an end-to-end operational engine uniting food vendors, daily preparation manifests, and geo-fenced last-mile delivery.',
        challenge: 'Home-style meal deliveries and daily tiffins require distinct capabilities compared to generic on-demand fast food.\n\nCustomers need transparent pricing, dietary verifications, flexible lunch/dinner pause-and-resume schedules, and immediate contact with local chefs. Kitchens need organized daily batching queues, while delivery partners require geo-optimized routing without operational bottlenecks.',
        challengePoints: [
          'Empowering users to discover verified local cloud kitchens within adjustable distance radiuses (1km - 4km).',
          'Providing granular meal plan customization, dietary filters (Pure Veg, Vegan), and flexible pause/resume scheduling.',
          'Enabling direct omni-channel ordering through in-app checkout, instant WhatsApp messaging, and direct phone calls.',
          'Synchronizing recurring meal subscriptions with real-time kitchen preparation manifests and driver dispatch.'
        ],
        approach: 'We architected an offline-resilient, mobile-first React Native / PWA application backed by a high-concurrency cloud backend, geo-radius discovery algorithms, automated subscription billing, and multi-portal operational synchronization.',
        architecturePoints: [
          'Location-aware kitchen discovery engine calculating live distance radiuses and delivery feasibility in milliseconds.',
          'Dynamic subscription management engine supporting daily cutoff rules, flexible pause/resume schedules, and instant meal swaps.',
          'Omni-channel order routing bridging digital in-app cart transactions with automated WhatsApp and phone escalation triggers.',
          'Real-time kitchen dashboard and automated driver dispatch optimizing batch delivery manifests.'
        ],
        techStack: [
          { name: 'React Native / PWA', category: 'Mobile App' },
          { name: 'React / Next.js', category: 'Web Platform' },
          { name: 'Node.js', category: 'API Services' },
          { name: 'PostgreSQL', category: 'Database' },
          { name: 'Supabase', category: 'Real-Time & Auth' },
          { name: 'WhatsApp API', category: 'Direct Messaging' }
        ],
        keyFeatures: [
          { title: 'Home-Style Kitchen Discovery', description: 'Geo-fenced discovery engine allowing users to explore verified local tiffin centers and cloud kitchens with distance radius filters from 1km to 4km.' },
          { title: 'Dietary & Menu Filtering', description: 'Granular filters for Pure Veg, Vegan, North Indian, and Home-Style cuisines with transparent operating hours, meal tray breakdowns, and pricing.' },
          { title: 'Omni-Channel Ordering & WhatsApp Rails', description: 'Flexible ordering workflows enabling users to place in-app orders, make direct inquiries via WhatsApp, or call kitchen operators directly.' },
          { title: 'Daily Lunch & Dinner Subscriptions', description: 'Recurring meal scheduling with one-tap pause, resume, and meal-type customization matching user schedules.' },
          { title: 'Vendor Manifest & Dispatch Integration', description: 'Automated preparation queues for cloud kitchens and geo-optimized delivery batching for last-mile delivery partners.' }
        ],
        metrics: [
          { value: '1km - 4km', label: 'Radius Engine', desc: 'Hyper-local kitchen matching and distance-based discovery' },
          { value: '100%', label: 'Omni-Channel', desc: 'Seamless in-app, WhatsApp, and phone order placement' },
          { value: 'Real-Time', label: 'Live Manifests', desc: 'Instant kitchen preparation queues from subscription states' },
          { value: '0 Friction', label: 'Flexible Scheduling', desc: 'Seamless pause, resume, and meal plan customization' }
        ],
        outcome: 'The Tifbox Mobile App provides a seamless, transparent bridge between local home chefs, verified cloud kitchens, and hungry customers, transforming fragmented tiffin operations into a scalable digital ecosystem.',
        tags: [
          'Mobile app development',
          'Food delivery app',
          'Geo-radius discovery',
          'Cloud kitchen ecosystem',
          'WhatsApp order integration',
          'Subscription meal engine'
        ],
        ctaHeading: 'Building a food delivery or subscription mobile app?',
        ctaText: "Let's engineer a high-performance mobile platform tailored to your workflows.",
        status: 'published',
        seoTitle: 'Tifbox Food Delivery Mobile App Case Study — Ideate X',
        seoDescription: 'Case study: Location-aware mobile food delivery and recurring tiffin subscription platform.'
      },
      {
        id: 'cs-02',
        slug: 'csava',
        number: '02',
        title: 'CSAVA Association Management Platform',
        subtitle: 'Moving membership, events and financial operations from paperwork to one connected platform.',
        category: 'Association Management',
        client: 'CSAVA',
        year: '2024',
        duration: '12 Weeks',
        role: 'Enterprise Platform Architecture & Full-Stack',
        image: '/case-studies/CSAVA - CS.png',
        coverBanner: '/case-studies/CSAVA - CS.png',
        summary: 'The Chennai Small Animal Veterinary Association (CSAVA) needed to modernize processes that had traditionally depended on offline registers, manual verification and disconnected financial records.\n\nIdeate X developed a centralized digital platform that brought membership management, event registration, accreditation, billing and executive administration into a unified system.',
        challenge: 'The existing operational model relied heavily on:\n\n• Paper-based membership processes\n• Manual verification\n• Spreadsheet-based accreditation\n• Manual payment checks\n• Physical event queues\n• Disconnected financial records\n\nThe goal was not simply to digitize individual tasks. The platform needed to connect the complete membership and event lifecycle.',
        challengePoints: [
          'Paper-based membership applications and manual physical verification causing significant delays.',
          'Spreadsheet-based accreditation prone to human errors and record discrepancies.',
          'Manual payment validation resulting in delayed receipts and difficult bank reconciliations.',
          'Long physical delegate queues at annual veterinary congresses due to manual badge verification.',
          'Disconnected financial records preventing association executives from obtaining unified operational insights.'
        ],
        approach: 'We designed a centralized digital operating model uniting member onboarding, credential issuance, tiered congress registration, and GST-compliant automated invoicing with executive governance dashboards.',
        architecturePoints: [
          'Centralized member lifecycle engine automating qualification verification and digital credential issuance.',
          'Congress & event management module with tier-based pricing, custom coupons, and digital QR verification.',
          'Automated billing system supporting GST-compliant invoices, renewal reminders, and payment reconciliation.',
          'Executive administration workflows providing association leaders with complete operational and financial visibility.'
        ],
        techStack: [
          { name: 'Next.js', category: 'Application Shell' },
          { name: 'PostgreSQL', category: 'Database' },
          { name: 'Supabase', category: 'Auth & Real-Time' },
          { name: 'Node.js', category: 'API Services' },
          { name: 'GST Engine', category: 'Financial Compliance' },
          { name: 'QR Accreditation', category: 'Event Security' }
        ],
        keyFeatures: [
          { title: 'Digital Membership Management', description: 'Member onboarding, qualification verification, tier upgrades, and digital credential issuance brought into a centralized workflow.' },
          { title: 'Event Management', description: 'The platform handles congress registration, customized offers, and coupon-based event management with digital delegate verification.' },
          { title: 'Automated Billing', description: 'GST-compliant invoice generation, recurring renewals, and payment reconciliation seamlessly integrated into the platform.' },
          { title: 'Executive Administration', description: 'Dedicated administration workflows provide association leaders with centralized visibility over operations, members, and finances.' }
        ],
        metrics: [
          { value: '85%', label: 'Faster Verification', desc: 'Membership verification became 85% faster' },
          { value: '100%', label: 'Audit Compliance', desc: 'Conference and CPD billing achieved 100% audit compliance' },
          { value: '0 Queues', label: 'On-Site Check-In', desc: 'Digital delegate verification removed on-site physical queues' },
          { value: 'Real-Time', label: 'Financial Governance', desc: 'Financial governance moved to a unified real-time dashboard' }
        ],
        outcome: 'CSAVA moved from fragmented administrative processes toward a centralized digital operating model covering membership, events and financial governance.',
        tags: [
          'Membership management',
          'Event management',
          'Digital accreditation',
          'GST billing',
          'Payment reconciliation',
          'Executive dashboards',
          'Automated workflows'
        ],
        ctaHeading: 'Still running important operations on spreadsheets and paperwork?',
        ctaText: "Let's build a better system.",
        status: 'published',
        seoTitle: 'CSAVA Association Management Case Study — Ideate X',
        seoDescription: 'Case study: Modernizing veterinary association operations, membership, events, and GST billing.'
      },
      {
        id: 'cs-03',
        slug: 'real-estate',
        aliases: ['keyo', 'real-estate-leasing'],
        number: '03',
        title: 'Real Estate Leasing & Tenancy Engine',
        subtitle: 'A multi-sided property platform connecting owners, brokers, tenants and field teams.',
        category: 'PropTech',
        client: 'Keyo / PropTech',
        year: '2024',
        duration: '14 Weeks',
        role: 'PropTech Architecture, PWA & Full-Stack',
        image: '/case-studies/Keyo - CS.png',
        coverBanner: '/case-studies/Keyo - CS.png',
        summary: 'Real estate transactions involve more than property listings. They require coordination between property owners, brokers, tenants, inspection teams, agreements, payments and disputes.\n\nIdeate X built a multi-sided PropTech platform designed to connect these roles through a structured transaction workflow.',
        challenge: 'The platform needed to support several independent roles while maintaining control over sensitive property and transaction workflows.\n\nThe system had to coordinate:\n• Property owners\n• Certified brokers\n• Tenants\n• Inspection staff\n• Property verification\n• Digital agreements\n• Advance payments\n• Rent payments\n• Dispute resolution',
        challengePoints: [
          'Coordinating multi-sided interactions across property owners, certified brokers, tenants, and inspection teams.',
          'Eliminating fraudulent listings with verifiable on-ground field inspection and geo-tagged photo audits.',
          'Accelerating tenancy agreements with secure, legally compliant in-app digital signature workflows.',
          'Managing complex token reservations, recurring rental collections, security deposits, and automated payout splits.'
        ],
        approach: 'We architected a unified PropTech transaction engine with dedicated role-based portals, on-ground inspection mobile workflows, in-platform digital lease execution, and automated escrow rails for advance tokens and rent.',
        architecturePoints: [
          'Multi-role architecture with strict data isolation for owners, brokers, tenants, and field agents.',
          'Mobile-optimized inspection tool with offline capability, geo-tagged photography, and condition checklists.',
          'Secure digital agreement signing engine with cryptographic audit trails and instant PDF lease issuance.',
          'Escrow and payment engine handling advance token reservations, recurring rent, deposits, and split disbursements.'
        ],
        techStack: [
          { name: 'Next.js', category: 'Web Platform' },
          { name: 'PWA / WebAPK', category: 'Mobile Inspections' },
          { name: 'Prisma ORM', category: 'Data Layer' },
          { name: 'PostgreSQL', category: 'Database' },
          { name: 'Firebase', category: 'Realtime & Notifications' },
          { name: 'Escrow Engine', category: 'Payments' }
        ],
        keyFeatures: [
          { title: 'Property Owner Portal', description: 'Owners can manage direct listings, track tenant inquiries, review inspection reports, and monitor property activity.' },
          { title: 'Broker Platform', description: 'Certified brokers operate through a dedicated membership-based workflow with listing co-brokering and commission tracking.' },
          { title: 'Tenant Experience', description: 'Tenants can discover verified properties, schedule visits, sign digital leases, and manage advance and rental payments.' },
          { title: 'Field Inspection', description: 'On-ground teams use dedicated workflows for property inspections, geo-tagged photographs, condition checks and report submissions.' },
          { title: 'Digital Agreements', description: 'Tenancy agreements can be securely signed within the platform, reducing the time required to complete transactions.' },
          { title: 'Token & Rent Escrow', description: 'The platform supports advance token reservations, recurring rent payments, security deposits and automated payout splits.' }
        ],
        metrics: [
          { value: '6 Roles', label: 'Connected Ecosystem', desc: 'Owners, brokers, tenants, field teams, and admins on one platform' },
          { value: '100%', label: 'Digital Agreements', desc: 'In-platform binding lease execution with legal audit trails' },
          { value: 'Geo-Tagged', label: 'Field Audits', desc: 'Tamper-proof on-ground inspection reports with GPS photos' },
          { value: 'Automated', label: 'Escrow Splits', desc: 'Token reservations, deposit protection, and rent disbursements' }
        ],
        outcome: 'The platform connects property discovery, verification, agreements and payments into a single transaction ecosystem.',
        tags: [
          'Multi-role architecture',
          'Property listings',
          'Broker management',
          'Tenant workflows',
          'Field inspections',
          'Digital agreements',
          'Token reservations',
          'Rent payments',
          'Escrow workflows',
          'Automated payouts'
        ],
        ctaHeading: 'Have a complex property workflow?',
        ctaText: "Let's turn it into a connected platform.",
        status: 'published',
        seoTitle: 'Real Estate Leasing Engine Case Study — Ideate X',
        seoDescription: 'Case study: PropTech multi-role leasing, digital agreements, and escrow management engine.'
      },
      {
        id: 'cs-04',
        slug: 'fintech',
        aliases: ['369', 'fintech-investment-platform'],
        number: '04',
        title: 'FinTech Investment Platform',
        subtitle: 'A financial platform engineered around complex investment structures, commission logic and transaction ledgers.',
        category: 'FinTech',
        client: '369 FinTech',
        year: '2024',
        duration: '12 Weeks',
        role: 'Financial Systems Architecture & Full-Stack',
        image: '/case-studies/369 - CS.png',
        coverBanner: '/case-studies/369 - CS.png',
        summary: 'This platform was designed for a high-volume investment environment where portfolio management, multi-level commission structures, automated payouts and financial records had to operate together.\n\nThe system was built around high-concurrency calculations, audit-oriented transaction records and configurable business rules.',
        challenge: 'The platform needed to handle complex financial relationships and calculations without losing visibility across transactions.\n\nKey requirements included:\n• Multi-level investment structures\n• Dynamic commission rules\n• Tier progression\n• Automated disbursements\n• Financial statements\n• Transaction auditing\n• Investor-specific business rules',
        challengePoints: [
          'Multi-level sponsor hierarchies requiring real-time volume calculation and dynamic tier progression.',
          'Configurable referral percentages and automated dividend calculations across deep network trees.',
          'Scheduled disbursements and withholding-tax deductions requiring zero-downtime execution accuracy.',
          'Maintaining an immutable, double-entry financial ledger and audit-oriented earnings statements.',
          'Structuring investor experiences around unique client business rules rather than generic templates.'
        ],
        approach: 'We engineered a high-concurrency financial calculation and ledger engine with an interactive hierarchical tree visualizer, dynamic multi-level commission rules, automated tax-compliant payout queues, and investor reporting.',
        architecturePoints: [
          'High-speed hierarchical tree engine traversing multi-tier sponsor networks and calculating dynamic business volume.',
          'Configurable commission engine processing multi-level referral percentages and automated dividend distributions.',
          'Immutable double-entry transaction ledger generating real-time financial statements and tax deductions.',
          'Automated payout scheduler with batch transaction validation and banking rails integration.'
        ],
        techStack: [
          { name: 'Next.js', category: 'Application Shell' },
          { name: 'Prisma ORM', category: 'Data Layer' },
          { name: 'PostgreSQL', category: 'Ledger Database' },
          { name: 'Redis', category: 'High-Speed Cache' },
          { name: 'Node.js', category: 'Calculation Services' },
          { name: 'Tailwind CSS', category: 'Dashboard UI' }
        ],
        keyFeatures: [
          { title: 'Hierarchical Tree Engine', description: 'The platform visualizes multi-level sponsor networks and tracks investment volume across the hierarchy. The system also supports real-time tier progression and business-volume-based ranking.' },
          { title: 'Commission Engine', description: 'Configurable referral percentages and automated dividend calculations allow commission rules to be applied across multiple levels.' },
          { title: 'Automated Payouts', description: 'Scheduled disbursements and withholding-tax calculations support automated financial operations.' },
          { title: 'Financial Ledger', description: 'The platform maintains an audit-oriented transaction ledger with financial statements and member earnings information.' },
          { title: 'Custom Investor Module', description: "The investor experience was structured around the client's specific business rules rather than forcing the operation into a generic financial workflow." }
        ],
        metrics: [
          { value: 'Multi-Tier', label: 'Tree Visualizer', desc: 'Live sponsor network tree and business volume tracking' },
          { value: '100%', label: 'Audit Ledger', desc: 'Double-entry transaction records and earnings statements' },
          { value: 'Automated', label: 'Payout Engine', desc: 'Scheduled disbursements with dynamic tax withholding calculations' },
          { value: 'Custom', label: 'Business Logic', desc: 'Configurable referral percentages and tier ranking engine' }
        ],
        outcome: 'The resulting platform brings investment relationships, commission calculations, financial reporting and payout workflows into one system.',
        tags: [
          'Investment management',
          'Hierarchical network engine',
          'Multi-level commission logic',
          'Automated payouts',
          'Financial ledger',
          'Earnings statements',
          'Financial reporting',
          'Custom business rules'
        ],
        ctaHeading: "Complex financial logic shouldn't live in spreadsheets.",
        ctaText: "Let's engineer the system around your business rules.",
        status: 'published',
        seoTitle: 'FinTech Investment Platform Case Study — Ideate X',
        seoDescription: 'Case study: Financial platform with hierarchical network engine and automated commission ledgers.'
      },
      {
        id: 'cs-05',
        slug: 'sami-v-landmarks',
        aliases: ['sami-v-landmarks-hotel-booking', 'hotel-booking', 'samivlandmarks'],
        number: '05',
        title: 'Sami V Landmarks — Hotel Booking Management System',
        subtitle: 'A streamlined hotel booking platform built to simplify reservations and day-to-day property operations.',
        category: 'Hospitality',
        client: 'Sami V Landmarks',
        year: '2024',
        duration: '10 Weeks',
        role: 'Hotel Booking Platform Architecture & Full-Stack',
        image: '/case-studies/Sami V Landmarks - CS.png',
        coverBanner: '/case-studies/Sami V Landmarks - CS.png',
        summary: 'Sami V Landmarks needed a dedicated digital system to manage hotel bookings and provide a smoother reservation experience for customers. Ideate X developed a hotel booking management system that brings the booking process into one structured platform.',
        challenge: 'Managing hotel reservations efficiently requires clear visibility into room availability, bookings and customer information. The system needed to simplify the reservation process while giving the hotel team a centralized way to manage bookings.',
        challengePoints: [
          'Lack of centralized real-time visibility into room inventory and booking status across property units.',
          'Need for a simplified, transparent online reservation experience for guests.',
          'Operational friction in managing reservation modifications, check-ins, and room scheduling.',
          'Difficulty in maintaining organized customer profiles and historical reservation records.'
        ],
        approach: 'We engineered a centralized hotel booking and reservation management platform uniting customer-facing booking workflows with front-desk room availability controls and centralized guest record management.',
        architecturePoints: [
          'Centralized booking engine managing reservation workflows, booking statuses, and date availability.',
          'Intuitive customer booking experience allowing seamless room discovery and instant reservation requests.',
          'Room inventory and availability management dashboard with real-time status visibility.',
          'Unified customer management database organizing ongoing, upcoming, and past guest records.'
        ],
        techStack: [
          { name: 'Next.js', category: 'Application Shell' },
          { name: 'React', category: 'Interactive UI' },
          { name: 'Node.js', category: 'API Services' },
          { name: 'PostgreSQL', category: 'Database' },
          { name: 'Tailwind CSS', category: 'Styling' },
          { name: 'Booking Engine', category: 'Reservation Logic' }
        ],
        keyFeatures: [
          { title: 'Hotel Booking Management System', description: 'A centralized platform designed to manage the complete booking workflow.' },
          { title: 'Online Booking Experience', description: 'Customers can browse available rooms and make reservations through a simple digital booking experience.' },
          { title: 'Room & Availability Management', description: 'The system provides the hotel team with better visibility of room availability and booking status.' },
          { title: 'Booking Management', description: 'Hotel staff can manage reservations and maintain booking information from a centralized interface.' },
          { title: 'Customer Management', description: 'Customer and reservation details are organized within the platform, making it easier to manage ongoing and upcoming bookings.' }
        ],
        metrics: [
          { value: '100%', label: 'Centralized Platform', desc: 'Complete booking workflow managed in one structured system' },
          { value: 'Real-Time', label: 'Availability View', desc: 'Clear visibility into room availability and booking status' },
          { value: '0 Friction', label: 'Online Reservations', desc: 'Simple digital booking experience for hotel guests' },
          { value: 'Organized', label: 'Customer Records', desc: 'Structured guest details for ongoing and upcoming stays' }
        ],
        outcome: 'The system gives Sami V Landmarks a structured digital foundation for managing hotel reservations while making the booking experience simpler for customers.',
        tags: [
          'Hotel booking management',
          'Online reservations',
          'Room availability management',
          'Centralized booking records',
          'Customer information management',
          'Streamlined reservation workflow'
        ],
        ctaHeading: 'Looking to build a custom booking or reservation platform?',
        ctaText: "Let's turn your property workflows into a seamless digital system.",
        status: 'published',
        seoTitle: 'Sami V Landmarks — Hotel Booking Management System Case Study — Ideate X',
        seoDescription: 'Case study: Streamlined hotel booking and property operations management platform for Sami V Landmarks.'
      },
      {
        id: 'cs-06',
        slug: 'srinivas-packaging',
        aliases: ['srinivas-packaging-industries', 'carton-box-manufacturers', 'srinivaspackaging'],
        number: '06',
        title: 'Srinivas Packaging — B2B Manufacturing & Custom Packaging Platform',
        subtitle: 'A modern digital platform and custom quotation engine built for corrugated carton box manufacturing and industrial supply.',
        category: 'Manufacturing',
        client: 'Srinivas Packaging Industries',
        year: '2024',
        duration: '8 Weeks',
        role: 'B2B Platform Architecture, UX Engineering & Catalogue System',
        image: '/case-studies/Srinivas Packaging - CS.png',
        coverBanner: '/case-studies/Srinivas Packaging - CS.png',
        summary: 'Srinivas Packaging Industries is a prominent manufacturer and supplier of corrugated carton boxes, heavy-duty industrial shipping containers, and premium multi-color duplex cartons.\n\nTo modernize their client acquisition and streamline B2B inquiries from manufacturing plants, e-commerce businesses, and FMCG distributors, Ideate X engineered a high-performance digital platform featuring an interactive product catalogue and custom quotation workflow.',
        challenge: 'Industrial packaging procurement involves technical specifications — box dimensions, ply layers (3-ply, 5-ply, 7-ply), bursting strength, and custom offset printing requirements.\n\nTraditional offline inquiries and phone-based orders caused delays in price estimations and limited outreach to enterprise procurement managers seeking certified packaging manufacturers.',
        challengePoints: [
          'High-friction manual enquiry processes for custom box dimensions, ply thickness, and GSM requirements.',
          'Lack of a structured digital product catalogue showcasing offset-printed multi-color duplex cartons and die-cut boxes.',
          'Need for a high-converting B2B Request-for-Quote (RFQ) workflow to capture exact technical specifications.',
          'Highlighting testing laboratory infrastructure, quality certifications, and sustainable manufacturing practices online.'
        ],
        approach: 'We architected a responsive B2B manufacturing web platform with intuitive product categorization, comprehensive technical specification sheets, an interactive RFQ quotation engine, and technical SEO targeting industrial packaging buyers.',
        architecturePoints: [
          'Modular Next.js component system optimized for instant page loads and sub-second Core Web Vitals.',
          'Interactive Request-for-Quote (RFQ) engine with custom dimension inputs, ply selectors, and artwork upload support.',
          'Product showcase detailing burst factor, edge crush test (ECT) ratings, and offset printing finishes.',
          'Automated lead dispatch delivering structured technical order specifications directly to the sales estimation desk.'
        ],
        techStack: [
          { name: 'Next.js', category: 'Application Shell' },
          { name: 'React', category: 'Interactive UI' },
          { name: 'Tailwind CSS', category: 'Design System' },
          { name: 'Node.js', category: 'API Handlers' },
          { name: 'PostgreSQL', category: 'Inquiry Database' },
          { name: 'RFQ Engine', category: 'Lead Generation' }
        ],
        keyFeatures: [
          { title: 'Interactive Packaging Catalogue', description: 'Comprehensive showcase of standard corrugated boxes, multi-color duplex cartons, die-cut shipping boxes, and protective packaging materials.' },
          { title: 'Custom RFQ & Quote Generator', description: 'Interactive quote request form enabling B2B buyers to submit custom dimensions, ply requirements, quantity tiers, and artwork files for immediate price estimation.' },
          { title: 'Quality & Testing Infrastructure', description: 'Technical section detailing quality control, bursting strength testing, moisture resistance, and drop-test compliance.' },
          { title: 'Sustainable Manufacturing', description: 'Showcases eco-friendly water-based inks, 100% recyclable kraft papers, automated corrugation lines, and high-capacity monthly output.' },
          { title: 'Direct Industrial Lead Routing', description: 'Instant notification system ensuring sales engineers receive structured specification sheets for fast quotation turnaround.' }
        ],
        metrics: [
          { value: '3.5x', label: 'Inquiry Volume', desc: 'Increase in qualified inbound B2B bulk packaging RFQs' },
          { value: '< 2 Hrs', label: 'Quote Turnaround', desc: 'Faster estimation with structured technical dimensions' },
          { value: '100%', label: 'Digital Catalogue', desc: 'Complete product range and print specifications available online' },
          { value: 'Top 3', label: 'Search Ranking', desc: 'Regional search visibility for corrugated packaging manufacturing' }
        ],
        outcome: 'The digital platform establishes Srinivas Packaging Industries as a modern, reliable industrial packaging partner, transforming traditional offline quote inquiries into a high-velocity digital lead pipeline for enterprise clients.',
        tags: [
          'Corrugated packaging',
          'Carton box manufacturing',
          'B2B RFQ engine',
          'Custom duplex cartons',
          'Industrial catalogue',
          'Quality testing standards'
        ],
        ctaHeading: 'Need an industrial platform or custom B2B catalogue?',
        ctaText: "Let's engineer a high-converting digital system for your manufacturing operations.",
        status: 'published',
        seoTitle: 'Srinivas Packaging — B2B Packaging & Manufacturing Platform Case Study — Ideate X',
        seoDescription: 'Case study: Corrugated carton manufacturing platform and B2B quotation system for Srinivas Packaging Industries.'
      }
    ],
    insights: [
      {
        id: 'ins-01',
        slug: 'architecting-scalable-multi-tenant-saas',
        title: 'Architecting Scalable Multi-Tenant SaaS Applications',
        subtitle: 'A practical deep-dive into database isolation strategies, role-based access control (RBAC), and subscription tenant lifecycle in modern cloud architectures.',
        excerpt: 'Key technical considerations for database isolation, role-based access control, and subscription billing in modern SaaS platforms.',
        category: 'ENGINEERING',
        date: 'Mar 15, 2026',
        readTime: '6 min read',
        featured: true,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&q=80&fit=crop',
        author: {
          name: 'Ideate X Team',
          role: 'Systems Architect',
          initials: 'IX',
          avatar: '/logo-ideatex.png'
        },
        tags: ['Multi-Tenancy', 'PostgreSQL', 'SaaS Architecture', 'RBAC', 'Database Isolation'],
        content: `When designing a multi-tenant B2B software platform, the first fundamental decision is how tenant data will be segregated at the storage layer. The three standard approaches are separate database per tenant, separate schema per tenant, or shared database with pooled tables using Row-Level Security (RLS).

For 90% of early to mid-stage SaaS applications, pooled tables backed by PostgreSQL Row-Level Security offer the optimal balance between operational overhead, infrastructure cost, and strict data boundary enforcement.

PostgreSQL natively supports Row-Level Security policies that dynamically filter queries based on session variables set by your application middleware. This guarantees that even if an application bug omits a tenant_id filter, the database will never return rows belonging to another organization.`,
        status: 'published',
        seoTitle: 'Architecting Scalable Multi-Tenant SaaS — Ideate X Insights',
        seoDescription: 'A practical deep-dive into database isolation strategies, RLS, and tenant billing architecture.'
      },
      {
        id: 'ins-02',
        slug: 'building-resilient-rag-pipelines',
        title: 'Building Production-Ready RAG & Autonomous Agent Pipelines',
        subtitle: 'Overcoming hallucination, retrieval latency, and context degradation in enterprise generative AI architectures.',
        excerpt: 'Why standard RAG fails in production and how to implement hybrid search, reranking, and semantic guardrails.',
        category: 'AI & AUTOMATION',
        date: 'Mar 08, 2026',
        readTime: '8 min read',
        featured: true,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&q=80&fit=crop',
        author: {
          name: 'Ideate X Team',
          role: 'AI Engineer',
          initials: 'IX',
          avatar: '/logo-ideatex.png'
        },
        tags: ['AI Agents', 'RAG', 'Vector Search', 'LangGraph', 'Embeddings'],
        content: `Most proof-of-concept RAG systems fail when exposed to real enterprise data. Naive vector similarity searches struggle with acronyms, tabular data, and domain-specific terminology.

To build reliable generative AI systems, modern pipelines combine dense vector search with sparse keyword search (BM25) and reciprocal rank fusion (RRF). Cross-encoder rerankers then score the top retrieved passages before passing them to the LLM context window.

Deterministic validation guardrails (such as Pydantic and Zod structured schemas) ensure the model returns structured JSON responses that downstream API orchestration tools can reliably execute.`,
        status: 'published',
        seoTitle: 'Production RAG & Autonomous Agents — Ideate X Insights',
        seoDescription: 'How to build resilient RAG pipelines with hybrid search, rerankers, and deterministic guardrails.'
      },
      {
        id: 'ins-03',
        slug: 'optimizing-nextjs-core-web-vitals',
        title: 'Optimizing Next.js 16 Applications for 100/100 Core Web Vitals',
        subtitle: 'Practical techniques for eliminating layout shifts, minimizing main-thread blocking, and tuning font rendering in modern web apps.',
        excerpt: 'Tactics for achieving top-tier Lighthouse scores and instant interaction in high-traffic web applications.',
        category: 'PERFORMANCE',
        date: 'Feb 28, 2026',
        readTime: '5 min read',
        featured: false,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&q=80&fit=crop',
        author: {
          name: 'Ideate X Team',
          role: 'Frontend Architect',
          initials: 'IX',
          avatar: '/logo-ideatex.png'
        },
        tags: ['Next.js', 'Core Web Vitals', 'Performance', 'React 19', 'Lighthouse'],
        content: `Google's Core Web Vitals directly impact search rankings and visitor conversion rates. Achieving consistent 95+ scores across Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) requires strict engineering hygiene.

Key strategies include prioritizing above-the-fold hero images with priority tags, serving next-gen AVIF/WebP formats, deferring non-critical scripts with next/script, and preconnecting to critical font CDNs.`,
        status: 'published',
        seoTitle: 'Optimizing Next.js for Core Web Vitals — Ideate X Insights',
        seoDescription: 'Mastering Core Web Vitals: LCP, INP, and CLS optimization for Next.js.'
      }
    ],
    team_members: [
      {
        id: 'team-01',
        name: 'Sankara',
        designation: 'Business Lead',
        role: 'Business Lead',
        image: '/sankara.png',
        shortBio: 'Leading business development, enterprise client partnerships, and strategic technology direction.',
        fullBio: 'Sankara directs Ideate X business operations and enterprise client relationships, helping founders and technology leaders architect digital platforms that drive measurable commercial scale.',
        email: 'sankara@ideatex.co.in',
        socialLinks: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com'
        },
        order: 1,
        status: 'published'
      },
      {
        id: 'team-02',
        name: 'Sudharsan',
        designation: 'Business Strategist',
        role: 'Business Strategist',
        image: '/sudharsan.jpg',
        shortBio: 'Driving product strategy, market positioning, and scalable commercial roadmaps.',
        fullBio: 'Sudharsan specializes in translating complex technical capabilities into high-converting product propositions, aligning engineering deliverables with customer acquisition and retention goals.',
        email: 'sudharsan@ideatex.co.in',
        socialLinks: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com'
        },
        order: 2,
        status: 'published'
      },
      {
        id: 'team-03',
        name: 'Amal Alex',
        designation: 'Software Developer',
        role: 'Software Developer',
        image: '/amal.jpg',
        shortBio: 'Engineering high-performance web systems, full-stack architectures, and fluid digital interfaces.',
        fullBio: 'Amal builds robust software architectures, reactive user interfaces, and scalable backend pipelines across modern web and cloud platforms at Ideate X.',
        email: 'amal@ideatex.co.in',
        socialLinks: {
          linkedin: 'https://linkedin.com',
          github: 'https://github.com'
        },
        order: 3,
        status: 'published'
      }
    ],
    media: [
      {
        id: 'med-01',
        name: 'Ideate X Official Logo',
        url: '/logo-ideatex.png',
        path: '/logo-ideatex.png',
        mimeType: 'image/png',
        size: 15420,
        width: 512,
        height: 512,
        altText: 'Ideate X official brand emblem',
        caption: 'Brand Logo',
        credit: 'Ideate X',
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'med-02',
        name: 'Sankara Profile',
        url: '/sankara.png',
        path: '/sankara.png',
        mimeType: 'image/png',
        size: 45200,
        width: 800,
        height: 800,
        altText: 'Sankara - Business Lead at Ideate X',
        caption: 'Leadership Team',
        credit: 'Ideate X',
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'med-03',
        name: 'Sudharsan Profile',
        url: '/sudharsan.jpg',
        path: '/sudharsan.jpg',
        mimeType: 'image/jpeg',
        size: 52100,
        width: 800,
        height: 800,
        altText: 'Sudharsan - Business Strategist at Ideate X',
        caption: 'Leadership Team',
        credit: 'Ideate X',
        createdAt: '2026-01-01T00:00:00.000Z'
      },
      {
        id: 'med-04',
        name: 'Amal Alex Profile',
        url: '/amal.jpg',
        path: '/amal.jpg',
        mimeType: 'image/jpeg',
        size: 48900,
        width: 800,
        height: 800,
        altText: 'Amal Alex - Software Developer at Ideate X',
        caption: 'Engineering Team',
        credit: 'Ideate X',
        createdAt: '2026-01-01T00:00:00.000Z'
      }
    ],
    navigation_items: [
      { id: 'nav-01', menuKey: 'header', label: 'Work', url: '/portfolio', isExternal: false, openNewTab: false, order: 1, isVisible: true },
      { id: 'nav-02', menuKey: 'header', label: 'Services', url: '/services', isExternal: false, openNewTab: false, order: 2, isVisible: true },
      { id: 'nav-03', menuKey: 'header', label: 'Case Studies', url: '/case-studies', isExternal: false, openNewTab: false, order: 3, isVisible: true },
      { id: 'nav-04', menuKey: 'header', label: 'Insights', url: '/blog', isExternal: false, openNewTab: false, order: 4, isVisible: true },
      { id: 'nav-05', menuKey: 'header', label: 'About', url: '/about', isExternal: false, openNewTab: false, order: 5, isVisible: true },
      { id: 'nav-06', menuKey: 'header', label: 'Contact', url: '/contact', isExternal: false, openNewTab: false, order: 6, isVisible: true }
    ],
    footer_groups: {
      services: [
        { label: 'Ai agentic development', url: '/services/ai-agentic-development' },
        { label: 'Saas platform engineering', url: '/services/saas-development' },
        { label: 'Modern web development', url: '/services/web-development' },
        { label: 'Mobile app development', url: '/services/mobile-app-development' },
        { label: 'Api & system integration', url: '/services/api-system-integration' },
        { label: 'All services', url: '/services' }
      ],
      company: [
        { label: 'About us', url: '/about' },
        { label: 'Case studies', url: '/case-studies' },
        { label: 'Selected work', url: '/portfolio' },
        { label: 'Technical insights', url: '/blog' },
        { label: 'Start a project', url: '/contact' }
      ],
      legal: [
        { label: 'Privacy policy', url: '/privacy' },
        { label: 'Terms of service', url: '/terms' },
        { label: 'Cookie policy', url: '/cookie-policy' }
      ]
    },
    faqs: [
      {
        id: 'faq-01',
        question: 'What types of software projects does Ideate X specialize in?',
        answer: 'We specialize in custom web applications, SaaS platforms, AI agentic automations, mobile apps, enterprise API integrations, and digital growth infrastructure.',
        category: 'General',
        relatedService: 'all',
        order: 1,
        status: 'published'
      },
      {
        id: 'faq-02',
        question: 'What is your typical project timeline from kickoff to launch?',
        answer: 'Typical MVP builds and focused web applications take 4 to 8 weeks. Larger multi-tenant SaaS platforms or complex AI agent workflows typically range from 8 to 16 weeks.',
        category: 'Process',
        relatedService: 'all',
        order: 2,
        status: 'published'
      },
      {
        id: 'faq-03',
        question: 'Do you offer post-launch maintenance and continuous support?',
        answer: 'Yes! We provide dedicated SLA-backed maintenance retainers, cloud infrastructure management, feature enhancements, and continuous optimization.',
        category: 'Support',
        relatedService: 'all',
        order: 3,
        status: 'published'
      },
      {
        id: 'faq-04',
        question: 'How do you handle intellectual property (IP) and code ownership?',
        answer: 'You retain 100% full ownership of all custom source code, design assets, database schemas, and intellectual property created during the engagement.',
        category: 'Legal & IP',
        relatedService: 'all',
        order: 4,
        status: 'published'
      }
    ],
    seo_metadata: {
      defaultTitle: 'Ideate X — Software, Products & Digital Growth',
      defaultDescription: 'We design, build and grow software products, digital platforms and business systems.',
      defaultOgImage: '/logo-ideatex.png',
      canonicalBase: 'https://ideatex.co.in',
      robots: 'index, follow',
      sitemapEnabled: true
    },
    enquiries: [
      {
        id: 'enq-01',
        type: 'contact',
        name: 'Karthik Raja',
        email: 'karthik@enterprise.com',
        phone: '+91 9876543210',
        company: 'Apex Logistics',
        service: 'SaaS Platform Engineering',
        message: 'Looking to build an automated warehouse dispatch SaaS portal for 20+ distribution centers.',
        budget: '₹15L - ₹30L',
        timeline: '2-3 Months',
        source: 'Contact Page',
        status: 'new',
        internalNotes: 'Follow up on WhatsApp and schedule technical architecture discovery call.',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: 'enq-02',
        type: 'project',
        name: 'Sarah Jenkins',
        email: 'sarah@fintechpulse.io',
        phone: '+1 415 555 0192',
        company: 'Fintech Pulse',
        service: 'AI Agentic Development',
        message: 'We need custom RAG agents over financial compliance docs with automated citation auditing.',
        budget: '$20,000 - $40,000',
        timeline: 'Immediate',
        source: 'Service Page - AI Agentic',
        status: 'reviewing',
        internalNotes: 'Reviewed requirements. Scope fits LangGraph + pgvector pipeline perfectly.',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ],
    chatbot_knowledge: [
      {
        id: 'kb-01',
        title: 'Ideate X Overview & Capabilities',
        category: 'General',
        keywords: ['who are you', 'what is ideate x', 'about', 'services', 'what do you do'],
        content: 'Ideate X is a software, product engineering, and digital growth agency headquartered in Chennai, India. We design, build, and scale high-performance web applications, multi-tenant SaaS platforms, AI agentic automations, cross-platform mobile apps, and custom business systems.',
        approvedAnswers: [
          'Ideate X designs, builds, and scales modern software platforms, AI agentic systems, SaaS applications, and mobile apps.'
        ],
        pageReferences: ['/about', '/services'],
        isEnabled: true,
        order: 1
      },
      {
        id: 'kb-02',
        title: 'Office Location & Contact Information',
        category: 'Contact',
        keywords: ['location', 'address', 'phone', 'email', 'contact', 'office', 'where are you located'],
        content: 'Our primary office is located at Innov8 Millenia, 2nd Floor, Campus-1a, MGR Main Rd, Perungudi, Chennai, Tamil Nadu 600096, India. You can email us at hello@ideatex.co.in or call +91 8760007900 / +91 7305905661.',
        approvedAnswers: [
          'We are based at Innov8 Millenia, Perungudi, Chennai. You can email hello@ideatex.co.in or call +91 8760007900.'
        ],
        pageReferences: ['/contact'],
        isEnabled: true,
        order: 2
      },
      {
        id: 'kb-03',
        title: 'Services & Tech Stack',
        category: 'Services',
        keywords: ['tech stack', 'technologies', 'ai agents', 'saas', 'nextjs', 'react', 'mobile', 'python'],
        content: 'We engineer systems using Next.js, React 19, Node.js, Python, FastAPI, PostgreSQL, Supabase, Redis, LangChain/LangGraph, React Native, and Flutter.',
        approvedAnswers: [
          'We specialize in modern engineering stacks including Next.js, React 19, Python, PostgreSQL, LangGraph AI, and React Native.'
        ],
        pageReferences: ['/services'],
        isEnabled: true,
        order: 3
      }
    ],
    chatbot_enquiries: [
      {
        id: 'cbot-enq-01',
        visitorName: 'David Miller',
        email: 'david@healthtech.co',
        phone: '+1 650 442 1190',
        service: 'SaaS Platform Engineering',
        requirements: 'Interested in building a multi-tenant clinic management system.',
        timeline: 'Q2 2026',
        budget: '$25,000+',
        conversationHistory: [
          { role: 'user', content: 'Hi, do you build multi-tenant SaaS for healthcare?' },
          { role: 'bot', content: 'Yes! We have deep experience building HIPAA-compliant SaaS platforms and real-time clinical dashboards.' },
          { role: 'user', content: 'Great, my email is david@healthtech.co' }
        ],
        status: 'new',
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
      }
    ],
    site_settings: {
      name: 'Ideate X',
      legalName: 'Ideate X',
      tagline: 'Software, Products & Digital Growth',
      email: 'hello@ideatex.co.in',
      phone: '+91 8760007900 / +91 7305905661',
      phones: [
        { display: '+91 8760007900', raw: '+918760007900' },
        { display: '+91 7305905661', raw: '+917305905661' }
      ],
      address: {
        line1: 'Innov8 Millenia, 2nd Floor, Campus-1a',
        line2: 'MGR Main Rd, Perungudi',
        city: 'Chennai',
        state: 'Tamil Nadu',
        postalCode: '600096',
        country: 'India',
        full: 'Innov8 Millenia, 2nd Floor, Campus-1a, MGR Main Rd, Perungudi, Chennai, Tamil Nadu 600096'
      },
      socialLinks: {
        linkedin: 'https://linkedin.com/company/ideatex',
        twitter: 'https://twitter.com/ideatex',
        github: 'https://github.com/ideatex',
        instagram: 'https://instagram.com/ideatex'
      },
      branding: {
        logoUrl: '/logo-ideatex.png',
        faviconUrl: '/favicon.ico'
      }
    },
    activity_logs: [
      {
        id: 'act-01',
        userId: 'usr-admin-01',
        userName: 'Ideate X Administrator',
        action: 'SYSTEM_INITIALIZED',
        entity: 'System',
        entityId: 'root',
        details: 'Ideate X CMS Database initialized with complete verified site content.',
        timestamp: new Date().toISOString()
      }
    ]
  };
}

function ensureDbFile() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initial = getInitialData();
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
  }
}

export function readDb() {
  ensureDbFile();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading CMS DB, recovering with initial state:', err);
    const initial = getInitialData();
    writeDb(initial);
    return initial;
  }
}

export function writeDb(data) {
  ensureDbFile();
  const tempFile = `${DB_FILE}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

// Activity Logging helper
export function logActivity(userId, userName, action, entity, entityId, details) {
  const db = readDb();
  if (!db.activity_logs) db.activity_logs = [];
  db.activity_logs.unshift({
    id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    userId: userId || 'anonymous',
    userName: userName || 'System User',
    action,
    entity,
    entityId: entityId || '',
    details: details || '',
    timestamp: new Date().toISOString()
  });
  // Keep last 500 activity logs
  if (db.activity_logs.length > 500) {
    db.activity_logs = db.activity_logs.slice(0, 500);
  }
  writeDb(db);
}

// Generic CRUD methods
export function getCollection(collectionName) {
  const db = readDb();
  return db[collectionName] || [];
}

export function getItemById(collectionName, id) {
  const list = getCollection(collectionName);
  return list.find((item) => item.id === id) || null;
}

export function getItemBySlug(collectionName, slug) {
  const list = getCollection(collectionName);
  return list.find((item) => item.slug === slug) || null;
}

export function insertItem(collectionName, item, user) {
  const db = readDb();
  if (!db[collectionName]) db[collectionName] = [];
  const newItem = {
    ...item,
    id: item.id || `${collectionName.slice(0, 3)}-${Date.now()}`,
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db[collectionName].push(newItem);
  writeDb(db);

  if (user) {
    logActivity(
      user.id,
      user.name,
      'CREATE',
      collectionName,
      newItem.id,
      `Created new ${collectionName} item: ${newItem.title || newItem.name || newItem.id}`
    );
  }
  return newItem;
}

export function updateItem(collectionName, id, updates, user) {
  const db = readDb();
  if (!db[collectionName]) return null;
  const index = db[collectionName].findIndex((item) => item.id === id);
  if (index === -1) return null;

  const current = db[collectionName][index];
  const updated = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  db[collectionName][index] = updated;
  writeDb(db);

  if (user) {
    logActivity(
      user.id,
      user.name,
      'UPDATE',
      collectionName,
      id,
      `Updated ${collectionName} item: ${updated.title || updated.name || id}`
    );
  }
  return updated;
}

export function deleteItem(collectionName, id, user) {
  const db = readDb();
  if (!db[collectionName]) return false;
  const index = db[collectionName].findIndex((item) => item.id === id);
  if (index === -1) return false;

  const deleted = db[collectionName].splice(index, 1)[0];
  writeDb(db);

  if (user) {
    logActivity(
      user.id,
      user.name,
      'DELETE',
      collectionName,
      id,
      `Deleted ${collectionName} item: ${deleted.title || deleted.name || id}`
    );
  }
  return true;
}

export function updateSingleton(key, data, user) {
  const db = readDb();
  db[key] = {
    ...db[key],
    ...data,
    updatedAt: new Date().toISOString()
  };
  writeDb(db);

  if (user) {
    logActivity(
      user.id,
      user.name,
      'UPDATE_SETTINGS',
      key,
      key,
      `Updated ${key} settings`
    );
  }
  return db[key];
}
