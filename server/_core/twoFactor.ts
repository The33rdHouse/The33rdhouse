import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import { getDb } from '../db.js';
import { users } from '../../drizzle/schema.js';
import { eq } from 'drizzle-orm';

/**
 * Generate a new 2FA secret for a user
 */
export function generateTwoFactorSecret(): string {
  return authenticator.generateSecret();
}

/**
 * Generate QR code data URL for 2FA setup
 */
export async function generateQRCode(email: string, secret: string): Promise<string> {
  const appName = 'The 33rd House';
  const otpauth = authenticator.keyuri(email, appName, secret);
  
  try {
    const qrCodeDataURL = await QRCode.toDataURL(otpauth);
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Verify a TOTP token against a secret
 */
export function verifyTwoFactorToken(token: string, secret: string): boolean {
  try {
    return authenticator.verify({ token, secret });
  } catch (error) {
    console.error('Error verifying 2FA token:', error);
    return false;
  }
}

/**
 * Enable 2FA for a user
 */
export async function enableTwoFactor(userId: number, secret: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  await db.update(users)
    .set({
      twoFactorEnabled: true,
      twoFactorSecret: secret,
    })
    .where(eq(users.id, userId));
}

/**
 * Disable 2FA for a user
 */
export async function disableTwoFactor(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  await db.update(users)
    .set({
      twoFactorEnabled: false,
      twoFactorSecret: null,
    })
    .where(eq(users.id, userId));
}

/**
 * Check if user has 2FA enabled
 */
export async function isTwoFactorEnabled(userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const [user] = await db.select({ twoFactorEnabled: users.twoFactorEnabled })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user?.twoFactorEnabled || false;
}
