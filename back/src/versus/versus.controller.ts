import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { VersusService } from './versus.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('versus')
@Controller('versus')
export class VersusController {
    constructor(private readonly versusService: VersusService) { }

    @Get()
    async getAllVersus(@Param('tournamentId', new ParseUUIDPipe()) tournamentId: string) {
        return await this.versusService.getAllVersus(tournamentId)
    }

    @Post()
    async createVersus(@Param('tournamentId', new ParseUUIDPipe()) tournamentId: string) {
        return await this.versusService.createVersus(tournamentId)
    }
}
