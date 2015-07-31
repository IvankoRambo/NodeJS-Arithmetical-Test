-- MySQL dump 10.13  Distrib 6.0.6-alpha, for Win32 (ia32)
--
-- Host: localhost    Database: calculation
-- ------------------------------------------------------
-- Server version	6.0.6-alpha-community

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
-- Table structure for table `equestion_types`
--

DROP TABLE IF EXISTS `equestion_types`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `equestion_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `sign` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `equestion_types`
--

LOCK TABLES `equestion_types` WRITE;
/*!40000 ALTER TABLE `equestion_types` DISABLE KEYS */;
INSERT INTO `equestion_types` VALUES (1,'Sum','+'),(2,'Difference','-'),(3,'Multiply','*'),(4,'Divide','/');
/*!40000 ALTER TABLE `equestion_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equestions`
--

DROP TABLE IF EXISTS `equestions`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `equestions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `equestion` varchar(50) NOT NULL,
  `result` tinyint(4) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `equestions`
--

LOCK TABLES `equestions` WRITE;
/*!40000 ALTER TABLE `equestions` DISABLE KEYS */;
INSERT INTO `equestions` VALUES (9,'3+1',4,'Sum'),(10,'3-1',2,'Difference');
/*!40000 ALTER TABLE `equestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_cart`
--

DROP TABLE IF EXISTS `student_cart`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `student_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) DEFAULT NULL,
  `percent` decimal(10,4) NOT NULL,
  `wrong_count` int(11) NOT NULL,
  `right_count` int(11) NOT NULL,
  `types` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `student_cart`
--

LOCK TABLES `student_cart` WRITE;
/*!40000 ALTER TABLE `student_cart` DISABLE KEYS */;
INSERT INTO `student_cart` VALUES (7,'Lol1','100.0000',0,2,'Sum,Difference,Multiply,Divide','2015-07-31 14:40:40'),(8,'Loser1','0.0000',2,0,'Sum,Difference,Multiply,Divide','2015-07-31 14:41:12'),(9,'Loser1','0.0000',2,0,'Sum,Difference,Multiply,Divide','2015-07-31 14:41:23'),(10,'Loser1','0.0000',2,0,'Sum,Difference,Multiply,Divide','2015-07-31 14:41:30'),(11,'Loser1','0.0000',2,0,'Sum,Difference,Multiply,Divide','2015-07-31 14:41:34');
/*!40000 ALTER TABLE `student_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_index` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (38,'Lol1','Valya','Niasha'),(39,'Loser1','Vitalia','Lol'),(40,'Milochka','Mila','Milaja'),(41,'Olia','Seraja','Mol');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wrong_equestions`
--

DROP TABLE IF EXISTS `wrong_equestions`;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
CREATE TABLE `wrong_equestions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cart` int(11) NOT NULL,
  `equestion` varchar(255) NOT NULL,
  `result` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
SET character_set_client = @saved_cs_client;

--
-- Dumping data for table `wrong_equestions`
--

LOCK TABLES `wrong_equestions` WRITE;
/*!40000 ALTER TABLE `wrong_equestions` DISABLE KEYS */;
INSERT INTO `wrong_equestions` VALUES (5,7,'',''),(6,8,'3+1,3-1','2,1'),(7,9,'3-1,3+1','1,1'),(8,10,'3+1,3-1','5,1'),(9,11,'3+1,3-1','1,1');
/*!40000 ALTER TABLE `wrong_equestions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-07-31 17:19:01
