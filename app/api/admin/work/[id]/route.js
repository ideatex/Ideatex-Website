import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { getItemById, updateItem, deleteItem, getCollection } from '@/lib/cms-db';

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const item = getItemById('work_items', id);
  if (!item) {
    return NextResponse.json({ error: 'Work item not found' }, { status: 404 });
  }

  return NextResponse.json({ data: item });
}

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canManageAllContent')) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  const { id } = await params;
  try {
    const body = await request.json();

    if (body.slug) {
      const existing = getCollection('work_items').find(
        (w) => w.slug.toLowerCase() === body.slug.toLowerCase() && w.id !== id
      );
      if (existing) {
        return NextResponse.json({ error: `Slug "${body.slug}" is already in use.` }, { status: 400 });
      }
    }

    const updated = updateItem('work_items', id, body, session);
    if (!updated) {
      return NextResponse.json({ error: 'Work item not found' }, { status: 404 });
    }

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
    return NextResponse.json({ error: 'Only administrators can delete work items.' }, { status: 403 });
  }

  const { id } = await params;
  const success = deleteItem('work_items', id, session);
  if (!success) {
    return NextResponse.json({ error: 'Work item not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
