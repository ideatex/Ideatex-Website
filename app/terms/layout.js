import { getPageMetadata } from '@/lib/cms-server';

export function generateMetadata() {
  return getPageMetadata('terms', { description: 'Read the Ideate X terms of service covering product development, product engineering and consulting engagements, payments, ownership and support.', title: 'Terms of Service — Ideate X' });
}

export default function Layout({ children }) {
  return children;
}
