import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { getCollection, insertItem, updateItem, deleteItem, readDb, writeDb } from '@/lib/cms-db';

export async function GET(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'knowledge' or 'enquiries'

  const db = readDb();

  if (type === 'enquiries') {
    const enquiries = (db.chatbot_enquiries || []).sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
    return NextResponse.json({ data: enquiries });
  }

  const knowledge = (db.chatbot_knowledge || []).sort((a, b) => (a.order || 0) - (b.order || 0));
  const enquiries = (db.chatbot_enquiries || []).sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  );

  return NextResponse.json({
    knowledge,
    enquiries
  });
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
    const isEnquiry = body.type === 'chatbot_enquiry';

    if (isEnquiry) {
      const item = insertItem('chatbot_enquiries', {
        ...body,
        status: body.status || 'new',
        createdAt: new Date().toISOString()
      }, session);
      return NextResponse.json({ success: true, data: item }, { status: 201 });
    }

    if (!body.title || !body.content) {
      return NextResponse.json({ error: 'Title and Content are required' }, { status: 400 });
    }

    const item = insertItem('chatbot_knowledge', {
      ...body,
      isEnabled: body.isEnabled !== false,
      order: body.order || 1
    }, session);

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
