import { PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ArrayNotEmpty, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class CreateTeamDto {
	@ApiProperty({
		description: 'Name of the team',
		example: 'Team Alpha',
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: 'ID of the organizer of the team',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsString()
	organizerId: string;

	@ApiProperty({
		description: 'ID of the tournament associated with the team',
		example: '987e6543-e21b-12d3-a456-426614174000',
	})
	@IsString()
	tournamentId: string;

	@ApiProperty({
		description: 'URL of the team avatar',
		example: 'http://example.com/avatar.png',
		required: false,
	})
	@IsOptional()
	@IsString()
	urlAvatar?: string;

	@ApiProperty({
		description: 'List of user IDs associated with the team',
		example: [
			'abc12345-e67b-12d3-a456-426614174000',
			'def67890-e67b-12d3-a456-426614174000',
		],
	})
	@IsArray()
	@ArrayNotEmpty()
	@IsString({ each: true })
	users: string[];

	@IsString()
	paypal: string;
}

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
	@ApiProperty({
		description: 'ID of the team',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsUUID()
	@IsNotEmpty()
	id: string
}
