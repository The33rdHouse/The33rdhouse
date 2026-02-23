import { Router } from 'express';
import { getDb } from './db';
import { userProgress, meditationSessions, gates, realms } from '../drizzle/schema';
import { eq, and, desc } from 'drizzle-orm';

const router = Router();

// Get user's progress for all realms
router.get('/api/progress', async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not available' });
    }

    const progress = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));

    res.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Mark a realm as completed
router.post('/api/progress/:realmNumber', async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const realmNumber = parseInt(req.params.realmNumber);
    const { notes } = req.body;

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not available' });
    }

    // Check if progress already exists
    const existing = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.realmNumber, realmNumber)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Update existing progress
      await db
        .update(userProgress)
        .set({
          completed: true,
          completedAt: new Date(),
          notes: notes || existing[0].notes,
        })
        .where(eq(userProgress.id, existing[0].id));
    } else {
      // Insert new progress
      await db.insert(userProgress).values({
        userId,
        realmNumber,
        completed: true,
        completedAt: new Date(),
        notes,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Get user's meditation sessions
router.get('/api/meditation-sessions', async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not available' });
    }

    const sessions = await db
      .select()
      .from(meditationSessions)
      .where(eq(meditationSessions.userId, userId))
      .orderBy(desc(meditationSessions.completedAt))
      .limit(50);

    res.json(sessions);
  } catch (error) {
    console.error('Error fetching meditation sessions:', error);
    res.status(500).json({ error: 'Failed to fetch meditation sessions' });
  }
});

// Record a meditation session
router.post('/api/meditation-sessions', async (req, res) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { realmNumber, duration } = req.body;

    if (!realmNumber || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not available' });
    }

    await db.insert(meditationSessions).values({
      userId,
      realmNumber: parseInt(realmNumber),
      duration: parseInt(duration),
      completedAt: new Date(),
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error recording meditation session:', error);
    res.status(500).json({ error: 'Failed to record meditation session' });
  }
});

// Get all gates
router.get('/api/gates', async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not available' });
    }

    const allGates = await db
      .select()
      .from(gates)
      .orderBy(gates.number);

    res.json(allGates);
  } catch (error) {
    console.error('Error fetching gates:', error);
    res.status(500).json({ error: 'Failed to fetch gates' });
  }
});

// Get a specific gate
router.get('/api/gates/:number', async (req, res) => {
  try {
    const gateNumber = parseInt(req.params.number);

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not available' });
    }

    const gate = await db
      .select()
      .from(gates)
      .where(eq(gates.number, gateNumber))
      .limit(1);

    if (gate.length === 0) {
      return res.status(404).json({ error: 'Gate not found' });
    }

    res.json(gate[0]);
  } catch (error) {
    console.error('Error fetching gate:', error);
    res.status(500).json({ error: 'Failed to fetch gate' });
  }
});

// Get all realms
router.get('/api/realms', async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not available' });
    }

    const allRealms = await db
      .select()
      .from(realms)
      .orderBy(realms.number);

    res.json(allRealms);
  } catch (error) {
    console.error('Error fetching realms:', error);
    res.status(500).json({ error: 'Failed to fetch realms' });
  }
});

// Get realms for a specific gate
router.get('/api/gates/:number/realms', async (req, res) => {
  try {
    const gateNumber = parseInt(req.params.number);

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not available' });
    }

    // First get the gate
    const gate = await db
      .select()
      .from(gates)
      .where(eq(gates.number, gateNumber))
      .limit(1);

    if (gate.length === 0) {
      return res.status(404).json({ error: 'Gate not found' });
    }

    // Then get realms for this gate
    const gateRealms = await db
      .select()
      .from(realms)
      .where(eq(realms.gateId, gate[0].id))
      .orderBy(realms.number);

    res.json(gateRealms);
  } catch (error) {
    console.error('Error fetching gate realms:', error);
    res.status(500).json({ error: 'Failed to fetch gate realms' });
  }
});

// Get a specific realm
router.get('/api/realms/:number', async (req, res) => {
  try {
    const realmNumber = parseInt(req.params.number);

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: 'Database not available' });
    }

    const realm = await db
      .select()
      .from(realms)
      .where(eq(realms.number, realmNumber))
      .limit(1);

    if (realm.length === 0) {
      return res.status(404).json({ error: 'Realm not found' });
    }

    res.json(realm[0]);
  } catch (error) {
    console.error('Error fetching realm:', error);
    res.status(500).json({ error: 'Failed to fetch realm' });
  }
});

export default router;
