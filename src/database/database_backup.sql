-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: metro.proxy.rlwy.net    Database: railway
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Agresores`
--

DROP TABLE IF EXISTS `Agresores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Agresores` (
  `id_agresor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `edad` int DEFAULT NULL,
  `sexo` varchar(10) DEFAULT NULL,
  `vinculo_con_la_victima` varchar(50) DEFAULT NULL,
  `antecedentes` text,
  PRIMARY KEY (`id_agresor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Agresores`
--

LOCK TABLES `Agresores` WRITE;
/*!40000 ALTER TABLE `Agresores` DISABLE KEYS */;
/*!40000 ALTER TABLE `Agresores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Casos`
--

DROP TABLE IF EXISTS `Casos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Casos` (
  `id_caso` int NOT NULL AUTO_INCREMENT,
  `id_victima` int DEFAULT NULL,
  `id_agresor` int DEFAULT NULL,
  `fecha_caso` date DEFAULT NULL,
  `tipo_de_violencia` varchar(50) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_caso`),
  KEY `id_victima` (`id_victima`),
  KEY `id_agresor` (`id_agresor`),
  CONSTRAINT `Casos_ibfk_1` FOREIGN KEY (`id_victima`) REFERENCES `Victimas` (`id_victima`),
  CONSTRAINT `Casos_ibfk_2` FOREIGN KEY (`id_agresor`) REFERENCES `Agresores` (`id_agresor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Casos`
--

LOCK TABLES `Casos` WRITE;
/*!40000 ALTER TABLE `Casos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Casos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Denuncias`
--

DROP TABLE IF EXISTS `Denuncias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Denuncias` (
  `id_denuncia` int NOT NULL AUTO_INCREMENT,
  `id_caso` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `lugar_denuncia` varchar(100) DEFAULT NULL,
  `entidad_que_recibe` varchar(100) DEFAULT NULL,
  `resultado_inicial` text,
  PRIMARY KEY (`id_denuncia`),
  KEY `id_caso` (`id_caso`),
  CONSTRAINT `Denuncias_ibfk_1` FOREIGN KEY (`id_caso`) REFERENCES `Casos` (`id_caso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Denuncias`
--

LOCK TABLES `Denuncias` WRITE;
/*!40000 ALTER TABLE `Denuncias` DISABLE KEYS */;
/*!40000 ALTER TABLE `Denuncias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recursos_Brindados`
--

DROP TABLE IF EXISTS `Recursos_Brindados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recursos_Brindados` (
  `id_recurso` int NOT NULL AUTO_INCREMENT,
  `id_caso` int DEFAULT NULL,
  `tipo_recurso` varchar(100) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  PRIMARY KEY (`id_recurso`),
  KEY `id_caso` (`id_caso`),
  CONSTRAINT `Recursos_Brindados_ibfk_1` FOREIGN KEY (`id_caso`) REFERENCES `Casos` (`id_caso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recursos_Brindados`
--

LOCK TABLES `Recursos_Brindados` WRITE;
/*!40000 ALTER TABLE `Recursos_Brindados` DISABLE KEYS */;
/*!40000 ALTER TABLE `Recursos_Brindados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Seguimientos`
--

DROP TABLE IF EXISTS `Seguimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Seguimientos` (
  `id_seguimiento` int NOT NULL AUTO_INCREMENT,
  `id_caso` int DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `observaciones` text,
  `profesional_encargado` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_seguimiento`),
  KEY `id_caso` (`id_caso`),
  CONSTRAINT `Seguimientos_ibfk_1` FOREIGN KEY (`id_caso`) REFERENCES `Casos` (`id_caso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Seguimientos`
--

LOCK TABLES `Seguimientos` WRITE;
/*!40000 ALTER TABLE `Seguimientos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Seguimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'victim',
  `id_victima` int DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`),
  KEY `id_victima` (`id_victima`),
  CONSTRAINT `Usuarios_ibfk_1` FOREIGN KEY (`id_victima`) REFERENCES `Victimas` (`id_victima`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (1,'tobiasMasna@gmail.com','$2b$10$wO08pFAr4m5alDrZTIPw0eP.tSh/lnCyqUC3y8b6sMRRhI8baO5/K','victim',NULL);
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Victimas`
--

DROP TABLE IF EXISTS `Victimas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Victimas` (
  `id_victima` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `edad` int DEFAULT NULL,
  `sexo` varchar(10) DEFAULT NULL,
  `direccion` text,
  `contacto` varchar(50) DEFAULT NULL,
  `tipo_de_documento` varchar(20) DEFAULT NULL,
  `numero_documento` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_victima`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Victimas`
--

LOCK TABLES `Victimas` WRITE;
/*!40000 ALTER TABLE `Victimas` DISABLE KEYS */;
/*!40000 ALTER TABLE `Victimas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-24 13:54:34
