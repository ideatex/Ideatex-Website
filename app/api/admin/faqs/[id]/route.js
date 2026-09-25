import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { getItemById, updateItem, deleteItem } from '@/lib/cms-db';

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const item = getItemById('faqs', id);
  if (!item) {
    return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
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
    const updated = updateItem('faqs', id, body, session);
    if (!updated) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
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
    return NextResponse.json({ error: 'Only administrators can delete FAQs.' }, { status: 403 });
  }

  const { id } = await params;
  const success = deleteItem('faqs', id, session);
  if (!success) {
    return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
