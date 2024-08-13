import { Controller, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { VersusService } from './versus.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('versus')
@Controller('versus')
export class VersusController {
    constructor(private readonly versusService: VersusService) { }

    @Post(':tournamentId')
    async createVersus(@Param('tournamentId', new ParseUUIDPipe()) tournamentId: string) {
        console.log(tournamentId);
        
        return await this.versusService.createVersus(tournamentId)
    }

    @Put(':winnerId/:versusId')
    async updateWinnerRound(
        @Param('winnerId', new ParseUUIDPipe()) winnerId: string,
        @Param('versusId', new ParseUUIDPipe()) versusId: string
    ) {
        return await this.versusService.updateWinnerRound(winnerId, versusId)
    }
}
