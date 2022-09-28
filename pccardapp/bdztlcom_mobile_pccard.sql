-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 28, 2022 at 03:15 AM
-- Server version: 5.7.39
-- PHP Version: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bdztlcom_mobile_pccard`
--

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

CREATE TABLE `collections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `collectionName` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `pcuserid` bigint(20) UNSIGNED NOT NULL,
  `mediaid` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `collections`
--

INSERT INTO `collections` (`id`, `collectionName`, `pcuserid`, `mediaid`, `created_at`, `updated_at`) VALUES
(1, 'Hockey', 25, '13', '2022-09-17 13:00:00', '2022-09-17 13:00:19'),
(2, 'Hockey', 25, '13,14,15', '2022-09-17 13:10:25', '2022-09-17 13:10:25');

-- --------------------------------------------------------

--
-- Table structure for table `create_posts`
--

CREATE TABLE `create_posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `createdBy` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `cardGame` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `rarity` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `types` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `trainerType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `energyType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `nameTeam` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `other` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `conditionId` int(11) NOT NULL DEFAULT '0',
  `cardType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `hashTag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `peopleTag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `postTag` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postPrice` int(11) NOT NULL DEFAULT '0',
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `create_posts`
--

INSERT INTO `create_posts` (`id`, `createdBy`, `description`, `cardGame`, `rarity`, `types`, `trainerType`, `energyType`, `nameTeam`, `other`, `conditionId`, `cardType`, `hashTag`, `peopleTag`, `postTag`, `postPrice`, `address`, `created_at`, `updated_at`) VALUES
(1, 24, 'Testing', '4', '', '', '', '', '3', '', 0, '2', 'magic,blue,pccards', '', '3', 0, 'Mountain View,California', '2022-03-22 23:03:48', '2022-09-17 12:52:49'),
(2, 1, 'Testing', '3', '', '', '', '', '3', '', 0, '', 'hockey', '', '3', 0, 'Mountain View,California', '2022-03-22 23:21:36', '2022-03-23 00:23:23'),
(3, 24, 'Testing new', '5', '', '', '', '', '3', '', 0, '3', 'soccer', '', '3', 0, 'Mountain View,California', '2022-03-22 23:24:23', '2022-03-22 23:24:23'),
(4, 24, 'Testing 3', '4', '', '', '', '', '9', '', 0, '2', '', '', '3', 0, 'Mountain View,California', '2022-03-22 23:30:50', '2022-03-22 23:30:50'),
(5, 1, 'pokemon', '6', '1', '1', '3', '2', '', '', 0, '', 'rare', '', '3', 0, 'Mountain View,California', '2022-04-12 18:32:24', '2022-05-13 11:03:10'),
(6, 1, 'pokemon', '6', '', '1', '3', '2', '', '', 0, '', 'rare', '', '3', 0, 'Mountain View,California', '2022-04-12 18:32:59', '2022-04-12 18:32:59'),
(7, 1, 'pokemon', '3', '', '', '', '', '1', 'Testing', 0, '60', 'hockey', '', '3', 0, 'Mountain View,California', '2022-04-12 18:35:02', '2022-04-12 18:35:02'),
(8, 1, 'Testing new Card', '3', '', '', '', '', '3', 'Testing', 0, '', '', '', '3', 0, 'Mountain View,California', '2022-04-12 23:04:18', '2022-04-12 23:04:18'),
(9, 1, 'Pokemon', '3', '', '', '', '', '5', 'Testing', 6, '', '', '', '3', 0, 'Mountain View,California', '2022-04-14 16:17:26', '2022-04-14 16:17:26'),
(11, 1, '', '6', '1', '1', '2', '7', '', '', 3, '', '', '', '3', 0, '1800 Ellis St, San Francisco, CA 94115, USA', '2022-09-12 22:14:43', '2022-09-12 22:14:43'),
(14, 25, 'Patrick kane', '3', '', '', '', '', '2', '', 1, '', '', '', '1', 2000, '319 Rue Petit, Sainte-Sophie, QC J5J 1W2, Canada', '2022-09-17 13:02:44', '2022-09-17 13:02:44'),
(13, 25, 'Young gun connor mcmicheal', '3', '', '', '', '', '8', '', 1, '', '', '', '1', 250, '319 Rue Petit, Sainte-Sophie, QC J5J 1W2, Canada', '2022-09-17 12:57:56', '2022-09-17 12:57:56'),
(15, 25, 'Patrick kane', '3', '', '', '', '', '2', '', 1, '', '', '', '1', 2500, '319 Rue Petit, Sainte-Sophie, QC J5J 1W2, Canada', '2022-09-17 13:04:49', '2022-09-17 13:04:49'),
(16, 25, 'Leon draisaitl', '3', '', '', '', '', '21', '', 1, '', '', '', '1', 1700, '319 Rue Petit, Sainte-Sophie, QC J5J 1W2, Canada', '2022-09-17 13:08:48', '2022-09-17 13:08:48'),
(19, 25, 'Tele', '1', '', '', '', '', '1', '', 2, '12', '', '', '1', 500, '319 Rue Petit, Sainte-Sophie, QC J5J 1W2, Canada', '2022-09-19 13:09:07', '2022-09-19 13:09:07'),
(20, 26, 'Jack', '3', '', '', '', '', '4', '', 1, '', '', '', '2', 0, '319 Rue Petit, Sainte-Sophie, QC J5J 1W2, Canada', '2022-09-19 13:35:51', '2022-09-19 13:35:51');

-- --------------------------------------------------------

--
-- Table structure for table `energy_types`
--

CREATE TABLE `energy_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `EnergyTypeName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `EnergyTypeNameFr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `energy_types`
--

