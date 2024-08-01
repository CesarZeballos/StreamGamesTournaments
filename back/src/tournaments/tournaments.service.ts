import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTournamentDto, UpdateTournamentDto } from '../tournaments/createTournament.Dto';

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
				participants: true,
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
				participants: true,
				organizer: true,
			},
		});

		if (!tournament) {
			return { message: `Tournament with id ${id} not found` };
		}

		return tournament;
	}

	async createTournament(createTournamentDto: CreateTournamentDto) {
		const { ...data } = createTournamentDto;
		
		const organizerExists = await this.prisma.user.findUnique({
		  where: { id: data.organizerId },
		});
	  
		if (!organizerExists) {
		  return { message: `Organizer with id ${data.organizerId} not found` };
		}
	  
		const gameExists = await this.prisma.games.findUnique({
		  where: { id: data.gameId },
		});
	  
		if (!gameExists) {
		  return { message: `Game with id ${data.gameId} not found` };
		}
	  
		const awardsAsStrings = data.awards.map(a => a.toString());
	  
		try {
		  const tournament = await this.prisma.tournament.create({
			data: {
				...data,
				awards: awardsAsStrings,
				organizer: { connect: { id: data.organizerId } },
				game: { connect: { id: data.gameId } },
				participants: {
				  connect: data.participants.map(userId => ({ id: userId })),
				},
			  },
			});
	  
		  return tournament;
		} catch (error) {
		  return { message: `Error creating tournament: ${error.message}` };
		}
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

		const awardsAsStrings = data.awards?.map((a) => a.toString());

		const updateData: any = {
			...data,
			award: awardsAsStrings,
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
			include: { participants:true , organizer: true },
		});

		if (!tournament) {
			throw new NotFoundException(
				`Tournament with ID ${tournamentId} not found`,
			);
		}

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

		await this.prisma.tournament.update({
			where: { id: tournamentId }, data: {state: false}
		});

		return {
			message: `Tournament with ID ${tournamentId} successfully deleted`,
		};
	}
}
