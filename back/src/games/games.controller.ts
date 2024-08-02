import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiQuery,
	ApiParam,
	ApiBody,
	PartialType,
} from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto, UpdateGameDto } from './games.dto';
import { UpdateTeamDto } from 'teams/teams.dto';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { RolesGuard } from 'auth/roles.guard';
import { Roles } from 'auth/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('games')
@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin)
	@Roles(Role.organizer)
	@Get()
	@ApiOperation({ summary: 'Obtener todos los juegos' })
	@ApiQuery({
		name: 'page',
		required: false,
		description: 'Número de página para paginación',
	})
	@ApiQuery({
		name: 'limit',
		required: false,
		description: 'Número de elementos por página',
	})
	@ApiResponse({
		status: 200,
		description: 'Lista de juegos obtenida exitosamente.',
	})
	@ApiResponse({ status: 400, description: 'Solicitud inválida.' })
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

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin)
	@Roles(Role.organizer)
	@Get(':id')
	@ApiOperation({ summary: 'Obtener un juego por su ID' })
	@ApiParam({ name: 'id', type: 'string', description: 'ID del juego' })
	@ApiResponse({ status: 200, description: 'Juego encontrado.' })
	@ApiResponse({ status: 404, description: 'Juego no encontrado.' })
	async getGameById(@Param('id', ParseUUIDPipe) id: string) {
		return await this.gamesService.getGameById(id);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin)
	@Post()
	@ApiOperation({ summary: 'Crear un nuevo juego' })
	@ApiResponse({ status: 201, description: 'Juego creado exitosamente.' })
	@ApiResponse({ status: 400, description: 'Solicitud inválida.' })
	async postNewGame(@Body() game: CreateGameDto) {
		const { name, urlImage } = game;
		return await this.gamesService.postNewGame(name, urlImage);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin)
	@Put(':id')
	@ApiOperation({ summary: 'Actualizar un juego por su ID' })
	@ApiParam({ name: 'id', type: 'string', description: 'ID del juego' })
	@ApiBody({
		description: 'Datos para actualizar el juego',
		type: UpdateGameDto,
		examples: {
			default: {
				summary: 'Ejemplo de actualización de juego',
				value: {
					name: 'Nuevo Nombre del Juego',
					urlImage: 'https://example.com/new-image.jpg',
					tournamentId: '123e4567-e89b-12d3-a456-426614174000',
					user: ['123e4567-e89b-12d3-a456-426614174000'],
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Juego actualizado exitosamente.',
	})
	@ApiResponse({ status: 400, description: 'Solicitud inválida.' })
	@ApiResponse({ status: 404, description: 'Juego no encontrado.' })
	async updateGame(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() game: UpdateGameDto,
	) {
		return await this.gamesService.updateGame(id, game);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin)
	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar un juego por su ID' })
	@ApiParam({ name: 'id', type: 'string', description: 'ID del juego' })
	@ApiResponse({ status: 200, description: 'Juego eliminado exitosamente.' })
	@ApiResponse({ status: 404, description: 'Juego no encontrado.' })
	async deleteGame(@Param('id', ParseUUIDPipe) id: string) {
		return await this.gamesService.deleteGame(id);
	}
}
