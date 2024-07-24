import { Controller, Get } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async getAllGames() {
    return this.gamesService.getAllGames();
  }
}
