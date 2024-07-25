import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto, DeleteMemberDto, UpdateTeamDto } from './teams.dto';

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

    @Post()
    async createTeam(@Param('id', ParseUUIDPipe) id: string, @Body() team: CreateTeamDto) {
        return await this.teamsService.createTeam(id, team)
    }

    @Put()
    async updateTeam(@Param('id', ParseUUIDPipe) id: string, @Body() team: UpdateTeamDto) {
        return await this.teamsService.updateTeam(id, team)
    }

    @Put('user')
    async deleteMember(@Param('id', ParseUUIDPipe) id: string, @Body() data: DeleteMemberDto) {
        const { idMember, idTeam } = data
        return await this.teamsService.deleteMember(idTeam, id, idMember)
    }

    @Delete()
    async deleteTeam(@Param('id', ParseUUIDPipe) teamId: string, @Param('id', ParseUUIDPipe) organizerId: string) {
        return await this.teamsService.deleteTeam(organizerId, teamId)
    }
}
