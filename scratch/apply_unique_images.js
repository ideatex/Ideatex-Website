const fs = require('fs');
const path = require('path');

const uniqueImages = {
  'ai-agentic-development': {
    hero: {
      src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Autonomous AI agentic development and neural reasoning network'
    },
    delivs: [
      {
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Autonomous multi-step AI agents and worker orchestration'
      },
      {
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Enterprise RAG vector database and semantic indexing infrastructure'
      },
      {
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Multi-agent supervisor pipeline and task delegation architecture'
      },
      {
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Deterministic guardrails and prompt safety eval benchmarks'
      }
    ]
  },
  'saas-development': {
    hero: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'SaaS subscription analytics and enterprise dashboard'
    },
    delivs: [
      {
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Multi-tenant database partitioning and isolated tenant schema'
      },
      {
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Subscription engine, Stripe billing, and revenue analytics'
      },
      {
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'High-velocity management dashboards and real-time user metrics'
      },
      {
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Public developer APIs, webhook dispatcher, and client integration'
      }
    ]
  },
  'web-development': {
    hero: {
      src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Modern web engineering and responsive website design layout'
    },
    delivs: [
      {
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Custom marketing and high-speed web application interface'
      },
      {
        image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Headless CMS publishing workflows and editorial portal'
      },
      {
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Core Web Vitals telemetry, SEO audit score, and asset optimization'
      },
      {
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Interactive 3D WebGL canvas and immersive graphics'
      }
    ]
  },
  'mobile-app-development': {
    hero: {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Mobile application interface development on iOS and Android smartphones'
    },
    delivs: [
      {
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Cross-platform React Native mobile application screen'
      },
      {
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Offline-first storage and encrypted background mobile sync'
      },
      {
        image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Native hardware sensors, biometric auth, and BLE integrations'
      },
      {
        image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'App Store and Google Play publishing and CI/CD distribution'
      }
    ]
  },
  'api-system-integration': {
    hero: {
      src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Enterprise API integration servers and cloud data infrastructure'
    },
    delivs: [
      {
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Resilient API gateways, rate limiting, and reverse proxy routing'
      },
      {
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Payment gateways, Stripe integration, and financial ledger connectors'
      },
      {
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Legacy ERP database bridges and high-throughput SQL pipelines'
      },
      {
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Interactive OpenAPI developer documentation and sandbox SDKs'
      }
    ]
  },
  'digital-marketing': {
    hero: {
      src: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Digital growth marketing analytics, funnel optimization, and campaign strategy'
    },
    delivs: [
      {
        image: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'High-converting performance landing page design with A/B testing'
      },
      {
        image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Targeted paid search advertising, PPC bidding, and ABM campaigns'
      },
      {
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Server-side GTM event tracking and multi-touch revenue attribution'
      },
      {
        image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Organic SEO content clusters and technical search engine ranking architecture'
      }
    ]
  },
  'hosting-deployment-maintenance': {
    hero: {
      src: 'https://images.unsplash.com/photo-1597852074816-d933c4d2b988?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Cloud hosting servers and enterprise data center infrastructure'
    },
    delivs: [
      {
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Automated GitHub Actions CI/CD pipelines and blue-green releases'
      },
      {
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Global multi-region cloud hosting architecture and CDN edge routing'
      },
      {
        image: 'https://images.unsplash.com/photo-1551836022-b06985bceb24?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: '24/7 SRE uptime telemetry, Prometheus alerts, and incident response'
      },
      {
        image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Automated database backups and disaster recovery verification drills'
      }
    ]
  },
  'product-strategy-consulting': {
    hero: {
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Technology leaders and consultants discussing product roadmap and architecture'
    },
    delivs: [
      {
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'System architecture blueprinting and code quality audit remediation'
      },
      {
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Fractional CTO leadership, technology vetting, and executive advisory'
      },
      {
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Investor technical due diligence preparation and IP documentation'
      },
      {
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Product roadmap milestone mapping and MVP scope definition'
      }
    ]
  },
  'chatbot-development': {
    hero: {
      src: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Customer support AI chat interface and conversational lead bot'
    },
    delivs: [
      {
        image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Custom AI conversational widget interface with streaming responses'
      },
      {
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'CMS knowledge base indexing and semantic vector embeddings'
      },
      {
        image: 'https://images.unsplash.com/photo-1556742049-0a67e55722ee?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Automated lead qualification and CRM sales routing logic'
      },
      {
        image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Omnichannel WhatsApp, Telegram, and customer messaging integration'
      }
    ]
  },
  'custom-apps-development': {
    hero: {
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&auto=format&q=85&fit=crop',
      alt: 'Custom enterprise software dashboard and business workflow application'
    },
    delivs: [
      {
        image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Custom internal operations portal and role-based access management'
      },
      {
        image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Automated PDF generation, document templating, and report exporter'
      },
      {
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Legacy SQL database connectors, schema migrations, and sync jobs'
      },
      {
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&auto=format&q=80&fit=crop',
        alt: 'Event-driven background job queues, Redis broker, and async processors'
      }
    ]
  }
};

