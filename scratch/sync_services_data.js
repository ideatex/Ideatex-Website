const fs = require('fs');
const path = require('path');

const deliverablesData = require('./deliverables_export.json');
const { SERVICES_DATA } = require('../constants/servicesData');

// Read existing servicesData.js
const servicesDataPath = path.join(__dirname, '..', 'constants', 'servicesData.js');

// Helper to format JS object
let fileContent = `// Centralized data repository for all Studio 52 / Ideate X services
import {
  Bot, Cloud, Globe, Smartphone,
  Cpu, Megaphone, Server, Compass,
  CheckCircle2, Terminal, Shield, Workflow, Database,
  GitBranch, RefreshCw, BarChart3, Activity,
  Lock, Key, Sliders, Monitor, Radio, MessageSquare
} from 'lucide-react';

export const SERVICES_DATA = {
`;

Object.keys(SERVICES_DATA).forEach(slug => {
  const service = SERVICES_DATA[slug];
  const deliverables = deliverablesData[slug] || service.deliverables;
  const iconName = service.slug === 'custom-apps-development' ? 'Terminal' : service.slug === 'chatbot-development' ? 'MessageSquare' : service.slug === 'hosting-deployment-maintenance' ? 'Server' : service.slug === 'product-strategy-consulting' ? 'Compass' : service.slug === 'digital-marketing' ? 'Megaphone' : service.slug === 'api-system-integration' ? 'Cpu' : service.slug === 'mobile-app-development' ? 'Smartphone' : service.slug === 'web-development' ? 'Globe' : service.slug === 'saas-development' ? 'Cloud' : 'Bot';

  fileContent += `  '${slug}': {
    slug: '${service.slug}',
    category: '${service.category}',
    title: '${service.title}',
    tagline: '${service.tagline.replace(/'/g, "\\'")}',
    heroDescription: '${service.heroDescription.replace(/'/g, "\\'")}',
    icon: ${iconName},
    image: ${JSON.stringify(service.image, null, 6)},
    overview: ${JSON.stringify(service.overview, null, 6)},
    deliverables: ${JSON.stringify(deliverables, null, 6)},
    techStack: ${JSON.stringify(service.techStack, null, 6)},
    process: ${JSON.stringify(service.process, null, 6)},
    faqs: ${JSON.stringify(service.faqs, null, 6)},
    related: ${JSON.stringify(service.related, null, 6)},
  },

`;
});

fileContent += `};
`;

fs.writeFileSync(servicesDataPath, fileContent, 'utf8');
console.log('Successfully written complete constants/servicesData.js with rich Zig-Zag deliverables!');
