-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "fuelType" TEXT,
ADD COLUMN     "transmission" TEXT;

-- DropEnum
DROP TYPE "FuelType";

-- DropEnum
DROP TYPE "Transmission";
