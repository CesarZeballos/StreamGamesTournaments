import { Games, PrismaClient, Team, Tournament, User } from "@prisma/client";
import { gamesData } from "src/helpers/games.helpers";
import { teams } from "src/helpers/teams.helpers";
import { tournaments } from "src/helpers/tournaments.helper";
import { users } from "src/helpers/users.helper";
import { TeamsService } from "src/teams/teams.service";
import { CreateTournamentDto } from "src/tournaments/createTournament.Dto";
import { TournamentsService } from "src/tournaments/tournaments.service";
import { UpdateTournamentDto } from "src/tournaments/updateTournament.Dto";

export class preloadData {
    constructor(
        private readonly prisma: PrismaClient,
        private readonly teamService: TeamsService,
        private readonly tournamentsService: TournamentsService
    ) { }

    async clearTables() {
        await this.prisma.$transaction([
            this.prisma.team.deleteMany({}),
            this.prisma.tournament.deleteMany({}),
            this.prisma.user.deleteMany({}),
            this.prisma.games.deleteMany({}),
        ]);
    }

    async addGames() {
        for (const game of gamesData) {
            await this.prisma.games.upsert({
                where: { id: game.id },
                update: {},
                create: {
                    name: game.name,
                    urlImage: game.urlImage,
                },
            });
        }
    }

    async addUsers() {
        for (const user of users) {
            await this.prisma.user.upsert({
                where: { id: user.id },
                update: {},
                create: {
                    email: user.email,
                    nickName: user.nickName,
                    tokenFirebase: user.tokenFirebase,
                    birthDate: new Date(user.birthDate),
                    role: user.role,
                    urlSelfie: user.urlSelfie,
                    createdAt: new Date(user.createdAt),
                },
            });
        }
    }

    async addTeams() {
        const usersTable: User[] = await this.prisma.user.findMany({ take: 4 });
        let counter: number = 0;

        for (const user of usersTable) {
            const teamName: string = user.nickName + counter;
            const urlAvatar: string = teams[counter].urlAvatar;
            await this.teamService.createTeam(user.id, {
                name: teamName,
                urlAvatar: urlAvatar,
            });

            counter++;
        }
    }

    async addUserForTeam() {
        let member: number = 4;
        let teamCounter: number = 0;
        let userPosition: number = 0;
        const userTable: User[] = await this.prisma.user.findMany();
        const teamsTable: Team[] = await this.prisma.team.findMany();

        const selectedUsers = userTable.slice(member, member + 4);

        for (const team of teamsTable) {
            const updateTeam = teamsTable[teamCounter];
            for (let i = 0; i < 4 && selectedUsers.length > 0; i++) {
                await this.teamService.updateTeam(updateTeam.id, selectedUsers[userPosition]);
                userPosition++;
            }
            member += 4;
            teamCounter++;
        }
    }

    async addTournaments() {
        const userOrganizer: User = await this.prisma.user.findFirst({
            where: {
                role: 'organizer',
            },
        });

        if (!userOrganizer) {
            throw new Error('No organizer found');
        }

        const games = await this.prisma.games.findMany();

        if (games.length === 0) {
            throw new Error('No games found');
        }

        let counterGame: number = 0;

        for (const tournament of tournaments) {
            if (counterGame >= games.length) {
                counterGame = 0; // Reinicia el contador si supera el número de juegos disponibles
            }

            const tournamentData: CreateTournamentDto = {
                startDate: tournament.startDate.toISOString(), // Ya es una cadena
                categories: tournament.categories,
                award: tournament.award,
                description: tournament.description,
                urlAvatar: tournament.urlAvatar,
                maxMember: tournament.maxMember,
                maxTeam: tournament.maxTeam,
                organizerId: userOrganizer.id,
                gameId: games[counterGame].id, // Obtener el ID del juego
            };

            try {
                const createdTournament = await this.tournamentsService.createTournament(tournamentData);
                if ('id' in createdTournament) {
                    console.log(`Tournament created: ${createdTournament.id}`);
                } else {
                    console.error(`Failed to create tournament: ${JSON.stringify(createdTournament)}`);
                }
                counterGame++;
            } catch (error) {
                console.error(`Failed to create tournament: ${error.message}`);
            }
        }
        console.log('Data preloaded successfully');
    }





    async addTeamForTournament() {
        const teams: Team[] = await this.prisma.team.findMany();

        const tournaments: Tournament[] = await this.prisma.tournament.findMany();

        for (const tournament of tournaments) {
            for (const team of teams) {
                await this.tournamentsService.addTeamTournament(tournament.id, team.id);
            }
        }
    }
}
