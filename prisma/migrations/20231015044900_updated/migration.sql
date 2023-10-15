/*
  Warnings:

  - You are about to drop the column `fuelType` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `transmission` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "fuelType",
DROP COLUMN "transmission";
