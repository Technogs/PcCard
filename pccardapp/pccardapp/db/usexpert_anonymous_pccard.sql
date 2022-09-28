-- Adminer 4.8.1 MySQL 5.7.36 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `collections`;
CREATE TABLE `collections` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `collectionName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pcuserid` bigint(20) unsigned NOT NULL,
  `mediaid` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `collections_pcuserid_foreign` (`pcuserid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `collections` (`id`, `collectionName`, `pcuserid`, `mediaid`, `created_at`, `updated_at`) VALUES
(1,	'Pokemon',	1,	'1,3',	'2021-11-11 18:13:14',	'2021-11-11 18:13:14'),
(2,	'Pikachu',	1,	'1,2,3',	'2021-11-11 19:51:42',	'2021-11-11 19:51:42');

DROP TABLE IF EXISTS `create_posts`;
CREATE TABLE `create_posts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `createdBy` bigint(20) unsigned NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cardGame` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rarity` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `types` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trainerType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `energyType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashTag` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `peopleTag` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postTag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postPrice` int(11) DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isLiked` tinyint(1) NOT NULL DEFAULT '0',
  `isBookmarked` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `create_posts_createdby_foreign` (`createdBy`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `create_posts` (`id`, `createdBy`, `description`, `cardGame`, `rarity`, `types`, `trainerType`, `energyType`, `hashTag`, `peopleTag`, `postTag`, `postPrice`, `address`, `isLiked`, `isBookmarked`, `created_at`, `updated_at`) VALUES
(1,	1,	'CHARIZARD',	'Pokemon',	'1',	'1',	'1',	'2',	'pikachu,pokemon',	NULL,	'3',	NULL,	'Mountain View,California',	0,	0,	'2021-11-11 17:08:55',	'2021-11-11 17:08:55'),
(2,	1,	'Gyradous',	'Pokemon',	'1',	'1',	'2',	'2',	NULL,	NULL,	'3',	NULL,	'Mountain View,California',	0,	0,	'2021-11-11 17:31:15',	'2021-11-11 17:31:15'),
(3,	1,	'Pokemon',	'Pokemon',	'1',	'1',	'1',	'1',	'pikachu,pokemon,charizard',	NULL,	'3',	NULL,	'Mountain View,California',	0,	0,	'2021-11-12 01:13:54',	'2021-11-12 01:13:54'),
(4,	1,	'Pokemon',	'Pokemon',	'1',	'1',	'1',	'2',	NULL,	NULL,	'3',	NULL,	'Mountain View,California',	0,	0,	'2021-11-12 18:51:41',	'2021-11-12 18:51:41'),
(5,	1,	'Pokemon',	'Pikachu',	'1',	'1',	'1',	'2',	NULL,	NULL,	'3',	NULL,	'Mountain View,California',	0,	0,	'2021-11-13 22:08:03',	'2021-11-13 22:08:03');

DROP TABLE IF EXISTS `energy_types`;
CREATE TABLE `energy_types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `EnergyTypeName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `energy_types` (`id`, `EnergyTypeName`, `created_at`, `updated_at`) VALUES
(1,	'Grass',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(2,	'fire',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(3,	'Water',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(4,	'Lightning',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(5,	'Psychic',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(6,	'Fighting',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(7,	'Fighting',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(8,	'Metal',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(9,	'Colorless',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(10,	'Fairy',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(11,	'Dragon',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52');

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `follow_pccard_users`;
CREATE TABLE `follow_pccard_users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pcuserid` bigint(20) NOT NULL,
  `following_pcuserid` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `like_posts`;
CREATE TABLE `like_posts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pcuserid` bigint(20) unsigned NOT NULL,
  `postid` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `like_posts_pcuserid_foreign` (`pcuserid`),
  KEY `like_posts_postid_foreign` (`postid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `like_posts` (`id`, `pcuserid`, `postid`, `created_at`, `updated_at`) VALUES
(1,	1,	12,	'2021-11-08 17:39:31',	'2021-11-08 17:39:31'),
(2,	1,	27,	'2021-11-09 00:54:20',	'2021-11-09 00:54:20'),
(3,	1,	3,	'2021-11-09 18:27:28',	'2021-11-09 18:27:28'),
(4,	3,	5,	'2021-11-20 08:59:13',	'2021-11-20 08:59:13');

DROP TABLE IF EXISTS `media`;
CREATE TABLE `media` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `postid` bigint(20) unsigned NOT NULL,
  `mediaUrl` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `mediaType` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `media_postid_foreign` (`postid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `media` (`id`, `postid`, `mediaUrl`, `mediaType`, `created_at`, `updated_at`) VALUES
(1,	1,	'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/postimages/mediaFirst1636605535.jpg',	'image',	'2021-11-11 17:08:55',	'2021-11-11 17:08:55'),
(2,	1,	'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/postimages/mediaFirst1636605535.jpg',	'image',	'2021-11-11 17:08:55',	'2021-11-11 17:08:55'),
(3,	2,	'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/postimages/mediaFirst1636606875.jpg',	'image',	'2021-11-11 17:31:15',	'2021-11-11 17:31:15'),
(4,	3,	'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/postimages/mediaFirst1636634634.jpg',	'image',	'2021-11-12 01:13:54',	'2021-11-12 01:13:54'),
(5,	4,	'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/postimages/mediaFirst1636698101.jpeg',	'image',	'2021-11-12 18:51:41',	'2021-11-12 18:51:41'),
(6,	5,	'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/postimages/mediaFirst1636796283.jpeg',	'image',	'2021-11-13 22:08:03',	'2021-11-13 22:08:03'),
(7,	5,	'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/postimages/mediaSecond1636796283.jpeg',	'image',	'2021-11-13 22:08:03',	'2021-11-13 22:08:03');

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1,	'2014_10_12_000000_create_users_table',	1),
(2,	'2014_10_12_100000_create_password_resets_table',	1),
(3,	'2019_08_19_000000_create_failed_jobs_table',	1),
(4,	'2019_12_14_000001_create_personal_access_tokens_table',	1),
(5,	'2021_08_30_053749_create_pccard_users',	1),
(6,	'2021_09_01_061911_create_energy_types_table',	1),
(7,	'2021_09_01_062056_create_raretes_table',	1),
(8,	'2021_09_01_062132_create_trainers_table',	1),
(9,	'2021_09_01_062208_create_types_table',	1),
(10,	'2021_09_01_080517_create_create_posts_table',	1),
(11,	'2021_09_02_104128_create_follow_pccard_users_table',	1),
(12,	'2021_09_03_063249_create_post_comments_table',	1),
(13,	'2021_09_03_101927_create_like_posts_table',	1),
(14,	'2021_09_06_053417_create_report_posts_table',	1),
(15,	'2021_09_09_172333_create_stories_table',	1),
(16,	'2021_09_11_133737_create_notifications_table',	1),
(17,	'2021_10_29_160609_create_posts_bookmarks_table',	1),
(18,	'2021_11_03_151509_create_media_table',	1),
(20,	'2021_11_03_151823_create_collections_table',	2),
(26,	'2021_11_11_134031_create_plan_table',	3),
(28,	'2021_11_13_154523_tbl_promotion',	4),
(29,	'2021_11_16_131357_promotion_collection',	5),
(30,	'2021_11_18_123701_collection_media',	6),
(31,	'2021_11_18_181041_tbl_live_record',	7),
(32,	'2021_11_19_101907_update_live_table',	8),
(35,	'2021_11_19_110441_update_tbl_live_records',	9);

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fromid` bigint(20) unsigned NOT NULL,
  `toid` bigint(20) unsigned NOT NULL,
  `postid` bigint(20) unsigned DEFAULT NULL,
  `text` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isread` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_fromid_foreign` (`fromid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `notifications` (`id`, `fromid`, `toid`, `postid`, `text`, `type`, `isread`, `created_at`, `updated_at`) VALUES
(1,	1,	1,	12,	'lajkevin like your post.',	'Post Liked.',	0,	'2021-11-08 17:39:31',	'2021-11-08 17:39:31'),
(2,	1,	1,	27,	'lajkevin like your post.',	'Post Liked.',	0,	'2021-11-09 00:54:20',	'2021-11-09 00:54:20'),
(3,	1,	1,	3,	'lajkevin comment on your post.',	'Post Comments.',	0,	'2021-11-09 18:27:21',	'2021-11-09 18:27:21'),
(4,	1,	1,	3,	'lajkevin like your post.',	'Post Liked.',	0,	'2021-11-09 18:27:28',	'2021-11-09 18:27:28'),
(5,	3,	1,	5,	'kevin like your post.',	'Post Liked.',	0,	'2021-11-20 08:59:13',	'2021-11-20 08:59:13');

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `pccard_users`;
CREATE TABLE `pccard_users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profilePic` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pushNotification` tinyint(1) DEFAULT NULL,
  `newPostNotification` tinyint(1) DEFAULT NULL,
  `connectionLiveNotification` tinyint(1) DEFAULT NULL,
  `friendRequestNotification` tinyint(1) DEFAULT NULL,
  `Is_Active` tinyint(1) DEFAULT NULL,
  `validationCode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device_type` tinyint(1) NOT NULL,
  `device_token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pccard_users_username_unique` (`username`),
  UNIQUE KEY `pccard_users_email_unique` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `pccard_users` (`id`, `name`, `username`, `email`, `password`, `profilePic`, `website`, `bio`, `pushNotification`, `newPostNotification`, `connectionLiveNotification`, `friendRequestNotification`, `Is_Active`, `validationCode`, `device_type`, `device_token`, `created_at`, `updated_at`) VALUES
(1,	'Kevin',	'lajkevin',	'kevinlaj@gmail.com',	'e10adc3949ba59abbe56e057f20f883e',	'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/images/1636531861.jpg',	NULL,	'null',	1,	1,	1,	1,	NULL,	NULL,	0,	'cJKgsskQQK2mDqYWMfPU_Z:APA91bGfGtzIMLir0sjqxfzGwFvjgUhjmaHyxtQ9qeByri2SSH3j5Gmvf738Jw-4vT_M38LunX85PjDU3iTGwnT9Zrgokn8duVKdybWR2XcqJry1oPozd6DzsLwtNQmye1I99Xr77JSn',	'2021-11-03 21:40:15',	'2021-12-08 23:46:31'),
(2,	'Pokemon',	'lajkevin2',	'kevinlaj2@gmail.com',	'e10adc3949ba59abbe56e057f20f883e',	'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/images/1636531861.jpg',	NULL,	'null',	1,	1,	1,	1,	NULL,	NULL,	0,	'elhBgxgERHWND9qno0ky5b:APA91bHTbSVobH_fECki9WlOEYAySA3AvACOaGCLkoilMP2VyqWAcYALJ_b00g_7dHzJwHnuLXnDf67COAIXUSyesXT-Ze0M0rcWQUASXzGAPEsPboKZhE3ZeULaCwhceX0AAjJif8fT',	'2021-11-03 21:40:15',	'2021-12-08 00:47:50'),
(3,	'',	'kevin',	'kevin@brainup.ca',	'17852200f6155bd49b1557630c209dc8',	'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/images/1630561524.jpg',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	0,	'1234',	'2021-11-20 08:52:30',	'2021-11-20 08:52:30');

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `posts_bookmarks`;
CREATE TABLE `posts_bookmarks` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pcuserid` bigint(20) unsigned NOT NULL,
  `postid` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_bookmarks_pcuserid_foreign` (`pcuserid`),
  KEY `posts_bookmarks_postid_foreign` (`postid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `posts_bookmarks` (`id`, `pcuserid`, `postid`, `created_at`, `updated_at`) VALUES
(9,	1,	3,	'2021-11-09 18:27:48',	'2021-11-09 18:27:48');

DROP TABLE IF EXISTS `post_comments`;
CREATE TABLE `post_comments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pcuserid` bigint(20) unsigned NOT NULL,
  `postid` bigint(20) unsigned NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_comments_pcuserid_foreign` (`pcuserid`),
  KEY `post_comments_postid_foreign` (`postid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `post_comments` (`id`, `pcuserid`, `postid`, `comment`, `created_at`, `updated_at`) VALUES
(1,	1,	3,	'TEsting',	'2021-11-09 18:27:21',	'2021-11-09 18:27:21');

DROP TABLE IF EXISTS `raretes`;
CREATE TABLE `raretes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `rareteName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `raretes` (`id`, `rareteName`, `created_at`, `updated_at`) VALUES
(1,	'Rare',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(2,	'Rare Holographic',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(3,	'Ultra rare',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(4,	'Rainbow rare',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(5,	'Common',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(6,	'Uncommon',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(7,	'Rare Holographic GX',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(8,	'Rare Holographic V',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(9,	'Rare Holographic VMAX',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52');

DROP TABLE IF EXISTS `report_posts`;
CREATE TABLE `report_posts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pcuserid` bigint(20) unsigned NOT NULL,
  `postid` bigint(20) unsigned NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `report_posts_pcuserid_foreign` (`pcuserid`),
  KEY `report_posts_postid_foreign` (`postid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `stories`;
CREATE TABLE `stories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `pcuserid` bigint(20) unsigned NOT NULL,
  `mediaFirst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mediaFirstType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stories_pcuserid_foreign` (`pcuserid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `tbl_CollectionMedias`;
CREATE TABLE `tbl_CollectionMedias` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `collectionId` int(11) NOT NULL,
  `mediaId` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_CollectionMedias` (`id`, `collectionId`, `mediaId`, `created_at`, `updated_at`) VALUES
(1,	1,	1,	'2021-11-18 07:13:04',	'2021-11-18 07:13:04'),
(2,	1,	3,	'2021-11-18 07:13:26',	'2021-11-18 07:13:26'),
(3,	2,	1,	'2021-11-18 07:13:48',	'2021-11-18 07:13:48'),
(4,	2,	2,	'2021-11-18 07:14:42',	'2021-11-18 07:14:42'),
(5,	2,	3,	'2021-11-18 07:14:42',	'2021-11-18 07:14:42');

DROP TABLE IF EXISTS `tbl_liveRecords`;
CREATE TABLE `tbl_liveRecords` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `chatGroupName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channelName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_liveRecords` (`id`, `userId`, `chatGroupName`, `token`, `channelName`, `status`, `created_at`, `updated_at`) VALUES
(1,	1,	'TestGroup',	'sadasda',	'asdasdas',	'0',	'2021-11-19 19:57:58',	'2021-11-19 19:59:00'),
(2,	1,	'TestGroup',	'sadasda',	'asdasdas',	'0',	'2021-11-19 19:59:05',	'2021-11-19 19:59:05'),
(3,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-19 20:03:27',	'2021-11-19 20:03:35'),
(4,	2,	'TestGroup',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-19 20:11:10',	'2021-11-19 20:11:10'),
(5,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-20 00:15:42',	'2021-11-20 00:15:42'),
(6,	2,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-20 00:34:25',	'2021-11-20 00:34:34'),
(7,	2,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-20 00:35:23',	'2021-11-20 00:35:23'),
(8,	2,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-20 00:53:18',	'2021-11-20 00:53:18'),
(9,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-20 00:53:41',	'2021-11-20 00:53:49'),
(10,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-20 00:56:27',	'2021-11-20 00:56:59'),
(11,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-20 00:57:25',	'2021-11-20 00:58:14'),
(12,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-20 00:58:39',	'2021-11-20 01:05:11'),
(13,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-20 01:22:05',	'2021-11-20 01:22:05'),
(14,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-20 01:49:26',	'2021-11-20 01:49:26'),
(15,	2,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-20 01:49:39',	'2021-11-20 01:49:56'),
(16,	2,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IAAl0hhOyz0Ki0/WRp7Q7oM93k7M6x1VMCESiqk+UNBcAMrnWgsAAAAAEABw2xAILt+YYQEAAQAu35hh',	'lajKevin',	'0',	'2021-11-20 01:50:15',	'2021-11-20 01:50:25'),
(17,	1,	'amflkdflajkdlfja',	'0061dee9b9efd5943a284e792fc2c132623IABOicPzt+JFci1k94yLsYTBcScSsRAEvF56X/tRecan74tjY6gAAAAAEAA+DPg75j2vYQEAAQDlPa9h',	'TOKEN',	'0',	'2021-12-06 23:48:36',	'2021-12-06 23:50:01'),
(18,	1,	'amflkdflajkdlfja',	'0061dee9b9efd5943a284e792fc2c132623IABOicPzt+JFci1k94yLsYTBcScSsRAEvF56X/tRecan74tjY6gAAAAAEAA+DPg75j2vYQEAAQDlPa9h',	'TOKEN',	'0',	'2021-12-07 00:27:09',	'2021-12-07 00:28:31'),
(19,	1,	'amflkdflajkdlfja',	'0061dee9b9efd5943a284e792fc2c132623IABOicPzt+JFci1k94yLsYTBcScSsRAEvF56X/tRecan74tjY6gAAAAAEAA+DPg75j2vYQEAAQDlPa9h',	'TOKEN',	'0',	'2021-12-07 00:44:59',	'2021-12-07 00:46:18'),
(20,	2,	'amflkdflajkdlfja',	'0061dee9b9efd5943a284e792fc2c132623IABOicPzt+JFci1k94yLsYTBcScSsRAEvF56X/tRecan74tjY6gAAAAAEAA+DPg75j2vYQEAAQDlPa9h',	'TOKEN',	'0',	'2021-12-07 00:45:44',	'2021-12-07 00:45:44'),
(21,	2,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IADaxmmPmbP3l9eo0GnG3qPlhXIRdJeHRuO9SF6hQPdiaoamEDYAAAAAEAAUEHcdFoCwYQEAAQAVgLBh',	'hello',	'0',	'2021-12-07 22:31:59',	'2021-12-07 22:32:22'),
(22,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IADaxmmPmbP3l9eo0GnG3qPlhXIRdJeHRuO9SF6hQPdiaoamEDYAAAAAEAAUEHcdFoCwYQEAAQAVgLBh',	'hello',	'0',	'2021-12-07 23:05:22',	'2021-12-07 23:07:00'),
(23,	2,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IADaxmmPmbP3l9eo0GnG3qPlhXIRdJeHRuO9SF6hQPdiaoamEDYAAAAAEAAUEHcdFoCwYQEAAQAVgLBh',	'hello',	'0',	'2021-12-07 23:08:38',	'2021-12-07 23:10:02'),
(24,	2,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IADaxmmPmbP3l9eo0GnG3qPlhXIRdJeHRuO9SF6hQPdiaoamEDYAAAAAEAAUEHcdFoCwYQEAAQAVgLBh',	'hello',	'0',	'2021-12-07 23:17:34',	'2021-12-07 23:19:15'),
(25,	2,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IADaxmmPmbP3l9eo0GnG3qPlhXIRdJeHRuO9SF6hQPdiaoamEDYAAAAAEAAUEHcdFoCwYQEAAQAVgLBh',	'hello',	'0',	'2021-12-07 23:40:37',	'2021-12-07 23:40:46'),
(26,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IADaxmmPmbP3l9eo0GnG3qPlhXIRdJeHRuO9SF6hQPdiaoamEDYAAAAAEAAUEHcdFoCwYQEAAQAVgLBh',	'hello',	'0',	'2021-12-08 01:01:00',	'2021-12-08 01:01:08'),
(27,	2,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IADaxmmPmbP3l9eo0GnG3qPlhXIRdJeHRuO9SF6hQPdiaoamEDYAAAAAEAAUEHcdFoCwYQEAAQAVgLBh',	'hello',	'0',	'2021-12-08 01:16:14',	'2021-12-08 01:17:51'),
(28,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IADaxmmPmbP3l9eo0GnG3qPlhXIRdJeHRuO9SF6hQPdiaoamEDYAAAAAEAAUEHcdFoCwYQEAAQAVgLBh',	'hello',	'0',	'2021-12-08 01:22:55',	'2021-12-08 01:37:09'),
(29,	2,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IACWBTu7RzwU8ZYloWoJacllla30AG4Xykap8oZFWynMUhLdjAsAAAAAEAAUEHcdR+KxYQEAAQBH4rFh',	'kevinLaj',	'0',	'2021-12-08 23:34:03',	'2021-12-08 23:34:42'),
(30,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IACWBTu7RzwU8ZYloWoJacllla30AG4Xykap8oZFWynMUhLdjAsAAAAAEAAUEHcdR+KxYQEAAQBH4rFh',	'kevinLaj',	'0',	'2021-12-08 23:48:08',	'2021-12-08 23:48:19'),
(31,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IACWBTu7RzwU8ZYloWoJacllla30AG4Xykap8oZFWynMUhLdjAsAAAAAEAAUEHcdR+KxYQEAAQBH4rFh',	'kevinLaj',	'0',	'2021-12-09 00:01:33',	'2021-12-09 00:10:25'),
(32,	1,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IACWBTu7RzwU8ZYloWoJacllla30AG4Xykap8oZFWynMUhLdjAsAAAAAEAAUEHcdR+KxYQEAAQBH4rFh',	'kevinLaj',	'0',	'2021-12-09 00:11:10',	'2021-12-09 00:11:10'),
(33,	2,	'amflkdflajkdlfja',	'00630565fe82361456d85800fd8b9b492d2IACWBTu7RzwU8ZYloWoJacllla30AG4Xykap8oZFWynMUhLdjAsAAAAAEAAUEHcdR+KxYQEAAQBH4rFh',	'kevinLaj',	'0',	'2021-12-09 00:22:32',	'2021-12-09 00:23:21');

DROP TABLE IF EXISTS `tbl_plan`;
CREATE TABLE `tbl_plan` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `planName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `planPrice` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postLimit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `planValidity` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_plan` (`id`, `planName`, `planPrice`, `postLimit`, `planValidity`, `created_at`, `updated_at`) VALUES
(1,	'Economy',	'5.99',	'5',	'1 week',	'2021-11-11 22:52:01',	'2021-11-11 22:52:01'),
(2,	'Standard',	'10.99',	'10',	'2 week',	'2021-11-11 22:52:01',	'2021-11-11 22:52:01'),
(3,	'Premium',	'15.99',	'20',	'1 month',	'2021-11-11 22:52:01',	'2021-11-11 22:52:01');

DROP TABLE IF EXISTS `tbl_promotion`;
CREATE TABLE `tbl_promotion` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `collectionList` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `planId` int(11) NOT NULL,
  `transactionId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalPost` int(11) NOT NULL,
  `expiryDate` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_promotion` (`id`, `userId`, `collectionList`, `planId`, `transactionId`, `totalPost`, `expiryDate`, `created_at`, `updated_at`) VALUES
(1,	1,	'2,5',	2,	'sdfjhsdkj234j23kh',	2,	'2021-11-27 23:59:59',	'2021-11-13 23:44:34',	'2021-11-17 19:48:06'),
(9,	1,	'5',	1,	'sdfjhsdkj234j23kh',	1,	'2021-11-27 23:59:59',	'2021-11-13 23:44:34',	'2021-11-17 19:48:06');

DROP TABLE IF EXISTS `tbl_promotionCollection`;
CREATE TABLE `tbl_promotionCollection` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `promotionId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tbl_promotionCollection` (`id`, `promotionId`, `postId`, `created_at`, `updated_at`) VALUES
(13,	1,	2,	'2021-11-17 19:48:06',	'2021-11-17 19:48:06'),
(15,	1,	5,	'2021-11-17 19:48:06',	'2021-11-17 19:48:06'),
(17,	9,	5,	'2021-11-17 19:48:06',	'2021-11-17 19:48:06');

DROP TABLE IF EXISTS `trainers`;
CREATE TABLE `trainers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `trainerName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `trainers` (`id`, `trainerName`, `created_at`, `updated_at`) VALUES
(1,	'Item',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(2,	'Tool',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(3,	'Stadium',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(4,	'Supporter',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(5,	'Ultra Prism',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52');

DROP TABLE IF EXISTS `types`;
CREATE TABLE `types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `typeName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `types` (`id`, `typeName`, `created_at`, `updated_at`) VALUES
(1,	'Basic',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(2,	'Stage 1',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(3,	'Stage 2',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(4,	'GX',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(5,	'EX',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(6,	'Turbo',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(7,	'Mega',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(8,	'V',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(9,	'VMAX',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(10,	'Ultra Beast',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(11,	'Tag Team',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52'),
(12,	'Ultra Prism',	'2021-11-03 21:28:52',	'2021-11-03 21:28:52');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1,	'Admin Admin',	'admin@material.com',	'2021-11-03 21:28:52',	'$2y$10$wGX/dd/LrJxfl0e2TQGTsO5IhOgUMGFwlXTHJ/ZLQlb17mkmFTnce',	NULL,	'2021-11-03 21:28:52',	'2021-11-03 21:28:52');

-- 2021-12-13 10:04:39
