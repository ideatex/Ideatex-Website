import { getPageMetadata } from '@/lib/cms-server';

export function generateMetadata() {
  return getPageMetadata('cookie-policy', { description: 'Read the Ideate X cookie policy to see which essential cookies and browser storage we use, why we use them and how you can control them.', title: 'Cookie Policy — Ideate X' });
}

export default function Layout({ children }) {
  return children;
}