INSERT INTO `energy_types` (`id`, `EnergyTypeName`, `EnergyTypeNameFr`, `created_at`, `updated_at`) VALUES
(1, 'Grass', 'Gazon', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(2, 'fire', 'Feu', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(3, 'Water', 'Eau', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(4, 'Lightning', 'Électrique', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(5, 'Psychic', 'Psychique', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(6, 'Fighting', 'Combat', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(7, 'Grass', 'Plante', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(8, 'Metal', 'Métal', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(9, 'Colorless', 'Incolore', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(10, 'Fairy', 'Fée', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(11, 'Dragon', 'Dragon', '2021-11-03 21:28:52', '2021-11-03 21:28:52');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `follow_pccard_users`
--

CREATE TABLE `follow_pccard_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pcuserid` bigint(20) NOT NULL,
  `following_pcuserid` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `follow_pccard_users`
--

INSERT INTO `follow_pccard_users` (`id`, `pcuserid`, `following_pcuserid`, `created_at`, `updated_at`) VALUES
(9, 24, 1, '2022-03-22 23:50:46', '2022-03-22 23:50:46'),
(22, 1, 24, '2022-04-05 06:44:50', '2022-04-05 06:44:50'),
(26, 25, 24, '2022-09-17 12:52:23', '2022-09-17 12:52:23'),
(27, 25, 1, '2022-09-18 04:46:17', '2022-09-18 04:46:17'),
(24, 3, 1, '2022-09-17 08:27:35', '2022-09-17 08:27:35'),
(29, 25, 4, '2022-09-18 04:46:33', '2022-09-18 04:46:33'),
(30, 26, 25, '2022-09-19 13:25:18', '2022-09-19 13:25:18');

-- --------------------------------------------------------

--
-- Table structure for table `like_posts`
--

CREATE TABLE `like_posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pcuserid` bigint(20) UNSIGNED NOT NULL,
  `postid` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `like_posts`
--

INSERT INTO `like_posts` (`id`, `pcuserid`, `postid`, `created_at`, `updated_at`) VALUES
(1, 24, 1, '2022-03-22 23:33:49', '2022-03-22 23:33:49'),
(5, 24, 2, '2022-03-23 00:22:52', '2022-03-23 00:22:52'),
(3, 1, 1, '2022-03-23 00:12:20', '2022-03-23 00:12:20'),
(6, 25, 5, '2022-05-13 11:03:09', '2022-05-13 11:03:09'),
(8, 25, 1, '2022-09-17 12:52:49', '2022-09-17 12:52:49');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `postid` bigint(20) UNSIGNED NOT NULL,
  `mediaUrl` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `mediaType` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `postid`, `mediaUrl`, `mediaType`, `created_at`, `updated_at`) VALUES
(1, 1, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1647948828.jpg', 'image', '2022-03-22 23:03:48', '2022-03-22 23:03:48'),
(2, 2, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1647949896.jpg', 'image', '2022-03-22 23:21:36', '2022-03-22 23:21:36'),
(3, 3, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1647950063.jpg', 'image', '2022-03-22 23:24:23', '2022-03-22 23:24:23'),
(4, 4, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1647950450.jpg', 'image', '2022-03-22 23:30:50', '2022-03-22 23:30:50'),
(5, 5, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1649746944.jpg', 'image', '2022-04-12 18:32:24', '2022-04-12 18:32:24'),
(6, 6, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1649746979.jpg', 'image', '2022-04-12 18:32:59', '2022-04-12 18:32:59'),
(7, 7, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1649747102.png', 'image', '2022-04-12 18:35:02', '2022-04-12 18:35:02'),
(8, 8, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1649763258.undefined', 'image', '2022-04-12 23:04:18', '2022-04-12 23:04:18'),
(9, 9, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1649911646.jpeg', 'image', '2022-04-14 16:17:26', '2022-04-14 16:17:26'),
(14, 14, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1663378364.jpg', 'image', '2022-09-17 13:02:44', '2022-09-17 13:02:44'),
(11, 11, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1662979483.undefined', 'image', '2022-09-12 22:14:43', '2022-09-12 22:14:43'),
(13, 13, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1663378076.jpg', 'image', '2022-09-17 12:57:56', '2022-09-17 12:57:56'),
(15, 15, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1663378489.jpg', 'image', '2022-09-17 13:04:49', '2022-09-17 13:04:49'),
(16, 16, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1663378728.jpg', 'image', '2022-09-17 13:08:48', '2022-09-17 13:08:48'),
(19, 19, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1663551547.jpg', 'image', '2022-09-19 13:09:07', '2022-09-19 13:09:07'),
(20, 20, 'https://bdztl.com/pccardapp/public/postimages/mediaFirst1663553151.jpg', 'image', '2022-09-19 13:35:51', '2022-09-19 13:35:51');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2021_08_30_053749_create_pccard_users', 1),
(6, '2021_09_01_061911_create_energy_types_table', 1),
(7, '2021_09_01_062056_create_raretes_table', 1),
(8, '2021_09_01_062132_create_trainers_table', 1),
(9, '2021_09_01_062208_create_types_table', 1),
(10, '2021_09_01_080517_create_create_posts_table', 1),
(11, '2021_09_02_104128_create_follow_pccard_users_table', 1),
(12, '2021_09_03_063249_create_post_comments_table', 1),
(13, '2021_09_03_101927_create_like_posts_table', 1),
(14, '2021_09_06_053417_create_report_posts_table', 1),
(15, '2021_09_09_172333_create_stories_table', 1),
(16, '2021_09_11_133737_create_notifications_table', 1),
(17, '2021_10_29_160609_create_posts_bookmarks_table', 1),
(18, '2021_11_03_151509_create_media_table', 1),
(20, '2021_11_03_151823_create_collections_table', 2),
(26, '2021_11_11_134031_create_plan_table', 3),
(28, '2021_11_13_154523_tbl_promotion', 4),
(29, '2021_11_16_131357_promotion_collection', 5),
(30, '2021_11_18_123701_collection_media', 6),
(31, '2021_11_18_181041_tbl_live_record', 7),
(32, '2021_11_19_101907_update_live_table', 8),
(45, '2021_11_19_110441_update_tbl_live_records', 9),
(46, '2021_12_30_145859_create_post_table', 9),
(47, '2021_12_30_145929_create_hashtag_table', 9),
(48, '2021_12_30_150416_create_hashtag_to_post_table', 9),
(49, '2021_12_30_155907_create_people_to_post_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fromid` bigint(20) UNSIGNED NOT NULL,
  `toid` bigint(20) UNSIGNED NOT NULL,
  `postid` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `text` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isread` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `fromid`, `toid`, `postid`, `text`, `type`, `isread`, `created_at`, `updated_at`) VALUES
(3, 24, 24, 1, 'akshay liked your post.', 'Post Liked.', 0, '2022-03-22 23:33:49', '2022-03-22 23:33:49'),
(10, 24, 1, 0, 'akshay started following you.', 'Following', 0, '2022-03-22 23:50:46', '2022-03-22 23:50:46'),
(41, 3, 1, 0, 'kevin started following you.', 'Following', 0, '2022-09-17 08:27:35', '2022-09-17 08:27:35'),
(46, 25, 24, 1, 'isabelle liked your post.', 'Post Liked.', 0, '2022-09-17 12:52:49', '2022-09-17 12:52:49'),
(49, 25, 4, 0, 'isabelle started following you.', 'Following', 0, '2022-09-18 04:46:33', '2022-09-18 04:46:33'),
(50, 26, 25, 0, 'mgpc started following you.', 'Following', 0, '2022-09-19 13:25:18', '2022-09-19 13:25:18'),
(45, 25, 24, 0, 'isabelle started following you.', 'Following', 0, '2022-09-17 12:52:23', '2022-09-17 12:52:23'),
(32, 24, 1, 2, 'akshay commented on your post.', 'Post Comments.', 0, '2022-03-23 00:23:23', '2022-03-23 00:23:23'),
(31, 24, 1, 2, 'akshay liked your post.', 'Post Liked.', 0, '2022-03-23 00:22:52', '2022-03-23 00:22:52'),
(47, 25, 1, 0, 'isabelle started following you.', 'Following', 0, '2022-09-18 04:46:17', '2022-09-18 04:46:17'),
(38, 1, 24, 0, 'lajkevin started following you.', 'Following', 0, '2022-04-05 06:44:50', '2022-04-05 06:44:50');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pccard_users`
--

CREATE TABLE `pccard_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profilePic` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `website` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `bio` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `pushNotification` tinyint(1) NOT NULL DEFAULT '1',
  `newPostNotification` tinyint(1) NOT NULL DEFAULT '1',
  `connectionLiveNotification` tinyint(1) NOT NULL DEFAULT '1',
  `friendRequestNotification` tinyint(1) NOT NULL DEFAULT '1',
  `Is_Active` tinyint(1) NOT NULL DEFAULT '0',
  `validationCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `device_type` tinyint(1) NOT NULL,
  `device_token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pccard_users`
--

INSERT INTO `pccard_users` (`id`, `name`, `username`, `email`, `password`, `profilePic`, `website`, `bio`, `pushNotification`, `newPostNotification`, `connectionLiveNotification`, `friendRequestNotification`, `Is_Active`, `validationCode`, `device_type`, `device_token`, `created_at`, `updated_at`) VALUES
(1, 'Kevin', 'lajkevin', 'kevinlaj@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/images/1636531861.jpg', '', 'I am Pokemon & basketball cards collector', 0, 1, 0, 0, 0, '', 0, 'SSDGFGGERG', '2021-11-03 21:40:15', '2022-09-02 21:39:24'),
(27, '', 'Chris', 'Christophe@brainup.ca', 'b7e8040624e1a29430213355fc50fab2', 'https://bdztl.com/pccardapp/public/images/1630561524.jpg', '', '', 1, 1, 1, 1, 0, '', 1, 'null', '2022-09-24 05:46:22', '2022-09-24 05:46:22'),
(2, 'Pokemon', 'lajkevin2', 'kevinlaj2@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/images/1636531861.jpg', '', '', 1, 1, 1, 1, 0, '', 0, '', '2021-11-03 21:40:15', '2022-03-22 17:04:09'),
(3, '', 'kevin', 'kevin@brainup.ca', '83cd2a1bd1274aab6fcd430ad5e4ec27', 'https://xpertidea.com/anonymous/mobileteam/pccardapp/public/images/1630561524.jpg', '', '', 0, 0, 0, 0, 0, '', 1, 'null', '2021-11-20 08:52:30', '2022-09-15 07:26:08'),
(4, '', 'mic', 'michael@brainup.ca', 'e10adc3949ba59abbe56e057f20f883e', 'https://bdztl.com/pccardapp/public/images/1630561524.jpg', '', '', 0, 0, 0, 0, 0, '', 0, '', '2022-01-20 04:10:51', '2022-03-22 17:53:27'),
(25, 'Isabelle', 'isabelle', 'isabelleboudreau009101@gmail.com', '5f587e6cfa4d87375de598fbdb6d7130', 'https://bdztl.com/pccardapp/images/1663437838.png', 'https://pccardsapp.com/', 'Je collectionne hockey et Pokémon', 1, 1, 1, 1, 0, '', 1, 'null', '2022-03-24 01:44:40', '2022-09-22 11:52:23'),
(5, '', 'lenox', 'm.levesque.pel@gmail.ca', 'e10adc3949ba59abbe56e057f20f883e', 'https://bdztl.com/pccardapp/public/images/1630561524.jpg', '', '', 0, 0, 0, 0, 0, '', 0, '1234', '2022-01-24 07:50:27', '2022-01-24 07:50:27'),
(6, '', 'lenoxydable', 'm.levesque.pel@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'https://bdztl.com/pccardapp/public/images/1630561524.jpg', '', '', 0, 0, 0, 0, 0, '', 0, 'd1M6AteiTAGq55uNMHe-qS:APA91bGvuw1fBRXU4jAHvdR5u42r5wFX_cRaLPA88QUlxYFjGuTmVOwTOA8vS6_RksiiI0_Wlz60Fx_Hh_yzcdn5IF8N8XVxGMNbFjqmilzRieb8BWnqo_sOwQzjVVj6Y68177nK0Dr1', '2022-01-25 09:14:27', '2022-02-16 10:17:23'),
(24, 'Akshay', 'akshay', 'singlaakshay73@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 'https://bdztl.com/pccardapp/public/images/1630561524.jpg', '', '', 1, 1, 1, 1, 0, '', 0, 'fVcGVXsSR8ODLzADGKfaQd:APA91bEvjzSq3CYrbwtaVBG-Okz6-iJ7uydYAz5YQF_4U1CXJHgGAk7sMaLD00JRejgOOdBxrvqfhOJAkdKUO52fJPxmIIVsybapWGTeiMipbDnK1xAFHz5F45I1_6v6CaFUzjkfnlQa', '2022-02-14 22:00:34', '2022-03-22 20:53:23'),
(26, 'Maxime', 'mgpc', 'maxgregoire88@hotmail.com', '05f6ea1a19a49e83e1f54b22517e392b', 'https://bdztl.com/pccardapp/public/images/1630561524.jpg', '', '', 1, 1, 1, 1, 0, '', 1, 'null', '2022-09-19 13:22:27', '2022-09-19 13:24:32');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts_bookmarks`
--

CREATE TABLE `posts_bookmarks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pcuserid` bigint(20) UNSIGNED NOT NULL,
  `postid` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts_bookmarks`
--

INSERT INTO `posts_bookmarks` (`id`, `pcuserid`, `postid`, `created_at`, `updated_at`) VALUES
(2, 1, 1, '2022-03-25 00:19:12', '2022-03-25 00:19:12'),
(9, 25, 1, '2022-09-19 13:04:26', '2022-09-19 13:04:26'),
(6, 25, 7, '2022-09-17 12:51:29', '2022-09-17 12:51:29'),
(8, 25, 2, '2022-09-17 13:12:48', '2022-09-17 13:12:48');

-- --------------------------------------------------------

--
-- Table structure for table `post_comments`
--

CREATE TABLE `post_comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pcuserid` bigint(20) UNSIGNED NOT NULL,
  `postid` bigint(20) UNSIGNED NOT NULL,
  `parentCommentId` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_comments`
--

INSERT INTO `post_comments` (`id`, `pcuserid`, `postid`, `parentCommentId`, `comment`, `created_at`, `updated_at`) VALUES
(1, 24, 2, '', 'Testing', '2022-03-23 00:03:01', '2022-03-23 00:03:01'),
(2, 24, 2, '', 'Nice card', '2022-03-23 00:04:35', '2022-03-23 00:04:35'),
(3, 24, 2, '', 'Nice card', '2022-03-23 00:05:24', '2022-03-23 00:05:24'),
(4, 24, 2, '', 'Nice card', '2022-03-23 00:05:46', '2022-03-23 00:05:46'),
(5, 24, 2, '', 'Nice card', '2022-03-23 00:07:03', '2022-03-23 00:07:03'),
(6, 24, 2, '', 'Nice card', '2022-03-23 00:08:01', '2022-03-23 00:08:01'),
(7, 24, 2, '', 'Nice card', '2022-03-23 00:11:19', '2022-03-23 00:11:19'),
(8, 24, 2, '', 'Nice card', '2022-03-23 00:11:34', '2022-03-23 00:11:34'),
(9, 24, 2, '', 'Nice card', '2022-03-23 00:11:56', '2022-03-23 00:11:56'),
(10, 1, 1, '', 'Test', '2022-03-23 00:12:40', '2022-03-23 00:12:40'),
(11, 24, 2, '', 'Testing', '2022-03-23 00:23:23', '2022-03-23 00:23:23'),
(12, 25, 1, '', 'Nice !', '2022-09-17 12:50:34', '2022-09-17 12:50:34');

-- --------------------------------------------------------

--
-- Table structure for table `raretes`
--

CREATE TABLE `raretes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `rareteName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `rareteNameFr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `raretes`
--

INSERT INTO `raretes` (`id`, `rareteName`, `rareteNameFr`, `created_at`, `updated_at`) VALUES
(1, 'Rare', 'Rare', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(2, 'Rare Holographic', 'Holographique rare', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(3, 'Ultra rare', 'Ultra rare', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(4, 'Rainbow rare', 'Arc-en-ciel rare', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(5, 'Common', 'Commune', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(6, 'Uncommon', 'Peu commune', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(7, 'Rare Holographic GX', 'GX holographique rare', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(8, 'Rare Holographic V', 'V holographique rare', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(9, 'Rare Holographic VMAX', 'VMAX holographique rare', '2021-11-03 21:28:52', '2021-11-03 21:28:52');

-- --------------------------------------------------------

--
-- Table structure for table `report_posts`
--

CREATE TABLE `report_posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pcuserid` bigint(20) UNSIGNED NOT NULL,
  `postid` bigint(20) UNSIGNED NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pcuserid` bigint(20) UNSIGNED NOT NULL,
  `mediaFirst` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mediaFirstType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_baseballCardType`
--

CREATE TABLE `tbl_baseballCardType` (
  `id` int(11) NOT NULL,
  `cardType` varchar(150) NOT NULL,
  `cardTypeFr` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_baseballCardType`
--

INSERT INTO `tbl_baseballCardType` (`id`, `cardType`, `cardTypeFr`, `created_at`, `updated_at`) VALUES
(1, 'Allen & Ginter Chrome', 'Allen & Ginter Chrome', '2022-02-25 01:20:46', '2022-02-25 01:20:46'),
(2, 'Bowman Platinum', 'Bowman Platinum', '2022-02-25 01:21:08', '2022-02-25 01:21:08'),
(3, 'Bownman Prosport paper', 'Bownman Prosport paper', '2022-02-25 01:21:29', '2022-02-25 01:21:29'),
(4, 'Donruss', 'Donruss', '2022-02-25 01:21:43', '2022-02-25 01:21:43'),
(5, 'Dynasty', 'Dynasty', '2022-02-25 01:21:56', '2022-02-25 01:21:56'),
(6, 'Elite', 'Elite', '2022-02-25 01:22:06', '2022-02-25 01:22:06'),
(7, 'Leaf', 'Leaf', '2022-02-25 01:22:19', '2022-02-25 01:22:19'),
(8, 'Metal Draft', 'Metal Draft', '2022-02-25 01:22:31', '2022-02-25 01:22:31'),
(9, 'National Treasures', 'National Treasures', '2022-02-25 01:22:44', '2022-02-25 01:22:44'),
(10, 'Onyx Vintage', 'Onyx Vintage', '2022-02-25 01:22:58', '2022-02-25 01:22:58'),
(11, 'Panini Prizm', 'Panini Prizm', '2022-02-25 01:24:20', '2022-02-25 01:24:20'),
(12, 'Panini', 'Panini', '2022-02-25 01:24:38', '2022-02-25 01:24:38'),
(13, 'Sp Authentic', 'Sp Authentic', '2022-02-25 01:24:51', '2022-02-25 01:24:51'),
(14, 'Stadium Club Chrome', 'Stadium Club Chrome', '2022-02-25 01:25:01', '2022-02-25 01:25:01'),
(15, 'Topps', 'Topps', '2022-02-25 01:25:17', '2022-02-25 01:25:17'),
(16, 'Ultimate Draft', 'Ultimate Draft', '2022-02-25 01:25:28', '2022-02-25 01:25:28'),
(17, 'Ultra Homerun King', 'Ultra Homerun King', '2022-02-25 01:25:43', '2022-02-25 01:25:43'),
(18, 'Upper deck', 'Upper deck', '2022-02-25 01:25:55', '2022-02-25 01:25:55'),
(19, 'Other', 'Autre', '2022-02-25 01:26:33', '2022-02-25 01:26:33');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_baseballTeam`
--

CREATE TABLE `tbl_baseballTeam` (
  `id` int(11) NOT NULL,
  `nameTeam` varchar(150) NOT NULL,
  `nameTeamFr` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_baseballTeam`
--

INSERT INTO `tbl_baseballTeam` (`id`, `nameTeam`, `nameTeamFr`, `created_at`, `updated_at`) VALUES
(1, 'Arizona Diamondbacks ', 'Angels de Los Angeles', '2022-02-25 01:27:06', '2022-02-25 01:27:06'),
(2, 'Atlanta Braves ', 'Astros de Houston', '2022-02-25 01:27:20', '2022-02-25 01:27:20'),
(3, 'Baltimore Orioles ', 'Athletics d’Oakland', '2022-02-25 01:27:49', '2022-02-25 01:27:49'),
(4, 'Boston Red Sox', 'Blue Jays de Toronto', '2022-02-25 01:28:10', '2022-02-25 01:28:10'),
(5, 'Chicago Cubs  ', 'Braves d’Atlanta', '2022-02-25 01:28:35', '2022-02-25 01:28:35'),
(6, 'Chicago White Sox ', 'Brewers de Milwaukee', '2022-02-25 01:28:52', '2022-02-25 01:28:52'),
(7, 'Cincinnati Reds ', 'Capitals de Québec', '2022-02-25 01:29:09', '2022-02-25 01:29:09'),
(8, 'Cleveland Indians ', 'Cardinals de Saint-Louis', '2022-02-25 01:29:29', '2022-02-25 01:29:29'),
(9, 'Colorado Rockies ', 'Cubs de Chicago', '2022-02-25 01:29:52', '2022-02-25 01:29:52'),
(10, 'Detroit Tigers ', 'Diamondbacks de l’Arizona', '2022-02-25 01:30:10', '2022-02-25 01:30:10'),
(11, 'Houston Astros ', 'Dodgers de Los Angeles', '2022-02-25 01:30:27', '2022-02-25 01:30:27'),
(12, 'Kansas City Royals ', 'Expos de Montréal', '2022-02-25 01:31:02', '2022-02-25 01:31:02'),
(13, 'Los Angeles Angels ', 'Giants de San Francisco', '2022-02-25 01:32:26', '2022-02-25 01:32:26'),
(14, 'Los Angeles Dodgers  ', 'Indians de Cleveland', '2022-02-25 01:32:44', '2022-02-25 01:32:44'),
(15, 'Miami Marlins  ', 'Mariners de Seattle', '2022-02-25 01:33:03', '2022-02-25 01:33:03'),
(16, 'Milwaukee Brewers ', 'Marlins de Miami', '2022-02-25 02:18:23', '2022-02-25 02:18:23'),
(17, 'Minnesota Twins ', 'Mets de New York', '2022-02-25 02:19:24', '2022-02-25 02:19:24'),
(18, 'Montreal Expos ', 'Orioles de Baltimore', '2022-02-25 02:23:50', '2022-02-25 02:23:50'),
(19, 'New York Mets ', 'Padres de San Diego', '2022-02-25 02:24:11', '2022-02-25 02:24:11'),
(20, 'New York Yankees ', 'Phillies de Philadelphie', '2022-02-25 02:24:32', '2022-02-25 02:24:32'),
(21, 'Oakland Athletics ', 'Pirates de Pittsburg', '2022-02-25 02:24:54', '2022-02-25 02:24:54'),
(22, 'Philadelphia Phillies ', 'Rangers du Texas', '2022-02-25 02:25:10', '2022-02-25 02:25:10'),
(23, 'Pittsburgh Pirates ', 'Rays de Tampa Bay', '2022-02-25 02:25:30', '2022-02-25 02:25:30'),
(24, 'Quebec Capitals ', 'Red Sox de Boston', '2022-02-25 02:25:49', '2022-02-25 02:25:49'),
(25, 'Saint-Louis Cardinals', 'Reds de Cincinnati', '2022-02-25 02:26:19', '2022-02-25 02:26:19'),
(26, 'San Diego Padres', 'Rockies du Colorado', '2022-02-25 02:26:42', '2022-02-25 02:26:42'),
(27, 'San Francisco Giants ', 'Royals de Kansas City', '2022-02-25 02:27:04', '2022-02-25 02:27:04'),
(28, 'Seattle Mariners ', 'Senators de Washington', '2022-02-25 02:27:20', '2022-02-25 02:27:20'),
(29, 'Tampa Bay Rays ', 'Tigers de Détroit', '2022-02-25 02:28:02', '2022-02-25 02:28:02'),
(30, 'Texas Rangers ', 'Twins du Minnesota', '2022-02-25 02:28:18', '2022-02-25 02:28:18'),
(31, 'Toronto Blue Jays', 'White Sox de Chicago', '2022-02-25 02:28:37', '2022-02-25 02:28:37'),
(32, 'Washington Senators  ', 'Yankees de New York', '2022-02-25 02:29:00', '2022-02-25 02:29:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_basketballCardType`
--

CREATE TABLE `tbl_basketballCardType` (
  `id` int(11) NOT NULL,
  `cardType` varchar(150) NOT NULL,
  `cardTypeFr` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_basketballCardType`
--

INSERT INTO `tbl_basketballCardType` (`id`, `cardType`, `cardTypeFr`, `created_at`, `updated_at`) VALUES
(1, 'All-Rookies', 'All-Rookies', '2022-02-25 02:31:40', '2022-02-25 02:31:40'),
(2, 'Black', 'Black', '2022-02-25 02:31:50', '2022-02-25 02:31:50'),
(3, 'Chronicles', 'Chronicles', '2022-02-25 02:32:00', '2022-02-25 02:32:00'),
(4, 'Donruss', 'Donruss', '2022-02-25 02:32:11', '2022-02-25 02:32:11'),
(5, 'Essentials', 'Essentials', '2022-02-25 02:32:25', '2022-02-25 02:32:25'),
(6, 'Future Heros', 'Future Heros', '2022-02-25 02:32:35', '2022-02-25 02:32:35'),
(7, 'Hoops Premium', 'Hoops Premium', '2022-02-25 02:32:46', '2022-02-25 02:32:46'),
(8, 'Mcdonald’s', 'Mcdonald’s', '2022-02-25 02:32:57', '2022-02-25 02:32:57'),
(9, 'Panini', 'Panini', '2022-02-25 02:33:14', '2022-02-25 02:33:14'),
(10, 'Panini Certified', 'Panini Certified', '2022-02-25 02:33:26', '2022-02-25 02:33:26'),
(11, 'Panini Illusions', 'Panini Illusions', '2022-02-25 02:33:38', '2022-02-25 02:33:38'),
(12, 'Panini Mosaic', 'Panini Mosaic', '2022-02-25 02:33:55', '2022-02-25 02:33:55'),
(13, 'Panini nba hoops', 'Panini nba hoops', '2022-02-25 02:34:06', '2022-02-25 02:34:06'),
(14, 'Panini Prizm', 'Panini Prizm', '2022-02-25 02:34:17', '2022-02-25 02:34:17'),
(15, 'Panini Spectra', 'Panini Spectra', '2022-02-25 02:34:28', '2022-02-25 02:34:28'),
(16, 'Rookie Exchange', 'Rookie Exchange', '2022-02-25 02:34:39', '2022-02-25 02:34:39'),
(17, 'Spectra', 'Spectra', '2022-02-25 02:34:51', '2022-02-25 02:34:51'),
(18, 'Status', 'Status', '2022-02-25 02:35:00', '2022-02-25 02:35:00'),
(19, 'Threads', 'Threads', '2022-02-25 02:35:11', '2022-02-25 02:35:11'),
(20, 'Triple double', 'Triple double', '2022-02-25 02:35:21', '2022-02-25 02:35:21'),
(21, 'Upper deck', 'Upper deck', '2022-02-25 02:35:37', '2022-02-25 02:35:37'),
(22, 'Other', 'Autre', '2022-02-25 02:35:54', '2022-02-25 02:35:54');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_basketballTeam`
--

CREATE TABLE `tbl_basketballTeam` (
  `id` int(11) NOT NULL,
  `nameTeam` varchar(150) NOT NULL,
  `nameTeamFr` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_basketballTeam`
--

INSERT INTO `tbl_basketballTeam` (`id`, `nameTeam`, `nameTeamFr`, `created_at`, `updated_at`) VALUES
(1, 'Atlanta Hawks ', '76ers de Philadelphie', '2022-02-25 02:37:55', '2022-02-25 02:37:55'),
(2, 'Boston Celtics ', 'Bucks de Milwaukee', '2022-02-25 02:38:14', '2022-02-25 02:38:14'),
(3, 'Brooklyn Nets ', 'Bulls de Chicago', '2022-02-25 02:38:28', '2022-02-25 02:38:28'),
(4, 'Butler Bulldogs', 'Butler Bulldogs', '2022-02-25 02:38:47', '2022-02-25 02:38:47'),
(5, 'Canada Basketball', 'Canada Basketball', '2022-02-25 02:39:36', '2022-02-25 02:39:36'),
(6, 'Charlotte Hornets ', 'Celtics de Boston', '2022-02-25 02:39:49', '2022-02-25 02:39:49'),
(7, 'Chicago Bulls ', 'Clippers de Los Angeles', '2022-02-25 02:40:07', '2022-02-25 02:40:07'),
(8, 'Dallas Mavericks', 'Grizzlies de Memphis', '2022-02-25 02:40:26', '2022-02-25 02:40:26'),
(9, 'Denver Nuggets', 'Hawks d’Atlanta', '2022-02-25 02:41:14', '2022-02-25 02:41:14'),
(10, 'Detroit Pistons ', 'Hornets de Charlotte', '2022-02-25 02:41:30', '2022-02-25 02:41:30'),
(11, 'Golden State Warriors ', 'Iteat de Miami', '2022-02-25 02:41:55', '2022-02-25 02:41:55'),
(12, 'Houston Rockets ', 'Jazz de l’Utah', '2022-02-25 02:42:16', '2022-02-25 02:42:16'),
(13, 'Indiana Pacers ', 'Kings de Sacramento', '2022-02-25 02:42:37', '2022-02-25 02:42:37'),
(14, 'Los Angeles Clippers', 'Knicks de New York', '2022-02-25 02:43:09', '2022-02-25 02:43:09'),
(15, 'Los Angeles Lakers ', 'Lakers de Los Angeles', '2022-02-25 02:43:38', '2022-02-25 02:43:38'),
(16, 'Memphis Grizzlies ', 'Magic d’Orlando', '2022-02-25 02:44:03', '2022-02-25 02:44:03'),
(17, 'Miami Heat', 'Mavericks de Dallas', '2022-02-25 02:44:21', '2022-02-25 02:44:21'),
(18, 'Milwaukee Bucks ', 'Mountaineers de la Virginie ', '2022-02-25 02:45:19', '2022-02-25 02:45:19'),
(19, 'New Orleans Pelicans ', 'Nets de Brooklyn', '2022-02-25 02:45:48', '2022-02-25 02:45:48'),
(20, 'New York Knicks', 'Notre Dame Fighting (ND)', '2022-02-25 02:46:18', '2022-02-25 02:46:18'),
(21, 'Notre Dame Fighting (ND)', 'Nuggets de Denver', '2022-02-25 02:46:49', '2022-02-25 02:46:49'),
(22, 'OKC Thunder ', 'Pacers de l’Indiana', '2022-02-25 02:47:18', '2022-02-25 02:47:18'),
(23, 'Orlando Magic ', 'Pacific Tigers', '2022-02-25 02:47:44', '2022-02-25 02:47:44'),
(24, 'Pacific Tigers', 'Pelicans New Orleans', '2022-02-25 02:53:38', '2022-02-25 02:53:38'),
(25, 'Philadelphia 76ers', 'Pistons de Détroit', '2022-02-25 02:53:55', '2022-02-25 02:53:55'),
(26, 'Phoenix Suns ', 'Rockets de Houston', '2022-02-25 02:54:12', '2022-02-25 02:54:12'),
(27, 'Portland Trail Blazers ', 'Spurs de San Antonio', '2022-02-25 02:54:29', '2022-02-25 02:54:29'),
(28, 'Sacramento Kings', 'Suns de Phoenix', '2022-02-25 02:54:45', '2022-02-25 02:54:45'),
(29, 'San Antonio Spurs ', 'Thunder OKC', '2022-02-25 02:55:02', '2022-02-25 02:55:02'),
(30, 'Toledo Rockets', 'Toledo Rockets', '2022-02-25 02:55:23', '2022-02-25 02:55:23'),
(31, 'Toronto Raptors ', 'Trail Blazers de Portland ', '2022-02-25 02:55:42', '2022-02-25 02:55:42'),
(32, 'Utah Jazz ', 'Warriors de Golden State', '2022-02-25 02:55:59', '2022-02-25 02:55:59'),
(33, 'Virginie Mountaineers  ', 'Wizards de Washington', '2022-02-25 02:56:13', '2022-02-25 02:56:13'),
(34, 'Washington Wizards', 'Raptors de Toronto', '2022-02-25 02:56:25', '2022-02-25 02:56:25');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cardGame`
--

CREATE TABLE `tbl_cardGame` (
  `id` int(11) NOT NULL,
  `gameName` varchar(150) NOT NULL,
  `gameNameFr` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_cardGame`
--

INSERT INTO `tbl_cardGame` (`id`, `gameName`, `gameNameFr`, `created_at`, `updated_at`) VALUES
(1, 'Baseball', 'Base-ball', '2022-02-25 00:29:35', '2022-02-25 00:29:35'),
(2, 'Basketball', 'Basket-ball', '2022-02-25 00:30:09', '2022-02-25 00:30:09'),
(3, 'Hockey', 'Le Hockey', '2022-02-25 00:30:31', '2022-02-25 00:30:31'),
(4, 'Magic', 'La magie', '2022-02-25 00:30:55', '2022-02-25 00:30:55'),
(5, 'Soccer', 'Football', '2022-02-25 00:31:58', '2022-02-25 00:31:58'),
(6, 'Pokemon', 'Pokémon', '2022-02-25 00:32:57', '2022-02-25 00:32:57');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_CollectionMedias`
--

CREATE TABLE `tbl_CollectionMedias` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `collectionId` int(11) NOT NULL,
  `mediaId` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_CollectionMedias`
--

INSERT INTO `tbl_CollectionMedias` (`id`, `collectionId`, `mediaId`, `created_at`, `updated_at`) VALUES
(3, 2, 13, '2022-09-17 13:10:25', '2022-09-17 13:10:25'),
(2, 1, 13, '2022-09-17 13:00:00', '2022-09-17 13:00:00'),
(4, 2, 14, '2022-09-17 13:10:25', '2022-09-17 13:10:25'),
(5, 2, 15, '2022-09-17 13:10:25', '2022-09-17 13:10:25');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_Condition`
--

CREATE TABLE `tbl_Condition` (
  `id` int(11) NOT NULL,
  `conditionName` varchar(150) NOT NULL,
  `conditionNameFr` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_Condition`
--

INSERT INTO `tbl_Condition` (`id`, `conditionName`, `conditionNameFr`, `created_at`, `updated_at`) VALUES
(1, 'Gem Mint (No default ex: PSA 10)', 'Gem Mint (Aucun défaut ex : PSA 10)', '2022-04-11 22:45:33', '2022-04-11 22:45:33'),
(2, 'Nmint/Mint (Near mint condition, slight default barely visible)', 'Nmint/Mint (Quasi parfaite, léger défaut difficilement visible)', '2022-04-11 22:46:09', '2022-04-11 22:46:09'),
(3, 'Nmint (One or multiple very light defaults)', 'Nmint (1 ou plusieurs très légers défauts)', '2022-04-11 22:47:06', '2022-04-11 22:47:06'),
(4, 'Mint (Perfect condition)', 'Mint (Parfaite condition)', '2022-04-11 22:50:25', '2022-04-11 22:50:25'),
(5, 'Exc (Lights defaults on the corners of the card)', 'Exc (Légers défauts sur le bord de la carte', '2022-04-11 22:51:05', '2022-04-11 22:51:05'),
(6, 'Fine (Medium condition)', 'Fine (État moyen)', '2022-04-11 22:53:25', '2022-04-11 22:53:25'),
(7, 'Played (Damaged Ex: Folded, scratched)', 'Played (Abîmée ex : Pliée, graffignée)', '2022-04-11 22:54:36', '2022-04-11 22:54:36'),
(8, 'Poor (Very damaged)', 'Poor (Très abîmée)', '2022-04-11 22:56:18', '2022-04-11 22:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_hashtag`
--

CREATE TABLE `tbl_hashtag` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hashTagName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_hashtag`
--

INSERT INTO `tbl_hashtag` (`id`, `hashTagName`, `created_at`, `updated_at`) VALUES
(1, 'magic', '2022-03-22 23:03:48', '2022-03-22 23:03:48'),
(2, 'blue', '2022-03-22 23:03:48', '2022-03-22 23:03:48'),
(3, 'pccards', '2022-03-22 23:03:48', '2022-03-22 23:03:48'),
(4, 'hockey', '2022-03-22 23:21:36', '2022-03-22 23:21:36'),
(5, 'soccer', '2022-03-22 23:24:23', '2022-03-22 23:24:23'),
(6, 'rare', '2022-04-12 18:32:24', '2022-04-12 18:32:24');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_hockeyCardType`
--

CREATE TABLE `tbl_hockeyCardType` (
  `id` int(11) NOT NULL,
  `cardType` varchar(150) NOT NULL,
  `cardTypeFr` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_hockeyCardType`
--

INSERT INTO `tbl_hockeyCardType` (`id`, `cardType`, `cardTypeFr`, `created_at`, `updated_at`) VALUES
(1, 'Clear cut', 'Clear cut', '2022-04-11 23:11:27', '2022-04-11 23:11:27'),
(2, 'Artifacts', 'Artifacts', '2022-04-11 23:11:46', '2022-04-11 23:11:46'),
(3, 'UD', 'UD', '2022-04-11 23:12:04', '2022-04-11 23:12:04'),
(4, 'UD canvas', 'UD canvas', '2022-04-11 23:14:33', '2022-04-11 23:14:33'),
(5, 'UD Game Jersey', 'UD Game Jersey', '2022-04-11 23:19:26', '2022-04-11 23:19:26'),
(6, 'UD Portrait', 'UD Portrait', '2022-04-11 23:19:40', '2022-04-11 23:19:40'),
(7, 'Chronology', 'Chronology', '2022-04-11 23:20:01', '2022-04-11 23:20:01'),
(8, 'Young Guns Clear Cut', 'Young Guns Clear Cut', '2022-04-11 23:20:16', '2022-04-11 23:20:16'),
(9, 'Young Guns UD Exclusives', 'Young Guns UD Exclusives', '2022-04-11 23:20:32', '2022-04-11 23:20:32'),
(10, 'Allure', 'Allure', '2022-04-11 23:23:55', '2022-04-11 23:23:55'),
(11, 'Black Diamond', 'Black Diamond', '2022-04-11 23:24:08', '2022-04-11 23:24:08'),
(12, 'Premier Rookie', 'Premier Rookie', '2022-04-11 23:24:24', '2022-04-11 23:24:24'),
(13, 'Premier Mega Patch', 'Premier Mega Patch', '2022-04-11 23:24:36', '2022-04-11 23:24:36'),
(14, 'Premier Gear', 'Premier Gear', '2022-04-11 23:24:49', '2022-04-11 23:24:49'),
(15, 'Premium Premier', 'Premium Premier', '2022-04-11 23:25:13', '2022-04-11 23:25:13'),
(16, 'Ice Premieres Rookie', 'Ice Premieres Rookie', '2022-04-11 23:25:33', '2022-04-11 23:25:33'),
(17, 'MVP', 'MVP', '2022-04-11 23:25:54', '2022-04-11 23:25:54'),
(18, 'Future Watch', 'Future Watch', '2022-04-11 23:26:08', '2022-04-11 23:26:08'),
(19, 'Autographed Future Watch', 'Autographed Future Watch', '2022-04-11 23:26:21', '2022-04-11 23:26:21'),
(20, 'Sign of the Times', 'Sign of the Times', '2022-04-11 23:26:36', '2022-04-11 23:26:36'),
(21, 'Limited Auto Materials', 'Limited Auto Materials', '2022-04-11 23:32:05', '2022-04-11 23:32:05'),
(22, 'The cup', 'The cup', '2022-04-11 23:32:18', '2022-04-11 23:32:18'),
(23, 'Synergy', 'Synergy', '2022-04-11 23:32:30', '2022-04-11 23:32:30'),
(24, 'UD Exclusives', 'UD Exclusives', '2022-04-11 23:34:03', '2022-04-11 23:34:03'),
(25, 'UD Clear Cut', 'UD Clear Cut', '2022-04-11 23:34:18', '2022-04-11 23:34:18'),
(26, 'UD Exclusives Clear Cut', 'UD Exclusives Clear Cut', '2022-04-11 23:36:29', '2022-04-11 23:36:29'),
(27, 'UD Portrait Rookies', 'UD Portrait Rookies', '2022-04-11 23:36:45', '2022-04-11 23:36:45'),
(28, 'Young Guns', 'Young Guns', '2022-04-11 23:37:08', '2022-04-11 23:37:08'),
(29, 'Young Guns Canvas', 'Young Guns Canvas', '2022-04-11 23:37:22', '2022-04-11 23:37:22'),
(30, 'Young Guns High Gloss', 'Young Guns High Gloss', '2022-04-11 23:37:36', '2022-04-11 23:37:36'),
(31, 'Trilogy', 'Trilogy', '2022-04-11 23:37:50', '2022-04-11 23:37:50'),
(32, 'Premier Attractions', 'Premier Attractions', '2022-04-11 23:38:06', '2022-04-11 23:38:06'),
(33, 'Premier Signature', 'Premier Signature', '2022-04-11 23:38:22', '2022-04-11 23:38:22'),
(34, 'Premier Rookie Patch', 'Premier Rookie Patch', '2022-04-11 23:38:38', '2022-04-11 23:38:38'),
(35, 'Premier Rookie Patch', 'Premier Rookie Patch', '2022-04-11 23:43:38', '2022-04-11 23:43:38'),
(36, 'Premier Rookie Auto Patch', 'Premier Rookie Auto Patch', '2022-04-11 23:43:50', '2022-04-11 23:43:50'),
(37, 'Premier Pursuing Greatness Signatures', 'Premier Pursuing Greatness Signatures', '2022-04-11 23:44:04', '2022-04-11 23:44:04'),
(38, 'Ultimate', 'Ultimate', '2022-04-11 23:44:16', '2022-04-11 23:44:16'),
(39, 'Sp Authentic', 'Sp Authentic', '2022-04-11 23:44:36', '2022-04-11 23:44:36'),
(40, 'Future Watch Auto Patch', 'Future Watch Auto Patch', '2022-04-11 23:45:54', '2022-04-11 23:45:54'),
(41, 'Spectrum Fx', 'Spectrum Fx', '2022-04-11 23:46:30', '2022-04-11 23:46:30'),
(42, 'Sign of the times Rookies', 'Sign of the times Rookies', '2022-04-11 23:46:46', '2022-04-11 23:46:46'),
(43, 'Authentic Profiles', 'Authentic Profiles', '2022-04-11 23:47:00', '2022-04-11 23:47:00'),
(44, 'Athentic Winners', 'Athentic Winners', '2022-04-11 23:47:34', '2022-04-11 23:47:34'),
(45, 'Sign of the times Draft', 'Sign of the times Draft', '2022-04-11 23:47:47', '2022-04-11 23:47:47'),
(46, 'MVP Rookie', 'MVP Rookie', '2022-04-11 23:48:00', '2022-04-11 23:48:00'),
(47, 'Triple Relics Trilogy', 'Triple Relics Trilogy', '2022-04-11 23:48:16', '2022-04-11 23:48:16'),
(48, 'Clear Cut Rookie', 'Clear Cut Rookie', '2022-04-11 23:48:31', '2022-04-11 23:48:31'),
(49, 'Embedded Endorsements', 'Embedded Endorsements', '2022-04-11 23:48:48', '2022-04-11 23:48:48'),
(50, 'High Gloss', 'High Gloss', '2022-04-11 23:49:05', '2022-04-11 23:49:05'),
(51, 'Day With The Cup', 'Day With The Cup', '2022-04-11 23:49:20', '2022-04-11 23:49:20'),
(52, 'Sp Essentials', 'Sp Essentials', '2022-04-11 23:49:39', '2022-04-11 23:49:39'),
(53, 'Dazzlers', 'Dazzlers', '2022-04-11 23:49:53', '2022-04-11 23:49:53'),
(54, 'Trilogy Rookie Premieres', 'Trilogy Rookie Premieres', '2022-04-11 23:50:09', '2022-04-11 23:50:09'),
(55, 'Signature pucks', 'Signature pucks', '2022-04-11 23:50:40', '2022-04-11 23:50:40'),
(56, 'Black Amber Rookie', 'Black Amber Rookie', '2022-04-11 23:50:53', '2022-04-11 23:50:53'),
(57, 'Black Diamond Clear Cut', 'Black Diamond Clear Cut', '2022-04-11 23:51:11', '2022-04-11 23:51:11'),
(58, 'Clear Cut Phenoms', 'Clear Cut Phenoms', '2022-04-11 23:51:27', '2022-04-11 23:51:27'),
(59, 'Ceremonial Puck Drop', 'Ceremonial Puck Drop', '2022-04-11 23:52:10', '2022-04-11 23:52:10'),
(60, 'Others', 'Others', '2022-04-11 23:52:29', '2022-04-11 23:52:29');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_hockeyTeam`
--

CREATE TABLE `tbl_hockeyTeam` (
  `id` int(11) NOT NULL,
  `nameTeam` varchar(150) NOT NULL,
  `nameTeamFr` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_hockeyTeam`
--

INSERT INTO `tbl_hockeyTeam` (`id`, `nameTeam`, `nameTeamFr`, `created_at`, `updated_at`) VALUES
(1, 'Avalanche ', 'Avalanche ', '2022-02-25 01:24:18', '2022-02-25 01:24:18'),
(2, 'Blackhawks', 'Blackhawks', '2022-02-25 01:24:37', '2022-02-25 01:24:37'),
(3, 'Blue Jackets', 'Blue Jackets', '2022-02-25 01:24:55', '2022-02-25 01:24:55'),
(4, 'Blues ', 'Blues ', '2022-02-25 01:25:11', '2022-02-25 01:25:11'),
(5, 'Bruins ', 'Bruins ', '2022-02-25 01:25:31', '2022-02-25 01:25:31'),
(6, 'Canadiens', 'Canadiens', '2022-02-25 01:25:44', '2022-02-25 01:25:44'),
(7, 'Canucks ', 'Canucks ', '2022-02-25 01:26:16', '2022-02-25 01:26:16'),
(8, 'Capitals', 'Capitals', '2022-02-25 01:26:29', '2022-02-25 01:26:29'),
(9, 'Coyotes ', 'Coyotes ', '2022-02-25 01:26:49', '2022-02-25 01:26:49'),
(10, 'Devils ', 'Devils ', '2022-02-25 01:27:10', '2022-02-25 01:27:10'),
(11, 'Ducks', 'Ducks', '2022-02-25 01:27:24', '2022-02-25 01:27:24'),
(12, 'Flames', 'Flames', '2022-02-25 01:27:59', '2022-02-25 01:27:59'),
(13, 'Flyers', 'Flyers', '2022-02-25 01:28:11', '2022-02-25 01:28:11'),
(14, 'Golden Knights ', 'Golden Knights ', '2022-02-25 01:28:23', '2022-02-25 01:28:23'),
(15, 'Hurricanes', 'Hurricanes', '2022-02-25 01:28:33', '2022-02-25 01:28:33'),
(16, 'Islanders ', 'Islanders ', '2022-02-25 01:28:44', '2022-02-25 01:28:44'),
(17, 'Jets', 'Jets', '2022-02-25 01:29:52', '2022-02-25 01:29:52'),
(18, 'Kings ', 'Kings ', '2022-02-25 01:30:08', '2022-02-25 01:30:08'),
(19, 'Lightning ', 'Lightning ', '2022-02-25 01:30:18', '2022-02-25 01:30:18'),
(20, 'Maple Leafs', 'Maple Leafs', '2022-02-25 01:30:31', '2022-02-25 01:30:31'),
(21, 'Oilers', 'Oilers', '2022-02-25 01:30:43', '2022-02-25 01:30:43'),
(22, 'Panthers', 'Panthers', '2022-02-25 01:30:56', '2022-02-25 01:30:56'),
(23, 'Penguins ', 'Penguins ', '2022-02-25 01:31:06', '2022-02-25 01:31:06'),
(24, 'Predators ', 'Predators ', '2022-02-25 01:31:16', '2022-02-25 01:31:16'),
(25, 'Rangers ', 'Rangers ', '2022-02-25 01:31:27', '2022-02-25 01:31:27'),
(26, 'Red Wings', 'Red Wings', '2022-02-25 01:31:47', '2022-02-25 01:31:47'),
(27, 'Sabres ', 'Sabres ', '2022-02-25 01:31:57', '2022-02-25 01:31:57'),
(28, 'Seattle', 'Seattle', '2022-02-25 01:32:12', '2022-02-25 01:32:12'),
(29, 'Sénateurs', 'Sénateurs', '2022-02-25 01:32:24', '2022-02-25 01:32:24'),
(30, 'Sharks ', 'Sharks ', '2022-02-25 01:32:34', '2022-02-25 01:32:34'),
(31, 'Stars ', 'Stars ', '2022-02-25 01:32:52', '2022-02-25 01:32:52'),
(32, 'Wild ', 'Wild ', '2022-02-25 01:33:02', '2022-02-25 01:33:02'),
(33, 'Seattle Kraken', 'Kraken de Seattle', '2022-04-06 22:37:11', '2022-04-06 22:37:11');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_liveRecords`
--

CREATE TABLE `tbl_liveRecords` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` int(11) NOT NULL,
  `chatGroupName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chatGroupId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `channelName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_liveRecords`
--

INSERT INTO `tbl_liveRecords` (`id`, `userId`, `chatGroupName`, `chatGroupId`, `token`, `channelName`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'lajkevin', 'lajkevin', '00630565fe82361456d85800fd8b9b492d2IAAtk0t/KeFryjk2GUSy3lNIFZ41gND/YSF2iFGutf3bhc7Im8oAAAAAIgBCK4oDa6U9YgQAAQD7YTxiAgD7YTxiAwD7YTxiBAD7YTxi', 'lajkevin', '0', '2022-03-24 22:50:14', '2022-03-24 22:50:16');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_magicCardType`
--

CREATE TABLE `tbl_magicCardType` (
  `id` int(11) NOT NULL,
  `cardType` varchar(150) NOT NULL,
  `cardTypeFr` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_magicCardType`
--

INSERT INTO `tbl_magicCardType` (`id`, `cardType`, `cardTypeFr`, `created_at`, `updated_at`) VALUES
(1, 'Black = Standard', 'Bleu = Non commune', '2022-02-25 02:58:02', '2022-02-25 02:58:02'),
(2, 'Blue = Not standard', 'Noir =Commune', '2022-02-25 02:58:16', '2022-02-25 02:58:16'),
(3, 'Gold = Rare', 'Or = Rare', '2022-02-25 02:58:30', '2022-02-25 02:58:30'),
(4, 'Orange = Mythic', 'Orange = Mythique ', '2022-02-25 02:58:45', '2022-02-25 02:58:45');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_magicTeam`
--

CREATE TABLE `tbl_magicTeam` (
  `id` int(11) NOT NULL,
  `nameTeam` varchar(150) NOT NULL,
  `nameTeamFr` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_magicTeam`
--

INSERT INTO `tbl_magicTeam` (`id`, `nameTeam`, `nameTeamFr`, `created_at`, `updated_at`) VALUES
(1, 'Artefacts', 'Artefacts', '2022-02-25 03:00:56', '2022-02-25 03:00:56'),
(2, 'Black', 'Blanc', '2022-02-25 03:01:15', '2022-02-25 03:01:15'),
(3, 'Blue ', 'Bleu', '2022-02-25 03:01:29', '2022-02-25 03:01:29'),
(4, 'Conspiracy ', 'Conspiracy ', '2022-02-25 03:01:47', '2022-02-25 03:01:47'),
(5, 'Creature ', 'Creature ', '2022-02-25 03:02:06', '2022-02-25 03:02:06'),
(6, 'Enchantment ', 'Enchantment ', '2022-02-25 03:02:22', '2022-02-25 03:02:22'),
(7, 'Green', 'Instant ', '2022-02-25 03:02:41', '2022-02-25 03:02:41'),
(8, 'Instant ', 'Land ', '2022-02-25 03:03:07', '2022-02-25 03:03:07'),
(9, 'Land ', 'Noir', '2022-02-25 03:03:21', '2022-02-25 03:03:21'),
(10, 'Phenomenon ', 'Phenomenon ', '2022-02-25 03:03:35', '2022-02-25 03:03:35'),
(11, 'Plains', 'Plaine', '2022-02-25 03:03:46', '2022-02-25 03:03:46'),
(12, 'Planewalker', 'Planewalker', '2022-02-25 03:03:56', '2022-02-25 03:03:56'),
(13, 'Red ', 'Rouge', '2022-02-25 03:04:07', '2022-02-25 03:04:07'),
(14, 'Scheme', 'Scheme', '2022-02-25 03:04:27', '2022-02-25 03:04:27'),
(15, 'Sorcery', 'Sorcery', '2022-02-25 03:04:44', '2022-02-25 03:04:44'),
(16, 'Tribal', 'Tribal', '2022-02-25 03:04:57', '2022-02-25 03:04:57'),
(17, 'Vanguard', 'Vanguard', '2022-02-25 03:05:16', '2022-02-25 03:05:16'),
(18, 'White ', 'Vert', '2022-02-25 03:05:32', '2022-02-25 03:05:32');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_people_to_post_extra`
--

CREATE TABLE `tbl_people_to_post_extra` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `peopleId` int(10) UNSIGNED NOT NULL,
  `postId` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_plan`
--

CREATE TABLE `tbl_plan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `planName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `planNameFr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `planPrice` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postLimit` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `planValidity` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_plan`
--

INSERT INTO `tbl_plan` (`id`, `planName`, `planNameFr`, `planPrice`, `postLimit`, `planValidity`, `created_at`, `updated_at`) VALUES
(1, 'Economy', 'Économie', '5.99', '5', '1 week', '2021-11-11 22:52:01', '2021-11-11 22:52:01'),
(2, 'Standard', 'Standard', '10.99', '10', '2 week', '2021-11-11 22:52:01', '2021-11-11 22:52:01'),
(3, 'Premium', 'Prime', '15.99', '20', '1 month', '2021-11-11 22:52:01', '2021-11-11 22:52:01');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_post_extra`
--

CREATE TABLE `tbl_post_extra` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `createdBy` int(10) UNSIGNED NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cardGame` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rarity` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `types` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainerType` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `energyType` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postTag` int(10) UNSIGNED NOT NULL,
  `postPrice` int(10) UNSIGNED NOT NULL,
  `address` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isLiked` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL,
  `isBookmarked` enum('0','1') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_promotion`
--

CREATE TABLE `tbl_promotion` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` int(11) NOT NULL,
  `collectionList` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `planId` int(11) NOT NULL,
  `transactionId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalPost` int(11) NOT NULL,
  `expiryDate` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_promotionCollection`
--

CREATE TABLE `tbl_promotionCollection` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `promotionId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `expiryDate` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_soccerCardType`
--

CREATE TABLE `tbl_soccerCardType` (
  `id` int(11) NOT NULL,
  `cardType` varchar(150) NOT NULL,
  `cardTypeFr` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_soccerCardType`
--

INSERT INTO `tbl_soccerCardType` (`id`, `cardType`, `cardTypeFr`, `created_at`, `updated_at`) VALUES
(1, 'Adrenalyn', 'Adrenalyn', '2022-02-25 03:06:14', '2022-02-25 03:06:14'),
(2, 'Attax Extra', 'Attax Extra', '2022-02-25 03:06:22', '2022-02-25 03:06:22'),
(3, 'Panini', 'Panini', '2022-02-25 03:06:34', '2022-02-25 03:06:34'),
(4, 'Panini Prizm', 'Panini Prizm', '2022-02-25 03:06:41', '2022-02-25 03:06:41'),
(5, 'Topps', 'Topps', '2022-02-25 03:06:54', '2022-02-25 03:06:54'),
(6, 'Other', 'Autre', '2022-02-25 03:07:17', '2022-02-25 03:07:17');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_soccerTeam`
--

CREATE TABLE `tbl_soccerTeam` (
  `id` int(11) NOT NULL,
  `nameTeam` varchar(150) NOT NULL,
  `nameTeamFr` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_soccerTeam`
--

INSERT INTO `tbl_soccerTeam` (`id`, `nameTeam`, `nameTeamFr`, `created_at`, `updated_at`) VALUES
(1, 'Thunder Bay Chill', 'Chill de Thunder Bay', '2022-02-25 03:08:27', '2022-02-25 03:08:27'),
(2, 'Manitoba FC ', 'FC Manitoba', '2022-02-25 03:09:06', '2022-02-25 03:09:06'),
(3, 'Calgary Foothills ', 'Foothills de Calgary', '2022-02-25 03:09:28', '2022-02-25 03:09:28'),
(4, 'Montreal Impact ', 'Impact de Montréal', '2022-02-25 03:10:28', '2022-02-25 03:10:28'),
(5, 'United Queen City ', 'Queen City United', '2022-02-25 03:10:40', '2022-02-25 03:10:40'),
(6, 'Toronto FC', 'Toronto FC', '2022-02-25 03:10:52', '2022-02-25 03:10:52'),
(7, 'Toronto FC II', 'Toronto FC II', '2022-02-25 03:11:05', '2022-02-25 03:11:05'),
(8, 'Vancouver Tss Rovers ', 'Tss Rovers de Vancouver ', '2022-02-25 03:11:19', '2022-02-25 03:11:19'),
(9, 'Vancouver Island FC', 'Vancouver Island FC', '2022-02-25 03:11:35', '2022-02-25 03:11:35'),
(10, 'Vancouver Whitecaps  ', 'Whitecaps de Vancouver', '2022-02-25 03:11:49', '2022-02-25 03:11:49'),
(11, 'Other', 'Autre', '2022-02-25 03:12:14', '2022-02-25 03:12:14');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_viewCount`
--

CREATE TABLE `tbl_viewCount` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `viewerId` int(11) NOT NULL,
  `liveSessionId` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `trainers`
--

CREATE TABLE `trainers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trainerName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `trainerNameFr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `trainers`
--

INSERT INTO `trainers` (`id`, `trainerName`, `trainerNameFr`, `created_at`, `updated_at`) VALUES
(1, 'Item', 'Objet', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(2, 'Tool', 'Outil', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(3, 'Stadium', 'Stade', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(4, 'Supporter', 'Supportrice', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(5, 'Ultra Prism', 'Ultra prisme', '2021-11-03 21:28:52', '2021-11-03 21:28:52');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `typeName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `typeNameFr` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `typeName`, `typeNameFr`, `created_at`, `updated_at`) VALUES
(1, 'Basic', 'De base', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(2, 'Stage 1', 'Étape 1', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(3, 'Stage 2', 'Étape 2', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(4, 'GX', 'GX', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(5, 'EX', 'EX', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(6, 'Turbo', 'Turbo', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(7, 'Mega', 'Méga', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(8, 'V', 'V', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(9, 'VMAX', 'VMAX', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(10, 'Ultra Beast', 'Ultra-Chimère', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(11, 'Tag Team', 'Escouade', '2021-11-03 21:28:52', '2021-11-03 21:28:52'),
(12, 'Ultra Prism', 'Ultra prisme', '2021-11-03 21:28:52', '2021-11-03 21:28:52');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin Admin', 'admin@material.com', '2021-11-03 21:28:52', '$2y$10$wGX/dd/LrJxfl0e2TQGTsO5IhOgUMGFwlXTHJ/ZLQlb17mkmFTnce', NULL, '2021-11-03 21:28:52', '2021-11-03 21:28:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `collections_pcuserid_foreign` (`pcuserid`);

--
-- Indexes for table `create_posts`
--
ALTER TABLE `create_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `create_posts_createdby_foreign` (`createdBy`);

--
-- Indexes for table `energy_types`
--
ALTER TABLE `energy_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `follow_pccard_users`
--
ALTER TABLE `follow_pccard_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `like_posts`
--
ALTER TABLE `like_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `like_posts_pcuserid_foreign` (`pcuserid`),
  ADD KEY `like_posts_postid_foreign` (`postid`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `media_postid_foreign` (`postid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_fromid_foreign` (`fromid`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `pccard_users`
--
ALTER TABLE `pccard_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pccard_users_username_unique` (`username`),
  ADD UNIQUE KEY `pccard_users_email_unique` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `posts_bookmarks`
--
ALTER TABLE `posts_bookmarks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_bookmarks_pcuserid_foreign` (`pcuserid`),
  ADD KEY `posts_bookmarks_postid_foreign` (`postid`);

--
-- Indexes for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_comments_pcuserid_foreign` (`pcuserid`),
  ADD KEY `post_comments_postid_foreign` (`postid`);

--
-- Indexes for table `raretes`
--
ALTER TABLE `raretes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `report_posts`
--
ALTER TABLE `report_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_posts_pcuserid_foreign` (`pcuserid`),
  ADD KEY `report_posts_postid_foreign` (`postid`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stories_pcuserid_foreign` (`pcuserid`);

--
-- Indexes for table `tbl_baseballCardType`
--
ALTER TABLE `tbl_baseballCardType`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_baseballTeam`
--
ALTER TABLE `tbl_baseballTeam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_basketballCardType`
--
ALTER TABLE `tbl_basketballCardType`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_basketballTeam`
--
ALTER TABLE `tbl_basketballTeam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_cardGame`
--
ALTER TABLE `tbl_cardGame`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_CollectionMedias`
--
ALTER TABLE `tbl_CollectionMedias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_Condition`
--
ALTER TABLE `tbl_Condition`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_hashtag`
--
ALTER TABLE `tbl_hashtag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_hockeyCardType`
--
ALTER TABLE `tbl_hockeyCardType`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_hockeyTeam`
--
ALTER TABLE `tbl_hockeyTeam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_liveRecords`
--
ALTER TABLE `tbl_liveRecords`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_magicCardType`
--
ALTER TABLE `tbl_magicCardType`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_magicTeam`
--
ALTER TABLE `tbl_magicTeam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_people_to_post_extra`
--
ALTER TABLE `tbl_people_to_post_extra`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_plan`
--
ALTER TABLE `tbl_plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_post_extra`
--
ALTER TABLE `tbl_post_extra`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_promotion`
--
ALTER TABLE `tbl_promotion`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_promotionCollection`
--
ALTER TABLE `tbl_promotionCollection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_soccerCardType`
--
ALTER TABLE `tbl_soccerCardType`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_soccerTeam`
--
ALTER TABLE `tbl_soccerTeam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_viewCount`
--
ALTER TABLE `tbl_viewCount`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trainers`
--
ALTER TABLE `trainers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `collections`
--
ALTER TABLE `collections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `create_posts`
--
ALTER TABLE `create_posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `energy_types`
--
ALTER TABLE `energy_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `follow_pccard_users`
--
ALTER TABLE `follow_pccard_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `like_posts`
--
ALTER TABLE `like_posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `pccard_users`
--
ALTER TABLE `pccard_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts_bookmarks`
--
ALTER TABLE `posts_bookmarks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `raretes`
--
ALTER TABLE `raretes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `report_posts`
--
ALTER TABLE `report_posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_baseballCardType`
--
ALTER TABLE `tbl_baseballCardType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbl_baseballTeam`
--
ALTER TABLE `tbl_baseballTeam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tbl_basketballCardType`
--
ALTER TABLE `tbl_basketballCardType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tbl_basketballTeam`
--
ALTER TABLE `tbl_basketballTeam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tbl_cardGame`
--
ALTER TABLE `tbl_cardGame`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_CollectionMedias`
--
ALTER TABLE `tbl_CollectionMedias`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_Condition`
--
ALTER TABLE `tbl_Condition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_hashtag`
--
ALTER TABLE `tbl_hashtag`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_hockeyCardType`
--
ALTER TABLE `tbl_hockeyCardType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `tbl_hockeyTeam`
--
ALTER TABLE `tbl_hockeyTeam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `tbl_liveRecords`
--
ALTER TABLE `tbl_liveRecords`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_magicCardType`
--
ALTER TABLE `tbl_magicCardType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_magicTeam`
--
ALTER TABLE `tbl_magicTeam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_people_to_post_extra`
--
ALTER TABLE `tbl_people_to_post_extra`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_plan`
--
ALTER TABLE `tbl_plan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_post_extra`
--
ALTER TABLE `tbl_post_extra`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_promotion`
--
ALTER TABLE `tbl_promotion`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_promotionCollection`
--
ALTER TABLE `tbl_promotionCollection`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_soccerCardType`
--
ALTER TABLE `tbl_soccerCardType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_soccerTeam`
--
ALTER TABLE `tbl_soccerTeam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_viewCount`
--
ALTER TABLE `tbl_viewCount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trainers`
--
ALTER TABLE `trainers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
