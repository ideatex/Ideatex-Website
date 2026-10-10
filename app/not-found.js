import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | Ideate X',
  robots: { index: false, follow: true },
};

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function NotFound() {
  return (
    <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', padding: '140px 0 80px' }}>
      <div className="container">
        <p style={{ color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 12 }}>ERROR 404</p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.25rem, 5vw, 4rem)', color: 'var(--text-headline)', margin: '0 0 16px' }}>
          This page could not be found.
        </h1>
        <p style={{ color: 'var(--text-body)', maxWidth: 560, lineHeight: 1.6, marginBottom: 28 }}>
          The link may be broken or the page may have moved. Try one of these pages instead.
        </p>
        <nav aria-label="Helpful links" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="filter-btn">{l.label}</Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
