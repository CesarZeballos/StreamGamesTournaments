import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { GamesService } from './games.service';

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
  async getAllGamesById(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.getAllGamesById(id)
  }
}
