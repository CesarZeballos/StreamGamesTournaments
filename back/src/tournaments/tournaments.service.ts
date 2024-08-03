import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
	CreateTournamentDto,
	UpdateTournamentDto,
} from '../tournaments/createTournament.Dto';
import { MailService } from 'mail/mail.service';
import { MailTemplates } from 'mail/mail-templates';
import { Categories } from '@prisma/client';

@Injectable()
export class TournamentsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly mailService: MailService,
	) {}

	async getAllTournaments(page: number, limit: number) {
		const skip = (page - 1) * limit;

		const tournaments = await this.prisma.tournament.findMany({
			take: limit,
			skip: skip,
			include: {
				game: true,
				players: true,
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
				players: true,
				organizer: true,
				teams: true,
			},
		});

		if (!tournament) {
			throw new NotFoundException(`Tournament with id ${id} not found`);
		}

		return tournament;
	}

	async createTournament(createTournamentDto: CreateTournamentDto) {
		const { organizerId, gameId, ...data } = createTournamentDto;

		const organizerExists = await this.prisma.user.findUnique({
			where: { id: organizerId },
		});

		if (!organizerExists) {
			throw new NotFoundException(
				`Organizer with id ${organizerId} not found`,
			);
		}

		const gameExists = await this.prisma.game.findUnique({
			where: { id: gameId },
		});

		if (!gameExists) {
			throw new NotFoundException(`Game with id ${gameId} not found`);
		}

		const awardsAsStrings = data.awards.map((a) => a.toString());

		try {
			const tournament = await this.prisma.tournament.create({
				data: {
					...data,
					category: data.category as Categories,
					awards: awardsAsStrings,
					organizer: { connect: { id: organizerId } },
					game: { connect: { id: gameId } },
				},
			});

			// Enviar correo de creación de torneo
			const mailOptions = MailTemplates.tournamentCreated(
				organizerExists.email,
				organizerExists.nickname,
				tournament.nameTournament,
			);
			try {
				await this.mailService.sendMail(mailOptions);
				console.log(
					`Tournament creation email sent to ${organizerExists.email}`,
				);
			} catch (error) {
				console.error(
					`Failed to send tournament creation email to ${organizerExists.email}`,
					error.stack,
				);
			}

			return tournament;
		} catch (error) {
			throw new BadRequestException(
				`Error creating tournament: ${error.message}`,
			);
		}
	}

	async updateTournament(updateTournamentDto: UpdateTournamentDto) {
		const { id, organizerId, gameId, teams, players, ...data } =
			updateTournamentDto;

		const tournament = await this.prisma.tournament.findUnique({
			where: { id },
		});

		if (!tournament) {
			throw new NotFoundException(`Tournament with id ${id} not found`);
		}

		if (organizerId) {
			const organizerExists = await this.prisma.user.findUnique({
				where: { id: organizerId },
			});
			if (!organizerExists) {
				throw new NotFoundException(
					`Organizer with id ${organizerId} not found`,
				);
			}
		}

		if (gameId) {
			const gameExists = await this.prisma.game.findUnique({
				where: { id: gameId },
			});
			if (!gameExists) {
				throw new NotFoundException(`Game with id ${gameId} not found`);
			}
		}

		const awardsAsStrings = data.awards?.map((a) => a.toString());

		const updateData: any = {
			...data,
			awards: awardsAsStrings,
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

		if (players) {
			updateData.players = {
				connect: players.map((userId) => ({ id: userId })),
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

		await this.prisma.tournament.update({
			where: { id: tournamentId },
			data: {
				teams: {
					disconnect: { id: teamId },
				},
			},
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

		await this.prisma.tournament.update({
			where: { id: tournamentId },
			data: { state: false },
		});

		return {
			message: `Tournament with ID ${tournamentId} successfully deleted`,
		};
	}
}
