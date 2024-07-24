import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';



@Injectable()
export class GamesService {

  constructor(private readonly prisma: PrismaService) { }

  async getAllGames(page: number, limit: number) {
    const skip = (page - 1) * limit
    const games = await this.prisma.games.findMany({
      take: limit,
      skip
    });

    return games
  }

  async getGameById(id: string) {
    return this.prisma.games.findUnique({ where: { id } })
  }

  async postNewGame(name: string, urlImage: string) {
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

  async updateGame(id: string, updateData: { name?: string; imgUrl?: string; tournamentId?: string }) {
    const game = await this.prisma.games.findUnique({ where: { id: id } })

    if (!game) throw new NotFoundException('¡Game not exists!')

    const updateGame = await this.prisma.games.update({
      where: { id },
      data: updateData
    })

    return updateGame
  }
}

