import { NextResponse } from 'next/server';
import { getSession, hasPermission } from '@/lib/auth';
import { getCollection, insertItem } from '@/lib/cms-db';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';

  let list = getCollection('media');
  if (search) {
    list = list.filter((m) =>
      m.name?.toLowerCase().includes(search) ||
      m.altText?.toLowerCase().includes(search) ||
      m.caption?.toLowerCase().includes(search)
    );
  }

  list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  return NextResponse.json({ data: list });
}

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'canUploadMedia')) {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  try {
    const contentType = request.headers.get('content-type') || '';

    // If multipart form data (real file upload)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file');
      const altText = formData.get('altText') || '';
      const caption = formData.get('caption') || '';

      if (!file || typeof file === 'string') {
        return NextResponse.json({ error: 'No valid file provided.' }, { status: 400 });
      }

      // Validate mime type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif', 'image/avif'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: 'Invalid file type. Only JPG, PNG, WEBP, SVG, and AVIF images are allowed.' }, { status: 400 });
      }

      // Max size: 10MB
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: 'File size exceeds 10MB limit.' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueFileName = `${Date.now()}-${safeName}`;
      const filePath = path.join(uploadDir, uniqueFileName);

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${uniqueFileName}`;

      const mediaRecord = insertItem('media', {
        name: file.name,
        url: publicUrl,
        path: publicUrl,
        mimeType: file.type,
        size: file.size,
        width: 1200,
        height: 800,
        altText: altText || file.name.replace(/\.[^/.]+$/, ''),
        caption: caption || '',
        credit: 'Ideate X',
        createdAt: new Date().toISOString()
      }, session);

      return NextResponse.json({ success: true, data: mediaRecord }, { status: 201 });
    }

    // JSON upload or external URL link
    const body = await request.json();
    if (!body.url || !body.name) {
      return NextResponse.json({ error: 'URL and Name are required.' }, { status: 400 });
    }

    const mediaRecord = insertItem('media', {
      name: body.name,
      url: body.url,
      path: body.url,
      mimeType: body.mimeType || 'image/jpeg',
      size: body.size || 0,
      width: body.width || 1200,
      height: body.height || 800,
      altText: body.altText || body.name,
      caption: body.caption || '',
      credit: body.credit || 'Ideate X',
      createdAt: new Date().toISOString()
    }, session);

    return NextResponse.json({ success: true, data: mediaRecord }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
