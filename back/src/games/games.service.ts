import { Injectable } from '@nestjs/common';
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

  async getAllGamesById(id) {
    return this.prisma.games.findUnique({ where: { id } })
  }
}

