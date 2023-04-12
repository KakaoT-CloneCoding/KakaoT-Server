/*
  Warnings:

  - Added the required column `driverId` to the `Accept` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Accept` ADD COLUMN `driverId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Accept` ADD CONSTRAINT `Accept_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
