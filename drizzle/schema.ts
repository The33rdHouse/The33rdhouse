import { integer, pgEnum, pgTable, text, timestamp, varchar, boolean, unique, numeric, date, serial } from "drizzle-orm/pg-core";

// PostgreSQL enum definitions
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);
export const subscriptionTierEnum = pgEnum("subscription_tier", ["free", "seeker", "initiate", "elder"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "canceled", "past_due", "trialing"]);
export const forumCategoryEnum = pgEnum("forum_category", ["general", "gate", "realm", "elder_qa", "practice"]);
export const notificationTypeEnum = pgEnum("notification_type", ["announcement", "update", "alert", "meditation_reminder", "achievement"]);
export const emailTriggerEnum = pgEnum("email_trigger", ["user_signup", "realm_completed", "gate_completed", "achievement_unlocked", "manual"]);
export const emailQueueStatusEnum = pgEnum("email_queue_status", ["pending", "sent", "failed"]);
export const emailLogStatusEnum = pgEnum("email_log_status", ["sent", "failed"]);
export const productCategoryEnum = pgEnum("product_category", ["book", "course", "meditation", "merchandise", "reading"]);
export const productStatusEnum = pgEnum("product_status", ["draft", "active", "archived"]);
export const purchaseStatusEnum = pgEnum("purchase_status", ["pending", "completed", "failed", "refunded"]);
export const bookingStatusEnum = pgEnum("booking_status", ["pending", "paid", "scheduled", "completed", "canceled"]);
export const orderStatusEnum = pgEnum("order_status", ["pending", "paid", "processing", "shipped", "delivered", "canceled", "refunded"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "paid", "failed", "refunded"]);
export const fulfillmentStatusEnum = pgEnum("fulfillment_status", ["unfulfilled", "partial", "fulfilled"]);
export const accessTierEnum = pgEnum("access_tier", ["free", "seeker", "initiate", "elder", "admin"]);
export const ruleTypeEnum = pgEnum("rule_type", ["tier", "user", "role", "purchase"]);

/**
 * Core user table backing auth flow.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  passwordHash: varchar("passwordHash", { length: 255 }),
  role: userRoleEnum("role").default("user").notNull(),
  // Email verification
  emailVerified: boolean("emailVerified").default(false).notNull(),
  emailVerificationToken: varchar("emailVerificationToken", { length: 255 }),
  emailVerificationExpires: timestamp("emailVerificationExpires"),
  // Password reset
  passwordResetToken: varchar("passwordResetToken", { length: 255 }),
  passwordResetExpires: timestamp("passwordResetExpires"),
  // Two-factor authentication
  twoFactorEnabled: boolean("twoFactorEnabled").default(false).notNull(),
  twoFactorSecret: varchar("twoFactorSecret", { length: 255 }),
  // Stripe subscription fields
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  subscriptionTier: subscriptionTierEnum("subscriptionTier").default("free").notNull(),
  subscriptionStatus: subscriptionStatusEnum("subscriptionStatus").default("active").notNull(),
  subscriptionEndsAt: timestamp("subscriptionEndsAt"),
  // Portal entry fields
  birthDate: varchar("birthDate", { length: 20 }),
  birthTime: varchar("birthTime", { length: 20 }),
  birthLocation: text("birthLocation"),
  portalDocumentsSigned: boolean("portalDocumentsSigned").default(false).notNull(),
  portalCompletedAt: timestamp("portalCompletedAt"),
  // Onboarding progress
  onboardingCompleted: boolean("onboardingCompleted").default(false).notNull(),
  onboardingStep: varchar("onboardingStep", { length: 50 }),
  onboardingCompletedAt: timestamp("onboardingCompletedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User sessions for session management
 */
export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().unique(),
  deviceInfo: text("deviceInfo"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  lastActivity: timestamp("lastActivity").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
});

export type UserSession = typeof userSessions.$inferSelect;
export type InsertUserSession = typeof userSessions.$inferInsert;

/**
 * Login history for security tracking
 */
