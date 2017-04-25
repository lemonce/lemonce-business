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
  `LICENSE_ID` char(60) NOT NULL,
  -- 记得做索引

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
  `LIMITATION_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT NULL,
  `INCREMENT` int(11) DEFAULT '0',
  `PURCHASE_ID` int(11) DEFAULT '0', -- 可以为null，来自分销渠道就填对应的purchase 来自手动的就置0
  `ACTIVED` tinyint(1) DEFAULT '1', -- 该记录是否生效默认生效
  -- `VERSION` varchar(45) DEFAULT NULL, 废除这个字段
  PRIMARY KEY (`LIMITATION_ID`)
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
  `NOTIFICATION_ID` int(11) NOT NULL, -- 设置自增，多个通告可能是围绕一个订单的，比如针对某个特定订单的支付、退款、打发票等 
  `PURCHASE_ID` varchar(100) NOT NULL, -- 根据文档的推荐我放弃修改这个字段
  `TYPE_ID` varchar(50) DEFAULT NULL, -- 注意和type表类型保持一致
  `RAW` varchar(45) DEFAULT NULL, -- 使用json类型，注意这里太短了。如果数据库不支持使用mediumtext类型
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
  `TYPE_ID` int(11) NOT NULL AUTO_INCREMENT, -- 如果可以的话考虑使用 ENUM()
  `TYPE_NAME` varchar(45) DEFAULT NULL,
  `TYPE_DESCRIPTION` text DEFAULT NULL,
  -- RULE 可能需要增加一个字段表示处理方式 比如 忽略、增加限额、取消限额、减少限额...需要进一步讨论
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
-- 这个表的明确的业务意义是对通告的要素抽取，所以确保和notification表 1:1 对应
DROP TABLE IF EXISTS `biz_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_purchase` (
  `PURCHASE_ID` varchar(100) NOT NULL, 
  `EMAIL` varchar(255) DEFAULT NULL, -- 不能为空的约束 做一个简单的值通配约束
  `PURCHASE_TIME` datetime DEFAULT NULL,
  `PURCHASE_COMPLETE_TIME` datetime DEFAULT NULL,
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

DROP TABLE IF EXISTS `biz_user_summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_summary` (
  -- `SUMMARY_ID` int(11) NOT NULL AUTO_INCREMENT, 废除这个字段
  `USER_ID` int(11) NOT NULL,
  `LIMITATION_NUMBER` int(11) DEFAULT '0',
  `USED_NUMBER` int(11) DEFAULT '0', -- 由license的触发器更新
  `VERSION` char(7) DEFAULT '2',
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
  `PASSWORD` varchar(50) NOT NULL, -- 使用sha-256 或当前数据库的最高版本 改为 char
  `SALT` CHAR(6) NOT NULL, -- 盐从node那边随机产生 \w{6} 由insert语句调用数据库加密 未来验证时也使用数据库的加密算法计算后对比
  `EMAIL` varchar(255) DEFAULT NULL,
  `EMAIL_VERIFIED` BIT(1) DEFAULT 0, -- 邮箱激活标志位
  `EMAIL_VERIFIED_CODE` CHAR(32) DEFAULT 0, -- 根据 username email datetime 来生成 md5 特征码
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
