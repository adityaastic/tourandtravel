import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const slotName = formData.get('slotName') as string | null;
    const mediaType = formData.get('mediaType') as string || 'image';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || (mediaType === 'video' ? '.mp4' : '.jpg');
    let targetFileName = file.name;

    if (slotName && slotName.trim()) {
      const cleanSlot = slotName.trim().replace(/[^a-zA-Z0-9_-]/g, '');
      targetFileName = `${cleanSlot}${ext}`;
    }

    const targetDir = mediaType === 'video' 
      ? path.join(process.cwd(), 'public', 'videos')
      : path.join(process.cwd(), 'public', 'images');

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, targetFileName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = mediaType === 'video' ? `/videos/${targetFileName}` : `/images/${targetFileName}`;

    return NextResponse.json({
      success: true,
      filename: targetFileName,
      url: publicUrl,
      size: (buffer.length / 1024).toFixed(1) + ' KB',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
