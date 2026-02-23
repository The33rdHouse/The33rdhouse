/**
 * Complete Authentication System Test
 * Tests: signup, login, password validation, email verification
 */

import * as db from './server/db';
import { createEmailVerificationToken, verifyEmailToken } from './server/_core/emailVerification';

async function runTests() {
  console.log('🔐 Authentication System Test Suite\n');
  console.log('='.repeat(50));
  
  const testEmail = `auth-complete-test-${Date.now()}@example.com`;
  const testPassword = 'SecurePassword123!';
  const testName = 'Complete Auth Test User';
  let testUserId: number;
  let passed = 0;
  let failed = 0;

  // Test 1: Create user with password
  console.log('\n📝 Test 1: User Registration with Password');
  try {
    const user = await db.createUserWithPassword({
      email: testEmail,
      password: testPassword,
      name: testName,
    });
    
    if (user && user.passwordHash && user.passwordHash.length === 60) {
      console.log('   ✅ User created with bcrypt hash (60 chars)');
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🔑 Password hash: ${user.passwordHash.substring(0, 20)}...`);
      testUserId = user.id;
      passed++;
    } else {
      console.log('   ❌ User creation failed or password not hashed');
      failed++;
    }
  } catch (error: any) {
    console.log(`   ❌ Error: ${error.message}`);
    failed++;
  }

  // Test 2: Verify correct password
  console.log('\n🔑 Test 2: Verify Correct Password');
  try {
    const user = await db.verifyUserPassword(testEmail, testPassword);
    if (user) {
      console.log('   ✅ Correct password verified successfully');
      passed++;
    } else {
      console.log('   ❌ Correct password verification failed');
      failed++;
    }
  } catch (error: any) {
    console.log(`   ❌ Error: ${error.message}`);
    failed++;
  }

  // Test 3: Reject wrong password
  console.log('\n🚫 Test 3: Reject Wrong Password');
  try {
    const user = await db.verifyUserPassword(testEmail, 'WrongPassword123!');
    if (!user) {
      console.log('   ✅ Wrong password correctly rejected');
      passed++;
    } else {
      console.log('   ❌ Wrong password was accepted (SECURITY ISSUE!)');
      failed++;
    }
  } catch (error: any) {
    console.log(`   ❌ Error: ${error.message}`);
    failed++;
  }

  // Test 4: Reject non-existent user
  console.log('\n👤 Test 4: Reject Non-existent User');
  try {
    const user = await db.verifyUserPassword('nonexistent@example.com', testPassword);
    if (!user) {
      console.log('   ✅ Non-existent user correctly rejected');
      passed++;
    } else {
      console.log('   ❌ Non-existent user was accepted (SECURITY ISSUE!)');
      failed++;
    }
  } catch (error: any) {
    console.log(`   ❌ Error: ${error.message}`);
    failed++;
  }

  // Test 5: Email verification token creation
  console.log('\n📧 Test 5: Email Verification Token Creation');
  let verificationToken: string = '';
  try {
    verificationToken = await createEmailVerificationToken(testUserId);
    if (verificationToken && verificationToken.length === 64) {
      console.log('   ✅ Verification token created (64 hex chars)');
      console.log(`   🎫 Token: ${verificationToken.substring(0, 20)}...`);
      passed++;
    } else {
      console.log('   ❌ Token creation failed');
      failed++;
    }
  } catch (error: any) {
    console.log(`   ❌ Error: ${error.message}`);
    failed++;
  }

  // Test 6: Verify email with token
  console.log('\n✉️ Test 6: Email Verification with Token');
  try {
    const success = await verifyEmailToken(verificationToken);
    if (success) {
      console.log('   ✅ Email verified successfully');
      
      // Check user is now verified
      const user = await db.getUserByEmail(testEmail);
      if (user?.emailVerified) {
        console.log('   ✅ User emailVerified flag is true');
        passed++;
      } else {
        console.log('   ❌ User emailVerified flag not updated');
        failed++;
      }
    } else {
      console.log('   ❌ Email verification failed');
      failed++;
    }
  } catch (error: any) {
    console.log(`   ❌ Error: ${error.message}`);
    failed++;
  }

  // Test 7: Reject invalid token
  console.log('\n🚫 Test 7: Reject Invalid Token');
  try {
    const success = await verifyEmailToken('invalid-token-12345');
    if (!success) {
      console.log('   ✅ Invalid token correctly rejected');
      passed++;
    } else {
      console.log('   ❌ Invalid token was accepted (SECURITY ISSUE!)');
      failed++;
    }
  } catch (error: any) {
    console.log(`   ❌ Error: ${error.message}`);
    failed++;
  }

  // Test 8: Reject already-used token
  console.log('\n🔄 Test 8: Reject Already-Used Token');
  try {
    const success = await verifyEmailToken(verificationToken);
    if (!success) {
      console.log('   ✅ Already-used token correctly rejected');
      passed++;
    } else {
      console.log('   ❌ Already-used token was accepted (SECURITY ISSUE!)');
      failed++;
    }
  } catch (error: any) {
    console.log(`   ❌ Error: ${error.message}`);
    failed++;
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! Authentication system is secure.\n');
  } else {
    console.log('\n⚠️ SOME TESTS FAILED! Please review the issues above.\n');
  }

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(console.error);
