import { getDb } from './db.js';
import { users } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

/**
 * Update user password hash
 */
export async function updateUserPassword(userId: number, hashedPassword: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error('Database not available');

  await db.update(users)
    .set({ passwordHash: hashedPassword })
    .where(eq(users.id, userId));
}
