import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './games.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Get()
  async getAllGames(@Query('page') page: string, @Query('limit') limit: string) {
    !page ? (page = '1') : page
    !limit ? (limit = '9') : limit
    if (page && limit) return this.gamesService.getAllGames(Number(page), Number(limit));
  }

  @Get(':id')
  async getGameById(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.getGameById(id)
  }

  @Post()
  async postNewGame(@Body() game: CreateGameDto) {
    const { name, urlImage } = game

    return this.gamesService.postNewGame(name, urlImage)
  }

  @Put()
  async updateGame(@Param('id', ParseUUIDPipe) id: string, @Body() game: Partial<CreateGameDto>) {

    return this.gamesService.updateGame(id, game)
  }
}