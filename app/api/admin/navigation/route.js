import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { readDb, writeDb, logActivity } from '@/lib/cms-db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = readDb();
  return NextResponse.json({
    navigation_items: db.navigation_items || [],
    footer_groups: db.footer_groups || {}
  });
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

    if (body.navigation_items) {
      db.navigation_items = body.navigation_items;
    }

    if (body.footer_groups) {
      db.footer_groups = body.footer_groups;
    }

    writeDb(db);
    logActivity(session.id, session.name, 'UPDATE', 'Navigation', 'header_footer', 'Updated website navigation and footer structure');

    return NextResponse.json({
      success: true,
      navigation_items: db.navigation_items,
      footer_groups: db.footer_groups
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
