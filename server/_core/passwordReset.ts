import crypto from 'crypto';
import { getDb } from '../db.js';
import { users } from '../../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

/**
 * Generate a secure password reset token
 */
export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create and store password reset token for a user
 */
export async function createPasswordResetToken(email: string): Promise<string | null> {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  // Find user by email
  const [user] = await db.select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    // Don't reveal if user exists or not
    return null;
  }

  const token = generateResetToken();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await db.update(users)
    .set({
      passwordResetToken: token,
      passwordResetExpires: expires,
    })
    .where(eq(users.id, user.id));

  return token;
}

/**
 * Reset password with token
 */
export async function resetPasswordWithToken(token: string, newPassword: string): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  const [user] = await db.select()
    .from(users)
    .where(eq(users.passwordResetToken, token))
    .limit(1);

  if (!user) {
    return false;
  }

  // Check if token is expired
  if (user.passwordResetExpires && user.passwordResetExpires < new Date()) {
    return false;
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password and clear reset token
  await db.update(users)
    .set({
      // Note: We need to update the password field in the users table
      // This assumes there's a password field - we'll need to check the schema
      passwordResetToken: null,
      passwordResetExpires: null,
    })
    .where(eq(users.id, user.id));

  // Also update password hash in database
  const { updateUserPassword } = await import('../db-password.js');
  await updateUserPassword(user.id, hashedPassword);

  return true;
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const resetUrl = `${process.env.VITE_FRONTEND_FORGE_API_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

  try {
    const response = await fetch(`${process.env.VITE_FRONTEND_FORGE_API_URL || 'http://localhost:3000'}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Reset Your Password - The 33rd House',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #9333ea;">Password Reset Request</h2>
            <p>We received a request to reset your password for your The 33rd House account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #9333ea; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0;">
              Reset Password
            </a>
            <p>Or copy and paste this link into your browser:</p>
            <p style="color: #666; word-break: break-all;">${resetUrl}</p>
            <p style="color: #999; font-size: 12px; margin-top: 40px;">
              This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      console.error('Failed to send password reset email:', await response.text());
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
}
