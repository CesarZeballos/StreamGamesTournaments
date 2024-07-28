/*
  Warnings:

  - The values [amateur,professional] on the enum `Categories` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `urlStream` on the `Tournament` table. All the data in the column will be lost.
  - The `award` column on the `Tournament` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `actived` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Teams` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `descriptioin` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxMember` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxTeam` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlAvatar` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountDeletionReason" AS ENUM ('NOT_USING', 'PRIVACY_CONCERNS', 'USER_EXPERIENCE', 'TECHNICAL_ISSUES', 'OTHERS');

-- AlterEnum
BEGIN;
CREATE TYPE "Categories_new" AS ENUM ('beginner', 'advanced', 'expert');
ALTER TABLE "Tournament" ALTER COLUMN "categories" TYPE "Categories_new" USING ("categories"::text::"Categories_new");
ALTER TYPE "Categories" RENAME TO "Categories_old";
ALTER TYPE "Categories_new" RENAME TO "Categories";
DROP TYPE "Categories_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Teams" DROP CONSTRAINT "Teams_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "Teams" DROP CONSTRAINT "Teams_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamId_fkey";

-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "urlStream",
ADD COLUMN     "descriptioin" TEXT NOT NULL,
ADD COLUMN     "maxMember" INTEGER NOT NULL,
ADD COLUMN     "maxTeam" INTEGER NOT NULL,
ADD COLUMN     "urlAvatar" TEXT NOT NULL,
DROP COLUMN "award",
ADD COLUMN     "award" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "actived";

-- DropTable
DROP TABLE "Teams";

-- CreateTable
CREATE TABLE "UserDeleted" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "nickName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL,
    "urlSelfie" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "createdEnd" TIMESTAMP(3) NOT NULL,
    "description" "AccountDeletionReason" NOT NULL,

    CONSTRAINT "UserDeleted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "urlAvatar" TEXT NOT NULL,
    "organizerId" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Team_organizerId_key" ON "Team"("organizerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
