import { insertItem, logActivity } from './cms-db';

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidPhone(value) {
  const cleaned = String(value).replace(/[\s\-().]/g, '');
  return /^\+?[0-9]{7,15}$/.test(cleaned);
}

// Strips control characters and caps length so stored leads stay clean
export function clean(value, max = 500) {
  return String(value ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
}

// Simple in-memory rate limit per client (best effort; resets on restart)
const hits = new Map();
export function isRateLimited(request, key, limit = 5, windowMs = 10 * 60 * 1000) {
  const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  const id = `${key}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(id) || []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(id, recent);
    return true;
  }
  recent.push(now);
  hits.set(id, recent);
  return false;
}

// Saves a lead to the unified admin "enquiries" collection with one shared shape
// (used by both the contact form and the chatbot) and records it in the activity log.
export function saveEnquiry({ type, name, email, phone, company = '', service, message, timeline = '', budget = '', source, internalNotes = '', extra = {} }) {
  const record = insertItem('enquiries', {
    type,
    name,
    email,
    phone: phone || '',
    company,
    service,
    message,
    timeline,
    budget,
    source,
    status: 'new',
    internalNotes,
    ...extra,
    createdAt: new Date().toISOString(),
  });
  logActivity('visitor', name, 'ENQUIRY_SUBMITTED', 'Enquiry', record.id, `New ${type} enquiry via ${source}: ${name} (${email})`);
  return record;
}
