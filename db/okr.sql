/*
 Navicat Premium Data Transfer

 Source Server         : 111
 Source Server Type    : MySQL
 Source Server Version : 100316
 Source Host           : 127.0.0.1:3306
 Source Schema         : okr

 Target Server Type    : MySQL
 Target Server Version : 100316
 File Encoding         : 65001

 Date: 15/10/2019 22:21:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for keyresult
-- ----------------------------
DROP TABLE IF EXISTS `keyresult`;
CREATE TABLE `keyresult`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `objective_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of keyresult
-- ----------------------------
INSERT INTO `keyresult` VALUES (1, '1', 'OKR基础UI', '2');
INSERT INTO `keyresult` VALUES (2, '1', 'OKR接口', '1');
INSERT INTO `keyresult` VALUES (3, '2', '云开发文档', '2');
INSERT INTO `keyresult` VALUES (4, '2', '云开发搭建', '1');

-- ----------------------------
-- Table structure for objective
-- ----------------------------
DROP TABLE IF EXISTS `objective`;
CREATE TABLE `objective`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `created_time` timestamp(0) NULL DEFAULT current_timestamp(0),
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '1',
  `end_time` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of objective
-- ----------------------------
INSERT INTO `objective` VALUES (1, '1', '完成OkR', '2019-10-15 22:05:38', '2', '2019-10-15 22:11:17');
INSERT INTO `objective` VALUES (2, '1', '微信云开发', '2019-10-15 22:07:28', '1', NULL);

-- ----------------------------
-- Table structure for todo
-- ----------------------------
DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `created_time` timestamp(0) NULL DEFAULT current_timestamp(0),
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '1',
  `end_time` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todo
-- ----------------------------
INSERT INTO `todo` VALUES (1, '1', '了解小程序接口', '2019-10-15 22:02:03', '1', NULL);
INSERT INTO `todo` VALUES (2, '1', '了解小程序登录方式', '2019-10-15 22:02:13', '2', '2019-10-15 22:10:38');
INSERT INTO `todo` VALUES (3, '1', '了解小程序的云开发', '2019-10-15 22:02:44', '2', '2019-10-15 22:10:39');
INSERT INTO `todo` VALUES (4, '1', '环境搭建', '2019-10-15 22:02:53', '1', NULL);
INSERT INTO `todo` VALUES (5, '1', '数据库配置', '2019-10-15 22:03:05', '2', '2019-10-15 22:10:44');
INSERT INTO `todo` VALUES (6, '1', '页面交互', '2019-10-15 22:03:33', '2', '2019-10-15 22:10:41');

-- ----------------------------
-- Table structure for todo_keyresult
-- ----------------------------
DROP TABLE IF EXISTS `todo_keyresult`;
CREATE TABLE `todo_keyresult`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `keyresult_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todo_keyresult
-- ----------------------------
INSERT INTO `todo_keyresult` VALUES (2, '2', '1');
INSERT INTO `todo_keyresult` VALUES (3, '2', '2');
INSERT INTO `todo_keyresult` VALUES (4, '3', '2');
INSERT INTO `todo_keyresult` VALUES (5, '3', '1');
INSERT INTO `todo_keyresult` VALUES (6, '1', '2');
INSERT INTO `todo_keyresult` VALUES (8, '4', '4');
INSERT INTO `todo_keyresult` VALUES (9, '5', '1');
INSERT INTO `todo_keyresult` VALUES (10, '6', '1');
INSERT INTO `todo_keyresult` VALUES (11, '6', '4');
INSERT INTO `todo_keyresult` VALUES (12, '3', '3');
INSERT INTO `todo_keyresult` VALUES (13, '5', '4');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `wechatID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '亚提密斯', 'o7em15MDf4I3iizGHTMtaaccDOD4');

SET FOREIGN_KEY_CHECKS = 1;
