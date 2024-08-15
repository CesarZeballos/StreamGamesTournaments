import {
	Controller,
	Get,
	Param,
	Query,
	Put,
	Body,
	UseGuards,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiParam,
	ApiQuery,
	ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from 'auth/dto/auth.user.Dto';
import { JwtAuthGuard } from 'auth/guard/jwt-auth.guard';
import { RolesGuard } from 'auth/guard/roles.guard';
import { Roles } from 'auth/decorator/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@ApiOperation({ summary: 'Obtener todos los usuarios' })
	@ApiResponse({
		status: 200,
		description: 'Lista de todos los usuarios',
		example: [
			{
				id: '3e2d4b85-cc50-4afa-9dde-6f403cdfeb84',
				email: 'user1@example.com',
				nickname: 'cesar',
				tokenFirebase:
					'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3RyZWFtZ2FtZXN0b3VybmFtZW50cy0yOWVlNCIsImF1ZCI6InN0cmVhbWdhbWVzdG91cm5hbWVudHMtMjllZTQiLCJhdXRoX3RpbWUiOjE3MjIyMTEwNjAsInVzZXJfaWQiOiJ0U3gxWnd4VjJpU3BMS1RJWm5BWFI1b2ZRU2IyIiwic3ViIjoidFN4MVp3eFYyaVNwTEtUSVpuQVhSNW9mUVNiMiIsImlhdCI6MTcyMjIxMTA2MCwiZXhwIjoxNzIyMjE0NjYwLCJlbWFpbCI6ImNlc2FyZXplYmFsbG9zQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjZXNhcmV6ZWJhbGxvc0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.zzJTaAu-ZQRnkF-2Lp86cbvk_BeL4JHHWPqBoVHO0H3LO6XyMAjnHKMtQ2UBHS0vD-EGtATN5CHpWmGZ0gWfNqbJVF51Hg_InRCXgz80CJH67K-O8MUzQj1vkOTwEVHHb_DuXqT8nOyUKNEuEA1YYetZS_E1g8LsOXlsUaaYwe4WTWex17v66t_gbJuihnSPbvNDFB50NoKDY4LS4PF5PLMaKhGqlOwciatpEnXviSQD_9YJYo8KJKz3Qr4BCEf7jtJu6XJMZlXVd6RXGeUH-eIxR5GLsJGTBlpDO3TZRGtvZvP3lTMazj_BObewxZieQhDFpNAuSu_MTSnBA96mTQ',
				birthdate: '2000-02-01T00:00:00.000Z',
				urlProfile: 'https://example.com/selfie1.jpg',
				urlStream: null,
				role: 'admin',
				createdAt: '2024-08-06T05:00:44.736Z',
				state: true,
				isBanned: false,
				teams: [],
				tournaments: [],
				organizedTournaments: [],
				friends: [],
				sentFriendRequests: [],
				sentMessages: [],
				receivedMessages: [],
				globalChat: [],
			},
		],
	})
	@ApiResponse({
		status: 500,
		description: 'Error interno del servidor',
		example: {
			message: 'Error al obtener usuarios',
			error: 'Internal Server Error',
			statusCode: 500,
		},
	})
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@Get('search')
	@ApiOperation({ summary: 'Buscar un usuario por correo electrónico' })
	@ApiQuery({
		name: 'email',
		required: true,
		description: 'Correo electrónico del usuario',
		example: 'user1@example.com',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario encontrado.',
		example: {
			id: 'd924652c-22d3-4fce-b309-5708b16b12b3',
			email: 'user1@example.com',
			nickname: 'cesar',
			tokenFirebase:
				'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3RyZWFtZ2FtZXN0b3VybmFtZW50cy0yOWVlNCIsImF1ZCI6InN0cmVhbWdhbWVzdG91cm5hbWVudHMtMjllZTQiLCJhdXRoX3RpbWUiOjE3MjIyMTEwNjAsInVzZXJfaWQiOiJ0U3gxWnd4VjJpU3BMS1RJWm5BWFI1b2ZRU2IyIiwic3ViIjoidFN4MVp3eFYyaVNwTEtUSVpuQVhSNW9mUVNiMiIsImlhdCI6MTcyMjIxMTA2MCwiZXhwIjoxNzIyMjE0NjYwLCJlbWFpbCI6ImNlc2FyZXplYmFsbG9zQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjZXNhcmV6ZWJhbGxvc0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.zzJTaAu-ZQRnkF-2Lp86cbvk_BeL4JHHWPqBoVHO0H3LO6XyMAjnHKMtQ2UBHS0vD-EGtATN5CHpWmGZ0gWfNqbJVF51Hg_InRCXgz80CJH67K-O8MUzQj1vkOTwEVHHb_DuXqT8nOyUKNEuEA1YYetZS_E1g8LsOXlsUaaYwe4WTWex17v66t_gbJuihnSPbvNDFB50NoKDY4LS4PF5PLMaKhGqlOwciatpEnXviSQD_9YJYo8KJKz3Qr4BCEf7jtJu6XJMZlXVd6RXGeUH-eIxR5GLsJGTBlpDO3TZRGtvZvP3lTMazj_BObewxZieQhDFpNAuSu_MTSnBA96mTQ',
			birthdate: '2000-02-01T00:00:00.000Z',
			urlProfile: 'https://example.com/selfie1.jpg',
			urlStream: null,
			role: 'admin',
			createdAt: '2024-08-06T05:55:54.546Z',
			state: true,
			isBanned: false,
		},
	})
	@ApiResponse({
		status: 500,
		description: 'Error interno del servidor',
		example: {
			message: 'Error al obtener usuario con email: user184@example.com',
			error: 'Internal Server Error',
			statusCode: 500,
		},
	})
	getUserByEmail(@Query('email') email: string) {
		return this.usersService.getUserByEmail(email);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener un usuario por ID' })
	@ApiParam({
		name: 'id',
		required: true,
		description: 'ID del usuario',
		example: '3e2d4b85-cc50-4afa-9dde-6f403cdfeb84',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario encontrado.',
		example: {
			id: 'd924652c-22d3-4fce-b309-5708b16b12b3',
			email: 'user1@example.com',
			nickname: 'cesar',
			birthdate: '2000-02-01T00:00:00.000Z',
			urlProfile: 'https://example.com/selfie1.jpg',
			urlStream: null,
			role: 'admin',
			createdAt: '2024-08-06T05:55:54.546Z',
			friends: [],
			sentFriendRequests: [],
			sentMessages: [],
			receivedMessages: [],
			globalChat: [],
			organizedTournaments: [],
			tournaments: [],
		},
	})
	@ApiResponse({
		status: 500,
		description: 'Error interno del servidor',
		example: {
			message:
				'Error al obtener usuario con id: 3e2d4b85-cc50-4afa-9dde-6f403cdfeb84',
			error: 'Internal Server Error',
			statusCode: 500,
		},
	})
	getUserById(@Param('id') id: string) {
		return this.usersService.getUserById(id);
	}

	@Put('update')
	@ApiOperation({ summary: 'Actualizar un usuario' })
	@ApiQuery({
		name: 'id',
		required: true,
		description: 'ID del usuario a actualizar',
		example: '3e2d4b85-cc50-4afa-9dde-6f403cdfeb84',
	})
	@ApiBody({
		type: UpdateUserDto,
		description: 'En el body pueden modificar la propiedad que prefieran',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario actualizado con éxito',
		example: {
			id: '11bfaf1d-a47b-4505-98c3-6e251ddab8fa',
			email: 'user2@example.com',
			nickname: 'user2',
			tokenFirebase: 'password123',
			birthdate: '2000-02-01T00:00:00.000Z',
			urlProfile: 'http://example.com/stream',
			urlStream: 'http://example.com/stream',
			role: 'organizer',
			createdAt: '2024-08-06T06:05:24.169Z',
			state: false,
			isBanned: false,
		},
	})
	updateUser(@Query('id') id: string, @Body() data: UpdateUserDto) {
		return this.usersService.updateUser(id, data);
	}

	@Put('delete')
	@ApiOperation({ summary: 'Eliminar un usuario' })
	@ApiQuery({
		name: 'id',
		required: true,
		description: 'ID del usuario a eliminar',
		example: '3e2d4b85-cc50-4afa-9dde-6f403cdfeb84',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario eliminado con éxito',
		example: {
			id: '7de42e11-e455-4ac1-9225-47115b0703a8',
			email: 'user1@example.com',
			nickname: 'cesar',
			tokenFirebase:
				'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3RyZWFtZ2FtZXN0b3VybmFtZW50cy0yOWVlNCIsImF1ZCI6InN0cmVhbWdhbWVzdG91cm5hbWVudHMtMjllZTQiLCJhdXRoX3RpbWUiOjE3MjIyMTEwNjAsInVzZXJfaWQiOiJ0U3gxWnd4VjJpU3BMS1RJWm5BWFI1b2ZRU2IyIiwic3ViIjoidFN4MVp3eFYyaVNwTEtUSVpuQVhSNW9mUVNiMiIsImlhdCI6MTcyMjIxMTA2MCwiZXhwIjoxNzIyMjE0NjYwLCJlbWFpbCI6ImNlc2FyZXplYmFsbG9zQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjZXNhcmV6ZWJhbGxvc0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.zzJTaAu-ZQRnkF-2Lp86cbvk_BeL4JHHWPqBoVHO0H3LO6XyMAjnHKMtQ2UBHS0vD-EGtATN5CHpWmGZ0gWfNqbJVF51Hg_InRCXgz80CJH67K-O8MUzQj1vkOTwEVHHb_DuXqT8nOyUKNEuEA1YYetZS_E1g8LsOXlsUaaYwe4WTWex17v66t_gbJuihnSPbvNDFB50NoKDY4LS4PF5PLMaKhGqlOwciatpEnXviSQD_9YJYo8KJKz3Qr4BCEf7jtJu6XJMZlXVd6RXGeUH-eIxR5GLsJGTBlpDO3TZRGtvZvP3lTMazj_BObewxZieQhDFpNAuSu_MTSnBA96mTQ',
			birthdate: '2000-02-01T00:00:00.000Z',
			urlProfile: 'https://example.com/selfie1.jpg',
			urlStream: null,
			role: 'admin',
			createdAt: '2024-08-06T06:19:35.045Z',
			state: true,
			isBanned: false,
		},
	})
	@ApiResponse({
		status: 500,
		description: 'Error interno del servidor',
		example: {
			message:
				'Error al eliminar usuario con id: 3e2d4b85-cc50-4afa-9dde-6f403cdfeb84',
			error: 'Internal Server Error',
			statusCode: 500,
		},
	})
	disableUser(@Query('id') id: string) {
		return this.usersService.disableUser(id);
	}
}
