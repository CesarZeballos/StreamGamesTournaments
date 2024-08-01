import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateGameDto, UpdateGameDto } from './games.dto';
import { Game } from '@prisma/client';


export interface GameWithTournamentId {
  id: string;
  name: string;
  urlImage: string;
  tournamentId?: string;
}

@Injectable()
export class GamesService {

  constructor(private readonly prisma: PrismaService) { }

  async getAllGames(page: number, limit: number): Promise<Game[]> {
    const skip = (page - 1) * limit
    const games = await this.prisma.game.findMany({
      take: limit,
      skip,
      include:{tournaments:true}
    });

    return games
  }

  async getGameById(id: string): Promise<Game | null> {
    return await this.prisma.game.findUnique({ where: { id }, include: {tournaments: true} })
  }

  async postNewGame(name: string, urlImage: string): Promise<CreateGameDto> {
    const gameNAme = await this.prisma.game.findUnique({ where: { name: name } })

    if (gameNAme) throw new ConflictException(`¡Game with name: ${name} exists!`)

    const newGame = await this.prisma.game.create({
      data: {
        name: name,
        urlImage: urlImage
      }
    })

    return newGame
  }

  async updateGame(id: string, updateData: UpdateGameDto): Promise<UpdateGameDto> {
    const game = await this.prisma.game.findUnique({ where: { id: id } })

    if (!game) throw new NotFoundException(`¡Game with id: ${id} not exists!`)

    const updateGame = await this.prisma.game.update({
      where: { id },
      data: updateData
    })

    return updateGame
  }

  async deleteGame(id: string): Promise<Game> {
    const game = await this.prisma.game.findUnique({ where: { id } })
    if(game.state === false) throw new ConflictException(`¡Game with id: ${id} not exists!`)
    if (!game) throw new NotFoundException(`¡Game with id: ${id} not exists!`)

    return await this.prisma.game.update({where: {id}, data: {state:false}})
  }
}

