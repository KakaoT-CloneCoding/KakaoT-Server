/*
  Warnings:

  - You are about to drop the column `fromAddress` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `toAddress` on the `Request` table. All the data in the column will be lost.
  - Added the required column `departureAddress` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureLddress` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Request` DROP COLUMN `fromAddress`,
    DROP COLUMN `toAddress`,
    ADD COLUMN `departureAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `departureLddress` VARCHAR(191) NOT NULL;