export const loginHistory = pgTable("login_history", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  loginMethod: varchar("loginMethod", { length: 64 }).notNull(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  deviceInfo: text("deviceInfo"),
  location: varchar("location", { length: 255 }),
  success: boolean("success").default(true).notNull(),
  failureReason: text("failureReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LoginHistory = typeof loginHistory.$inferSelect;
export type InsertLoginHistory = typeof loginHistory.$inferInsert;

/**
 * User progress tracking for realms
 */
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  realmNumber: integer("realmNumber").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (table) => ({
  userRealmUnique: unique().on(table.userId, table.realmNumber),
}));

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

/**
 * Meditation session history
 */
export const meditationSessions = pgTable("meditation_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  realmNumber: integer("realmNumber").notNull(),
  duration: integer("duration").notNull(), // in seconds
  completedAt: timestamp("completedAt").defaultNow().notNull(),
  notes: text("notes"),
});

export type MeditationSession = typeof meditationSessions.$inferSelect;
export type InsertMeditationSession = typeof meditationSessions.$inferInsert;

/**
 * Audio meditation files
 */
export const audioMeditations = pgTable("audio_meditations", {
  id: serial("id").primaryKey(),
  realmNumber: integer("realmNumber").notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  audioUrl: text("audioUrl").notNull(),
  duration: integer("duration").notNull(), // in seconds
  uploadedBy: integer("uploadedBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type AudioMeditation = typeof audioMeditations.$inferSelect;
export type InsertAudioMeditation = typeof audioMeditations.$inferInsert;

/**
 * Forum posts
 */
export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  category: forumCategoryEnum("category").default("general").notNull(),
  gateNumber: integer("gateNumber"),
  realmNumber: integer("realmNumber"),
  isPinned: boolean("isPinned").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ForumPost = typeof forumPosts.$inferSelect;
export type InsertForumPost = typeof forumPosts.$inferInsert;

/**
 * Forum comments
 */
export const forumComments = pgTable("forum_comments", {
  id: serial("id").primaryKey(),
  postId: integer("postId").notNull(),
  userId: integer("userId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ForumComment = typeof forumComments.$inferSelect;
export type InsertForumComment = typeof forumComments.$inferInsert;

/**
 * Notifications - User notifications for announcements, updates, alerts
 */
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  type: notificationTypeEnum("type").default("announcement").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  link: varchar("link", { length: 500 }),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  readAt: timestamp("readAt"),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Email Sequences - Automated email campaigns
 */
export const emailSequences = pgTable("email_sequences", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  trigger: emailTriggerEnum("trigger").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type EmailSequence = typeof emailSequences.$inferSelect;
export type InsertEmailSequence = typeof emailSequences.$inferInsert;

/**
 * Email Sequence Emails - Individual emails in a sequence
 */
export const emailSequenceEmails = pgTable("email_sequence_emails", {
  id: serial("id").primaryKey(),
  sequenceId: integer("sequenceId").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  htmlContent: text("htmlContent").notNull(),
  textContent: text("textContent").notNull(),
  delayDays: integer("delayDays").notNull().default(0),
  orderIndex: integer("orderIndex").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type EmailSequenceEmail = typeof emailSequenceEmails.$inferSelect;
export type InsertEmailSequenceEmail = typeof emailSequenceEmails.$inferInsert;

/**
 * User Email Queue - Scheduled emails to be sent
 */
export const userEmailQueue = pgTable("user_email_queue", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  sequenceId: integer("sequenceId").notNull(),
  emailId: integer("emailId").notNull(),
  scheduledFor: timestamp("scheduledFor").notNull(),
  sentAt: timestamp("sentAt"),
  status: emailQueueStatusEnum("status").default("pending").notNull(),
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserEmailQueue = typeof userEmailQueue.$inferSelect;
export type InsertUserEmailQueue = typeof userEmailQueue.$inferInsert;

/**
 * Email Logs - Track all sent emails
 */
export const emailLogs = pgTable("email_logs", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  emailType: varchar("emailType", { length: 100 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
  status: emailLogStatusEnum("status").notNull(),
  resendId: varchar("resendId", { length: 255 }),
  errorMessage: text("errorMessage"),
});

export type EmailLog = typeof emailLogs.$inferSelect;
export type InsertEmailLog = typeof emailLogs.$inferInsert;

/**
 * Gates - The 12 Star Gates
 */
export const gates = pgTable("gates", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  theme: varchar("theme", { length: 255 }).notNull(),
  shadow: text("shadow").notNull(),
  gift: text("gift").notNull(),
  somaticShift: text("somaticShift").notNull(),
  praxis: text("praxis").notNull(),
  realmCluster: varchar("realmCluster", { length: 100 }).notNull(),
  description: text("description").notNull(),
  level: varchar("level", { length: 100 }).notNull(),
  keyword: varchar("keyword", { length: 50 }).notNull(),
  orderIndex: integer("orderIndex").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Gate = typeof gates.$inferSelect;
export type InsertGate = typeof gates.$inferInsert;

/**
 * Realms - The 144 Realms (12 per gate)
 */
export const realms = pgTable("realms", {
  id: serial("id").primaryKey(),
  number: integer("number").notNull().unique(),
  gateId: integer("gateId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  mythicLayer: text("mythicLayer").notNull(),
  psychologicalLayer: text("psychologicalLayer").notNull(),
  hybridLayer: text("hybridLayer").notNull(),
  practices: text("practices"),
  shadowWork: text("shadowWork"),
  integration: text("integration"),
  orderIndex: integer("orderIndex").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Realm = typeof realms.$inferSelect;
export type InsertRealm = typeof realms.$inferInsert;

/**
 * Inner Circle Curriculum - Monthly content
 */
export const innerCircleMonths = pgTable("inner_circle_months", {
  id: serial("id").primaryKey(),
  monthNumber: integer("monthNumber").notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  gateId: integer("gateId").notNull(),
  theme: varchar("theme", { length: 255 }).notNull(),
  coreTeaching: text("coreTeaching").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type InnerCircleMonth = typeof innerCircleMonths.$inferSelect;
export type InsertInnerCircleMonth = typeof innerCircleMonths.$inferInsert;

/**
 * Inner Circle Weekly Content
 */
export const innerCircleWeeks = pgTable("inner_circle_weeks", {
  id: serial("id").primaryKey(),
  monthId: integer("monthId").notNull(),
  weekNumber: integer("weekNumber").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  videoScript: text("videoScript").notNull(),
  somaticPractice: text("somaticPractice").notNull(),
  dailyPrompt: text("dailyPrompt").notNull(),
  engagementQuestion: text("engagementQuestion").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (table) => ({
  monthWeekUnique: unique().on(table.monthId, table.weekNumber),
}));

export type InnerCircleWeek = typeof innerCircleWeeks.$inferSelect;
export type InsertInnerCircleWeek = typeof innerCircleWeeks.$inferInsert;

/**
 * User Inner Circle Progress
 */
export const userInnerCircleProgress = pgTable("user_inner_circle_progress", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  monthId: integer("monthId").notNull(),
  weekId: integer("weekId").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (table) => ({
  userWeekUnique: unique().on(table.userId, table.weekId),
}));

export type UserInnerCircleProgress = typeof userInnerCircleProgress.$inferSelect;
export type InsertUserInnerCircleProgress = typeof userInnerCircleProgress.$inferInsert;

/**
 * Products (books, courses, meditation packs, merchandise)
 */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  productId: varchar("productId", { length: 100 }).notNull().unique(), // Keep for backward compatibility
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  description: text("description").notNull(),
  longDescription: text("longDescription"),
  category: productCategoryEnum("category").default("book").notNull(),
  type: varchar("type", { length: 100 }).default("digital"), // "physical", "digital", "both"
  price: integer("price").notNull(), // in cents
  compareAtPrice: integer("compareAtPrice"), // original price for discounts
  stripeProductId: varchar("stripeProductId", { length: 255 }),
  stripePriceId: varchar("stripePriceId", { length: 255 }),
  // Product details
  author: varchar("author", { length: 255 }),
  gateNumber: integer("gateNumber"), // Which gate (1-12)
  realmNumber: integer("realmNumber"), // Which realm (1-144)
  coverImage: text("coverImage"),
  images: text("images"), // JSON array
  downloadUrl: text("downloadUrl"), // For digital products
  fileSize: integer("fileSize"), // in bytes
  pageCount: integer("pageCount"),
  duration: integer("duration"), // in minutes
  // Inventory
  inventory: integer("inventory").default(-1).notNull(), // -1 = unlimited
  lowStockThreshold: integer("lowStockThreshold").default(5),
  // Status
  status: productStatusEnum("status").default("active").notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * User Purchases (one-time product purchases)
 */
export const userPurchases = pgTable("user_purchases", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  productId: varchar("productId", { length: 100 }).notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  amount: integer("amount").notNull(), // in cents
  status: purchaseStatusEnum("status").default("pending").notNull(),
  purchasedAt: timestamp("purchasedAt").defaultNow().notNull(),
  downloadCount: integer("downloadCount").default(0).notNull(),
  lastDownloadedAt: timestamp("lastDownloadedAt"),
});

export type UserPurchase = typeof userPurchases.$inferSelect;
export type InsertUserPurchase = typeof userPurchases.$inferInsert;

/**
 * Chartography Readings Bookings
 */
export const chartographyBookings = pgTable("chartography_bookings", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  // Birth information
  birthDate: date("birthDate").notNull(),
  birthTime: varchar("birthTime", { length: 10 }).notNull(), // HH:MM format
  birthLocation: varchar("birthLocation", { length: 255 }).notNull(),
  birthLatitude: numeric("birthLatitude", { precision: 10, scale: 7 }),
  birthLongitude: numeric("birthLongitude", { precision: 10, scale: 7 }),
  // Questions and focus areas
  primaryQuestion: text("primaryQuestion"),
  focusAreas: text("focusAreas"), // JSON array of focus areas
  additionalNotes: text("additionalNotes"),
  // Payment and status
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  amount: integer("amount").notNull(), // in cents
  status: bookingStatusEnum("status").default("pending").notNull(),
  // Reading details
  scheduledFor: timestamp("scheduledFor"),
  completedAt: timestamp("completedAt"),
  readingNotes: text("readingNotes"), // Admin notes from the reading
  readingDocument: text("readingDocument"), // URL to PDF/document
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ChartographyBooking = typeof chartographyBookings.$inferSelect;
export type InsertChartographyBooking = typeof chartographyBookings.$inferInsert;

/**
 * Orders (for product purchases)
 */
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
  userId: integer("userId").notNull(),
  // Payment
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  stripeChargeId: varchar("stripeChargeId", { length: 255 }),
  // Amounts
  subtotal: integer("subtotal").notNull(), // in cents
  tax: integer("tax").default(0).notNull(),
  shipping: integer("shipping").default(0).notNull(),
  discount: integer("discount").default(0).notNull(),
  total: integer("total").notNull(),
  currency: varchar("currency", { length: 10 }).default("USD").notNull(),
  // Status
  status: orderStatusEnum("status").default("pending").notNull(),
  paymentStatus: paymentStatusEnum("paymentStatus").default("pending").notNull(),
  fulfillmentStatus: fulfillmentStatusEnum("fulfillmentStatus").default("unfulfilled").notNull(),
  // Shipping (for physical products)
  shippingName: varchar("shippingName", { length: 255 }),
  shippingEmail: varchar("shippingEmail", { length: 255 }),
  shippingAddress: text("shippingAddress"),
  shippingCity: varchar("shippingCity", { length: 100 }),
  shippingState: varchar("shippingState", { length: 100 }),
  shippingPostalCode: varchar("shippingPostalCode", { length: 20 }),
  shippingCountry: varchar("shippingCountry", { length: 100 }),
  trackingNumber: varchar("trackingNumber", { length: 255 }),
  // Notes
  customerNotes: text("customerNotes"),
  internalNotes: text("internalNotes"),
  // Timestamps
  paidAt: timestamp("paidAt"),
  shippedAt: timestamp("shippedAt"),
  deliveredAt: timestamp("deliveredAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Order Items (line items for each order)
 */
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("orderId").notNull(),
  productId: integer("productId").notNull(),
  // Product snapshot (in case product changes later)
  productTitle: varchar("productTitle", { length: 255 }).notNull(),
  productSlug: varchar("productSlug", { length: 255 }).notNull(),
  productType: varchar("productType", { length: 100 }),
  productImage: varchar("productImage", { length: 500 }),
  // Pricing
  quantity: integer("quantity").default(1).notNull(),
  unitPrice: integer("unitPrice").notNull(), // in cents
  totalPrice: integer("totalPrice").notNull(), // quantity * unitPrice
  // Digital delivery
  downloadUrl: varchar("downloadUrl", { length: 500 }),
  downloadCount: integer("downloadCount").default(0).notNull(),
  downloadLimit: integer("downloadLimit").default(-1).notNull(), // -1 = unlimited
  downloadExpiresAt: timestamp("downloadExpiresAt"),
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

/**
 * Documents (Sacred Corpus - 1,365 documents)
 */
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  // Canon identification
  canonId: varchar("canonId", { length: 50 }).notNull().unique(), // e.g., "CANON-1280"
  rowId: integer("rowId").notNull(), // Original row ID from CSV
  // File information
  filename: varchar("filename", { length: 255 }).notNull(),
  relativePath: text("relativePath").notNull(), // Original Google Drive path
  source: varchar("source", { length: 50 }).default("GOOGLE_DRIVE").notNull(),
  // Storage
  s3Url: text("s3Url"), // S3 CDN URL after upload
  googleDriveId: varchar("googleDriveId", { length: 255 }), // If keeping Google Drive reference
  // Metadata
  contentStatus: varchar("contentStatus", { length: 50 }).default("CONSOLIDATED").notNull(),
  fileSizeMb: numeric("fileSizeMb", { precision: 10, scale: 2 }),
  fileType: varchar("fileType", { length: 50 }), // pdf, docx, png, etc.
  sha256Hash: varchar("sha256Hash", { length: 64 }).notNull(), // Chain-of-title integrity
  // Classification
  category: varchar("category", { length: 100 }), // Legal, Spiritual, Operational, etc.
  tags: text("tags"), // JSON array of tags
  // Access control
  accessTier: accessTierEnum("accessTier").default("seeker").notNull(),
  isPublic: boolean("isPublic").default(false).notNull(),
  // Timestamps
  originalTimestamp: timestamp("originalTimestamp"), // From CSV
  uploadedAt: timestamp("uploadedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;

/**
 * Document Access Rules (RBAC for specific documents)
 */
export const documentAccessRules = pgTable("document_access_rules", {
  id: serial("id").primaryKey(),
  documentId: integer("documentId").notNull(),
  // Rule type
  ruleType: ruleTypeEnum("ruleType").notNull(),
  // Tier-based access
  requiredTier: accessTierEnum("requiredTier"),
  // User-specific access
  userId: integer("userId"),
  // Role-based access
  requiredRole: userRoleEnum("requiredRole"),
  // Purchase-based access (if document is sold separately)
  requiresPurchase: boolean("requiresPurchase").default(false).notNull(),
  productId: integer("productId"), // Link to products table if sold
  // Metadata
  grantedBy: integer("grantedBy"), // Admin who granted access
  reason: text("reason"),
  expiresAt: timestamp("expiresAt"), // Optional expiration
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DocumentAccessRule = typeof documentAccessRules.$inferSelect;
export type InsertDocumentAccessRule = typeof documentAccessRules.$inferInsert;

/**
 * Document Downloads (Track who downloaded what)
 */
export const documentDownloads = pgTable("document_downloads", {
  id: serial("id").primaryKey(),
  documentId: integer("documentId").notNull(),
  userId: integer("userId").notNull(),
  // Download metadata
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  downloadedAt: timestamp("downloadedAt").defaultNow().notNull(),
});

export type DocumentDownload = typeof documentDownloads.$inferSelect;
export type InsertDocumentDownload = typeof documentDownloads.$inferInsert;

/**
 * Document Collections (Group documents into curated collections)
 */
export const documentCollections = pgTable("document_collections", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  coverImage: text("coverImage"),
  // Access control
  accessTier: accessTierEnum("collectionAccessTier").default("seeker").notNull(),
  isPublic: boolean("isPublic").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  // Metadata
  documentCount: integer("documentCount").default(0).notNull(),
  totalSizeMb: numeric("totalSizeMb", { precision: 10, scale: 2 }),
  createdBy: integer("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type DocumentCollection = typeof documentCollections.$inferSelect;
export type InsertDocumentCollection = typeof documentCollections.$inferInsert;

/**
 * Document Collection Items (Many-to-many relationship)
 */
export const documentCollectionItems = pgTable("document_collection_items", {
  id: serial("id").primaryKey(),
  collectionId: integer("collectionId").notNull(),
  documentId: integer("documentId").notNull(),
  sortOrder: integer("sortOrder").default(0).notNull(),
  addedBy: integer("addedBy").notNull(),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
}, (table) => ({
  collectionDocumentUnique: unique().on(table.collectionId, table.documentId),
}));

export type DocumentCollectionItem = typeof documentCollectionItems.$inferSelect;
export type InsertDocumentCollectionItem = typeof documentCollectionItems.$inferInsert;
