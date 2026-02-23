import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, unique, decimal, date } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  passwordHash: varchar("passwordHash", { length: 255 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
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
  subscriptionTier: mysqlEnum("subscriptionTier", ["free", "seeker", "initiate", "elder"]).default("free").notNull(),
  subscriptionStatus: mysqlEnum("subscriptionStatus", ["active", "canceled", "past_due", "trialing"]).default("active").notNull(),
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
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * User sessions for session management
 */
export const userSessions = mysqlTable("user_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
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
export const loginHistory = mysqlTable("login_history", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
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
export const userProgress = mysqlTable("user_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  realmNumber: int("realmNumber").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userRealmUnique: unique().on(table.userId, table.realmNumber),
}));

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

/**
 * Meditation session history
 */
export const meditationSessions = mysqlTable("meditation_sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  realmNumber: int("realmNumber").notNull(),
  duration: int("duration").notNull(), // in seconds
  completedAt: timestamp("completedAt").defaultNow().notNull(),
  notes: text("notes"),
});

export type MeditationSession = typeof meditationSessions.$inferSelect;
export type InsertMeditationSession = typeof meditationSessions.$inferInsert;

/**
 * Audio meditation files
 */
export const audioMeditations = mysqlTable("audio_meditations", {
  id: int("id").autoincrement().primaryKey(),
  realmNumber: int("realmNumber").notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  audioUrl: text("audioUrl").notNull(),
  duration: int("duration").notNull(), // in seconds
  uploadedBy: int("uploadedBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AudioMeditation = typeof audioMeditations.$inferSelect;
export type InsertAudioMeditation = typeof audioMeditations.$inferInsert;

/**
 * Forum posts
 */
export const forumPosts = mysqlTable("forum_posts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  category: mysqlEnum("category", ["general", "gate", "realm", "elder_qa", "practice"]).default("general").notNull(),
  gateNumber: int("gateNumber"),
  realmNumber: int("realmNumber"),
  isPinned: boolean("isPinned").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ForumPost = typeof forumPosts.$inferSelect;
export type InsertForumPost = typeof forumPosts.$inferInsert;

/**
 * Forum comments
 */
export const forumComments = mysqlTable("forum_comments", {
  id: int("id").autoincrement().primaryKey(),
  postId: int("postId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ForumComment = typeof forumComments.$inferSelect;
export type InsertForumComment = typeof forumComments.$inferInsert;

/**
 * Notifications - User notifications for announcements, updates, alerts
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["announcement", "update", "alert", "meditation_reminder", "achievement"]).default("announcement").notNull(),
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
export const emailSequences = mysqlTable("email_sequences", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  trigger: mysqlEnum("trigger", ["user_signup", "realm_completed", "gate_completed", "achievement_unlocked", "manual"]).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailSequence = typeof emailSequences.$inferSelect;
export type InsertEmailSequence = typeof emailSequences.$inferInsert;

/**
 * Email Sequence Emails - Individual emails in a sequence
 */
export const emailSequenceEmails = mysqlTable("email_sequence_emails", {
  id: int("id").autoincrement().primaryKey(),
  sequenceId: int("sequenceId").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  htmlContent: text("htmlContent").notNull(),
  textContent: text("textContent").notNull(),
  delayDays: int("delayDays").notNull().default(0),
  orderIndex: int("orderIndex").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailSequenceEmail = typeof emailSequenceEmails.$inferSelect;
export type InsertEmailSequenceEmail = typeof emailSequenceEmails.$inferInsert;

/**
 * User Email Queue - Scheduled emails to be sent
 */
export const userEmailQueue = mysqlTable("user_email_queue", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  sequenceId: int("sequenceId").notNull(),
  emailId: int("emailId").notNull(),
  scheduledFor: timestamp("scheduledFor").notNull(),
  sentAt: timestamp("sentAt"),
  status: mysqlEnum("status", ["pending", "sent", "failed"]).default("pending").notNull(),
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserEmailQueue = typeof userEmailQueue.$inferSelect;
export type InsertUserEmailQueue = typeof userEmailQueue.$inferInsert;

/**
 * Email Logs - Track all sent emails
 */
export const emailLogs = mysqlTable("email_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  emailType: varchar("emailType", { length: 100 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
  status: mysqlEnum("status", ["sent", "failed"]).notNull(),
  resendId: varchar("resendId", { length: 255 }),
  errorMessage: text("errorMessage"),
});

export type EmailLog = typeof emailLogs.$inferSelect;
export type InsertEmailLog = typeof emailLogs.$inferInsert;

/**
 * Gates - The 12 Star Gates
 */
export const gates = mysqlTable("gates", {
  id: int("id").autoincrement().primaryKey(),
  number: int("number").notNull().unique(),
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
  orderIndex: int("orderIndex").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Gate = typeof gates.$inferSelect;
export type InsertGate = typeof gates.$inferInsert;

/**
 * Realms - The 144 Realms (12 per gate)
 */
export const realms = mysqlTable("realms", {
  id: int("id").autoincrement().primaryKey(),
  number: int("number").notNull().unique(),
  gateId: int("gateId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  mythicLayer: text("mythicLayer").notNull(),
  psychologicalLayer: text("psychologicalLayer").notNull(),
  hybridLayer: text("hybridLayer").notNull(),
  practices: text("practices"),
  shadowWork: text("shadowWork"),
  integration: text("integration"),
  orderIndex: int("orderIndex").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Realm = typeof realms.$inferSelect;
export type InsertRealm = typeof realms.$inferInsert;

/**
 * Inner Circle Curriculum - Monthly content
 */
export const innerCircleMonths = mysqlTable("inner_circle_months", {
  id: int("id").autoincrement().primaryKey(),
  monthNumber: int("monthNumber").notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  gateId: int("gateId").notNull(),
  theme: varchar("theme", { length: 255 }).notNull(),
  coreTeaching: text("coreTeaching").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type InnerCircleMonth = typeof innerCircleMonths.$inferSelect;
export type InsertInnerCircleMonth = typeof innerCircleMonths.$inferInsert;

/**
 * Inner Circle Weekly Content
 */
export const innerCircleWeeks = mysqlTable("inner_circle_weeks", {
  id: int("id").autoincrement().primaryKey(),
  monthId: int("monthId").notNull(),
  weekNumber: int("weekNumber").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  videoScript: text("videoScript").notNull(),
  somaticPractice: text("somaticPractice").notNull(),
  dailyPrompt: text("dailyPrompt").notNull(),
  engagementQuestion: text("engagementQuestion").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  monthWeekUnique: unique().on(table.monthId, table.weekNumber),
}));

export type InnerCircleWeek = typeof innerCircleWeeks.$inferSelect;
export type InsertInnerCircleWeek = typeof innerCircleWeeks.$inferInsert;

/**
 * User Inner Circle Progress
 */
export const userInnerCircleProgress = mysqlTable("user_inner_circle_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  monthId: int("monthId").notNull(),
  weekId: int("weekId").notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completedAt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userWeekUnique: unique().on(table.userId, table.weekId),
}));

export type UserInnerCircleProgress = typeof userInnerCircleProgress.$inferSelect;
export type InsertUserInnerCircleProgress = typeof userInnerCircleProgress.$inferInsert;

/**
 * Products (books, courses, meditation packs, merchandise)
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  productId: varchar("productId", { length: 100 }).notNull().unique(), // Keep for backward compatibility
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  description: text("description").notNull(),
  longDescription: text("longDescription"),
  category: mysqlEnum("category", ["book", "course", "meditation", "merchandise", "reading"]).default("book").notNull(),
  type: varchar("type", { length: 100 }).default("digital"), // "physical", "digital", "both"
  price: int("price").notNull(), // in cents
  compareAtPrice: int("compareAtPrice"), // original price for discounts
  stripeProductId: varchar("stripeProductId", { length: 255 }),
  stripePriceId: varchar("stripePriceId", { length: 255 }),
  // Product details
  author: varchar("author", { length: 255 }),
  gateNumber: int("gateNumber"), // Which gate (1-12)
  realmNumber: int("realmNumber"), // Which realm (1-144)
  coverImage: text("coverImage"),
  images: text("images"), // JSON array
  downloadUrl: text("downloadUrl"), // For digital products
  fileSize: int("fileSize"), // in bytes
  pageCount: int("pageCount"),
  duration: int("duration"), // in minutes
  // Inventory
  inventory: int("inventory").default(-1).notNull(), // -1 = unlimited
  lowStockThreshold: int("lowStockThreshold").default(5),
  // Status
  status: mysqlEnum("status", ["draft", "active", "archived"]).default("active").notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * User Purchases (one-time product purchases)
 */
export const userPurchases = mysqlTable("user_purchases", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: varchar("productId", { length: 100 }).notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  amount: int("amount").notNull(), // in cents
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  purchasedAt: timestamp("purchasedAt").defaultNow().notNull(),
  downloadCount: int("downloadCount").default(0).notNull(),
  lastDownloadedAt: timestamp("lastDownloadedAt"),
});

export type UserPurchase = typeof userPurchases.$inferSelect;
export type InsertUserPurchase = typeof userPurchases.$inferInsert;

/**
 * Chartography Readings Bookings
 */
export const chartographyBookings = mysqlTable("chartography_bookings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  // Birth information
  birthDate: date("birthDate").notNull(),
  birthTime: varchar("birthTime", { length: 10 }).notNull(), // HH:MM format
  birthLocation: varchar("birthLocation", { length: 255 }).notNull(),
  birthLatitude: decimal("birthLatitude", { precision: 10, scale: 7 }),
  birthLongitude: decimal("birthLongitude", { precision: 10, scale: 7 }),
  // Questions and focus areas
  primaryQuestion: text("primaryQuestion"),
  focusAreas: text("focusAreas"), // JSON array of focus areas
  additionalNotes: text("additionalNotes"),
  // Payment and status
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  amount: int("amount").notNull(), // in cents
  status: mysqlEnum("status", ["pending", "paid", "scheduled", "completed", "canceled"]).default("pending").notNull(),
  // Reading details
  scheduledFor: timestamp("scheduledFor"),
  completedAt: timestamp("completedAt"),
  readingNotes: text("readingNotes"), // Admin notes from the reading
  readingDocument: text("readingDocument"), // URL to PDF/document
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChartographyBooking = typeof chartographyBookings.$inferSelect;
export type InsertChartographyBooking = typeof chartographyBookings.$inferInsert;

/**
 * Orders (for product purchases)
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
  userId: int("userId").notNull(),
  // Payment
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  stripeChargeId: varchar("stripeChargeId", { length: 255 }),
  // Amounts
  subtotal: int("subtotal").notNull(), // in cents
  tax: int("tax").default(0).notNull(),
  shipping: int("shipping").default(0).notNull(),
  discount: int("discount").default(0).notNull(),
  total: int("total").notNull(),
  currency: varchar("currency", { length: 10 }).default("USD").notNull(),
  // Status
  status: mysqlEnum("status", ["pending", "paid", "processing", "shipped", "delivered", "canceled", "refunded"]).default("pending").notNull(),
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "paid", "failed", "refunded"]).default("pending").notNull(),
  fulfillmentStatus: mysqlEnum("fulfillmentStatus", ["unfulfilled", "partial", "fulfilled"]).default("unfulfilled").notNull(),
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
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Order Items (line items for each order)
 */
export const orderItems = mysqlTable("order_items", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  productId: int("productId").notNull(),
  // Product snapshot (in case product changes later)
  productTitle: varchar("productTitle", { length: 255 }).notNull(),
  productSlug: varchar("productSlug", { length: 255 }).notNull(),
  productType: varchar("productType", { length: 100 }),
  productImage: varchar("productImage", { length: 500 }),
  // Pricing
  quantity: int("quantity").default(1).notNull(),
  unitPrice: int("unitPrice").notNull(), // in cents
  totalPrice: int("totalPrice").notNull(), // quantity * unitPrice
  // Digital delivery
  downloadUrl: varchar("downloadUrl", { length: 500 }),
  downloadCount: int("downloadCount").default(0).notNull(),
  downloadLimit: int("downloadLimit").default(-1).notNull(), // -1 = unlimited
  downloadExpiresAt: timestamp("downloadExpiresAt"),
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

/**
 * Documents (Sacred Corpus - 1,365 documents)
 */
export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  // Canon identification
  canonId: varchar("canonId", { length: 50 }).notNull().unique(), // e.g., "CANON-1280"
  rowId: int("rowId").notNull(), // Original row ID from CSV
  // File information
  filename: varchar("filename", { length: 255 }).notNull(),
  relativePath: text("relativePath").notNull(), // Original Google Drive path
  source: varchar("source", { length: 50 }).default("GOOGLE_DRIVE").notNull(),
  // Storage
  s3Url: text("s3Url"), // S3 CDN URL after upload
  googleDriveId: varchar("googleDriveId", { length: 255 }), // If keeping Google Drive reference
  // Metadata
  contentStatus: varchar("contentStatus", { length: 50 }).default("CONSOLIDATED").notNull(),
  fileSizeMb: decimal("fileSizeMb", { precision: 10, scale: 2 }),
  fileType: varchar("fileType", { length: 50 }), // pdf, docx, png, etc.
  sha256Hash: varchar("sha256Hash", { length: 64 }).notNull(), // Chain-of-title integrity
  // Classification
  category: varchar("category", { length: 100 }), // Legal, Spiritual, Operational, etc.
  tags: text("tags"), // JSON array of tags
  // Access control
  accessTier: mysqlEnum("accessTier", ["free", "seeker", "initiate", "elder", "admin"]).default("seeker").notNull(),
  isPublic: boolean("isPublic").default(false).notNull(),
  // Timestamps
  originalTimestamp: timestamp("originalTimestamp"), // From CSV
  uploadedAt: timestamp("uploadedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;

/**
 * Document Access Rules (RBAC for specific documents)
 */
export const documentAccessRules = mysqlTable("document_access_rules", {
  id: int("id").autoincrement().primaryKey(),
  documentId: int("documentId").notNull(),
  // Rule type
  ruleType: mysqlEnum("ruleType", ["tier", "user", "role", "purchase"]).notNull(),
  // Tier-based access
  requiredTier: mysqlEnum("requiredTier", ["free", "seeker", "initiate", "elder", "admin"]),
  // User-specific access
  userId: int("userId"),
  // Role-based access
  requiredRole: mysqlEnum("requiredRole", ["user", "admin"]),
  // Purchase-based access (if document is sold separately)
  requiresPurchase: boolean("requiresPurchase").default(false).notNull(),
  productId: int("productId"), // Link to products table if sold
  // Metadata
  grantedBy: int("grantedBy"), // Admin who granted access
  reason: text("reason"),
  expiresAt: timestamp("expiresAt"), // Optional expiration
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DocumentAccessRule = typeof documentAccessRules.$inferSelect;
export type InsertDocumentAccessRule = typeof documentAccessRules.$inferInsert;

/**
 * Document Downloads (Track who downloaded what)
 */
export const documentDownloads = mysqlTable("document_downloads", {
  id: int("id").autoincrement().primaryKey(),
  documentId: int("documentId").notNull(),
  userId: int("userId").notNull(),
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
export const documentCollections = mysqlTable("document_collections", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  coverImage: text("coverImage"),
  // Access control
  accessTier: mysqlEnum("accessTier", ["free", "seeker", "initiate", "elder", "admin"]).default("seeker").notNull(),
  isPublic: boolean("isPublic").default(false).notNull(),
  featured: boolean("featured").default(false).notNull(),
  // Metadata
  documentCount: int("documentCount").default(0).notNull(),
  totalSizeMb: decimal("totalSizeMb", { precision: 10, scale: 2 }),
  createdBy: int("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DocumentCollection = typeof documentCollections.$inferSelect;
export type InsertDocumentCollection = typeof documentCollections.$inferInsert;

/**
 * Document Collection Items (Many-to-many relationship)
 */
export const documentCollectionItems = mysqlTable("document_collection_items", {
  id: int("id").autoincrement().primaryKey(),
  collectionId: int("collectionId").notNull(),
  documentId: int("documentId").notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  addedBy: int("addedBy").notNull(),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
}, (table) => ({
  collectionDocumentUnique: unique().on(table.collectionId, table.documentId),
}));

export type DocumentCollectionItem = typeof documentCollectionItems.$inferSelect;
export type InsertDocumentCollectionItem = typeof documentCollectionItems.$inferInsert;
