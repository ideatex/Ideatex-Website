import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { getCollection, updateSingleton, readDb, writeDb } from '@/lib/cms-db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const list = getCollection('homepage_sections');
  list.sort((a, b) => (a.order || 0) - (b.order || 0));

  return NextResponse.json({ data: list });
}

export async function PUT(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canManageAllContent')) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const db = readDb();

    if (Array.isArray(body)) {
      // Reordering / bulk update
      db.homepage_sections = body;
      writeDb(db);
      return NextResponse.json({ success: true, data: db.homepage_sections });
    }

    // Single section update { id, ...updates }
    if (body.id) {
      const index = (db.homepage_sections || []).findIndex((s) => s.id === body.id);
      if (index === -1) {
        return NextResponse.json({ error: 'Section not found' }, { status: 404 });
      }
      db.homepage_sections[index] = {
        ...db.homepage_sections[index],
        ...body,
        updatedAt: new Date().toISOString()
      };
      writeDb(db);
      return NextResponse.json({ success: true, data: db.homepage_sections[index] });
    }

    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
