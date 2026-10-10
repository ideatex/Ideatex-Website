import { getPageMetadata } from '@/lib/cms-server';

export function generateMetadata() {
  return getPageMetadata('contact', { title: 'Contact Us — Start a Project | Ideate X' });
}

export default function Layout({ children }) {
  return children;
}
