import { getPageMetadata } from '@/lib/cms-server';

export function generateMetadata() {
  return getPageMetadata('about', { title: 'About Us — Ideate X' });
}

export default function Layout({ children }) {
  return children;
}
