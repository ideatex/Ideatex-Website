import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { readDb, writeDb, logActivity } from '@/lib/cms-db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = readDb();
  return NextResponse.json({ data: db.site_settings || {} });
}

export async function PUT(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canManageSettings')) {
    return NextResponse.json({ error: 'Only administrators can update site settings.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const db = readDb();
    db.site_settings = {
      ...db.site_settings,
      ...body,
      updatedAt: new Date().toISOString()
    };
    writeDb(db);
    logActivity(session.id, session.name, 'UPDATE_SETTINGS', 'SiteSettings', 'global', 'Updated site configuration and contact information');

    return NextResponse.json({ success: true, data: db.site_settings });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
