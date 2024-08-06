import {
	Controller,
	Get,
	Param,
	Query,
	Put,
	Body,
	Post,
	Delete,
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
import { AddFriendDto, UpdateUserDto } from 'auth/auth.user.Dto';
/* import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { RolesGuard } from 'auth/roles.guard';
import { Roles } from 'auth/roles.decorator';
import { Role } from '@prisma/client'; */

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	/* @UseGuards(JwtAuthGuard) */
	@Get()
	@ApiOperation({ summary: 'Obtener todos los usuarios' })
	@ApiResponse({
		status: 200,
		description: 'Lista de usuarios',
		example: [
			{
				id: 'bdbaddb4-0990-4cdf-9e9c-536e0031ba36',
				email: 'user1@example.com',
				nickname: 'cesar',
				tokenFirebase:
					'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3RyZWFtZ2FtZXN0b3VybmFtZW50cy0yOWVlNCIsImF1ZCI6InN0cmVhbWdhbWVzdG91cm5hbWVudHMtMjllZTQiLCJhdXRoX3RpbWUiOjE3MjIyMTEwNjAsInVzZXJfaWQiOiJ0U3gxWnd4VjJpU3BMS1RJWm5BWFI1b2ZRU2IyIiwic3ViIjoidFN4MVp3eFYyaVNwTEtUSVpuQVhSNW9mUVNiMiIsImlhdCI6MTcyMjIxMTA2MCwiZXhwIjoxNzIyMjE0NjYwLCJlbWFpbCI6ImNlc2FyZXplYmFsbG9zQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjZXNhcmV6ZWJhbGxvc0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.zzJTaAu-ZQRnkF-2Lp86cbvk_BeL4JHHWPqBoVHO0H3LO6XyMAjnHKMtQ2UBHS0vD-EGtATN5CHpWmGZ0gWfNqbJVF51Hg_InRCXgz80CJH67K-O8MUzQj1vkOTwEVHHb_DuXqT8nOyUKNEuEA1YYetZS_E1g8LsOXlsUaaYwe4WTWex17v66t_gbJuihnSPbvNDFB50NoKDY4LS4PF5PLMaKhGqlOwciatpEnXviSQD_9YJYo8KJKz3Qr4BCEf7jtJu6XJMZlXVd6RXGeUH-eIxR5GLsJGTBlpDO3TZRGtvZvP3lTMazj_BObewxZieQhDFpNAuSu_MTSnBA96mTQ',
				birthdate: '2000-02-01T00:00:00.000Z',
				urlProfile: 'https://example.com/selfie1.jpg',
				urlStream: null,
				role: 'admin',
				createdAt: '2024-08-06T02:51:16.653Z',
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
	getAllUsers() {
		return this.usersService.getAllUsers();
	}


	/* @UseGuards(JwtAuthGuard) */
	@Get('search')
	@ApiOperation({ summary: 'Buscar usuario por correo electrónico' })
	@ApiQuery({
		name: 'email',
		required: true,
		description: 'Correo electrónico del usuario',
		example: 'user1@example.com',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario encontrado',
		example: {
			id: 'd7bb4275-a7af-4797-a646-96916b52d5ea',
			email: 'user1@example.com',
			nickname: 'cesar',
			tokenFirebase:
				'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBjYjQyNzQyYWU1OGY0ZGE0NjdiY2RhZWE0Yjk1YTI5ZmJhMGM1ZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3RyZWFtZ2FtZXN0b3VybmFtZW50cy0yOWVlNCIsImF1ZCI6InN0cmVhbWdhbWVzdG91cm5hbWVudHMtMjllZTQiLCJhdXRoX3RpbWUiOjE3MjIyMTEwNjAsInVzZXJfaWQiOiJ0U3gxWnd4VjJpU3BMS1RJWm5BWFI1b2ZRU2IyIiwic3ViIjoidFN4MVp3eFYyaVNwTEtUSVpuQVhSNW9mUVNiMiIsImlhdCI6MTcyMjIxMTA2MCwiZXhwIjoxNzIyMjE0NjYwLCJlbWFpbCI6ImNlc2FyZXplYmFsbG9zQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjZXNhcmV6ZWJhbGxvc0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.zzJTaAu-ZQRnkF-2Lp86cbvk_BeL4JHHWPqBoVHO0H3LO6XyMAjnHKMtQ2UBHS0vD-EGtATN5CHpWmGZ0gWfNqbJVF51Hg_InRCXgz80CJH67K-O8MUzQj1vkOTwEVHHb_DuXqT8nOyUKNEuEA1YYetZS_E1g8LsOXlsUaaYwe4WTWex17v66t_gbJuihnSPbvNDFB50NoKDY4LS4PF5PLMaKhGqlOwciatpEnXviSQD_9YJYo8KJKz3Qr4BCEf7jtJu6XJMZlXVd6RXGeUH-eIxR5GLsJGTBlpDO3TZRGtvZvP3lTMazj_BObewxZieQhDFpNAuSu_MTSnBA96mTQ',
			birthdate: '2000-02-01T00:00:00.000Z',
			urlProfile: 'https://example.com/selfie1.jpg',
			urlStream: null,
			role: 'admin',
			createdAt: '2024-08-06T02:53:21.815Z',
			state: true,
			isBanned: false,
		},
	})
	@ApiResponse({
		status: 404,
		description: 'Usuario no encontrado',
	})
	getUserByEmail(@Query('email') email: string) {
		return this.usersService.getUserByEmail(email);
	}


	/* 	@UseGuards(JwtAuthGuard) */
	@Get(':id')
	@ApiOperation({ summary: 'Obtener usuario por ID' })
	@ApiParam({
		name: 'id',
		required: true,
		description: 'ID del usuario',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario encontrado',
		example: {
			id: '93dec182-d3ac-4c97-b754-06d84e80cb14',
			email: 'user1@example.com',
			nickname: 'cesar',
			birthdate: '2000-02-01T00:00:00.000Z',
			urlProfile: 'https://example.com/selfie1.jpg',
			urlStream: null,
			role: 'admin',
			createdAt: '2024-08-06T02:55:25.156Z',
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
		status: 404,
		description: 'Usuario no encontrado',
	})
	getUserById(@Param('id') id: string) {
		return this.usersService.getUserById(id);
	}


	/* @UseGuards(JwtAuthGuard) */
	@Put('update')
	@ApiOperation({ summary: 'Actualizar datos del usuario' })
	@ApiBody({ type: UpdateUserDto })
	@ApiResponse({
		status: 200,
		description: 'Usuario actualizado',
	})
	@ApiResponse({
		status: 404,
		description: 'Usuario no encontrado',
	})
	updateUser(@Query('id') id: string, @Body() data: UpdateUserDto) {
		return this.usersService.updateUser(id, data);
	}


	/* @UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin) */
	@Put('delete')
	@ApiOperation({ summary: 'Desactivar usuario' })
	@ApiQuery({
		name: 'id',
		required: true,
		description: 'ID del usuario',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario desactivado',
	})
	@ApiResponse({
		status: 404,
		description: 'Usuario no encontrado',
	})
	disableUser(@Query('id') id: string) {
		return this.usersService.disableUser(id);
	}

	@Post('add-friend')
	@ApiOperation({ summary: 'Agregar un amigo' })
	@ApiBody({ type: AddFriendDto })
	@ApiResponse({
		status: 200,
		description: 'Amigos actualizados',
	})
	@ApiResponse({
		status: 400,
		description: 'Error de solicitud',
	})
	@ApiResponse({
		status: 404,
		description: 'Usuario no encontrado',
	})
	@ApiResponse({
		status: 409,
		description: 'Ya son amigos',
	})
	addFriend(@Body() addFriendDto: AddFriendDto) {
		const { userId, friendId } = addFriendDto;
		return this.usersService.addFriend(userId, friendId);
	}

	@Delete('remove-friend/:id')
	@ApiOperation({ summary: 'Eliminar un amigo' })
	@ApiParam({
		name: 'id',
		required: true,
		description: 'ID del usuario',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@ApiResponse({
		status: 200,
		description: 'Amigo eliminado',
	})
	@ApiResponse({
		status: 400,
		description: 'Error de solicitud',
	})
	@ApiResponse({
		status: 404,
		description: 'Usuario no encontrado',
	})
	removeFriend(@Param('id') id: string, @Param('id2') id2: string) {
		return this.usersService.removeFriend(id, id2);
	}
}
