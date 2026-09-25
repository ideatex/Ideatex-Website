import {
  COMPANY_PROFILE,
  APPROVED_SERVICES,
  PAGE_ROUTES,
  COMMON_FAQS,
  CHAT_STARTERS,
  SERVICE_QUICK_ACTIONS,
} from '@/constants/chatbotKnowledge';
import { readDb } from './cms-db';

/**
 * Normalizes text for clean fuzzy keyword matching
 */
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
      text: "We specialize in 9 core digital and software engineering areas. Which one would you like to explore?",
      quickReplies: [
        { label: "AI Agents", text: "Tell me about AI Agentic Development" },
        { label: "Workflow Automation", text: "Tell me about Workflow Automations" },
        { label: "Build an App", text: "I want to build an app" },
        { label: "Build a SaaS", text: "Tell me about SaaS Development" },
        { label: "API Integrations", text: "Tell me about API Integrations" },
        { label: "SEO & Growth", text: "Tell me about SEO & Growth Marketing" },
      ],
      links: [{ label: "View All Services", route: "/services" }],
      qualificationState: null,
    };
  }

  // 3. Action: How Ideate X Works
  if (action === 'how_we_work' || norm.includes('how does ideate x work') || norm.includes('how do you work') || norm.includes('delivery process')) {
    return {
      text: "We work directly with founders and teams through a disciplined 4-step process: Discovery & Blueprint, Architecture & UX, High-Velocity Sprints, and Production Launch. You work directly with senior engineers with 100% code ownership.",
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
      text: "Great! Tell me briefly what you're looking to build.",
      quickReplies: [
        { label: "Web Application", text: "I need a custom web application" },
        { label: "Mobile App", text: "I need a mobile app for iOS and Android" },
        { label: "AI Agent / Workflow", text: "I want to build an AI agent or automated workflow" },
        { label: "SaaS Platform", text: "I want to build a SaaS product" },
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
        { label: "Data Sync Between Tools", text: "Moving data between multiple software tools" },
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

  // 9. Specific Service Matcher (Exact 9 Services)
  for (const service of APPROVED_SERVICES) {
    const slugWords = service.slug.replace(/-/g, ' ');
    const titleNorm = normalize(service.title);
    if (norm.includes(titleNorm) || norm.includes(slugWords) || (service.id === 'ai-agentic-development' && (norm.includes('ai agent') || norm.includes('agentic') || norm.includes('rag') || norm.includes('langgraph') || norm.includes('langchain'))) || (service.id === 'saas-development' && norm.includes('saas')) || (service.id === 'chatbot-development' && norm.includes('chatbot')) || (service.id === 'api-system-integration' && (norm.includes('api integration') || norm.includes('connect stripe') || norm.includes('connect crm'))) || (service.id === 'digital-marketing' && (norm.includes('seo') || norm.includes('growth marketing') || norm.includes('search ranking')))) {
      return {
        text: `${service.title}: ${service.shortDesc}\n\nKey capabilities include:\n• ${service.capabilities.slice(0, 3).join('\n• ')}`,
        quickReplies: [
          { label: `Start ${service.title} Project`, action: "start_project" },
          { label: "Explore Other Services", action: "explore_services" },
          { label: "Talk to Engineering Lead", text: "I would like to talk to an engineering lead" },
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
      text: "We engineer systems using Next.js, React 19, TypeScript, Node.js, Python, FastAPI, PostgreSQL, Supabase, Redis, LangGraph/LangChain, React Native, and Flutter.",
      quickReplies: [
        { label: "Start a Project", action: "start_project" },
        { label: "Explore Services", action: "explore_services" },
      ],
      links: [{ label: "View Architecture Case Studies", route: "/case-studies" }],
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
    text: "I'm here mainly to help with Ideate X, our software engineering services, and project enquiries. Would you like to explore what we can build for your business or discuss a project?",
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

  // Step 1: Just gave project description -> Ask for target users
  if (step === 'awaiting_description') {
    data.project_description = message;
    return {
      text: "Got it. Who will primarily use this product — your internal team, customers, businesses, or the general public?",
      quickReplies: [
        { label: "Internal Team", text: "Our internal team and operations" },
        { label: "B2B Businesses (SaaS)", text: "B2B businesses and client companies" },
        { label: "General Public / Consumers", text: "General consumers and public users" },
      ],
      links: [],
      qualificationState: {
        step: "awaiting_users",
        data,
      },
    };
  }

  // Step 2: Target users received -> Ask for platform
  if (step === 'awaiting_users') {
    data.target_users = message;
    return {
      text: "What platform are you targeting for this release?",
      quickReplies: [
        { label: "Web Platform", text: "Web Application / Portal" },
        { label: "Mobile (iOS & Android)", text: "Mobile App (iOS & Android)" },
        { label: "Both Web & Mobile", text: "Both Web Platform and Mobile Apps" },
        { label: "Backend API / AI Agent", text: "Backend API / AI Agentic Workflow" },
      ],
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
      text: "Do you have a target launch timeline or approximate budget in mind?",
      quickReplies: [
        { label: "Immediate (1–2 Months)", text: "Targeting launch in 1–2 months" },
        { label: "2–4 Months", text: "Targeting launch in 2–4 months" },
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
        text: "Thanks! What is the best **Email Address** to send your project blueprint and estimate to?",
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
        text: `Got your email (**${data.email}**)! Could you also share your **Mobile / WhatsApp Number** (with country code) so our engineers can coordinate quickly?\n\n*(Or click 'Skip Phone' if you prefer email only)*`,
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
      text: `Thanks ${data.name || 'there'}! I have a clear picture of what you're looking to build:\n\n• **Project**: ${data.project_description || 'Custom Software Project'}\n• **Platform**: ${data.platform || 'Web / Mobile'}\n• **Target Audience**: ${data.target_users || 'Direct Users'}\n• **Timeline**: ${data.timeline || 'Standard Timeline'}\n• **Email**: ${data.email}${phoneDisplay}\n\nClick **Send Project Enquiry** below to submit this directly to the Ideate X team.`,
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
    text: `Your project details are ready.${phoneDisplay}\n\nYou can click 'Send Project Enquiry' below to connect with our engineering team.`,
    quickReplies: [{ label: "Send Project Enquiry", action: "submit_enquiry" }],
    links: [{ label: "Contact Us", route: "/contact" }],
    isReadyForSubmission: true,
    qualificationState,
  };
}
