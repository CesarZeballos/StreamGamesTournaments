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
	UseGuards,
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
/* import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { RolesGuard } from 'auth/roles.guard';
import { Roles } from 'auth/roles.decorator';
import { Role } from '@prisma/client'; */
import {
	CreateTournamentDto,
	UpdateTournamentDto,
} from './dto/createTournament.Dto';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentsController {
	constructor(private readonly tournamentsService: TournamentsService) {}

	@Get()
	async getAllTournaments(
		@Query('page') page?: string,
		@Query('limit') limit?: string,
	) {
		const pageNumber = page ? Number(page) : 1;
		const limitNumber = limit ? Number(limit) : 9;

		return this.tournamentsService.getAllTournaments(
			pageNumber,
			limitNumber,
		);
	}

	@Get(':id')
	async getTournamentById(@Param('id', new ParseUUIDPipe()) id: string) {
		return this.tournamentsService.getTournamentById(id);
	}

	/* @UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin)
	@Roles(Role.organizer) */
	@Post('add')
	async createTournament(@Body() createTournamentDto: CreateTournamentDto) {
		return this.tournamentsService.createTournament(createTournamentDto);
	}

	/* @UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin)
	@Roles(Role.organizer) */
	@Put('update/:id')
	async updateATournament(@Body() updateTournamentDto: UpdateTournamentDto) {
		return this.tournamentsService.updateTournament(updateTournamentDto);
	}
	/* 
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin)
	@Roles(Role.organizer) */
	@Delete('delete/team')
	async deleteTeam(@Body() body: { tournamentId: string; teamId: string }) {
		const { tournamentId, teamId } = body;

		if (!tournamentId || !teamId) {
			throw new BadRequestException(
				'Tournament ID and Team ID must be provided',
			);
		}

		return this.tournamentsService.deleteTeam(tournamentId, teamId);
	}

	/* @UseGuards(JwtAuthGuard)
	@Roles(Role.admin)
	@Roles(Role.organizer) */
	@Put('deleteTournament/:id')
	async deleteTournament(@Param('id', new ParseUUIDPipe()) id: string) {
		return this.tournamentsService.deleteTournament(id);
	}
}
