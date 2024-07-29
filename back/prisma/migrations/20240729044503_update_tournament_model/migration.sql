/*
  Warnings:

  - Added the required column `membersNumber` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameTournament` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "membersNumber" INTEGER NOT NULL,
ADD COLUMN     "nameTournament" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER;
