import { IsString } from "class-validator";

export class CreateVersusDto {

    @IsString()
    teamId: string

    @IsString()
    tournamentId: string
}