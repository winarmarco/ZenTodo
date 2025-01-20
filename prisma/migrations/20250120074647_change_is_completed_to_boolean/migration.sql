/*
  Warnings:

  - You are about to alter the column `isCompleted` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Todo` MODIFY `isCompleted` BOOLEAN NOT NULL;
