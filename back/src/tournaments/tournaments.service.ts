import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTournamentDto } from '../tournaments/createTournament.Dto';
import { UpdateTournamentDto } from '../tournaments/updateTournament.Dto';
import { tournaments } from 'src/helpers/tournaments.helper';

@Injectable()
export class TournamentsService {
	constructor(private readonly prisma: PrismaService) {}

	/* async getAllTournaments(page: number, limit: number) {
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
	} */

		//CON HELPER


		async getAllTournaments(page: number, limit: number) {
			const skip = (page - 1) * limit;
		
			const paginatedTournaments = tournaments.slice(skip, skip + limit);
		
			if (paginatedTournaments.length === 0) {
				return { message: 'No tournaments found' };
			}
		
			return paginatedTournaments;
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
		const { organizerId, gameId, ...data } = createTournamentDto;

		const organizerExists = await this.prisma.user.findUnique({
			where: { id: organizerId },
		});
		const gameExists = await this.prisma.games.findUnique({
			where: { id: gameId },
		});

		if (!organizerExists) {
			return { message: `Organizer with id ${organizerId} not found` };
		}

		if (!gameExists) {
			return { message: `Game with id ${gameId} not found` };
		}

		const tournament = await this.prisma.tournament.create({
			data: {
				...data,
				organizer: { connect: { id: organizerId } },
				game: { connect: { id: gameId } },
			},
		});

		return tournament;
	}

	async addTeamTournament(tournamentId: string, teamId: string) {
		const tournament = await this.prisma.tournament.findUnique({
			where: { id: tournamentId },
		});
		const team = await this.prisma.teams.findUnique({
			where: { id: teamId },
		});

		if (!tournament) {
			return { message: `Tournament with id ${tournamentId} not found` };
		}
		if (!team) {
			return { message: `Team with id ${teamId} not found` };
		}

		const updateTournament = await this.prisma.tournament.update({
			where: { id: tournamentId },
			data: {
				teams: { connect: { id: teamId } },
			},
			include: {
				teams: true,
			},
		});
		return updateTournament;
	}

	async updateATournament(
		id: string,
		updateTournamentDto: UpdateTournamentDto,
	) {
		const tournament = await this.prisma.tournament.findUnique({
			where: { id },
		});

		if (!tournament) {
			return { message: `Tournament with id ${id} not found` };
		}

		const updateTournament = await this.prisma.tournament.update({
			where: { id },
			data: { ...updateTournamentDto },
		});

		return updateTournament;
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

		await this.prisma.teams.delete({
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
