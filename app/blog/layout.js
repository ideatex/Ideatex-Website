import { getPageMetadata } from '@/lib/cms-server';

export function generateMetadata() {
  return getPageMetadata('blog', { title: 'Insights & Engineering Blog — Ideate X' });
}

export default function Layout({ children }) {
  return children;
}
