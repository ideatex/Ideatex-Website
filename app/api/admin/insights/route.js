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
  const status = searchParams.get('status') || '';
  const category = searchParams.get('category') || '';

  let list = getCollection('insights');

  // If author, can only see own posts or published posts unless editor/admin
  if (session.role === 'AUTHOR') {
    list = list.filter((i) => i.author?.name === session.name || i.author?.id === session.id);
  }

  if (search) {
    list = list.filter((item) =>
      item.title?.toLowerCase().includes(search) ||
      item.excerpt?.toLowerCase().includes(search) ||
      item.category?.toLowerCase().includes(search)
    );
  }

  if (status) {
    list = list.filter((item) => item.status === status);
  }

  if (category) {
    list = list.filter((item) => item.category === category);
  }

  return NextResponse.json({ data: list });
}

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ error: 'Title and Slug are required' }, { status: 400 });
    }

    const existing = getCollection('insights').find(
      (i) => i.slug.toLowerCase() === body.slug.toLowerCase()
    );
    if (existing) {
      return NextResponse.json({ error: `Slug "${body.slug}" is already in use.` }, { status: 400 });
    }

    // Authors can only create drafts
    let postStatus = body.status || 'draft';
    if (session.role === 'AUTHOR' && postStatus === 'published') {
      postStatus = 'draft';
    }

    const postData = {
      ...body,
      status: postStatus,
      author: body.author || {
        id: session.id,
        name: session.name,
        role: session.role === 'AUTHOR' ? 'Contributor' : 'Ideate X Team',
        avatar: session.avatar || '/logo-ideatex.png'
      },
      date: body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const item = insertItem('insights', postData, session);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
