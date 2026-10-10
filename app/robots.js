import { getServerGlobalSeo, getSiteBase } from '@/lib/cms-server';

export default function robots() {
  const seo = getServerGlobalSeo();
  const base = getSiteBase();
  const blocked = /noindex/i.test(seo.robots || '');

  return {
    rules: blocked
      ? { userAgent: '*', disallow: '/' }
      : { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
    ...(seo.sitemapEnabled === false ? {} : { sitemap: `${base}/sitemap.xml` }),
    host: base,
  };
}
