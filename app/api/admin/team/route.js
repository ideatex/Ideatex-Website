import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { getCollection, insertItem, writeDb, readDb } from '@/lib/cms-db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const list = getCollection('team_members');
  list.sort((a, b) => (a.order || 0) - (b.order || 0));

  return NextResponse.json({ data: list });
}

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canManageAllContent')) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.designation) {
      return NextResponse.json({ error: 'Name and Designation are required' }, { status: 400 });
    }

    const item = insertItem('team_members', body, session);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Reorder endpoint
export async function PUT(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canManageAllContent')) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  try {
    const body = await request.json(); // array of { id, order }
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Expected array of items' }, { status: 400 });
    }

    const db = readDb();
    if (!db.team_members) db.team_members = [];

    body.forEach((orderItem) => {
      const target = db.team_members.find((t) => t.id === orderItem.id);
      if (target) {
        target.order = orderItem.order;
      }
    });

    writeDb(db);
    return NextResponse.json({ success: true, data: db.team_members });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
