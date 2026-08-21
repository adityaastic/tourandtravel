import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';

const accountId = process.env.R2_ACCOUNT_ID || '8a9b32c5c88746de6a4080d89d90f093';
const accessKeyId = process.env.R2_ACCESS_KEY_ID || 'ef21568c32b4b96fc02fa6132bb4809d';
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || '0ea8f97654494142023c696f337a23ba95533ec03ea718ac62dba4341feb0e91';
const bucketName = process.env.R2_BUCKET_NAME || 'justourism';
const endpoint = process.env.R2_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`;
const publicDomain = process.env.R2_PUBLIC_DOMAIN || '';

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const BUCKET_NAME = bucketName;

export async function uploadToR2(
  fileBuffer: Buffer,
  key: string,
  contentType: string = 'image/jpeg'
): Promise<{ key: string; url: string; size: number }> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await r2Client.send(command);

  // If a public custom domain is configured in Cloudflare R2, use it; otherwise provide S3 endpoint / proxy path
  const url = publicDomain ? `${publicDomain.replace(/\/$/, '')}/${key}` : `/api/media/${key}`;

  return {
    key,
    url,
    size: fileBuffer.length,
  };
}

export async function listR2Objects(prefix: string = ''): Promise<any[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix,
    });

    const response = await r2Client.send(command);
    const contents = response.Contents || [];

    return contents.map((item) => {
      const isVideo = (item.Key || '').match(/\.(mp4|webm|mov)$/i);
      const publicUrl = publicDomain
        ? `${publicDomain.replace(/\/$/, '')}/${item.Key}`
        : `/api/media/${item.Key}`;

      return {
        name: item.Key || '',
        key: item.Key || '',
        type: isVideo ? 'video' : 'image',
        path: publicUrl,
        size: item.Size ? (item.Size / 1024).toFixed(1) + ' KB' : '0 KB',
        modified: item.LastModified ? item.LastModified.toISOString() : new Date().toISOString(),
        isR2: true,
      };
    });
  } catch (error) {
    console.error('Error listing R2 objects:', error);
    return [];
  }
}

export async function deleteFromR2(key: string): Promise<boolean> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });
    await r2Client.send(command);
    return true;
  } catch (error) {
    console.error('Error deleting from R2:', error);
    return false;
  }
}
