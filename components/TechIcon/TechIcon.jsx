import React from 'react';
import {
  Code, Server, Database, Cloud, Cpu, Globe, Smartphone,
  Layers, Bot, Zap, Search, Megaphone, Terminal, Shield,
  Workflow, GitBranch, RefreshCw, BarChart3, Activity, Lock,
  Key, Sliders, Monitor, Radio, Compass, ShieldCheck,
  CheckCircle2, Box, Sparkles, Network, HardDrive, Palette,
  FileCode, Film, FileSpreadsheet, Kanban, Webhook, Container,
  Gauge, PenTool, Layout, Rocket, LineChart
} from 'lucide-react';
import { getBrandIcon, brandColor } from './brandIcons';

/**
 * Modern Precision Vector Icons for Tech Stacks & Tools
 * Covers 100% of the authentic logos across all 10 Services with official brand geometry & dark-mode colors.
 */
export function TechIcon({ name, size = 24, className = "", onLight = false }) {
  const norm = (name || "").toLowerCase().trim();
  const baseSvgProps = {
    width: size,
    height: size,
    preserveAspectRatio: "xMidYMid meet",
    className: `tech-icon-svg ${className}`.trim(),
    style: { display: 'block', margin: 'auto', flexShrink: 0 }
  };

  // Official brand logo when one is available (falls through to the drawn icons below otherwise)
  const brand = getBrandIcon(norm);
  if (brand) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill={brandColor(brand.hex, onLight)} role="img" aria-label={brand.title}>
        <title>{brand.title}</title>
        <path d={brand.path} />
      </svg>
    );
  }

  // ─── 1. REACT & REACT NATIVE ───
  if (norm === 'react' || norm === 'react native' || (norm.includes('react') && !norm.includes('query') && !norm.includes('architect'))) {
    return (
      <svg {...baseSvgProps} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#58C4DC" />
        <g stroke="#58C4DC" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // ─── 2. NEXT.JS ───
  if (norm.includes('next.js') || norm === 'nextjs') {
    return (
      <svg {...baseSvgProps} viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" fill="#000000" r="88" stroke="rgba(255,255,255,0.25)" strokeWidth="4" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
        <rect fill="white" height="72" width="12" x="115" y="54" />
      </svg>
    );
  }

  // ─── 3. TYPESCRIPT ───
  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11.5 9.5H6.5V7.5H16.5V9.5H11.5V17.5H9.5V9.5H11.5Z" fill="white" />
        <path d="M17.8 12.2C16.8 11.9 15.6 11.5 15.6 10.6C15.6 9.8 16.3 9.4 17.2 9.4C18.1 9.4 19 9.8 19.5 10.3L20.5 8.9C19.7 8 18.5 7.6 17.1 7.6C14.9 7.6 13.5 8.9 13.5 10.8C13.5 12.6 14.8 13.4 16.5 13.9C17.6 14.3 18.5 14.8 18.5 15.8C18.5 16.8 17.5 17.3 16.4 17.3C15.1 17.3 13.9 16.7 13.1 15.8L12 17.3C13.1 18.6 14.7 19.2 16.4 19.2C19 19.2 20.6 17.8 20.6 15.6C20.6 13.6 19.2 12.6 17.8 12.2Z" fill="white" />
      </svg>
    );
  }

  // ─── 4. TAILWIND CSS ───
  if (norm.includes('tailwind')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8" />
      </svg>
    );
  }

  // ─── 5. VANILLA CSS / CSS3 ───
  if (norm.includes('vanilla css') || (norm.includes('css') && !norm.includes('tailwind'))) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M4 3L5.5 19.5L12 21.5L18.5 19.5L20 3H4Z" fill="#1572B6" />
        <path d="M12 4.5V19.8L17.2 18.2L18.4 4.5H12Z" fill="#33A9DC" />
        <path d="M8 7H16L15.6 11H8.4L8.6 13H15.4L15 17L12 17.8L9 17L8.8 15H7L7.4 18.8L12 20.1L16.6 18.8L17.4 9H7.8L8 7Z" fill="white" />
      </svg>
    );
  }

  // ─── 6. NODE.JS ───
  if (norm === 'node.js' || norm === 'nodejs') {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3.5 6.9V16.7L12 21.6L20.5 16.7V6.9L12 2Z" fill="#339933" opacity="0.25" />
        <path d="M12 2.5L4 7.1V16.9L12 21.5L20 16.9V7.1L12 2.5Z" stroke="#5FA04E" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 12V21.5M12 12L4 7.1M12 12L20 7.1" stroke="#5FA04E" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    );
  }

  // ─── 7. NESTJS / NODE.JS (NESTJS) ───
  if (norm.includes('nest')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 9.5L5.8 22H18.2L22 9.5L12 2Z" fill="#E0234E" opacity="0.25" />
        <path d="M12 3.5L3.8 9.8L6.8 20.5H17.2L20.2 9.8L12 3.5Z" stroke="#E0234E" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 7V17M8 10L12 14L16 10" stroke="#E0234E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // ─── 8. PYTHON ───
  if (norm === 'python') {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M11.9 2C6.7 2 7 4.3 7 4.3L7.01 6.6H12.1V7.4H4.5C2.3 7.4 2 9.6 2 9.6V13.8C2 15.6 3.5 15.7 3.5 15.7H5V13.5C5 10.9 7.2 10.9 7.2 10.9H12C14.5 10.9 14.5 8.7 14.5 8.7V4.5C14.5 2.5 11.9 2 11.9 2ZM9.5 3.7C10 3.7 10.4 4.1 10.4 4.6C10.4 5.1 10 5.5 9.5 5.5C9 5.5 8.6 5.1 8.6 4.6C8.6 4.1 9 3.7 9.5 3.7Z" fill="#387EB8" />
        <path d="M12.1 22C17.3 22 17 19.7 17 19.7L16.99 17.4H11.9V16.6H19.5C21.7 16.6 22 14.4 22 14.4V10.2C22 8.4 20.5 8.3 20.5 8.3H19V10.5C19 13.1 16.8 13.1 16.8 13.1H12C9.5 13.1 9.5 15.3 9.5 15.3V19.5C9.5 21.5 12.1 22 12.1 22ZM14.5 20.3C14 20.3 13.6 19.9 13.6 19.4C13.6 18.9 14 18.5 14.5 18.5C15 18.5 15.4 18.9 15.4 19.4C15.4 19.9 15 20.3 14.5 20.3Z" fill="#FFE052" />
      </svg>
    );
  }

  // ─── 9. FASTAPI / PYTHON (FASTAPI) ───
  if (norm.includes('fastapi')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#059669" opacity="0.25" stroke="#059669" strokeWidth="1.5" />
        <path d="M13 4L6.5 13.5H12L11 20L17.5 10.5H12L13 4Z" fill="#10B981" />
      </svg>
    );
  }

  // ─── 10. GO (GOLANG / GIN) ───
  if (norm.startsWith('go') || norm.includes('golang') || norm.includes('gin')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00ACD7" opacity="0.2" />
        <path d="M5 10C5 8.3 6.6 7.2 8.8 7.2C10.5 7.2 11.6 8 12.1 9L10.3 10.1C10 9.6 9.5 9.1 8.8 9.1C7.6 9.1 6.9 9.9 6.9 11C6.9 12.1 7.6 12.9 8.8 12.9C9.6 12.9 10.1 12.5 10.4 11.9H8.8V10.4H12.3V14C11.4 14.6 10.2 14.8 8.8 14.8C6.6 14.8 5 13.4 5 11V10Z" fill="#00ACD7" />
        <path d="M13.5 11.1C13.5 9.2 15 7.5 17.2 7.5C19.5 7.5 21 9.2 21 11.1C21 13 19.5 14.7 17.2 14.7C15 14.7 13.5 13 13.5 11.1ZM19.2 11.1C19.2 9.9 18.3 9.1 17.2 9.1C16.2 9.1 15.3 9.9 15.3 11.1C15.3 12.3 16.2 13.1 17.2 13.1C18.3 13.1 19.2 12.3 19.2 11.1Z" fill="#00ACD7" />
      </svg>
    );
  }

  // ─── 11. POSTGRESQL & PGVECTOR ───
  if (norm.includes('postgres') || norm.includes('pgvector')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M12 3C7.5 3 4 5.5 4 8.5C4 11 6.5 13.2 10 13.8V17L13 15.5V13.9C17 13.5 20 11.2 20 8.5C20 5.5 16.5 3 12 3Z" fill="#336791" opacity="0.25" stroke="#4169E1" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="9" cy="8" r="1.2" fill="#4169E1" />
        <circle cx="15" cy="8" r="1.2" fill="#4169E1" />
        <path d="M10 11C11 11.8 13 11.8 14 11" stroke="#4169E1" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 12. REDIS & REDIS (UPSTASH) ───
  if (norm.includes('redis')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#DC382D" />
        <path d="M2 12L12 17L22 12" stroke="#DC382D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="#DC382D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // ─── 13. PRISMA ───
  if (norm.includes('prisma')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 19L11 22L21 9L12 2Z" fill="#2D3748" stroke="#5A67D8" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 2L11 22M3 19L21 9" stroke="#5A67D8" strokeWidth="1.2" opacity="0.6" />
      </svg>
    );
  }

  // ─── 14. SUPABASE & SUPABASE AUTH ───
  if (norm.includes('supabase')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M13.2 2.5L2.8 15.5C2.3 16.1 2.8 17 3.6 17H11.5L10.8 21.5L21.2 8.5C21.7 7.9 21.2 7 20.4 7H12.5L13.2 2.5Z" fill="#3ECF8E" />
      </svg>
    );
  }

  // ─── 15. DOCKER ───
  if (norm.includes('docker')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect x="5" y="9" width="2.5" height="2" rx="0.4" fill="#2496ED" />
        <rect x="8.5" y="9" width="2.5" height="2" rx="0.4" fill="#2496ED" />
        <rect x="12" y="9" width="2.5" height="2" rx="0.4" fill="#2496ED" />
        <rect x="8.5" y="6" width="2.5" height="2" rx="0.4" fill="#2496ED" />
        <rect x="12" y="6" width="2.5" height="2" rx="0.4" fill="#2496ED" />
        <path d="M22 13C21.5 12.8 20.5 12.8 19.8 13.3C19.2 12.2 18 11.5 16.5 11.5H3C2.5 13.5 3 17 6.5 18.5C11 20.5 17 19.5 20.5 16.5C21.8 15.5 22 14.5 22 13Z" fill="#2496ED" opacity="0.35" stroke="#2496ED" strokeWidth="1.5" />
      </svg>
    );
  }

  // ─── 16. AWS (ECS, RDS, S3) / AWS CLOUDFRONT / AWS ECS / AWS WELL-ARCHITECTED ───
  if (norm.includes('aws')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M6 10L4.5 14H6.5L7 12.5H9L9.5 14H11.5L10 10H8.5L8 11.5H7.5L7 10H6Z" fill="#FF9900" />
        <path d="M12.5 10L11.5 14H13L13.5 11.8L14.5 14H15.5L16.5 11.8L17 14H18.5L17.5 10H16L15 12.8L14 10H12.5Z" fill="#FF9900" />
        <path d="M4 17.5C9 20.5 15 20.5 20 17.5M17.5 16.8L20 17.5L19 19.8" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // ─── 17. VERCEL ───
  if (norm.includes('vercel')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 20H2L12 2Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // ─── 18. GITHUB & GITHUB ACTIONS ───
  if (norm.includes('github')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#24292E" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
        <path d="M12 5.5C8.4 5.5 5.5 8.4 5.5 12C5.5 14.9 7.4 17.3 10 18.2C10.3 18.3 10.4 18.1 10.4 17.9V16.8C8.2 17.3 7.7 15.8 7.7 15.8C7.3 14.8 6.7 14.5 6.7 14.5C6 14 6.8 14 6.8 14C7.6 14.1 8 14.8 8 14.8C8.7 16 9.8 15.6 10.2 15.4C10.3 14.9 10.5 14.5 10.7 14.3C8.9 14.1 7.1 13.4 7.1 10.3C7.1 9.4 7.4 8.7 8 8.1C7.9 7.9 7.6 7 8.1 5.9C8.1 5.9 8.8 5.7 10.4 6.8C11.1 6.6 11.8 6.5 12.5 6.5C13.2 6.5 13.9 6.6 14.6 6.8C16.2 5.7 16.9 5.9 16.9 5.9C17.4 7 17.1 7.9 17 8.1C17.6 8.7 17.9 9.4 17.9 10.3C17.9 13.4 16.1 14.1 14.3 14.3C14.6 14.6 14.8 15.1 14.8 15.9V17.9C14.8 18.1 14.9 18.3 15.2 18.2C17.8 17.3 19.7 14.9 19.7 12C19.7 8.4 16.6 5.5 12 5.5Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // ─── 19. TERRAFORM ───
  if (norm.includes('terraform')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M8.5 2.5L2 6.2V13.8L8.5 10V2.5Z" fill="#7B42BC" />
        <path d="M15.5 6.5L9 10.2V17.8L15.5 14V6.5Z" fill="#844FBA" />
        <path d="M22 6.5L15.5 10.2V17.8L22 14V6.5Z" fill="#5C4EE5" />
        <path d="M9 17.8L15.5 21.5V14L9 10.2V17.8Z" fill="#7B42BC" opacity="0.85" />
      </svg>
    );
  }

  // ─── 20. OPENAI API / OPENAI GPT-4O ───
  if (norm.includes('openai')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M20.5 9.7C20.2 7.7 18.7 6.2 16.7 6.1C16.4 4.5 15.1 3.3 13.5 3.1C11.5 2.8 9.6 3.8 8.7 5.5C7 5.7 5.6 7 5.4 8.7C3.9 9.3 2.9 10.9 3.1 12.7C3.3 14.4 4.6 15.8 6.3 16.1C6.6 17.7 7.9 18.9 9.5 19.1C11.5 19.4 13.4 18.4 14.3 16.7C16 16.5 17.4 15.2 17.6 13.5C19.1 12.9 20.1 11.3 19.9 9.5L20.5 9.7Z" fill="#10A37F" opacity="0.25" />
        <path d="M12 7.5V16.5M7.5 10L16.5 14M7.5 14L16.5 10" stroke="#10A37F" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3.5" stroke="#10A37F" strokeWidth="1.5" />
      </svg>
    );
  }

  // ─── 21. ANTHROPIC CLAUDE / CLAUDE 3.5 SONNET ───
  if (norm.includes('anthropic') || norm.includes('claude')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#D97706" opacity="0.2" stroke="#D97706" strokeWidth="1.2" />
        <path d="M12 5V19M5 12H19M7 7L17 17M7 17L17 7" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 22. LANGCHAIN ───
  if (norm === 'langchain') {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#1C3C3C" stroke="#2DD4BF" strokeWidth="1.2" />
        <path d="M8 8H16V16H8V8Z" stroke="#2DD4BF" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="8" cy="8" r="2.5" fill="#2DD4BF" />
        <circle cx="16" cy="16" r="2.5" fill="#2DD4BF" />
      </svg>
    );
  }

  // ─── 23. LANGGRAPH ───
  if (norm.includes('langgraph')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#0F2D2D" stroke="#14B8A6" strokeWidth="1.2" />
        <circle cx="6.5" cy="12" r="2.5" fill="#14B8A6" />
        <circle cx="17.5" cy="6.5" r="2.5" fill="#14B8A6" />
        <circle cx="17.5" cy="17.5" r="2.5" fill="#14B8A6" />
        <path d="M8.5 11L15.5 7.5M8.5 13L15.5 16.5M17.5 9V15" stroke="#14B8A6" strokeWidth="1.5" />
      </svg>
    );
  }

  // ─── 24. LLAMAINDEX ───
  if (norm.includes('llama')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#7C3AED" opacity="0.25" stroke="#A78BFA" strokeWidth="1.2" />
        <path d="M7 18V6H10V15H17V18H7Z" fill="#A78BFA" />
      </svg>
    );
  }

  // ─── 25. PINECONE ───
  if (norm.includes('pinecone')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" fill="#047857" opacity="0.25" stroke="#10B981" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" fill="#10B981" />
        <path d="M12 2V9M12 15V22M4 7L10 10.5M14 13.5L20 17M20 7L14 10.5M10 13.5L4 17" stroke="#10B981" strokeWidth="1.2" />
      </svg>
    );
  }

  // ─── 26. QDRANT ───
  if (norm.includes('qdrant')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#DC2626" opacity="0.25" stroke="#EF4444" strokeWidth="1.5" />
        <path d="M12 6L18 9.5V14.5L12 18L6 14.5V9.5L12 6Z" stroke="#EF4444" strokeWidth="1.5" fill="#EF4444" fillOpacity="0.4" />
      </svg>
    );
  }

  // ─── 27. UNSTRUCTURED.IO ───
  if (norm.includes('unstructured')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#0E7490" opacity="0.25" stroke="#06B6D4" strokeWidth="1.2" />
        <path d="M7 6H17V9H7V6ZM7 11H13V14H7V11ZM7 16H17V19H7V16Z" fill="#06B6D4" />
      </svg>
    );
  }

  // ─── 28. CELERY ───
  if (norm.includes('celery')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#84CC16" opacity="0.25" stroke="#84CC16" strokeWidth="1.5" />
        <path d="M12 6V18M7 10C7 10 9 8 12 8C15 8 17 10 17 10M8 14C8 14 10 12 12 12C14 12 16 14 16 14" stroke="#84CC16" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 29. LANGFUSE ───
  if (norm.includes('langfuse')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1.5" />
        <path d="M12 4L14.5 9.5H19.5L15.5 13L17 18.5L12 15L7 18.5L8.5 13L4.5 9.5H9.5L12 4Z" fill="#818CF8" />
      </svg>
    );
  }

  // ─── 30. LANGSMITH ───
  if (norm.includes('langsmith')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
        <path d="M12 5L19 12L12 19L5 12L12 5Z" stroke="#38BDF8" strokeWidth="1.8" fill="#38BDF8" fillOpacity="0.3" />
      </svg>
    );
  }

  // ─── 31. OPENTELEMETRY ───
  if (norm.includes('opentelemetry')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
        <circle cx="8" cy="12" r="2.5" fill="#F59E0B" />
        <circle cx="16" cy="8" r="2" fill="#38BDF8" />
        <circle cx="16" cy="16" r="2" fill="#38BDF8" />
        <path d="M10.5 12H14M14 12L16 9M14 12L16 15" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 32. WEIGHTS & BIASES ───
  if (norm.includes('weights')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#111827" stroke="#FFBE00" strokeWidth="1.2" />
        <path d="M6 18L10 6L14 18L18 6" stroke="#FFBE00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // ─── 33. CLERK ───
  if (norm.includes('clerk')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#6C47FF" />
        <path d="M12 5L6 8V12.5C6 16.5 8.5 20 12 21C15.5 20 18 16.5 18 12.5V8L12 5Z" fill="#8B6CFF" stroke="white" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="2" fill="white" />
      </svg>
    );
  }

  // ─── 34. NEXTAUTH / AUTH ───
  if (norm.includes('nextauth') || (norm.includes('auth') && !norm.includes('supabase') && !norm.includes('clerk'))) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#7C3AED" opacity="0.25" stroke="#A78BFA" strokeWidth="1.5" />
        <path d="M12 7V17M7 12H17" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" fill="#A78BFA" />
      </svg>
    );
  }

  // ─── 35. STRIPE BILLING / STRIPE ───
  if (norm.includes('stripe')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#635BFF" />
        <path d="M11.5 9.8C11.5 9.1 12.1 8.7 13.1 8.7C14.3 8.7 15.8 9.1 16.9 9.7V6.5C15.7 6 14.4 5.8 13.1 5.8C9.6 5.8 7.5 7.6 7.5 10.1C7.5 14 12.8 13.3 12.8 15.2C12.8 16 12 16.4 10.9 16.4C9.5 16.4 7.8 15.8 6.5 15.1V18.4C7.9 19 9.5 19.3 10.9 19.3C14.6 19.3 16.8 17.5 16.8 14.9C16.8 10.7 11.5 11.5 11.5 9.8Z" fill="white" />
      </svg>
    );
  }

  // ─── 36. LEMONSQUEEZY ───
  if (norm.includes('lemon')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#FFE500" />
        <path d="M12 4C16 4 19 8 19 12C19 16 16 20 12 20C8 20 5 16 5 12C5 8 8 4 12 4Z" fill="#FFD000" stroke="#333" strokeWidth="1" />
        <path d="M12 7V17M7 12H17" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 37. PADDLE ───
  if (norm.includes('paddle')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#384252" stroke="#4FD1C5" strokeWidth="1.2" />
        <path d="M7 6H13C15.2 6 17 7.8 17 10C17 12.2 15.2 14 13 14H7V6Z" fill="#4FD1C5" />
        <path d="M7 14H10V19H7V14Z" fill="#4FD1C5" />
      </svg>
    );
  }

  // ─── 38. RESEND ───
  if (norm.includes('resend')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#000000" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <path d="M7 7H13.5C15.5 7 17 8.5 17 10.5C17 12.5 15.5 14 13.5 14H7V7Z" stroke="white" strokeWidth="1.8" />
        <path d="M12 14L17 18M7 7V18" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 39. GSAP ───
  if (norm.includes('gsap')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#0AE448" opacity="0.25" stroke="#0AE448" strokeWidth="1.5" />
        <path d="M8 12L11 8L16 16" stroke="#0AE448" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="11" cy="8" r="1.5" fill="#0AE448" />
      </svg>
    );
  }

  // ─── 40. FRAMER MOTION ───
  if (norm.includes('framer')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M4 2H20V9H12L4 2Z" fill="#0055FF" />
        <path d="M4 9H12L20 16H4V9Z" fill="#0055FF" />
        <path d="M4 16H12V23L4 16Z" fill="#0055FF" />
      </svg>
    );
  }

  // ─── 41. LENIS SMOOTH SCROLL ───
  if (norm.includes('lenis')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect x="7" y="3" width="10" height="18" rx="5" stroke="#EC4899" strokeWidth="1.8" fill="#EC4899" fillOpacity="0.2" />
        <circle cx="12" cy="8" r="1.5" fill="#EC4899" />
      </svg>
    );
  }

  // ─── 42. THREE.JS ───
  if (norm.includes('three.js') || norm === 'threejs') {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 22V12M2 7L12 12L22 7M12 12L2 17M12 12L22 17" stroke="#FFFFFF" strokeWidth="1" opacity="0.65" />
      </svg>
    );
  }

  // ─── 43. SANITY.IO ───
  if (norm.includes('sanity')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#F03E2F" opacity="0.25" stroke="#F03E2F" strokeWidth="1.5" />
        <path d="M7 8H17M7 12H14M7 16H11" stroke="#F03E2F" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 44. CONTENTFUL ───
  if (norm.includes('contentful')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#1C1F2B" stroke="#2478CC" strokeWidth="1.5" />
        <path d="M8 8C8 6 12 6 12 8C12 10 8 10 8 12C8 14 12 14 12 16C12 18 8 18 8 16" stroke="#2478CC" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="12" r="2" fill="#ECA227" />
      </svg>
    );
  }

  // ─── 45. STRAPI ───
  if (norm.includes('strapi')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M4 12L12 4L20 12L12 20L4 12Z" fill="#4945FF" opacity="0.25" stroke="#8C4BFF" strokeWidth="1.5" />
        <path d="M12 7L17 12L12 17L7 12L12 7Z" fill="#8C4BFF" />
      </svg>
    );
  }

  // ─── 46. PRISMIC ───
  if (norm.includes('prismic')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#5163BA" opacity="0.25" stroke="#5163BA" strokeWidth="1.5" />
        <path d="M12 6L17 15H7L12 6Z" fill="#5163BA" />
      </svg>
    );
  }

  // ─── 47. CLOUDFLARE ───
  if (norm.includes('cloudflare')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M18.5 11C18 8.5 15.8 6.5 13 6.5C10.7 6.5 8.7 7.9 7.8 9.8C5.6 10.2 4 12.1 4 14.5C4 17 6 19 8.5 19H18.5C20.4 19 22 17.4 22 15.5C22 13.6 20.5 12 18.5 11Z" fill="#F38020" opacity="0.25" stroke="#F38020" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }

  // ─── 48. EXPO / EAS BUILD ───
  if (norm.includes('expo') || norm.includes('eas')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#000020" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <path d="M6 18L12 6L18 18H14.5L12 12.5L9.5 18H6Z" fill="white" />
      </svg>
    );
  }

  // ─── 49. ZUSTAND ───
  if (norm.includes('zustand')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#4B382A" stroke="#B45309" strokeWidth="1.5" />
        <circle cx="8" cy="11" r="1.5" fill="#FDE68A" />
        <circle cx="16" cy="11" r="1.5" fill="#FDE68A" />
        <path d="M10 15C11 16 13 16 14 15" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 50. REACT QUERY / TANSTACK ───
  if (norm.includes('query')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#FF4154" opacity="0.25" stroke="#FF4154" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="6" stroke="#FF4154" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.5" fill="#FF4154" />
      </svg>
    );
  }

  // ─── 51. SQLITE ───
  if (norm.includes('sqlite')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="#003B57" stroke="#0080CD" strokeWidth="1.5" />
        <path d="M4 6V12C4 13.7 7.6 15 12 15C16.4 15 20 13.7 20 12V6" stroke="#0080CD" strokeWidth="1.5" />
        <path d="M4 12V18C4 19.7 7.6 21 12 21C16.4 21 20 19.7 20 18V12" stroke="#0080CD" strokeWidth="1.5" />
      </svg>
    );
  }

  // ─── 52. MMKV ───
  if (norm.includes('mmkv')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#07C160" opacity="0.25" stroke="#07C160" strokeWidth="1.5" />
        <path d="M7 16V8L12 13L17 8V16" stroke="#07C160" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // ─── 53. GRAPHQL ───
  if (norm.includes('graphql')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <polygon points="12 2, 21 7.2, 21 16.8, 12 22, 3 16.8, 3 7.2" stroke="#E10098" strokeWidth="1.5" fill="#E10098" fillOpacity="0.15" />
        <line x1="12" y1="2" x2="12" y2="22" stroke="#E10098" strokeWidth="1.2" />
        <line x1="3" y1="7.2" x2="21" y2="16.8" stroke="#E10098" strokeWidth="1.2" />
        <line x1="3" y1="16.8" x2="21" y2="7.2" stroke="#E10098" strokeWidth="1.2" />
        <circle cx="12" cy="2" r="1.5" fill="#E10098" />
        <circle cx="21" cy="7.2" r="1.5" fill="#E10098" />
        <circle cx="21" cy="16.8" r="1.5" fill="#E10098" />
        <circle cx="12" cy="22" r="1.5" fill="#E10098" />
        <circle cx="3" cy="16.8" r="1.5" fill="#E10098" />
        <circle cx="3" cy="7.2" r="1.5" fill="#E10098" />
      </svg>
    );
  }

  // ─── 54. FIREBASE ───
  if (norm.includes('firebase')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M4.5 18.5L6.5 4.5L9.5 10.5L4.5 18.5Z" fill="#FFA000" />
        <path d="M12 2L9.5 10.5L15 6L12 2Z" fill="#FFC24A" />
        <path d="M4.5 18.5L12 22L19.5 18.5L15 6L4.5 18.5Z" fill="#F57C00" />
      </svg>
    );
  }

  // ─── 55. FASTLANE ───
  if (norm.includes('fastlane')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#007AFF" />
        <path d="M12 4L14.5 10L20 12L14.5 14L12 20L9.5 14L4 12L9.5 10L12 4Z" fill="white" />
      </svg>
    );
  }

  // ─── 56. TESTFLIGHT ───
  if (norm.includes('testflight')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#0275D8" />
        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M12 4V9M12 15V20M4 12H9M15 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 57. GOOGLE PLAY CONSOLE ───
  if (norm.includes('google play') || norm.includes('play console')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M4.5 3.5L14.5 12L4.5 20.5V3.5Z" fill="#00C1DE" />
        <path d="M14.5 12L18 8.5L4.5 3.5L14.5 12Z" fill="#FFCE00" />
        <path d="M4.5 20.5L18 15.5L14.5 12L4.5 20.5Z" fill="#FF3366" />
        <path d="M14.5 12L18 15.5L21 13.8C21.8 13.3 21.8 12.7 21 12.2L18 8.5L14.5 12Z" fill="#00E676" />
      </svg>
    );
  }

  // ─── 58. REST / REST API ───
  if (norm === 'rest' || norm.includes('rest api')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#0284C7" opacity="0.25" stroke="#38BDF8" strokeWidth="1.2" />
        <path d="M6 9H18M6 15H18M6 12H14" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 59. GRPC ───
  if (norm.includes('grpc')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <polygon points="12 2, 21 7, 21 17, 12 22, 3 17, 3 7" fill="#244C5A" stroke="#2496ED" strokeWidth="1.5" />
        <path d="M9 12L12 9L15 12M12 9V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // ─── 60. WEBSOCKETS ───
  if (norm.includes('websocket')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M8 10L5 12L8 14M16 10L19 12L16 14M13 7L11 17" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // ─── 61. WEBHOOKS ───
  if (norm.includes('webhook')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="6" r="3" fill="#EC4899" />
        <circle cx="6" cy="17" r="3" fill="#EC4899" />
        <circle cx="18" cy="17" r="3" fill="#EC4899" />
        <path d="M12 9V13M12 13L8 15M12 13L16 15" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 62. RABBITMQ ───
  if (norm.includes('rabbit')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#FF6600" opacity="0.25" stroke="#FF6600" strokeWidth="1.2" />
        <rect x="5" y="6" width="14" height="3" rx="1" fill="#FF6600" />
        <rect x="5" y="10.5" width="14" height="3" rx="1" fill="#FF6600" />
        <rect x="5" y="15" width="14" height="3" rx="1" fill="#FF6600" />
      </svg>
    );
  }

  // ─── 63. APACHE KAFKA ───
  if (norm.includes('kafka')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#231F20" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <circle cx="12" cy="12" r="3" fill="white" />
        <circle cx="6" cy="7" r="1.8" fill="white" />
        <circle cx="18" cy="7" r="1.8" fill="white" />
        <circle cx="6" cy="17" r="1.8" fill="white" />
        <circle cx="18" cy="17" r="1.8" fill="white" />
        <path d="M7.5 8L10.5 10.5M16.5 8L13.5 10.5M7.5 16L10.5 13.5M16.5 16L13.5 13.5" stroke="white" strokeWidth="1.5" />
      </svg>
    );
  }

  // ─── 64. DATADOG ───
  if (norm.includes('datadog')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#632CA6" />
        <circle cx="12" cy="10" r="3.5" stroke="white" strokeWidth="1.5" />
        <path d="M8 18C8 15 10 14 12 14C14 14 16 15 16 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 65. SENTRY ───
  if (norm.includes('sentry')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#362D59" stroke="#E1567C" strokeWidth="1.2" />
        <path d="M12 6C8.7 6 6 8.7 6 12C6 15.3 8.7 18 12 18C15.3 18 18 15.3 18 12" stroke="#E1567C" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="#E1567C" />
      </svg>
    );
  }

  // ─── 66. PROMETHEUS ───
  if (norm.includes('prometheus')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#E6522C" opacity="0.25" stroke="#E6522C" strokeWidth="1.5" />
        <path d="M12 5C10 8 8 10 8 13C8 15.5 9.8 17.5 12 17.5C14.2 17.5 16 15.5 16 13C16 10 14 8 12 5Z" fill="#E6522C" />
      </svg>
    );
  }

  // ─── 67. GRAFANA ───
  if (norm.includes('grafana')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#F46800" opacity="0.25" stroke="#F46800" strokeWidth="1.5" />
        <path d="M6 14C8 10 12 8 18 10M6 18C10 16 14 16 18 18M10 6C12 9 14 13 14 18" stroke="#F46800" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 68. GOOGLE ANALYTICS 4 ───
  if (norm.includes('analytics') && (norm.includes('google') || norm.includes('ga4'))) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#1F2937" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <path d="M16 16.5H18.5V7.5H16V16.5Z" fill="#F9AB00" />
        <path d="M11 16.5H13.5V11H11V16.5Z" fill="#E37400" />
        <circle cx="7.5" cy="15" r="1.5" fill="#EA4335" />
      </svg>
    );
  }

  // ─── 69. POSTHOG ───
  if (norm.includes('posthog')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#1D1F2C" stroke="#F54E00" strokeWidth="1.2" />
        <path d="M5 14L8 8L12 16L15 11L19 15" stroke="#F54E00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="8" r="1.5" fill="#F54E00" />
        <circle cx="15" cy="11" r="1.5" fill="#F54E00" />
      </svg>
    );
  }

  // ─── 70. HOTJAR ───
  if (norm.includes('hotjar')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#FD3A5C" opacity="0.25" stroke="#FD3A5C" strokeWidth="1.2" />
        <path d="M8 17V12M12 17V8M16 17V14" stroke="#FD3A5C" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 71. GOOGLE TAG MANAGER ───
  if (norm.includes('tag manager') || norm.includes('gtm')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#246FDB" opacity="0.25" stroke="#246FDB" strokeWidth="1.5" />
        <path d="M12 4L4 12L12 20L20 12L12 4Z" fill="#246FDB" />
        <circle cx="12" cy="12" r="3" fill="white" />
      </svg>
    );
  }

  // ─── 72. GOOGLE ADS ───
  if (norm.includes('google ads')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#1F2937" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <ellipse cx="8.5" cy="14" rx="3.5" ry="6" transform="rotate(-30 8.5 14)" fill="#4285F4" />
        <ellipse cx="15.5" cy="10" rx="3.5" ry="6" transform="rotate(-30 15.5 10)" fill="#F4B400" />
        <circle cx="7" cy="17" r="2.5" fill="#0F9D58" />
      </svg>
    );
  }

  // ─── 73. LINKEDIN CAMPAIGN MANAGER / LINKEDIN ───
  if (norm.includes('linkedin')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#0A66C2" />
        <circle cx="7" cy="7" r="1.5" fill="white" />
        <rect x="5.5" y="10" width="3" height="8" fill="white" />
        <path d="M11 10H14V11.5C14.5 10.5 15.5 10 17 10C19 10 20 11.2 20 13.8V18H17V14.2C17 13.2 16.6 12.5 15.5 12.5C14.5 12.5 14 13.2 14 14.2V18H11V10Z" fill="white" />
      </svg>
    );
  }

  // ─── 74. META ADS / META ───
  if (norm.includes('meta')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#0081FB" />
        <path d="M12 13.5C10.5 11.5 9 10 7.5 10C5.5 10 4 11.5 4 13.5C4 15.5 5.5 17 7.5 17C9.5 17 11 15 12 13.5ZM12 13.5C13.5 11.5 15 10 16.5 10C18.5 10 20 11.5 20 13.5C20 15.5 18.5 17 16.5 17C14.5 17 13 15 12 13.5Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 75. LOOKER STUDIO ───
  if (norm.includes('looker')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />
        <path d="M6 16V14M10 16V10M14 16V12M18 16V7" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 76. SEGMENT ───
  if (norm.includes('segment')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#52BD95" opacity="0.25" stroke="#52BD95" strokeWidth="1.5" />
        <path d="M7 12L12 7L17 12L12 17L7 12Z" fill="#52BD95" />
      </svg>
    );
  }

  // ─── 77. HUBSPOT ANALYTICS / HUBSPOT ───
  if (norm.includes('hubspot')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#FF7A59" opacity="0.25" stroke="#FF7A59" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="4" stroke="#FF7A59" strokeWidth="2" />
        <circle cx="12" cy="4.5" r="1.8" fill="#FF7A59" />
        <circle cx="19.5" cy="12" r="1.8" fill="#FF7A59" />
        <path d="M12 6.5V8M16 12H17.5" stroke="#FF7A59" strokeWidth="1.5" />
      </svg>
    );
  }

  // ─── 78. DIGITALOCEAN ───
  if (norm.includes('digitalocean')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9.5" fill="#0080FF" opacity="0.25" stroke="#0080FF" strokeWidth="1.5" />
        <path d="M12 6C8.7 6 6 8.7 6 12C6 15.3 8.7 18 12 18V14C10.9 14 10 13.1 10 12C10 10.9 10.9 10 12 10V6Z" fill="#0080FF" />
        <rect x="6" y="15" width="2.5" height="2.5" fill="#0080FF" />
        <rect x="4" y="17.5" width="2" height="2" fill="#0080FF" />
      </svg>
    );
  }

  // ─── 79. KUBERNETES ───
  if (norm.includes('kubernetes')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <polygon points="12 2, 20.7 7, 20.7 17, 12 22, 3.3 17, 3.3 7" stroke="#326CE5" strokeWidth="1.5" fill="#326CE5" fillOpacity="0.25" />
        <circle cx="12" cy="12" r="3" stroke="#326CE5" strokeWidth="1.5" />
        <path d="M12 5V9M12 15V19M6 8.5L9.5 10.5M14.5 13.5L18 15.5M18 8.5L14.5 10.5M9.5 13.5L6 15.5" stroke="#326CE5" strokeWidth="1.2" />
      </svg>
    );
  }

  // ─── 80. BETTERSTACK ───
  if (norm.includes('betterstack')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#FACC15" opacity="0.25" stroke="#FACC15" strokeWidth="1.5" />
        <rect x="5" y="6" width="14" height="3" rx="1" fill="#FACC15" />
        <rect x="5" y="11" width="14" height="3" rx="1" fill="#FACC15" />
        <rect x="5" y="16" width="9" height="3" rx="1" fill="#FACC15" />
      </svg>
    );
  }

  // ─── 81. SONARQUBE ───
  if (norm.includes('sonarqube')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#4B9CD3" opacity="0.25" stroke="#4B9CD3" strokeWidth="1.5" />
        <path d="M5 14C8 10 11 9 14 11C16 12 17 14 19 13" stroke="#4B9CD3" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 82. OWASP SECURITY STANDARDS ───
  if (norm.includes('owasp') || norm.includes('security standard')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 5.5V11.5C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11.5V5.5L12 2Z" fill="#0284C7" opacity="0.25" stroke="#38BDF8" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // ─── 83. LINEAR ───
  if (norm.includes('linear')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#5E6AD2" opacity="0.25" stroke="#5E6AD2" strokeWidth="1.2" />
        <path d="M6 18L18 6M6 6L18 18" stroke="#5E6AD2" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // ─── 84. JIRA ───
  if (norm.includes('jira')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#0052CC" />
        <path d="M12 5L7 10L12 15L17 10L12 5Z" fill="#2684FF" />
        <path d="M12 10L7 15L12 20L17 15L12 10Z" fill="white" />
      </svg>
    );
  }

  // ─── 85. NOTION & NOTION ARCHITECTURE WIKIS ───
  if (norm.includes('notion')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#FFFFFF" />
        <path d="M5 5L15 4L19 7V19L11 20L5 17V5Z" fill="#000000" />
        <path d="M8 8L16 7V16L8 17V8Z" fill="#FFFFFF" />
        <path d="M10 9V15L14 10V16" stroke="#000000" strokeWidth="1.5" />
      </svg>
    );
  }

  // ─── 86. MIRO ───
  if (norm.includes('miro')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#FFD02F" />
        <path d="M7 17L10 7L13 17L17 7" stroke="#050038" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // ─── 87. BULLMQ ───
  if (norm.includes('bullmq') || norm.includes('bull')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#B91C1C" opacity="0.25" stroke="#EF4444" strokeWidth="1.5" />
        <path d="M6 7C7 10 9 11 12 11C15 11 17 10 18 7" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="14" r="3" fill="#EF4444" />
      </svg>
    );
  }

  // ─── 88. VECTOR EMBEDDINGS ───
  if (norm.includes('embedding') || norm.includes('vector')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="5" fill="#8B5CF6" opacity="0.25" stroke="#8B5CF6" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="2" fill="#A78BFA" />
        <circle cx="16" cy="8" r="2" fill="#A78BFA" />
        <circle cx="12" cy="16" r="2" fill="#A78BFA" />
        <path d="M8 8L16 8M8 8L12 16M16 8L12 16" stroke="#A78BFA" strokeWidth="1.2" />
      </svg>
    );
  }

  // ─── 89. ARCHITECTURE METHODOLOGIES (DDD, EVENT-DRIVEN, CLEAN ARCHITECTURE) ───
  if (norm.includes('domain-driven') || norm.includes('event-driven') || norm.includes('clean architecture') || norm.includes('architecture')) {
    return (
      <svg {...baseSvgProps} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#0284C7" opacity="0.2" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="5" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1.5" fill="#38BDF8" />
      </svg>
    );
  }

  // ─── 90. GENERIC INTERFACE / GLYPH FALLBACKS ───
  if (norm.includes('api') || norm.includes('service') || norm.includes('connect')) {
    return <Network size={size} color="#008DE4" className={`tech-icon-svg ${className}`} style={{ display: 'block', margin: 'auto', flexShrink: 0 }} />;
  }
  if (norm.includes('data') || norm.includes('db') || norm.includes('sql')) {
    return <Database size={size} color="#38BDF8" className={`tech-icon-svg ${className}`} style={{ display: 'block', margin: 'auto', flexShrink: 0 }} />;
  }
  if (norm.includes('cloud') || norm.includes('host') || norm.includes('cdn')) {
    return <Cloud size={size} color="#38BDF8" className={`tech-icon-svg ${className}`} style={{ display: 'block', margin: 'auto', flexShrink: 0 }} />;
  }
  if (norm.includes('ai') || norm.includes('agent') || norm.includes('model')) {
    return <Bot size={size} color="#A78BFA" className={`tech-icon-svg ${className}`} style={{ display: 'block', margin: 'auto', flexShrink: 0 }} />;
  }
  if (norm.includes('auth') || norm.includes('security')) {
    return <Lock size={size} color="#F59E0B" className={`tech-icon-svg ${className}`} style={{ display: 'block', margin: 'auto', flexShrink: 0 }} />;
  }
  if (norm.includes('analytics') || norm.includes('metric') || norm.includes('report')) {
    return <BarChart3 size={size} color="#10B981" className={`tech-icon-svg ${className}`} style={{ display: 'block', margin: 'auto', flexShrink: 0 }} />;
  }
  if (norm.includes('design') || norm.includes('ui') || norm.includes('ux')) {
    return <Palette size={size} color="#EC4899" className={`tech-icon-svg ${className}`} style={{ display: 'block', margin: 'auto', flexShrink: 0 }} />;
  }
  if (norm.includes('ad') || norm.includes('marketing')) {
    return <Megaphone size={size} color="#F97316" className={`tech-icon-svg ${className}`} style={{ display: 'block', margin: 'auto', flexShrink: 0 }} />;
  }

  return <Cpu size={size} color="var(--accent, #008DE4)" className={`tech-icon-svg ${className}`} style={{ display: 'block', margin: 'auto', flexShrink: 0 }} />;
}

