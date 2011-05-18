CREATE TABLE `django_content_type` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `name` varchar(100) NOT NULL,
    `app_label` varchar(100) NOT NULL,
    `model` varchar(100) NOT NULL,
    UNIQUE (`app_label`, `model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
;

CREATE TABLE `django_site` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `domain` varchar(100) NOT NULL,
    `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8
;

CREATE TABLE `django_session` (
    `session_key` varchar(40) NOT NULL PRIMARY KEY,
    `session_data` longtext NOT NULL,
    `expire_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8
;

CREATE TABLE `django_admin_log` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `action_time` datetime NOT NULL,
    `user_id` integer NOT NULL,
    `content_type_id` integer,
    `object_id` longtext,
    `object_repr` varchar(200) NOT NULL,
    `action_flag` smallint UNSIGNED NOT NULL,
    `change_message` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8
;
ALTER TABLE `django_admin_log` ADD CONSTRAINT `content_type_id_refs_id_288599e6` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);
CREATE INDEX `django_admin_log_fbfc09f1` ON `django_admin_log` (`user_id`);
CREATE INDEX `django_admin_log_e4470c6e` ON `django_admin_log` (`content_type_id`);