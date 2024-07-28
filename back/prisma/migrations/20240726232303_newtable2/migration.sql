/*
  Warnings:

  - You are about to drop the column `descriptioin` on the `Tournament` table. All the data in the column will be lost.
  - Added the required column `description` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "descriptioin",
ADD COLUMN     "description" TEXT NOT NULL;
