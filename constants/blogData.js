import { IMAGES } from './images';

export const BLOG_POSTS = [
  {
    id: 1,
    slug: 'architecting-scalable-multi-tenant-saas',
    title: 'Architecting Scalable Multi-Tenant SaaS Applications',
    subtitle: 'A practical deep-dive into database isolation strategies, role-based access control (RBAC), and subscription tenant lifecycle in modern cloud architectures.',
    excerpt: 'Key technical considerations for database isolation, role-based access control, and subscription billing in modern SaaS platforms.',
    category: 'ENGINEERING',
    date: 'Mar 15, 2026',
    readTime: '6 min read',
    featured: true,
    image: IMAGES.blog[0],
    author: {
      name: 'Alex Morgan',
      role: 'Lead Cloud & Systems Architect',
      initials: 'AM',
      avatar: IMAGES.team[0],
    },
    tags: ['Multi-Tenancy', 'PostgreSQL', 'SaaS Architecture', 'RBAC', 'Database Isolation'],
    tableOfContents: [
      { id: 'isolation-models', title: '1. Tenant Isolation Models: Schema vs. Row-Level' },
      { id: 'rls-postgres', title: '2. Implementing Row-Level Security in PostgreSQL' },
      { id: 'auth-rbac', title: '3. Tenant-Aware Authentication & RBAC' },
      { id: 'billing-lifecycle', title: '4. Stripe Billing & Tenant Provisioning Lifecycle' },
      { id: 'key-takeaways', title: '5. Key Architecture Takeaways' },
    ],
    sections: [
      {
        id: 'isolation-models',
        heading: 'Tenant Isolation Models: Schema vs. Row-Level Security',
        content: [
          'When designing a multi-tenant B2B software platform, the first fundamental decision is how tenant data will be segregated at the storage layer. The three standard approaches are separate database per tenant, separate schema per tenant, or shared database with pooled tables using Row-Level Security (RLS).',
          'For 90% of early to mid-stage SaaS applications, pooled tables backed by PostgreSQL Row-Level Security offer the optimal balance between operational overhead, infrastructure cost, and strict data boundary enforcement.',
        ],
        bulletPoints: [
          'Database per Tenant: Highest compliance isolation, but exponential maintenance overhead for migrations and connection pooling.',
          'Schema per Tenant: Clean logical separation, but encounters Postgres table limits when scaling past hundreds of tenants.',
          'Shared Table with RLS: Minimal connection footprint, automated migration workflows, and hardware efficiency.',
        ],
      },
      {
        id: 'rls-postgres',
        heading: 'Implementing Row-Level Security in PostgreSQL',
        content: [
          'PostgreSQL natively supports Row-Level Security policies that dynamically filter queries based on session variables set by your application middleware. This guarantees that even if an application bug omits a tenant_id filter, the database will never return rows belonging to another organization.',
        ],
        codeSnippet: {
          language: 'sql',
          title: 'PostgreSQL RLS Migration Example',
          code: `-- Enable Row-Level Security on organizations table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy enforcing tenant isolation via app session variable
CREATE POLICY tenant_isolation_policy ON projects
  FOR ALL
  TO application_role
  USING (organization_id = NULLIF(current_setting('app.current_org_id', true), '')::uuid);`,
        },
        callout: 'Always pair database-level RLS policies with strict TypeScript ORM middleware to prevent unauthenticated database queries from executing in production.',
      },
      {
        id: 'auth-rbac',
        heading: 'Tenant-Aware Authentication & Role-Based Access Control',
        content: [
          'Authentication in multi-tenant systems must resolve two distinct identities: the individual user identity (email/password, OAuth, SAML SSO) and the organization context in which the user is currently acting.',
          'We structure our JWT tokens to contain the active organization ID and the user’s assigned permissions array (e.g., `projects:create`, `billing:manage`), ensuring that permission checks execute in sub-millisecond time at the API gateway layer without redundant database lookups on every request.',
        ],
        bulletPoints: [
          'Decouple user records from tenant records through an intermediate memberships table.',
          'Enforce fine-grained granular permissions rather than rigid static role names.',
          'Support corporate SAML SSO / Okta integrations at the organization level.',
        ],
      },
      {
        id: 'billing-lifecycle',
        heading: 'Stripe Billing & Automated Tenant Provisioning',
        content: [
          'Automating the tenant onboarding pipeline is critical for seamless SaaS conversions. When a user completes checkout, webhook handlers must idempotently create the organization record, seed initial workspace configurations, and configure webhook listeners for subscription status changes (active, past_due, canceled).',
        ],
      },
      {
        id: 'key-takeaways',
        heading: 'Key Architecture Takeaways',
        content: [
          'By leveraging PostgreSQL Row-Level Security, tokenized role-based access control, and asynchronous tenant provisioning, you build a resilient SaaS architecture capable of scaling from day one to thousands of concurrent business customers without architectural rewrites.',
        ],
      },
    ],
  },
  {
    id: 2,
    slug: 'designing-accessible-component-libraries-tokens',
    title: 'Designing Accessible Component Libraries with Design Tokens',
    subtitle: 'A systematic approach to building production-ready React component libraries synchronized with Figma design tokens and WCAG 2.1 AA accessibility standards.',
    excerpt: 'A practical methodology for creating tokenized design systems that keep UI design in sync with production React code.',
    category: 'DESIGN',
    date: 'Mar 8, 2026',
    readTime: '5 min read',
    featured: true,
    image: IMAGES.blog[1],
    author: {
      name: 'Elena Costa',
      role: 'Head of Product Design',
      initials: 'EC',
      avatar: IMAGES.team[3],
    },
    tags: ['Design Systems', 'Design Tokens', 'WCAG 2.1', 'React Components', 'Figma'],
    tableOfContents: [
      { id: 'token-foundations', title: '1. Defining Design Token Foundations' },
      { id: 'accessibility-contrast', title: '2. WCAG AA Contrast Ratios in Dark Mode' },
      { id: 'radix-primitives', title: '3. Headless UI Primitives & Keyboard Navigation' },
      { id: 'syncing-figma-code', title: '4. Synchronizing Figma & Code Repositories' },
    ],
    sections: [
      {
        id: 'token-foundations',
        heading: 'Defining Design Token Foundations',
        content: [
          'A design system is only as strong as its underlying token hierarchy. We structure tokens into three explicit tiers: Global (raw color values, base spacing scale), Semantic (intent-driven variables like `--bg-card`, `--border-hover`), and Component-scoped tokens.',
          'This 3-tier architecture enables effortless theme switching (dark/light mode) and brand customization without changing component markup or writing brittle CSS overrides.',
        ],
      },
      {
        id: 'accessibility-contrast',
        heading: 'WCAG AA Contrast Ratios in Dark Mode',
        content: [
          'Dark mode interfaces frequently suffer from inadequate contrast between text and background surfaces. To meet WCAG 2.1 AA compliance, normal body text requires a minimum contrast ratio of 4.5:1, while large headings require at least 3:1 against card backgrounds.',
        ],
        callout: 'Never use pure black (#000000) for card surfaces. Layered dark tones (#0A0D14, #101420, #151A28) create spatial depth while maintaining optimal readability.',
      },
      {
        id: 'radix-primitives',
        heading: 'Headless UI Primitives & Keyboard Navigation',
        content: [
          'Building accessible modals, dropdowns, tooltips, and tabs from scratch is notoriously prone to focus management bugs. We standardize on unstyled, headless primitives (Radix UI / React Aria) that handle WAI-ARIA attributes, focus traps, and keyboard navigation automatically.',
        ],
        codeSnippet: {
          language: 'jsx',
          title: 'Accessible Dialog Primitive Usage',
          code: `import * as Dialog from '@radix-ui/react-dialog';

export function AccessibleModal({ isOpen, onClose, title, children }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-backdrop" />
        <Dialog.Content className="modal-card" aria-describedby={undefined}>
          <Dialog.Title className="modal-title">{title}</Dialog.Title>
          <div className="modal-body">{children}</div>
          <Dialog.Close asChild>
            <button className="btn-close" aria-label="Close modal">×</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`,
        },
      },
      {
        id: 'syncing-figma-code',
        heading: 'Synchronizing Figma & Code Repositories',
        content: [
          'Using automated GitHub Actions, our token pipeline exports JSON variables directly from Figma into CSS custom properties and TypeScript definitions, eliminating manual copying and ensuring 100% design-to-code parity.',
        ],
      },
    ],
  },
  {
    id: 3,
    slug: 'practical-ai-agent-workflows-business',
    title: 'Building Practical AI Agent Workflows for Business Operations',
    subtitle: 'Moving beyond chat interfaces to deterministic tool execution, structured JSON schemas, and reliable error-handling pipelines.',
    excerpt: 'How we structure deterministic tools and API integrations to make AI agents reliable for real operational tasks.',
    category: 'AI & AUTOMATION',
    date: 'Feb 28, 2026',
    readTime: '7 min read',
    featured: false,
    image: IMAGES.blog[2],
    author: {
      name: 'Maya Patel',
      role: 'Lead AI Engineer',
      initials: 'MP',
      avatar: IMAGES.team[5],
    },
    tags: ['AI Agents', 'LLM Workflows', 'Function Calling', 'Automation', 'Python'],
    tableOfContents: [
      { id: 'deterministic-vs-generative', title: '1. The Deterministic Tool Pattern' },
      { id: 'schema-validation', title: '2. Enforcing Strict JSON Output Schemas' },
      { id: 'guardrails-human-loop', title: '3. Production Guardrails & Human-in-the-Loop' },
      { id: 'observability', title: '4. Logging & Evaluation Metrics' },
    ],
    sections: [
      {
        id: 'deterministic-vs-generative',
        heading: 'The Deterministic Tool Pattern',
        content: [
          'Generative AI models excel at comprehension and synthesis, but businesses cannot tolerate non-deterministic hallucination in operational systems. The solution is the Deterministic Tool Pattern: using LLMs strictly for reasoning, intent extraction, and routing, while delegating all data modifications to typed, unit-tested APIs.',
        ],
      },
      {
        id: 'schema-validation',
        heading: 'Enforcing Strict JSON Output Schemas with Pydantic & Zod',
        content: [
          'Every tool call executed by an agent must be validated against a formal JSON schema before hitting backend databases or external SaaS endpoints. If the output fails validation, the error message is fed directly back to the model for automated self-correction.',
        ],
        codeSnippet: {
          language: 'typescript',
          title: 'Zod Tool Schema Definition',
          code: `import { z } from 'zod';

export const CreateInvoiceSchema = z.object({
  customerId: z.string().uuid(),
  amountDueCents: z.number().int().positive(),
  currency: z.enum(['USD', 'EUR', 'GBP']),
  lineItems: z.array(z.object({
    description: z.string().min(1),
    quantity: z.number().int().min(1),
    unitPriceCents: z.number().int().positive()
  })).min(1),
  dueDate: z.string().datetime()
});`,
        },
      },
      {
        id: 'guardrails-human-loop',
        heading: 'Production Guardrails & Human-in-the-Loop Approvals',
        content: [
          'For high-impact business actions—such as processing refunds over $500 or deleting accounts—the agent workflow pauses and generates a pending task in a review dashboard for human operator confirmation before execution.',
        ],
      },
      {
        id: 'observability',
        heading: 'Logging & Evaluation Metrics',
        content: [
          'Monitoring token usage, step latency, tool execution success rates, and user satisfaction ratings ensures that your autonomous agent pipelines stay fast, cost-effective, and accurate over time.',
        ],
      },
    ],
  },
  {
    id: 4,
    slug: 'optimizing-browser-3d-graphics-performance',
    title: 'Optimizing Browser-Based 3D Graphics for Production Performance',
    subtitle: 'Techniques for asset compression, Level of Detail (LOD) pipelines, and shader optimizations to deliver 60 FPS Three.js web experiences.',
    excerpt: 'Asset compression, LOD hierarchies, and shader optimizations to deliver 60 FPS Three.js experiences across mobile and desktop.',
    category: 'ENGINEERING',
    date: 'Feb 20, 2026',
    readTime: '8 min read',
    featured: false,
    image: IMAGES.blog[3],
    author: {
      name: 'James Liu',
      role: 'Principal Graphics Engineer',
      initials: 'JL',
      avatar: IMAGES.team[2],
    },
    tags: ['Three.js', 'WebGL', '3D Graphics', 'Performance', 'GLTF / Draco'],
    tableOfContents: [
      { id: 'asset-compression', title: '1. Draco & KTX2 Texture Compression' },
      { id: 'draw-calls-instancing', title: '2. Minimizing Draw Calls with InstancedMesh' },
      { id: 'lod-hierarchies', title: '3. Dynamic Level-of-Detail (LOD)' },
      { id: 'memory-cleanup', title: '4. Geometry & Texture Disposal Management' },
    ],
    sections: [
      {
        id: 'asset-compression',
        heading: 'Draco Geometry & KTX2 Texture Compression',
        content: [
          'Uncompressed 3D models can easily exceed 50MB, stalling browser load times and causing memory thrashing. By applying Draco geometry compression and KTX2 texture transcoding with Basis Universal, we routinely reduce 3D asset file sizes by 80% to 90% with zero perceptible visual degradation.',
        ],
      },
      {
        id: 'draw-calls-instancing',
        heading: 'Minimizing Draw Calls with InstancedMesh',
        content: [
          'Draw calls are the primary bottleneck in WebGL applications. Rendering 500 individual meshes causes 500 separate CPU-to-GPU context switches per frame. Using Three.js `InstancedMesh`, all 500 objects are rendered in a single draw call, maintaining a locked 60 FPS on mobile browsers.',
        ],
      },
      {
        id: 'lod-hierarchies',
        heading: 'Dynamic Level-of-Detail (LOD)',
        content: [
          'Meshes positioned far from the active camera do not require full polygon resolution. Generating dynamic LOD tiers ensures that distant objects consume fewer vertex resources, preserving rendering power for interactive foreground elements.',
        ],
      },
      {
        id: 'memory-cleanup',
        heading: 'Geometry & Texture Disposal Management',
        content: [
          'Single-page applications (SPAs) will leak GPU VRAM if unmounted 3D scenes are not explicitly purged. Every Three.js scene must iterate through materials, geometries, and textures to invoke `.dispose()` when navigating between routes.',
        ],
      },
    ],
  },
  {
    id: 5,
    slug: 'technical-seo-web-applications-visibility',
    title: 'Technical SEO: Structuring Web Applications for Search Visibility',
    subtitle: 'How server-side rendering, metadata streaming, semantic markup, and Core Web Vitals optimizations drive measurable organic indexing.',
    excerpt: 'Server-side rendering, metadata pipelines, and Core Web Vitals optimizations that directly impact search indexing.',
    category: 'GROWTH',
    date: 'Feb 12, 2026',
    readTime: '5 min read',
    featured: false,
    image: IMAGES.blog[4],
    author: {
      name: 'Priya Sharma',
      role: 'Growth & Product Engineer',
      initials: 'PS',
      avatar: IMAGES.team[1],
    },
    tags: ['Technical SEO', 'Next.js', 'Core Web Vitals', 'Metadata', 'Structured Data'],
    tableOfContents: [
      { id: 'ssr-metadata', title: '1. Server-Side Rendering & Dynamic Open Graph' },
      { id: 'core-web-vitals', title: '2. Optimizing LCP, INP, and CLS Metrics' },
      { id: 'json-ld-schemas', title: '3. Automated JSON-LD Structured Data' },
      { id: 'sitemap-robots', title: '4. Dynamic Sitemaps & Canonical URLs' },
    ],
    sections: [
      {
        id: 'ssr-metadata',
        heading: 'Server-Side Rendering & Dynamic Open Graph Metadata',
        content: [
          'Modern search crawlers prioritize web applications that deliver complete HTML on initial request rather than relying on client-side JavaScript hydration. Generating dynamic page metadata server-side ensures 100% crawl coverage and rich social preview cards across LinkedIn, X, and search snippets.',
        ],
      },
      {
        id: 'core-web-vitals',
        heading: 'Optimizing LCP, INP, and CLS Metrics',
        content: [
          'Google ranking algorithms directly penalize sites with poor Core Web Vitals scores. Eliminating layout shifts (CLS) through font preloading and container aspect-ratio reservations ensures a stable reading experience and top-tier search visibility.',
        ],
      },
      {
        id: 'json-ld-schemas',
        heading: 'Automated JSON-LD Structured Data',
        content: [
          'Embedding machine-readable schema.org JSON-LD scripts (Article, Organization, BreadcrumbList) provides search engines with verified structured knowledge about your content, driving rich search snippet features.',
        ],
      },
      {
        id: 'sitemap-robots',
        heading: 'Dynamic Sitemaps & Canonical URLs',
        content: [
          'Automating XML sitemap generation based on published content routes ensures that newly released articles and case studies are indexed by search engines within hours of publication.',
        ],
      },
    ],
  },
  {
    id: 6,
    slug: 'managing-complex-state-realtime-applications',
    title: 'Managing Complex State in Full-Stack Real-Time Applications',
    subtitle: 'Architectural patterns for synchronizing WebSocket events, optimistic UI updates, and conflict resolution in collaborative dashboards.',
    excerpt: 'Patterns for synchronizing WebSocket events with local UI state in low-latency dashboards and collaborative tools.',
    category: 'ENGINEERING',
    date: 'Feb 5, 2026',
    readTime: '6 min read',
    featured: false,
    image: IMAGES.blog[5],
    author: {
      name: "Ryan O'Brien",
      role: 'Principal Backend Engineer',
      initials: 'RO',
      avatar: IMAGES.team[4],
    },
    tags: ['WebSockets', 'Real-Time', 'State Management', 'Optimistic UI', 'CRDT'],
    tableOfContents: [
      { id: 'event-driven-websockets', title: '1. Event-Driven Architecture with WebSockets' },
      { id: 'optimistic-mutations', title: '2. Optimistic UI Mutations & Rollback State' },
      { id: 'conflict-resolution', title: '3. Handling Concurrent Edits & Clocks' },
      { id: 'reconnection-reconciliation', title: '4. Reconnection & Delta Reconciliation' },
    ],
    sections: [
      {
        id: 'event-driven-websockets',
        heading: 'Event-Driven Architecture with WebSockets & Redis Pub/Sub',
        content: [
          'Real-time collaborative applications require low-latency bi-directional messaging. We pair Node.js/Go WebSocket gateway nodes with Redis Pub/Sub backplanes to distribute real-time events across horizontally scaled container instances with sub-50ms propagation.',
        ],
      },
      {
        id: 'optimistic-mutations',
        heading: 'Optimistic UI Mutations & Rollback State',
        content: [
          'To make collaborative applications feel instantaneous, UI state must update immediately upon user interaction before the server acknowledgment returns. If the backend rejects the transaction, an automated rollback restores previous state with zero UI flickering.',
        ],
      },
      {
        id: 'conflict-resolution',
        heading: 'Handling Concurrent Edits & Vector Clocks',
        content: [
          'When multiple users update the same document simultaneously, deterministic conflict resolution strategies (such as Last-Write-Wins timestamps or Conflict-Free Replicated Data Types - CRDTs) prevent data loss and ensure eventual consistency.',
        ],
      },
      {
        id: 'reconnection-reconciliation',
        heading: 'Reconnection & Delta Reconciliation',
        content: [
          'Mobile clients regularly lose cellular connectivity. Implementing local event queues and sequence-numbered delta sync endpoints allows clients to re-synchronize missed state transitions seamlessly upon reconnecting.',
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogPostSlugs() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function getRelatedBlogPosts(currentSlug, category, limit = 2) {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug && (p.category === category || true)).slice(0, limit);
}
