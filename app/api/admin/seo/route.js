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

  // Run automated SEO audit
  const warnings = [];

  pages.forEach((p) => {
    if (!p.seoTitle) warnings.push({ entity: 'Page', name: p.title, issue: 'Missing SEO Title', level: 'warning', id: p.id, url: `/${p.slug === 'home' ? '' : p.slug}` });
    if (!p.seoDescription) warnings.push({ entity: 'Page', name: p.title, issue: 'Missing Meta Description', level: 'warning', id: p.id, url: `/${p.slug === 'home' ? '' : p.slug}` });
    if (!p.ogImage) warnings.push({ entity: 'Page', name: p.title, issue: 'Missing OpenGraph Social Image', level: 'notice', id: p.id, url: `/${p.slug === 'home' ? '' : p.slug}` });
  });

  services.forEach((s) => {
    if (!s.seoTitle) warnings.push({ entity: 'Service', name: s.title, issue: 'Missing Custom SEO Title', level: 'notice', id: s.id, url: `/services/${s.slug}` });
    if (!s.seoDescription) warnings.push({ entity: 'Service', name: s.title, issue: 'Missing Custom Meta Description', level: 'notice', id: s.id, url: `/services/${s.slug}` });
    if (!s.image?.alt) warnings.push({ entity: 'Service', name: s.title, issue: 'Service Image Missing Alt Text', level: 'warning', id: s.id, url: `/services/${s.slug}` });
  });

  insights.forEach((i) => {
    if (!i.seoTitle) warnings.push({ entity: 'Insight', name: i.title, issue: 'Missing SEO Title', level: 'notice', id: i.id, url: `/blog/${i.slug}` });
    if (!i.seoDescription) warnings.push({ entity: 'Insight', name: i.title, issue: 'Missing Meta Description', level: 'notice', id: i.id, url: `/blog/${i.slug}` });
  });

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
