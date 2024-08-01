import {
	IsString,
	IsNotEmpty,
	IsArray,
	IsOptional,
	IsUUID,
	IsBoolean,
  } from 'class-validator';
  import { Categories} from '@prisma/client';
  import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
  
  export class CreateTournamentDto {
	  @ApiProperty({ description: 'Tournament name' })
	  @IsNotEmpty()
	  nameTournament: string;
	  
	  @ApiProperty({ description: 'Start date',example: '2000-01-01T00:00:00.000Z', })
	  @IsNotEmpty()
	  startDate: string;	  
	  
	  @ApiProperty({ description: 'Category', example: "bennigner" })
	  @IsNotEmpty()
	  category: Categories;

	  @ApiProperty({
		  description: 'ID of the organizer',
		  example: 'a3c4d5e6-7b8a-9b0c-1d2e-3f4g5h6i7j8k',
		})
		@IsNotEmpty()
		@IsUUID()
		organizerId: string;
		
		@ApiProperty({
			description: 'ID of the game',
			example: 'l4m5n6o7-8p9q-0r1s-2t3u-4v5w6x7y8z9a',
	})
	@IsNotEmpty()
	@IsUUID()
	gameId: string;
  
	@ApiProperty({ description: 'Number of members', example: 5 })
	@IsNotEmpty()
	membersNumber: number;

	@ApiProperty({ description: 'Max teams', example: 5 })
	@IsNotEmpty()
	maxTeams: number;

	@ApiProperty({ description: 'Price (Es un numero y no un string)', example: 500 })
	@IsNotEmpty()
	price: number;

	@ApiProperty({ description: 'Avatar URL' , example: 'https://CesarGato.com'})
	@IsNotEmpty()
	urlAvatar: string;

	@ApiProperty({ description: 'Awards' , example: ['$500', '$501', '$502']})
	@IsNotEmpty()
	awards: string[];   
  
  
	@ApiProperty({ description: 'Description' })
	@IsNotEmpty()
	description: string;
  
	@ApiProperty({ description: 'State' })
	@IsNotEmpty()
	state: boolean;

	@ApiProperty({description: 'Aca tenes que poner el array de id', example: ['uuid1','uuid2','uuid3']})
	@IsOptional()
	players: string[]

	@ApiPropertyOptional({
	  description: 'IDs of the teams participating in the tournament',
	  example: ['team1-uuid', 'team2-uuid'],
	})
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	teams?: string[];

  }
  
  export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {
  
	
	@ApiPropertyOptional({
	  description: 'State of the tournament',
	  example: true,
	})
	@IsOptional()
	@IsBoolean()
	state?: boolean;
  }