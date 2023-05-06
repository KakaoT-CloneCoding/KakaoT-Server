/*
  Warnings:

  - You are about to drop the column `Longitude` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `fromLatitude` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `fromLongitude` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `toLatitude` on the `Request` table. All the data in the column will be lost.
  - Added the required column `departureLatitude` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureLongitude` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationLatitude` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationLongitude` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Request` DROP COLUMN `Longitude`,
    DROP COLUMN `fromLatitude`,
    DROP COLUMN `fromLongitude`,
    DROP COLUMN `toLatitude`,
    ADD COLUMN `departureLatitude` DECIMAL(13, 10) NOT NULL,
    ADD COLUMN `departureLongitude` DECIMAL(13, 10) NOT NULL,
    ADD COLUMN `destinationLatitude` DECIMAL(13, 10) NOT NULL,
    ADD COLUMN `destinationLongitude` DECIMAL(13, 10) NOT NULL;
