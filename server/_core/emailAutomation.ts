import { getDb } from "../db";
import { userEmailQueue, emailLogs, users } from "../../drizzle/schema";
import { sendEmail } from "./email";
import { eq, and, lte, isNull } from "drizzle-orm";

/**
 * Process pending emails in the queue
 * This should be called by a cron job every 5-10 minutes
 */
export async function processPendingEmails() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    return;
  }

  try {
    // Get all pending emails that are scheduled for now or earlier
    const pendingEmails = await db
      .select({
        queueId: userEmailQueue.id,
        userId: userEmailQueue.userId,
        emailId: userEmailQueue.emailId,
        subject: userEmailQueue.scheduledFor, // We'll need to join with email_sequence_emails
        userEmail: users.email,
        userName: users.name,
      })
      .from(userEmailQueue)
      .innerJoin(users, eq(userEmailQueue.userId, users.id))
      .where(
        and(
          eq(userEmailQueue.status, "pending"),
          lte(userEmailQueue.scheduledFor, new Date()),
          isNull(userEmailQueue.sentAt)
        )
      )
      .limit(50); // Process 50 emails at a time

    console.log(`Found ${pendingEmails.length} pending emails to send`);

    for (const email of pendingEmails) {
      try {
        // In a real implementation, we'd fetch the email content from email_sequence_emails
        // For now, this is a placeholder
        await sendEmail({
          to: email.userEmail,
          subject: "Email from The 33rd House",
          html: "<p>This is a placeholder email</p>",
        });

        // Mark as sent
        await db
          .update(userEmailQueue)
          .set({
            status: "sent",
            sentAt: new Date(),
          })
          .where(eq(userEmailQueue.id, email.queueId));

        // Log the sent email
        await db.insert(emailLogs).values({
          userId: email.userId,
          emailType: "sequence",
          subject: "Email from The 33rd House",
          status: "sent",
          sentAt: new Date(),
        });

        console.log(`Sent email to ${email.userEmail}`);
      } catch (error) {
        console.error(`Failed to send email to ${email.userEmail}:`, error);

        // Mark as failed
        await db
          .update(userEmailQueue)
          .set({
            status: "failed",
            errorMessage: error instanceof Error ? error.message : "Unknown error",
          })
          .where(eq(userEmailQueue.id, email.queueId));

        // Log the failed email
        await db.insert(emailLogs).values({
          userId: email.userId,
          emailType: "sequence",
          subject: "Email from The 33rd House",
          status: "failed",
          errorMessage: error instanceof Error ? error.message : "Unknown error",
          sentAt: new Date(),
        });
      }
    }

    return { processed: pendingEmails.length };
  } catch (error) {
    console.error("Error processing email queue:", error);
    throw error;
  }
}

/**
 * Queue welcome sequence for a new user
 */
export async function queueWelcomeSequence(userId: number, userEmail: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // In a real implementation, we'd fetch the welcome sequence from the database
  // For now, we'll hardcode the schedule
  const welcomeEmails = [
    { delayDays: 0, subject: "Welcome to The 33rd House" },
    { delayDays: 3, subject: "Understanding The System" },
    { delayDays: 7, subject: "Your First Gate Awaits" },
    { delayDays: 10, subject: "The Inner Circle" },
    { delayDays: 14, subject: "Your Path Forward" },
  ];

  for (const email of welcomeEmails) {
    const scheduledFor = new Date();
    scheduledFor.setDate(scheduledFor.getDate() + email.delayDays);

    await db.insert(userEmailQueue).values({
      userId,
      sequenceId: 1, // Welcome sequence ID
      emailId: 1, // Placeholder
      scheduledFor,
      status: "pending",
    });
  }

  console.log(`Queued welcome sequence for user ${userId} (${userEmail})`);
}

/**
 * Queue milestone email (realm completed, gate completed, etc.)
 */
export async function queueMilestoneEmail(
  userId: number,
  emailType: "realm_completed" | "gate_completed" | "achievement_unlocked",
  metadata: Record<string, any>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Schedule for immediate delivery
  const scheduledFor = new Date();

  await db.insert(userEmailQueue).values({
    userId,
    sequenceId: 2, // Milestone sequence ID
    emailId: 1, // Placeholder
    scheduledFor,
    status: "pending",
  });

  console.log(`Queued ${emailType} email for user ${userId}`);
}

/**
 * Start the email automation cron job
 * Call this when the server starts
 */
export function startEmailAutomation() {
  // Process emails every 5 minutes
  const INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

  setInterval(async () => {
    try {
      await processPendingEmails();
    } catch (error) {
      console.error("Email automation error:", error);
    }
  }, INTERVAL);

  console.log("Email automation started - processing every 5 minutes");
}
