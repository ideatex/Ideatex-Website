import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { readDb, writeDb, logActivity, getCollection } from '@/lib/cms-db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = readDb();
  const pages = db.pages || [];
  const services = db.services || [];
  const caseStudies = db.case_studies || [];
  const insights = db.insights || [];

  // Run automated on-page SEO audit
  const warnings = [];
  const add = (entity, item, issue, level, url) =>
    warnings.push({ entity, name: item.title, issue, level, id: item.id, url });

  const titleCounts = {};
  [...pages, ...services, ...caseStudies, ...insights].forEach((i) => {
    if (i.seoTitle) titleCounts[i.seoTitle.trim().toLowerCase()] = (titleCounts[i.seoTitle.trim().toLowerCase()] || 0) + 1;
  });

  const audit = (entity, item, url, { requireOg = true } = {}) => {
    const title = (item.seoTitle || '').trim();
    const desc = (item.seoDescription || '').trim();
    if (!title) add(entity, item, 'Missing SEO Title', 'warning', url);
    else {
      if (title.length > 65) add(entity, item, `SEO Title too long (${title.length}/65) — will be truncated in search results`, 'notice', url);
      if (title.length < 30) add(entity, item, `SEO Title too short (${title.length} chars)`, 'notice', url);
      if (titleCounts[title.toLowerCase()] > 1) add(entity, item, 'Duplicate SEO Title used on another page', 'warning', url);
    }
    if (!desc) add(entity, item, 'Missing Meta Description', 'warning', url);
    else if (desc.length > 165) add(entity, item, `Meta Description too long (${desc.length}/165)`, 'notice', url);
    else if (desc.length < 70) add(entity, item, `Meta Description too short (${desc.length} chars)`, 'notice', url);
    if (requireOg && !item.ogImage) add(entity, item, 'Missing OpenGraph Social Image', 'notice', url);
    if (!item.slug) add(entity, item, 'Missing URL slug', 'warning', url);
    else if (!/^[a-z0-9-]+$/.test(item.slug)) add(entity, item, 'Slug should be lowercase letters, numbers and hyphens only', 'notice', url);
  };

  pages.forEach((p) => audit('Page', p, `/${p.slug === 'home' ? '' : p.slug}`));
  services.forEach((s) => {
    audit('Service', s, `/services/${s.slug}`);
    if (!s.image?.alt) add('Service', s, 'Service Image Missing Alt Text', 'warning', `/services/${s.slug}`);
  });
  caseStudies.forEach((c) => {
    audit('Case Study', c, `/case-studies/${c.slug}`);
    if (c.image && typeof c.image === 'object' && !c.image.alt) add('Case Study', c, 'Case Study Image Missing Alt Text', 'warning', `/case-studies/${c.slug}`);
  });
  insights.forEach((i) => audit('Insight', i, `/blog/${i.slug}`));
  return NextResponse.json({
    seo_metadata: db.seo_metadata || {},
    warnings,
    summary: {
      totalAudited: pages.length + services.length + caseStudies.length + insights.length,
      warningCount: warnings.filter((w) => w.level === 'warning').length,
      noticeCount: warnings.filter((w) => w.level === 'notice').length,
    }
  });
}

export async function PUT(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canManageSEO')) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const db = readDb();
    db.seo_metadata = {
      ...db.seo_metadata,
      ...body,
      updatedAt: new Date().toISOString()
    };
    writeDb(db);
    logActivity(session.id, session.name, 'UPDATE_SEO', 'SEO', 'global_seo', 'Updated global SEO settings and OpenGraph metadata');

    return NextResponse.json({ success: true, seo_metadata: db.seo_metadata });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
