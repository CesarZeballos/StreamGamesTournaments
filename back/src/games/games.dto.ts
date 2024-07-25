import { PartialType } from '@nestjs/mapped-types';
import { User } from '@prisma/client';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, Length } from 'class-validator';

export class CreateGameDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 80)
    name: string;

    @IsUrl()
    @IsNotEmpty()
    urlImage: string

    @IsUUID()
    @IsOptional()
    tournamentId?: string;

    @IsArray()
    @IsOptional()
    user?: User[]
}

export class UpdateGameDto extends PartialType(CreateGameDto) { }