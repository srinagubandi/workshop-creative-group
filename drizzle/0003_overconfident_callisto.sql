CREATE TABLE `media_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mediaType` enum('image','video') NOT NULL,
	`source` enum('railway','legacy') NOT NULL DEFAULT 'railway',
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`storageKey` varchar(512),
	`originalKey` varchar(512),
	`legacyPath` varchar(512),
	`originalFilename` varchar(255) NOT NULL,
	`mimeType` varchar(128) NOT NULL,
	`sizeBytes` int NOT NULL,
	`width` int,
	`height` int,
	`durationSeconds` int,
	`title` varchar(255),
	`caption` text,
	`altText` varchar(512),
	`transformJson` text,
	`publishedAt` timestamp,
	`archivedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `media_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_placements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mediaId` int NOT NULL,
	`pageKey` varchar(128) NOT NULL,
	`slotKey` varchar(128),
	`category` varchar(128),
	`client` varchar(255),
	`project` varchar(255),
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `media_placements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_metadata` (
	`id` int AUTO_INCREMENT NOT NULL,
	`routePath` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(512) NOT NULL,
	`canonicalPath` varchar(255),
	`ogTitle` varchar(255),
	`ogDescription` varchar(512),
	`structuredDataJson` text,
	`noIndex` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_metadata_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_metadata_routePath_unique` UNIQUE(`routePath`)
);
