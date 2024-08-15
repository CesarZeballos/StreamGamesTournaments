import {
	BadRequestException,
	ConflictException,
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGameDto, UpdateGameDto } from './dto/games.dto';
import { Game } from '@prisma/client';
import { Fetchs } from 'utils/fetch.cb';


@Injectable()
export class GamesService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly fetchs: Fetchs
	) { }

	async getAllGames(page: number, limit: number): Promise<Game[]> {
		try {
			const skip = (page - 1) * limit;
			const games = await this.prisma.game.findMany({
				take: limit,
				skip,
				include: { tournaments: true },
			});

			return games;
		} catch (error) {
			throw new HttpException(
				'Error al obtener juegos',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getGameById(id: string): Promise<Game | null> {
		try {
			const game = await this.prisma.game.findUnique({
				where: { id },
				include: { tournaments: true },
			});
			if (!game) {
				throw new HttpException(
					'Juego no encontrado',
					HttpStatus.NOT_FOUND,
				);
			}
			return game;
		} catch (error) {
			throw new HttpException(
				'Error al obtener juego',
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async postNewGame(name: string, urlImage: string, description: string): Promise<CreateGameDto> {
		try {
			const gameData = await this.fetchs.FindGamesByUnique({ name })


			if (gameData) {
				throw new ConflictException(
					`¡Juego con nombre: ${name} ya existe!`,
				);
			}

			const newGame = await this.prisma.game.create({
				data: {
					name,
					urlImage,
					description,
					state: true,
				},
			});

			return newGame;
		} catch (error) {
			throw new HttpException(
				error.message || 'Error al crear un nuevo juego',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async updateGame(
		id: string,
		updateData: UpdateGameDto,
	  ): Promise<UpdateGameDto> {
		const game = await this.prisma.game.findUnique({ where: { id: id } });
		if (!game)
		  throw new NotFoundException(`¡Juego con id: ${id} no existe!`);
		if (updateData.state !== undefined && typeof updateData.state !== 'boolean') {
		  throw new BadRequestException('El estado del juego debe ser un valor booleano');
		}
	  
		const updateGame = await this.prisma.game.update({
		  where: { id },
		  data: updateData,
		});
		return updateGame;
}

	async deleteGame(id: string): Promise<Game> {
		try {
			const game = await this.prisma.game.findUnique({ where: { id } });

			if (!game) {
				throw new NotFoundException(`¡Juego con id: ${id} no existe!`);
			}

			if (game.state === false) {
				throw new ConflictException(
					`¡Juego con id: ${id} ya fue eliminado!`,
				);
			}

			return await this.prisma.game.update({
				where: { id },
				data: { state: false },
			});
		} catch (error) {
			throw new HttpException(
				error.message || 'Error al eliminar juego',
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
