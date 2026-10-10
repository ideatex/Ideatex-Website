import {
  COMPANY_PROFILE,
  APPROVED_SERVICES,
  PILLARS,
  PAGE_ROUTES,
  COMMON_FAQS,
  CHAT_STARTERS,
  SERVICE_QUICK_ACTIONS,
} from '@/constants/chatbotKnowledge';
import { readDb } from './cms-db';

/**
 * Normalizes text for clean fuzzy keyword matching
 */
const AREA_LABELS = {
  development: 'Software, AI & Product Development',
  marketing: 'Digital Marketing & Growth',
  creative: 'Creative Production',
};

// Which of the three service areas an enquiry is about
function detectArea(text = '') {
  const t = normalize(text);
  if (/\b(seo|search engine|marketing|social media|ads?|advertis\w*|campaigns?|conversion|lead generation|growth)\b/.test(t)) return 'marketing';
  if (/\b(photo\w*|video\w*|shoots?|films?|footage|editing|promotional|commercial)\b/.test(t)) return 'creative';
  return 'development';
}

function normalize(text = '') {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
}

/**
 * Main Chatbot Response Engine
 */
export async function processChatMessage({
  message = '',
  action = null,
  history = [],
  qualificationState = null,
}) {
  const norm = normalize(message);
  const db = readDb();
  const cmsKnowledge = (db.chatbot_knowledge || []).filter((k) => k.isEnabled !== false);

  // 1. Initial Greeting / Restart
  if (action === 'start' || (!message && !action) || norm === 'hi' || norm === 'hello' || norm === 'hey') {
    return {
      text: "Hi! I'm the Ideate X assistant.\n\nI can help you explore our services, answer questions, or figure out what you might need for your project.",
      quickReplies: [
        { label: "Explore Services", action: "explore_services" },
        { label: "Start a Project", action: "start_project" },
        { label: "How Ideate X Works", action: "how_we_work" },
        { label: "Ask a Question", action: "ask_question" },
      ],
      links: [],
      qualificationState: null,
    };
  }

  // 2. Action: Explore Services
  if (action === 'explore_services' || norm === 'explore services' || norm === 'services' || norm === 'what services do you offer') {
    return {
      text: "We work across three areas: software, AI and product development, digital marketing, and creative production. Which one would you like to explore?",
      quickReplies: [
        { label: "Software, AI & Development", text: "Tell me about Software, AI & Product Development" },
        { label: "Digital Marketing", text: "Tell me about Digital Marketing & Growth" },
        { label: "Creative Production", text: "Tell me about Creative Production" },
      ],
      links: [{ label: "View All Services", route: "/services" }],
      qualificationState: null,
    };
  }

  // 3. Action: How Ideate X Works
  if (action === 'how_we_work' || norm.includes('how does ideate x work') || norm.includes('how do you work') || norm.includes('delivery process')) {
    return {
      text: "Every project follows four steps: Understand (we learn about your business and goals), Plan (we agree the approach and priorities), Create & Build (we bring the plan to life) and Refine (we review the work and prepare it for use).",
      quickReplies: [
        { label: "Start a Project", action: "start_project" },
        { label: "Explore Services", action: "explore_services" },
        { label: "View Case Studies", text: "Show me some case studies" },
      ],
      links: [
        { label: "Our Full Delivery Process", route: "/about" },
        { label: "Explore Case Studies", route: "/case-studies" },
      ],
      qualificationState: null,
    };
  }

  // 4. Action: Ask a Question / Common Prompts
  if (action === 'ask_question') {
    return {
      text: "Feel free to ask me anything about our services, tech stack, timelines, pricing philosophy, or how we collaborate.",
      quickReplies: [
        { label: "How much does a project cost?", text: "How much does a project cost?" },
        { label: "How long does a project take?", text: "How long does a project take?" },
        { label: "Who owns the code?", text: "Who owns the source code and IP?" },
        { label: "Can you work on existing apps?", text: "Can you work with an existing application?" },
      ],
      links: [{ label: "Contact Ideate X Team", route: "/contact" }],
      qualificationState: null,
    };
  }

  // 5. Check if in active Project Qualification State Machine
  if (qualificationState && qualificationState.step) {
    return handleQualificationFlow(message, qualificationState);
  }

  // 6. Action: Start a Project triggered
  if (action === 'start_project' || norm.includes('start a project') || norm.includes('build a project') || norm.includes('hire you') || norm.includes('get a quote')) {
    return {
      text: "Great! Tell me briefly what you'd like to work on.",
      quickReplies: [
        { label: "Web or Mobile App", text: "I need a custom web or mobile app" },
        { label: "AI Agent / Workflow", text: "I want to build an AI agent or automated workflow" },
        { label: "SEO / Marketing", text: "I need help with SEO and digital marketing" },
        { label: "Photography / Video", text: "I need product photography or a promotional video" },
      ],
      links: [],
      qualificationState: {
        step: "awaiting_description",
        data: {
          project_description: "",
          target_users: "",
          platform: "",
          timeline: "",
          budget: "",
          name: "",
          email: "",
          phone: "",
        },
      },
    };
  }

  // 7. Check Discovery: "I need an app"
  if (norm === 'i need an app' || norm === 'build an app' || norm === 'i want to build an app' || norm === 'app development') {
    return {
      text: "Is it a mobile app (iOS / Android), a web application, or both?",
      quickReplies: [
        { label: "Mobile App (iOS & Android)", text: "Mobile app for iOS and Android" },
        { label: "Web Application", text: "Web application" },
        { label: "Both Web & Mobile", text: "Both web and mobile apps" },
      ],
      links: [
        { label: "Mobile App Services", route: "/services/mobile-app-development" },
        { label: "Web App Services", route: "/services/web-development" },
      ],
      qualificationState: {
        step: "awaiting_users",
        data: {
          project_description: "App Development",
          platform: "Mobile / Web",
          area: "development",
          service_label: AREA_LABELS.development,
        }
      },
    };
  }

  // 8. Check Discovery: "I want to automate" / "workflow automation"
  if (norm.includes('automate') || norm.includes('automation') || norm.includes('repetitive work')) {
    return {
      text: "We can help with workflow automation and AI agent systems. What part of your business takes the most repetitive manual work today?",
      quickReplies: [
        { label: "Sales & Lead Routing", text: "Sales and CRM lead routing" },
        { label: "Data Sync Between Tools", text: "Moving data between multiple business tools" },
        { label: "Document & Invoice Processing", text: "Document review and invoice data extraction" },
        { label: "Customer Support Queries", text: "Handling repetitive customer support questions" },
      ],
      links: [
        { label: "Workflow Automations", route: "/services/workflow-automations" },
        { label: "AI Agent Development", route: "/services/ai-agentic-development" },
      ],
      qualificationState: null,
    };
  }

  // 8b. Pillar overview: Software/AI/Development, Digital Marketing, Creative Production
  const squash = (t) => normalize(t).replace(/\s+/g, ' ');
  const normSq = squash(message);
  for (const pillar of PILLARS) {
    const names = [pillar.title, ...pillar.aliases].map(squash);
    if (names.some((n) => normSq.includes(n))) {
      const list = APPROVED_SERVICES.filter((svc) => svc.pillar === pillar.id);
      return {
        text: `${pillar.title}: ${pillar.shortDesc}\n\nWhich of these would you like to know more about?\n• ${list.map((svc) => svc.title).join('\n• ')}`,
        quickReplies: list.map((svc) => ({ label: svc.title, text: `Tell me about ${svc.title}` })),
        links: [{ label: `See ${pillar.title}`, route: pillar.anchor }],
        qualificationState: null,
      };
    }
  }

  // 9. Specific Service Matcher (individual services)
  for (const service of APPROVED_SERVICES) {
    const slugWords = service.slug.replace(/-/g, ' ');
    const titleNorm = normalize(service.title);
    if (norm.includes(titleNorm) || norm.includes(slugWords) || (service.aliases || []).some((al) => norm.includes(al)) || (service.id === 'ai-agentic-development' && (norm.includes('ai agent') || norm.includes('agentic') || norm.includes('rag') || norm.includes('langgraph') || norm.includes('langchain'))) || (service.id === 'saas-development' && norm.includes('saas')) || (service.id === 'chatbot-development' && norm.includes('chatbot')) || (service.id === 'api-system-integration' && (norm.includes('api integration') || norm.includes('connect stripe') || norm.includes('connect crm'))) || (service.id === 'digital-marketing' && (norm.includes('seo') || norm.includes('growth marketing') || norm.includes('search ranking')))) {
      return {
        text: service.capabilities.length
          ? `${service.title}: ${service.shortDesc}\n\nThis includes:\n• ${service.capabilities.slice(0, 4).join('\n• ')}`
          : `${service.title}: ${service.shortDesc}`,
        quickReplies: [
          { label: `Start ${service.title} Project`, action: "start_project" },
          { label: "Explore Other Services", action: "explore_services" },
          { label: "Talk to the Team", text: "I would like to talk to the Ideate X team" },
        ],
        links: [
          { label: `Learn More: ${service.title}`, route: service.route },
          { label: "View Our Work", route: "/portfolio" },
        ],
        qualificationState: null,
      };
    }
  }

  // 10. Check Common FAQs
  for (const faq of COMMON_FAQS) {
    if (faq.keywords.some((k) => norm.includes(normalize(k)))) {
      return {
        text: faq.answer,
        quickReplies: [
          { label: "Start a Project", action: "start_project" },
          { label: "Explore Services", action: "explore_services" },
          { label: "Contact Us", text: "How can I contact the Ideate X team?" },
        ],
        links: faq.cta ? (faq.cta.route ? [{ label: faq.cta.label, route: faq.cta.route }] : []) : [],
        qualificationState: null,
      };
    }
  }

  // 11. Check CMS Knowledge Base Facts (Dynamic from Admin)
  for (const item of cmsKnowledge) {
    const titleNorm = normalize(item.title);
    const keywords = (item.keywords || []).map(normalize);
    if (norm.includes(titleNorm) || keywords.some((k) => k && norm.includes(k))) {
      const answer = (item.approvedAnswers && item.approvedAnswers.length > 0)
        ? item.approvedAnswers[0]
        : item.content;
      const links = (item.pageReferences || []).map((p) => ({
        label: `View ${p.replace('/', '').toUpperCase() || 'Page'}`,
        route: p,
      }));
      return {
        text: answer,
        quickReplies: [
          { label: "Start a Project", action: "start_project" },
          { label: "Explore Services", action: "explore_services" },
        ],
        links,
        qualificationState: null,
      };
    }
  }

  // 12. Tech Stack Question
  if (norm.includes('tech stack') || norm.includes('technologies') || norm.includes('framework') || norm.includes('python') || norm.includes('react') || norm.includes('nextjs')) {
    return {
      text: "The right technology depends on what is being built. Tell us about your project and the team will recommend an approach.",
      quickReplies: [
        { label: "Start a Project", action: "start_project" },
        { label: "Explore Services", action: "explore_services" },
      ],
      links: [{ label: "View Case Studies", route: "/case-studies" }],
      qualificationState: null,
    };
  }

  // 13. Natural Project Enquiry Intent Trigger
  if (norm.includes('want to build') || norm.includes('need someone to build') || norm.includes('looking for developers') || norm.includes('looking for a team')) {
    return {
      text: "We can help with that. Who will primarily use the product — your internal team, customers, businesses, or the general public?",
      quickReplies: [
        { label: "Internal Team", text: "For our internal team and operations" },
        { label: "Direct Customers / B2C", text: "For direct consumers / B2C" },
        { label: "Business Clients / B2B SaaS", text: "For business clients / B2B SaaS" },
      ],
      links: [],
      qualificationState: {
        step: "awaiting_platform",
        data: {
          project_description: message,
          target_users: "",
        },
      },
    };
  }

  // 14. Out-of-Scope or Unknown Question (Strict Knowledge Boundary, No Fabrications)
  return {
    text: "I'm here mainly to help with Ideate X, our creative, marketing and technology services, and project enquiries. Would you like to explore what we can build for your business or discuss a project?",
    quickReplies: [
      { label: "Explore Services", action: "explore_services" },
      { label: "Start a Project", action: "start_project" },
      { label: "Talk to the Team", text: "I'd like to contact the Ideate X team" },
    ],
    links: [
      { label: "Contact Ideate X", route: "/contact" },
      { label: "All Services", route: "/services" },
    ],
    qualificationState: null,
  };
}

