/*
  Warnings:

  - The values [rating_one,rating_two,rating_three,rating_four,rating_five] on the enum `RatingValue` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RatingValue_new" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE');
ALTER TABLE "Review" ALTER COLUMN "rating" TYPE "RatingValue_new" USING ("rating"::text::"RatingValue_new");
ALTER TYPE "RatingValue" RENAME TO "RatingValue_old";
ALTER TYPE "RatingValue_new" RENAME TO "RatingValue";
DROP TYPE "RatingValue_old";
COMMIT;
