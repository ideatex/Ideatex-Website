import { NextResponse } from 'next/server';
import { authenticateUser, signSession, verifySession, SESSION_COOKIE_NAME, getSession } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username/Email and Password are required.' },
        { status: 400 }
      );
    }

    const user = authenticateUser(username, password);
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials. Please verify username and password.' },
        { status: 401 }
      );
    }

    const token = signSession({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      name: user.name,
      avatar: user.avatar,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const response = NextResponse.json({
      success: true,
      user
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal authentication error: ' + err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }
    return NextResponse.json({ authenticated: true, user: session });
  } catch (err) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0
  });
  return response;
}
