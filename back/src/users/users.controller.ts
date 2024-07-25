import { Controller, Get, Param, Query, Put, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Detalles del usuario' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

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

  @Put('update')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiQuery({
    name: 'id',
    type: 'string',
    description: 'ID del usuario a actualizar',
  })
  @ApiBody({ description: 'Datos del usuario a actualizar' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos para actualización',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  updateUser(@Query('id') id: string, @Body() data: Partial<User>) {
    return this.usersService.updateUser(id, data);
  }

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
