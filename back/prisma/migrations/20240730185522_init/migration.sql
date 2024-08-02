-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'organizer', 'user');

-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('beginner', 'advanced', 'expert');

-- CreateEnum
CREATE TYPE "AccountDeletionReason" AS ENUM ('NOT_USING', 'PRIVACY_CONCERNS', 'USER_EXPERIENCE', 'TECHNICAL_ISSUES', 'OTHERS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "nickname" TEXT NOT NULL,
    "tokenFirebase" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "urlSelfie" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teamId" TEXT,
    "urlStream" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL,
    "nameTournament" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "Categories" NOT NULL,
    "organizerId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "membersNumber" INTEGER NOT NULL,
    "maxTeams" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "urlAvatar" TEXT NOT NULL,
    "awards" TEXT[],
    "description" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL,
    "teamId" TEXT,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "nameTeam" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "urlAvatar" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "organizerId" TEXT NOT NULL,
    "tournamentId" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "urlImage" TEXT,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TournamentTeams" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TeamUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TeamToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Team_nameTeam_key" ON "Team"("nameTeam");

-- CreateIndex
CREATE UNIQUE INDEX "Team_organizerId_key" ON "Team"("organizerId");

-- CreateIndex
CREATE UNIQUE INDEX "Games_name_key" ON "Games"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_TournamentTeams_AB_unique" ON "_TournamentTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_TournamentTeams_B_index" ON "_TournamentTeams"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamUsers_AB_unique" ON "_TeamUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamUsers_B_index" ON "_TeamUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToUser_AB_unique" ON "_TeamToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToUser_B_index" ON "_TeamToUser"("B");

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentTeams" ADD CONSTRAINT "_TournamentTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentTeams" ADD CONSTRAINT "_TournamentTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamUsers" ADD CONSTRAINT "_TeamUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamUsers" ADD CONSTRAINT "_TeamUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser" ADD CONSTRAINT "_TeamToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
