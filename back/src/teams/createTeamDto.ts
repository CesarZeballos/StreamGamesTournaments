import {
	IsArray,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUrl,
	IsUUID,
	Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTeamDto {
	@ApiProperty({
		description: 'El identificador único del equipo',
		example: '123e4567-e89b-12d3-a456-426614174000',
		required: false,
	})
	@IsUUID()
	@IsOptional() // <--- Cambio agregado
	id?: string; // <--- Cambio agregado

	@ApiProperty({
		description: 'El nombre del equipo',
		example: 'Team Awesome',
		minLength: 3,
		maxLength: 25,
	})
	@IsString()
	@IsNotEmpty()
	@Length(3, 25)
	name: string;

	@ApiProperty({
		description: 'El identificador del organizador del equipo',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsUUID()
	@IsNotEmpty()
	organizerId?: string;

	@ApiProperty({
		description: 'El identificador del torneo',
		example: '123e4567-e89b-12d3-a456-426614174000', // <--- Corrección en la descripción
	})
	@IsUUID()
	@IsNotEmpty()
	tournamentId?: string;

	@ApiProperty({
		description: 'La URL de la imagen del avatar del equipo',
		example: 'https://example.com/avatar.jpg',
		required: false,
	})
	@IsUrl()
	@IsOptional()
	urlAvatar?: string;

	@ApiPropertyOptional({
		description: 'Lista de IDs de usuarios asociados con el equipo',
		type: [String],
		example: [
			'123e4567-e89b-12d3-a456-426614174000',
			'123e4567-e89b-12d3-a456-426614174001',
		],
	})
	@IsArray()
	@IsOptional()
	@IsUUID('4', { each: true }) // <--- Agregar validación para cada elemento del array
	userIds?: string[];
}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}

export class DeleteMemberDto {
	@ApiProperty({
		description: 'El identificador único del miembro a ser eliminado',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsUUID()
	idMember: string;

	@ApiProperty({
		description:
			'El identificador único del equipo del cual se eliminará el miembro',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsUUID()
	idTeam: string;
}
