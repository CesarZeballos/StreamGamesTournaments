import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiParam,
	ApiQuery,
	ApiBody,
	ApiProperty,
} from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import {
	CreateTeamDto,
	DeleteMemberForTeamDto,
	UpdateTeamDto,
} from './dto/createTeamDto';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
	constructor(private readonly teamsService: TeamsService) { }

	@Get()
	async getAllTeams(
		@Query('page') page: string,
		@Query('limit') limit: string,
	) {
		!page ? (page = '1') : page;
		!limit ? (limit = '10') : limit;
		if (page && limit)
			return this.teamsService.getAllTeams(Number(page), Number(limit));
	}

	@Get(':id')
	async getTeamById(@Param('id', ParseUUIDPipe) id: string) {
		return this.teamsService.getTeamById(id);
	}

	@Post()
	async createTeam(@Body() team: CreateTeamDto) {
		return await this.teamsService.createTeam(team);
	}

	@Put(':id')
	async updateTeam(@Body() team: UpdateTeamDto) {
		return await this.teamsService.updateTeam(team);
	}

	@Put('deleteMember')
	async deleteMember(@Body() data: DeleteMemberForTeamDto) {
		const { teamId, memberId } = data;
		return await this.teamsService.deleteMember(teamId, memberId);
	}

	@Put(':teamId')
	async deleteTeam(@Param('teamId', ParseUUIDPipe) teamId: string) {
		return await this.teamsService.deleteTeam(teamId);
	}
}
