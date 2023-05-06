/*
  Warnings:

  - You are about to drop the column `departureLddress` on the `Request` table. All the data in the column will be lost.
  - Added the required column `destinationAddress` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Request` DROP COLUMN `departureLddress`,
    ADD COLUMN `destinationAddress` VARCHAR(191) NOT NULL;
