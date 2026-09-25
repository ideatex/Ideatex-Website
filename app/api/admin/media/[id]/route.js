import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { getItemById, updateItem, deleteItem } from '@/lib/cms-db';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const item = getItemById('media', id);
  if (!item) {
    return NextResponse.json({ error: 'Media not found' }, { status: 404 });
  }

  return NextResponse.json({ data: item });
}

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canUploadMedia')) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const updated = updateItem('media', id, body, session);
    if (!updated) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
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
    return NextResponse.json({ error: 'Only administrators can delete media.' }, { status: 403 });
  }

  const { id } = await params;
  const item = getItemById('media', id);
  if (!item) {
    return NextResponse.json({ error: 'Media not found' }, { status: 404 });
  }

  // If local file in /uploads, optionally remove
  if (item.url?.startsWith('/uploads/')) {
    try {
      const localPath = path.join(process.cwd(), 'public', item.url);
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }
    } catch (e) {
      console.error('Failed to unlink local file:', e);
    }
  }

  deleteItem('media', id, session);
  return NextResponse.json({ success: true });
}
