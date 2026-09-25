import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { getItemById, updateItem, deleteItem, getCollection } from '@/lib/cms-db';

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const item = getItemById('pages', id);
  if (!item) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
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
      const existing = getCollection('pages').find(
        (p) => p.slug.toLowerCase() === body.slug.toLowerCase() && p.id !== id
      );
      if (existing) {
        return NextResponse.json({ error: `Slug "${body.slug}" is already in use.` }, { status: 400 });
      }
    }

    const updated = updateItem('pages', id, body, session);
    if (!updated) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
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
    return NextResponse.json({ error: 'Only administrators can delete pages.' }, { status: 403 });
  }

  const { id } = await params;
  // Protect core pages
  if (['page-home', 'page-about', 'page-services', 'page-contact'].includes(id)) {
    return NextResponse.json({ error: 'Core system pages cannot be deleted. You can edit or archive them.' }, { status: 400 });
  }

  const success = deleteItem('pages', id, session);
  if (!success) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
