import { IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, Length } from "class-validator";


export class CreateTeamsDto {
    @IsUUID()
    @IsOptional()
    id?: string

    @IsString()
    @IsNotEmpty()
    @Length(3, 25)
    name: string

    @IsUrl()
    @IsNotEmpty()
    urlAvatar: string

    @IsUUID()
    @IsNotEmpty()
    tournamentId: string
}