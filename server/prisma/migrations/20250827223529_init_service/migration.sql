/*
  Warnings:

  - You are about to drop the column `serviceId` on the `ContactMessage` table. All the data in the column will be lost.
  - You are about to drop the column `iconUrl` on the `Service` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContactMessage" DROP CONSTRAINT "ContactMessage_serviceId_fkey";

-- AlterTable
ALTER TABLE "ContactMessage" DROP COLUMN "serviceId";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "iconUrl",
ADD COLUMN     "imageUrl" TEXT NOT NULL;
