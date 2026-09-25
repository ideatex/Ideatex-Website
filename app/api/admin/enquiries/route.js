import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { getCollection, insertItem } from '@/lib/cms-db';

export async function GET(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canManageEnquiries')) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const status = searchParams.get('status') || '';
  const type = searchParams.get('type') || '';

  let list = getCollection('enquiries');

  if (search) {
    list = list.filter((item) =>
      item.name?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search) ||
      item.phone?.toLowerCase().includes(search) ||
      item.company?.toLowerCase().includes(search) ||
      item.service?.toLowerCase().includes(search)
    );
  }

  if (status) {
    list = list.filter((item) => item.status === status);
  }

  if (type) {
    list = list.filter((item) => item.type === type);
  }

  list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  return NextResponse.json({ data: list });
}

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const item = insertItem('enquiries', {
      ...body,
      status: body.status || 'new',
      createdAt: new Date().toISOString()
    }, session);

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
