/*
  Warnings:

  - You are about to drop the column `price` on the `Service` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuelType` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerHour` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatingCapacity` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmission` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('DIESEL', 'PETROL', 'ELECTRIC', 'HYBRID');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('MANUAL', 'AUTOMATIC');

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "price",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "fuelType" "FuelType" NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "pricePerHour" INTEGER NOT NULL,
ADD COLUMN     "seatingCapacity" INTEGER NOT NULL,
ADD COLUMN     "transmission" "Transmission" NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
