import {
	IsString,
	IsNotEmpty,
	IsEnum,
	IsNumber,
	IsDateString,
	IsArray,
	IsOptional,
	IsUUID,
} from 'class-validator';
import { Categories } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
	@ApiProperty({
		description: 'Name of the tournament',
		example: 'Ultimate Showdown',
	})
	@IsNotEmpty()
	@IsString()
	nameTournament: string;

	@ApiProperty({
		description: 'Start date of the tournament',
		example: '2024-08-01T14:23:11.438Z',
	})
	@IsNotEmpty()
	@IsDateString()
	startDate: string;

	@IsUUID()
	@IsOptional()
	id?: string;

	@ApiProperty({
		description: 'Category of the tournament',
		example: 'beginner',
	})
	@IsNotEmpty()
	@IsEnum(Categories)
	category: Categories;

	@ApiProperty({
		description: 'Number of members in the tournament',
		example: 16,
	})
	@IsNotEmpty()
	@IsNumber()
	membersNumber: number;

	@ApiProperty({
		description: 'Maximum number of teams allowed in the tournament',
		example: 16,
	})
	@IsNotEmpty()
	@IsNumber()
	maxTeam: number;

	@IsNotEmpty()
	@IsNumber()
	maxMember: number;

	@ApiProperty({
		description: 'URL for the tournament avatar',
		example: 'https://example.com/avatar1.jpg',
	})
	@IsNotEmpty()
	@IsString()
	urlAvatar: string;

	@ApiProperty({
		description: 'Awards for the tournament',
		example: ['Trophy', 'Medal'],
	})
	@IsNotEmpty()
	@IsArray()
	@IsString({ each: true })
	award: string[];

	@ApiProperty({
		description: 'Description of the tournament',
		example: 'A thrilling tournament with exciting matches!',
	})
	@IsNotEmpty()
	@IsString()
	description: string;

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
