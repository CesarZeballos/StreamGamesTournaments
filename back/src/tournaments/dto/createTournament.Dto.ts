import { ApiProperty } from '@nestjs/swagger';
import { Categories } from '@prisma/client';
import {
	IsString,
	IsNotEmpty,
	IsOptional,
	IsArray,
	IsDateString,
	IsUUID,
} from 'class-validator';

export class CreateTournamentDto {


	@ApiProperty({ example: 'Nombre del Torneo' })
	@IsString()
	@IsNotEmpty()
	nameTournament: string;

	@ApiProperty({ example: '2024-12-31T23:59:59Z' })
	@IsDateString()
	@IsNotEmpty()
	startDate: string;

	@ApiProperty({ example: 'beginner' })
	@IsString()
	@IsNotEmpty()
	category: string;

	@ApiProperty({ example: 'uuid-del-organizador' })
	@IsString()
	@IsOptional()
	organizerId?: string;

	@ApiProperty({ example: 'uuid-del-juego' })
	@IsString()
	@IsNotEmpty()
	gameId: string;

	@ApiProperty({ example: 10 })
	@IsString()
	@IsNotEmpty()
	membersNumber: string;

	@ApiProperty({ example: 20 })
	@IsString()
	@IsNotEmpty()
	maxTeams: string;

	@ApiProperty({ example: 100 })
	@IsString()
	@IsNotEmpty()
	price: string;

	@ApiProperty({ example: 'https://example.com/avatar.png' })
	@IsString()
	@IsNotEmpty()
	urlAvatar?: string;

	@ApiProperty({ example: ['Premio 1', 'Premio 2'] })
	@IsArray()
	@IsNotEmpty()
	awards: string[];

	@ApiProperty({ example: 'Descripción del torneo' })
	@IsString()
	@IsNotEmpty()
	description: string;
}

export class UpdateTournamentDto {
	@ApiProperty({ example: 'uuid-del-torneo' })
	@IsUUID()
	@IsNotEmpty()
	id?: string;

	@ApiProperty({ example: ['uuid-del-jugador1', 'uuid-del-jugador2'] })
	@IsArray()
	@IsUUID('4', { each: true })
	@IsOptional()
	players?: string[];

	@ApiProperty({ example: ['uuid-del-equipo1', 'uuid-del-equipo2'] })
	@IsArray()
	@IsUUID('4', { each: true })
	@IsOptional()
	teams?: string[];

	@ApiProperty({ example: ['Premio 1', 'Premio 2'] })
	@IsString({ each: true })
	@IsNotEmpty()
	awards?: string[];

	@ApiProperty({ example: 'https://example.com/avatar.png' })
	@IsString()
	@IsNotEmpty()
	urlAvatar?: string;

	@ApiProperty({ example: 'beginner' })
	@IsString()
	@IsNotEmpty()
	category?: Categories;

	@ApiProperty({ example: 'Descripción del torneo' })
	@IsString()
	@IsNotEmpty()
	description?: string;
}