/**
 * Robust Phone Number Extractor
 * Supports international formats (+91 98765 43210, +1 (555) 123-4567, 9876543210, 09876543210, etc.)
 */
export function extractPhone(text = '') {
  if (!text) return null;
  // Match common international/local phone number structures
  const phoneRegex = /(?:(?:\+|00)\d{1,4}[\s.-]*)?(?:\(?\d{2,5}\)?[\s.-]*)?\d{3,5}[\s.-]?\d{3,5}(?:[\s.-]?\d{1,4})?/g;
  const matches = text.match(phoneRegex);
  if (matches) {
    for (const raw of matches) {
      const trimmed = raw.trim();
      const digitsOnly = trimmed.replace(/\D/g, '');
      // Exclude generic 4-digit years like 2026 or small numbers; valid phones have 7 to 15 digits
      if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
        return trimmed;
      }
    }
  }
  return null;
}

/**
 * Email Extractor
 */
export function extractEmail(text = '') {
  if (!text) return null;
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0].trim().toLowerCase() : null;
}

/**
 * Step-by-Step Project Qualification Handler
 */
function handleQualificationFlow(message, qualificationState) {
  const step = qualificationState.step;
  const data = { ...qualificationState.data };

  // Step 1: Just gave project description -> Ask who it is for
  if (step === 'awaiting_description') {
    data.project_description = message;
    data.area = data.area || detectArea(message);
    data.service_label = AREA_LABELS[data.area];
    const audience = {
      development: {
        text: "Got it. Who will primarily use this product: your internal team, customers, businesses, or the general public?",
        quickReplies: [
          { label: "Internal Team", text: "Our internal team and operations" },
          { label: "B2B Businesses (SaaS)", text: "B2B businesses and client companies" },
          { label: "General Public / Consumers", text: "General consumers and public users" },
        ],
      },
      marketing: {
        text: "Got it. Who are you trying to reach? For example local customers, other businesses or a specific community.",
        quickReplies: [
          { label: "Local Customers", text: "Customers in our local area" },
          { label: "Businesses (B2B)", text: "Other businesses" },
          { label: "General Online Audience", text: "A broad online audience" },
        ],
      },
      creative: {
        text: "Got it. Who is the content for?",
        quickReplies: [
          { label: "Our Customers", text: "Our existing and potential customers" },
          { label: "Businesses (B2B)", text: "Business clients and partners" },
          { label: "Our Social Audience", text: "Our social media audience" },
        ],
      },
    }[data.area];
    return {
      text: audience.text,
      quickReplies: audience.quickReplies,
      links: [],
      qualificationState: {
        step: "awaiting_users",
        data,
      },
    };
  }

  // Step 2: Audience received -> Ask for platform / focus / intended use
  if (step === 'awaiting_users') {
    data.target_users = message;
    data.area = data.area || detectArea(data.project_description);
    data.service_label = AREA_LABELS[data.area];
    const focus = {
      development: {
        text: "What platform are you targeting for this release?",
        quickReplies: [
          { label: "Web Platform", text: "Web Application / Portal" },
          { label: "Mobile (iOS & Android)", text: "Mobile App (iOS & Android)" },
          { label: "Both Web & Mobile", text: "Both Web Platform and Mobile Apps" },
          { label: "Backend API / AI Agent", text: "Backend API / AI Agentic Workflow" },
        ],
      },
      marketing: {
        text: "Which areas are you most interested in?",
        quickReplies: [
          { label: "Search (SEO)", text: "Search engine optimization" },
          { label: "Social Media & Ads", text: "Social media marketing and paid advertising" },
          { label: "Growth & Conversion", text: "Growth marketing and conversion optimization" },
          { label: "Not Sure Yet", text: "Not sure yet" },
        ],
      },
      creative: {
        text: "Where will the content be used?",
        quickReplies: [
          { label: "Website / Ecommerce", text: "Our website or online store" },
          { label: "Social Media", text: "Social media channels" },
          { label: "Ads & Campaigns", text: "Advertising and campaigns" },
          { label: "Catalogue", text: "A product catalogue" },
        ],
      },
    }[data.area];
    return {
      text: focus.text,
      quickReplies: focus.quickReplies,
      links: [],
      qualificationState: {
        step: "awaiting_platform",
        data,
      },
    };
  }

  // Step 3: Platform received -> Ask for timeline / budget
  if (step === 'awaiting_platform') {
    data.platform = message;
    return {
      text: "Do you have a target timeline or approximate budget in mind?",
      quickReplies: [
        { label: "As Soon as Possible", text: "As soon as possible" },
        { label: "Within 1–3 Months", text: "Within the next 1–3 months" },
        { label: "Flexible Timeline", text: "Timeline is flexible based on scope" },
      ],
      links: [],
      qualificationState: {
        step: "awaiting_timeline_budget",
        data,
      },
    };
  }

  // Step 4: Timeline / Budget received -> Ask for Contact Info (Name, Email & Mobile Number)
  if (step === 'awaiting_timeline_budget') {
    data.timeline = message;
    return {
      text: "Almost done! Please share your **Name**, **Email**, and **Mobile / WhatsApp Number** so the Ideate X team can review your requirements and reach out.",
      quickReplies: [],
      links: [],
      qualificationState: {
        step: "awaiting_contact",
        data,
      },
    };
  }

  // Step 5: Contact Info Collection & Validation
  if (step === 'awaiting_contact' || step === 'awaiting_email' || step === 'awaiting_phone' || step === 'ready_to_submit') {
    const extractedEmail = extractEmail(message);
    const extractedPhone = extractPhone(message);

    if (extractedEmail) {
      data.email = extractedEmail;
    }
    if (extractedPhone) {
      data.phone = extractedPhone;
    }

    // Try to extract name if not already set or placeholder
    if (!data.name || data.name === "Prospective Client" || data.name === "Website Lead") {
      let cleanText = message;
      if (extractedEmail) cleanText = cleanText.replace(extractedEmail, '');
      if (extractedPhone) cleanText = cleanText.replace(extractedPhone, '');
      cleanText = cleanText
        .replace(/[,\n|;:]/g, ' ')
        .replace(/\b(my name is|i am|name|email|phone|mobile|number|call me at|reach me at|ph|whatsapp)\b/gi, '')
        .trim();
      if (cleanText.length > 1 && cleanText.length < 40 && !cleanText.toLowerCase().includes('skip')) {
        data.name = cleanText;
      }
    }

    const isSkip = message.toLowerCase().trim() === 'skip' || message.toLowerCase().trim() === 'no' || message.toLowerCase().trim() === 'none';

    // 1. If no email detected yet, ask for email
    if (!data.email) {
      return {
        text: "Thanks! What is the best **Email Address** to send the details of your enquiry to?",
        quickReplies: [],
        links: [],
        qualificationState: {
          step: "awaiting_email",
          data,
        },
      };
    }

    // 2. If email is present, but no phone and not skipped, prompt for phone
    if (!data.phone && !isSkip && step !== 'ready_to_submit') {
      return {
        text: `Got your email (**${data.email}**)! Could you also share your **Mobile / WhatsApp Number** (with country code) so the team can coordinate quickly?\n\n*(Or click 'Skip Phone' if you prefer email only)*`,
        quickReplies: [
          { label: "Skip Phone (Email Only)", text: "skip" }
        ],
        links: [],
        qualificationState: {
          step: "awaiting_phone",
          data,
        },
      };
    }

    // 3. Ready for submission!
    const phoneDisplay = data.phone ? `\n• **Mobile / Phone**: ${data.phone}` : '';
    return {
      text: `Thanks ${data.name || 'there'}! I have a clear picture of what you need:\n\n• **Project**: ${data.project_description || 'Custom Apps Project'}\n• **${data.area === 'marketing' ? 'Focus' : data.area === 'creative' ? 'Intended use' : 'Platform'}**: ${data.platform || 'Web / Mobile'}\n• **Target Audience**: ${data.target_users || 'Direct Users'}\n• **Timeline**: ${data.timeline || 'Standard Timeline'}\n• **Email**: ${data.email}${phoneDisplay}\n\nClick **Send Project Enquiry** below to submit this directly to the Ideate X team.`,
      quickReplies: [
        { label: "Send Project Enquiry", action: "submit_enquiry" },
        { label: "Contact Us Directly", text: "I want to email or call directly" },
      ],
      links: [{ label: "Contact Page", route: "/contact" }],
      isReadyForSubmission: true,
      qualificationState: {
        step: "ready_to_submit",
        data,
      },
    };
  }

  // Default fallback if ready to submit
  const phoneDisplay = data.phone ? `\n• **Mobile / Phone**: ${data.phone}` : '';
  return {
    text: `Your project details are ready.${phoneDisplay}\n\nYou can click 'Send Project Enquiry' below to connect with the Ideate X team.`,
    quickReplies: [{ label: "Send Project Enquiry", action: "submit_enquiry" }],
    links: [{ label: "Contact Us", route: "/contact" }],
    isReadyForSubmission: true,
    qualificationState,
  };
}
