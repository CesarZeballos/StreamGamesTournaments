import { PartialType, PickType } from "@nestjs/mapped-types";
import { User } from "@prisma/client";
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, Length } from "class-validator";


export class CreateTeamDto {
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
    @IsOptional()
    tournamentId?: string

    @IsArray()
    @IsOptional()
    user?: User[]
}

export class UpdateTeamDto extends PartialType(CreateTeamDto) { }

export class DeleteMemberDto {
    @IsUUID()
    idMember: string;

    @IsUUID()
    idTeam: string;
}