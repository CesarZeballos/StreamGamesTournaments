import { PartialType } from '@nestjs/mapped-types';
import {
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUrl,
	IsUUID,
	Length,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGameDto {
	@ApiProperty({
		description: 'El nombre del juego',
		example: 'Super Game',
		minLength: 1,
		maxLength: 80,
	})
	@IsString()
	@IsNotEmpty()
	@Length(1, 80)
	name: string;

	@ApiProperty({
		description: 'La URL de la imagen del juego',
		example: 'https://example.com/image.jpg',
	})
	@IsUrl()
	@IsNotEmpty()
	urlImage: string;
}

export class UpdateGameDto extends PartialType(CreateGameDto) {

	@ApiProperty({
		description: 'ID of the game',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsUUID()
	@IsNotEmpty()
	id: string

	@ApiPropertyOptional({
		description: 'Estado del juego',
		example: true,
	})
	@IsOptional()
	@IsBoolean()
	state?: boolean;
}
