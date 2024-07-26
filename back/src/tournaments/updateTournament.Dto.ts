import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentDto } from './createTournament.Dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {
	// Inherits all properties from CreateTournamentDto and makes them optional.
}
