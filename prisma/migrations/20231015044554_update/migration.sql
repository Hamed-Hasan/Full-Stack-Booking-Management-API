-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "fuelType" SET DEFAULT 'PETROL',
ALTER COLUMN "transmission" DROP NOT NULL,
ALTER COLUMN "transmission" SET DEFAULT 'AUTOMATIC';
