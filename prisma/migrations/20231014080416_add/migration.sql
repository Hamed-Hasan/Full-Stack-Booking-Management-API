/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "needsPasswordChange" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "preferences" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Profile";
