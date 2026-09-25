import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { readDb } from '@/lib/cms-db';

export async function GET(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const entity = searchParams.get('entity') || '';
  const search = searchParams.get('search')?.toLowerCase() || '';

  const db = readDb();
  let logs = db.activity_logs || [];

  if (entity) {
    logs = logs.filter((l) => l.entity?.toLowerCase() === entity.toLowerCase());
  }

  if (search) {
    logs = logs.filter((l) =>
      l.details?.toLowerCase().includes(search) ||
      l.userName?.toLowerCase().includes(search) ||
      l.action?.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ data: logs });
}
