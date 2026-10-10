import { getPageMetadata } from '@/lib/cms-server';

export function generateMetadata() {
  return getPageMetadata('portfolio', { title: 'Portfolio & Work — Ideate X' });
}

export default function Layout({ children }) {
  return children;
}
