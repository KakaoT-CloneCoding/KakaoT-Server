/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    ADD COLUMN `nickname` VARCHAR(191) NULL,
    ADD COLUMN `profile_image` VARCHAR(191) NULL;
