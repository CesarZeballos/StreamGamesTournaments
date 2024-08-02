import {
	IsString,
	IsNotEmpty,
	IsArray,
	IsOptional,
	IsUUID,
	IsBoolean,
	IsNumber,
	IsDateString,
} from 'class-validator';
import { Categories } from '@prisma/client'; // Asegúrate de que Categories esté exportado correctamente
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateTournamentDto {
	@ApiProperty({
		description: 'Nombre del torneo',
		example: 'Tournament Name',
	})
	@IsNotEmpty()
	@IsString()
	nameTournament: string;

	@ApiProperty({
		description: 'Fecha de inicio del torneo',
		example: '2024-08-01T00:00:00.000Z',
	})
	@IsNotEmpty()
	@IsDateString()
	startDate: string;

	@ApiProperty({
		description: 'Categoría del torneo',
		example: 'beginner',
	})
	@IsNotEmpty()
	@IsString()
	category: Categories; // Asegúrate de que Categories sea un string en tu DTO

	@ApiProperty({
		description: 'ID del organizador',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsNotEmpty()
	@IsUUID()
	organizerId: string;

	@ApiProperty({
		description: 'ID del juego',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsNotEmpty()
	@IsUUID()
	gameId: string;

	@ApiProperty({
		description: 'Número de miembros',
		example: 5,
	})
	@IsNotEmpty()
	@IsNumber()
	membersNumber: number;

	@ApiProperty({
		description: 'Número máximo de equipos',
		example: 10,
	})
	@IsNotEmpty()
	@IsNumber()
	maxTeams: number;

	@ApiProperty({
		description: 'Precio del torneo',
		example: 500,
	})
	@IsNotEmpty()
	@IsNumber()
	price: number;

	@ApiProperty({
		description: 'URL del avatar del torneo',
		example: 'https://example.com/avatar.jpg',
	})
	@IsNotEmpty()
	@IsString()
	urlAvatar: string;

	@ApiProperty({
		description: 'Premios del torneo',
		example: ['$500', '$1000'],
	})
	@IsNotEmpty()
	@IsArray()
	@IsString({ each: true })
	awards: string[];

	@ApiProperty({
		description: 'Descripción del torneo',
		example: 'Este torneo es para jugadores principiantes.',
	})
	@IsNotEmpty()
	@IsString()
	description: string;

	@ApiPropertyOptional({
		description: 'Array de IDs de jugadores',
		example: ['123e4567-e89b-12d3-a456-426614174000'],
	})
	@IsOptional()
	@IsArray()
	@IsUUID('4', { each: true })
	players?: string[];

	@ApiPropertyOptional({
		description: 'IDs de los equipos que participan en el torneo',
		example: ['123e4567-e89b-12d3-a456-426614174000'],
	})
	@IsOptional()
	@IsArray()
	@IsUUID('4', { each: true })
	teams?: string[];
}

export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {
	@ApiPropertyOptional({
		description: 'Estado del torneo',
		example: true,
	})
	@IsOptional()
	@IsBoolean()
	state?: boolean;
}
