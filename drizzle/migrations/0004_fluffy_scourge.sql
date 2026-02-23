CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` varchar(100) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`price` int NOT NULL,
	`stripePriceId` varchar(255),
	`downloadUrl` text,
	`coverImage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_productId_unique` UNIQUE(`productId`)
);
--> statement-breakpoint
CREATE TABLE `user_purchases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`productId` varchar(100) NOT NULL,
	`stripePaymentIntentId` varchar(255),
	`amount` int NOT NULL,
	`status` enum('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
	`purchasedAt` timestamp NOT NULL DEFAULT (now()),
	`downloadCount` int NOT NULL DEFAULT 0,
	`lastDownloadedAt` timestamp,
	CONSTRAINT `user_purchases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `stripeSubscriptionId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionTier` enum('free','seeker','adept','master') DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionStatus` enum('active','canceled','past_due','trialing') DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionEndsAt` timestamp;