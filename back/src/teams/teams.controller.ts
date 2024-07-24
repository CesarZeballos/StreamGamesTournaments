import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) { }

    @Get()
    async getAllTeams(@Query('page') page: string, @Query('limit') limit: string) {
        !page ? (page = '1') : page
        !limit ? (limit = '9') : limit
        if (page && limit) return this.teamsService.getAllTeams(Number(page), Number(limit));
    }

    @Get(':id')
    async getTeamById(@Param('id', ParseUUIDPipe) id: string) {
        return this.teamsService.getTeamById(id)
    }
}
