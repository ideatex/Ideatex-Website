import { getPageMetadata } from '@/lib/cms-server';

export function generateMetadata() {
  return getPageMetadata('case-studies', { title: 'Technical Case Studies — Ideate X' });
}

export default function Layout({ children }) {
  return children;
}
