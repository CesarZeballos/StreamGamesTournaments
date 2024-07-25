import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto, UpdateGameDto } from './games.dto';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los juegos' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página para paginación' })
  @ApiQuery({ name: 'limit', required: false, description: 'Número de elementos por página' })
  @ApiResponse({ status: 200, description: 'Lista de juegos obtenida exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  async getAllGames(
    @Query('page') page: string,
    @Query('limit') limit: string
  ) {
    !page ? (page = '1') : page;
    !limit ? (limit = '9') : limit;
    if (page && limit) return await this.gamesService.getAllGames(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un juego por su ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del juego' })
  @ApiResponse({ status: 200, description: 'Juego encontrado.' })
  @ApiResponse({ status: 404, description: 'Juego no encontrado.' })
  async getGameById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.gamesService.getGameById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo juego' })
  @ApiResponse({ status: 201, description: 'Juego creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  async postNewGame(@Body() game: CreateGameDto) {
    const { name, urlImage } = game;
    return await this.gamesService.postNewGame(name, urlImage);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un juego por su ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del juego' })
  @ApiResponse({ status: 200, description: 'Juego actualizado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  @ApiResponse({ status: 404, description: 'Juego no encontrado.' })
  async updateGame(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() game: Partial<CreateGameDto>
  ) {
    return await this.gamesService.updateGame(id, game);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un juego por su ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del juego' })
  @ApiResponse({ status: 200, description: 'Juego eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Juego no encontrado.' })
  async deleteGame(@Param('id', ParseUUIDPipe) id: string) {
    return await this.gamesService.deleteGame(id);
  }
}
