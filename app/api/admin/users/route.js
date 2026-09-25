import { NextResponse } from 'next/server';
import { getSession, hasPermission, hashPassword } from '@/lib/auth';
import { getCollection, insertItem } from '@/lib/cms-db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canManageUsers')) {
    return NextResponse.json({ error: 'Only administrators can manage users.' }, { status: 403 });
  }

  const users = getCollection('cms_users').map((u) => ({
    id: u.id,
    username: u.username,
    email: u.email,
    role: u.role,
    name: u.name,
    avatar: u.avatar,
    createdAt: u.createdAt,
    lastLogin: u.lastLogin
  }));

  return NextResponse.json({ data: users });
}

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canManageUsers')) {
    return NextResponse.json({ error: 'Only administrators can create users.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { username, email, password, role, name } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Username, Email, and Password are required.' }, { status: 400 });
    }

    const existing = getCollection('cms_users').find(
      (u) => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email.toLowerCase()
    );
    if (existing) {
      return NextResponse.json({ error: 'A user with this username or email already exists.' }, { status: 400 });
    }

    const newUser = insertItem('cms_users', {
      username,
      email,
      passwordHash: hashPassword(password),
      role: role || 'EDITOR',
      name: name || username,
      avatar: '/logo-ideatex.png',
      createdAt: new Date().toISOString(),
      lastLogin: null
    }, session);

    return NextResponse.json({
      success: true,
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name
      }
    }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
