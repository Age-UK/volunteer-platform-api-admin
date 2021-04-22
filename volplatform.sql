*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table division
# ------------------------------------------------------------

DROP TABLE IF EXISTS `division`;

CREATE TABLE `division` (
  `id` char(36) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `isInactive` tinyint(1) NOT NULL DEFAULT '0',
  `url` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `division` WRITE;
/*!40000 ALTER TABLE `division` DISABLE KEYS */;

INSERT INTO `division` (`id`, `createdAt`, `updatedAt`, `name`, `description`, `isInactive`, `url`)
VALUES
	('1074beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','Engagement Consultative Network','This is the description for Engagement Panel',0,'https://www.ageuk.org.uk/services/information-advice/'),
	('1174beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','Engagement Your Voice Panel','This is the description for Engagement Your Voice',0,'https://www.ageuk.org.uk/services/information-advice/'),
	('1274beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','Events','This is the description for Events',0,'https://www.ageuk.org.uk/services/information-advice/'),
	('1474beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','Administration','This is the description for Admin',0,'https://www.ageuk.org.uk/services/information-advice/'),
	('1574beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','Story Tellers','This is the description for Story Tellers',0,'https://www.ageuk.org.uk/services/information-advice/'),
	('2574beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','Charity Shops','This is the description for Retail',0,'https://www.ageuk.org.uk/services/information-advice/'),
	('3574beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','Local Age UKs','This is the description for Local Age UK',0,'https://www.ageuk.org.uk/services/information-advice/'),
	('4574beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','Friendship Services','This is the description for Friendship Services',0,'https://www.ageuk.org.uk/services/befriending-services/'),
	('5574beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','The Silver Line Connects','This is the description for The Silverline Connects',0,'https://www.ageuk.org.uk/services/information-advice/'),
	('6574beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','The  Silver Line Outreach','This is the description for The Silverline Outreach',0,'https://www.ageuk.org.uk/services/information-advice/'),
	('7574beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','The Silver Line Helpline','This is the description for The Silverline Helpline',0,'https://www.ageuk.org.uk/services/information-advice/'),
	('8574beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','Campaigns','This is the description for Campaigns',0,'https://www.ageuk.org.uk/services/information-advice/'),
	('9574beb8-e674-41fb-a249-8cd0bd6eb342','2021-01-27 16:07:54','2021-01-27 16:07:54','General Outreach','This is the description for General Outreach',0,'https://www.ageuk.org.uk/services/information-advice/');

/*!40000 ALTER TABLE `division` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table resetPasswordRequest
# ------------------------------------------------------------

DROP TABLE IF EXISTS `resetPasswordRequest`;

CREATE TABLE `resetPasswordRequest` (
  `id` char(36) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `expiresAt` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `userId` char(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `resetPasswordRequest` WRITE;
/*!40000 ALTER TABLE `resetPasswordRequest` DISABLE KEYS */;

INSERT INTO `resetPasswordRequest` (`id`, `createdAt`, `updatedAt`, `expiresAt`, `email`, `userId`)
VALUES
	('f0944e18-0213-4768-abf6-d37f47dfaaf6','2021-04-06 09:18:01','2021-04-06 09:18:01','2021-04-06 10:18:00','','d356b1b3-047e-40f7-b43b-ca9c16debde2');

/*!40000 ALTER TABLE `resetPasswordRequest` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table service
# ------------------------------------------------------------

DROP TABLE IF EXISTS `service`;

CREATE TABLE `service` (
  `id` char(36) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `serviceProviderId` char(36) DEFAULT NULL,
  `ageUkDirectoryId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `service_serviceProvider_fk_1` (`serviceProviderId`),
  CONSTRAINT `service_serviceProvider_fk_1` FOREIGN KEY (`serviceProviderId`) REFERENCES `serviceProvider` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table serviceApplication
# ------------------------------------------------------------

DROP TABLE IF EXISTS `serviceApplication`;

CREATE TABLE `serviceApplication` (
  `id` char(36) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '',
  `volunteerId` char(36) DEFAULT NULL,
  `serviceId` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `serviceApplication_volunteer_fk_1` (`volunteerId`),
  KEY `serviceApplication_service_fk_1` (`serviceId`),
  CONSTRAINT `serviceApplication_service_fk_1` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `serviceApplication_volunteer_fk_1` FOREIGN KEY (`volunteerId`) REFERENCES `volunteer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table serviceProvider
# ------------------------------------------------------------

DROP TABLE IF EXISTS `serviceProvider`;

CREATE TABLE `serviceProvider` (
  `id` char(36) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `divisionId` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `serviceProvider_division_fk_1` (`divisionId`),
  CONSTRAINT `serviceProvider_division_fk_1` FOREIGN KEY (`divisionId`) REFERENCES `division` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table staff
# ------------------------------------------------------------

DROP TABLE IF EXISTS `staff`;

CREATE TABLE `staff` (
  `id` char(36) NOT NULL,
  `forenames` varchar(100) NOT NULL DEFAULT '',
  `surname` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role` enum('Master Admin','DivisionManager','ServiceProviderManager','ServiceManager') NOT NULL,
  `userId` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `staff_user_fk_1` (`userId`),
  CONSTRAINT `staff_user_fk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;

INSERT INTO `staff` (`id`, `forenames`, `surname`, `email`, `createdAt`, `updatedAt`, `role`, `userId`)
VALUES
	('110c1e98-45da-45c8-b5b4-168cca548e42','Div','Manager1','engpanel@ageuk.com','2021-04-06 12:20:34','2021-04-06 12:20:34','DivisionManager','643639fd-9527-425a-be6a-f84820255069'),
	('70030a94-cee4-48bb-96de-22193ad434fd','System','User','master@volunteer.com','2021-04-21 09:44:56','2021-04-21 09:44:56','Master Admin','60f3d545-e189-495e-b3ff-ae55f9a8c3e1'),
	('913e9e17-624e-48b2-af94-95866dee5330','Div','Manager2','generaloutreach@ageuk.com','2021-04-06 12:19:04','2021-04-06 12:19:04','DivisionManager','3e242fc2-a038-4c65-8bf9-da2a624b1d6c'),
	('96d30867-83f8-4107-8fe6-3677bc0b671b','System','User','abcdef+volplat@gmail.com','2021-03-29 18:36:10','2021-03-29 18:36:10','Master Admin','d356b1b3-047e-40f7-b43b-ca9c16debde2'),
	('a8abd0c1-f26b-4137-81d6-65586cad6a74','System','User','tom@stuff.com','2021-04-08 17:08:37','2021-04-08 17:08:37','Master Admin','13ecf21a-3205-4cbb-961c-fce2e4fea5c7');

/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table staffDivision
# ------------------------------------------------------------

DROP TABLE IF EXISTS `staffDivision`;

CREATE TABLE `staffDivision` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `staffId` char(36) NOT NULL,
  `divisionId` char(36) NOT NULL,
  PRIMARY KEY (`staffId`,`divisionId`),
  KEY `staffId` (`staffId`),
  KEY `divisionId` (`divisionId`),
  CONSTRAINT `staffDivision_fk1` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `staffDivision_fk2` FOREIGN KEY (`divisionId`) REFERENCES `division` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `staffDivision` WRITE;
/*!40000 ALTER TABLE `staffDivision` DISABLE KEYS */;

INSERT INTO `staffDivision` (`createdAt`, `updatedAt`, `staffId`, `divisionId`)
VALUES
	('2021-04-06 12:20:34','2021-04-06 12:20:34','110c1e98-45da-45c8-b5b4-168cca548e42','1074beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-06 12:20:34','2021-04-06 12:20:34','913e9e17-624e-48b2-af94-95866dee5330','9574beb8-e674-41fb-a249-8cd0bd6eb342');

/*!40000 ALTER TABLE `staffDivision` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table staffService
# ------------------------------------------------------------

DROP TABLE IF EXISTS `staffService`;

CREATE TABLE `staffService` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `staffId` char(36) NOT NULL,
  `serviceId` char(36) NOT NULL,
  PRIMARY KEY (`staffId`,`serviceId`),
  KEY `staffId` (`staffId`),
  KEY `serviceProviderId` (`serviceId`),
  CONSTRAINT `staff_Service_fk1` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `staff_Service_fk2` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table staffServiceProvider
# ------------------------------------------------------------

DROP TABLE IF EXISTS `staffServiceProvider`;

CREATE TABLE `staffServiceProvider` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `staffId` char(36) NOT NULL,
  `serviceProviderId` char(36) NOT NULL,
  PRIMARY KEY (`staffId`,`serviceProviderId`),
  KEY `staffId` (`staffId`),
  KEY `serviceProviderId` (`serviceProviderId`),
  CONSTRAINT `staff_ServiceProvider_fk1` FOREIGN KEY (`staffId`) REFERENCES `staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `staff_ServiceProvider_fk2` FOREIGN KEY (`serviceProviderId`) REFERENCES `serviceProvider` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` char(36) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `salt` varchar(500) NOT NULL,
  `hash` varchar(2500) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `createdAt`, `updatedAt`, `email`, `salt`, `hash`, `isActive`)
VALUES
	('13ecf21a-3205-4cbb-961c-fce2e4fea5c7','2021-04-08 17:08:37','2021-04-08 17:08:37','tom@stuff.com','804c3e3b4ffecd7f192d9d8933224ac2','093cc682ebb249cc02dedad4a6eb69aec682c111b2b4c7f8ad512157bb9e880fb2dc0e6a5ebc47e085a81be3283fe86c0da65e1fbceaa9d11cc26fce7fce56f3b4920fc0a3f98dcef5e1c62c7ec971e3594db5369efde46fd13a858c7a3b9f04b1c2f66012b7baa597abf96ce7987eb7c328995bf4a2b268d4b136ae74c23117dfbabef39a8b792309f2d2cbfcd3861b7b22bbda000e29ad977e3dbc646a6002e50d2eb78cb162ff45a9b7ed380d22e89dae5f431bdc03fb5ba0a037f0b815c4758b324908328d8cd77b12c8a6f941939771a3a6f5cc2fd8bd458148ebf4517f19083b34afc52dade03754eb7d04df9a26af4f784884cf1c431e0007eb7cb00e5eb5c5cec460b1f80897f4c3c3747381fb929f748c6bf441152f1bef596cb5643b5e8d151bba073f96a5df698f2deae6fbb8fd7604ffd9d0f0743f6ac5bd21045fafcd8f875e28821b36096b05ac52ca161311ffa88469fc43295be662d280b78ff52618ed751a271f86cee6c448fe5e6c338b98a340f128ab1c30aa95118e4cf9304bcfe8933092f745874879f51978234d8bfcc9a167ae8083296a7b54d17856b544533b0eb6c2be490f08b4fa4cff3e4660eb7c376f028734270c3eeeeadc8fd794ce89a48072e0b8de032f68c4df72a4f19f72d29446b1ddd863f8e930f0ca44ecc895c28801c21fec5647bc9c91b0e0b470778a7131a766459f8155a4a3',1),
	('3e242fc2-a038-4c65-8bf9-da2a624b1d6c','2021-04-06 12:19:04','2021-04-06 12:19:04','generaloutreach@ageuk.com','795a8436b9860a7c8f0a43e9ddf10278','21cdfc8791447b044b534e818939ca75c990e3455ba3841a048316ab35c740ba60e4b504d389042ed8897527be3d4c29efd09f97786c64f78b7b4d4b32592b4c5d77e7b097e18ee9ea3eb4021174d7c555761c59dda13d0e471a4346cdade829abace8b165185fdb6abe097acb93b472313039c60014f4105531918e94f21eafec1d479be41069738ab014d368b5774329165f9aab4a732b2d1d999ab205b96a8a78a5454cdc1e42fefc6702bb251fbb20579287475af830fda470138e04a654d9025bbf993642ae9f819c668e9b2cba60452f9e85728be2936264b1b2fb6b922101d11adffecd85df476cac2fbcedbfc0d3c4a8c43479c3ad7bce334a30de7b9d5b6bbb04455cd25707260504f22a9fe58ced2d2dd01766f5ab46faa528abe49b2be1df861821a6f86344e1f3e3307d02e887fe628e2760a3e7b382f2eaaea50faa553d4e953f6f42a817507806531dc9abe2896466010543a6eee5d8e32d3841b9cfe31033018b0fc73f63140a25846cf93d0f1ea46f3db270cd27240e794278b0d5b862dbe7414232e84cada492fa664c5f672f4e6622b7383c6b6f244d472dcf8c061efc7a9c8d0c2800f3fa37db5db996d0e755006387a51623dbfb458ba407191fd41c2576ea9e499d1fc3fd892283c341b095c964528975c5cec664acd592039c612c7afa1be8793967c88a90d0dc7bd197c60812c385469853f3165c',1),
	('591971f1-eba3-487c-b7da-e095198fc84f','2021-04-08 17:08:21','2021-04-08 17:08:21','volsandra@volunteering.com','f2991197dc114510c45711336a340510','ebaaf81acfbf05cdf69ce92fcc36bfddd344ec70a7ae8a6a996035d186a10c89bd8980c1e93bd4d260cabf9dcffc526c432719b9ed00f21a7f6fde37fa7664542fc686ec2cad112c4fb8f31a9d869963a6dffa3d64a03bf76afa16310d9a9e65b30e2f928395c51bf24b394f897867d522f9f0956a5632c8bde056df74c628179fc38685252aa33ffebaa77e68210ddc5a5737897cf4794708bb9d7ace2caef8a7a99aa93fd31a3964200f6658f5b9fadb8776d1afbe7b249382ac463e120f33c9eb3bf26b09e6d36447b1dc5ff849463ad67ad1d25f9df63f46516a6138c1f77bc9de37b2adef9a89fccfbb4af1bb805349a685b8126814d9cf563284b92c836a0ca726fed55aaef28b115641af778dd7cabf9d27f1181769f0f480e8b084b7851e5ec6c31dd6c905792b299dcaebba7870307c48efd8cb31b33a4c46b25457da09c12af5dea8891e385ebcf0dac7fe6d2ec5ca4a2421ba481ef36217048c02698b86817d731d55f9d4ca377b19969d873631bcfcaf4f63ad2c90b8a1f58d96b21016895a2c6beb10fc01f3252300ae0f7345e8bae099f144dc933e13c173b7fc1696512fc25aa9c111f16a56393488792a60274fc2dde1d548ff76c2aa3734846fa13162353657055e69fc60b86fbee995a121fe8c2ffc86d4da558e58c92fc93c1e5664d795baa56aa8905f46fd8d465ea5f403af9a3018fc82e28d78c2b9',1),
	('60f3d545-e189-495e-b3ff-ae55f9a8c3e1','2021-04-21 09:44:56','2021-04-21 09:44:56','master@volunteer.com','e682b6e8fa50f142818757eb4700d505','32038c78e2445a4e6feb0db985eafe37e4bbe440ab5297e6eed7b1edba0fe9a9007dcb758f66c38d4f6fdf53805786cccde2b82b0378ddb17e4c5f606048e7eb409744323082eae99c4d105c83de658cd94cb9a110b18bec0eaebdb13081b37f66fcda15826e85cee92ace7e15ed333914d98ba6cdadafef9a5565a0e862adf3078424c11cdfbb38e626513ce7689b62d078303d1ed59d5e81cf7395ca227e3c7fdb5d69941102088d944190fe3e25ef15db1dae8b13b5b196f438980d85e7d0cfcf84ac8e03c2084ca34fcdd5d85a6ef5b5b648dfc34e6c5f7d0e2a6749eff78d09f1402823f92a65d3bb8ffcd257bd5808b2c3a0056bc4342938583639ebf4eadac530cbfbb99c946271b51338c2ef5ac2cafef5de2229733e3b13b58a65099b0842187adcc2f9bc484b01349f9e4307620f0b7201d0598d44601d6eda27f4680cdac5516e777897e4d6b233606b15676d4d927b779e71bbc1eb48501a59d20c9390a67e21902acff938d5d84670ca5146cd53ea5de9ce29ee8164e31d3b7ff3af67252d90a6165c61570fa6408356648e4e5e3366faff827a7249b81f07fbb64386db37dc7fd4ec16a4426a18b0823af1071864b9044e0cd135e9002642529725a44102177d695c535b2fbe85c33b0c3250ec23275420d0023c93e82aa0c31820aa07840defc2568bc92b8ab9775a63c919b4ab683e0cb5d956527f498595',1),
	('643639fd-9527-425a-be6a-f84820255069','2021-04-06 12:20:34','2021-04-06 12:20:34','engpanel@ageuk.com','21ff9bdfd4d12622b7f9e7ddd65689d7','bd0418bafc5ca19f9fafac8c3b8d0ad2102125e8056aa0c35e0e3e4e52489672435f275b9d75361a56f29498b10ecfe5bb695aa3d24ed5cec4ed8c11f4ffdf3c72102d08c1c1bb4f315610e24094a144914471682b1ed33a395f431f82777124a895d5c30aba9d17b7b1d7d63aabb7dcd4adfcbce73a39f55e3963e32b60d188db1e911433f64ad6d4d9a43fe0882ada00613e0fa50c25daf7e3ecd879c6d764f97a41173a10bbe4398490570f64a2666bf564bd7575e218a9c7d461ce8508e5e8f3445e7388927393536ffbbd2579466fe8d353b6187efdd928a731882e27139f7b1eea80565eeace5d7705bcf07f71e117e76bcd6209362a1e560100ed74e9b2f104d39332c1e58d79caf9f5063827a107e707af88843d76b09b7a6669190fd147b54099c9d5097160e88e935db322dbadcfc9e64f43aa0b5003eb308ef5335e3323b4d9985745fd17ee439dbfecd845b03640ac8a0a7fddfcd66d54f82d23f4645897b4cd066f1a2f4fb75824441f69e6517a3feb9d7d94023ca67602d19e06e7467881bd111d1862a81137c0d1f8ecf00add67700a02e360bfa40efa2086f0173a5c67cc2025cf3e835281e25f72333cb7b588fe65121c328a48b93a938733112ab9db3e1814565c4b33e57263b3f1a263185be6e2028f63c769b7b00fbf97d97d36cd024663f3f054daf9ee2f6450c93b618ef8f5786f82e6a415310b61',1),
	('939e5421-1f2b-4425-a383-b0cfdf4b8724','2021-04-08 17:08:02','2021-04-08 17:08:02','volsamsmith@volunteering.com','e3a5d7120a08790887457829369d007b','c470a0f02f4c083845c280178aaeeb884bfc1ce3b99e6fcd2eccd138a67e60d27de0981e346b111c2516fbf513d91f42fa377f4178ea3bc67bbab1325b6ae51375986f50ca21c2f6b84c8034f7c2af4b569cc2baf4a5b2defa78fbd392c0e71291b1db7f836c0891632bf51d82a0edcdf317e60a6afbf7b6c2043cf03fd02bfbb95dfaeae3e4ac7f6e14f998dafc83d04b09a051f5155ffdbee407797559fe6aca4d5fce153cd4d3f1a5b7b115b8cae8d18ddae383188cb8a69c6554386800552771d0b2346a741d5fd0843d7a94e94efe0f63c21725f46df73ebae1a3256d7da3e85f99ecb25cfef0a6156c57606b6150bd87080e070bccb398e0a5c64800d73d758607d98d2bb380ef2d253af5a35d6169f842d7e63a345665b2c4d9128c91af1146215c312f661fe4fb2dc0c338b9386f6670ee7fb4795f384c888bfbc9a2029c71d6a7b6d33b03663403ba015dc45be96f14112dd9ef48d4ab8ef16c2d7bcac84a2b2ff340731314eb1b023b57634fe705cf8e3d170fd6822f00c6cf230809b8f4b1493d7100bc1b399e6cf97299823ed063592d7a2e549cd430aa2cb798394a0ee5ec95b4e51097134d93dcc5a7ecf35ff54ec587700d51b270bb5486d390ffd67595b350e2b463f9bf6a1ae9cb3ca0465462a2922de297e8ed0d2bdfeab7fa6a61df3f5c06ec2d2a7af9565cc8fcd558fd6aa4efade3963fa73491360a',1),
	('d356b1b3-047e-40f7-b43b-ca9c16debde2','2021-03-29 18:36:10','2021-03-30 15:50:10','abcdef+volplat@gmail.com','9e8113ef1c3357d99f7eabfe87c0b861','65cfc3ece5a3d3bdc054fb54ea056b1ffe9d45029737674304b25a511c910b6005927c5292dd70d7d8db71047ae45e5fe0ba9d80586dbac724cf13eafb755ac8584164c1f2bdadd31c2ace862adbdff99b51a1b575844ebf82cc854fd0c9455c87b9d487e3bb2532e901ceac568b2d32d63efe7325896e73312c67786123abef655b1bb80030a2792e16168cd018eaf0e03e610af3943d85b3dda645d6e5fea57450dbb53ca289f3c1fb1b046302c96258f5c546c4801eb83b4e78c108f2725739731de139105ccaef5986e25baca9b55d64a644390256f657e5e1a056998962b405a559e2e62d4d001f4cb4f211601228cd7f17b37e35b859afbf4f574ec210d9ac7f405d66d373a81a599eeea73af0a9be5d0353b70cffca881b96fadfc158a9ff2f4bbf894ff9cde7676051aa973ff2e6f85fbf1d987a63cf16f66af6e017194c1a63dcd3a51df3af6ee34d3ad40d1f99a07a81c5d230554e65227f8d4ef123a3a9ed7693190100c1262a5f48a0d29ea34eff6bae3aac2a8dc47ec17a2a6276821a26128e34c9b68c4211e706e50533eab0dd8c569ea06751b6b1525e6fc6c3f9aacd40a9198d6a5d68d8abc2873e52508410cb05e1ee6a82d1b6575976a5a2db7232af0fe55b04cf2665742dff88a64bff81fafa311113e9d6089db092e162167cf3b8dd42d49a77dd63a8454a5500859f1ea72e7ddef8ead49b6994452e',1);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table volunteer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `volunteer`;

CREATE TABLE `volunteer` (
  `id` char(36) NOT NULL,
  `status` varchar(255) NOT NULL,
  `statusChangedAt` datetime NOT NULL,
  `title` enum('Mrs','Mr','Miss','Ms','Dr','Rev','Unknown') NOT NULL,
  `forenames` varchar(100) NOT NULL DEFAULT '',
  `surname` varchar(100) NOT NULL DEFAULT '',
  `telephone` varchar(16) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `lastChangeByUser` varchar(500) DEFAULT NULL,
  `addressLine1` varchar(500) NOT NULL DEFAULT '',
  `addressLine2` varchar(500) DEFAULT NULL,
  `addressLine3` varchar(500) DEFAULT NULL,
  `town` varchar(500) DEFAULT NULL,
  `county` varchar(500) DEFAULT NULL,
  `postcode` varchar(100) NOT NULL DEFAULT '',
  `country` varchar(500) DEFAULT NULL,
  `userId` char(36) DEFAULT NULL,
  `stayingInTouch` varchar(500) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `CommsEmailEnabled` tinyint(1) NOT NULL DEFAULT '1',
  `CommsPostEnabled` tinyint(1) NOT NULL DEFAULT '1',
  `CommsSMSEnabled` tinyint(1) NOT NULL DEFAULT '1',
  `CommsPhoneEnabled` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `volunteer_user_fk_1` (`userId`),
  CONSTRAINT `volunteer_user_fk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `volunteer` WRITE;
/*!40000 ALTER TABLE `volunteer` DISABLE KEYS */;

INSERT INTO `volunteer` (`id`, `status`, `statusChangedAt`, `title`, `forenames`, `surname`, `telephone`, `email`, `createdAt`, `updatedAt`, `lastChangeByUser`, `addressLine1`, `addressLine2`, `addressLine3`, `town`, `county`, `postcode`, `country`, `userId`, `stayingInTouch`, `dateOfBirth`, `CommsEmailEnabled`, `CommsPostEnabled`, `CommsSMSEnabled`, `CommsPhoneEnabled`)
VALUES
	('0331ca00-400b-4631-b045-44c458bccd7e','Pending','2021-04-22 12:03:47','Mr','Jack','Doopy','+447888666765','jact@test.com','2021-04-22 12:03:47','2021-04-22 12:03:47',NULL,'10 Eastbourne Road',NULL,NULL,'London','London','E15 3LJ','United Kingdom',NULL,'','1990-12-12',0,0,0,0),
	('16410b82-9e00-427d-abbd-dc5d385b5c5e','Pending','2021-04-22 11:13:57','Mr','Tough','Nugget','+447666555432','toough@test.com','2021-04-22 11:13:57','2021-04-22 11:13:57',NULL,'2 Eastbourne Road',NULL,NULL,'Stratford','London','E15 3LJ','United Kingdom',NULL,'','1987-12-11',0,0,0,1),
	('39be0356-0e72-429a-a908-5a545bad920c','Pending','2021-04-22 11:44:20','Miss','Dora','Dexplorer','+447888777656','dore@tetst.com','2021-04-22 11:44:20','2021-04-22 11:44:20',NULL,'56 Eastbourne Road',NULL,NULL,'London','England','E15 3LJ','United Kingdom',NULL,'','1966-03-16',1,0,1,1),
	('476e39ad-8113-418c-a846-ac2ceac2a650','Pending','2021-04-21 14:27:50','Mrs','Emma','Love','+447999999999','222@gmail.com','2021-04-21 14:27:50','2021-04-21 14:27:50',NULL,'2','Beedell Avenue',NULL,'Essex','Essex','SS11 8RP','United Kingdom',NULL,'Email','1980-03-12',1,1,1,1),
	('807dffe3-9c3f-4b0d-9fce-f14f310ef331','Pending','2021-04-22 11:19:14','Miss','Missy','Lips','+447099999987','lip@test.com','2021-04-22 11:19:14','2021-04-22 11:19:14',NULL,'6 Tavis',NULL,NULL,'London','London','WC1H 9NA','United Kingdom',NULL,'','1978-11-05',1,1,1,0),
	('815daeeb-da45-4b5a-a682-581d19e7e485','Pending','2021-04-19 13:05:37','Mr','Barry','Sheen','+447774444444','barry@hhen.com','2021-04-19 13:05:37','2021-04-19 13:05:37',NULL,'1 Long Street','Somewhere',NULL,'Somewhere','Somewhere','M1 1FZ','United Kingdom',NULL,'Somewhere','1977-05-28',1,1,1,1),
	('c27c68a1-380f-4e75-9bd3-69d437158a65','Pending','2021-04-22 12:25:34','Ms','Clara','iPad','+447666555432','cla@tets.com','2021-04-22 12:25:34','2021-04-22 12:25:34',NULL,'4 Eastbourne road',NULL,NULL,'Stratford','London','E15 3LJ','United Kingdom',NULL,'','1966-12-12',1,1,0,0),
	('ced1c03a-7117-4b21-9e59-e71b3ba9d339','Pending','2021-04-22 14:28:09','Mr','Tutu','Mem','+447888888765','ftft@jbjbdjdbqjd.com','2021-04-22 14:28:09','2021-04-22 14:28:09',NULL,'1 Eastbourne Road',NULL,NULL,'London','County (optional)','E15 3LJ','United Kingdom',NULL,'','1999-06-11',0,1,0,1),
	('d356b1b3-047e-40f7-b43b-ca9c16debde2','Pending','2021-04-01 03:00:00','Mr','Sam','Smith','+44777777777','sam@vol.com','2021-04-01 03:00:00','2021-04-01 03:00:00',NULL,'1 The Lane','Somewhere',NULL,'Southford','Cheshire','SK9 0BB','United Kingdom','939e5421-1f2b-4425-a383-b0cfdf4b8724','I am staying in touch','1986-03-12',1,1,1,1),
	('dd959ad3-ee5a-4f94-867b-7932b0aa2853','Pending','2021-04-22 12:28:56','Mr','Steve','Myphone','+447677543432','sts@test.com','2021-04-22 12:28:56','2021-04-22 12:28:56',NULL,'9 Eastbourne Road',NULL,NULL,'Newham','London','E15 3LJ','United Kingdom',NULL,'','1965-09-12',0,1,1,0),
	('e4ed28bf-92ca-4af7-a064-90e3a126c0eb','Pending','2021-04-21 13:55:08','Dr','Randy','Jackson','+449999999999','randy@jackson.com','2021-04-21 13:55:08','2021-04-21 13:55:08',NULL,'Old Road','Old Barn',NULL,'Barnsford','Barnshire','M1 1FZ','United Kingdom',NULL,'I\'ll stay in touch','1965-07-08',1,1,1,1),
	('f996b1b3-047e-40f7-b43b-ca9c16debde','Pending','2021-04-01 03:00:00','Miss','Sandra','Vince','+44777777776','sanda@vol.com','2021-04-01 03:00:00','2021-04-01 03:00:00',NULL,'6 The Lane','Somewhere',NULL,'Westford','Staffordshire','ST16 1AE','United Kingdom','591971f1-eba3-487c-b7da-e095198fc84f','I am staying in touch','1950-03-17',1,1,1,1),
	('fe32c456-4c3a-45ee-99c3-fef68832bfd8','Pending','2021-04-22 11:38:12','Mr','Ray','Ballmo','+447999999999','ray@test.com','2021-04-22 11:38:12','2021-04-22 11:38:12',NULL,'56 Eastbourne Road',NULL,NULL,'London','England','E15 3LJ','United Kingdom',NULL,'','1998-12-21',0,0,0,0),
	('g656b1b3-047e-40f7-b43b-ca9c16debdz','Pending','2021-04-01 03:00:00','Dr','Alan','Kindle','+44777777776','alan@vol.com','2021-04-01 03:00:00','2021-04-01 03:00:00',NULL,'61 The Lane','Somewhere',NULL,'Brekford','Hampshire','BH24 3HN','United Kingdom',NULL,'I am staying in touch','1991-06-11',1,1,1,1),
	('i216b1b3-047e-40f7-b43b-ca9c16debdz','Pending','2021-04-01 03:00:00','Mr','Graham','Taylor-Hart','+44777777776','th@vol.com','2021-04-01 03:00:00','2021-04-01 03:00:00',NULL,'93 The Lane','Somewhere',NULL,'Hickford','Hampshire','BH24 2RR','United Kingdom',NULL,'I am staying in touch','1966-02-02',1,1,1,1),
	('o996b1b3-047e-40f7-b43b-ca9c16debdz','Pending','2021-04-01 03:00:00','Rev','Ben','Vincent','+44777777776','ben@vol.com','2021-04-01 03:00:00','2021-04-01 03:00:00',NULL,'9 The Lane','Somewhere',NULL,'Eastford','Worcestershire','WR3 8SG','United Kingdom',NULL,'I am staying in touch','1944-03-12',1,1,1,1),
	('s436b1b3-047e-40f7-b43b-ca9c16debdz','Pending','2021-04-01 03:00:00','Mr','Harold','Timms','+44777777776','tims@vol.com','2021-04-01 03:00:00','2021-04-01 03:00:00',NULL,'45 The Lane','Somewhere',NULL,'Northford','Worcestershire','HR1 1AU','United Kingdom',NULL,'I am staying in touch','1999-05-12',1,1,1,1),
	('s996b1b3-047e-40f7-b43b-ca9c16debdz','Pending','2021-04-01 03:00:00','Ms','Sally','Johnson','+44777777776','sally@vol.com','2021-04-01 03:00:00','2021-04-01 03:00:00',NULL,'10 The Lane','Somewhere',NULL,'Eastford','Worcestershire','WR3 8SG','United Kingdom',NULL,'I am staying in touch','2005-03-01',1,1,1,1),
	('v696b1b3-047e-40f7-b43b-ca9c16debdz','Pending','2021-04-01 03:00:00','Mrs','Ann','Newton','+44777777776','jerry@vol.com','2021-04-01 03:00:00','2021-04-01 03:00:00',NULL,'77 The Lane','Somewhere',NULL,'Airford','Glasgow','CA1 3NQ','United Kingdom',NULL,'I am staying in touch','1985-07-12',1,1,1,1),
	('x226b1b3-047e-40f7-b43b-ca9c16debdz','Pending','2021-04-01 03:00:00','Miss','Emma','Taylor','+44777777776','emma@vol.com','2021-04-01 03:00:00','2021-04-01 03:00:00',NULL,'33 The Lane','Somewhere',NULL,'Brekford','Hampshire','BH24 1ET','United Kingdom',NULL,'I am staying in touch','1959-09-09',1,1,1,1),
	('y996b1b3-047e-40f7-b43b-ca9c16debdz','Pending','2021-04-01 03:00:00','Ms','Alisson','Sonny','+44777777776','sonny@vol.com','2021-04-01 03:00:00','2021-04-01 03:00:00',NULL,'86 The Lane','Somewhere',NULL,'Airford','Glasgow','G41 1AF','United Kingdom',NULL,'I am staying in touch','1977-07-02',1,1,1,1),
	('z906b1b3-047e-40f7-b43b-ca9c16debdz','Pending','2021-04-01 03:00:00','Mrs','Cerys','Bryne','+44777777776','byrne@vol.com','2021-04-01 03:00:00','2021-04-01 03:00:00',NULL,'81 The Lane','Somewhere',NULL,'Airford','Glasgow','G41 1EE','United Kingdom',NULL,'I am staying in touch','1971-02-01',1,0,1,0),
	('z996b1b3-047e-40f7-b43b-ca9c16debdz','Pending','2021-04-01 03:00:00','Dr','Jerry','Taylor','+44777777776','jerry@vol.com','2021-04-01 03:00:00','2021-04-01 03:00:00',NULL,'91 The Lane','Somewhere',NULL,'Airford','Glasgow','G41 2PE','United Kingdom',NULL,'I am staying in touch','1983-03-12',1,1,1,1);

/*!40000 ALTER TABLE `volunteer` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table volunteerDivisionInterest
# ------------------------------------------------------------

DROP TABLE IF EXISTS `volunteerDivisionInterest`;

CREATE TABLE `volunteerDivisionInterest` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `volunteerId` char(36) NOT NULL,
  `divisionId` char(36) NOT NULL,
  PRIMARY KEY (`volunteerId`,`divisionId`),
  KEY `volunteerId` (`volunteerId`),
  KEY `divisionId` (`divisionId`),
  CONSTRAINT `volunteerDivision_fk1` FOREIGN KEY (`volunteerId`) REFERENCES `volunteer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `volunteerDivision_fk2` FOREIGN KEY (`divisionId`) REFERENCES `division` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `volunteerDivisionInterest` WRITE;
/*!40000 ALTER TABLE `volunteerDivisionInterest` DISABLE KEYS */;

INSERT INTO `volunteerDivisionInterest` (`createdAt`, `updatedAt`, `volunteerId`, `divisionId`)
VALUES
	('2021-04-22 12:03:47','2021-04-22 12:03:47','0331ca00-400b-4631-b045-44c458bccd7e','8574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:13:58','2021-04-22 11:13:58','16410b82-9e00-427d-abbd-dc5d385b5c5e','1174beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:13:58','2021-04-22 11:13:58','16410b82-9e00-427d-abbd-dc5d385b5c5e','1474beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:13:58','2021-04-22 11:13:58','16410b82-9e00-427d-abbd-dc5d385b5c5e','2574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:13:58','2021-04-22 11:13:58','16410b82-9e00-427d-abbd-dc5d385b5c5e','4574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:13:58','2021-04-22 11:13:58','16410b82-9e00-427d-abbd-dc5d385b5c5e','6574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:13:58','2021-04-22 11:13:58','16410b82-9e00-427d-abbd-dc5d385b5c5e','8574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','1074beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','1174beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','1274beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','1474beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','1574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','2574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','3574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','4574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','5574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','6574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','7574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','8574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:44:20','2021-04-22 11:44:20','39be0356-0e72-429a-a908-5a545bad920c','9574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-21 14:27:50','2021-04-21 14:27:50','476e39ad-8113-418c-a846-ac2ceac2a650','1274beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-21 14:27:50','2021-04-21 14:27:50','476e39ad-8113-418c-a846-ac2ceac2a650','1574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-21 14:27:50','2021-04-21 14:27:50','476e39ad-8113-418c-a846-ac2ceac2a650','3574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-21 14:27:50','2021-04-21 14:27:50','476e39ad-8113-418c-a846-ac2ceac2a650','5574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-21 14:27:50','2021-04-21 14:27:50','476e39ad-8113-418c-a846-ac2ceac2a650','7574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-21 14:27:50','2021-04-21 14:27:50','476e39ad-8113-418c-a846-ac2ceac2a650','9574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:19:14','2021-04-22 11:19:14','807dffe3-9c3f-4b0d-9fce-f14f310ef331','1074beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:19:14','2021-04-22 11:19:14','807dffe3-9c3f-4b0d-9fce-f14f310ef331','1274beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:19:14','2021-04-22 11:19:14','807dffe3-9c3f-4b0d-9fce-f14f310ef331','1574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:19:14','2021-04-22 11:19:14','807dffe3-9c3f-4b0d-9fce-f14f310ef331','3574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:19:14','2021-04-22 11:19:14','807dffe3-9c3f-4b0d-9fce-f14f310ef331','5574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:19:14','2021-04-22 11:19:14','807dffe3-9c3f-4b0d-9fce-f14f310ef331','7574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:19:14','2021-04-22 11:19:14','807dffe3-9c3f-4b0d-9fce-f14f310ef331','9574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 12:25:35','2021-04-22 12:25:35','c27c68a1-380f-4e75-9bd3-69d437158a65','1074beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 12:25:35','2021-04-22 12:25:35','c27c68a1-380f-4e75-9bd3-69d437158a65','1274beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 12:25:35','2021-04-22 12:25:35','c27c68a1-380f-4e75-9bd3-69d437158a65','1574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 14:28:09','2021-04-22 14:28:09','ced1c03a-7117-4b21-9e59-e71b3ba9d339','1274beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','d356b1b3-047e-40f7-b43b-ca9c16debde2','1474beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','d356b1b3-047e-40f7-b43b-ca9c16debde2','1574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','d356b1b3-047e-40f7-b43b-ca9c16debde2','2574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','d356b1b3-047e-40f7-b43b-ca9c16debde2','3574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','d356b1b3-047e-40f7-b43b-ca9c16debde2','4574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','d356b1b3-047e-40f7-b43b-ca9c16debde2','5574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','d356b1b3-047e-40f7-b43b-ca9c16debde2','6574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','d356b1b3-047e-40f7-b43b-ca9c16debde2','7574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','d356b1b3-047e-40f7-b43b-ca9c16debde2','9574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 12:28:56','2021-04-22 12:28:56','dd959ad3-ee5a-4f94-867b-7932b0aa2853','5574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 12:28:56','2021-04-22 12:28:56','dd959ad3-ee5a-4f94-867b-7932b0aa2853','8574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 12:28:56','2021-04-22 12:28:56','dd959ad3-ee5a-4f94-867b-7932b0aa2853','9574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-21 13:55:08','2021-04-21 13:55:08','e4ed28bf-92ca-4af7-a064-90e3a126c0eb','1074beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-21 13:55:08','2021-04-21 13:55:08','e4ed28bf-92ca-4af7-a064-90e3a126c0eb','2574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-21 13:55:08','2021-04-21 13:55:08','e4ed28bf-92ca-4af7-a064-90e3a126c0eb','8574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-21 13:55:08','2021-04-21 13:55:08','e4ed28bf-92ca-4af7-a064-90e3a126c0eb','9574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','f996b1b3-047e-40f7-b43b-ca9c16debde','1074beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','f996b1b3-047e-40f7-b43b-ca9c16debde','1174beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','f996b1b3-047e-40f7-b43b-ca9c16debde','1274beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','f996b1b3-047e-40f7-b43b-ca9c16debde','1574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','f996b1b3-047e-40f7-b43b-ca9c16debde','7574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-01 03:00:00','2021-04-01 03:00:00','f996b1b3-047e-40f7-b43b-ca9c16debde','8574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:38:12','2021-04-22 11:38:12','fe32c456-4c3a-45ee-99c3-fef68832bfd8','1074beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:38:12','2021-04-22 11:38:12','fe32c456-4c3a-45ee-99c3-fef68832bfd8','1274beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:38:12','2021-04-22 11:38:12','fe32c456-4c3a-45ee-99c3-fef68832bfd8','1574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:38:12','2021-04-22 11:38:12','fe32c456-4c3a-45ee-99c3-fef68832bfd8','6574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-22 11:38:12','2021-04-22 11:38:12','fe32c456-4c3a-45ee-99c3-fef68832bfd8','8574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-07 07:00:00','2021-04-07 07:00:00','g656b1b3-047e-40f7-b43b-ca9c16debdz','2574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-07 07:00:00','2021-04-07 07:00:00','i216b1b3-047e-40f7-b43b-ca9c16debdz','2574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-07 07:00:00','2021-04-07 07:00:00','o996b1b3-047e-40f7-b43b-ca9c16debdz','3574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-07 07:00:00','2021-04-07 07:00:00','s436b1b3-047e-40f7-b43b-ca9c16debdz','3574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-07 07:00:00','2021-04-07 07:00:00','s436b1b3-047e-40f7-b43b-ca9c16debdz','9574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-07 07:00:00','2021-04-07 07:00:00','s996b1b3-047e-40f7-b43b-ca9c16debdz','2574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-07 07:00:00','2021-04-07 07:00:00','v696b1b3-047e-40f7-b43b-ca9c16debdz','2574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-07 07:00:00','2021-04-07 07:00:00','x226b1b3-047e-40f7-b43b-ca9c16debdz','3574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-07 07:00:00','2021-04-07 07:00:00','y996b1b3-047e-40f7-b43b-ca9c16debdz','3574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-07 07:00:00','2021-04-07 07:00:00','z906b1b3-047e-40f7-b43b-ca9c16debdz','9574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-07 07:00:00','2021-04-07 07:00:00','z996b1b3-047e-40f7-b43b-ca9c16debdz','2574beb8-e674-41fb-a249-8cd0bd6eb342'),
	('2021-04-07 07:00:00','2021-04-07 07:00:00','z996b1b3-047e-40f7-b43b-ca9c16debdz','9574beb8-e674-41fb-a249-8cd0bd6eb342');

/*!40000 ALTER TABLE `volunteerDivisionInterest` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
