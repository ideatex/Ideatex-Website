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

  let list = getCollection('faqs');

  if (search) {
    list = list.filter((item) =>
      item.question?.toLowerCase().includes(search) ||
      item.answer?.toLowerCase().includes(search)
    );
  }

  if (category) {
    list = list.filter((item) => item.category === category || item.relatedService === category);
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
    if (!body.question || !body.answer) {
      return NextResponse.json({ error: 'Question and Answer are required' }, { status: 400 });
    }

    const item = insertItem('faqs', {
      ...body,
      status: body.status || 'published',
      order: body.order || 1
    }, session);

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
