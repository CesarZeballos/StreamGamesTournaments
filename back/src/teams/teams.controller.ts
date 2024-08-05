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
} from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateTeamDto } from './createTeamDto';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
	constructor(private readonly teamsService: TeamsService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los equipos' })
	@ApiQuery({
		name: 'page',
		required: false,
		description: 'Número de página para la paginación',
		example: 1,
	})
	@ApiQuery({
		name: 'limit',
		required: false,
		description: 'Número de elementos por página',
		example: 10,
	})
	@ApiResponse({
		status: 200,
		description: 'Lista de equipos obtenida exitosamente.',
	})
	@ApiResponse({ status: 400, description: 'Solicitud inválida.' })
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
	@ApiOperation({ summary: 'Obtener un equipo por su ID' })
	@ApiParam({ name: 'id', type: 'string', description: 'ID del equipo' })
	@ApiResponse({ status: 200, description: 'Equipo encontrado.' })
	@ApiResponse({ status: 404, description: 'Equipo no encontrado.' })
	async getTeamById(@Param('id', ParseUUIDPipe) id: string) {
		return this.teamsService.getTeamById(id);
	}

	@Post()
	@ApiOperation({ summary: 'Crear un nuevo equipo' })
	@ApiBody({ type: CreateTeamDto, description: 'Datos del nuevo equipo' })
	@ApiResponse({ status: 201, description: 'Equipo creado exitosamente.' })
	@ApiResponse({ status: 400, description: 'Solicitud inválida.' })
	async createTeam(@Body() team: CreateTeamDto) {
		return await this.teamsService.createTeam(team);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Actualizar un equipo' })
	@ApiParam({ name: 'id', type: 'string', description: 'ID del equipo' })
	@ApiBody({
		type: UpdateTeamDto,
		description: 'Datos actualizados del equipo',
	})
	@ApiResponse({
		status: 200,
		description: 'Equipo actualizado exitosamente.',
	})
	@ApiResponse({ status: 400, description: 'Solicitud inválida.' })
	@ApiResponse({ status: 404, description: 'Equipo no encontrado.' })
	async updateTeam(@Body() team: UpdateTeamDto) {
		return await this.teamsService.updateTeam(team);
	}

	@Put('deleteMember')
	@ApiOperation({ summary: 'Eliminar un miembro del equipo' })
	@ApiBody({
		description: 'Datos necesarios para eliminar un miembro del equipo',
		type: Object,
		examples: {
			example1: {
				value: { idMember: 'abc123', idTeam: 'team123' },
				description: 'Ejemplo de datos para eliminar un miembro',
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Miembro del equipo eliminado exitosamente.',
	})
	@ApiResponse({ status: 400, description: 'Solicitud inválida.' })
	@ApiResponse({
		status: 404,
		description: 'Miembro o equipo no encontrado.',
	})
	async deleteMember(@Body() data: { idMember: string; idTeam: string }) {
		const { idMember, idTeam } = data;
		return await this.teamsService.deleteMember(idTeam, idMember);
	}

	@Delete(':teamId')
	@ApiOperation({ summary: 'Eliminar un equipo' })
	@ApiParam({ name: 'teamId', type: 'string', description: 'ID del equipo' })
	@ApiResponse({ status: 200, description: 'Equipo eliminado exitosamente.' })
	@ApiResponse({ status: 404, description: 'Equipo no encontrado.' })
	async deleteTeam(@Param('teamId', ParseUUIDPipe) teamId: string) {
		return await this.teamsService.deleteTeam(teamId);
	}
}
