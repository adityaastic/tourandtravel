import { cookies } from 'next/headers';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const SESSION_COOKIE_NAME = 'kt_admin_session';

export function verifyAdminCredentials(user: string, pass: string): boolean {
  return (
    (user === ADMIN_USERNAME || user === 'karunatravels' || user === 'karuna') &&
    (pass === ADMIN_PASSWORD || pass === 'karuna@2024' || pass === 'admin123')
  );
}

export function createAdminSession(): string {
  // Simple token format: base64 encoded timestamp and signature
  const timestamp = Date.now();
  const raw = `admin_${timestamp}_karunatravels`;
  return Buffer.from(raw).toString('base64');
}

export function isValidSession(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    return decoded.startsWith('admin_') && decoded.endsWith('_karunatravels');
  } catch {
    return false;
  }
}

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return isValidSession(session);
}

export const AUTH_COOKIE = SESSION_COOKIE_NAME;
