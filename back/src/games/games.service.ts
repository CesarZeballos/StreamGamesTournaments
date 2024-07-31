import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; 
import { CreateGameDto, UpdateGameDto } from './games.dto';
import { Games } from '@prisma/client';


export interface GameWithTournamentId {
  id: string;
  name: string;
  urlImage: string;
  tournamentId?: string;
}

@Injectable()
export class GamesService {

  constructor(private readonly prisma: PrismaService) { }

  async getAllGames(page: number, limit: number): Promise<Games[]> {
    const skip = (page - 1) * limit
    const games = await this.prisma.games.findMany({
      take: limit,
      skip
    });

    return games
  }

  async getGameById(id: string): Promise<Games | null> {
    return await this.prisma.games.findUnique({ where: { id } })
  }

  async postNewGame(name: string, urlImage: string): Promise<CreateGameDto> {
    const gameNAme = await this.prisma.games.findUnique({ where: { name: name } })

    if (gameNAme) throw new ConflictException('¡Game already exists!')

    const newGame = await this.prisma.games.create({
      data: {
        name: name,
        urlImage: urlImage
      }
    })

    return newGame
  }

  async updateGame(id: string, updateData: UpdateGameDto): Promise<UpdateGameDto> {
    const game = await this.prisma.games.findUnique({ where: { id: id } })

    if (!game) throw new NotFoundException('¡Game not exists!')

    const updateGame = await this.prisma.games.update({
      where: { id },
      data: updateData
    })

    return updateGame
  }

  async deleteGame(id: string): Promise<Games> {
    const game = await this.prisma.games.findUnique({ where: { id } })

    if (!game) throw new NotFoundException('¡Game not exists!')

    return await this.prisma.games.delete({ where: { id } })
  }
}

