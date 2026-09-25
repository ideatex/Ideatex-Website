import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { getItemById, updateItem, deleteItem, getCollection } from '@/lib/cms-db';

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const item = getItemById('insights', id);
  if (!item) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ data: item });
}

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const current = getItemById('insights', id);
  if (!current) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Author permissions check: cannot edit other's post
  if (session.role === 'AUTHOR' && current.author?.id !== session.id && current.author?.name !== session.name) {
    return NextResponse.json({ error: 'Authors can only edit their own posts.' }, { status: 403 });
  }

  try {
    const body = await request.json();

    if (body.slug) {
      const existing = getCollection('insights').find(
        (i) => i.slug.toLowerCase() === body.slug.toLowerCase() && i.id !== id
      );
      if (existing) {
        return NextResponse.json({ error: `Slug "${body.slug}" is already in use.` }, { status: 400 });
      }
    }

    // Authors cannot publish directly
    if (session.role === 'AUTHOR' && body.status === 'published') {
      body.status = 'draft';
    }

    const updated = updateItem('insights', id, body, session);
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canDelete')) {
    return NextResponse.json({ error: 'Only administrators can delete insight articles.' }, { status: 403 });
  }

  const { id } = await params;
  const success = deleteItem('insights', id, session);
  if (!success) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
