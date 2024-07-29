import {
	Controller,
	Get,
	ParseUUIDPipe,
	Param,
	Post,
	Body,
	Put,
	Delete,
	BadRequestException,
	Query,
} from '@nestjs/common';
import {
	ApiTags,
	ApiResponse,
	ApiQuery,
	ApiParam,
	ApiBody,
	ApiOperation,
} from '@nestjs/swagger';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './createTournament.Dto';
import { UpdateTournamentDto } from './updateTournament.Dto';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentsController {
	constructor(private readonly tournamentsService: TournamentsService) {}

	@Get()
	@ApiOperation({
		summary: 'Get all tournaments',
		description: 'Retrieve a paginated list of tournaments.',
	})
	@ApiQuery({
		name: 'page',
		required: false,
		type: Number,
		description: 'Page number for pagination',
	})
	@ApiQuery({
		name: 'limit',
		required: false,
		type: Number,
		description: 'Number of items per page',
	})
	@ApiResponse({
		status: 200,
		description: 'List of tournaments',
		type: [CreateTournamentDto],
	})
	@ApiResponse({ status: 404, description: 'No tournaments found' })
	async getAllTournaments(
		@Query('page') page?: string,
		@Query('limit') limit?: string,
	) {
		const pageNumber = page ? Number(page) : 1;
		const limitNumber = limit ? Number(limit) : 9;

		console.log(
			'getAllTournaments called with page:',
			pageNumber,
			'limit:',
			limitNumber,
		);

		return this.tournamentsService.getAllTournaments(
			pageNumber,
			limitNumber,
		);
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Get tournament by ID',
		description: 'Retrieve a specific tournament by its ID.',
	})
	@ApiParam({ name: 'id', type: String, description: 'Tournament ID' })
	@ApiResponse({
		status: 200,
		description: 'Tournament details',
		type: CreateTournamentDto,
	})
	@ApiResponse({ status: 404, description: 'Tournament not found' })
	async getTournamentById(@Param('id', new ParseUUIDPipe()) id: string) {
		return this.tournamentsService.getTournamentById(id);
	}

	@Post('add')
	@ApiOperation({
		summary: 'Create a new tournament',
		description: 'Create a new tournament with the provided details.',
	})
	@ApiBody({
		type: CreateTournamentDto,
		description: 'Tournament details to be created',
		examples: {
			default: {
				value: {
					startDate: '2024-08-01T14:23:11.438Z',
					categories: 'CATEGORY1',
					award: 500,
					urlStream: 'https://example.com/stream1',
					organizerId: 'a3c4d5e6-7b8a-9b0c-1d2e-3f4g5h6i7j8k',
					gameId: 'l4m5n6o7-8p9q-0r1s-2t3u-4v5w6x7y8z9a',
				},
				description: 'Sample tournament data',
			},
		},
	})
	@ApiResponse({
		status: 201,
		description: 'Tournament created successfully',
		type: CreateTournamentDto,
	})
	@ApiResponse({ status: 400, description: 'Bad request' })
	async createTournament(@Body() createTournamentDto: CreateTournamentDto) {
		return this.tournamentsService.createTournament(createTournamentDto);
	}

	@Put('team')
	@ApiOperation({
		summary: 'Add a team to a tournament',
		description: 'Associate a team with a tournament.',
	})
	@ApiBody({
		type: Object,
		description: 'Tournament and team IDs',
		examples: {
			default: {
				value: { teamId: 'team-id', tournamentId: 'tournament-id' },
				description: 'Example body for updating tournament teams',
			},
		},
	})
	@ApiResponse({ status: 200, description: 'Team added to tournament' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	async updateTournament(
		@Body() body: { teamId: string; tournamentId: string },
	) {
		const { tournamentId, teamId } = body;
		return this.tournamentsService.addTeamTournament(tournamentId, teamId);
	}

	@Put('update/:id')
	@ApiOperation({
		summary: 'Update a tournament',
		description: 'Update the details of a specific tournament.',
	})
	@ApiParam({ name: 'id', type: String, description: 'Tournament ID' })
	@ApiBody({
		type: UpdateTournamentDto,
		description: 'Tournament details to be updated',
		examples: {
			default: {
				value: {
					startDate: '2024-08-01T14:23:11.438Z',
					categories: 'CATEGORY1',
					award: 500,
					urlStream: 'https://example.com/stream1',
					organizerId: 'a3c4d5e6-7b8a-9b0c-1d2e-3f4g5h6i7j8k',
					gameId: 'l4m5n6o7-8p9q-0r1s-2t3u-4v5w6x7y8z9a',
				},
				description: 'Sample data for updating a tournament',
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Tournament updated successfully',
		type: CreateTournamentDto,
	})
	@ApiResponse({ status: 404, description: 'Tournament not found' })
	async updateATournament(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() updateTournamentDto: UpdateTournamentDto,
	) {
		return this.tournamentsService.updateATournament(
			id,
			updateTournamentDto,
		);
	}

	@Delete('delete/team')
	@ApiOperation({
		summary: 'Remove a team from a tournament',
		description: 'Delete the association between a team and a tournament.',
	})
	@ApiBody({
		type: Object,
		description: 'Tournament and team IDs',
		examples: {
			default: {
				value: { teamId: 'team-id', tournamentId: 'tournament-id' },
				description:
					'Example body for deleting a team from a tournament',
			},
		},
	})
	@ApiResponse({ status: 200, description: 'Team removed from tournament' })
	@ApiResponse({ status: 400, description: 'Bad request' })
	async deleteTeam(@Body() body: { tournamentId: string; teamId: string }) {
		const { tournamentId, teamId } = body;

		if (!tournamentId || !teamId) {
			throw new BadRequestException(
				'Tournament ID and Team ID must be provided',
			);
		}

		return this.tournamentsService.deleteTeam(tournamentId, teamId);
	}

	@Delete('deleteTournament/:id')
	@ApiOperation({
		summary: 'Delete a tournament',
		description: 'Remove a specific tournament by its ID.',
	})
	@ApiParam({ name: 'id', type: String, description: 'Tournament ID' })
	@ApiResponse({
		status: 200,
		description: 'Tournament deleted successfully',
	})
	@ApiResponse({ status: 404, description: 'Tournament not found' })
	async deleteTournament(@Param('id') id: string) {
		if (!id) {
			throw new BadRequestException('Tournament ID must be provided');
		}

		return this.tournamentsService.deleteTournament(id);
	}
}
