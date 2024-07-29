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
import { CreateTeamDto, DeleteMemberDto, UpdateTeamDto } from './teams.dto';

@ApiTags('teams') // Etiqueta para agrupar en la documentación
@Controller('teams')
export class TeamsController {
	constructor(private readonly teamsService: TeamsService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los equipos' })
	@ApiQuery({
		name: 'page',
		required: false,
		description: 'Número de página para la paginación',
	})
	@ApiQuery({
		name: 'limit',
		required: false,
		description: 'Número de elementos por página',
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
		const pageNumber = page ? parseInt(page, 10) : 1;
		const limitNumber = limit ? parseInt(limit, 10) : 9;
		return this.teamsService.getAllTeams(pageNumber, limitNumber);
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
	async createTeam(
		@Body() team: CreateTeamDto,
	) {
		// Aquí asumo que `id` debe ser pasado en el cuerpo también, puedes modificar esto si `id` debe ser parte del DTO.
		const { id, ...rest } = team;
		return await this.teamsService.createTeam(id, rest);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Actualizar un equipo' })
	@ApiParam({ name: 'id', type: 'string', description: 'ID del equipo' })
	@ApiBody({
		description: 'Datos del equipo a actualizar',
		type: UpdateTeamDto,
		examples: {
			default: {
				summary: 'Ejemplo de actualización de equipo',
				value: {
					name: 'Nuevo Nombre del Equipo',
					urlAvatar: 'https://example.com/new-avatar.jpg',
					tournamentId: '123e4567-e89b-12d3-a456-426614174000',
					user: ['123e4567-e89b-12d3-a456-426614174000'],
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Equipo actualizado exitosamente.',
	})
	@ApiResponse({ status: 400, description: 'Solicitud inválida.' })
	@ApiResponse({ status: 404, description: 'Equipo no encontrado.' })
	async updateTeam(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() team: UpdateTeamDto,
	) {
		return await this.teamsService.updateTeam(id, team);
	}

	@Put('user')
	@ApiOperation({ summary: 'Eliminar un miembro del equipo' })
	@ApiBody({
		type: DeleteMemberDto,
		description: 'Datos del miembro a eliminar',
	})
	@ApiResponse({
		status: 200,
		description: 'Miembro eliminado del equipo exitosamente.',
	})
	@ApiResponse({ status: 400, description: 'Solicitud inválida.' })
	@ApiResponse({
		status: 404,
		description: 'Equipo o miembro no encontrado.',
	})
	async deleteMember(
		@Body() data: DeleteMemberDto,
	) {
		const { idMember, idTeam, idOrganizer } = data;
		return await this.teamsService.deleteMember(idTeam, idOrganizer, idMember);
	}

	@Delete(':teamId/:organizerId')
	@ApiOperation({ summary: 'Eliminar un equipo' })
	@ApiParam({ name: 'teamId', type: 'string', description: 'ID del equipo' })
	@ApiParam({
		name: 'organizerId',
		type: 'string',
		description: 'ID del organizador',
	})
	@ApiResponse({ status: 200, description: 'Equipo eliminado exitosamente.' })
	@ApiResponse({ status: 404, description: 'Equipo no encontrado.' })
	async deleteTeam(
		@Param('teamId', ParseUUIDPipe) teamId: string,
		@Param('organizerId', ParseUUIDPipe) organizerId: string,
	) {
		return await this.teamsService.deleteTeam(organizerId, teamId);
	}
}
