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
import { UpdateUserDto } from 'auth/auth.user.Dto';
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
		description: 'Lista de todos los usuarios',
	})
	@ApiResponse({ status: 500, description: 'Error del servidor' })
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	/* @UseGuards(JwtAuthGuard) */
	@Get('search')
	@ApiOperation({ summary: 'Buscar un usuario por correo electrónico' })
	@ApiQuery({
		name: 'email',
		type: 'string',
		description: 'Correo electrónico del usuario',
	})
	@ApiResponse({
		status: 200,
		description: 'Detalles del usuario encontrado',
	})
	@ApiResponse({ status: 404, description: 'Usuario no encontrado' })
	getUserByEmail(@Query('email') email: string) {
		return this.usersService.getUserByEmail(email);
	}

	/* 	@UseGuards(JwtAuthGuard) */
	@Get(':id')
	@ApiOperation({ summary: 'Obtener un usuario por ID' })
	@ApiParam({ name: 'id', type: 'string', description: 'ID del usuario' })
	@ApiResponse({ status: 200, description: 'Detalles del usuario' })
	@ApiResponse({ status: 404, description: 'Usuario no encontrado' })
	getUserById(@Param('id') id: string) {
		return this.usersService.getUserById(id);
	}

	/* @UseGuards(JwtAuthGuard) */
	@Put('update')
	@ApiOperation({ summary: 'Actualizar un usuario' })
	@ApiQuery({
		name: 'id',
		type: 'string',
		description: 'ID del usuario a actualizar',
	})
	@ApiBody({
		description: 'Datos del usuario a actualizar',
		type: UpdateUserDto,
		examples: {
			default: {
				summary: 'Ejemplo de actualización de usuario',
				value: {
					email: 'newuser@example.com',
					nickName: 'JaneDoe',
					password: 'newpassword123',
					birthDate: '1990-01-01T00:00:00.000Z',
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario actualizado exitosamente',
	})
	@ApiResponse({
		status: 400,
		description: 'Datos inválidos para actualización',
	})
	@ApiResponse({ status: 404, description: 'Usuario no encontrado' })
	updateUser(@Query('id') id: string, @Body() data: UpdateUserDto) {
		return this.usersService.updateUser(id, data);
	}

	/* @UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.admin) */
	@Put('delete')
	@ApiOperation({ summary: 'Deshabilitar un usuario' })
	@ApiQuery({
		name: 'id',
		type: 'string',
		description: 'ID del usuario a deshabilitar',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario deshabilitado exitosamente',
	})
	@ApiResponse({ status: 404, description: 'Usuario no encontrado' })
	disableUser(@Query('id') id: string) {
		return this.usersService.disableUser(id);
	}
}
