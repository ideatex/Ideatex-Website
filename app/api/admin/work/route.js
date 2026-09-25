import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { getCollection, insertItem } from '@/lib/cms-db';

export async function GET(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const category = searchParams.get('category') || '';
  const status = searchParams.get('status') || '';

  let list = getCollection('work_items');

  if (search) {
    list = list.filter((item) =>
      item.title?.toLowerCase().includes(search) ||
      item.category?.toLowerCase().includes(search) ||
      item.client?.toLowerCase().includes(search)
    );
  }

  if (category) {
    list = list.filter((item) => item.category === category);
  }

  if (status) {
    list = list.filter((item) => item.status === status);
  }

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
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'Title and Slug are required' }, { status: 400 });
    }

    const existing = getCollection('work_items').find(
      (w) => w.slug.toLowerCase() === body.slug.toLowerCase()
    );
    if (existing) {
      return NextResponse.json({ error: `Slug "${body.slug}" is already in use.` }, { status: 400 });
    }

    const item = insertItem('work_items', body, session);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
