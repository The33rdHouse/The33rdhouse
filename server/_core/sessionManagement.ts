import { getDb } from '../db.js';
import { userSessions, loginHistory } from '../../drizzle/schema.js';
import { eq, and, gt, desc } from 'drizzle-orm';
import crypto from 'crypto';

/**
 * Create a new session with device info
 */
export async function createSessionWithInfo(
  userId: number,
  deviceInfo: {
    ipAddress?: string;
    userAgent?: string;
    deviceName?: string;
  }
): Promise<string> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  // Generate session token
  const sessionToken = crypto.randomBytes(32).toString('hex');

  // Session expires in 30 days
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  // Create session
  await db.insert(userSessions).values({
    userId,
    sessionToken,
    ipAddress: deviceInfo.ipAddress,
    userAgent: deviceInfo.userAgent,
    deviceInfo: deviceInfo.deviceName,
    expiresAt,
  });

  return sessionToken;
}

/**
 * Get all active sessions for a user
 */
export async function getUserSessions(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const now = new Date();
  
  const sessions = await db.select()
    .from(userSessions)
    .where(
      and(
        eq(userSessions.userId, userId),
        gt(userSessions.expiresAt, now)
      )
    )
    .orderBy(desc(userSessions.lastActivity));

  return sessions;
}

/**
 * Revoke a specific session
 */
export async function revokeSession(sessionToken: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  await db.delete(userSessions)
    .where(eq(userSessions.sessionToken, sessionToken));
}

/**
 * Revoke all sessions except the current one
 */
export async function revokeAllOtherSessions(userId: number, currentSessionToken: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  await db.delete(userSessions)
    .where(
      and(
        eq(userSessions.userId, userId),
        // Note: Using SQL to exclude current session
      )
    );

  // Keep only the current session
  const allSessions = await db.select()
    .from(userSessions)
    .where(eq(userSessions.userId, userId));

  for (const session of allSessions) {
    if (session.sessionToken !== currentSessionToken) {
      await db.delete(userSessions)
        .where(eq(userSessions.sessionToken, session.sessionToken));
    }
  }
}

/**
 * Log a login attempt
 */
export async function logLoginAttempt(
  userId: number,
  loginMethod: string,
  success: boolean,
  deviceInfo: {
    ipAddress?: string;
    userAgent?: string;
    deviceName?: string;
    location?: string;
  },
  failureReason?: string
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  await db.insert(loginHistory).values({
    userId,
    loginMethod,
    success,
    ipAddress: deviceInfo.ipAddress,
    userAgent: deviceInfo.userAgent,
    deviceInfo: deviceInfo.deviceName,
    location: deviceInfo.location,
    failureReason,
  });
}

/**
 * Get login history for a user
 */
export async function getLoginHistory(userId: number, limit: number = 20) {
  const db = await getDb();
  if (!db) return [];

  const history = await db.select()
    .from(loginHistory)
    .where(eq(loginHistory.userId, userId))
    .orderBy(desc(loginHistory.createdAt))
    .limit(limit);

  return history;
}

/**
 * Parse user agent to extract device info
 */
export function parseUserAgent(userAgent: string): string {
  if (!userAgent) return 'Unknown Device';

  // Simple parsing - can be enhanced with a library like ua-parser-js
  if (userAgent.includes('iPhone')) return 'iPhone';
  if (userAgent.includes('iPad')) return 'iPad';
  if (userAgent.includes('Android')) return 'Android Device';
  if (userAgent.includes('Windows')) return 'Windows PC';
  if (userAgent.includes('Macintosh')) return 'Mac';
  if (userAgent.includes('Linux')) return 'Linux PC';
  
  return 'Unknown Device';
}