/**
 * Modern Category Icon Component
 */
export function TechCategoryIcon({ category, size = 18 }) {
  const norm = (category || "").toLowerCase();

  if (norm.includes('front') || norm.includes('app') || norm.includes('web')) {
    return <Layout size={size} color="var(--accent)" />;
  }
  if (norm.includes('mobile')) {
    return <Smartphone size={size} color="var(--accent)" />;
  }
  if (norm.includes('back') || norm.includes('custom code')) {
    return <Server size={size} color="var(--accent)" />;
  }
  if (norm.includes('data') || norm.includes('db') || norm.includes('caching') || norm.includes('vector')) {
    return <Database size={size} color="var(--accent)" />;
  }
  if (norm.includes('infra') || norm.includes('cloud') || norm.includes('host') || norm.includes('container') || norm.includes('deploy') || norm.includes('ci')) {
    return <Cloud size={size} color="var(--accent)" />;
  }
  if (norm.includes('ai') || norm.includes('orchestrat') || norm.includes('model')) {
    return <Bot size={size} color="var(--accent)" />;
  }
  if (norm.includes('design') || norm.includes('proto') || norm.includes('handoff')) {
    return <Palette size={size} color="var(--accent)" />;
  }
  if (norm.includes('animat')) {
    return <Film size={size} color="var(--accent)" />;
  }
  if (norm.includes('cms')) {
    return <FileCode size={size} color="var(--accent)" />;
  }
  if (norm.includes('payment')) {
    return <Zap size={size} color="var(--accent)" />;
  }
  if (norm.includes('auto') || norm.includes('integrat') || norm.includes('protocol') || norm.includes('api')) {
    return <Network size={size} color="var(--accent)" />;
  }
  if (norm.includes('monitor') || norm.includes('eval') || norm.includes('analytics') || norm.includes('report') || norm.includes('cro')) {
    return <Activity size={size} color="var(--accent)" />;
  }
  if (norm.includes('ad')) {
    return <Megaphone size={size} color="var(--accent)" />;
  }
  if (norm.includes('seo') || norm.includes('search')) {
    return <Search size={size} color="var(--accent)" />;
  }
  if (norm.includes('arch') || norm.includes('roadmap') || norm.includes('evaluat')) {
    return <Compass size={size} color="var(--accent)" />;
  }

  return <Cpu size={size} color="var(--accent)" />;
}
