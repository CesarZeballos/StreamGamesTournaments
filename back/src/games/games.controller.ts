import {
	Body,
	ConflictException,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	NotFoundException,
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
	ApiParam,
	ApiBody,
} from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto, UpdateGameDto } from './dto/games.dto';
/* import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { RolesGuard } from 'auth/roles.guard';
import { Roles } from 'auth/roles.decorator';
import { Role } from '@prisma/client'; */

@ApiTags('Games')
@Controller('games')
export class GamesController {
	constructor(private readonly gamesService: GamesService) { }

	/* 	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin)
	@Roles(Role.organizer) */
	@Get()
	@ApiOperation({ summary: 'Obtener todos los juegos' })
	@ApiResponse({
		status: 200,
		description: 'Lista de todos los juegos',
		example: [
			{
				id: '2a195f55-d16e-4c2b-86d7-e1f3fed02ce8',
				name: 'League of Legends',
				urlImage: 'https://example.com/images/game3.png',
				state: true,
				tournaments: [
					{
						id: 'c6a16bf5-83f8-4e77-a174-18e94671c0d5',
						nameTournament: 'League of Legends',
						startDate: '2024-11-30T21:29:00.438Z',
						createdAt: '2024-08-06T09:02:14.536Z',
						category: 'beginner',
						organizerId: 'f5c3b368-ee05-458b-abd8-c7f2fbe786b6',
						gameId: '2a195f55-d16e-4c2b-86d7-e1f3fed02ce8',
						membersNumber: 5,
						maxTeams: 4,
						price: 5500,
						urlAvatar: 'https://example.com/stream10',
						awards: ['$500', '$400', '$200'],
						description:
							"Watch a League of Legends tournament live! Let's see the moment when 10 players are spewing steam from their heads with the aim of beating the enemy team and getting the tournament award!",
						state: true,
					},
				],
			},
		],
	})
	async getAllGames(
		@Query('page') page: string,
		@Query('limit') limit: string,
	) {
		try {
			const pageNumber = page ? Number(page) : 1;
			const limitNumber = limit ? Number(limit) : 9;

			if (isNaN(pageNumber) || isNaN(limitNumber)) {
				throw new HttpException(
					'Invalid query parameters',
					HttpStatus.BAD_REQUEST,
				);
			}

			const games = await this.gamesService.getAllGames(
				pageNumber,
				limitNumber,
			);
			return games;
		} catch (error) {
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	/* @UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin)
	@Roles(Role.organizer) */
	@Get(':id')
	@ApiOperation({ summary: 'Obtener un juego por ID' })
	@ApiParam({
		name: 'id',
		required: true,
		description: 'ID del juego',
		example: 'af3842f8-4daf-4626-81fb-13feb94b9dfe',
	})
	@ApiResponse({
		status: 200,
		description: 'Juego encontrado',
		example: {
			id: '2a195f55-d16e-4c2b-86d7-e1f3fed02ce8',
			name: 'League of Legends',
			urlImage: 'https://example.com/images/game3.png',
			state: true,
			tournaments: [
				{
					id: 'c6a16bf5-83f8-4e77-a174-18e94671c0d5',
					nameTournament: 'League of Legends',
					startDate: '2024-11-30T21:29:00.438Z',
					createdAt: '2024-08-06T09:02:14.536Z',
					category: 'beginner',
					organizerId: 'f5c3b368-ee05-458b-abd8-c7f2fbe786b6',
					gameId: '2a195f55-d16e-4c2b-86d7-e1f3fed02ce8',
					membersNumber: 5,
					maxTeams: 4,
					price: 5500,
					urlAvatar: 'https://example.com/stream10',
					awards: ['$500', '$400', '$200'],
					description:
						"Watch a League of Legends tournament live! Let's see the moment when 10 players are spewing steam from their heads with the aim of beating the enemy team and getting the tournament award!",
					state: true,
				},
			],
		},
	})
	async getGameById(@Param('id', new ParseUUIDPipe()) id: string) {
		try {
			const game = await this.gamesService.getGameById(id);
			if (!game) {
				throw new HttpException(
					'Juego no encontrado',
					HttpStatus.NOT_FOUND,
				);
			}
			return game;
		} catch (error) {
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	/* 	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin) */
	@Post('create')
	@ApiOperation({ summary: 'Crear un nuevo juego' })
	@ApiBody({ type: CreateGameDto })
	@ApiResponse({
		status: 201,
		description: 'Juego creado con éxito',
		example: {
			id: 'ca8adb57-9cb6-4b88-a45f-daffc54250ac',
			name: 'GTA V',
			urlImage: 'https://example.com/image.jpg',
			state: true,
		},
	})
	@ApiResponse({
		status: 409,
		description: 'Conflicto: El juego ya existe',
		example: {
			statusCode: 409,
			message: '¡Game with name: GTA V exists!',
		},
	})
	@ApiResponse({
		status: 500,
		description: 'Error interno del servidor',
		example: {
			message: 'Error al crear un nuevo juego',
			error: 'Internal Server Error',
			statusCode: 500,
		},
	})
	async postNewGame(@Body() game: CreateGameDto) {
		try {
			const { name, urlImage } = game;
			return await this.gamesService.postNewGame(name, urlImage);
		} catch (error) {
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	/* 	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin) */
	@Put('update/:id')
	@ApiOperation({ summary: 'Actualizar un juego' })
	@ApiBody({
		type: UpdateGameDto,
		description: 'En el body pueden modificar la propiedad que prefieran',
	})
	@ApiResponse({
		status: 200,
		description: 'Juego actualizado con éxito',
		example: {
			id: '123e4567-e89b-12d3-a456-426614174000',
			name: 'newNameOfGame',
			urlImage: 'https://example.com/images/game1.png',
			state: false,
		},
	})
	async updateGame(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() game: UpdateGameDto,
	) {
		return await this.gamesService.updateGame(id, game);
	}

	/* 	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin) */
	@Put('delete/:id')
	@ApiOperation({ summary: 'Eliminar un juego' })
	@ApiParam({
		name: 'id',
		required: true,
		description: 'ID del juego a eliminar',
		example: 'af3842f8-4daf-4626-81fb-13feb94b9dfe',
	})
	@ApiResponse({
		status: 200,
		description: 'Juego eliminado con éxito',
		example: {
			id: 'af3842f8-4daf-4626-81fb-13feb94b9dfe',
			name: 'Game 1',
			urlImage: 'https://example.com/images/game1.png',
			state: false,
		},
	})
	@ApiResponse({
		status: 404,
		description: 'Juego no encontrado',
		example: {
			message:
				'¡Juego con id: af3842f8-4daf-4626-81fb-13feb94b9dfe no existe!',
			error: 'Not Found',
			statusCode: 404,
		},
	})
	@ApiResponse({
		status: 409,
		description: 'Juego ya eliminado',
		example: {
			statusCode: 409,
			message:
				'¡Juego con id: 31c30999-00a9-4184-b011-c726bde22f04 ya fue eliminado!',
		},
	})
	@ApiResponse({
		status: 500,
		description: 'Error interno del servidor',
		example: {
			message:
				'Error al eliminar juego con id: af3842f8-4daf-4626-81fb-13feb94b9dfe',
			error: 'Internal Server Error',
			statusCode: 500,
		},
	})
	async deleteGame(@Param('id', new ParseUUIDPipe()) id: string) {
		try {
			return await this.gamesService.deleteGame(id);
		} catch (error) {
			if (
				error instanceof ConflictException ||
				error instanceof NotFoundException
			) {
				throw error;
			}
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
