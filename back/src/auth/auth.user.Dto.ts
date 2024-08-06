import {
	IsString,
	IsEmail,
	IsNotEmpty,
	IsDateString,
	IsOptional,
	IsBoolean,
	IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { Role } from '@prisma/client';

export class SignInDto {
	@ApiProperty({
		description: 'Dirección de correo electrónico del usuario',
		example: 'user@example.com',
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		description: 'Token de Firebase del usuario',
		example: 'someFirebaseToken',
	})
	@IsString()
	@IsNotEmpty()
	tokenFirebase: string;
}

export class CreateUserDto extends SignInDto {
	@ApiProperty({
		description: 'Apodo del usuario',
		example: 'JohnDoe',
	})
	@IsString()
	@IsNotEmpty()
	nickname: string;

	@ApiProperty({
		description: 'Fecha de nacimiento del usuario',
		example: '2000-01-01T00:00:00.000Z',
	})
	@IsNotEmpty()
	@IsDateString()
	birthdate: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {

	@ApiProperty({
		description: 'ID of the user',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsUUID()
	@IsNotEmpty()
	id: string

	@ApiPropertyOptional({
		description: 'URL del stream del usuario',
		example: 'http://example.com/stream',
	})
	@IsOptional()
	@IsString()
	urlStream?: string;

	@ApiPropertyOptional({
		description: 'URL profile del usuario',
		example: 'http://example.com/stream',
	})
	@IsOptional()
	@IsString()
	urlProfile?: string;

	@ApiPropertyOptional({
		description: 'Estado del usuario',
		example: true,
	})
	@IsOptional()
	@IsBoolean()
	state?: boolean;
}

export class AddFriendDto {
	@ApiProperty({
		description: 'ID of the user',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsUUID()
	@IsNotEmpty()
	userId: string

	@ApiProperty({
		description: 'ID of the friend',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsUUID()
	@IsNotEmpty()
	friendId: string

}