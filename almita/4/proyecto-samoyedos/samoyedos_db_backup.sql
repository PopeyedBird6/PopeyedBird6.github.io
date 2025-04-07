-- MySQL dump 10.13  Distrib 9.2.0, for macos15.2 (arm64)
--
-- Host: localhost    Database: samoyedos_db
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `sku` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (19,'Cama para Samoyedo','Cama suave y cómoda para perros grandes',59.99,10,'Camas','SAM-CAMA-001','DogComfort','Blanco','2025-03-11 01:31:09'),(20,'Juguete Masticable','Juguete resistente para perros grandes',12.50,25,'Juguetes','SAM-JUG-002','Kong','Rojo','2025-03-11 01:31:09'),(21,'Correa Reflectante','Correa ajustable con material reflectante',19.99,15,'Accesorios','SAM-COR-003','Ruffwear','Azul','2025-03-11 01:31:09'),(22,'Champú para Perros','Champú hipoalergénico para perros de pelo blanco',14.99,30,'Cuidado','SAM-CHAMP-004','TropiClean','Blanco','2025-03-11 01:31:09'),(23,'Arnés Ajustable','Arnés cómodo y seguro para paseos',29.99,20,'Accesorios','SAM-ARN-005','Puppia','Negro','2025-03-11 01:31:09'),(24,'Comedero Elevado','Comedero ergonómico para razas grandes',22.99,12,'Alimentación','SAM-COM-006','Neater Feeder','Gris','2025-03-11 01:31:09'),(25,'Snacks de Salmón','Snacks saludables para perros',9.99,50,'Alimentación','SAM-SNACK-007','Blue Buffalo','Marrón','2025-03-11 01:31:09'),(26,'Cepillo para Pelo Largo','Cepillo desenredante para razas de pelo largo',17.99,18,'Cuidado','SAM-CEP-008','Furminator','Verde','2025-03-11 01:31:09'),(27,'Collar Antipulgas','Collar repelente de pulgas y garrapatas',24.99,22,'Cuidado','SAM-COL-009','Seresto','Morado','2025-03-11 01:31:09'),(28,'Mochila para Perros','Mochila para llevar a tu perro en caminatas',39.99,8,'Accesorios','SAM-MOCH-010','Kurgo','Amarillo','2025-03-11 01:31:09'),(29,'&#x27; OR 1=1&#x27;','asdas',123.00,123,'sf','pdf','sdf','sdf','2025-03-11 01:38:21'),(30,'Isaac','asdasd',12.00,12,'asdasd','asd','asdas','asdasd','2025-03-11 02:02:58');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('oztbZmAY0v_Iz0yBHq2AN25G_x76k7ht',1744146685,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T21:11:24.505Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"usuario\":\"; DROP DATABASE;\",\"ultimoAcceso\":1744060284504}'),('t7WE2dOEBgnLfubXzzqi5_sQxIk5xSu9',1744138917,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T19:01:56.931Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (4,'asd','$2b$10$C7wtFYAfDci3LhgA4kFIluJeF.SLWma86B7mbmnKP/BjrFydGkWjW','2025-04-01 01:42:58'),(7,'asdas','$2b$10$1PGPXbpU7j1Lcx.0Ty5pCOmTT.tx2iT.FkPRr7dNnBtHvP1ogwdvm','2025-04-01 01:49:48'),(8,'ISAAC','$2b$10$UR06qmZe0A4YbYaK6ZCBe.iz.HgJqH7lliFNpwa.phLAsJBwagn3O','2025-04-07 19:02:11'),(9,'soygay','$2b$10$HTxzxZX3Jw4wjAxr.7Z3/udphNYO40XZCnzdF7I4aARPiBy929wCa','2025-04-07 19:06:32'),(10,'osqui','$2b$10$iqkCSDmgbOppGJ70QIpjgeYLH6C41eguDShB7.5//bido13aePD7O','2025-04-07 21:10:39'),(11,'; DROP DATABASE;','$2b$10$ouhmmPe3.8unRd8SlouVN.FsqtNhkmca32rQ0jHClHZB71GJyItbK','2025-04-07 21:11:24');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-07 15:24:51
