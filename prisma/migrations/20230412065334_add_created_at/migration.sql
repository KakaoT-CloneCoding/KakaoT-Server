/*
  Warnings:

  - Added the required column `createdAt` to the `Accept` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiredAt` to the `Accept` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Accept` ADD COLUMN `createdAt` DATE NOT NULL,
    ADD COLUMN `expiredAt` DATE NOT NULL;

-- AlterTable
ALTER TABLE `Request` ADD COLUMN `createdAt` DATE NOT NULL;
