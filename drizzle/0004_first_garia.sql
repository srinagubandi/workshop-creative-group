CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`quote` text NOT NULL,
	`authorName` varchar(255) NOT NULL,
	`authorTitle` varchar(255),
	`company` varchar(255),
	`mediaId` int,
	`sortOrder` int NOT NULL DEFAULT 0,
	`publishedAt` timestamp,
	`archivedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `media_assets` ADD `thumbnailMediaId` int;