// 1. Update data/cms-db.json
const cmsDbPath = path.join(__dirname, '../data/cms-db.json');
const cmsDb = JSON.parse(fs.readFileSync(cmsDbPath, 'utf8'));
if (cmsDb.services) {
  cmsDb.services.forEach(s => {
    if (uniqueImages[s.slug]) {
      s.image = uniqueImages[s.slug].hero;
      if (s.deliverables) {
        s.deliverables.forEach((d, i) => {
          if (uniqueImages[s.slug].delivs[i]) {
            d.image = uniqueImages[s.slug].delivs[i].image;
          }
        });
      }
    }
  });
}
fs.writeFileSync(cmsDbPath, JSON.stringify(cmsDb, null, 2), 'utf8');
console.log('Successfully updated data/cms-db.json');

// 2. Update constants/servicesData.js
const { SERVICES_DATA } = require('../constants/servicesData.js');
Object.entries(uniqueImages).forEach(([slug, data]) => {
  if (SERVICES_DATA[slug]) {
    SERVICES_DATA[slug].image = data.hero;
    if (SERVICES_DATA[slug].deliverables) {
      SERVICES_DATA[slug].deliverables.forEach((d, i) => {
        if (data.delivs[i]) {
          d.image = data.delivs[i].image;
        }
      });
    }
  }
});

const iconMap = {
  'ai-agentic-development': 'Bot',
  'saas-development': 'Cloud',
  'web-development': 'Globe',
  'mobile-app-development': 'Smartphone',
  'api-system-integration': 'Cpu',
  'digital-marketing': 'Megaphone',
  'hosting-deployment-maintenance': 'Server',
  'product-strategy-consulting': 'Compass',
  'chatbot-development': 'MessageSquareCode',
  'custom-apps-development': 'Layers'
};

let fileContent = `import {
  Bot, Cloud, Globe, Smartphone,
  Cpu, Megaphone, Server, Compass,
  MessageSquareCode, Layers
} from 'lucide-react';

export const SERVICES_DATA = {\n`;

const keys = Object.keys(SERVICES_DATA);
keys.forEach((slug, sIdx) => {
  const s = SERVICES_DATA[slug];
  const iconName = iconMap[slug] || 'Bot';
  fileContent += `  '${slug}': {\n`;
  fileContent += `    slug: ${JSON.stringify(s.slug)},\n`;
  fileContent += `    title: ${JSON.stringify(s.title)},\n`;
  fileContent += `    tagline: ${JSON.stringify(s.tagline)},\n`;
  fileContent += `    category: ${JSON.stringify(s.category)},\n`;
  fileContent += `    icon: ${iconName},\n`;
  fileContent += `    color: ${JSON.stringify(s.color)},\n`;
  fileContent += `    image: ${JSON.stringify(s.image, null, 6).replace(/\\n/g, '\\n    ')},\n`;
  fileContent += `    heroDescription: ${JSON.stringify(s.heroDescription)},\n`;
  fileContent += `    overview: ${JSON.stringify(s.overview, null, 6).replace(/\\n/g, '\\n    ')},\n`;
  fileContent += `    deliverables: ${JSON.stringify(s.deliverables, null, 6).replace(/\\n/g, '\\n    ')},\n`;
  fileContent += `    techStack: ${JSON.stringify(s.techStack, null, 6).replace(/\\n/g, '\\n    ')},\n`;
  fileContent += `    process: ${JSON.stringify(s.process, null, 6).replace(/\\n/g, '\\n    ')},\n`;
  fileContent += `    faqs: ${JSON.stringify(s.faqs, null, 6).replace(/\\n/g, '\\n    ')},\n`;
  fileContent += `    related: ${JSON.stringify(s.related, null, 6).replace(/\\n/g, '\\n    ')},\n`;
  fileContent += `    featured: ${s.featured ? 'true' : 'false'}\n`;
  fileContent += `  }${sIdx < keys.length - 1 ? ',' : ''}\n`;
});

fileContent += `};\n\nexport const SERVICES_LIST = Object.values(SERVICES_DATA);\n`;

const servicesDataPath = path.join(__dirname, '../constants/servicesData.js');
fs.writeFileSync(servicesDataPath, fileContent, 'utf8');
console.log('Successfully updated constants/servicesData.js');
