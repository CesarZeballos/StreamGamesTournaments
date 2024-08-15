import { PrismaClient, User } from '@prisma/client';
import { gamesData } from 'helpers/games.helpers';
import { teams } from 'helpers/teams.helpers';
import { tournaments } from 'helpers/tournaments.helper';
import { users } from 'helpers/users.helper';

export class preloadData {
	constructor(private readonly prisma: PrismaClient) {}

	async addGames() {
		for (const game of gamesData) {
			await this.prisma.game.create({
				data: game,
			});
		}
	}

	async addUsers() {
		for (const user of users) {
			await this.prisma.user.create({
				data: {
					id: user.id,
					email: user.email,
					nickname: user.nickName,
					tokenFirebase: user.tokenFirebase,
					birthdate: new Date(user.birthDate),
					role: user.role,
					urlProfile: user.urlSelfie,
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

		for (const tournament of tournaments) {
			const tournamentData = {
				nameTournament: tournament.nameTournament,
				startDate: tournament.startDate,
				category: tournament.category,
				awards: tournament.awards,
				description: tournament.description,
				urlAvatar: tournament.urlAvatar,
				membersNumber: tournament.membersNumber,
				maxTeams: tournament.maxTeams,
				organizerId: userOrganizer.id,
				gameId: tournament.gameId,
				price: tournament.price,
			};
			const newTournament = await this.prisma.tournament.create({
				data: tournamentData,
			});

			for (const team of teams) {
				await this.prisma.team.create({
					data: {
						name: team.name,
						urlAvatar: team.urlAvatar,
						state: team.state,
						organizerId: userOrganizer.id,
						tournamentId: newTournament.id,
						users: {
							create: team.users?.map((userId) => ({
								user: {
									connect: { id: userId },
								},
							})),
						},
					},
				});
			}
		}
	}
}
