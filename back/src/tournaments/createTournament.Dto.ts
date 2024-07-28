import {
	IsString,
	IsNotEmpty,
	IsEnum,
	IsNumber,
	IsDateString,
	IsArray,
	IsOptional,
} from 'class-validator';
import { Categories } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
	@ApiProperty({
		description: 'Start date of the tournament',
		example: '2024-08-01T14:23:11.438Z',
	})
	@IsNotEmpty()
	@IsDateString()
	startDate: string;

	@ApiProperty({
		description: 'Category of the tournament',
		example: 'CATEGORY1',
	})
	@IsNotEmpty()
	@IsEnum(Categories)
	categories: Categories;

	@ApiProperty({
		description: 'Award amount for the tournament',
		example: [500, 300],
	})
	@IsNotEmpty()
	@IsArray()
	@IsString({ each: true }) // Cambiado a IsString para coincidir con el modelo Prisma
	award: string[];

	@ApiProperty({
		description: 'URL for the tournament avatar',
		example: 'https://example.com/avatar1.jpg',
	})
	@IsNotEmpty()
	@IsString()
	urlAvatar: string;

	@ApiProperty({
		description: 'Description of the tournament',
		example: 'A thrilling tournament with exciting matches!',
	})
	@IsNotEmpty()
	@IsString()
	description: string;

	@ApiProperty({
		description: 'Maximum number of members allowed in the tournament',
		example: 10,
	})
	@IsNotEmpty()
	@IsNumber()
	maxMember: number;

	@ApiProperty({
		description: 'Maximum number of teams allowed in the tournament',
		example: 16,
	})
	@IsNotEmpty()
	@IsNumber()
	maxTeam: number;

	@ApiProperty({
		description: 'ID of the organizer',
		example: 'a3c4d5e6-7b8a-9b0c-1d2e-3f4g5h6i7j8k',
	})
	@IsNotEmpty()
	@IsString()
	organizerId: string;

	@ApiProperty({
		description: 'ID of the game',
		example: 'l4m5n6o7-8p9q-0r1s-2t3u-4v5w6x7y8z9a',
	})
	@IsNotEmpty()
	@IsString()
	gameId: string;

	@ApiProperty({
		description: 'IDs of the teams participating in the tournament',
		example: ['team1-uuid', 'team2-uuid'],
		required: false,
	})
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	teams?: string[];
}
