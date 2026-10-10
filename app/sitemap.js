import { getServerPages, getServerServices, getServerCaseStudies, getServerInsights, getServerGlobalSeo, getSiteBase } from '@/lib/cms-server';

export default function sitemap() {
  const seo = getServerGlobalSeo();
  if (seo.sitemapEnabled === false) return [];

  const base = getSiteBase();
  const entry = (path, updated, priority = 0.7) => ({
    url: `${base}${path}`,
    lastModified: updated ? new Date(updated) : new Date(),
    priority,
  });

  const pages = getServerPages()
    .filter((p) => p.noindex !== true)
    .map((p) => entry(p.slug === 'home' ? '' : `/${p.slug}`, p.updatedAt, p.slug === 'home' ? 1 : 0.8));
  const paths = new Set(pages.map((p) => p.url));
  const extra = ['/about', '/services', '/portfolio', '/case-studies', '/blog', '/contact']
    .filter((path) => !paths.has(`${base}${path}`))
    .map((path) => entry(path, null, 0.8));

  return [
    ...pages,
    ...extra,
    ...getServerServices().map((s) => entry(`/services/${s.slug}`, s.updatedAt)),
    ...getServerCaseStudies().map((c) => entry(`/case-studies/${c.slug}`, c.updatedAt)),
    ...getServerInsights().map((i) => entry(`/blog/${i.slug}`, i.updatedAt || i.date)),
  ];
}
