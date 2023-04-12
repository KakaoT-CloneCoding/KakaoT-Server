-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('DRIVER', 'CLIENT') NULL;

-- CreateTable
CREATE TABLE `Resolvation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Resolvation` ADD CONSTRAINT `Resolvation_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
