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
}

export class UpdateGameDto extends PartialType(CreateGameDto) {
	@ApiProperty({
		description: 'El identificador único del juego. Debe ser un UUID',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsUUID()
	@IsNotEmpty()
	id: string;

	@ApiPropertyOptional({
		description:
			'El estado del juego, donde `true` indica que el juego está activo y `false` que está inactivo. Este campo es opcional',
		example: false,
	})
	@IsOptional()
	@IsBoolean()
	state?: boolean;
}
