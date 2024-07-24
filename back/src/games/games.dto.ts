import { IsOptional, IsString, IsUrl, IsUUID, Length } from 'class-validator';

export class CreateGameDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @Length(1, 80)
    name: string;

    @IsUrl()
    urlImage: string

    @IsUUID()
    @IsOptional()
    tournamentId?: string;
}