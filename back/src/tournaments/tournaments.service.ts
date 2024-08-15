import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
	CreateTournamentDto,
	UpdateTournamentDto,
} from './dto/createTournament.Dto';
import { MailService } from 'mail/mail.service';
import { MailTemplates } from 'mail/mail-templates';
import { Categories } from '@prisma/client';
import { Fetchs } from 'utils/fetch.cb';

@Injectable()
export class TournamentsService {
	private readonly logger = new Logger(TournamentsService.name);

	constructor(
		private readonly prisma: PrismaService,
		private readonly mailService: MailService,
		private readonly fetchs: Fetchs,
	) {}

	async getAllTournaments() {
		const tournaments = await this.prisma.tournament.findMany({
			include: {
				game: true,
				players: true,
				teams: true,
			},
		});

		if (tournaments.length === 0) {
			return { message: 'No tournaments found' };
		}

		return tournaments;
	}

	async getTournamentById(id: string) {
		try {
			const tournament = await this.fetchs.FindTournamentByUnique(id);
			console.log('TournamentService', tournament);

			if (!tournament) {
				throw new NotFoundException(
					`Tournament with id ${id} not found`,
				);
			}

			return tournament;
		} catch (error) {
			this.logger.error(
				`Error fetching tournament with id ${id}: ${error.message}`,
			);
			throw error;
		}
	}

	async createTournament(createTournamentDto: CreateTournamentDto) {
		const { organizerId, gameId, ...data } = createTournamentDto;

		const numberTeams = Number(data.maxTeams);
		const numberPrice = Number(data.price);
		const numberMember = Number(data.membersNumber);

		const organizerExists = await this.fetchs.FindUserByUnique({
			id: organizerId,
		});
		if (!organizerExists)
			throw new NotFoundException(
				`Organizer with id ${organizerId} not found`,
			);

		const gameExists = await this.fetchs.FindGamesByUnique({ id: gameId });
		if (!gameExists)
			throw new NotFoundException(`Game with id ${gameId} not found`);

		const awardsAsStrings = data.awards.map((a) => a.toString());

		const tournament = await this.prisma.tournament.create({
			data: {
				...data,
				price: numberPrice,
				membersNumber: numberMember,
				maxTeams: numberTeams,
				category: data.category as Categories,
				awards: awardsAsStrings,
				organizer: { connect: { id: organizerId } },
				game: { connect: { id: gameId } },
			},
		});

		const mailOptions = MailTemplates.tournamentCreated(
			organizerExists.email,
			organizerExists.nickname,
			tournament.nameTournament,
		);

		await this.mailService.sendMail(mailOptions);

		return {
			message: `Tournament successfully created`,
			tournament,
		};
	}

	async updateTournament(updateTournamentDto: UpdateTournamentDto) {
		const { id, teams, players, ...data } = updateTournamentDto;

		const tournament = await this.fetchs.FindTournamentByUnique(id);
		if (!tournament)
			throw new NotFoundException(`Tournament with id ${id} not found`);

		const awardsAsStrings = data.awards?.map((a) => a.toString());

		const updateData: Partial<UpdateTournamentDto> = {
			...data,
			awards: awardsAsStrings,
		};

		const updatedTournament = await this.prisma.tournament.update({
			where: { id },
			data: {
				...updateData,
				teams: { set: teams?.map((teamId) => ({ id: teamId })) },
				players: {
					set: players?.map((playerId) => ({ id: playerId })),
				},
			},
		});

		return updatedTournament;
	}

	async deleteTeam(tournamentId: string, teamId: string) {
		if (!tournamentId || !teamId) {
			throw new BadRequestException(
				'Tournament ID and Team ID must be provided',
			);
		}

		const tournament =
			await this.fetchs.FindTournamentByUnique(tournamentId);
		if (!tournament)
			throw new NotFoundException(
				`Tournament with ID ${tournamentId} not found`,
			);

		await this.prisma.tournament.update({
			where: { id: tournamentId },
			data: {
				teams: {
					disconnect: { id: teamId },
				},
			},
		});

		return { message: `Team successfully removed from tournament` };
	}

	async deleteTournament(tournamentId: string) {
		if (!tournamentId) {
			throw new BadRequestException('Tournament ID must be provided');
		}

		const tournament =
			await this.fetchs.FindTournamentByUnique(tournamentId);
		if (!tournament)
			throw new NotFoundException(
				`Tournament with ID ${tournamentId} not found`,
			);

		await this.prisma.tournament.update({
			where: { id: tournamentId },
			data: { state: false },
		});

		return { message: `Tournament successfully deleted` };
	}
}
