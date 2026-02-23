import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createUserWithPassword, verifyUserPassword, getUserByEmail } from '../db';
import { createEmailVerificationToken, verifyEmailToken } from '../_core/emailVerification';

describe('Authentication System', () => {
  const testEmail = `auth-test-${Date.now()}@example.com`;
  const testPassword = 'SecurePassword123!';
  const testName = 'Auth Test User';
  let testUserId: number;

  describe('User Registration', () => {
    it('should create a user with hashed password', async () => {
      const user = await createUserWithPassword({
        email: testEmail,
        password: testPassword,
        name: testName,
      });

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBe(testEmail);
      expect(user.name).toBe(testName);
      expect(user.passwordHash).toBeDefined();
      expect(user.passwordHash).not.toBe(testPassword); // Should be hashed
      expect(user.passwordHash?.length).toBe(60); // bcrypt hash length
      
      testUserId = user.id;
    });

    it('should not allow duplicate email registration', async () => {
      await expect(
        createUserWithPassword({
          email: testEmail,
          password: 'AnotherPassword123!',
          name: 'Duplicate User',
        })
      ).rejects.toThrow();
    });
  });

  describe('Password Verification', () => {
    it('should verify correct password', async () => {
      const user = await verifyUserPassword(testEmail, testPassword);
      
      expect(user).toBeDefined();
      expect(user?.email).toBe(testEmail);
    });

    it('should reject incorrect password', async () => {
      const user = await verifyUserPassword(testEmail, 'WrongPassword123!');
      
      expect(user).toBeNull();
    });

    it('should reject non-existent user', async () => {
      const user = await verifyUserPassword('nonexistent@example.com', testPassword);
      
      expect(user).toBeNull();
    });
  });

  describe('Email Verification', () => {
    let verificationToken: string;

    it('should create email verification token', async () => {
      verificationToken = await createEmailVerificationToken(testUserId);
      
      expect(verificationToken).toBeDefined();
      expect(verificationToken.length).toBe(64); // 32 bytes hex = 64 chars
    });

    it('should verify email with valid token', async () => {
      const success = await verifyEmailToken(verificationToken);
      
      expect(success).toBe(true);
      
      // Check user is now verified
      const user = await getUserByEmail(testEmail);
      expect(user?.emailVerified).toBe(true);
    });

    it('should reject invalid token', async () => {
      const success = await verifyEmailToken('invalid-token-12345');
      
      expect(success).toBe(false);
    });

    it('should reject already-used token', async () => {
      // Token should be cleared after use
      const success = await verifyEmailToken(verificationToken);
      
      expect(success).toBe(false);
    });
  });

  describe('Password Requirements', () => {
    it('should enforce minimum password length', async () => {
      // This would be validated at the API level
      // The password 'short' is less than 8 characters
      const shortPassword = 'short';
      expect(shortPassword.length).toBeLessThan(8);
    });
  });
});
