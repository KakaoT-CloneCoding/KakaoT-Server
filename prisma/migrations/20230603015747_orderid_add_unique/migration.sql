/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Request_orderId_key` ON `Request`(`orderId`);
