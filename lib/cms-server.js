import { readDb, getCollection, getItemBySlug, getItemById } from './cms-db';

export function getServerServices() {
  try {
    const list = getCollection('services');
    return list
      .filter((s) => s.status === 'published')
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (err) {
    return [];
  }
}

export function getServerServiceBySlug(slug) {
  try {
    const service = getItemBySlug('services', slug);
    if (!service || service.status !== 'published') return null;
    return service;
  } catch (err) {
    return null;
  }
}

export function getServerWork() {
  try {
    const list = getCollection('work_items');
    return list
      .filter((w) => w.status === 'published')
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (err) {
    return [];
  }
}

export function getServerCaseStudies() {
  try {
    const list = getCollection('case_studies');
    return list.filter((c) => c.status === 'published');
  } catch (err) {
    return [];
  }
}

export function getServerCaseStudyBySlug(slug) {
  try {
    const cs = getItemBySlug('case_studies', slug);
    if (!cs || cs.status !== 'published') return null;
    return cs;
  } catch (err) {
    return null;
  }
}

export function getServerInsights() {
  try {
    const list = getCollection('insights');
    return list
      .filter((i) => i.status === 'published')
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  } catch (err) {
    return [];
  }
}

export function getServerInsightBySlug(slug) {
  try {
    const post = getItemBySlug('insights', slug);
    if (!post || post.status !== 'published') return null;
    return post;
  } catch (err) {
    return null;
  }
}

export function getServerPages() {
  try {
    const list = getCollection('pages');
    return list.filter((p) => p.status === 'published');
  } catch (err) {
    return [];
  }
}

export function getServerPageBySlug(slug) {
  try {
    const page = getItemBySlug('pages', slug);
    if (!page || page.status !== 'published') return null;
    return page;
  } catch (err) {
    return null;
  }
}

export function getSiteBase() {
  const seo = getServerGlobalSeo();
  return (seo.canonicalBase || 'https://ideatex.co.in').replace(/\/+$/, '');
}

function absoluteUrl(value) {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return `${getSiteBase()}${value.startsWith('/') ? '' : '/'}${value}`;
}

// Complete on-page metadata: title, description, canonical, OpenGraph, Twitter, robots
export function buildMetadata({ title, description, keywords, path = '/', image, canonical, type = 'website', noindex = false, publishedTime, modifiedTime }) {
  const seo = getServerGlobalSeo();
  const settings = getServerSiteSettings();
  const ogImage = absoluteUrl(image || seo.defaultOgImage || '/logo-ideatex.png');
  const url = absoluteUrl(canonical || path);
  const meta = {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: settings.name || 'Ideate X',
      images: [ogImage],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && modifiedTime ? { modifiedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
  if (noindex) meta.robots = { index: false, follow: false };
  return meta;
}

// Builds Next.js metadata for a CMS-managed page from its SEO fields
export function getPageMetadata(slug, fallback = {}) {
  const page = getServerPageBySlug(slug);
  const seo = getServerGlobalSeo();
  return buildMetadata({
    title: page?.seoTitle || fallback.title || seo.defaultTitle,
    description: page?.seoDescription || fallback.description || seo.defaultDescription,
    path: `/${slug}`,
    image: page?.ogImage,
    canonical: page?.canonicalUrl,
    noindex: page?.noindex === true,
  });
}

export function getServerGlobalSeo() {
  try {
    const db = readDb();
    return db.seo_metadata || {};
  } catch (err) {
    return {};
  }
}

export function getServerSiteSettings() {
  try {
    const db = readDb();
    return db.site_settings || {};
  } catch (err) {
    return {};
  }
}

export function getServerPublicContent() {
  try {
    const db = readDb();
    const services = (db.services || []).filter((s) => s.status === 'published').sort((a, b) => (a.order || 0) - (b.order || 0));
    const workItems = (db.work_items || []).filter((w) => w.status === 'published').sort((a, b) => (a.order || 0) - (b.order || 0));
    const caseStudies = (db.case_studies || []).filter((c) => c.status === 'published');
    const insights = (db.insights || []).filter((i) => i.status === 'published').sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    const team = (db.team_members || []).filter((t) => t.status === 'published').sort((a, b) => (a.order || 0) - (b.order || 0));
    const faqs = (db.faqs || []).filter((f) => f.status === 'published').sort((a, b) => (a.order || 0) - (b.order || 0));
    const sections = (db.homepage_sections || []).sort((a, b) => a.order - b.order);

    const pages = (db.pages || []).filter((p) => p.status === 'published');
    const seo = db.seo_metadata || {};

    return {
      pages,
      seo,
      services,
      workItems,
      caseStudies,
      insights,
      team,
      faqs,
      sections,
      navigation: {
        header: (db.navigation_items || []).filter((n) => n.menuKey === 'header' && n.isVisible).sort((a, b) => a.order - b.order),
        footer: db.footer_groups || {},
      },
      settings: db.site_settings || {},
      loading: false,
    };
  } catch (err) {
    return {
      pages: [],
      seo: {},
      services: [],
      workItems: [],
      caseStudies: [],
      insights: [],
      team: [],
      faqs: [],
      sections: [],
      navigation: {
        header: [],
        footer: {},
      },
      settings: {},
      loading: false,
    };
  }
}


// Builds Next.js metadata for a CMS-managed static page (about, contact, ...)
export function getServerPageMetadata(slug, fallbackTitle) {
  const page = getServerPageBySlug(slug);
  const seo = getServerGlobalSeo();
  const title = page?.seoTitle || fallbackTitle;
  const description = page?.seoDescription || seo.defaultDescription;
  const image = page?.ogImage || seo.defaultOgImage;
  const meta = { title };
  if (description) meta.description = description;
  meta.openGraph = { title, ...(description && { description }), ...(image && { images: [image] }) };
  if (page?.canonicalUrl) meta.alternates = { canonical: page.canonicalUrl };
  return meta;
}
