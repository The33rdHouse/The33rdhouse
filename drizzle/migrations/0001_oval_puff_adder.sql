CREATE TABLE `gates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`number` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`theme` varchar(255) NOT NULL,
	`shadow` text NOT NULL,
	`gift` text NOT NULL,
	`somaticShift` text NOT NULL,
	`praxis` text NOT NULL,
	`realmCluster` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`level` varchar(100) NOT NULL,
	`keyword` varchar(50) NOT NULL,
	`orderIndex` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gates_id` PRIMARY KEY(`id`),
	CONSTRAINT `gates_number_unique` UNIQUE(`number`)
);
--> statement-breakpoint
CREATE TABLE `inner_circle_months` (
	`id` int AUTO_INCREMENT NOT NULL,
	`monthNumber` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`gateId` int NOT NULL,
	`theme` varchar(255) NOT NULL,
	`coreTeaching` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inner_circle_months_id` PRIMARY KEY(`id`),
	CONSTRAINT `inner_circle_months_monthNumber_unique` UNIQUE(`monthNumber`)
);
--> statement-breakpoint
CREATE TABLE `inner_circle_weeks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`monthId` int NOT NULL,
	`weekNumber` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`videoScript` text NOT NULL,
	`somaticPractice` text NOT NULL,
	`dailyPrompt` text NOT NULL,
	`engagementQuestion` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inner_circle_weeks_id` PRIMARY KEY(`id`),
	CONSTRAINT `inner_circle_weeks_monthId_weekNumber_unique` UNIQUE(`monthId`,`weekNumber`)
);
--> statement-breakpoint
CREATE TABLE `realms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`number` int NOT NULL,
	`gateId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`mythicLayer` text NOT NULL,
	`psychologicalLayer` text NOT NULL,
	`hybridLayer` text NOT NULL,
	`practices` text,
	`shadowWork` text,
	`integration` text,
	`orderIndex` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `realms_id` PRIMARY KEY(`id`),
	CONSTRAINT `realms_number_unique` UNIQUE(`number`)
);
--> statement-breakpoint
CREATE TABLE `user_inner_circle_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`monthId` int NOT NULL,
	`weekId` int NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`completedAt` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_inner_circle_progress_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_inner_circle_progress_userId_weekId_unique` UNIQUE(`userId`,`weekId`)
);
