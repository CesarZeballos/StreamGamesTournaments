import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiQuery,
	ApiParam,
	ApiBody,
} from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto, UpdateGameDto } from './games.dto';
/* import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { RolesGuard } from 'auth/roles.guard';
import { Roles } from 'auth/roles.decorator';
import { Role } from '@prisma/client'; */

@ApiTags('games')
@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) { }

	/* 	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin)
	@Roles(Role.organizer) */
	@Get()
	async getAllGames(
		@Query('page') page: string,
		@Query('limit') limit: string,
	) {
		!page ? (page = '1') : page;
		!limit ? (limit = '9') : limit;
		if (page && limit)
			return await this.gamesService.getAllGames(
				Number(page),
				Number(limit),
			);
	}

	/* @UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin)
	@Roles(Role.organizer) */
	@Get(':id')
	async getGameById(@Param('id', new ParseUUIDPipe()) id: string) {
		return await this.gamesService.getGameById(id);
	}
	/* 	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin) */
	@Post()
	async postNewGame(@Body() game: CreateGameDto) {
		const { name, urlImage } = game;
		return await this.gamesService.postNewGame(name, urlImage);
	}

	/* 	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin) */
	@Put(':id')
	async updateGame(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() game: UpdateGameDto,
	) {
		return await this.gamesService.updateGame(id, game);
	}

	/* 	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin) */
	@Put(':id')
	async deleteGame(@Param('id', new ParseUUIDPipe()) id: string) {
		return await this.gamesService.deleteGame(id);
	}
}
