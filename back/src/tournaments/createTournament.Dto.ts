import { ApiProperty } from '@nestjs/swagger';
import {
	IsString,
	IsNotEmpty,
	IsOptional,
	IsArray,
	IsBoolean,
	IsDateString,
	IsInt,
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
	@IsUUID()
	@IsOptional()
	organizerId?: string;

	@ApiProperty({ example: 'uuid-del-juego' })
	@IsUUID()
	@IsNotEmpty()
	gameId: string;

	@ApiProperty({ example: 10 })
	@IsInt()
	@IsNotEmpty()
	membersNumber: number;

	@ApiProperty({ example: 20 })
	@IsInt()
	@IsNotEmpty()
	maxTeams: number;

	@ApiProperty({ example: 100 })
	@IsInt()
	@IsNotEmpty()
	price: number;

	@ApiProperty({ example: 'https://example.com/avatar.png' })
	@IsString()
	@IsNotEmpty()
	urlAvatar: string;

	@ApiProperty({ example: ['Premio 1', 'Premio 2'] })
	@IsArray()
	@IsString({ each: true })
	@IsNotEmpty()
	awards: string[];

	@ApiProperty({ example: 'Descripción del torneo' })
	@IsString()
	@IsNotEmpty()
	description: string;

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
}

export class UpdateTournamentDto {
	@ApiProperty({ example: 'uuid-del-torneo' })
	@IsUUID()
	@IsNotEmpty()
	id: string;

	@ApiProperty({ example: 'Nombre del Torneo' })
	@IsString()
	@IsOptional()
	nameTournament?: string;

	@ApiProperty({ example: '2024-12-31T23:59:59Z' })
	@IsDateString()
	@IsOptional()
	startDate?: string;

	@ApiProperty({ example: 'beginner' })
	@IsString()
	@IsOptional()
	category?: string;

	@ApiProperty({ example: 'uuid-del-organizador' })
	@IsUUID()
	@IsOptional()
	organizerId?: string;

	@ApiProperty({ example: 'uuid-del-juego' })
	@IsUUID()
	@IsOptional()
	gameId?: string;

	@ApiProperty({ example: 10 })
	@IsInt()
	@IsOptional()
	membersNumber?: number;

	@ApiProperty({ example: 20 })
	@IsInt()
	@IsOptional()
	maxTeams?: number;

	@ApiProperty({ example: 100 })
	@IsInt()
	@IsOptional()
	price?: number;

	@ApiProperty({ example: 'https://example.com/avatar.png' })
	@IsString()
	@IsOptional()
	urlAvatar?: string;

	@ApiProperty({ example: ['Premio 1', 'Premio 2'] })
	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	awards?: string[];

	@ApiProperty({ example: 'Descripción del torneo' })
	@IsString()
	@IsOptional()
	description?: string;

	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	state?: boolean;

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
}
