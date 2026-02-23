CREATE TYPE "public"."access_tier" AS ENUM('free', 'seeker', 'initiate', 'elder', 'admin');--> statement-breakpoint
CREATE TYPE "public"."booking_status" AS ENUM('pending', 'paid', 'scheduled', 'completed', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."email_log_status" AS ENUM('sent', 'failed');--> statement-breakpoint
CREATE TYPE "public"."email_queue_status" AS ENUM('pending', 'sent', 'failed');--> statement-breakpoint
CREATE TYPE "public"."email_trigger" AS ENUM('user_signup', 'realm_completed', 'gate_completed', 'achievement_unlocked', 'manual');--> statement-breakpoint
CREATE TYPE "public"."forum_category" AS ENUM('general', 'gate', 'realm', 'elder_qa', 'practice');--> statement-breakpoint
CREATE TYPE "public"."fulfillment_status" AS ENUM('unfulfilled', 'partial', 'fulfilled');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('announcement', 'update', 'alert', 'meditation_reminder', 'achievement');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'paid', 'processing', 'shipped', 'delivered', 'canceled', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."product_category" AS ENUM('book', 'course', 'meditation', 'merchandise', 'reading');--> statement-breakpoint
CREATE TYPE "public"."product_status" AS ENUM('draft', 'active', 'archived');--> statement-breakpoint
CREATE TYPE "public"."purchase_status" AS ENUM('pending', 'completed', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."rule_type" AS ENUM('tier', 'user', 'role', 'purchase');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'canceled', 'past_due', 'trialing');--> statement-breakpoint
CREATE TYPE "public"."subscription_tier" AS ENUM('free', 'seeker', 'initiate', 'elder');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "audio_meditations" (
	"id" serial PRIMARY KEY NOT NULL,
	"realmNumber" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"audioUrl" text NOT NULL,
	"duration" integer NOT NULL,
	"uploadedBy" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "audio_meditations_realmNumber_unique" UNIQUE("realmNumber")
);
--> statement-breakpoint
CREATE TABLE "chartography_bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"birthDate" date NOT NULL,
	"birthTime" varchar(10) NOT NULL,
	"birthLocation" varchar(255) NOT NULL,
	"birthLatitude" numeric(10, 7),
	"birthLongitude" numeric(10, 7),
	"primaryQuestion" text,
	"focusAreas" text,
	"additionalNotes" text,
	"stripePaymentIntentId" varchar(255),
	"amount" integer NOT NULL,
	"status" "booking_status" DEFAULT 'pending' NOT NULL,
	"scheduledFor" timestamp,
	"completedAt" timestamp,
	"readingNotes" text,
	"readingDocument" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "document_access_rules" (
	"id" serial PRIMARY KEY NOT NULL,
	"documentId" integer NOT NULL,
	"ruleType" "rule_type" NOT NULL,
	"requiredTier" "access_tier",
	"userId" integer,
	"requiredRole" "user_role",
	"requiresPurchase" boolean DEFAULT false NOT NULL,
	"productId" integer,
	"grantedBy" integer,
	"reason" text,
	"expiresAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "document_collection_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"collectionId" integer NOT NULL,
	"documentId" integer NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"addedBy" integer NOT NULL,
	"addedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "document_collection_items_collectionId_documentId_unique" UNIQUE("collectionId","documentId")
);
--> statement-breakpoint
CREATE TABLE "document_collections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"coverImage" text,
	"collectionAccessTier" "access_tier" DEFAULT 'seeker' NOT NULL,
	"isPublic" boolean DEFAULT false NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"documentCount" integer DEFAULT 0 NOT NULL,
	"totalSizeMb" numeric(10, 2),
	"createdBy" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "document_collections_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "document_downloads" (
	"id" serial PRIMARY KEY NOT NULL,
	"documentId" integer NOT NULL,
	"userId" integer NOT NULL,
	"ipAddress" varchar(45),
	"userAgent" text,
	"downloadedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"canonId" varchar(50) NOT NULL,
	"rowId" integer NOT NULL,
	"filename" varchar(255) NOT NULL,
	"relativePath" text NOT NULL,
	"source" varchar(50) DEFAULT 'GOOGLE_DRIVE' NOT NULL,
	"s3Url" text,
	"googleDriveId" varchar(255),
	"contentStatus" varchar(50) DEFAULT 'CONSOLIDATED' NOT NULL,
	"fileSizeMb" numeric(10, 2),
	"fileType" varchar(50),
	"sha256Hash" varchar(64) NOT NULL,
	"category" varchar(100),
	"tags" text,
	"accessTier" "access_tier" DEFAULT 'seeker' NOT NULL,
	"isPublic" boolean DEFAULT false NOT NULL,
	"originalTimestamp" timestamp,
	"uploadedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "documents_canonId_unique" UNIQUE("canonId")
);
--> statement-breakpoint
CREATE TABLE "email_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"emailType" varchar(100) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"sentAt" timestamp DEFAULT now() NOT NULL,
	"status" "email_log_status" NOT NULL,
	"resendId" varchar(255),
	"errorMessage" text
);
--> statement-breakpoint
CREATE TABLE "email_sequence_emails" (
	"id" serial PRIMARY KEY NOT NULL,
	"sequenceId" integer NOT NULL,
	"subject" varchar(255) NOT NULL,
	"htmlContent" text NOT NULL,
	"textContent" text NOT NULL,
	"delayDays" integer DEFAULT 0 NOT NULL,
	"orderIndex" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_sequences" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"trigger" "email_trigger" NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forum_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forum_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"category" "forum_category" DEFAULT 'general' NOT NULL,
	"gateNumber" integer,
	"realmNumber" integer,
	"isPinned" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gates" (
	"id" serial PRIMARY KEY NOT NULL,
	"number" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"theme" varchar(255) NOT NULL,
	"shadow" text NOT NULL,
	"gift" text NOT NULL,
	"somaticShift" text NOT NULL,
	"praxis" text NOT NULL,
	"realmCluster" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"level" varchar(100) NOT NULL,
	"keyword" varchar(50) NOT NULL,
	"orderIndex" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "gates_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "inner_circle_months" (
	"id" serial PRIMARY KEY NOT NULL,
	"monthNumber" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"gateId" integer NOT NULL,
	"theme" varchar(255) NOT NULL,
	"coreTeaching" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "inner_circle_months_monthNumber_unique" UNIQUE("monthNumber")
);
--> statement-breakpoint
CREATE TABLE "inner_circle_weeks" (
	"id" serial PRIMARY KEY NOT NULL,
	"monthId" integer NOT NULL,
	"weekNumber" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"videoScript" text NOT NULL,
	"somaticPractice" text NOT NULL,
	"dailyPrompt" text NOT NULL,
	"engagementQuestion" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "inner_circle_weeks_monthId_weekNumber_unique" UNIQUE("monthId","weekNumber")
);
--> statement-breakpoint
CREATE TABLE "login_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"loginMethod" varchar(64) NOT NULL,
	"ipAddress" varchar(45),
	"userAgent" text,
	"deviceInfo" text,
	"location" varchar(255),
	"success" boolean DEFAULT true NOT NULL,
	"failureReason" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meditation_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"realmNumber" integer NOT NULL,
	"duration" integer NOT NULL,
	"completedAt" timestamp DEFAULT now() NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"type" "notification_type" DEFAULT 'announcement' NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"link" varchar(500),
	"isRead" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"readAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderId" integer NOT NULL,
	"productId" integer NOT NULL,
	"productTitle" varchar(255) NOT NULL,
	"productSlug" varchar(255) NOT NULL,
	"productType" varchar(100),
	"productImage" varchar(500),
	"quantity" integer DEFAULT 1 NOT NULL,
	"unitPrice" integer NOT NULL,
	"totalPrice" integer NOT NULL,
	"downloadUrl" varchar(500),
	"downloadCount" integer DEFAULT 0 NOT NULL,
	"downloadLimit" integer DEFAULT -1 NOT NULL,
	"downloadExpiresAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderNumber" varchar(50) NOT NULL,
	"userId" integer NOT NULL,
	"stripePaymentIntentId" varchar(255),
	"stripeChargeId" varchar(255),
	"subtotal" integer NOT NULL,
	"tax" integer DEFAULT 0 NOT NULL,
	"shipping" integer DEFAULT 0 NOT NULL,
	"discount" integer DEFAULT 0 NOT NULL,
	"total" integer NOT NULL,
	"currency" varchar(10) DEFAULT 'USD' NOT NULL,
	"status" "order_status" DEFAULT 'pending' NOT NULL,
	"paymentStatus" "payment_status" DEFAULT 'pending' NOT NULL,
	"fulfillmentStatus" "fulfillment_status" DEFAULT 'unfulfilled' NOT NULL,
	"shippingName" varchar(255),
	"shippingEmail" varchar(255),
	"shippingAddress" text,
	"shippingCity" varchar(100),
	"shippingState" varchar(100),
	"shippingPostalCode" varchar(20),
	"shippingCountry" varchar(100),
	"trackingNumber" varchar(255),
	"customerNotes" text,
	"internalNotes" text,
	"paidAt" timestamp,
	"shippedAt" timestamp,
	"deliveredAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "orders_orderNumber_unique" UNIQUE("orderNumber")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"productId" varchar(100) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"subtitle" varchar(255),
	"description" text NOT NULL,
	"longDescription" text,
	"category" "product_category" DEFAULT 'book' NOT NULL,
	"type" varchar(100) DEFAULT 'digital',
	"price" integer NOT NULL,
	"compareAtPrice" integer,
	"stripeProductId" varchar(255),
	"stripePriceId" varchar(255),
	"author" varchar(255),
	"gateNumber" integer,
	"realmNumber" integer,
	"coverImage" text,
	"images" text,
	"downloadUrl" text,
	"fileSize" integer,
	"pageCount" integer,
	"duration" integer,
	"inventory" integer DEFAULT -1 NOT NULL,
	"lowStockThreshold" integer DEFAULT 5,
	"status" "product_status" DEFAULT 'active' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_productId_unique" UNIQUE("productId"),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "realms" (
	"id" serial PRIMARY KEY NOT NULL,
	"number" integer NOT NULL,
	"gateId" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"mythicLayer" text NOT NULL,
	"psychologicalLayer" text NOT NULL,
	"hybridLayer" text NOT NULL,
	"practices" text,
	"shadowWork" text,
	"integration" text,
	"orderIndex" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "realms_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "user_email_queue" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"sequenceId" integer NOT NULL,
	"emailId" integer NOT NULL,
	"scheduledFor" timestamp NOT NULL,
	"sentAt" timestamp,
	"status" "email_queue_status" DEFAULT 'pending' NOT NULL,
	"errorMessage" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_inner_circle_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"monthId" integer NOT NULL,
	"weekId" integer NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"completedAt" timestamp,
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_inner_circle_progress_userId_weekId_unique" UNIQUE("userId","weekId")
);
--> statement-breakpoint
CREATE TABLE "user_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"realmNumber" integer NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"completedAt" timestamp,
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_progress_userId_realmNumber_unique" UNIQUE("userId","realmNumber")
);
--> statement-breakpoint
CREATE TABLE "user_purchases" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"productId" varchar(100) NOT NULL,
	"stripePaymentIntentId" varchar(255),
	"amount" integer NOT NULL,
	"status" "purchase_status" DEFAULT 'pending' NOT NULL,
	"purchasedAt" timestamp DEFAULT now() NOT NULL,
	"downloadCount" integer DEFAULT 0 NOT NULL,
	"lastDownloadedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"sessionToken" varchar(255) NOT NULL,
	"deviceInfo" text,
	"ipAddress" varchar(45),
	"userAgent" text,
	"lastActivity" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"expiresAt" timestamp NOT NULL,
	CONSTRAINT "user_sessions_sessionToken_unique" UNIQUE("sessionToken")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"passwordHash" varchar(255),
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"emailVerificationToken" varchar(255),
	"emailVerificationExpires" timestamp,
	"passwordResetToken" varchar(255),
	"passwordResetExpires" timestamp,
	"twoFactorEnabled" boolean DEFAULT false NOT NULL,
	"twoFactorSecret" varchar(255),
	"stripeCustomerId" varchar(255),
	"stripeSubscriptionId" varchar(255),
	"subscriptionTier" "subscription_tier" DEFAULT 'free' NOT NULL,
	"subscriptionStatus" "subscription_status" DEFAULT 'active' NOT NULL,
	"subscriptionEndsAt" timestamp,
	"birthDate" varchar(20),
	"birthTime" varchar(20),
	"birthLocation" text,
	"portalDocumentsSigned" boolean DEFAULT false NOT NULL,
	"portalCompletedAt" timestamp,
	"onboardingCompleted" boolean DEFAULT false NOT NULL,
	"onboardingStep" varchar(50),
	"onboardingCompletedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
