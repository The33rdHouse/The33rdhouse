#!/usr/bin/env node
/**
 * Sync The 33rd House users to Notion for progress tracking
 * 
 * Usage: node sync-users-to-notion.mjs
 * 
 * This script:
 * 1. Creates a Notion database for user progress (if it doesn't exist)
 * 2. Creates a Notion page for each user with their current progress
 * 3. Logs results to console and a file
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { createConnection } from 'mysql2/promise';
import { writeFileSync } from 'fs';

const execAsync = promisify(exec);

const NOTION_DB_TITLE = "33rd House - User Progress";
const LOG_FILE = '/home/ubuntu/notion-sync-log.txt';

async function runNotionCommand(command) {
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stderr && !stderr.includes('Tool info saved')) {
      console.error('Notion command stderr:', stderr);
    }
    return stdout;
  } catch (error) {
    console.error('Notion command failed:', error.message);
    throw error;
  }
}

async function findOrCreateNotionDatabase() {
  console.log('🔍 Searching for existing Notion database...');
  
  // Search for the database
  const searchCmd = `manus-mcp-cli tool call notion-search --server notion --input '{"query":"${NOTION_DB_TITLE}","filter":"database"}' 2>&1`;
  const searchResult = await runNotionCommand(searchCmd);
  
  // Check if database exists
  const dbIdMatch = searchResult.match(/database[_\s]?id["\s:]+([a-f0-9-]+)/i);
  
  if (dbIdMatch) {
    console.log('✅ Found existing database:', dbIdMatch[1]);
    return dbIdMatch[1];
  }
  
  console.log('📝 Creating new Notion database...');
  
  // Create the database with proper schema
  const createCmd = `manus-mcp-cli tool call notion-create-database --server notion --input '${JSON.stringify({
    title: [{ text: { content: NOTION_DB_TITLE } }],
    properties: {
      "Name": { title: {} },
      "Email": { email: {} },
      "Membership": { 
        select: { 
          options: [
            { name: "Free", color: "gray" },
            { name: "Seeker", color: "blue" },
            { name: "Initiate", color: "purple" },
            { name: "Elder", color: "yellow" }
          ]
        }
      },
      "Current Gate": { number: { format: "number" } },
      "Current Realm": { number: { format: "number" } },
      "Progress %": { number: { format: "percent" } },
      "Books": { number: { format: "number" } },
      "Joined": { date: {} },
      "Last Active": { date: {} }
    }
  })}' 2>&1`;
  
  const createResult = await runNotionCommand(createCmd);
  const newDbIdMatch = createResult.match(/database[_\s]?id["\s:]+([a-f0-9-]+)/i);
  
  if (!newDbIdMatch) {
    throw new Error('Failed to create Notion database');
  }
  
  console.log('✅ Created database:', newDbIdMatch[1]);
  return newDbIdMatch[1];
}

async function createUserPage(databaseId, user, progress) {
  const membershipTier = user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1);
  const currentRealm = progress + 1;
  const currentGate = Math.ceil(currentRealm / 12);
  const progressPercent = progress / 144;
  
  const createPageCmd = `manus-mcp-cli tool call notion-create-pages --server notion --input '${JSON.stringify({
    parent: { database_id: databaseId },
    properties: {
      "Name": {
        title: [{ text: { content: user.name || user.email || 'Unknown User' } }]
      },
      "Email": {
        email: user.email || ''
      },
      "Membership": {
        select: { name: membershipTier }
      },
      "Current Gate": {
        number: Math.min(currentGate, 12)
      },
      "Current Realm": {
        number: Math.min(currentRealm, 144)
      },
      "Progress %": {
        number: progressPercent
      },
      "Books": {
        number: 0 // TODO: Query actual book purchases
      },
      "Joined": {
        date: { start: user.createdAt.split('T')[0] }
      },
      "Last Active": {
        date: { start: user.lastSignedIn.split('T')[0] }
      }
    }
  })}' 2>&1`;
  
  const result = await runNotionCommand(createPageCmd);
  const urlMatch = result.match(/https:\/\/www\.notion\.so\/[^\s\)]+/);
  
  return {
    success: true,
    pageUrl: urlMatch ? urlMatch[0] : null
  };
}

async function main() {
  console.log('🚀 Starting Notion sync for The 33rd House users...\n');
  
  const logEntries = [];
  const startTime = new Date();
  
  try {
    // Connect to database
    console.log('📊 Connecting to database...');
    const connection = await createConnection(process.env.DATABASE_URL);
    
    // Get all users
    const [users] = await connection.execute('SELECT * FROM users');
    console.log(`Found ${users.length} users\n`);
    
    // Find or create Notion database
    const databaseId = await findOrCreateNotionDatabase();
    console.log('');
    
    // Sync each user
    const results = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      console.log(`[${i + 1}/${users.length}] Syncing ${user.name || user.email}...`);
      
      try {
        // Get user's progress
        const [progressRows] = await connection.execute(
          'SELECT COUNT(*) as completed FROM user_progress WHERE userId = ? AND completed = 1',
          [user.id]
        );
        const progress = progressRows[0]?.completed || 0;
        
        // Create Notion page
        const result = await createUserPage(databaseId, user, progress);
        
        results.push({
          userId: user.id,
          name: user.name || user.email,
          success: result.success,
          pageUrl: result.pageUrl
        });
        
        console.log(`  ✅ Created: ${result.pageUrl || 'Success'}`);
        
        // Rate limiting: wait 1 second between requests
        if (i < users.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`  ❌ Failed: ${error.message}`);
        results.push({
          userId: user.id,
          name: user.name || user.email,
          success: false,
          error: error.message
        });
      }
    }
    
    await connection.end();
    
    // Summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log('\n' + '='.repeat(50));
    console.log('📈 SYNC COMPLETE');
    console.log('='.repeat(50));
    console.log(`Total users: ${users.length}`);
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⏱️  Duration: ${Math.round((new Date() - startTime) / 1000)}s`);
    console.log('='.repeat(50));
    
    // Write log file
    const logContent = {
      timestamp: startTime.toISOString(),
      duration: Math.round((new Date() - startTime) / 1000),
      total: users.length,
      successful,
      failed,
      results
    };
    
    writeFileSync(LOG_FILE, JSON.stringify(logContent, null, 2));
    console.log(`\n📝 Log saved to: ${LOG_FILE}`);
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
