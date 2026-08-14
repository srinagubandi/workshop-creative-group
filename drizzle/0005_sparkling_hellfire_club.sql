CREATE TABLE `site_text_overrides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`overrideKey` varchar(512) NOT NULL,
	`routePath` varchar(255) NOT NULL,
	`fieldKey` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_text_overrides_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_text_overrides_overrideKey_unique` UNIQUE(`overrideKey`)
);
