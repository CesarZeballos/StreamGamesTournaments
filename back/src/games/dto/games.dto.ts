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
		description:
			'El nombre del juego. Debe ser una cadena de caracteres con una longitud mínima de 1 y máxima de 80 caracteres',
		example: 'GTA V',
		minLength: 1,
		maxLength: 80,
	})
	@IsString()
	@IsNotEmpty()
	@Length(1, 80)
	name: string;

	@ApiProperty({
		description: 'La URL de la imagen del juego. Debe ser una URL válida',
		example: 'https://example.com/image.jpg',
	})
	@IsUrl()
	@IsNotEmpty()
	urlImage: string;

	@IsString()
	@IsNotEmpty()
	description: string;
}

export class UpdateGameDto extends PartialType(CreateGameDto) {
	@ApiPropertyOptional({
	  description: 'El estado del juego',
	  example: false,
	})
	@IsBoolean()
	@IsOptional()
	state?: boolean;
}