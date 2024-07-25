/*
  Warnings:

  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Games` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `urlImage` to the `Games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" ADD COLUMN     "urlImage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "country",
DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "Games_name_key" ON "Games"("name");
