ALTER TABLE `pic`
ADD COLUMN `name`  varchar(255) NULL DEFAULT '' AFTER `url`,
ADD COLUMN `type`  varchar(255) NULL DEFAULT '' AFTER `name`,
ADD COLUMN `size`  varchar(255) NULL DEFAULT '' AFTER `type`,
ADD COLUMN `category`  int(11) NULL DEFAULT 0 AFTER `size`;