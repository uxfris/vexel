/*
  Warnings:

  - Made the column `demoGifUrl` on table `plugins` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "plugins" ADD COLUMN     "discountPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
ALTER COLUMN "demoGifUrl" SET NOT NULL;
