import { PrismaClient, Team, Tournament, User } from '@prisma/client';
import { gamesData } from 'helpers/games.helpers';
import { teams } from 'helpers/teams.helpers';
import { tournaments } from 'helpers/tournaments.helper';
import { users } from 'helpers/users.helper';
import { TeamsService } from 'teams/teams.service';
import { CreateTournamentDto } from 'tournaments/dto/createTournament.Dto';
import { TournamentsService } from 'tournaments/tournaments.service';

export class preloadData {
	constructor(
		private readonly prisma: PrismaClient,
		private readonly teamService: TeamsService,
		private readonly tournamentsService: TournamentsService,
	) {}

	async clearTables() {
		await this.prisma.$transaction([
			// Primero, eliminar registros en UserTeamRequest
			this.prisma.userTeamRequest.deleteMany({}),

			// Luego, eliminar registros en Team
			this.prisma.team.deleteMany({}),

			// Después, eliminar registros en Tournament
			this.prisma.tournament.deleteMany({}),

			// Luego, eliminar registros en los chats y solicitudes de amistad
			this.prisma.privateChat.deleteMany({}),
			this.prisma.userFriends.deleteMany({}),
			this.prisma.friendRequest.deleteMany({}),
			this.prisma.globalChat.deleteMany({}),

			// Ahora, eliminar registros en User
			this.prisma.user.deleteMany({}),

			// Finalmente, eliminar registros en Game
			this.prisma.game.deleteMany({}),
		]);
	}

	async addGames() {
		for (const game of gamesData) {
			await this.prisma.game.upsert({
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
					nickname: user.nickName,
					tokenFirebase: user.tokenFirebase,
					birthdate: new Date(user.birthDate),
					role: user.role,
					urlProfile: user.urlSelfie,
					createdAt: new Date(user.createdAt),
				},
			});
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

		const games = await this.prisma.game.findMany();

		if (games.length === 0) {
			throw new Error('No games found');
		}

		for (const tournament of tournaments) {
			let gameName = '';

			if (tournament.nameTournament.includes('Counter-Strike')) {
				gameName = 'CounterStrike Go';
			} else if (tournament.nameTournament.includes('Fortnite')) {
				gameName = 'Fortnite';
			} else if (
				tournament.nameTournament.includes('League of Legends')
			) {
				gameName = 'League of Legends';
			}

			const game = games.find((g) => g.name === gameName);

			if (!game) {
				throw new Error(`Game ${gameName} not found`);
			}

			const tournamentData: CreateTournamentDto = {
				nameTournament: tournament.nameTournament,
				startDate: tournament.startDate.toISOString(),
				category: tournament.category,
				awards: tournament.awards,
				description: tournament.description,
				urlAvatar: tournament.urlAvatar,
				membersNumber: tournament.membersNumber.toString(),
				maxTeams: tournament.maxTeams.toString(),
				organizerId: userOrganizer.id,
				gameId: game.id,
				price: tournament.price.toString(),
			};

			await this.tournamentsService.createTournament(tournamentData);
		}
	}

	async addTeamsWithPlayers() {
		const usersorganizer: User[] = await this.prisma.user.findMany({
			take: 4,
		});
		const userTable: User[] = await this.prisma.user.findMany();
		let counter: number = 0;
		let userPosition: number = 4;

		for (const user of usersorganizer) {
			const urlAvatar: string = teams[counter].urlAvatar;
			const createdTeam = await this.prisma.team.create({
				data: {
					name: `Team ${counter + 1}`,
					organizerId: user.id,
					urlAvatar: urlAvatar,
					state: true,
				},
			});

			for (let i = 0; i < 4 && userPosition < userTable.length; i++) {
				const selectedUser = userTable[userPosition];
				await this.prisma.userTeams.create({
					data: {
						userId: selectedUser.id,
						nameTeam: createdTeam.id,
					},
				});
				userPosition++;
			}

			counter++;
		}
	}

	async addTeamForTournament() {
		const teams: Team[] = await this.prisma.team.findMany();
		const tournaments: Tournament[] =
			await this.prisma.tournament.findMany();

		let teamIndex = 0;

		for (const tournament of tournaments) {
			for (let i = 0; i < 4 && teamIndex < teams.length; i++) {
				await this.prisma.tournament.update({
					where: { id: tournament.id },
					data: {
						teams: {
							connect: { id: teams[teamIndex].id },
						},
					},
				});
				teamIndex++;
				this.addTeamsWithPlayers();
			}
		}
	}
}
