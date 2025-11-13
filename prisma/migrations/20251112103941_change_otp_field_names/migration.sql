/*
  Warnings:

  - You are about to drop the column `codehash` on the `OTP` table. All the data in the column will be lost.
  - You are about to drop the column `expiredAt` on the `OTP` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `OTP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedCode` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OTP" DROP COLUMN "codehash",
DROP COLUMN "expiredAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hashedCode" TEXT NOT NULL;
