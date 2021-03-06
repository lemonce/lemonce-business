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
  `CREATE_TIME` datetime DEFAULT CURRENT_TIMESTAMP,
  `INCREMENT` int(11) DEFAULT '0',
  `PURCHASE_ID` varchar(100) DEFAULT NULL,
  `ACTIVED` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`LIMITATION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_limitation`
--

LOCK TABLES `biz_limitation` WRITE;
/*!40000 ALTER TABLE `biz_limitation` DISABLE KEYS */;
/*!40000 ALTER TABLE `biz_limitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_market`
--

DROP TABLE IF EXISTS `biz_market`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_market` (
  `MARKET_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(45) DEFAULT NULL,
  `DESCRIPTION` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`MARKET_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_market`
--

LOCK TABLES `biz_market` WRITE;
/*!40000 ALTER TABLE `biz_market` DISABLE KEYS */;
INSERT INTO `biz_market` VALUES (0,'self',NULL),(1,'mycommercy',NULL);
/*!40000 ALTER TABLE `biz_market` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_notification`
--

DROP TABLE IF EXISTS `biz_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_notification` (
  `NOTIFICATION_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'auto increment primary key for notification',
  `PURCHASE_ID` varchar(100) NOT NULL COMMENT 'unique key for an order',
  `TYPE_ID` int(11) NOT NULL COMMENT 'type enum for notification, type description can be seen in biz_notification_type',
  `RAW` mediumtext COMMENT 'json content for notification',
  PRIMARY KEY (`NOTIFICATION_ID`)
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
  `TYPE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(50) DEFAULT NULL COMMENT 'enum for type of notification',
  `DESCRIPTION` text,
  PRIMARY KEY (`TYPE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_notification_type`
--

LOCK TABLES `biz_notification_type` WRITE;
/*!40000 ALTER TABLE `biz_notification_type` DISABLE KEYS */;
INSERT INTO `biz_notification_type` VALUES (1,'orderNotification','Sent when a valid order has been placed and payment has been received.'),(2,'refundDone','Notifies you whenever element 5 /Share-it has issued a refund.'),(3,'fraudRefundDone','Notifies you whenever element 5 /Share-it has issued a refund to avoid a chargeback. In this case, the order was assessed as possibly fraudulent at a later time.'),(4,'chargebackLetter','Notifies you that, to prevent chargebacks, element 5 /Share-it has provided the credit card company with details of the order upon their request.'),(5,'chargeback','Notifies you whenever element 5 /Share-it has performed a chargeback.'),(6,'chargebackReversal','Notifies you whenever element 5/Share-it has reversed a chargeback upon customer request.\rNotifies you whenever element 5/Share-it has reversed a chargeback upon customer request.'),(7,'rebillingCancelled','Sent when a subscription is cancelled, indicating the reason for the cancellation (e.g. cancelled by customer or non-payment).'),(8,'RebillingDeactivated','Sent when a subscription had to be terminated (e.g. because the product was deactivated).');
/*!40000 ALTER TABLE `biz_notification_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_product`
--

DROP TABLE IF EXISTS `biz_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_product` (
  `PRODUCT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `MARKET_ID` int(11) DEFAULT NULL,
  `INCREMENT` int(11) DEFAULT NULL,
  `PRICE` float DEFAULT NULL,
  `PUBLIC` tinyint(1) DEFAULT '1',
  `URL` varchar(200) DEFAULT NULL,
  `CURRENCY` enum('CNY','USD','EUR','JPY','GBP') DEFAULT 'USD',
  `DESCRIPTION` text,
  PRIMARY KEY (`PRODUCT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_product`
--

LOCK TABLES `biz_product` WRITE;
/*!40000 ALTER TABLE `biz_product` DISABLE KEYS */;
INSERT INTO `biz_product` VALUES (1,1,10,100,1,'','USD','lemonce limitation');
/*!40000 ALTER TABLE `biz_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_purchase`
--

DROP TABLE IF EXISTS `biz_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_purchase` (
  `PURCHASE_ID` varchar(100) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `PRODUCT_ID` int(11) DEFAULT NULL,
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
-- Table structure for table `biz_user`
--

DROP TABLE IF EXISTS `biz_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_user` (
  `USER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(50) NOT NULL,
  `PASSWORD` varchar(100) NOT NULL,
  `SALT` char(6) NOT NULL,
  `EMAIL` varchar(320) DEFAULT NULL,
  `EMAIL_VERIFIED` tinyint(1) DEFAULT '0',
  `EMAIL_VERIFIED_CODE` char(40) NOT NULL,
  `PHONE` varchar(45) DEFAULT NULL,
  `REGISTER_TIME` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_user`
--

LOCK TABLES `biz_user` WRITE;
/*!40000 ALTER TABLE `biz_user` DISABLE KEYS */;
INSERT INTO `biz_user` VALUES (0,'111','46d5f8969055c735a53a5a1f4f558ba1ab39caff','b8633f','',1,'0','','2017-04-26 17:19:46');
/*!40000 ALTER TABLE `biz_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_user_detail`
--

DROP TABLE IF EXISTS `biz_user_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_user_detail` (
  `USER_ID` int(11) NOT NULL,
  `NATIONALITY` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`USER_ID`),
  CONSTRAINT `USER_ID2` FOREIGN KEY (`USER_ID`) REFERENCES `biz_user` (`USER_ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_user_detail`
--

LOCK TABLES `biz_user_detail` WRITE;
/*!40000 ALTER TABLE `biz_user_detail` DISABLE KEYS */;
INSERT INTO `biz_user_detail` VALUES (0,'111');
/*!40000 ALTER TABLE `biz_user_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_user_reset`
--

DROP TABLE IF EXISTS `biz_user_reset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_user_reset` (
  `USER_ID` int(11) NOT NULL,
  `TOKEN` char(40) NOT NULL,
  `CREATE_TIME` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_user_reset`
--

LOCK TABLES `biz_user_reset` WRITE;
/*!40000 ALTER TABLE `biz_user_reset` DISABLE KEYS */;
/*!40000 ALTER TABLE `biz_user_reset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `biz_user_summary`
--

DROP TABLE IF EXISTS `biz_user_summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `biz_user_summary` (
  `USER_ID` int(11) NOT NULL,
  `LIMITATION_NUMBER` int(11) DEFAULT '0' COMMENT 'will be updated by a trigger when biz_limitation changed',
  `VERSION` char(7) DEFAULT '2',
  PRIMARY KEY (`USER_ID`),
  CONSTRAINT `USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `biz_user` (`USER_ID`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `biz_user_summary`
--

LOCK TABLES `biz_user_summary` WRITE;
/*!40000 ALTER TABLE `biz_user_summary` DISABLE KEYS */;
INSERT INTO `biz_user_summary` VALUES (0,0,'2');
/*!40000 ALTER TABLE `biz_user_summary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-22 23:46:26
-- TRIGGER

delimiter $
drop trigger if exists increaseUserSummary $
create trigger increaseUserSummary
after insert on biz_limitation
for each row begin
	if new.ACTIVED=1 then
		update biz_user_summary set LIMITATION_NUMBER=LIMITATION_NUMBER+new.INCREMENT WHERE USER_ID = new.USER_ID;
	end if;
end $

drop trigger if exists decreaseUserSummary $
create trigger decreaseUserSummary
after delete on biz_limitation
for each row begin
	update biz_user_summary set LIMITATION_NUMBER=LIMITATION_NUMBER-old.INCREMENT WHERE USER_ID = old.USER_ID;
end $

drop trigger if exists createUser $
create trigger createUser after insert on biz_user
for each row begin
	insert into biz_user_summary(USER_ID) values(new.USER_ID);
  insert into biz_user_detail(USER_ID) values(new.USER_ID);
end $

drop trigger if exists updateUserSummary $
create trigger updateUserSummary
after update on biz_limitation
for each row begin
    if new.ACTIVED != old.ACTIVED then
		  if new.ACTIVED = 1 then
			  update biz_user_summary set LIMITATION_NUMBER=LIMITATION_NUMBER+new.INCREMENT WHERE USER_ID = new.USER_ID;
      else
			  update biz_user_summary set LIMITATION_NUMBER=LIMITATION_NUMBER-new.INCREMENT WHERE USER_ID = new.USER_ID;
      end if;
	else 
		if new.INCREMENT != old.INCREMENT then
		  update biz_user_summary set LIMITATION_NUMBER=LIMITATION_NUMBER+(new.INCREMENT-old.INCREMENT) WHERE USER_ID = new.USER_ID;
    end if;
  end if;
end $

drop trigger if exists createLimitation $
create trigger createLimitation
after insert on biz_purchase
for each row begin
	if (select COUNT(*) from biz_user where EMAIL = new.EMAIL) != 0 && new.PURCHASE_STATUS = 'complete' then
		insert into biz_limitation(USER_ID, INCREMENT, PURCHASE_ID) values(
			(select USER_ID from biz_user where EMAIL = new.EMAIL),
            (select INCREMENT from biz_product where PRODUCT_ID = new.PRODUCT_ID),
            new.PURCHASE_ID
        );
    end if;
end $

drop trigger if exists updateUser $
create trigger updateUser after update on biz_user
for each row begin
	if new.EMAIL_VERIFIED != old.EMAIL_VERIFIED 
		&& new.EMAIL_VERIFIED = 1 
    && (select COUNT(*) from biz_purchase where EMAIL = new.EMAIL) != 0 then
		  insert into biz_limitation(USER_ID, INCREMENT, PURCHASE_ID)
			  (select new.USER_ID as USER_ID, INCREMENT, PURCHASE_ID from biz_purchase, biz_product 
				  where EMAIL = new.EMAIL and biz_purchase.PRODUCT_ID=biz_product.PRODUCT_ID);
	end if;
end $

delimiter ;