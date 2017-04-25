-- MySQL dump 10.13  Distrib 5.6.22, for osx10.8 (x86_64)
--
-- Host: localhost    Database: lemonce
-- ------------------------------------------------------
-- Server version	5.6.25-enterprise-commercial-advanced

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `biz_license`
--

DROP TABLE IF EXISTS `biz_license`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_license` (
  `LICENSE_ID` varchar(60) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  PRIMARY KEY (`LICENSE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_license`
--

LOCK TABLES `biz_license` WRITE;
/*!40000 ALTER TABLE `biz_license` DISABLE KEYS */;
/*!40000 ALTER TABLE `biz_license` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_limitation`
--

DROP TABLE IF EXISTS `biz_limitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_limitation` (
  `LIMIT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) DEFAULT NULL,
  `PURCHASE_DATE` datetime DEFAULT NULL,
  `LIMIT_COUNT` int(11) DEFAULT '0',
  `VERSION` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`LIMIT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_limitation`
--

LOCK TABLES `biz_limitation` WRITE;
/*!40000 ALTER TABLE `biz_limitation` DISABLE KEYS */;
/*!40000 ALTER TABLE `biz_limitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_notification`
--

DROP TABLE IF EXISTS `biz_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_notification` (
  `PURCHASE_ID` varchar(100) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `content` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PURCHASE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_notification`
--

LOCK TABLES `biz_notification` WRITE;
/*!40000 ALTER TABLE `biz_notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `biz_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_notification_type`
--

DROP TABLE IF EXISTS `biz_notification_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_notification_type` (
  `NOTIFICATION_TYPE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TYPE_NAME` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`NOTIFICATION_TYPE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_notification_type`
--

LOCK TABLES `biz_notification_type` WRITE;
/*!40000 ALTER TABLE `biz_notification_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `biz_notification_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_purchase`
--

DROP TABLE IF EXISTS `biz_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_purchase` (
  `PURCHASE_ID` varchar(100) NOT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  `PURCHASE_DATE` datetime DEFAULT NULL,
  `PURCHASE_COMPLETE_DATE` datetime DEFAULT NULL,
  `PURCHASE_STATUS` varchar(45) DEFAULT NULL,
  `INVOICE_NUMBER` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`PURCHASE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_purchase`
--

LOCK TABLES `biz_purchase` WRITE;
/*!40000 ALTER TABLE `biz_purchase` DISABLE KEYS */;
/*!40000 ALTER TABLE `biz_purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_summary`
--

DROP TABLE IF EXISTS `biz_summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_summary` (
  `SUMMARY_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `LIMIT_COUNT` int(11) DEFAULT '0',
  `VERSION` varchar(45) DEFAULT '',
  PRIMARY KEY (`SUMMARY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_summary`
--

LOCK TABLES `biz_summary` WRITE;
/*!40000 ALTER TABLE `biz_summary` DISABLE KEYS */;
/*!40000 ALTER TABLE `biz_summary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_user`
--

DROP TABLE IF EXISTS `biz_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_user` (
  `USER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(50) NOT NULL,
  `PASSWORD` varchar(50) NOT NULL,
  `EMAIL` varchar(45) DEFAULT NULL,
  `PHONE` varchar(45) DEFAULT NULL,
  `REGISTER_TIME` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_user`
--

LOCK TABLES `biz_user` WRITE;
/*!40000 ALTER TABLE `biz_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `biz_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-25 11:45:07
