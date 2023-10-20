-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_serviceId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
