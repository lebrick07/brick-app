-- brickdb.Users definition

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `is_email_verified` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- brickdb.Sessions definition

CREATE TABLE `Sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` timestamp NOT NULL,
  `data` text,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- brickdb.Conversations definition

CREATE TABLE `Conversations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

-- brickdb.Messages definition

CREATE TABLE `Messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conversation_id` int(11) NOT NULL,
  `role` varchar(100) NOT NULL,
  `content` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_conversation_id` (`conversation_id`),
  CONSTRAINT `fk_conversation_id` FOREIGN KEY (`conversation_id`) REFERENCES `Conversations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=latin1;
