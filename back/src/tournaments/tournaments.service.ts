import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; 
import { CreateTournamentDto } from '../tournaments/createTournament.Dto';
import { UpdateTournamentDto } from '../tournaments/updateTournament.Dto';

@Injectable()
export class TournamentsService {
	constructor(private readonly prisma: PrismaService) {}

	async getAllTournaments(page: number, limit: number) {
		const skip = (page - 1) * limit;

		const tournaments = await this.prisma.tournament.findMany({
			take: limit,
			skip: skip,
			include: {
				game: true,
				teams: true,
				organizer: true,
			},
		});

		if (tournaments.length === 0) {
			return { message: 'No tournaments found' };
		}

		return tournaments;
	}

	async getTournamentById(id: string) {
		const tournament = await this.prisma.tournament.findUnique({
			where: { id },
			include: {
				game: true,
				teams: true,
				organizer: true,
			},
		});

		if (!tournament) {
			return { message: `Tournament with id ${id} not found` };
		}

		return tournament;
	}

	async createTournament(createTournamentDto: CreateTournamentDto) {
		const { organizerId, gameId, teams, ...data } = createTournamentDto;

		// Verificar que el organizador exista
		const organizerExists = await this.prisma.user.findUnique({
			where: { id: organizerId },
		});

		if (!organizerExists) {
			return { message: `Organizer with id ${organizerId} not found` };
		}

		// Verificar que el juego exista
		const gameExists = await this.prisma.games.findUnique({
			where: { id: gameId },
		});

		if (!gameExists) {
			return { message: `Game with id ${gameId} not found` };
		}

		const awardsAsStrings = data.award.map((a) => a.toString());

		try {
			// Crear el torneo
			const tournament = await this.prisma.tournament.create({
				data: {
				  ...data,
				  award: data.award,
				  organizer: { connect: { id: organizerId } },
				  game: { connect: { id: gameId } },
				  teams: teams
					? { connect: teams.map((teamId) => ({ id: teamId })) }
					: undefined,
				 category: data.category 
				},
			  });

			return tournament;
		} catch (error) {
			// Manejo de errores en la creación del torneo
			return { message: `Error creating tournament: ${error.message}` };
		}
	}

	async addTeamTournament(tournamentId: string, teamId: string) {
		const tournament = await this.prisma.tournament.findUnique({
			where: { id: tournamentId },
			include: { teams: true },
		});

		const team = await this.prisma.team.findUnique({
			where: { id: teamId },
		});

		if (!tournament) {
			return { message: `Tournament with id ${tournamentId} not found` };
		}
		if (!team) {
			return { message: `Team with id ${teamId} not found` };
		}

		const isTeamAlreadyInTournament = tournament.teams.some(
			(t) => t.id === teamId,
		);
		if (isTeamAlreadyInTournament) {
			return {
				message: `Team with id ${teamId} is already in the tournament`,
			};
		}

		const updatedTournament = await this.prisma.tournament.update({
			where: { id: tournamentId },
			data: {
				teams: {
					connect: { id: teamId },
				},
			},
			include: {
				teams: true,
			},
		});

		return updatedTournament;
	}

	async updateATournament(
		id: string,
		updateTournamentDto: UpdateTournamentDto,
	) {
		const { organizerId, gameId, teams, ...data } = updateTournamentDto;

		const tournament = await this.prisma.tournament.findUnique({
			where: { id },
		});

		if (!tournament) {
			return { message: `Tournament with id ${id} not found` };
		}

		if (organizerId) {
			const organizerExists = await this.prisma.user.findUnique({
				where: { id: organizerId },
			});
			if (!organizerExists) {
				return {
					message: `Organizer with id ${organizerId} not found`,
				};
			}
		}

		if (gameId) {
			const gameExists = await this.prisma.games.findUnique({
				where: { id: gameId },
			});
			if (!gameExists) {
				return { message: `Game with id ${gameId} not found` };
			}
		}

		const awardsAsStrings = data.award?.map((a) => a.toString());

		const updateData: any = {
			...data,
			award: awardsAsStrings, // Ensure award is a string array
		};

		if (organizerId) {
			updateData.organizer = { connect: { id: organizerId } };
		}

		if (gameId) {
			updateData.game = { connect: { id: gameId } };
		}

		if (teams) {
			updateData.teams = {
				connect: teams.map((teamId) => ({ id: teamId })),
			};
		}

		const updatedTournament = await this.prisma.tournament.update({
			where: { id },
			data: updateData,
		});

		return updatedTournament;
	}

	async deleteTeam(tournamentId: string, teamId: string) {
		if (!tournamentId || !teamId) {
			throw new BadRequestException(
				'Tournament ID and Team ID must be provided',
			);
		}

		const tournament = await this.prisma.tournament.findUnique({
			where: { id: tournamentId },
			include: { teams: true },
		});

		if (!tournament) {
			throw new NotFoundException(
				`Tournament with ID ${tournamentId} not found`,
			);
		}

		const teamExists = tournament.teams.some((team) => team.id === teamId);

		if (!teamExists) {
			throw new NotFoundException(
				`Team with ID ${teamId} not found in tournament`,
			);
		}

		await this.prisma.team.delete({
			where: { id: teamId },
		});

		return {
			message: `Team with ID ${teamId} successfully removed from tournament`,
		};
	}

	async deleteTournament(tournamentId: string) {
		if (!tournamentId) {
			throw new BadRequestException('Tournament ID must be provided');
		}

		const tournament = await this.prisma.tournament.findUnique({
			where: { id: tournamentId },
		});

		if (!tournament) {
			throw new NotFoundException(
				`Tournament with ID ${tournamentId} not found`,
			);
		}

		await this.prisma.tournament.delete({
			where: { id: tournamentId },
		});

		return {
			message: `Tournament with ID ${tournamentId} successfully deleted`,
		};
	}
}
