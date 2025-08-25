/*
  Warnings:

  - You are about to drop the column `companyId` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_companyId_fkey";

-- AlterTable
ALTER TABLE "AdminUser" ALTER COLUMN "role" SET DEFAULT 'member';

-- AlterTable
ALTER TABLE "BlogPost" ALTER COLUMN "publishedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "companyId";

-- DropTable
DROP TABLE "Company";
