import { describe, it, expect, beforeAll } from 'vitest';
import * as db from './db';

describe('Platform Database Tests', () => {
  describe('Gates', () => {
    it('should retrieve all 12 gates', async () => {
      const gates = await db.getAllGates();
      expect(gates).toBeDefined();
      expect(gates.length).toBe(12);
    });

    it('should retrieve gate by number', async () => {
      const gate = await db.getGateByNumber(1);
      expect(gate).toBeDefined();
      expect(gate?.number).toBe(1);
      expect(gate?.name).toBe('The Gate of Origin');
      expect(gate?.keyword).toBe('Embodiment');
    });

    it('should retrieve gate by ID', async () => {
      const gate = await db.getGateById(1);
      expect(gate).toBeDefined();
      expect(gate?.id).toBe(1);
    });

    it('should have correct gate structure', async () => {
      const gate = await db.getGateByNumber(3);
      expect(gate).toBeDefined();
      expect(gate?.name).toContain('Power');
      expect(gate?.theme).toBeDefined();
      expect(gate?.shadow).toBeDefined();
      expect(gate?.gift).toBeDefined();
      expect(gate?.somaticShift).toBeDefined();
      expect(gate?.praxis).toBeDefined();
    });
  });

  describe('Realms', () => {
    it('should retrieve all 144 realms', async () => {
      const realms = await db.getAllRealms();
      expect(realms).toBeDefined();
      expect(realms.length).toBe(144);
    });

    it('should retrieve realm by number', async () => {
      const realm = await db.getRealmByNumber(1);
      expect(realm).toBeDefined();
      expect(realm?.number).toBe(1);
      expect(realm?.gateId).toBe(1);
    });

    it('should retrieve realms by gate', async () => {
      const realms = await db.getRealmsByGate(1);
      expect(realms).toBeDefined();
      expect(realms.length).toBe(12);
      
      // All realms should belong to gate 1
      realms.forEach(realm => {
        expect(realm.gateId).toBe(1);
      });
    });

    it('should have correct realm structure', async () => {
      const realm = await db.getRealmByNumber(50);
      expect(realm).toBeDefined();
      expect(realm?.mythicLayer).toBeDefined();
      expect(realm?.psychologicalLayer).toBeDefined();
      expect(realm?.hybridLayer).toBeDefined();
      expect(realm?.practices).toBeDefined();
    });

    it('should have realms distributed across all 12 gates', async () => {
      for (let gateId = 1; gateId <= 12; gateId++) {
        const realms = await db.getRealmsByGate(gateId);
        expect(realms.length).toBe(12);
      }
    });
  });

  describe('Inner Circle', () => {
    it('should retrieve all 12 months', async () => {
      const months = await db.getAllInnerCircleMonths();
      expect(months).toBeDefined();
      expect(months.length).toBe(12);
    });

    it('should retrieve specific month', async () => {
      const month = await db.getInnerCircleMonth(1);
      expect(month).toBeDefined();
      expect(month?.monthNumber).toBe(1);
      expect(month?.title).toBe('Foundations of Embodiment');
      expect(month?.gateId).toBe(1);
    });

    it('should retrieve weeks for a month', async () => {
      const weeks = await db.getInnerCircleWeeks(1);
      expect(weeks).toBeDefined();
      expect(weeks.length).toBe(4);
      
      // Weeks should be numbered 1-4
      expect(weeks[0].weekNumber).toBe(1);
      expect(weeks[3].weekNumber).toBe(4);
    });

    it('should have correct month structure', async () => {
      const month = await db.getInnerCircleMonth(6);
      expect(month).toBeDefined();
      expect(month?.title).toBeDefined();
      expect(month?.theme).toBeDefined();
      expect(month?.coreTeaching).toBeDefined();
      expect(month?.gateId).toBeGreaterThan(0);
    });

    it('should have correct week structure', async () => {
      const weeks = await db.getInnerCircleWeeks(3);
      expect(weeks.length).toBeGreaterThan(0);
      
      const week = weeks[0];
      expect(week.title).toBeDefined();
      expect(week.videoScript).toBeDefined();
      expect(week.somaticPractice).toBeDefined();
      expect(week.dailyPrompt).toBeDefined();
      expect(week.engagementQuestion).toBeDefined();
    });

    it('should have all 12 months mapped to gates', async () => {
      const months = await db.getAllInnerCircleMonths();
      
      // Each month should be associated with a gate
      months.forEach(month => {
        expect(month.gateId).toBeGreaterThanOrEqual(1);
        expect(month.gateId).toBeLessThanOrEqual(12);
      });
    });
  });

  describe('Data Integrity', () => {
    it('should have gates ordered correctly', async () => {
      const gates = await db.getAllGates();
      
      for (let i = 0; i < gates.length - 1; i++) {
        expect(gates[i].orderIndex).toBeLessThan(gates[i + 1].orderIndex);
      }
    });

    it('should have realms ordered correctly', async () => {
      const realms = await db.getAllRealms();
      
      for (let i = 0; i < realms.length - 1; i++) {
        expect(realms[i].orderIndex).toBeLessThan(realms[i + 1].orderIndex);
      }
    });

    it('should have realm numbers matching gate distribution', async () => {
      const realms = await db.getAllRealms();
      
      // Realm 1-12 should be gate 1
      const firstGateRealms = realms.filter(r => r.number >= 1 && r.number <= 12);
      firstGateRealms.forEach(r => expect(r.gateId).toBe(1));
      
      // Realm 13-24 should be gate 2
      const secondGateRealms = realms.filter(r => r.number >= 13 && r.number <= 24);
      secondGateRealms.forEach(r => expect(r.gateId).toBe(2));
      
      // Realm 133-144 should be gate 12
      const lastGateRealms = realms.filter(r => r.number >= 133 && r.number <= 144);
      lastGateRealms.forEach(r => expect(r.gateId).toBe(12));
    });
  });

  describe('Content Quality', () => {
    it('should have meaningful gate content', async () => {
      const gate = await db.getGateByNumber(5);
      expect(gate).toBeDefined();
      
      // Check that content is substantial
      expect(gate!.description.length).toBeGreaterThan(50);
      expect(gate!.shadow.length).toBeGreaterThan(20);
      expect(gate!.gift.length).toBeGreaterThan(20);
      expect(gate!.praxis.length).toBeGreaterThan(20);
    });

    it('should have meaningful realm content', async () => {
      const realm = await db.getRealmByNumber(72);
      expect(realm).toBeDefined();
      
      // Check that content is substantial
      expect(realm!.mythicLayer.length).toBeGreaterThan(50);
      expect(realm!.psychologicalLayer.length).toBeGreaterThan(50);
      expect(realm!.hybridLayer.length).toBeGreaterThan(50);
    });

    it('should have meaningful Inner Circle content', async () => {
      const month = await db.getInnerCircleMonth(8);
      expect(month).toBeDefined();
      
      // Check that content is substantial
      expect(month!.coreTeaching.length).toBeGreaterThan(100);
      expect(month!.theme.length).toBeGreaterThan(5);
    });
  });

  describe('User Progress Functions', () => {
    it('should handle non-existent user progress gracefully', async () => {
      const progress = await db.getUserProgress(999999);
      expect(progress).toBeDefined();
      expect(Array.isArray(progress)).toBe(true);
      expect(progress.length).toBe(0);
    });

    it('should handle non-existent realm progress gracefully', async () => {
      const progress = await db.getRealmProgress(999999, 1);
      expect(progress).toBeNull();
    });
  });

  describe('Meditation Functions', () => {
    it('should handle non-existent user sessions gracefully', async () => {
      const sessions = await db.getUserMeditationSessions(999999);
      expect(sessions).toBeDefined();
      expect(Array.isArray(sessions)).toBe(true);
      expect(sessions.length).toBe(0);
    });

    it('should handle non-existent realm sessions gracefully', async () => {
      const sessions = await db.getRealmMeditationSessions(999999, 1);
      expect(sessions).toBeDefined();
      expect(Array.isArray(sessions)).toBe(true);
      expect(sessions.length).toBe(0);
    });
  });

  describe('Audio Meditations', () => {
    it('should retrieve all audio meditations', async () => {
      const audios = await db.getAllAudioMeditations();
      expect(audios).toBeDefined();
      expect(Array.isArray(audios)).toBe(true);
    });

    it('should handle non-existent audio meditation gracefully', async () => {
      const audio = await db.getAudioMeditation(999);
      expect(audio).toBeNull();
    });
  });

  describe('Notifications', () => {
    it('should handle non-existent user notifications gracefully', async () => {
      const notifications = await db.getUserNotifications(999999);
      expect(notifications).toBeDefined();
      expect(Array.isArray(notifications)).toBe(true);
      expect(notifications.length).toBe(0);
    });

    it('should return zero for non-existent user unread count', async () => {
      const count = await db.getUnreadNotificationCount(999999);
      expect(count).toBe(0);
    });
  });

  describe('Forum', () => {
    it('should retrieve forum posts', async () => {
      const posts = await db.getForumPosts();
      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBe(true);
    });

    it('should handle non-existent post gracefully', async () => {
      const post = await db.getForumPost(999999);
      expect(post).toBeNull();
    });

    it('should retrieve forum comments', async () => {
      const comments = await db.getForumComments(999999);
      expect(comments).toBeDefined();
      expect(Array.isArray(comments)).toBe(true);
    });
  });

  describe('Email Sequences', () => {
    it('should retrieve all email sequences', async () => {
      const sequences = await db.getAllEmailSequences();
      expect(sequences).toBeDefined();
      expect(Array.isArray(sequences)).toBe(true);
    });

    it('should handle non-existent sequence gracefully', async () => {
      const sequence = await db.getEmailSequence(999999);
      expect(sequence).toBeNull();
    });

    it('should retrieve user email logs', async () => {
      const logs = await db.getUserEmailLogs(999999);
      expect(logs).toBeDefined();
      expect(Array.isArray(logs)).toBe(true);
    });
  });
});
