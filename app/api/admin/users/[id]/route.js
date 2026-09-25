import { NextResponse } from 'next/server';
import { getSession, hasPermission, hashPassword } from '@/lib/auth';
import { getItemById, updateItem, deleteItem } from '@/lib/cms-db';

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canManageUsers')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await params;
  const user = getItemById('cms_users', id);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      name: user.name,
      avatar: user.avatar,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    }
  });
}

export async function PUT(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canManageUsers') && session.id !== (await params).id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const updates = { ...body };

    if (updates.password) {
      updates.passwordHash = hashPassword(updates.password);
      delete updates.password;
    }

    const updated = updateItem('cms_users', id, updates, session);
    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: updated.id,
        username: updated.username,
        email: updated.email,
        role: updated.role,
        name: updated.name
      }
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canManageUsers')) {
    return NextResponse.json({ error: 'Only administrators can delete users.' }, { status: 403 });
  }

  const { id } = await params;
  if (id === session.id) {
    return NextResponse.json({ error: 'You cannot delete your own user account.' }, { status: 400 });
  }

  const success = deleteItem('cms_users', id, session);
  if (!success) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
