import {
	IsString,
	IsEmail,
	IsNotEmpty,
	MinLength,
	IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
	@ApiProperty({
		description: 'Dirección de correo electrónico del usuario',
		example: 'user@example.com',
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'Apodo del usuario',
		example: 'JohnDoe',
	})
	@IsString()
	@IsNotEmpty()
	nickName: string;

	@ApiProperty({
		description: 'Contraseña del usuario (mínimo 8 caracteres)',
		example: 'password123',
	})
	@IsString()
	@MinLength(8)
	tokenFirebase: string;

	@ApiProperty({
		description: 'Fecha de nacimiento del usuario',
		example: '2000-01-01T00:00:00.000Z',
	})
	@IsString()
	birthDate: string;

	@ApiProperty({
		description: 'ID del equipo asociado al usuario (opcional)',
		example: 'teamId123',
		required: false,
	})
	@IsOptional()
	@IsString()
	teamId?: string;
}

export class SignInDto {
	@ApiProperty({
		description: 'Dirección de correo electrónico del usuario',
		example: 'user@example.com',
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'Contraseña del usuario',
		example: 'password123',
	})
	@IsString()
	@IsNotEmpty()
	tokenFirebase: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
