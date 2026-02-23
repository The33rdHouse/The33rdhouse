import crypto from 'crypto';
import { getDb } from '../db.js';
import { users } from '../../drizzle/schema.js';
import { eq } from 'drizzle-orm';

/**
 * Generate a secure email verification token
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create and store email verification token for a user
 */
export async function createEmailVerificationToken(userId: number): Promise<string> {
  const token = generateVerificationToken();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  await db.update(users)
    .set({
      emailVerificationToken: token,
      emailVerificationExpires: expires,
    })
    .where(eq(users.id, userId));

  return token;
}

/**
 * Verify email with token
 */
export async function verifyEmailToken(token: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  const [user] = await db.select()
    .from(users)
    .where(eq(users.emailVerificationToken, token))
    .limit(1);

  if (!user) {
    return false;
  }

  // Check if token is expired
  if (user.emailVerificationExpires && user.emailVerificationExpires < new Date()) {
    return false;
  }

  // Mark email as verified and clear token
  await db.update(users)
    .set({
      emailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null,
    })
    .where(eq(users.id, user.id));

  return true;
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(email: string, name: string, token: string): Promise<void> {
  const verificationUrl = `${process.env.VITE_FRONTEND_FORGE_API_URL || 'http://localhost:3000'}/verify-email?token=${token}`;

  // Use Gmail MCP to send email
  try {
    const response = await fetch(`${process.env.VITE_FRONTEND_FORGE_API_URL || 'http://localhost:3000'}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Verify Your Email - The 33rd House',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #9333ea;">Welcome to The 33rd House, ${name}!</h2>
            <p>Thank you for creating your account. Please verify your email address to complete your registration.</p>
            <p>Click the button below to verify your email:</p>
            <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #9333ea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
              Verify Email Address
            </a>
            <p>Or copy and paste this link into your browser:</p>
            <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
            <p style="color: #999; font-size: 12px; margin-top: 40px;">
              This link will expire in 24 hours. If you didn't create an account with The 33rd House, you can safely ignore this email.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send verification email:', await response.text());
    }
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}
