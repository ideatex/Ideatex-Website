import { getPageMetadata } from '@/lib/cms-server';

export function generateMetadata() {
  return getPageMetadata('services', { title: 'Our Services — Ideate X' });
}

export default function Layout({ children }) {
  return children;
}
