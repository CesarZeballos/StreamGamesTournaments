import { PartialType } from '@nestjs/mapped-types';
import { User } from '@prisma/client';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGameDto {
    @ApiProperty({
        description: 'El identificador único del juego',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false
    })
    @IsUUID()
    @IsOptional()
    id?: string;

    @ApiProperty({
        description: 'El nombre del juego',
        example: 'Super Game',
        minLength: 1,
        maxLength: 80
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 80)
    name: string;

    @ApiProperty({
        description: 'La URL de la imagen del juego',
        example: 'https://example.com/image.jpg'
    })
    @IsUrl()
    @IsNotEmpty()
    urlImage: string;

    @ApiPropertyOptional({
        description: 'El identificador único del torneo al que pertenece el juego',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    @IsOptional()
    tournamentId?: string;

    @ApiPropertyOptional({
        description: 'Lista de IDs de usuarios asociados con el juego',
        type: [String],
        example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001']
    })
    @IsArray()
    @IsOptional()
    user?: User[];
}

export class UpdateGameDto extends PartialType(CreateGameDto) { }
