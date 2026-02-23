CREATE TABLE `email_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`emailType` varchar(100) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	`status` enum('sent','failed') NOT NULL,
	`resendId` varchar(255),
	`errorMessage` text,
	CONSTRAINT `email_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `email_sequence_emails` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sequenceId` int NOT NULL,
	`subject` varchar(255) NOT NULL,
	`htmlContent` text NOT NULL,
	`textContent` text NOT NULL,
	`delayDays` int NOT NULL DEFAULT 0,
	`orderIndex` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `email_sequence_emails_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `email_sequences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`trigger` enum('user_signup','realm_completed','gate_completed','achievement_unlocked','manual') NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `email_sequences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_email_queue` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sequenceId` int NOT NULL,
	`emailId` int NOT NULL,
	`scheduledFor` timestamp NOT NULL,
	`sentAt` timestamp,
	`status` enum('pending','sent','failed') NOT NULL DEFAULT 'pending',
	`errorMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_email_queue_id` PRIMARY KEY(`id`)
);
