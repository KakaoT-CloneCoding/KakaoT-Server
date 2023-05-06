/*
  Warnings:

  - You are about to drop the column `toLongitude` on the `Request` table. All the data in the column will be lost.
  - Added the required column `Longitude` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromLongitude` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toLatitude` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Request` DROP COLUMN `toLongitude`,
    ADD COLUMN `Longitude` DECIMAL(13, 10) NOT NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `fromLongitude` DECIMAL(13, 10) NOT NULL,
    ADD COLUMN `toLatitude` DECIMAL(13, 10) NOT NULL;
