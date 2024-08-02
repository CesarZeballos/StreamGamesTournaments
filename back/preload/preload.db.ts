import {
	Game,
	Prisma,
	PrismaClient,
	Team,
	Tournament,
	User,
} from '@prisma/client';
import { gamesData } from 'src/helpers/games.helpers';
import { teams } from 'src/helpers/teams.helpers';
import { tournaments } from 'src/helpers/tournaments.helper';
import { users } from 'src/helpers/users.helper';
import { CreateTeamDto } from 'src/teams/createTeamDto';
import { TeamsService } from 'src/teams/teams.services';
import { CreateTournamentDto } from 'src/tournaments/createTournament.dto';
import { TournamentsService } from 'src/tournaments/tournaments.service';

export class preloadData {
	constructor(
		private readonly prisma: PrismaClient,
		private readonly teamService: TeamsService,
		private readonly tournamentsService: TournamentsService,
	) {}

	async clearTables() {
		await this.prisma.$transaction([
			this.prisma.team.deleteMany({}),
			this.prisma.tournament.deleteMany({}),
			this.prisma.user.deleteMany({}),
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

	async addTeams() {
		const usersTable: User[] = await this.prisma.user.findMany({ take: 4 });

		// Verifica que el array `teams` no esté vacío
		if (teams.length === 0) {
			throw new Error('No teams data available');
		}

		let counter: number = 0;

		for (const team of teams) {
			// Asegúrate de que `team` tenga los datos necesarios
			if (!team.name || !team.urlAvatar) {
				console.error('Team data is missing:', team);
				continue;
			}

			// Define el ID del torneo y la lista de IDs de usuarios para cada equipo si es necesario
			const tournamentId = null; // Cambia esto si tienes un ID de torneo para asignar
			const userIds = usersTable.map((user) => user.id); // Asigna todos los usuarios encontrados al equipo

			const teamData: CreateTeamDto = {
				name: team.name,
				urlAvatar: team.urlAvatar,
				tournamentId: tournamentId,
				userIds: userIds, // Asigna la lista de IDs de usuarios
			};

			try {
				await this.teamService.createTeam(teamData);
			} catch (error) {
				console.error('Error creating team:', error);
			}

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
				await this.teamService.updateTeam(
					updateTeam.id,
					selectedUsers[userPosition],
				);
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
				price: tournament.price,
				membersNumber: tournament.membersNumber,
				maxTeams: tournament.maxTeams,
				organizerId: userOrganizer.id,
				gameId: game.id,
			};

			await this.tournamentsService.createTournament(tournamentData);
		}
	}

	async addTeamForTournament() {
		const teams: Team[] = await this.prisma.team.findMany();
		const tournaments: Tournament[] =
			await this.prisma.tournament.findMany();

		for (const tournament of tournaments) {
			for (const team of teams) {
				await this.tournamentsService.updateTournament(
					tournament.id,
					team,
				);
			}
		}
	}
}
