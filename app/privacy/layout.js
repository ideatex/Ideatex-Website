import { getPageMetadata } from '@/lib/cms-server';

export function generateMetadata() {
  return getPageMetadata('privacy', { description: 'Read the Ideate X privacy policy to learn how we collect, use and protect your personal data and the project information you share with us.', title: 'Privacy Policy — Ideate X' });
}

export default function Layout({ children }) {
  return children;
}
